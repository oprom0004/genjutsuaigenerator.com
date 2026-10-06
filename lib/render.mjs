import {siteConfig} from './config.mjs';
import {supportedLocales, defaultLocale, localizeUrl, getLocaleData} from './i18n.mjs';

function escapeHtml(str) {
  if (str == null) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function renderShell({
  locale = 'en',
  title = '',
  description = '',
  slug = '',
  canonicalSlug = '',
  bodyContent = '',
  activeNav = '',
  extraSchema = []
}) {
  const data = getLocaleData(locale);
  const targetCanonical = canonicalSlug || slug;
  const canonicalUrl = `${siteConfig.origin}${localizeUrl(targetCanonical, locale)}`;
  
  // Build hreflang links
  const hreflangTags = supportedLocales.map(loc => {
    const locUrl = `${siteConfig.origin}${localizeUrl(targetCanonical, loc)}`;
    return `    <link rel="alternate" hreflang="${loc}" href="${locUrl}">`;
  }).join('\n') + `\n    <link rel="alternate" hreflang="x-default" href="${siteConfig.origin}${localizeUrl(targetCanonical, defaultLocale)}">`;

  // Base Schema
  const baseSchemas = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": siteConfig.fullName,
      "url": siteConfig.origin,
      "description": data.meta.homeDescription,
      "inLanguage": locale
    },
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": siteConfig.fullName,
      "applicationCategory": "MultimediaApplication",
      "operatingSystem": "Web, Cloud",
      "url": siteConfig.origin,
      "description": data.meta.homeDescription,
      "offers": {
        "@type": "Offer",
        "price": "9.99",
        "priceCurrency": "USD"
      }
    },
    ...extraSchema
  ];

  const schemaScript = baseSchemas.map(s => 
    `    <script type="application/ld+json">\n${JSON.stringify(s, null, 2)}\n    </script>`
  ).join('\n');

  const ogImage = `${siteConfig.origin}/media/out-street-hiphop.webp`;

  return `<!DOCTYPE html>
<html lang="${locale}" dir="${data.dir || 'ltr'}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0">
  <title>${escapeHtml(title || data.meta.homeTitle)}</title>
  <meta name="description" content="${escapeHtml(description || data.meta.homeDescription)}">
  <link rel="canonical" href="${canonicalUrl}">
${hreflangTags}
  <!-- Open Graph -->
  <meta property="og:site_name" content="${escapeHtml(siteConfig.fullName)}">
  <meta property="og:type" content="website">
  <meta property="og:title" content="${escapeHtml(title || data.meta.homeTitle)}">
  <meta property="og:description" content="${escapeHtml(description || data.meta.homeDescription)}">
  <meta property="og:url" content="${canonicalUrl}">
  <meta property="og:image" content="${ogImage}">
  <meta property="og:image:width" content="720">
  <meta property="og:image:height" content="1280">
  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeHtml(title || data.meta.homeTitle)}">
  <meta name="twitter:description" content="${escapeHtml(description || data.meta.homeDescription)}">
  <meta name="twitter:image" content="${ogImage}">
  <!-- Theme Color: Cyber Obsidian & Electric Indigo -->
  <meta name="theme-color" content="#08090f">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="/genjutsu.css">
  <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><circle cx='16' cy='16' r='14' fill='%2308090f' stroke='%236366f1' stroke-width='2'/><circle cx='16' cy='16' r='6' fill='%236366f1'/><circle cx='16' cy='16' r='2' fill='%23ffffff'/><circle cx='16' cy='7' r='2.5' fill='%2306b6d4'/><circle cx='23.8' cy='20.5' r='2.5' fill='%2306b6d4'/><circle cx='8.2' cy='20.5' r='2.5' fill='%2306b6d4'/></svg>">
${schemaScript}
</head>
<body data-locale="${locale}">
  <a href="#main-content" class="skip-link">${escapeHtml(data.ui.skip)}</a>
  ${renderHeader(data, locale, activeNav, slug)}
  <main id="main-content">
    ${bodyContent}
  </main>
  ${renderFooter(data, locale)}
  ${renderAuthModal(data, locale)}
  ${renderPaymentModal(data, locale)}
  <div id="toast-container" class="toast-container" aria-live="polite"></div>
  <script type="module" src="/genjutsu.mjs"></script>
</body>
</html>`;
}

function renderHeader(data, locale, activeNav, currentSlug) {
  const homeUrl = localizeUrl('', locale);
  const generatorUrl = localizeUrl('generator', locale);
  const pricingUrl = localizeUrl('pricing', locale);
  const dashboardUrl = localizeUrl('dashboard', locale);

  const langOptions = supportedLocales.map(loc => {
    const locData = getLocaleData(loc);
    const targetUrl = localizeUrl(currentSlug, loc);
    const isSelected = loc === locale ? 'aria-current="true" class="active"' : '';
    return `<a href="${targetUrl}" ${isSelected} data-locale="${loc}"><span class="flag">${locData.flag}</span> ${locData.name}</a>`;
  }).join('');

  return `
  <header class="site-header">
    <div class="header-container">
      <a href="${homeUrl}" class="brand-logo" aria-label="${siteConfig.fullName}">
        <span class="logo-eye">
          <svg viewBox="0 0 32 32" width="28" height="28" fill="none">
            <circle cx="16" cy="16" r="14" stroke="url(#brandGrad)" stroke-width="2.5"/>
            <circle cx="16" cy="16" r="5" fill="#6366f1"/>
            <circle cx="16" cy="16" r="2" fill="#fff"/>
            <circle cx="16" cy="7" r="2.2" fill="#06b6d4"/>
            <circle cx="23.8" cy="20.5" r="2.2" fill="#06b6d4"/>
            <circle cx="8.2" cy="20.5" r="2.2" fill="#06b6d4"/>
            <defs>
              <linearGradient id="brandGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#6366f1" />
                <stop offset="100%" stop-color="#06b6d4" />
              </linearGradient>
            </defs>
          </svg>
        </span>
        <span class="brand-name">GENJUTSU<span class="brand-ai">AI</span></span>
      </a>

      <nav class="desktop-nav" aria-label="Main Navigation">
        <a href="${homeUrl}#studio" class="nav-link ${activeNav === 'studio' ? 'active' : ''}">${escapeHtml(data.nav.generator)}</a>
        <a href="${homeUrl}#showcase" class="nav-link ${activeNav === 'showcase' ? 'active' : ''}">${escapeHtml(data.nav.showcase)}</a>
        <a href="${homeUrl}#how-it-works" class="nav-link ${activeNav === 'how-it-works' ? 'active' : ''}">${escapeHtml(data.nav.howItWorks)}</a>
        <a href="${pricingUrl}" class="nav-link ${activeNav === 'pricing' ? 'active' : ''}">${escapeHtml(data.nav.pricing)}</a>
        <a href="${homeUrl}#faq" class="nav-link ${activeNav === 'faq' ? 'active' : ''}">${escapeHtml(data.nav.faq)}</a>
      </nav>

      <div class="header-actions">
        <!-- Language Dropdown -->
        <div class="lang-dropdown">
          <button class="lang-btn" aria-haspopup="true" aria-expanded="false" id="lang-btn">
            <span class="flag">${data.flag}</span>
            <span class="lang-code">${locale.toUpperCase()}</span>
            <svg class="chevron-down" width="12" height="12" viewBox="0 0 12 12"><path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" fill="none"/></svg>
          </button>
          <div class="lang-menu" role="menu" aria-labelledby="lang-btn">
            ${langOptions}
          </div>
        </div>

        <!-- User Credit Badge (client updated) -->
        <div class="credits-badge" id="user-credits-badge" style="display: none;">
          <span class="sparkle">✦</span>
          <span id="header-credits-count">3</span>
          <span class="credits-label">${escapeHtml(data.nav.credits)}</span>
        </div>

        <!-- Auth Button -->
        <button type="button" class="btn-ghost" id="btn-auth-trigger" data-auth-action="signin">
          ${escapeHtml(data.nav.signIn)}
        </button>

        <a href="${dashboardUrl}" class="btn-user-avatar" id="btn-user-dashboard" style="display: none;" title="${escapeHtml(data.nav.myAccount)}">
          <span class="user-initial">U</span>
        </a>

        <!-- CTA Button -->
        <a href="${homeUrl}#studio" class="btn-primary btn-glow nav-cta">
          <span>${escapeHtml(data.nav.create)}</span>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M6 12L10 8L6 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </a>

        <!-- Mobile Menu Toggle -->
        <button class="mobile-toggle" id="mobile-toggle" aria-label="Toggle navigation menu" aria-expanded="false">
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
        </button>
      </div>
    </div>

    <!-- Mobile Drawer -->
    <div class="mobile-drawer" id="mobile-drawer">
      <nav class="mobile-nav">
        <a href="${homeUrl}#studio" class="mobile-nav-link">${escapeHtml(data.nav.generator)}</a>
        <a href="${homeUrl}#showcase" class="mobile-nav-link">${escapeHtml(data.nav.showcase)}</a>
        <a href="${homeUrl}#modes" class="mobile-nav-link">${escapeHtml(data.nav.features)}</a>
        <a href="${homeUrl}#how-it-works" class="mobile-nav-link">${escapeHtml(data.nav.howItWorks)}</a>
        <a href="${homeUrl}#comparison" class="mobile-nav-link">${escapeHtml(data.nav.comparison)}</a>
        <a href="${pricingUrl}" class="mobile-nav-link">${escapeHtml(data.nav.pricing)}</a>
        <a href="${homeUrl}#faq" class="mobile-nav-link">${escapeHtml(data.nav.faq)}</a>
        <a href="${dashboardUrl}" class="mobile-nav-link">${escapeHtml(data.nav.myAccount)}</a>
        <div class="mobile-cta-wrap">
          <a href="${homeUrl}#studio" class="btn-primary w-full text-center">${escapeHtml(data.nav.create)}</a>
        </div>
      </nav>
    </div>
  </header>`;
}

function renderFooter(data, locale) {
  const homeUrl = localizeUrl('', locale);
  const pricingUrl = localizeUrl('pricing', locale);
  const generatorUrl = localizeUrl('generator', locale);
  const termsUrl = localizeUrl('terms', locale);
  const privacyUrl = localizeUrl('privacy', locale);
  const aboutUrl = localizeUrl('about', locale);
  const guide1Url = localizeUrl('how-to-make-ai-motion-transfer-video', locale);
  const guide2Url = localizeUrl('ai-dance-generator-guide', locale);
  const guide3Url = localizeUrl('character-swap-vs-face-swap', locale);

  const langLinks = supportedLocales.map(loc => {
    const locData = getLocaleData(loc);
    const targetUrl = localizeUrl('', loc);
    return `<a href="${targetUrl}">${locData.flag} ${locData.name}</a>`;
  }).join(' · ');

  return `
  <footer class="site-footer">
    <div class="footer-container">
      <div class="footer-grid">
        <div class="footer-col brand-col">
          <a href="${homeUrl}" class="brand-logo footer-logo">
            <span class="brand-name">GENJUTSU<span class="brand-ai">AI</span></span>
          </a>
          <p class="footer-desc">${escapeHtml(data.ui.footer)}</p>
          <div class="credit-guarantee-pill">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M8 1.5L2 4V7.5C2 11.2 4.6 14.6 8 15.5C11.4 14.6 14 11.2 14 7.5V4L8 1.5Z" stroke="#6366f1" stroke-width="1.5"/><path d="M6 8L7.5 9.5L10.5 6.5" stroke="#6366f1" stroke-width="1.5" stroke-linecap="round"/></svg>
            <span>${escapeHtml(data.home.pricing.guaranteeTitle)}</span>
          </div>
        </div>

        <div class="footer-col">
          <h4 class="footer-heading">${escapeHtml(data.nav.features)}</h4>
          <ul class="footer-links">
            <li><a href="${homeUrl}#studio">${escapeHtml(data.nav.generator)}</a></li>
            <li><a href="${homeUrl}#showcase">${escapeHtml(data.nav.showcase)}</a></li>
            <li><a href="${homeUrl}#modes">${escapeHtml(data.home.pillars.items[0].title)}</a></li>
            <li><a href="${homeUrl}#modes">${escapeHtml(data.home.pillars.items[1].title)}</a></li>
            <li><a href="${pricingUrl}">${escapeHtml(data.nav.pricing)}</a></li>
          </ul>
        </div>

        <div class="footer-col">
          <h4 class="footer-heading">Guides & Articles</h4>
          <ul class="footer-links">
            ${Object.entries(data.articles || {})
              .filter(([k]) => !['terms', 'privacy', 'about'].includes(k))
              .map(([k, a]) => `<li><a href="${localizeUrl(a.slug || k, locale)}">${escapeHtml(a.navLabel || a.h1)}</a></li>`)
              .join('\n            ')}
          </ul>
        </div>

        <div class="footer-col">
          <h4 class="footer-heading">Company & Legal</h4>
          <ul class="footer-links">
            <li><a href="${aboutUrl}">${escapeHtml(data.articles.about.navLabel)}</a></li>
            <li><a href="${termsUrl}">${escapeHtml(data.articles.terms.navLabel)}</a></li>
            <li><a href="${privacyUrl}">${escapeHtml(data.articles.privacy.navLabel)}</a></li>
            <li><a href="${homeUrl}#faq">${escapeHtml(data.nav.faq)}</a></li>
          </ul>
        </div>
      </div>

      <div class="footer-locales">
        <span class="locales-label">Worldwide:</span>
        <div class="locales-list">
          ${langLinks}
        </div>
      </div>

      <div class="footer-bottom">
        <p class="copyright">© 2026 ${escapeHtml(siteConfig.fullName)}. All rights reserved. Identity-Locked Character Motion Studio.</p>
        <p class="credit-protection-note">${escapeHtml(data.home.pricing.guaranteeDesc)}</p>
      </div>
    </div>
  </footer>`;
}

function renderAuthModal(data, locale) {
  return `
  <div class="modal-overlay" id="auth-modal" style="display: none;" role="dialog" aria-modal="true" aria-labelledby="auth-modal-title">
    <div class="modal-card">
      <button class="modal-close" id="btn-close-auth" aria-label="${escapeHtml(data.ui.close)}">✕</button>
      <div class="modal-header">
        <span class="modal-badge">${escapeHtml(data.auth.badge)}</span>
        <h2 class="modal-title" id="auth-modal-title">${escapeHtml(data.auth.titleSignIn)}</h2>
        <p class="modal-subtitle">${escapeHtml(data.auth.subtitle)}</p>
      </div>

      <div class="auth-body">
        <button class="btn-oauth-google" id="btn-oauth-google">
          <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.4 1 3.5 3.6 1.6 7.4l3.7 2.9C6.2 7.5 8.9 5 12 5z"/><path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.6h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.9z"/><path fill="#FBBC05" d="M5.3 14.7c-.2-.7-.4-1.5-.4-2.4s.2-1.7.4-2.4L1.6 7.4C.6 9.4 0 11.6 0 14s.6 4.6 1.6 6.6l3.7-2.9z"/><path fill="#34A853" d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3.1 0-5.8-2.1-6.7-5L1.6 16.2C3.5 20.4 7.4 23 12 23z"/></svg>
          <span>${escapeHtml(data.auth.google)}</span>
        </button>

        <div class="auth-divider">
          <span>${escapeHtml(data.auth.divider)}</span>
        </div>

        <form class="auth-form" id="auth-form" onsubmit="return false;">
          <div class="form-group" id="field-name" style="display: none;">
            <label for="input-name">${escapeHtml(data.auth.nameLabel)}</label>
            <input type="text" id="input-name" placeholder="${escapeHtml(data.auth.namePlaceholder)}" autocomplete="name">
          </div>
          <div class="form-group">
            <label for="input-email">${escapeHtml(data.auth.emailLabel)}</label>
            <input type="email" id="input-email" required placeholder="${escapeHtml(data.auth.emailPlaceholder)}" autocomplete="email">
          </div>
          <div class="form-group">
            <label for="input-password">${escapeHtml(data.auth.passwordLabel)}</label>
            <input type="password" id="input-password" required placeholder="${escapeHtml(data.auth.passwordPlaceholder)}" autocomplete="current-password">
          </div>
          <button type="submit" class="btn-primary w-full" id="btn-submit-auth">
            ${escapeHtml(data.auth.btnSignIn)}
          </button>
        </form>

        <div class="auth-footer-toggle">
          <span id="auth-toggle-label">${escapeHtml(data.auth.switchNewHere)}</span>
          <button type="button" class="btn-link" id="btn-toggle-auth-mode">${escapeHtml(data.auth.btnSignUp)}</button>
        </div>
      </div>
    </div>
  </div>`;
}

function renderPaymentModal(data, locale) {
  return `
  <div class="modal-overlay" id="payment-modal" style="display: none;" role="dialog" aria-modal="true" aria-labelledby="payment-modal-title">
    <div class="modal-card payment-card">
      <button class="modal-close" id="btn-close-payment" aria-label="${escapeHtml(data.ui.close)}">✕</button>
      <div class="modal-header">
        <span class="modal-badge">${escapeHtml(data.payment.badge)}</span>
        <h2 class="modal-title" id="payment-modal-title">${escapeHtml(data.payment.title)}</h2>
        <p class="modal-subtitle" id="payment-pack-subtitle">3 Videos Pack · $17.99</p>
      </div>

      <div class="payment-body">
        <div class="simulated-checkout">
          <div class="checkout-summary">
            <div class="summary-line">
              <span id="checkout-item-name">3 Videos Pack</span>
              <span class="summary-price" id="checkout-item-price">$17.99</span>
            </div>
            <div class="summary-line text-sm text-dim">
              <span>Instant Credits Delivery</span>
              <span class="text-success">+3 Credits</span>
            </div>
            <div class="summary-line guarantee-line">
              <span class="shield-icon">🛡</span>
              <span>${escapeHtml(data.home.pricing.guaranteeTitle)}: Credits returned if render fails</span>
            </div>
          </div>

          <div class="payment-actions">
            <button type="button" class="btn-primary w-full" id="btn-confirm-checkout">
              <span>Complete Payment ($17.99)</span>
            </button>
            <p class="payment-security-note">256-bit encrypted secure checkout via Stripe</p>
          </div>
        </div>
      </div>
    </div>
  </div>`;
}

// -------------------------------------------------------------
// HERO GENERATOR WIDGET (Above the Fold)
// -------------------------------------------------------------
function renderHeroGenerator(data, locale) {
  const g = data.home.heroGenerator;

  const presetButtons = g.presets.map((p, idx) => `
    <button type="button" class="preset-btn ${idx === 0 ? 'selected' : ''}" data-char-id="${p.id}" data-char-img="${p.img}" data-char-name="${escapeHtml(p.name)}">
      <img src="${p.img}" alt="${escapeHtml(p.name)}" class="preset-thumb" width="56" height="56" loading="lazy">
      <span class="preset-meta">
        <strong class="preset-name">${escapeHtml(p.name)}</strong>
        <span class="preset-role">${escapeHtml(p.role)}</span>
      </span>
    </button>
  `).join('');

  const moveCards = g.moves.map((m, idx) => `
    <button type="button" class="move-card ${idx === 0 ? 'selected' : ''}" data-move-id="${m.id}" data-move-video="${m.video}" data-move-name="${escapeHtml(m.name)}">
      <div class="move-thumb-wrap">
        <img src="${m.thumb}" alt="${escapeHtml(m.name)}" width="80" height="110" loading="lazy">
        <span class="move-play-icon">▶</span>
      </div>
      <div class="move-info">
        <span class="move-tag">${escapeHtml(m.tag)}</span>
        <strong class="move-name">${escapeHtml(m.name)}</strong>
        <span class="move-dur">${escapeHtml(m.duration)}</span>
      </div>
    </button>
  `).join('');

  return `
  <div class="hero-generator-card" id="studio">
    <div class="card-glow-accent"></div>
    <div class="generator-header">
      <div class="generator-badge">
        <span class="pulse-dot"></span>
        <span>${escapeHtml(g.badge)}</span>
      </div>
      <span class="generator-runtime">~2 mins render · 9:16 HD</span>
    </div>

    <!-- Active Stage 1: Editor Controls -->
    <div class="generator-workspace" id="generator-workspace">
      <!-- Step 1: Character -->
      <div class="gen-section">
        <div class="section-label-row">
          <span class="section-step-num">1</span>
          <div class="section-titles">
            <span class="section-title">${escapeHtml(g.step1Title)}</span>
            <span class="section-hint">${escapeHtml(g.step1Hint)}</span>
          </div>
        </div>

        <div class="char-dropzone" id="char-dropzone">
          <input type="file" id="char-file-input" accept="image/jpeg,image/png,image/webp" style="display:none;">
          <div class="dropzone-empty" id="dropzone-empty">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M12 16V8M12 8L9 11M12 8L15 11" stroke="#6366f1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.2)" stroke-width="1.5"/></svg>
            <span class="dropzone-text">${escapeHtml(g.dropHint)}</span>
          </div>
          <div class="dropzone-preview" id="dropzone-preview" style="display:none;">
            <img id="preview-char-img" src="/media/char-street.webp" alt="Character Preview">
            <span class="preview-badge" id="preview-char-label">Street Dancer</span>
          </div>
        </div>

        <div class="preset-group">
          <div class="preset-label">${escapeHtml(g.presetLabel)}</div>
          <div class="presets-row">
            ${presetButtons}
          </div>
        </div>
      </div>

      <!-- Step 2: Motion Routine -->
      <div class="gen-section">
        <div class="section-label-row">
          <span class="section-step-num">2</span>
          <div class="section-titles">
            <span class="section-title">${escapeHtml(g.step2Title)}</span>
            <span class="section-hint">${escapeHtml(g.step2Hint)}</span>
          </div>
        </div>

        <div class="moves-grid">
          ${moveCards}
        </div>
      </div>

      <!-- Action Button & Guarantee -->
      <div class="gen-cta-row">
        <button type="button" class="btn-primary btn-generate-trigger w-full" id="btn-start-generate">
          <span class="btn-sparkle">✦</span>
          <span id="btn-generate-text">${escapeHtml(g.btnGenerate)}</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 12L10 8L6 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </button>
        <p class="gen-specs-note">${escapeHtml(g.specs)}</p>
      </div>
    </div>

    <!-- Generating Progress Screen (Hidden initially) -->
    <div class="generator-progress" id="generator-progress" style="display: none;">
      <div class="progress-spinner-wrap">
        <div class="spin-ring"></div>
        <div class="spin-inner">✦</div>
      </div>
      <h3 class="progress-title" id="progress-status-title">Extracting 3D Pose Geometry…</h3>
      <p class="progress-sub" id="progress-status-sub">Tracking full-body joints and facial landmarks</p>
      <div class="progress-track">
        <div class="progress-bar-fill" id="progress-bar-fill" style="width: 15%;"></div>
      </div>
      <span class="progress-percent" id="progress-percent">15%</span>
      <p class="progress-shield-note">🛡 Credit Protected: Credits restore automatically if render is interrupted.</p>
    </div>

    <!-- Result Screen (Preloaded with sample / output) -->
    <div class="generator-result" id="generator-result" style="display: none;">
      <div class="result-header">
        <span class="badge-success">${escapeHtml(g.readyBadge)}</span>
        <h3 class="result-title">${escapeHtml(g.readyTitle)}</h3>
      </div>

      <div class="result-player-container">
        <!-- Interactive Output Video -->
        <div class="video-wrapper">
          <video id="result-video" playsinline loop muted autoplay preload="metadata" poster="/media/out-street-hiphop.webp">
            <source id="result-video-src" src="/media/out-street-hiphop.mp4" type="video/mp4">
          </video>
          <div class="video-overlay-ctrls">
            <button type="button" class="btn-toggle-sound" id="btn-toggle-sound" aria-label="Toggle Audio">🔊</button>
            <div class="compare-toggle-bar">
              <button type="button" class="tab-pill active" id="tab-show-output">AI Render</button>
              <button type="button" class="tab-pill" id="tab-show-source">Source Move</button>
            </div>
          </div>
        </div>
      </div>

      <div class="result-actions">
        <a id="btn-download-result" href="/media/out-street-hiphop.mp4" download="genjutsu-dance.mp4" class="btn-primary">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 2V11M8 11L4.5 7.5M8 11L11.5 7.5M2.5 14H13.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
          <span>${escapeHtml(g.btnDownload)}</span>
        </a>
        <button type="button" class="btn-secondary" id="btn-copy-caption">
          <span>${escapeHtml(g.btnCopyCaption)}</span>
        </button>
        <button type="button" class="btn-ghost" id="btn-reset-studio">
          <span>${escapeHtml(g.btnReset)}</span>
        </button>
      </div>
    </div>
  </div>`;
}

// -------------------------------------------------------------
// SHOWCASE SECTION
// -------------------------------------------------------------
function renderShowcase(data, locale) {
  const s = data.home.showcase;

  const cards = s.items.map((item, idx) => `
    <article class="showcase-card" data-showcase-id="${item.id}" data-char-img="${item.charImg}" data-src-video="${item.srcVideo}" data-out-video="${item.video}">
      <div class="showcase-video-box">
        <video class="showcase-video" loop muted playsinline preload="none" poster="${item.poster}">
          <source src="${item.video}" type="video/mp4">
        </video>
        <span class="showcase-tag">${escapeHtml(item.tag)}</span>
        <div class="showcase-view-controls">
          <button type="button" class="view-btn active" data-view="out">${escapeHtml(s.btnToggleOut)}</button>
          <button type="button" class="view-btn" data-view="src">${escapeHtml(s.btnToggleSrc)}</button>
        </div>
      </div>

      <div class="showcase-meta">
        <h3 class="showcase-title">${escapeHtml(item.title)}</h3>
        <p class="showcase-desc">${escapeHtml(item.desc)}</p>
        <div class="showcase-footer">
          <div class="pair-avatars">
            <img src="${item.charImg}" alt="Character" class="char-chip" width="32" height="32" loading="lazy">
            <span class="arrow-join">→</span>
            <span class="motion-chip">9:16 HD</span>
          </div>
          <button type="button" class="btn-try-style" data-target-char="${item.id}">
            Try Style ↗
          </button>
        </div>
      </div>
    </article>
  `).join('');

  return `
  <section class="section showcase-section" id="showcase">
    <div class="section-container">
      <div class="section-header text-center">
        <span class="section-eyebrow">${escapeHtml(s.eyebrow)}</span>
        <h2 class="section-title">${escapeHtml(s.title)}</h2>
        <p class="section-intro">${escapeHtml(s.intro)}</p>
      </div>

      <div class="showcase-grid">
        ${cards}
      </div>
    </div>
  </section>`;
}

// -------------------------------------------------------------
// THREE MODES / PILLARS SECTION
// -------------------------------------------------------------
function renderPillars(data, locale) {
  const p = data.home.pillars;
  const icons = [
    `<svg width="32" height="32" viewBox="0 0 24 24" fill="none"><path d="M12 2L15 8L22 9L17 14L18 21L12 18L6 21L7 14L2 9L9 8L12 2Z" stroke="#6366f1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    `<svg width="32" height="32" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="#8b5cf6" stroke-width="2"/><path d="M8 12L12 8L16 12L12 16L8 12Z" fill="#8b5cf6"/><path d="M12 3V21M3 12H21" stroke="rgba(255,255,255,0.2)" stroke-width="1.5"/></svg>`,
    `<svg width="32" height="32" viewBox="0 0 24 24" fill="none"><rect x="2" y="4" width="20" height="16" rx="3" stroke="#06b6d4" stroke-width="2"/><path d="M10 9L15 12L10 15V9Z" fill="#06b6d4"/><circle cx="6" cy="8" r="1" fill="#fff"/><circle cx="18" cy="8" r="1" fill="#fff"/></svg>`
  ];

  const items = p.items.map((item, idx) => `
    <div class="pillar-card">
      <div class="pillar-icon">${icons[idx] || ''}</div>
      <h3 class="pillar-title">${escapeHtml(item.title)}</h3>
      <p class="pillar-desc">${escapeHtml(item.desc)}</p>
    </div>
  `).join('');

  return `
  <section class="section pillars-section" id="modes">
    <div class="section-container">
      <div class="section-header text-center">
        <span class="section-eyebrow">${escapeHtml(p.eyebrow)}</span>
        <h2 class="section-title">${escapeHtml(p.title)}</h2>
      </div>
      <div class="pillars-grid">
        ${items}
      </div>
    </div>
  </section>`;
}

// -------------------------------------------------------------
// HOW IT WORKS SECTION
// -------------------------------------------------------------
function renderHowItWorks(data, locale) {
  const h = data.home.howItWorks;

  const steps = h.steps.map(s => `
    <div class="step-card">
      <div class="step-num">${escapeHtml(s.num)}</div>
      <h3 class="step-title">${escapeHtml(s.title)}</h3>
      <p class="step-desc">${escapeHtml(s.desc)}</p>
    </div>
  `).join('');

  return `
  <section class="section how-it-works-section" id="how-it-works">
    <div class="section-container">
      <div class="section-header text-center">
        <span class="section-eyebrow">${escapeHtml(h.eyebrow)}</span>
        <h2 class="section-title">${escapeHtml(h.title)}</h2>
      </div>
      <div class="steps-grid">
        ${steps}
      </div>
    </div>
  </section>`;
}

// -------------------------------------------------------------
// COMPARISON MATRIX SECTION
// -------------------------------------------------------------
function renderComparison(data, locale) {
  const c = data.home.comparison;

  const headerThs = c.headers.map((h, i) => `
    <th class="${i === 1 ? 'th-highlight' : ''}">${escapeHtml(h)}</th>
  `).join('');

  const rowTds = c.rows.map(row => {
    return `<tr>
      <td class="td-feature">${escapeHtml(row[0])}</td>
      <td class="td-highlight"><strong>${escapeHtml(row[1])}</strong></td>
      <td>${escapeHtml(row[2])}</td>
      <td>${escapeHtml(row[3])}</td>
      <td>${escapeHtml(row[4])}</td>
    </tr>`;
  }).join('');

  return `
  <section class="section comparison-section" id="comparison">
    <div class="section-container">
      <div class="section-header text-center">
        <span class="section-eyebrow">${escapeHtml(c.eyebrow)}</span>
        <h2 class="section-title">${escapeHtml(c.title)}</h2>
      </div>

      <div class="table-scroll-wrap">
        <table class="comparison-table">
          <thead>
            <tr>${headerThs}</tr>
          </thead>
          <tbody>
            ${rowTds}
          </tbody>
        </table>
      </div>
    </div>
  </section>`;
}

// -------------------------------------------------------------
// PRICING SECTION
// -------------------------------------------------------------
function renderPricing(data, locale) {
  const p = data.home.pricing;

  const packCards = p.packs.map(pack => `
    <div class="price-card ${pack.popular ? 'price-card-popular' : ''}">
      ${pack.popular ? '<span class="popular-ribbon">Most Popular</span>' : ''}
      <h3 class="pack-name">${escapeHtml(pack.name)}</h3>
      <div class="price-value-row">
        <span class="price-amount">${escapeHtml(pack.price)}</span>
        <span class="price-unit">${escapeHtml(pack.unit)}</span>
      </div>
      <p class="pack-desc">${escapeHtml(pack.desc)}</p>
      <button type="button" class="btn-${pack.popular ? 'primary' : 'secondary'} w-full btn-buy-pack" data-pack-name="${escapeHtml(pack.name)}" data-pack-price="${escapeHtml(pack.price)}">
        ${escapeHtml(p.cta)}
      </button>
    </div>
  `).join('');

  return `
  <section class="section pricing-section" id="pricing">
    <div class="section-container">
      <div class="section-header text-center">
        <span class="section-eyebrow">${escapeHtml(p.eyebrow)}</span>
        <h2 class="section-title">${escapeHtml(p.title)}</h2>
        <p class="section-intro">${escapeHtml(p.intro)}</p>
      </div>

      <div class="pricing-grid">
        ${packCards}
      </div>

      <div class="guarantee-banner">
        <div class="guarantee-icon">🛡</div>
        <div class="guarantee-text">
          <strong class="guarantee-title">${escapeHtml(p.guaranteeTitle)}</strong>
          <p class="guarantee-desc">${escapeHtml(p.guaranteeDesc)}</p>
        </div>
      </div>
    </div>
  </section>`;
}

// -------------------------------------------------------------
// FAQ SECTION
// -------------------------------------------------------------
function renderFaq(data, locale) {
  const f = data.home.faq;

  const faqItems = f.items.map((item, idx) => `
    <details class="faq-item" ${idx === 0 ? 'open' : ''}>
      <summary class="faq-question">
        <span>${escapeHtml(item.q)}</span>
        <span class="faq-icon">+</span>
      </summary>
      <div class="faq-answer">
        <p>${escapeHtml(item.a)}</p>
      </div>
    </details>
  `).join('');

  return `
  <section class="section faq-section" id="faq">
    <div class="section-container max-w-prose">
      <div class="section-header text-center">
        <span class="section-eyebrow">${escapeHtml(f.eyebrow)}</span>
        <h2 class="section-title">${escapeHtml(f.title)}</h2>
      </div>

      <div class="faq-accordion">
        ${faqItems}
      </div>
    </div>
  </section>`;
}

// -------------------------------------------------------------
// BOTTOM CTA
// -------------------------------------------------------------
function renderCta(data, locale) {
  return `
  <section class="section cta-banner-section">
    <div class="section-container">
      <div class="cta-inner-card">
        <div class="cta-content">
          <span class="cta-badge">✦ INSTANT AI MOTION TRANSFER</span>
          <h2 class="cta-title">Ready to Make Your Character Move?</h2>
          <p class="cta-desc">Upload any portrait or digital illustration and watch it dance in high definition with identity locked.</p>
          <a href="#studio" class="btn-primary btn-glow btn-lg">
            <span>Animate Character Now</span>
            <svg width="18" height="18" viewBox="0 0 16 16" fill="none"><path d="M6 12L10 8L6 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </a>
        </div>
      </div>
    </div>
  </section>`;
}

// -------------------------------------------------------------
// HOME PAGE BUILDER
// -------------------------------------------------------------
export function renderHomePage(locale = 'en') {
  const data = getLocaleData(locale);
  const h = data.home.hero;

  const statsHtml = h.stats.map(s => `
    <div class="stat-box">
      <strong class="stat-val">${escapeHtml(s.val)}</strong>
      <span class="stat-label">${escapeHtml(s.label)}</span>
    </div>
  `).join('');

  // Video Schema for the 4 showcases
  const videoSchemas = data.home.showcase.items.map(item => ({
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": item.title,
    "description": item.desc,
    "thumbnailUrl": `${siteConfig.origin}${item.poster}`,
    "uploadDate": "2026-10-01T08:00:00+08:00",
    "contentUrl": `${siteConfig.origin}${item.video}`
  }));

  // FAQ Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": data.home.faq.items.map(i => ({
      "@type": "Question",
      "name": i.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": i.a
      }
    }))
  };

  const bodyContent = `
  <!-- HERO SECTION WITH INTEGRATED STUDIO -->
  <section class="hero-section">
    <div class="hero-bg-lights">
      <div class="light-orb orb-indigo"></div>
      <div class="light-orb orb-violet"></div>
    </div>
    
    <div class="hero-container">
      <div class="hero-split-grid">
        <!-- Left: Value Proposition -->
        <div class="hero-left">
          <div class="eyebrow-pill">
            <span class="spark-icon">✦</span>
            <span>${escapeHtml(h.eyebrow)}</span>
          </div>

          <h1 class="hero-title">${escapeHtml(h.h1)}</h1>
          <p class="hero-lead">${escapeHtml(h.lead)}</p>

          <div class="hero-stats-row">
            ${statsHtml}
          </div>

          <div class="hero-badges">
            <span class="trust-pill">✓ 100% Face & Wardrobe Lock</span>
            <span class="trust-pill">✓ Vertical 9:16 HD MP4</span>
            <span class="trust-pill">✓ Zero 3D MoCap Required</span>
          </div>
        </div>

        <!-- Right: HERO GENERATOR (Above the fold) -->
        <div class="hero-right">
          ${renderHeroGenerator(data, locale)}
        </div>
      </div>
    </div>
  </section>

  ${renderShowcase(data, locale)}
  ${renderPillars(data, locale)}
  ${renderHowItWorks(data, locale)}
  ${renderComparison(data, locale)}
  ${renderPricing(data, locale)}
  ${renderFaq(data, locale)}
  ${renderCta(data, locale)}
  `;

  return renderShell({
    locale,
    title: data.meta.homeTitle,
    description: data.meta.homeDescription,
    slug: '',
    bodyContent,
    activeNav: 'home',
    extraSchema: [...videoSchemas, faqSchema]
  });
}

// -------------------------------------------------------------
// DEDICATED GENERATOR STUDIO PAGE
// -------------------------------------------------------------
export function renderGeneratorPage(locale = 'en') {
  const data = getLocaleData(locale);

  const bodyContent = `
  <section class="section dedicated-studio-section">
    <div class="section-container">
      <div class="section-header text-center">
        <span class="section-eyebrow">CREATION STUDIO</span>
        <h1 class="section-title">${escapeHtml(data.generator.h1)}</h1>
        <p class="section-intro">${escapeHtml(data.generator.subtitle)}</p>
      </div>

      <div class="studio-wrapper max-w-4xl mx-auto">
        ${renderHeroGenerator(data, locale)}
      </div>
    </div>
  </section>
  `;

  return renderShell({
    locale,
    title: data.generator.metaTitle,
    description: data.generator.metaDescription,
    slug: 'generator',
    bodyContent,
    activeNav: 'studio'
  });
}

// -------------------------------------------------------------
// USER DASHBOARD & VIDEO LIBRARY PAGE
// -------------------------------------------------------------
export function renderDashboardPage(locale = 'en') {
  const data = getLocaleData(locale);
  const d = data.dashboard;

  const bodyContent = `
  <section class="section dashboard-section">
    <div class="section-container">
      <div class="dashboard-header">
        <div>
          <h1 class="dashboard-title">${escapeHtml(d.h1)}</h1>
          <p class="dashboard-lead">${escapeHtml(d.lead)}</p>
        </div>
        <div class="dashboard-balance-card">
          <span class="balance-label">${escapeHtml(d.balanceLabel)}</span>
          <div class="balance-count">
            <span class="count-num" id="dashboard-credits-count">3</span>
            <span class="count-unit">${escapeHtml(d.creditsUnit)}</span>
          </div>
          <button type="button" class="btn-primary btn-sm" id="btn-dashboard-add-credits">
            + ${escapeHtml(d.addCredits)}
          </button>
        </div>
      </div>

      <!-- Video Library -->
      <div class="dashboard-block">
        <h2 class="block-title">${escapeHtml(d.myVideosTitle)}</h2>
        <div class="videos-grid" id="user-videos-grid">
          <!-- Populated client-side from local ledger -->
          <div class="empty-videos-state" id="empty-videos-state">
            <div class="empty-icon">🎬</div>
            <h3 class="empty-title">${escapeHtml(d.emptyVideosTitle)}</h3>
            <p class="empty-desc">${escapeHtml(d.emptyVideosDesc)}</p>
            <a href="${localizeUrl('', locale)}#studio" class="btn-primary">${escapeHtml(d.btnCreateFirst)}</a>
          </div>
        </div>
      </div>

      <!-- Purchase History -->
      <div class="dashboard-block">
        <h2 class="block-title">${escapeHtml(d.ordersTitle)}</h2>
        <div class="table-scroll-wrap">
          <table class="orders-table">
            <thead>
              <tr>
                <th>${escapeHtml(d.colOrder)}</th>
                <th>${escapeHtml(d.colPlan)}</th>
                <th>${escapeHtml(d.colDate)}</th>
                <th>${escapeHtml(d.colAmount)}</th>
                <th>${escapeHtml(d.colStatus)}</th>
              </tr>
            </thead>
            <tbody id="user-orders-body">
              <tr>
                <td colspan="5" class="text-center text-dim">${escapeHtml(d.emptyOrders)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </section>
  `;

  return renderShell({
    locale,
    title: d.metaTitle,
    description: d.metaDescription,
    slug: 'dashboard',
    bodyContent,
    activeNav: 'dashboard'
  });
}

// -------------------------------------------------------------
// PRICING PAGE
// -------------------------------------------------------------
export function renderPricingPage(locale = 'en') {
  const data = getLocaleData(locale);
  const p = data.pricingPage;

  const bodyContent = `
  <section class="section pricing-page-header">
    <div class="section-container text-center">
      <span class="section-eyebrow">TRANSPARENT PRICING</span>
      <h1 class="section-title">${escapeHtml(p.h1)}</h1>
      <p class="section-intro">${escapeHtml(p.intro)}</p>
    </div>
  </section>
  ${renderPricing(data, locale)}
  ${renderFaq(data, locale)}
  `;

  return renderShell({
    locale,
    title: p.metaTitle,
    description: p.metaDescription,
    slug: 'pricing',
    bodyContent,
    activeNav: 'pricing'
  });
}

// -------------------------------------------------------------
// ARTICLE / EDITORIAL GUIDE PAGE
// -------------------------------------------------------------
export function renderArticlePage(locale = 'en', articleKey = '', currentSlug = '') {
  const data = getLocaleData(locale);
  const article = data.articles[articleKey];
  if (!article) return '';

  const sectionsHtml = (article.sections || []).map(sec => `
    <section class="article-section">
      <h2 class="article-subheading">${escapeHtml(sec.heading)}</h2>
      <p class="article-paragraph">${escapeHtml(sec.body)}</p>
    </section>
  `).join('');

  const homeUrl = localizeUrl('', locale);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.h1,
    "description": article.metaDescription,
    "inLanguage": locale,
    "publisher": {
      "@type": "Organization",
      "name": siteConfig.fullName,
      "url": siteConfig.origin
    },
    "datePublished": "2026-10-01T08:00:00+08:00",
    "dateModified": "2026-10-06T12:00:00+08:00"
  };

  const extraSchema = [articleSchema];

  // FAQ Schema if article has faq
  if (Array.isArray(article.faq) && article.faq.length > 0) {
    extraSchema.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": article.faq.map(item => ({
        "@type": "Question",
        "name": item.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": item.a
        }
      }))
    });
  }

  // Quick Answer HTML (GEO & Snippet optimization)
  const quickAnswerHtml = article.quickAnswer ? `
    <div class="quick-answer-card">
      <div class="qa-badge">⚡ Direct Answer / Key Takeaway</div>
      <p class="qa-text">${escapeHtml(article.quickAnswer)}</p>
    </div>
  ` : '';

  // Comparison Table HTML
  const comparisonTableHtml = article.comparisonTable ? `
    <div class="article-block-wrap">
      <h2 class="article-subheading">Feature & Performance Comparison</h2>
      <div class="table-scroll-wrap">
        <table class="article-table">
          <thead>
            <tr>
              ${article.comparisonTable.headers.map(h => `<th>${escapeHtml(h)}</th>`).join('')}
            </tr>
          </thead>
          <tbody>
            ${article.comparisonTable.rows.map(row => `
              <tr>
                ${row.map((cell, idx) => `<td class="${idx === 0 ? 'cell-highlight' : ''}">${escapeHtml(cell)}</td>`).join('')}
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  ` : '';

  // Prompt Templates HTML
  const promptTemplatesHtml = (article.promptTemplates && article.promptTemplates.length > 0) ? `
    <div class="article-block-wrap">
      <h2 class="article-subheading">Ready-to-Use Video-to-Video Prompts</h2>
      <div class="templates-grid">
        ${article.promptTemplates.map(pt => `
          <div class="template-card">
            <div class="template-header">
              <span class="template-style">${escapeHtml(pt.style)}</span>
              <button type="button" class="btn-copy-template" data-prompt="${escapeHtml(pt.prompt)}">Copy Prompt</button>
            </div>
            <div class="template-code"><code>${escapeHtml(pt.prompt)}</code></div>
            ${pt.tip ? `<p class="template-tip">💡 <strong>Tip:</strong> ${escapeHtml(pt.tip)}</p>` : ''}
          </div>
        `).join('')}
      </div>
    </div>
  ` : '';

  // FAQ HTML
  const faqHtml = (article.faq && article.faq.length > 0) ? `
    <div class="article-block-wrap">
      <h2 class="article-subheading">Frequently Asked Questions</h2>
      <div class="article-faq-list">
        ${article.faq.map(item => `
          <details class="article-faq-item">
            <summary class="faq-summary">
              <span>${escapeHtml(item.q)}</span>
              <span class="faq-icon">▾</span>
            </summary>
            <div class="faq-answer">
              <p>${escapeHtml(item.a)}</p>
            </div>
          </details>
        `).join('')}
      </div>
    </div>
  ` : '';

  const bodyContent = `
  <article class="article-container max-w-prose">
    <nav class="breadcrumb" aria-label="Breadcrumb">
      <a href="${homeUrl}">${escapeHtml(data.ui.home)}</a>
      <span class="crumb-sep">/</span>
      <span aria-current="page">${escapeHtml(article.navLabel || article.h1)}</span>
    </nav>

    <header class="article-header">
      <h1 class="article-title">${escapeHtml(article.h1)}</h1>
      <p class="article-lead">${escapeHtml(article.intro)}</p>
      <div class="article-meta-bar">
        <span>Published by Genjutsu AI Lab</span> ·
        <span>Updated October 2026</span>
      </div>
    </header>

    ${quickAnswerHtml}

    <div class="article-body">
      ${sectionsHtml}
    </div>

    ${comparisonTableHtml}
    ${promptTemplatesHtml}
    ${faqHtml}

    <div class="article-cta-box">
      <h3>Ready to create your first video?</h3>
      <p>Transform any portrait or artwork into dynamic choreography in minutes.</p>
      <a href="${homeUrl}#studio" class="btn-primary">Try Studio Now →</a>
    </div>
  </article>
  `;

  return renderShell({
    locale,
    title: article.metaTitle,
    description: article.metaDescription,
    slug: currentSlug || article.slug || articleKey,
    canonicalSlug: article.slug || articleKey,
    bodyContent,
    activeNav: 'articles',
    extraSchema
  });
}
