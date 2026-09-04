/* Regenerates the committed brand SVGs from src/brand/mark.js.
   Run by hand after tuning the mark geometry:  node scripts/build-brand.mjs
   The build never runs this - the outputs are committed. */
import { writeFileSync, mkdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { markSvgString } from '../src/brand/mark.js'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const targets = [
  ['public/favicon.svg', markSvgString({ size: 64 })],
  ['src/assets/brand/logo-mark.svg', markSvgString({ size: 100 })],
]

for (const [rel, contents] of targets) {
  const path = resolve(root, rel)
  mkdirSync(dirname(path), { recursive: true })
  writeFileSync(path, contents)
  console.log('wrote', rel)
}
