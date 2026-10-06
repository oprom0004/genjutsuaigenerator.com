import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

import {supportedLocales, defaultLocale, getLocaleData} from '../lib/i18n.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const localesDir = path.resolve(rootDir, 'locales');
const distDir = path.resolve(rootDir, 'dist');

console.log('🔍 Running Genjutsu AI Integrity & Quality Checks...\n');

let hasErrors = false;

// 1. Check Locale Parity
console.log('1️⃣ Checking Locale Parity...');
const enData = getLocaleData('en');

function getObjectKeyPaths(obj, prefix = '') {
  let keys = [];
  for (const [k, v] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${k}` : k;
    if (v && typeof v === 'object' && !Array.isArray(v)) {
      keys = keys.concat(getObjectKeyPaths(v, fullKey));
    } else {
      keys.push(fullKey);
    }
  }
  return keys;
}

const enKeys = getObjectKeyPaths(enData);
console.log(`   Found ${enKeys.length} distinct key paths in en.json.`);

for (const loc of supportedLocales) {
  if (loc === 'en') continue;
  const locData = getLocaleData(loc);
  const locKeys = new Set(getObjectKeyPaths(locData));
  
  const missing = enKeys.filter(k => !locKeys.has(k));
  if (missing.length > 0) {
    console.error(`   ❌ [${loc}] Missing ${missing.length} keys:`, missing.slice(0, 5));
    hasErrors = true;
  } else {
    console.log(`   ✅ [${loc}] 100% key parity with en.json.`);
  }
}

// 2. Scan for Developer Buzzwords / Jargon
console.log('\n2️⃣ Scanning for Developer Buzzwords & Misleading Claims...');
const bannedPatterns = [
  { pattern: /\bSaaS\b/i, reason: 'Developer jargon: Replace with studio, platform, or generator' },
  { pattern: /Prompt Engineering/i, reason: 'Developer jargon: Replace with motion transfer or choreography selection' },
  { pattern: /User Portal/i, reason: 'Corporate jargon: Replace with My Account or Video Library' },
  { pattern: /Verified Real Output/i, reason: 'Artificial badge: Let the showcase speak for itself' },
  { pattern: /100%\s*(cash\s*)?refund/i, reason: 'Misleading claim: Use "Credit Protected" / credit restore instead' }
];

let jargonFound = 0;
function scanFilesRecursively(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      scanFilesRecursively(fullPath);
    } else if (entry.name.endsWith('.html') || entry.name.endsWith('.json')) {
      const content = fs.readFileSync(fullPath, 'utf-8');
      for (const { pattern, reason } of bannedPatterns) {
        if (pattern.test(content)) {
          console.error(`   ❌ Found banned phrase matching ${pattern} in ${path.relative(rootDir, fullPath)} (${reason})`);
          jargonFound++;
          hasErrors = true;
        }
      }
    }
  }
}

scanFilesRecursively(distDir);
if (jargonFound === 0) {
  console.log('   ✅ Zero developer jargon or misleading claims detected across all 60 pages and JSONs.');
}

// 3. Verify SEO & Geo Tags in Rendered HTML
console.log('\n3️⃣ Verifying SEO, OpenGraph & GEO Schema Tags in dist/index.html...');
const homeHtmlPath = path.join(distDir, 'index.html');
if (fs.existsSync(homeHtmlPath)) {
  const homeHtml = fs.readFileSync(homeHtmlPath, 'utf-8');
  const checks = [
    { name: '<title>', test: /<title>[^<]+<\/title>/.test(homeHtml) },
    { name: '<meta name="description">', test: /<meta name="description" content="[^"]+"/.test(homeHtml) },
    { name: 'Canonical link', test: /<link rel="canonical" href="https:\/\/genjutsuaigenerator\.com\/"/.test(homeHtml) },
    { name: 'hreflang="en"', test: /hreflang="en"/.test(homeHtml) },
    { name: 'hreflang="ja"', test: /hreflang="ja"/.test(homeHtml) },
    { name: 'hreflang="es"', test: /hreflang="es"/.test(homeHtml) },
    { name: 'hreflang="x-default"', test: /hreflang="x-default"/.test(homeHtml) },
    { name: 'og:title', test: /<meta property="og:title"/.test(homeHtml) },
    { name: 'og:image', test: /<meta property="og:image"/.test(homeHtml) },
    { name: 'SoftwareApplication Schema', test: /"SoftwareApplication"/.test(homeHtml) },
    { name: 'VideoObject Schema', test: /"VideoObject"/.test(homeHtml) },
    { name: 'FAQPage Schema', test: /"FAQPage"/.test(homeHtml) }
  ];

  for (const c of checks) {
    if (c.test) {
      console.log(`   ✅ ${c.name} verified`);
    } else {
      console.error(`   ❌ ${c.name} missing in index.html`);
      hasErrors = true;
    }
  }
} else {
  console.error('   ❌ dist/index.html not found. Run build first.');
  hasErrors = true;
}

// 4. Verify Media Assets Exist
console.log('\n4️⃣ Verifying Media Files referenced by generator...');
const requiredMedia = [
  'char-street.webp', 'char-ninja.webp', 'char-anime.webp', 'char-suit.webp',
  'src-hiphop.mp4', 'src-hiphop.webp', 'src-kpop.mp4', 'src-kpop.webp',
  'out-street-hiphop.mp4', 'out-street-hiphop.webp',
  'out-ninja-kpop.mp4', 'out-ninja-kpop.webp',
  'out-anime-kpop.mp4', 'out-anime-kpop.webp',
  'out-suit-hiphop.mp4', 'out-suit-hiphop.webp'
];

let mediaMissing = 0;
for (const file of requiredMedia) {
  const filePath = path.join(distDir, 'media', file);
  if (!fs.existsSync(filePath)) {
    console.error(`   ❌ Missing media file: ${file}`);
    mediaMissing++;
    hasErrors = true;
  }
}
if (mediaMissing === 0) {
  console.log(`   ✅ All ${requiredMedia.length} required media files present in dist/media/.`);
}

// 5. Verification result
console.log('\n----------------------------------------');
if (hasErrors) {
  console.error('❌ Check FAILED with errors.');
  process.exit(1);
} else {
  console.log('🎉 ALL INTEGRITY CHECKS PASSED PERFECTLY!');
  process.exit(0);
}
