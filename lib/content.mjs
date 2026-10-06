import {getLocaleData, supportedLocales, defaultLocale, localizeUrl} from './i18n.mjs';

export function getSitePages(locale = 'en') {
  const data = getLocaleData(locale);
  const pages = [];

  // Homepage
  pages.push({
    slug: '',
    title: data.meta.homeTitle,
    description: data.meta.homeDescription,
    type: 'home'
  });

  // Dedicated Studio / Generator Page
  pages.push({
    slug: 'generator',
    title: data.generator.metaTitle,
    description: data.generator.metaDescription,
    type: 'generator'
  });

  // User Dashboard
  pages.push({
    slug: 'dashboard',
    title: data.dashboard.metaTitle,
    description: data.dashboard.metaDescription,
    type: 'dashboard'
  });

  // Pricing Page
  pages.push({
    slug: 'pricing',
    title: data.pricingPage.metaTitle,
    description: data.pricingPage.metaDescription,
    type: 'pricing'
  });

  // Articles & Guides
  if (data.articles) {
    for (const [key, article] of Object.entries(data.articles)) {
      const primarySlug = article.slug || key;
      pages.push({
        slug: primarySlug,
        articleKey: key,
        title: article.metaTitle,
        description: article.metaDescription,
        type: 'article',
        data: article
      });

      // Also support aliases like ['what-is', 'how-to-use', 'best', 'free']
      if (Array.isArray(article.aliases)) {
        for (const alias of article.aliases) {
          pages.push({
            slug: alias,
            articleKey: key,
            title: article.metaTitle,
            description: article.metaDescription,
            type: 'article',
            data: article,
            isAlias: true
          });
        }
      }
    }
  }

  return pages;
}
