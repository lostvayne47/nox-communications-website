import { chromium } from 'playwright';
import { readFile } from 'node:fs/promises';

// Capture the real homepage with compact spacing suited to a link preview.
// This runs separately from deployment; Netlify serves the committed PNG.
const site = JSON.parse(await readFile('src/content/site.json', 'utf8'));
const browser = await chromium.launch({ channel: process.env.BROWSER_CHANNEL || 'chrome' });
try {
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  const response = await page.goto(process.env.PREVIEW_URL || 'http://127.0.0.1:4173/', { waitUntil: 'networkidle' });
  if (!response?.ok()) throw new Error('Start npm run preview before generating the share image.');
  await page.addStyleTag({ content: `
    html,body{height:630px;overflow:hidden;}
    header{position:static;background:#121219;}
    .wrap{max-width:none;padding-left:64px;padding-right:64px;}
    nav{padding:20px 0;}.wordmark{font-size:25px;}
    .navlinks,.nav-cta{display:none;}
    .hero{padding:40px 0 0;}
    .hero-grid{grid-template-columns:minmax(0,1.2fr) minmax(0,1fr);gap:48px;align-items:center;}
    .kicker{font-size:13px;max-width:40ch;margin-bottom:20px;}
    .hero h1{font-size:56px;line-height:1.08;max-width:16ch;}
    .hero-foot{margin-top:28px;gap:24px;}
    .hero-sub{font-size:15px;max-width:42ch;}
    .hero-cta{font-size:13px;padding:12px 20px;}
    .hero .info-card{padding:28px;}
    .info-heading h3{font-size:24px;}
    .audience-map{margin:24px 0;}
    .info-card figcaption{margin-top:20px;padding-top:16px;}
    main>.divider,.services,.philosophy,.approach,footer,.skip-link{display:none;}
  ` });
  await page.evaluate(async () => { await document.fonts.ready; });
  const clipped = await page.evaluate(() => [...document.querySelectorAll('.hero-copy,.hero .info-card')].some(el => el.getBoundingClientRect().bottom > 610));
  if (clipped) throw new Error('Share image content exceeds its safe area; adjust capture spacing.');
  await page.screenshot({ path: `public${site.seo.socialImage.path}`, type: 'png' });
  console.log(`Saved public${site.seo.socialImage.path} (1200 x 630). Rebuild to publish it.`);
} finally { await browser.close(); }
