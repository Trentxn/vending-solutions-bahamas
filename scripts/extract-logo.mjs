/*
 * Rebuilds the brand assets from the client's original artwork.
 *
 *   node scripts/extract-logo.mjs
 *
 * src/assets/brand/logo.pdf is a JPG wrapped in a PDF, so the original JPEG
 * bytes sit inside it verbatim and can be lifted out by their SOI/EOI markers.
 * From that image this writes the wordmark and script tagline as transparent
 * PNGs (the mark itself is vector: see scripts/trace-mark.mjs and mark.js).
 *
 * Outputs are committed. Re-run only if the client sends new artwork.
 */
import { chromium } from 'playwright-core'
import { readFileSync, writeFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const pdf = readFileSync(resolve(root, 'src/assets/brand/logo.pdf'))

let start = -1
for (let i = 0; i < pdf.length - 2; i++) {
  if (pdf[i] === 0xff && pdf[i + 1] === 0xd8 && pdf[i + 2] === 0xff) { start = i; break }
}
if (start < 0) throw new Error('no JPEG stream found in logo.pdf')
let end = -1
for (let i = pdf.length - 2; i > start; i--) {
  if (pdf[i] === 0xff && pdf[i + 1] === 0xd9) { end = i + 2; break }
}
const jpeg = pdf.slice(start, end)
console.log(`lifted ${jpeg.length} bytes of JPEG out of logo.pdf`)

const browser = await chromium.launch({
  executablePath: process.env.CHROME_PATH || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
  args: ['--no-sandbox'],
})
const page = await browser.newPage()
const out = await page.evaluate(async (dataUrl) => {
  const img = new Image()
  img.src = dataUrl
  await img.decode()
  const W = img.naturalWidth
  const H = img.naturalHeight
  const src = document.createElement('canvas')
  src.width = W
  src.height = H
  const sctx = src.getContext('2d', { willReadFrequently: true })
  sctx.drawImage(img, 0, 0)
  const { data } = sctx.getImageData(0, 0, W, H)

  const isInk = (x, y) => {
    const i = (y * W + x) * 4
    return data[i] + data[i + 1] + data[i + 2] < 660
  }

  // the wordmark lives right of the gutter that separates it from the mark
  const cols = []
  for (let x = 0; x < W; x++) {
    let n = 0
    for (let y = 0; y < H; y += 2) if (isInk(x, y)) n++
    cols[x] = n > 3
  }
  const firstInk = cols.indexOf(true)
  let gutter = W
  let run = 0
  for (let x = firstInk; x < W; x++) {
    if (!cols[x]) { run++; if (run > 8) { gutter = x - run; break } } else run = 0
  }

  // tight bounds of the text block
  let x0 = W, y0 = H, x1 = 0, y1 = 0
  for (let y = 0; y < H; y++) {
    for (let x = gutter; x < W; x++) {
      if (!isInk(x, y)) continue
      if (x < x0) x0 = x
      if (x > x1) x1 = x
      if (y < y0) y0 = y
      if (y > y1) y1 = y
    }
  }
  // never pad back past the gutter: the mark's outermost arm tip sits right
  // against it and would leave a stray sliver in the wordmark crop
  const pad = 6
  x0 = Math.max(gutter + 2, x0 - pad); y0 = Math.max(0, y0 - pad)
  x1 = Math.min(W - 1, x1 + pad); y1 = Math.min(H - 1, y1 + pad)

  // The script tagline is the last line of the text block. Find the blank band
  // above it so the header can use the wordmark on its own (the script would
  // make the bar too tall) while the footer uses the full lockup.
  const rowInk = []
  for (let y = y0; y <= y1; y++) {
    let n = 0
    for (let x = x0; x <= x1; x++) if (isInk(x, y)) n++
    rowInk.push(n > 0)
  }
  const gaps = []
  let gs = -1
  for (let i = 0; i < rowInk.length; i++) {
    if (!rowInk[i]) { if (gs < 0) gs = i } else if (gs >= 0) { gaps.push([gs, i - gs]); gs = -1 }
  }
  const lastGap = gaps[gaps.length - 1] || [rowInk.length, 0]
  const scriptTop = y0 + lastGap[0] + Math.floor(lastGap[1] / 2)

  /* Lift the artwork off its white paper.
     Neutral pixels are the wordmark: black over white, so coverage is exactly
     1 - luminance and the edges come out perfectly clean. Coloured pixels (the
     script tagline) keep their colour and get a narrow feather instead, since
     their true coverage cannot be recovered from a flat composite. */
  const render = (invertInk, top, bottom) => {
    const cw = x1 - x0 + 1
    const ch = bottom - top + 1
    const c = document.createElement('canvas')
    c.width = cw
    c.height = ch
    const ctx = c.getContext('2d')
    const out = ctx.createImageData(cw, ch)
    for (let y = 0; y < ch; y++) {
      for (let x = 0; x < cw; x++) {
        const si = ((y + top) * W + (x + x0)) * 4
        const r = data[si], g = data[si + 1], b = data[si + 2]
        const di = (y * cw + x) * 4
        const max = Math.max(r, g, b)
        const min = Math.min(r, g, b)
        const lum = 0.299 * r + 0.587 * g + 0.114 * b
        if (max - min < 14) {
          const a = Math.round(255 - lum)
          const v = invertInk ? 255 : 0
          out.data[di] = v; out.data[di + 1] = v; out.data[di + 2] = v; out.data[di + 3] = a
        } else {
          let a = 255
          if (lum >= 252) a = 0
          else if (lum > 238) a = Math.round(((252 - lum) / 14) * 255)
          // on dark grounds the script is lifted toward the site's light cornflower
          const mix = invertInk ? 0.34 : 0
          out.data[di] = Math.round(r + (255 - r) * mix)
          out.data[di + 1] = Math.round(g + (255 - g) * mix)
          out.data[di + 2] = Math.round(b + (255 - b) * mix)
          out.data[di + 3] = a
        }
      }
    }
    ctx.putImageData(out, 0, 0)
    return { url: c.toDataURL('image/png'), w: cw, h: ch }
  }

  return {
    wordLight: render(false, y0, scriptTop),
    wordDark: render(true, y0, scriptTop),
    fullLight: render(false, y0, y1),
    fullDark: render(true, y0, y1),
    gutter,
  }
}, 'data:image/jpeg;base64,' + jpeg.toString('base64'))

await browser.close()

const write = (rel, img) => {
  writeFileSync(resolve(root, rel), Buffer.from(img.url.split(',')[1], 'base64'))
  console.log(`wrote ${rel} (${img.w}x${img.h})`)
}
write('src/assets/brand/wordmark.png', out.wordLight)
write('src/assets/brand/wordmark-on-dark.png', out.wordDark)
write('src/assets/brand/lockup.png', out.fullLight)
write('src/assets/brand/lockup-on-dark.png', out.fullDark)
