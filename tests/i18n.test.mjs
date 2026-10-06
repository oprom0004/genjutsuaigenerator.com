import test from 'node:test';
import assert from 'node:assert/strict';
import {supportedLocales, defaultLocale, localizeUrl, getLocaleData} from '../lib/i18n.mjs';

test('i18n - supported locales contains 6 primary languages', () => {
  assert.equal(supportedLocales.length, 6);
  assert.deepEqual(supportedLocales, ['en', 'ja', 'es', 'pt', 'de', 'fr']);
  assert.equal(defaultLocale, 'en');
});

test('i18n - localizeUrl produces clean localized paths', () => {
  // Default locale (en) is at root
  assert.equal(localizeUrl('', 'en'), '/');
  assert.equal(localizeUrl('generator', 'en'), '/generator/');
  assert.equal(localizeUrl('pricing', 'en'), '/pricing/');
  assert.equal(localizeUrl('dashboard', 'en'), '/dashboard/');
  assert.equal(localizeUrl('terms', 'en'), '/terms/');

  // Other locales have locale prefix
  assert.equal(localizeUrl('', 'ja'), '/ja/');
  assert.equal(localizeUrl('generator', 'ja'), '/ja/generator/');
  assert.equal(localizeUrl('pricing', 'es'), '/es/pricing/');
  assert.equal(localizeUrl('terms', 'de'), '/de/terms/');
  assert.equal(localizeUrl('privacy', 'fr'), '/fr/privacy/');
  assert.equal(localizeUrl('about', 'pt'), '/pt/about/');
});

test('i18n - all 6 locales load valid JSON data with complete required sections', () => {
  for (const loc of supportedLocales) {
    const data = getLocaleData(loc);
    assert.ok(data, `Locale data for ${loc} should exist`);
    assert.equal(data.locale, loc);
    assert.ok(data.name, `Locale name for ${loc} should exist`);
    assert.ok(data.flag, `Locale flag for ${loc} should exist`);

    // Meta
    assert.ok(data.meta.homeTitle);
    assert.ok(data.meta.homeDescription);

    // Nav
    assert.ok(data.nav.generator);
    assert.ok(data.nav.showcase);
    assert.ok(data.nav.pricing);

    // Home
    assert.ok(data.home.hero.h1);
    assert.ok(data.home.heroGenerator.presets.length >= 4);
    assert.ok(data.home.heroGenerator.moves.length >= 2);
    assert.ok(data.home.showcase.items.length >= 4);
    assert.ok(data.home.pillars.items.length >= 3);
    assert.ok(data.home.pricing.packs.length >= 3);
    assert.ok(data.home.pricing.guaranteeTitle);
    assert.ok(data.home.faq.items.length >= 8);

    // Articles
    assert.ok(data.articles['how-to-make-ai-motion-transfer-video']);
    assert.ok(data.articles['ai-dance-generator-guide']);
    assert.ok(data.articles['character-swap-vs-face-swap']);
    assert.ok(data.articles['terms']);
    assert.ok(data.articles['privacy']);
    assert.ok(data.articles['about']);
  }
});
