import fs from 'node:fs';
import path from 'node:path';

const dist = path.resolve('dist');
const site = 'https://www.cahyame.my.id';

const pages = {
  root: {
    file: path.join(dist, 'index.html'),
    lang: 'en',
    title: 'Muhammad Fandi Nurcahya — Portfolio',
    description: 'Pilih bahasa / Choose language: Bahasa Indonesia atau English.',
    canonical: `${site}/`,
  },
  id: {
    file: path.join(dist, 'id', 'index.html'),
    lang: 'id',
    title: 'Muhammad Fandi Nurcahya — Portofolio Junior Software Engineer',
    description: 'Portofolio Muhammad Fandi Nurcahya, Junior Software Engineer. Lihat pengalaman kerja, proyek, keahlian, pendidikan, dan kontak.',
    canonical: `${site}/id/`,
  },
  en: {
    file: path.join(dist, 'en', 'index.html'),
    lang: 'en',
    title: 'Muhammad Fandi Nurcahya — Junior Software Engineer Portfolio',
    description: 'Portfolio of Muhammad Fandi Nurcahya, Junior Software Engineer. Explore experience, projects, skills, education, and contact information.',
    canonical: `${site}/en/`,
  },
};

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function upsertTag(html, regex, tag) {
  if (regex.test(html)) return html.replace(regex, tag);
  return html.replace('</head>', `    ${tag}\n  </head>`);
}

function buildHtml(base, page) {
  let html = base;
  html = html.replace(/__LANG__/g, page.lang);
  html = html.replace(/__TITLE__/g, escapeHtml(page.title));
  html = html.replace(/__DESCRIPTION__/g, escapeHtml(page.description));
  html = html.replace(/__CANONICAL__/g, page.canonical);
  // Ensure alternates/canonical tags are correct even if template changes
  html = upsertTag(html, /<link\s+rel="canonical"[^>]*>/i, `<link rel="canonical" href="${page.canonical}" />`);
  html = upsertTag(html, /<link\s+rel="alternate"\s+hreflang="id"[^>]*>/i, `<link rel="alternate" hreflang="id" href="${site}/id/" />`);
  html = upsertTag(html, /<link\s+rel="alternate"\s+hreflang="en"[^>]*>/i, `<link rel="alternate" hreflang="en" href="${site}/en/" />`);
  html = upsertTag(html, /<link\s+rel="alternate"\s+hreflang="x-default"[^>]*>/i, `<link rel="alternate" hreflang="x-default" href="${site}/" />`);
  return html;
}

if (!fs.existsSync(dist)) {
  console.error('dist/ not found. Run vite build first.');
  process.exit(1);
}

const base = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');
for (const page of Object.values(pages)) {
  fs.mkdirSync(path.dirname(page.file), { recursive: true });
  fs.writeFileSync(page.file, buildHtml(base, page), 'utf8');
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
>
  <url>
    <loc>${site}/en/</loc>
    <xhtml:link rel="alternate" hreflang="en" href="${site}/en/" />
    <xhtml:link rel="alternate" hreflang="id" href="${site}/id/" />
  </url>
  <url>
    <loc>${site}/id/</loc>
    <xhtml:link rel="alternate" hreflang="en" href="${site}/en/" />
    <xhtml:link rel="alternate" hreflang="id" href="${site}/id/" />
  </url>
</urlset>
`;

fs.writeFileSync(path.join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${site}/sitemap.xml\n`, 'utf8');
fs.writeFileSync(path.join(dist, 'sitemap.xml'), sitemap, 'utf8');

console.log('SEO pages, robots.txt, and sitemap.xml generated.');
