export const handler = async function (event, context) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method Not Allowed' }) };
  }

  try {
    const { trend } = JSON.parse(event.body);
    if (!trend) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: 'Trend data is required' }) };
    }

    const siteId = process.env.NETLIFY_SITE_ID;
    const apiToken = process.env.NETLIFY_API_TOKEN;
    const hookUrl = process.env.NETLIFY_BUILD_HOOK_URL;

    if (!siteId || !apiToken || !hookUrl) {
      return { 
        statusCode: 500, 
        headers, 
        body: JSON.stringify({ 
          error: 'Configurações do Netlify ausentes no servidor. Verifique se NETLIFY_SITE_ID, NETLIFY_API_TOKEN e NETLIFY_BUILD_HOOK_URL estão definidos.' 
        }) 
      };
    }

    // 1. Fetch site details to get the account slug
    console.log(`Fetching Netlify site details for site ID: ${siteId}`);
    const siteUrl = `https://api.netlify.com/api/v1/sites/${siteId}`;
    const siteRes = await fetch(siteUrl, {
      headers: { 'Authorization': `Bearer ${apiToken}` }
    });
    
    if (!siteRes.ok) {
      const errMsg = await siteRes.text();
      throw new Error(`Failed to fetch Netlify site details: ${errMsg}`);
    }
    
    const siteData = await siteRes.json();
    const accountSlug = siteData.account_slug;
    console.log(`Site resolved to Netlify account (team): ${accountSlug}`);

    // 2. Try to update the environment variable using PUT (new Netlify Env API)
    console.log(`Updating Netlify env var VITE_ACTIVE_TREND to selected trend: ${trend.title}`);
    const envPutUrl = `https://api.netlify.com/api/v1/accounts/${accountSlug}/env/VITE_ACTIVE_TREND?site_id=${siteId}`;
    const putBody = {
      key: "VITE_ACTIVE_TREND",
      values: [
        {
          value: JSON.stringify(trend),
          context: "all"
        }
      ]
    };

    let updateRes = await fetch(envPutUrl, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${apiToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(putBody)
    });

    // 3. Fallback: If PUT returns 404/422/400 (does not exist yet), try POST to create it
    if (!updateRes.ok && (updateRes.status === 404 || updateRes.status === 422 || updateRes.status === 400)) {
      console.log(`PUT failed (Status ${updateRes.status}). Trying to create VITE_ACTIVE_TREND via POST...`);
      const envPostUrl = `https://api.netlify.com/api/v1/accounts/${accountSlug}/env?site_id=${siteId}`;
      const postBody = [
        {
          key: "VITE_ACTIVE_TREND",
          values: [
            {
              value: JSON.stringify(trend),
              context: "all"
            }
          ]
        }
      ];

      updateRes = await fetch(envPostUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(postBody)
      });
    }

    if (!updateRes.ok) {
      const errMsg = await updateRes.text();
      throw new Error(`Netlify API failed to update env vars (new API): ${errMsg}`);
    }
    
    console.log("Environment variable VITE_ACTIVE_TREND successfully updated/created!");

    // 2. Trigger rebuild via Build Hook
    console.log('Triggering Netlify rebuild via build hook...');
    const hookRes = await fetch(hookUrl, {
      method: 'POST',
      body: JSON.stringify({})
    });

    if (!hookRes.ok) {
      const errMsg = await hookRes.text();
      throw new Error(`Netlify Build Hook failed: ${errMsg}`);
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: `Deploy forçado com sucesso para a tendência: ${trend.title}. Compilação Netlify iniciada.`,
        pinnedTrend: trend
      })
    };

  } catch (error) {
    console.error('Error triggering deploy:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        error: error.message
      })
    };
  }
};
