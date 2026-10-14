# Nox Communications

React marketing website preserving the original dark, ivory and gold design. Vite builds browser assets; React prerenders the complete homepage at build time so content is available without JavaScript. No backend is required.

## Local development

Use Node 22.12 or newer.

```sh
npm install
npm run dev
```

On Windows PowerShell with script execution disabled, use `npm.cmd` instead of `npm`.

## Production preview

```sh
npm run build
npm run check
npm run preview
```

Open http://127.0.0.1:4173. The `dist` folder contains the deployable site.

## Editing content

Edit `src/content/site.json` for brand details, headlines, navigation, services, philosophy, approach and contact information. Add a service by copying an item in `services.items` and giving it a unique `id`. React handles escaping; text fields do not accept HTML. Rebuild after changing content.

Edit `src/styles.css` for appearance. The CSS variables at the top control the palette. `src/components/Sections.jsx` contains reusable sections; `src/App.jsx` controls page composition. The initial HTML is preserved in `reference/original.html`.

## Netlify

Import this project from your Git repository. `netlify.toml` sets the build command to `npm run build`, the publish directory to `dist`, and Node to 22. Alternatively upload the built `dist` folder for a manual deployment.

Set `SITE_URL` in Netlify to your final public origin (for example, `https://your-domain.com`, without paths). Netlify's `URL` is a fallback. For a local build, copy `.env.example` to `.env` and set `SITE_URL`. Never put secrets in client content or Vite environment variables.

The build produces the page title, description, Open Graph/Twitter text metadata, ProfessionalService JSON-LD, and robots.txt. Canonical links and sitemap.xml are generated when a domain is available. Netlify deploy previews use noindex and block crawling. Real deployment and custom-domain verification remain a later phase.

## Extension points

- More pages: add page components and extend the prerender script to generate each route with its own metadata and sitemap entry. Avoid a blanket SPA fallback for SEO pages; preserve real 404 responses.
- More content: move the JSON data behind a CMS adapter when needed. Components are independent of the editing UI.
- Ads and analytics: `src/lib/analytics.js` emits `nox:contact` with email/phone method and pathname. A future consent-aware adapter can subscribe and send Meta Pixel or analytics events. These clicks indicate contact intent, not confirmed leads. No external tracking runs today.
- Social previews: add a real PNG/JPEG cover image and its absolute Open Graph/Twitter image metadata when brand artwork is available.
- Search: submit the deployed sitemap to search tools and verify canonical URLs once the final domain is known. No implementation guarantees rankings.

## Phases

1. React migration, preserved design and central content: implemented.
2. Prerendering, SEO metadata, crawl files and Netlify configuration: implemented.
3. Local production build and validation: run the commands above.
4. Deployment, final domain, approved social artwork and future ad integrations: next phase.

The existing email spelling (`noxcommuication6@gmail.com`) is preserved; confirm it before publication.
