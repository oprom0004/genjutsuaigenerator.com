import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const localesDir = path.resolve(__dirname, '../locales');

export const supportedLocales = ['en', 'ja', 'zh-hant', 'es', 'pt', 'de', 'fr'];
export const defaultLocale = 'en';

const localeCache = new Map();

export function getLocaleData(locale = 'en') {
  const target = supportedLocales.includes(locale) ? locale : defaultLocale;
  if (!localeCache.has(target)) {
    const filePath = path.join(localesDir, `${target}.json`);
    const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    localeCache.set(target, content);
  }
  return localeCache.get(target);
}

export function localizeUrl(rawPath, locale = 'en') {
  const cleanPath = String(rawPath || '').replace(/^\/+|\/+$/g, '');
  if (locale === defaultLocale) {
    return cleanPath ? `/${cleanPath}/` : '/';
  }
  return cleanPath ? `/${locale}/${cleanPath}/` : `/${locale}/`;
}

export function getAllLocalesData() {
  return supportedLocales.map(loc => getLocaleData(loc));
}
