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

// Extract slugs from siteConfig.ts
const content = fs.readFileSync(siteConfigPath, 'utf-8');
const slugRegex = /slug:\s*['"]([^'"]+)['"]/g;
const slugs = [];
let match;
while ((match = slugRegex.exec(content)) !== null) {
  if (!slugs.includes(match[1])) {
    slugs.push(match[1]);
  }
}

const staticRoutes = [
  { path: '', priority: '1.0', changefreq: 'weekly' },
  { path: '/blog', priority: '0.9', changefreq: 'daily' },
  { path: '/about', priority: '0.8', changefreq: 'monthly' },
];

let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

// Static routes
for (const route of staticRoutes) {
  const loc = route.path === '' ? `${BASE_URL}/` : `${BASE_URL}${route.path}`;
  xml += `  <url>\n    <loc>${loc}</loc>\n    <changefreq>${route.changefreq}</changefreq>\n    <priority>${route.priority}</priority>\n  </url>\n`;
}

// Article routes
for (const slug of slugs) {
  const loc = `${BASE_URL}/blog/${slug}`;
  xml += `  <url>\n    <loc>${loc}</loc>\n    <changefreq>monthly</changefreq>\n    <priority>0.8</priority>\n  </url>\n`;
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
