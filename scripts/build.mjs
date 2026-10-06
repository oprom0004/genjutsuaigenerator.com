import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

import {siteConfig} from '../lib/config.mjs';
import {supportedLocales, defaultLocale, localizeUrl, getLocaleData} from '../lib/i18n.mjs';
import {getSitePages} from '../lib/content.mjs';
import {
  renderHomePage,
  renderGeneratorPage,
  renderDashboardPage,
  renderPricingPage,
  renderArticlePage
} from '../lib/render.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.resolve(rootDir, 'dist');
const publicDir = path.resolve(rootDir, 'public');

console.log('🚀 Starting Genjutsu AI Generator build...');

// 1. Clean and prepare dist directory
if (fs.existsSync(distDir)) {
  fs.rmSync(distDir, { recursive: true, force: true });
}
fs.mkdirSync(distDir, { recursive: true });

// 2. Copy public directory assets into dist
function copyDirRecursive(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDirRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

if (fs.existsSync(publicDir)) {
  copyDirRecursive(publicDir, distDir);
  console.log('✅ Copied public assets to dist/');
}

// 3. Render HTML pages for all locales
let totalPagesRendered = 0;
const sitemapUrls = [];

for (const locale of supportedLocales) {
  const pages = getSitePages(locale);

  for (const page of pages) {
    let html = '';
    if (page.type === 'home') {
      html = renderHomePage(locale);
    } else if (page.type === 'generator') {
      html = renderGeneratorPage(locale);
    } else if (page.type === 'dashboard') {
      html = renderDashboardPage(locale);
    } else if (page.type === 'pricing') {
      html = renderPricingPage(locale);
    } else if (page.type === 'article') {
      html = renderArticlePage(locale, page.articleKey || page.slug, page.slug);
    }

    if (!html) {
      console.warn(`⚠️ Warning: No HTML generated for page ${page.slug} in ${locale}`);
      continue;
    }

    // Determine target file path in dist
    const relUrl = localizeUrl(page.slug, locale);
    let targetFile = '';
    if (relUrl === '/') {
      targetFile = path.join(distDir, 'index.html');
    } else {
      const cleanRel = relUrl.replace(/^\/|\/$/g, '');
      const folder = path.join(distDir, cleanRel);
      fs.mkdirSync(folder, { recursive: true });
      targetFile = path.join(folder, 'index.html');
    }

    fs.writeFileSync(targetFile, html, 'utf-8');
    totalPagesRendered++;

    // Track for sitemap (exclude aliases so only canonical URLs are submitted to search engines)
    if (!page.isAlias) {
      sitemapUrls.push({
        loc: `${siteConfig.origin}${relUrl}`,
        slug: page.slug,
        locale
      });
    }
  }
}

console.log(`✅ Rendered ${totalPagesRendered} static HTML pages across ${supportedLocales.length} languages.`);

// 4. Generate sitemap.xml with hreflang alternate links
const uniqueSlugs = [...new Set(sitemapUrls.map(u => u.slug))];
let sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n`;

for (const slug of uniqueSlugs) {
  for (const locale of supportedLocales) {
    const locUrl = `${siteConfig.origin}${localizeUrl(slug, locale)}`;
    sitemapXml += `  <url>\n    <loc>${locUrl}</loc>\n`;
    
    // Add all alternate language links
    for (const altLoc of supportedLocales) {
      const altUrl = `${siteConfig.origin}${localizeUrl(slug, altLoc)}`;
      sitemapXml += `    <xhtml:link rel="alternate" hreflang="${altLoc}" href="${altUrl}"/>\n`;
    }
    const defaultUrl = `${siteConfig.origin}${localizeUrl(slug, defaultLocale)}`;
    sitemapXml += `    <xhtml:link rel="alternate" hreflang="x-default" href="${defaultUrl}"/>\n`;
    sitemapXml += `    <changefreq>daily</changefreq>\n    <priority>${slug === '' ? '1.0' : '0.8'}</priority>\n  </url>\n`;
  }
}
sitemapXml += `</urlset>\n`;

fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemapXml, 'utf-8');
console.log('✅ Generated sitemap.xml with xhtml:link alternates');

// 5. Generate robots.txt
const robotsTxt = `User-agent: *
Allow: /

Sitemap: ${siteConfig.origin}/sitemap.xml
`;
fs.writeFileSync(path.join(distDir, 'robots.txt'), robotsTxt, 'utf-8');
console.log('✅ Generated robots.txt');

// 6. Generate _headers for Cloudflare Pages
const headersContent = `/*
  X-Frame-Options: SAMEORIGIN
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()
  Strict-Transport-Security: max-age=31536000; includeSubDomains; preload

/media/*
  Cache-Control: public, max-age=31536000, immutable

/*.css
  Cache-Control: public, max-age=604800

/*.mjs
  Cache-Control: public, max-age=604800
`;
fs.writeFileSync(path.join(distDir, '_headers'), headersContent, 'utf-8');
console.log('✅ Generated _headers');

console.log('🎉 Genjutsu AI Generator build completed successfully!');
