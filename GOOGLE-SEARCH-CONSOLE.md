# Google Search Console — Nautical blog

**This cannot be automated from our deploy tools.** There is no Google Search Console connector. Indexing requires your Google account on the property that owns `www.nautical.co.in`.

## After pages are live on www.nautical.co.in

1. Open [Google Search Console](https://search.google.com/search-console).
2. Use the property for `https://www.nautical.co.in` (Domain or URL-prefix).
3. **Sitemaps** → add `https://www.nautical.co.in/sitemap.xml` (this repo’s `sitemap.xml` once it is served from that host).
4. **URL inspection** → paste each new post URL → **Request indexing**.
5. Keep the blog index linked from the site footer/nav so Google can discover posts without waiting for the sitemap alone.

## Public sources right now

| Resource | Public URL |
|----------|------------|
| Repo | https://github.com/nautical8589882116/nautical-blog |
| Sitemap (raw) | https://raw.githubusercontent.com/nautical8589882116/nautical-blog/main/sitemap.xml |
| Index (raw) | https://raw.githubusercontent.com/nautical8589882116/nautical-blog/main/blog/index.html |
| NHY post (raw) | https://raw.githubusercontent.com/nautical8589882116/nautical-blog/main/blog/nhy-react-native-app.html |
| Netlify project | https://app.netlify.com/projects/nautical-blog (deploy still needs a first successful publish) |

## Azure auto-deploy

Workflow file: `.github/workflows/azure-static-web-apps.yml`

1. Azure Portal → Static Web App → connect GitHub repo `nautical-blog`.
2. App location: `/` · skip build.
3. Add repository secret `AZURE_STATIC_WEB_APPS_API_TOKEN`.
4. Map custom domain `www.nautical.co.in` or `blog.nautical.co.in` and point DNS.

Until the custom domain serves these files, Search Console will not index the new posts under the Nautical brand URL.
