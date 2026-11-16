
import { createServer } from 'vite';
import { renderToString } from 'react-dom/server';
import { createElement } from 'react';

import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const SITE_URL = 'https://www.cahyame.my.id';

const seoContent = {
  en: {
    title: 'Muhammad Fandi Nurcahya — Junior Software Engineer Portfolio',
    description:
      'Portfolio of Muhammad Fandi Nurcahya, Junior Software Engineer. Explore experience, projects, skills, education, and contact information.',
  },
  id: {
    title: 'Muhammad Fandi Nurcahya — Portofolio Junior Software Engineer',
    description:
      'Portofolio Muhammad Fandi Nurcahya, Junior Software Engineer. Lihat pengalaman kerja, proyek, keahlian, pendidikan, dan kontak.',
  },
  root: {
    title: 'Muhammad Fandi Nurcahya — Portfolio',
    description: 'Pilih bahasa / Choose language: Bahasa Indonesia atau English.',
  },
};

function fillTemplate(template: string, lang: 'en' | 'id' | 'root') {
  const c = lang === 'root' ? seoContent.root : seoContent[lang];
  const htmlLang = lang === 'id' ? 'id' : 'en';
  const canonical = lang === 'root' ? `${SITE_URL}/` : `${SITE_URL}/${lang}/`;
  let html = template;
  html = html.replace(/<html\b[^>]*>/i, `<html lang="${htmlLang}" class="scroll-smooth">`);
  html = html.replace(/lang="__LANG__"/g, `lang="${htmlLang}"`);
  html = html.replaceAll('__LANG__', htmlLang);
  html = html.replaceAll('__TITLE__', c.title);
  html = html.replaceAll('__DESCRIPTION__', c.description);
  html = html.replaceAll('__CANONICAL__', canonical);
  // fallback if placeholders already replaced
  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${c.title}</title>`);
  html = html.replace(/<meta\s+name="description"[^>]*>/i, `<meta name="description" content="${c.description}" />`);
  html = html.replace(/<link\s+rel="canonical"[^>]*>/i, `<link rel="canonical" href="${canonical}" />`);
  return html;
}

async function prerender() {
  const distDirectory = path.resolve('dist');

  const template = await readFile(
    path.join(distDirectory, 'index.html'),
    'utf-8'
  );

  const vite = await createServer({
    configFile: path.resolve('vite.config.ts'),
    server: {
      middlewareMode: true,
    },
    appType: 'custom',
  });

  try {
    const { default: App } = await vite.ssrLoadModule('/src/App.tsx');
    const { default: i18n } = await vite.ssrLoadModule('/src/i18n.ts');

    for (const lang of ['en', 'id'] as const) {
      (globalThis as any).window = {
        location: { pathname: `/${lang}/`, hash: '' },
        addEventListener: () => {},
        removeEventListener: () => {},
        scrollY: 0,
      };
      (globalThis as any).document = {
        documentElement: { lang },
        title: '',
        head: { querySelector: () => null, appendChild: () => {} },
        body: { style: {} },
      };
      await i18n.changeLanguage(lang);

      const markup = renderToString(createElement(App));
      const html = fillTemplate(template, lang).replace(
        '<div id="root"></div>',
        `<div id="root">${markup}</div>`
      );

      const outputDirectory = path.join(distDirectory, lang);
      await mkdir(outputDirectory, { recursive: true });
      await writeFile(path.join(outputDirectory, 'index.html'), html, 'utf-8');
      console.log(`Prerendered: /${lang}/`);
    }

    // Root page (language chooser shell / metadata)
    (globalThis as any).window = {
      location: { pathname: '/', hash: '' },
      addEventListener: () => {},
      removeEventListener: () => {},
      scrollY: 0,
    };
    (globalThis as any).document = {
      documentElement: { lang: 'en' },
      title: '',
      head: { querySelector: () => null, appendChild: () => {} },
      body: { style: {} },
    };
    const rootMarkup = renderToString(createElement(App));
    const rootHtml = fillTemplate(template, 'root').replace(
      '<div id="root"></div>',
      `<div id="root">${rootMarkup}</div>`
    );
    await writeFile(path.join(distDirectory, 'index.html'), rootHtml, 'utf-8');

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
>
  <url>
    <loc>${SITE_URL}/en/</loc>
    <xhtml:link rel="alternate" hreflang="en" href="${SITE_URL}/en/" />
    <xhtml:link rel="alternate" hreflang="id" href="${SITE_URL}/id/" />
  </url>
  <url>
    <loc>${SITE_URL}/id/</loc>
    <xhtml:link rel="alternate" hreflang="en" href="${SITE_URL}/en/" />
    <xhtml:link rel="alternate" hreflang="id" href="${SITE_URL}/id/" />
  </url>
</urlset>
`;
    await writeFile(path.join(distDirectory, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`, 'utf-8');
    await writeFile(path.join(distDirectory, 'sitemap.xml'), sitemap, 'utf-8');
  } finally {
    await vite.close();
  }
}

prerender().catch((error) => {
  console.error('Prerender failed:', error);
  process.exitCode = 1;
});
