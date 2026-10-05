# Nautical Blog

Operator guides for restaurants, cafés, bars, and retail shops — the Nautical POS blog.

- **Index:** `/blog/` (auto-generated from `blog/posts.json` on every push to `main`)
- **Posts:** `/blog/<slug>.html`
- **Live (Netlify):** https://nautical-blog.netlify.app
- **Automation runbook:** [AUTOMATION.md](AUTOMATION.md)

## Quick start for a new post

1. Write `blog/<slug>.html` (Nautical design system).
2. Add an entry to `blog/posts.json`.
3. Push to `main` — index, sitemap, and deploy happen automatically.
4. Request indexing in Google Search Console (see AUTOMATION.md — this step is manual by design; Google does not allow unattended submission).
