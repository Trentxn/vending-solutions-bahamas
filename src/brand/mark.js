/* ============================================================
   Vending Solutions Bahamas - brand mark geometry
   ------------------------------------------------------------
   The client's pinwheel mark, traced from his original artwork
   (src/assets/brand/logo.pdf) by scripts/trace-mark.mjs: each
   ellipse below is a blob detected in that image, with its centre,
   axes and rotation recovered from the blob's covariance and its
   fill sampled from the blob's interior. It is his mark, not an
   approximation of it.

   Regenerate with:
     node scripts/extract-logo.mjs   # artwork -> wordmark PNGs
     node scripts/trace-mark.mjs <jpg> out.json
     node scripts/build-brand.mjs    # -> favicon.svg, logo-mark.svg

   Pure ESM with no dependencies so Node and the browser share one
   source of truth. The build never runs the generators: their
   outputs are committed.
   ============================================================ */

/* Sampled from the artwork itself. The client's colour sheet lists the gold as
   #F6EB14, which contradicts the RGB on the same line and the artwork; the
   measured value is #F2C521, so the site's #EEC42A token stands. */
export const BRAND = {
  paper: '#FFFFFF',
  gold: '#F2C521',
  olive: '#AEA767',
  slateBlue: '#6685B1',
  script: '#80A9F9',
  ink: '#000000',
}

/** The mark on a 0 0 100 100 viewBox, drawn outside in. */
const ELLIPSES = [
  { cx: 57.8, cy: 54.89, rx: 7.36, ry: 4.81, rot: 5.48, fill: '#E0BB33' },
  { cx: 38.78, cy: 49.98, rx: 8.4, ry: 5.26, rot: -7.77, fill: '#DFBB35' },
  { cx: 57.99, cy: 38.48, rx: 7.89, ry: 4.77, rot: -59.08, fill: '#CEB445' },
  { cx: 43.06, cy: 36.22, rx: 9.76, ry: 5.3, rot: 51.92, fill: '#CBB349' },
  { cx: 43.27, cy: 64.1, rx: 8.38, ry: 4.65, rot: -63.68, fill: '#C7B14B' },
  { cx: 54.61, cy: 66.93, rx: 7.01, ry: 4.28, rot: 60.34, fill: '#C4B050' },
  { cx: 69.23, cy: 47.12, rx: 8.56, ry: 5.33, rot: 3.88, fill: '#BFAD53' },
  { cx: 32.4, cy: 59.05, rx: 6.3, ry: 3.72, rot: 13.76, fill: '#C4B051' },
  { cx: 32.01, cy: 36.76, rx: 6.55, ry: 3.34, rot: 73.34, fill: '#AEA865' },
  { cx: 64.49, cy: 66.81, rx: 6.83, ry: 3.89, rot: 58.43, fill: '#B2A960' },
  { cx: 70.72, cy: 60.18, rx: 5.99, ry: 3.45, rot: 66.52, fill: '#B1A861' },
  { cx: 25.49, cy: 48.75, rx: 5.57, ry: 3.41, rot: -89.45, fill: '#B1A865' },
  { cx: 55.07, cy: 25.16, rx: 8.68, ry: 5.24, rot: -49.97, fill: '#A1A372' },
  { cx: 64.71, cy: 26.71, rx: 3.39, ry: 2.16, rot: -19.92, fill: '#96A080' },
  { cx: 45.15, cy: 78.27, rx: 8.06, ry: 4.46, rot: -42.54, fill: '#9BA179' },
  { cx: 32.95, cy: 74.62, rx: 5.42, ry: 3.16, rot: 7.48, fill: '#9BA27A' },
  { cx: 36.1, cy: 22.79, rx: 6.28, ry: 3.21, rot: -37.91, fill: '#939C88' },
  { cx: 79.55, cy: 55.47, rx: 5.6, ry: 3.38, rot: -80.68, fill: '#9AA17A' },
  { cx: 60.76, cy: 77.97, rx: 5.34, ry: 3.28, rot: -36.95, fill: '#989F80' },
  { cx: 19.49, cy: 43.47, rx: 5.2, ry: 1.9, rot: 86.04, fill: '#9CA17B' },
  { cx: 15.97, cy: 38.38, rx: 4.72, ry: 1.37, rot: 88.69, fill: '#8C9D90' },
  { cx: 67.75, cy: 19.32, rx: 5.67, ry: 2.9, rot: 43.38, fill: '#889C93' },
  { cx: 84.2, cy: 62.18, rx: 5.03, ry: 1.99, rot: -81.57, fill: '#909D89' },
  { cx: 38.3, cy: 14.69, rx: 6.11, ry: 2.03, rot: -27.78, fill: '#88999D' },
  { cx: 63.78, cy: 84.03, rx: 6.68, ry: 2.52, rot: -32.78, fill: '#8B9B94' },
  { cx: 26.18, cy: 78.5, rx: 6.03, ry: 2.2, rot: 32.91, fill: '#899C98' },
  { cx: 13.7, cy: 33.47, rx: 4.56, ry: 0.89, rot: -88.71, fill: '#7E9BB1' },
  { cx: 74.4, cy: 18.97, rx: 5.12, ry: 1.71, rot: 44.9, fill: '#8399A6' },
  { cx: 86.78, cy: 67.84, rx: 4.42, ry: 1.41, rot: -79.44, fill: '#869AA0' },
  { cx: 41.41, cy: 9.09, rx: 5.39, ry: 1.36, rot: -26.34, fill: '#7E99AC' },
  { cx: 79.27, cy: 19.72, rx: 4.43, ry: 1.11, rot: 46.41, fill: '#7A98B1' },
  { cx: 60.64, cy: 90.76, rx: 5.81, ry: 1.53, rot: -28.54, fill: '#819AA9' },
  { cx: 20.03, cy: 79.04, rx: 5.16, ry: 1.51, rot: 32.19, fill: '#859CA2' },
  { cx: 12.05, cy: 28.88, rx: 3.84, ry: 0.71, rot: -88.16, fill: '#7598CC' },
  { cx: 83.21, cy: 20.93, rx: 4, ry: 0.77, rot: 47.09, fill: '#789BC9' },
  { cx: 88.08, cy: 72.48, rx: 3.71, ry: 0.8, rot: -78.69, fill: '#789AC2' },
  { cx: 45.03, cy: 4.74, rx: 4.94, ry: 0.97, rot: -24.56, fill: '#7A99C1' },
  { cx: 86.45, cy: 22.43, rx: 3.19, ry: 0.57, rot: 48.77, fill: '#719ED9' },
  { cx: 15.31, cy: 78.83, rx: 4.52, ry: 0.83, rot: 35.41, fill: '#7B9ABF' },
  { cx: 57.25, cy: 95.48, rx: 4.99, ry: 1.01, rot: -25.87, fill: '#779ACD' },
  { cx: 88.64, cy: 76.44, rx: 2.71, ry: 0.58, rot: -79.19, fill: '#759AD8' },
  { cx: 11.84, cy: 78.26, rx: 2.91, ry: 0.65, rot: 41.14, fill: '#7299D2' },
  { cx: 49.15, cy: 0.79, rx: 4.03, ry: 0.79, rot: -22.69, fill: '#739CD7' },
  { cx: 53.69, cy: 99.23, rx: 4.05, ry: 0.77, rot: -23.61, fill: '#749AD9' },
]

export function markEllipses() {
  return ELLIPSES
}

/**
 * The same mark as a standalone SVG document (favicon, CSS url()).
 * `inset` trims the viewBox towards the centre: the thin outer arms turn to
 * mush at favicon size, so the tab icon zooms into the dense golden rosette.
 */
export function markSvgString({ size = 64, inset = 0 } = {}) {
  const vb = `${inset} ${inset} ${100 - inset * 2} ${100 - inset * 2}`
  const body = ELLIPSES.map(
    (e) =>
      `  <ellipse cx="${e.cx}" cy="${e.cy}" rx="${e.rx}" ry="${e.ry}" fill="${e.fill}"` +
      (e.rot ? ` transform="rotate(${e.rot} ${e.cx} ${e.cy})"` : '') +
      ' />'
  ).join('\n')
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}" width="${size}" height="${size}">\n${body}\n</svg>\n`
}
