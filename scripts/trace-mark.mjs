/*
 * Traces the pinwheel mark out of the client's artwork into exact SVG ellipses.
 *
 *   node scripts/trace-mark.mjs <source.jpg> [outfile.json]
 *
 * The mark is a field of separate ellipses on white, which is the ideal case
 * for automatic tracing: threshold to a mask, label connected components, then
 * recover each ellipse from the covariance of its pixels (eigenvectors give the
 * rotation, eigenvalues give the semi axes). Colours are the median of each
 * blob's interior, which sidesteps JPEG ringing at the edges.
 *
 * Output feeds src/brand/mark.js. Re-run only if the artwork changes.
 */
import { chromium } from 'playwright-core'
import { writeFileSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const src = resolve(process.argv[2])
const outfile = process.argv[3] ? resolve(process.argv[3]) : null
const dataUrl = 'data:image/jpeg;base64,' + readFileSync(src).toString('base64')

const browser = await chromium.launch({
  executablePath: process.env.CHROME_PATH || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
  args: ['--no-sandbox'],
})
const page = await browser.newPage()

const result = await page.evaluate(async (url) => {
  const img = new Image()
  img.src = url
  await img.decode()
  const c = document.createElement('canvas')
  c.width = img.naturalWidth
  c.height = img.naturalHeight
  const ctx = c.getContext('2d', { willReadFrequently: true })
  ctx.drawImage(img, 0, 0)
  const { data, width: W, height: H } = ctx.getImageData(0, 0, c.width, c.height)

  const at = (x, y) => {
    const i = (y * W + x) * 4
    return [data[i], data[i + 1], data[i + 2]]
  }
  // "ink" = clearly darker than the paper. Kept strict: JPEG ringing around
  // the wordmark produces near white pixels that would otherwise close the
  // gutter between the mark and the text.
  const isInk = (x, y) => {
    const [r, g, b] = at(x, y)
    return r + g + b < 660
  }

  // The wordmark sits to the right of the mark; find the vertical gutter
  // between them by looking for the widest empty column band.
  const colHasInk = []
  for (let x = 0; x < W; x++) {
    let n = 0
    for (let y = 0; y < H; y += 2) if (isInk(x, y)) n++
    colHasInk[x] = n > 3 // a few stray dark pixels are noise, not a glyph
  }
  // The script tagline reaches well left under the wordmark, so the gap is
  // narrow: in this artwork it is 11 columns. Anything past 8 is the gutter.
  let firstInk = colHasInk.indexOf(true)
  let gutter = W
  let run = 0
  for (let x = firstInk; x < W; x++) {
    if (!colHasInk[x]) {
      run++
      if (run > 8) { gutter = x - run; break }
    } else run = 0
  }

  // label connected components inside the mark region (iterative flood fill)
  const label = new Int32Array(W * H).fill(-1)
  const blobs = []
  const stack = []
  for (let y = 0; y < H; y++) {
    for (let x = firstInk; x < gutter; x++) {
      const idx = y * W + x
      if (label[idx] !== -1 || !isInk(x, y)) continue
      const id = blobs.length
      const px = []
      stack.push(idx)
      label[idx] = id
      while (stack.length) {
        const p = stack.pop()
        const py = (p / W) | 0
        const pxx = p % W
        px.push([pxx, py])
        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            const nx = pxx + dx
            const ny = py + dy
            if (nx < firstInk || nx >= gutter || ny < 0 || ny >= H) continue
            const ni = ny * W + nx
            if (label[ni] === -1 && isInk(nx, ny)) { label[ni] = id; stack.push(ni) }
          }
        }
      }
      blobs.push(px)
    }
  }

  const median = (a) => a.slice().sort((m, n) => m - n)[a.length >> 1]
  const shapes = blobs
    .filter((px) => px.length >= 40) // drop JPEG speckle
    .map((px) => {
      let sx = 0, sy = 0
      for (const [x, y] of px) { sx += x; sy += y }
      const n = px.length
      const cx = sx / n
      const cy = sy / n
      let vxx = 0, vyy = 0, vxy = 0
      for (const [x, y] of px) {
        const dx = x - cx, dy = y - cy
        vxx += dx * dx; vyy += dy * dy; vxy += dx * dy
      }
      vxx /= n; vyy /= n; vxy /= n
      // eigen decomposition of the 2x2 covariance
      const tr = vxx + vyy
      const det = vxx * vyy - vxy * vxy
      const disc = Math.sqrt(Math.max(tr * tr / 4 - det, 0))
      const l1 = tr / 2 + disc
      const l2 = tr / 2 - disc
      const rot = 0.5 * Math.atan2(2 * vxy, vxx - vyy) * (180 / Math.PI)
      // for a uniformly filled ellipse, semi axis = 2 * sqrt(eigenvalue)
      const rx = 2 * Math.sqrt(Math.max(l1, 0))
      const ry = 2 * Math.sqrt(Math.max(l2, 0))
      // colour: median of pixels near the centre, away from the antialiased rim
      const inner = px.filter(([x, y]) => Math.hypot(x - cx, y - cy) < Math.max(ry * 0.6, 1.5))
      const pool = inner.length > 8 ? inner : px
      const R = [], G = [], B = []
      for (const [x, y] of pool) {
        const i = (y * W + x) * 4
        R.push(data[i]); G.push(data[i + 1]); B.push(data[i + 2])
      }
      const hex = '#' + [median(R), median(G), median(B)]
        .map((v) => v.toString(16).padStart(2, '0')).join('').toUpperCase()
      return { cx, cy, rx, ry, rot, fill: hex, area: n }
    })

  const xs = shapes.flatMap((s) => [s.cx - s.rx, s.cx + s.rx])
  const ys = shapes.flatMap((s) => [s.cy - s.ry, s.cy + s.ry])
  return {
    imageSize: [W, H],
    gutter, firstInk,
    bbox: [Math.min(...xs), Math.min(...ys), Math.max(...xs), Math.max(...ys)],
    shapes,
  }
}, dataUrl)

await browser.close()

// normalise into the 0 0 100 100 viewBox the site already uses, centred
const [x0, y0, x1, y1] = result.bbox
const span = Math.max(x1 - x0, y1 - y0)
const scale = 100 / span
const midX = (x0 + x1) / 2
const midY = (y0 + y1) / 2
const r2 = (n) => Number(n.toFixed(2))
const ellipses = result.shapes
  .map((s) => ({
    cx: r2(50 + (s.cx - midX) * scale),
    cy: r2(50 + (s.cy - midY) * scale),
    rx: r2(s.rx * scale),
    ry: r2(s.ry * scale),
    rot: r2(s.rot),
    fill: s.fill,
  }))
  // stable order: outside in, then clockwise, so the file diffs cleanly
  .sort((a, b) => {
    const ra = Math.hypot(a.cx - 50, a.cy - 50)
    const rb = Math.hypot(b.cx - 50, b.cy - 50)
    if (Math.abs(ra - rb) > 0.6) return ra - rb
    return Math.atan2(a.cy - 50, a.cx - 50) - Math.atan2(b.cy - 50, b.cx - 50)
  })

console.log(`image ${result.imageSize.join('x')}, mark region x ${result.firstInk} to ${result.gutter}`)
console.log(`traced ${ellipses.length} ellipses`)
console.log('pixel bbox:', result.bbox.map((n) => Math.round(n)).join(' '))
const areas = result.shapes.map((s) => s.area).sort((a, b) => a - b)
console.log(`blob areas: min ${areas[0]}, median ${areas[areas.length >> 1]}, max ${areas[areas.length - 1]}`)
const colours = {}
for (const e of ellipses) colours[e.fill] = (colours[e.fill] || 0) + 1
console.log('distinct fills:', Object.keys(colours).length)
if (outfile) { writeFileSync(outfile, JSON.stringify(ellipses, null, 2)); console.log('wrote', outfile) }
