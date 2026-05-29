import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { detectCategory, detectCityFromTitle, getTrendUrl } from './src/utils/themeEngine.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function prerender() {
  console.log("🚀 Starting pre-rendering script...");

  const templatePath = path.join(__dirname, 'dist', 'index.html');
  if (!fs.existsSync(templatePath)) {
    console.error("❌ Error: dist/index.html not found! Run npm run build first.");
    process.exit(1);
  }

  const htmlTemplate = fs.readFileSync(templatePath, 'utf8');

  try {
    console.log("Fetching top trends...");
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
    const itemMatches = xmlText.match(/<item>[\s\S]*?<\/item>/g) || [];
    
    // Process only the top 3 trends
    const top3Items = itemMatches.slice(0, 3);
    console.log(`Found ${itemMatches.length} items. Pre-rendering top ${top3Items.length}...`);

    for (let i = 0; i < top3Items.length; i++) {
      const itemXml = top3Items[i];
      const title = (itemXml.match(/<title>([\s\S]*?)<\/title>/)?.[1] || '').trim();
      const traffic = (itemXml.match(/<ht:approx_traffic>([\s\S]*?)<\/ht:approx_traffic>/)?.[1] || '').trim();
      const picture = (itemXml.match(/<ht:picture>([\s\S]*?)<\/ht:picture>/)?.[1] || '').trim();
      
      const newsTitle = (itemXml.match(/<ht:news_item_title>([\s\S]*?)<\/ht:news_item_title>/)?.[1] || '').trim();
      const newsSnippet = (itemXml.match(/<ht:news_item_snippet>([\s\S]*?)<\/ht:news_item_snippet>/)?.[1] || '').trim();
      const newsUrl = (itemXml.match(/<ht:news_item_url>([\s\S]*?)<\/ht:news_item_url>/)?.[1] || '').trim();
      const newsSource = (itemXml.match(/<ht:news_item_source>([\s\S]*?)<\/ht:news_item_source>/)?.[1] || '').trim();

      const decodeHtml = (str) => {
        return str
          .replace(/&amp;/g, '&')
          .replace(/&lt;/g, '<')
          .replace(/&gt;/g, '>')
          .replace(/&quot;/g, '"')
          .replace(/&#039;/g, "'")
          .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1');
      };

      const cleanTitle = decodeHtml(title);
      const category = detectCategory(cleanTitle, decodeHtml(newsTitle));
      const city = detectCityFromTitle(cleanTitle);

      const trend = {
        title: cleanTitle,
        category,
        traffic: traffic || 'N/A',
        picture: picture ? decodeHtml(picture) : null,
        city: city || null,
        isLocal: !!city,
        news: newsTitle ? {
          title: decodeHtml(newsTitle),
          snippet: decodeHtml(newsSnippet),
          url: decodeHtml(newsUrl),
          source: decodeHtml(newsSource)
        } : null
      };

      // Get relative URL from getTrendUrl utility (e.g. "/porto-alegre/chuva-forte")
      const targetUrl = getTrendUrl(cleanTitle);
      const urlParts = targetUrl.split('/').filter(Boolean);

      if (urlParts.length === 0) {
        console.log(`Skipping root path for trend: ${cleanTitle}`);
        continue;
      }

      const targetDir = path.join(__dirname, 'dist', ...urlParts);
      console.log(`Pre-rendering: ${targetUrl} -> ${targetDir}`);

      // Create target directory
      fs.mkdirSync(targetDir, { recursive: true });

      // Inject active trend configuration script into index.html
      const injectedScript = `<script>window.VITE_ACTIVE_TREND = ${JSON.stringify(trend)};</script>`;
      const finalHtml = htmlTemplate.replace('<head>', `<head>${injectedScript}`);

      // Write static index.html file
      fs.writeFileSync(path.join(targetDir, 'index.html'), finalHtml, 'utf8');
      console.log(`✅ Pre-rendered page created for: ${cleanTitle}`);
    }

    console.log("🎉 Pre-rendering completed successfully!");

  } catch (error) {
    console.error("❌ Error running pre-rendering:", error.message);
  }
}

prerender();
