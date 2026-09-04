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

## Brand assets

The logo is a vector recreation of the client's pinwheel mark, generated from
frozen constants in `src/brand/mark.js`:

- `node scripts/build-brand.mjs` regenerates `public/favicon.svg` and
  `src/assets/brand/logo-mark.svg`. The outputs are committed; the build never
  runs the generator.
- **To use the official artwork instead**, drop `logo.svg` (or `.png`) into
  `src/assets/brand/`. Add `logo-on-dark.svg` as well if the wordmark is dark
  ink, and it will be used on the dark theme. `Logo.jsx` picks either up
  automatically with no code change.

Brand palette: gold `#EEC42A`, cornflower `#748ADC`, gray blue `#A3B2BD`,
slate `#6B7680`, near white `#F8F8F8`, deep black `#2A2A2A`. Gold is a fill
colour only: use `--color-gold-text` wherever gold appears as type or an icon,
because raw gold fails contrast on the light ground.

## Hero video

The hero shows `public/media/machines-on-location.jpg` until footage exists.
Drop `hero.mp4` into `src/assets/video/` (H.264, 1920x1080, a 10 to 15 second
silent loop, ideally under 8 MB) and it takes over automatically, with the photo
staying as the poster and the reduced motion fallback. Frame a machine in the
centre third so the phone crop still works.

## QA

`node scripts/qa.mjs [baseUrl]` runs against a preview server and checks copy
for stray hyphens and dashes, the `/machines` to `/solution` redirect, header
legibility over the hero photo, contrast in both themes, and the reduced motion
fallback. For the GitHub Pages build:
`GH_PAGES=1 npm run build && GH_PAGES=1 npx vite preview --port 4176` then
`node scripts/qa.mjs http://localhost:4176/vending-solutions-bahamas`.

## The logo, and how it is built

The client's original artwork lives at `src/assets/brand/logo.pdf` (a JPG in a
PDF wrapper). Everything on the site is derived from it, so nothing is drawn by
hand or approximated:

- **The mark is vector.** `scripts/trace-mark.mjs` lifts the JPEG out of the
  PDF, detects each ellipse as a connected blob, and recovers its centre, axes
  and rotation from the blob's covariance, sampling the fill from its interior.
  The 44 resulting ellipses are frozen into `src/brand/mark.js`, so the mark
  stays crisp from the 16px favicon up.
- **The wordmark is a crop.** `scripts/extract-logo.mjs` keys the paper out of
  the artwork and writes `wordmark.png` (the three type lines, used in the
  header) and `lockup.png` (with the "Power of Choice" script, used in the
  footer), each with an `-on-dark` variant whose ink is flipped to white.
- `node scripts/build-brand.mjs` regenerates `public/favicon.svg` and
  `src/assets/brand/logo-mark.svg` (the small mark motif on every eyebrow) from
  `mark.js`. Both zoom into the dense golden rosette, because the thin outer
  arms turn to mush at that size.

All outputs are committed and the build never runs the generators. Re-run all
three only if the client sends new artwork.

Colours measured from the artwork: gold `#F2C521`, olive `#AEA767`, slate blue
`#6685B1`, script `#80A9F9`, ink `#000000`. The client's colour sheet lists the
gold as `#F6EB14`, which contradicts the RGB on its own line and the artwork.

## The brand system

The logo is not just placed on the site, it is the source of the site's visual
language. Everything below is derived from the traced artwork, so the brand
reads as deliberate rather than decorated.

| Where | What | Why |
|---|---|---|
| Header, footer | The lockup | The visible logo |
| Home, pillars band | The mark, turning as you scroll | The signature moment, behind "Happy staff. That is the Power of Choice." |
| Interior page heroes, CTA band | `petals.svg`, the mark's own ellipses scattered | Echoes the wrap printed on the real machines |
| Machine tour drawing | Seven petals on the cabinet | Makes the drawn machine the client's machine |
| Scroll tour progress rail | Petal shaped dots, gold when active | A control built from the mark |
| Footer corner, 404 | The mark turning slowly | Texture that happens to move |
| Every section eyebrow | The mark at 15px | A brand full stop on every heading |

Three rules keep it from tipping into clutter. Break them and it looks cheap:

1. **One visible mark per screen.** Everything else is texture at or below
   `--brand-texture-opacity` (7% on dark, 9% on light), and never sits behind
   body copy at reading size.
2. **Motion is slow, transform only, and optional.** A full turn takes
   `--brand-spin-duration` (90s) or is driven by scroll. Nothing animates a
   property that causes layout. `Pinwheel` checks `useReducedMotion()` and a
   CSS `prefers-reduced-motion` rule backs it up.
3. **Never draw a new brand shape.** Every petal comes from `markEllipses()`
   in `src/brand/mark.js`, which is the traced artwork. `petalScatter()` picks
   its ten largest and lays them out at frozen positions.
