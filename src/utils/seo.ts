export type SiteLang = 'id' | 'en';

export const SITE_URL = 'https://www.cahyame.my.id';

export function getLangFromPath(pathname: string): SiteLang | null {
  if (pathname === '/id' || pathname.startsWith('/id/')) return 'id';
  if (pathname === '/en' || pathname.startsWith('/en/')) return 'en';
  return null;
}

export function getMeta(lang: SiteLang) {
  if (lang === 'id') {
    return {
      lang: 'id',
      title: 'Muhammad Fandi Nurcahya — Portofolio Junior Software Engineer',
      description: 'Portofolio Muhammad Fandi Nurcahya, Junior Software Engineer. Lihat pengalaman kerja, proyek, keahlian, pendidikan, dan kontak.',
      path: '/id/',
    };
  }
  return {
    lang: 'en',
    title: 'Muhammad Fandi Nurcahya — Junior Software Engineer Portfolio',
    description: 'Portfolio of Muhammad Fandi Nurcahya, Junior Software Engineer. Explore experience, projects, skills, education, and contact information.',
    path: '/en/',
  };
}

function upsertMeta(name: string, content: string, attr: 'name' | 'property' = 'name') {
  let el = document.head.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertLink(rel: string, href: string, hreflang?: string) {
  const selector = hreflang
    ? `link[rel="${rel}"][hreflang="${hreflang}"]`
    : `link[rel="${rel}"]:not([hreflang])`;
  let el = document.head.querySelector(selector) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    if (hreflang) el.setAttribute('hreflang', hreflang);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

export function applySeo(lang: SiteLang | null) {
  if (typeof document === 'undefined') return;
  const rootMeta = {
    title: 'Muhammad Fandi Nurcahya — Portfolio',
    description: 'Pilih bahasa / Choose language: Bahasa Indonesia atau English.',
  };

  if (!lang) {
    document.documentElement.lang = 'en';
    document.title = rootMeta.title;
    upsertMeta('description', rootMeta.description);
    upsertLink('canonical', `${SITE_URL}/`);
  } else {
    const m = getMeta(lang);
    document.documentElement.lang = m.lang;
    document.title = m.title;
    upsertMeta('description', m.description);
    upsertLink('canonical', `${SITE_URL}${m.path}`);
  }

  const desc = (document.head.querySelector('meta[name="description"]') as HTMLMetaElement)?.content || '';
  const canonical = (document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement)?.href || `${SITE_URL}/`;
  upsertMeta('og:title', document.title, 'property');
  upsertMeta('og:description', desc, 'property');
  upsertMeta('og:type', 'website', 'property');
  upsertMeta('og:url', canonical, 'property');
  upsertMeta('twitter:title', document.title);
  upsertMeta('twitter:description', desc);

  upsertLink('alternate', `${SITE_URL}/id/`, 'id');
  upsertLink('alternate', `${SITE_URL}/en/`, 'en');
  upsertLink('alternate', `${SITE_URL}/`, 'x-default');
}
