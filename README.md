# Meridian — landing site

The marketing site for **Meridian**, an independent software studio. Lists the product family (Auros, Nova OS) with a dedicated Nova OS page.

Plain static site — **no build step, no framework, no backend.** Just HTML, CSS, and a little JS.

## Structure

| File | Purpose |
|---|---|
| `index.html` | Home — hero, product family, about |
| `novaos.html` | Nova OS product page |
| `styles.css` | Shared styles |
| `script.js` | Scroll reveal + sticky-nav shadow |
| `favicon.svg` | Meridian star mark |
| `novaos-desktop.png` | **Add this** — the Nova OS desktop screenshot shown on `novaos.html` |

The logo wordmark uses **Hammersmith One** (via Google Fonts).

## Run locally

It's static — just open `index.html` in a browser, or serve the folder:

```bash
npx serve .
```

## Deploy

Hosted on Vercel as a static site (framework preset: **Other**). Pushes to `main` auto-deploy.

## Add the Nova OS screenshot

Save the desktop screenshot as `novaos-desktop.png` in this folder and commit it — it appears automatically on the Nova OS page (until then, a placeholder shows).
