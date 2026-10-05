#!/usr/bin/env node
/**
 * Regenerates blog/index.html and sitemap.xml from blog/posts.json.
 * Run from repo root: node .github/scripts/generate-blog.js
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..', '..');
const manifestPath = path.join(ROOT, 'blog', 'posts.json);
const posts = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

posts.sort((a, b) => (a.date < b.date ? 1 : -1)); // newest first

const esc = (s) => String(s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;').replace(/'/g, '&#39;);

const cards = posts.map((p, i) => {
  const newest = i === 0 ? '<span class="tag amber">Newest</span>' : '';
  const href = p.external ? esc(p.url) : esc(p.slug + '.html);
  const read = p.external
    ? `<a class="read" href="${esc(p.url)}">Read on nautical.co.in →</a>`
    : `<a class="read" href="${esc(p.slug)}.html">Read the post →</a>`;
  return `      <li class="post${i % 2 ? ' sand' : ''}">
        <div class="meta-row">
          <time class="date" datetime="${esc(p.date)}">${esc(p.dateDisplay)}</time>
          <span class="tag">${esc(p.tag)}</span>
          ${newest}
        </div>
        <h2><a href="${href}">${esc(p.title)}</a></h2>
        <p class="excerpt">${esc(p.excerpt)}</p>
        <p class="excerpt" style="font-size:14px;color:var(--slate);margin-top:-6px;"><strong style="color:var(--navy);">How it differs:</strong> ${esc(p.differs)}</p>
        ${read}
      </li>`;
}).join('\n');}

const index = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<!--
Suggested title: Nautical Blog — Operator guides for restaurants, cafés, bars & retail
Meta description: Timestamped guides on NHY, QR ordering, AI menu builder, inventory, and the Nautical POS React Native app — written for restaurant, café, bar, and retail operators.
-->
<link rel="canonical" href="https://www.nautical.co.in/blog/" />
<meta name="robots" content="index,follow" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600&family=Sora:wght@600;700&display=swap" rel="stylesheet" />
<title>Nautical Blog — Operator guides</title>
<style>
  :root {
    --navy: #0B2545; --deep: #061A33; --teal: #17C3CE; --soft: #E6FAFB;
    --ink: #1F2933; --slate: #5A6B7B; --sand: #F7F9FB; --amber: #F6A609; --paper: #FFFFFF;
  }
  * { box-sizing: border-box; }
  html, body { margin: 0; padding: 0; background: var(--paper); color: var(--ink); overflow-x: hidden; }
  body { font-family: 'Inter', -apple-system, 'Segoe UI', sans-serif; font-size: 18px; line-height: 1.7; font-weight: 400; }
  a { color: var(--teal); text-decoration: none; }
  a:hover { text-decoration: underline; }
  .wrap { max-width: 760px; margin: 0 auto; padding: 0 22px; }
  .hero { background: var(--navy); color: #fff; padding: 64px 0 56px; }
  .mark { font-size: 28px; letter-spacing: 0.08em; }
  .kicker { color: var(--teal); font-family: 'Sora', 'Segoe UI', system-ui, sans-serif; font-weight: 600; font-size: 13px; letter-spacing: 0.16em; text-transform: uppercase; margin: 18px 0 10px; }
  h1 { font-family: 'Sora', 'Segoe UI', system-ui, sans-serif; font-weight: 700; letter-spacing: -0.03em; font-size: clamp(28px, 4.5vw, 42px); line-height: 1.15; margin: 0 0 14px; }
  .deck { color: #b8c9d9; font-size: 18px; line-height: 1.5; margin: 0; max-width: 36em; }
  section { padding: 40px 0 56px; }
  .intro { color: var(--slate); font-size: 16px; margin: 0 0 28px; }
  .list { list-style: none; margin: 0; padding: 0; }
  .post {
    border: 1.5px solid #e2e8ef; border-radius: 14px; padding: 22px 22px 18px;
    margin: 0 0 16px; background: var(--paper); transition: border-color 0.15s ease;
  }
  .post:hover { border-color: var(--teal); }
  .post.sand { background: var(--sand); }
  .meta-row { display: flex; flex-wrap: wrap; gap: 10px 16px; align-items: center; margin-bottom: 8px; }
  .date { font-family: 'Sora', 'Segoe UI', system-ui, sans-serif; font-weight: 600; font-size: 13px; letter-spacing: 0.04em; color: var(--teal); }
  .tag { font-size: 12px; font-weight: 600; letter-spacing: 0.04em; text-transform: uppercase; color: var(--navy); background: var(--soft); border: 1px solid #c5eef1; border-radius: 999px; padding: 3px 10px; }
  .tag.amber { background: #fff8e8; border-color: #f5d78a; color: #8a5a00; }
  h2 { font-family: 'Sora', 'Segoe UI', system-ui, sans-serif; font-weight: 600; letter-spacing: -0.02em; color: var(--navy); font-size: 22px; line-height: 1.3; margin: 0 0 8px; }
  h2 a { color: var(--navy); }
  h2 a:hover { color: var(--teal); text-decoration: none; }
  .excerpt { color: var(--slate); font-size: 16px; line-height: 1.55; margin: 0 0 12px; }
  .read { font-family: 'Sora', 'Segoe UI', system-ui, sans-serif; font-weight: 600; font-size: 14px; color: var(--teal); }
  .stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-bottom: 28px; }
  .stat { border: 1.5px solid var(--teal); border-radius: 12px; padding: 14px 12px; text-align: center; background: #fff; }
  .stat strong { display: block; font-family: 'Sora', 'Segoe UI', system-ui, sans-serif; color: var(--navy); font-size: 22px; letter-spacing: -0.02em; }
  .stat span { display: block; margin-top: 4px; color: var(--slate); font-size: 13px; }
  .cta { background: var(--deep); color: #fff; padding: 48px 0; text-align: center; }
  .cta h2 { color: #fff; font-size: clamp(24px, 3.5vw, 32px); margin: 0 0 10px; }
  .cta p { color: #d5e2ee; max-width: 32em; margin: 0 auto 20px; font-size: 16px; }
  .btn { display: inline-block; background: var(--teal); color: var(--deep); text-decoration: none; font-family: 'Sora', 'Segoe UI', system-ui, sans-serif; font-weight: 700; letter-spacing: -0.01em; }
  .btn:hover { filter: brightness(1.05); text-decoration: none; }
  footer { background: var(--navy); color: #9fb0c3; font-size: 13px; padding: 20px 0 26px; }
  @media (max-width: 640px) { .stats { grid-template-columns: 1fr; } .hero { padding: 44px 0 36px; } }
</style>
</head>
<body>
<header class="hero">
  <div class="wrap">
    <div class="mark">⚓</div>
    <p class="kicker">Nautical · Blog index</p>
    <h1>Operator guides, by date</h1>
    <p class="deck">Every Nautical post we have written so far — timestamped, tagged, and kept distinct so you can find the right guide for the floor.</p>
  </div>
</header>
<section>
  <div class="wrap">
    <p class="intro">Posts are listed newest first. Each entry has a publish date, a short tag for the topic, and a one-line difference from the others. This index is regenerated automatically from <code>blog/posts.json</code> on every push to main.</p>
    <div class="stats">
      <div class="stat"><strong>${posts.length}</strong><span>Published guides</span></div>
      <div class="stat"><strong>Aug–Oct 2026</strong><span>Date range</span></div>
      <div class="stat"><strong>4</strong><span>Operator types covered</span></div>
    </div>
    <ul class="list">
${cards}
    </ul>
  </div>
</section>
<section class="cta">
  <div class="wrap">
    <h2>Run the floor from one deck.</h2>
    <p>Open the owner console, build or import the menu, and put a table QR down. Tap Tap Go. ⚓ Order in 3 Seconds.</p>
    <a class="btn" href="https://app.nautical.co.in/" style="padding:12px 20px;border-radius:999px;font-family:Sora,Segoe UI,system-ui,sans-serif;font-weight:700;color:#061A33;background:#17C3CE;display:inline-block;text-decoration:none">Try Nautical POS</a>
  </div>
</section>
<footer>
  <div class="wrap">
    Nautical Blog · nautical.co.in · app.nautical.co.in<br />
    Index last updated: ${new Date().toISOString().slice(0, 10)} · Regenerated automatically from blog/posts.json.
  </div>
</footer>
</body>
</html>`;

fs.writeFileSync(path.join(ROOT, 'blog', 'index.html'), index);

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${posts.map(p => `  <url>
    <loc>${esc(p.canonical || ('https://www.nautical.co.in/blog/' + p.slug + '.html'))}</loc>
    <lastmod>${esc(p.date)}</lastmod>
    <changefreq>${p.external ? 'monthly' : 'weekly'}</changefreq>
    <priority>${p.external ? '0.7' : '0.8'}</priority>
  </url>`).join('\n')}
</urlset>`;

fs.writeFileSync(path.join(ROOT, 'sitemap.xml'), sitemap);
console.log('Generated index with', posts.length, 'posts and sitemap.');
