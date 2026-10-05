# Nautical blog automation — how it works

## What happens automatically on every push to `main`

1. **Index regeneration** — `.github/workflows/blog-pipeline.yml` runs `node .github/scripts/generate-blog.js`, which rebuilds `blog/index.html` and `sitemap.xml` from `blog/posts.json`. Every post gets a timestamp, a tag, a one-line "how it differs" note, and a **Read the post →** button linking to its public URL.
2. **Deploy** — Netlify is linked to this repo and auto-publishes on push. The site is live at https://nautical-blog.netlify.app (and at whatever custom domain you attach).
3. **Azure** — `.github/workflows/azure-static-web-apps.yml` is ready; it needs the `AZURE_STATIC_WEB_APPS_API_TOKEN` secret set in the repo (from Azure Portal → Static Web App → Manage deployment token) before it will deploy.

## What cannot be automated: Google Search Console indexing

Google does **not** allow unattended URL submission. There is no public API for requesting indexing of arbitrary URLs, and no connector in this environment can log into your Google account. So the pipeline cannot "auto-index" pages.

What you do once, then per post:

**One-time setup (about ten minutes):**
1. Go to https://search.google.com/search-console and add a property for `https://www.nautical.co.in` (Domain property is easiest — verify via DNS TXT record).
2. In the left menu: **Sitemaps** → submit `https://www.nautical.co.in/sitemap.xml`.
3. Optional: **URL Inspection** → paste each post URL → **Request indexing**.

**For every future post:** after it is live, paste its URL into URL Inspection and hit Request indexing. Google usually picks it up within days via the sitemap anyway.

## Adding a future post (the full loop)

1. Research the topic (web search for current facts; check the live NHY console at app.nautical.co.in for what actually ships).
2. Write `blog/<slug>.html` using the Nautical design system (navy/teal, Sora headings, Inter body, dashed image placeholders with briefs + alt text + captions, pull quote, stat cards, CTA band).
3. Add one entry to `blog/posts.json` with slug, title, date, tag, excerpt, differs, canonical.
4. Push to `main`. The pipeline regenerates the index and sitemap, Netlify deploys, and the post appears at `https://www.nautical.co.in/blog/<slug>.html` (once that domain serves this repo) with its own **Read the post →** button on the index.

## URLs

- Index: https://nautical-blog.netlify.app/blog/
- NHY post: https://nautical-blog.netlify.app/blog/nhy-react-native-app.html
- Sitemap: https://nautical-blog.netlify.app/sitemap.xml
- Public GitHub: https://github.com/nautical8589882116/nautical-blog
