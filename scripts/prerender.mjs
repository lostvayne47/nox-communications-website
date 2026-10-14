import { readFile, writeFile, rm } from 'node:fs/promises';
import { loadEnv } from 'vite';
import { render } from '../.prerender/entry-server.js';

const site = JSON.parse(await readFile('src/content/site.json', 'utf8'));
const env = { ...loadEnv('production', process.cwd(), ''), ...process.env };
const deploymentUrl = env.CONTEXT && env.CONTEXT !== 'production' ? env.DEPLOY_PRIME_URL : env.URL;
const input = env.SITE_URL || deploymentUrl;
let origin;
if (input) {
  const url = new URL(input);
  if (!['https:', 'http:'].includes(url.protocol) || url.pathname !== '/' || url.search || url.hash) {
    throw new Error('SITE_URL must be an absolute domain URL, without a path, query or hash.');
  }
  origin = url.origin;
}
const preview = Boolean(env.CONTEXT && env.CONTEXT !== 'production');
const escape = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const meta = (name, value, property = false) => `<meta ${property ? 'property' : 'name'}="${name}" content="${escape(value)}"/>`;
const schema = {
  '@context': 'https://schema.org', '@type': 'ProfessionalService',
  name: site.brand.name, description: site.seo.description,
  email: site.contact.email, telephone: site.contact.phoneHref,
  ...(origin ? { url: origin + '/' } : {}),
  hasOfferCatalog: { '@type': 'OfferCatalog', name: site.services.title,
    itemListElement: site.services.items.map(item => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: item.title, description: item.description } })) },
};
const head = [
  `<title>${escape(site.seo.title)}</title>`, meta('description', site.seo.description),
  meta('theme-color', '#121219'), meta('robots', preview ? 'noindex, nofollow' : 'index, follow'),
  meta('og:type', 'website', true), meta('og:title', site.seo.title, true),
  meta('og:description', site.seo.description, true), meta('og:site_name', site.brand.name, true),
  meta('og:locale', site.seo.locale, true), meta('twitter:card', 'summary'),
  meta('twitter:title', site.seo.title), meta('twitter:description', site.seo.description),
  ...(origin ? [`<link rel="canonical" href="${escape(origin)}/"/>`, meta('og:url', origin + '/', true)] : []),
  `<script type="application/ld+json">${JSON.stringify(schema).replace(/</g, '\\u003c')}</script>`,
].join('\n');
const template = await readFile('dist/index.html', 'utf8');
await writeFile('dist/index.html', template.replace('<!--seo-head-->', head).replace('<!--app-html-->', render()));
await writeFile('dist/robots.txt', preview ? 'User-agent: *\nDisallow: /\n' : `User-agent: *\nAllow: /\n${origin ? `Sitemap: ${origin}/sitemap.xml\n` : ''}`);
if (origin) await writeFile('dist/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${escape(origin)}/</loc></url></urlset>\n`);
await rm('.prerender', { recursive: true, force: true });
console.log(`Prerendered homepage, SEO metadata and robots.txt.${origin ? ' Sitemap generated.' : ' Set SITE_URL to generate canonical URLs and sitemap.'}`);
