import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://healthmanipulator.vercel.app';
const siteConfigPath = path.resolve(__dirname, '../src/config/siteConfig.ts');
const publicDir = path.resolve(__dirname, '../public');

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Extract slugs from siteConfig.ts preserving defined order
const content = fs.readFileSync(siteConfigPath, 'utf-8');
const slugRegex = /slug:\s*['"]([^'"]+)['"]/g;
const slugs = [];
let match;
while ((match = slugRegex.exec(content)) !== null) {
  if (!slugs.includes(match[1])) {
    slugs.push(match[1]);
  }
}

const staticRoutes = ['', '/blog', '/calorie-calculator', '/about'];

let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

// Static public routes
for (const route of staticRoutes) {
  const loc = route === '' ? `${BASE_URL}/` : `${BASE_URL}${route}`;
  xml += `  <url>\n    <loc>${loc}</loc>\n  </url>\n`;
}

// Published article routes
for (const slug of slugs) {
  const loc = `${BASE_URL}/blog/${slug}`;
  xml += `  <url>\n    <loc>${loc}</loc>\n  </url>\n`;
}

xml += `</urlset>\n`;

const sitemapPath = path.join(publicDir, 'sitemap.xml');
fs.writeFileSync(sitemapPath, xml, 'utf-8');
console.log(`[sitemap] Generated ${staticRoutes.length + slugs.length} URLs in ${sitemapPath}`);

// Generate robots.txt
const robotsTxt = `User-agent: *\nAllow: /\n\nSitemap: ${BASE_URL}/sitemap.xml\n`;
const robotsPath = path.join(publicDir, 'robots.txt');
fs.writeFileSync(robotsPath, robotsTxt, 'utf-8');
console.log(`[robots.txt] Generated ${robotsPath}`);
