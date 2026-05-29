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

    // 1. Update site environment variable VITE_ACTIVE_TREND via Netlify REST API
    console.log(`Updating Netlify env var VITE_ACTIVE_TREND to selected trend: ${trend.title}`);
    
    const siteUrl = `https://api.netlify.com/api/v1/sites/${siteId}`;
    const siteData = await fetch(siteUrl, {
      headers: { 'Authorization': `Bearer ${apiToken}` }
    }).then(res => res.json());

    const currentEnv = siteData.build_settings?.env || {};
    const updatedEnv = {
      ...currentEnv,
      VITE_ACTIVE_TREND: JSON.stringify(trend)
    };

    const updateRes = await fetch(siteUrl, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${apiToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        build_settings: {
          env: updatedEnv
        }
      })
    });

    if (!updateRes.ok) {
      const errMsg = await updateRes.text();
      throw new Error(`Netlify API failed to update env vars: ${errMsg}`);
    }

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
