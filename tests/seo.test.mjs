import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '../dist');

test('seo - sitemap.xml exists and contains valid XML structure', () => {
  const sitemapPath = path.join(distDir, 'sitemap.xml');
  assert.ok(fs.existsSync(sitemapPath), 'sitemap.xml must exist in dist');
  const xml = fs.readFileSync(sitemapPath, 'utf-8');
  assert.ok(xml.includes('<urlset'), 'Must have <urlset> root element');
  assert.ok(xml.includes('xmlns:xhtml='), 'Must have xhtml namespace for hreflang');
  assert.ok(xml.includes('https://genjutsuaigenerator.com/'), 'Must reference site origin');
  assert.ok(xml.includes('hreflang="ja"'), 'Must include Japanese alternates');
  assert.ok(xml.includes('hreflang="es"'), 'Must include Spanish alternates');
  assert.ok(xml.includes('hreflang="x-default"'), 'Must include x-default');
});

test('seo - robots.txt exists and points to sitemap', () => {
  const robotsPath = path.join(distDir, 'robots.txt');
  assert.ok(fs.existsSync(robotsPath), 'robots.txt must exist in dist');
  const txt = fs.readFileSync(robotsPath, 'utf-8');
  assert.ok(txt.includes('User-agent: *'));
  assert.ok(txt.includes('Sitemap: https://genjutsuaigenerator.com/sitemap.xml'));
});

test('seo - HTML files have canonical, hreflang, and schema tags', () => {
  const homePath = path.join(distDir, 'index.html');
  assert.ok(fs.existsSync(homePath), 'index.html must exist');
  const html = fs.readFileSync(homePath, 'utf-8');

  // Basic SEO
  assert.ok(html.includes('<title>'));
  assert.ok(html.includes('<meta name="description"'));
  assert.ok(html.includes('<link rel="canonical"'));
  
  // Hreflang
  assert.ok(html.includes('hreflang="en"'));
  assert.ok(html.includes('hreflang="ja"'));
  assert.ok(html.includes('hreflang="es"'));
  assert.ok(html.includes('hreflang="pt"'));
  assert.ok(html.includes('hreflang="de"'));
  assert.ok(html.includes('hreflang="fr"'));
  assert.ok(html.includes('hreflang="x-default"'));

  // Social
  assert.ok(html.includes('<meta property="og:title"'));
  assert.ok(html.includes('<meta property="og:description"'));
  assert.ok(html.includes('<meta property="og:image"'));
  assert.ok(html.includes('<meta name="twitter:card"'));

  // Schema LD+JSON
  assert.ok(html.includes('"@type": "SoftwareApplication"'));
  assert.ok(html.includes('"@type": "WebSite"'));
  assert.ok(html.includes('"@type": "FAQPage"'));
  assert.ok(html.includes('"@type": "VideoObject"'));
});
