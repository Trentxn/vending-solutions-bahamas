# Vending Solutions Bahamas — Website

Marketing site for Vending Solutions Bahamas: fully managed snack, beverage, and coffee
vending for businesses throughout Nassau & Paradise Island, at no cost to the host.

Built with **Vite + React 18**, React Router v6, framer-motion, and lucide-react.
The `/machines` page features a scroll-driven tour of the "Power of Choice" combo
machine — a custom SVG whose parts animate as you scroll.

## Develop

```bash
npm install
npm run dev        # dev server
npm run build      # production build → dist/
npm run preview    # serve the production build locally
```

## Visual QA

```bash
npm run build && npm run preview -- --port 4173 --strictPort &
node scripts/screenshot.mjs             # screenshots all routes + showcase stages → ./shots
```

Uses the preinstalled Chromium via `playwright-core` (no browser download). Override the
binary with `CHROMIUM_PATH=/path/to/chrome`.

## Before launch — swap the placeholders

1. **Contact form**: create a free form at [formspree.io](https://formspree.io) and put the
   real form ID in `src/config.js` (`FORM_ENDPOINT`). Until then the form shows its error
   state with WhatsApp/email fallbacks.
2. **Contact details**: phone numbers and email in `src/content.js` were read off the
   machine decals in the client's photos — confirm with the client.
3. **Map**: `MAP_EMBED_URL` in `src/config.js` currently centers on Nassau; swap for the
   exact business address embed.
4. **Testimonials**: add real client quotes to `testimonials` in `src/content.js` and set
   `enabled: true` (the About page section stays hidden until then).

## Content

All copy lives in `src/content.js` — a single source of truth transcribed from the
client's Word document. Pages import from it; edit copy there, not in components.

## Deploying

Static SPA — any static host works. A Netlify-style `public/_redirects`
(`/* /index.html 200`) ships so deep links (e.g. `/machines`) resolve; on Vercel use a
rewrite in `vercel.json`, and on GitHub Pages set `base` in `vite.config.js` plus a
`404.html` fallback.
