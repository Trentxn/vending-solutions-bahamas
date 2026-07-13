/* Visual QA harness — screenshots every route at desktop + mobile widths,
   plus each stage of the /machines scrollytelling showcase.

   Usage: node scripts/screenshot.mjs [baseUrl] [outDir]
   Defaults: http://localhost:4173  ./shots                                */

import { chromium } from 'playwright-core'
import { mkdirSync } from 'node:fs'
import { join } from 'node:path'

const BASE = process.argv[2] ?? 'http://localhost:4173'
const OUT = process.argv[3] ?? './shots'
const EXEC = process.env.CHROMIUM_PATH ?? '/opt/pw-browsers/chromium-1194/chrome-linux/chrome'

const ROUTES = [
  ['home', '/'],
  ['machines', '/machines'],
  ['services', '/services'],
  ['industries', '/industries'],
  ['about', '/about'],
  ['contact', '/contact'],
  ['404', '/definitely-not-a-page'],
]

const VIEWPORTS = [
  ['desktop', { width: 1440, height: 900 }],
  ['mobile', { width: 390, height: 844 }],
]

const STAGE_COUNT = 6

mkdirSync(OUT, { recursive: true })

const browser = await chromium.launch({
  executablePath: EXEC,
  args: ['--no-sandbox', '--disable-dev-shm-usage'],
})

for (const [vpName, viewport] of VIEWPORTS) {
  const page = await browser.newPage({ viewport, deviceScaleFactor: 1 })

  for (const [name, route] of ROUTES) {
    await page.goto(BASE + route, { waitUntil: 'networkidle' })
    await page.waitForTimeout(600)
    await page.screenshot({ path: join(OUT, `${name}-${vpName}.png`), fullPage: true })
    console.log(`✓ ${name}-${vpName}`)

    if (name === 'machines') {
      // step through each showcase stage and capture the pinned viewport
      const box = await page.evaluate(() => {
        const el = document.querySelector('.showcase')
        if (!el) return null
        const r = el.getBoundingClientRect()
        return { top: r.top + window.scrollY, height: el.offsetHeight }
      })
      if (box) {
        const stageH = box.height / STAGE_COUNT
        for (let i = 0; i < STAGE_COUNT; i++) {
          await page.evaluate(
            ({ top }) => window.scrollTo({ top, behavior: 'instant' }),
            { top: box.top + i * stageH + stageH * 0.55 },
          )
          await page.waitForTimeout(850)
          await page.screenshot({ path: join(OUT, `machines-stage${i}-${vpName}.png`) })
          console.log(`✓ machines-stage${i}-${vpName}`)
        }
      } else {
        console.warn('! .showcase not found — skipping stage shots')
      }
    }
  }

  await page.close()
}

await browser.close()
console.log(`\nAll screenshots written to ${OUT}`)
