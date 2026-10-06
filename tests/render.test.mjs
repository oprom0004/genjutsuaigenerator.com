import test from 'node:test';
import assert from 'node:assert/strict';
import {
  renderHomePage,
  renderGeneratorPage,
  renderDashboardPage,
  renderPricingPage,
  renderArticlePage
} from '../lib/render.mjs';

test('render - renderHomePage returns complete hero generator and sections', () => {
  const html = renderHomePage('en');
  assert.ok(html.includes('hero-generator-card'), 'Hero generator must be in home page');
  assert.ok(html.includes('id="char-dropzone"'), 'Dropzone must be rendered');
  assert.ok(html.includes('data-char-id="char-street"'), 'Street dancer preset present');
  assert.ok(html.includes('data-char-id="char-ninja"'), 'Cyber ninja preset present');
  assert.ok(html.includes('data-char-id="char-anime"'), 'Anime hero preset present');
  assert.ok(html.includes('data-char-id="char-suit"'), 'Gentleman preset present');
  assert.ok(html.includes('showcase-section'), 'Showcase section present');
  assert.ok(html.includes('pillars-section'), 'Pillars section present');
  assert.ok(html.includes('how-it-works-section'), 'How it works section present');
  assert.ok(html.includes('comparison-section'), 'Comparison section present');
  assert.ok(html.includes('pricing-section'), 'Pricing section present');
  assert.ok(html.includes('faq-section'), 'FAQ section present');
  assert.ok(html.includes('cta-banner-section'), 'Bottom CTA present');
});

test('render - renderHomePage in Japanese renders properly localized texts', () => {
  const html = renderHomePage('ja');
  assert.ok(html.includes('lang="ja"'));
  assert.ok(html.includes('幻術'));
  assert.ok(html.includes('クレジット'));
  assert.ok(html.includes('ストリートダンサー'));
});

test('render - renderGeneratorPage renders studio layout', () => {
  const html = renderGeneratorPage('en');
  assert.ok(html.includes('hero-generator-card'));
  assert.ok(html.includes('CREATION STUDIO'));
});

test('render - renderDashboardPage renders balance card and video grid container', () => {
  const html = renderDashboardPage('en');
  assert.ok(html.includes('id="dashboard-credits-count"'));
  assert.ok(html.includes('id="user-videos-grid"'));
  assert.ok(html.includes('id="user-orders-body"'));
});

test('render - renderPricingPage renders pricing grid and guarantee', () => {
  const html = renderPricingPage('en');
  assert.ok(html.includes('pricing-grid'));
  assert.ok(html.includes('Credit Protection Guarantee'));
});

test('render - renderArticlePage renders semantic article with schema', () => {
  const html = renderArticlePage('en', 'how-to-make-ai-motion-transfer-video');
  assert.ok(html.includes('article-container'));
  assert.ok(html.includes('How to Make an AI Motion Transfer Video'));
  assert.ok(html.includes('"@type": "Article"'));
});
