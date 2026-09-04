/* Regenerates the committed brand SVGs from src/brand/mark.js.
   Run by hand after tuning the mark geometry:  node scripts/build-brand.mjs
   The build never runs this - the outputs are committed. */
import { writeFileSync, mkdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { markSvgString } from '../src/brand/mark.js'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const targets = [
  // the tab icon zooms in: at 16px the outer arms are indistinguishable
  ['public/favicon.svg', markSvgString({ size: 64, inset: 20 })],
  // the eyebrow motif renders at 15px, so it zooms in like the favicon
  ['src/assets/brand/logo-mark.svg', markSvgString({ size: 100, inset: 14 })],
]

for (const [rel, contents] of targets) {
  const path = resolve(root, rel)
  mkdirSync(dirname(path), { recursive: true })
  writeFileSync(path, contents)
  console.log('wrote', rel)
}
