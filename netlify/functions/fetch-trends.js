export const handler = async function (event, context) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    // Google Trends daily RSS feed for Brazil
    const response = await fetch('https://trends.google.com/trending/rss?geo=BR', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      },
      signal: AbortSignal.timeout(8000)
    });

    if (!response.ok) {
      throw new Error(`Google Trends responded with status: ${response.status}`);
    }

    const xmlText = await response.text();
    const trends = [];
    
    // Parse items using Regex
    const itemMatches = xmlText.match(/<item>[\s\S]*?<\/item>/g) || [];
    
    for (const itemXml of itemMatches) {
      const title = (itemXml.match(/<title>([\s\S]*?)<\/title>/)?.[1] || '').trim();
      const traffic = (itemXml.match(/<ht:approx_traffic>([\s\S]*?)<\/ht:approx_traffic>/)?.[1] || '').trim();
      const picture = (itemXml.match(/<ht:picture>([\s\S]*?)<\/ht:picture>/)?.[1] || '').trim();
      
      // Get first news item details
      const newsTitle = (itemXml.match(/<ht:news_item_title>([\s\S]*?)<\/ht:news_item_title>/)?.[1] || '').trim();
      const newsSnippet = (itemXml.match(/<ht:news_item_snippet>([\s\S]*?)<\/ht:news_item_snippet>/)?.[1] || '').trim();
      const newsUrl = (itemXml.match(/<ht:news_item_url>([\s\S]*?)<\/ht:news_item_url>/)?.[1] || '').trim();
      const newsSource = (itemXml.match(/<ht:news_item_source>([\s\S]*?)<\/ht:news_item_source>/)?.[1] || '').trim();

      // Clean HTML entities if any
      const decodeHtml = (str) => {
        return str
          .replace(/&amp;/g, '&')
          .replace(/&lt;/g, '<')
          .replace(/&gt;/g, '>')
          .replace(/&quot;/g, '"')
          .replace(/&#039;/g, "'")
          .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1');
      };

      if (title) {
        trends.push({
          title: decodeHtml(title),
          traffic: traffic || 'N/A',
          picture: picture ? decodeHtml(picture) : null,
          news: newsTitle ? {
            title: decodeHtml(newsTitle),
            snippet: decodeHtml(newsSnippet),
            url: decodeHtml(newsUrl),
            source: decodeHtml(newsSource)
          } : null
        });
      }
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        source: 'Google Trends RSS BR',
        timestamp: new Date().toISOString(),
        data: trends
      })
    };

  } catch (error) {
    console.error('Error fetching trends:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        error: error.message,
        message: 'Could not fetch Google Trends. Using client-side mock data fallback.'
      })
    };
  }
};
