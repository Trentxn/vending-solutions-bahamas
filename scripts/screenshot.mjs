/* Visual QA harness - screenshots every route at desktop + mobile widths in
   both themes, plus each stage of the home page scrollytelling showcase.

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

const THEMES = ['dark', 'light']

// keep in step with STAGE_COUNT in src/components/machine/stages.js
const STAGE_COUNT = 6

// the pinned showcase now lives on the home page
const SHOWCASE_ROUTE = 'home'

// framer-motion's whileInView leaves below-the-fold content at opacity:0
// until it scrolls into view, which a fullPage capture can't trigger. For QA
// we scroll through (so anything keying off scroll settles) and then force any
// still-hidden Reveal wrappers to their final state. Scoped to [style*="opacity"]
// under <main>, so the machine SVG's own animations are untouched.
async function revealAll(page) {
  await page.evaluate(async () => {
    const step = Math.round(window.innerHeight * 0.7)
    for (let y = 0; y <= document.body.scrollHeight; y += step) {
      window.scrollTo(0, y)
      await new Promise((r) => setTimeout(r, 150))
    }
    window.scrollTo(0, 0)
    document.querySelectorAll('main [style*="opacity"]').forEach((el) => {
      // never touch the machine drawing: its groups use inline opacity to dim
      // whichever parts are out of focus, and forcing them to 1 destroys that
      if (el.closest('.showcase')) return
      if (parseFloat(el.style.opacity) < 1) {
        el.style.opacity = '1'
        el.style.transform = 'none'
      }
    })
  })
  await page.waitForTimeout(300)
}

mkdirSync(OUT, { recursive: true })

const browser = await chromium.launch({
  executablePath: EXEC,
  args: ['--no-sandbox', '--disable-dev-shm-usage'],
})

for (const theme of THEMES) {
  for (const [vpName, viewport] of VIEWPORTS) {
    const page = await browser.newPage({ viewport, deviceScaleFactor: 1 })
    // seed the stored preference before any page script runs, so the pre-paint
    // bootstrap in index.html picks it up exactly as it would for a real visitor
    await page.addInitScript((t) => {
      try {
        localStorage.setItem('vsb-theme', t)
      } catch {
        /* ignore */
      }
    }, theme)

    for (const [name, route] of ROUTES) {
      const tag = `${name}-${theme}-${vpName}`
      await page.goto(BASE + route, { waitUntil: 'networkidle' })
      await page.waitForTimeout(400)

      const applied = await page.evaluate(() => document.documentElement.dataset.theme)
      if (applied !== theme) console.warn(`! ${tag}: expected theme ${theme}, got ${applied}`)

      await revealAll(page)
      await page.screenshot({ path: join(OUT, `${tag}.png`), fullPage: true })
      console.log(`✓ ${tag}`)

      if (name === SHOWCASE_ROUTE) {
        // step through each showcase stage and capture the pinned viewport
        const box = await page.evaluate(() => {
          const el = document.querySelector('.showcase')
          if (!el) return null
          const r = el.getBoundingClientRect()
          // scroll progress spans [top, top + height - viewportHeight]
          return { top: r.top + window.scrollY, travel: el.offsetHeight - window.innerHeight }
        })
        if (box) {
          for (let i = 0; i < STAGE_COUNT; i++) {
            // sample the center of stage i's scroll window
            const progress = (i + 0.5) / STAGE_COUNT
            await page.evaluate(
              ({ top }) => window.scrollTo({ top, behavior: 'instant' }),
              { top: box.top + progress * box.travel },
            )
            await page.waitForTimeout(850)
            await page.screenshot({ path: join(OUT, `stage${i}-${theme}-${vpName}.png`) })
            console.log(`✓ stage${i}-${theme}-${vpName}`)
          }
        } else {
          console.warn('! .showcase not found - skipping stage shots')
        }
      }
    }

    await page.close()
  }
}

await browser.close()
console.log(`\nAll screenshots written to ${OUT}`)
