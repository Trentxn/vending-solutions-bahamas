/* End to end checks against a running preview (default http://localhost:4173).
   Usage: node scripts/qa.mjs [baseUrl]
   Covers the house rules that are easy to break by accident: no hyphens or
   dashes in visible copy, the /machines redirect, header legibility over the
   hero photo, the dock bar rules, and text contrast in both themes. */
import pw from 'playwright-core'

const { chromium } = pw
const BASE = (process.argv[2] || 'http://localhost:4173').replace(/\/$/, '')
const ROUTES = ['/', '/solution', '/services', '/industries', '/about', '/contact']
// "Coca-Cola" is a trademark and "CB-11368" is a postal box: both keep their hyphen.
const ALLOWED = [/Coca-Cola/g, /CB-11368/g]
const DASHES = /[‐-―−]|(?<=[A-Za-z0-9])-(?=[A-Za-z0-9])/

const fails = []
const check = (ok, label) => {
  if (!ok) fails.push(label)
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${label}`)
}

const lum = (c) => {
  const [r, g, b] = c.match(/\d+/g).slice(0, 3).map((v) => {
    const s = v / 255
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4
  })
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}
const ratio = (a, b) => {
  const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m)
  return (x + 0.05) / (y + 0.05)
}

const browser = await chromium.launch({
  executablePath: process.env.CHROME_PATH || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
  args: ['--no-sandbox'],
})

for (const theme of ['dark', 'light']) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
  await page.addInitScript((t) => localStorage.setItem('vsb-theme', t), theme)

  for (const route of ROUTES) {
    await page.goto(BASE + route, { waitUntil: 'networkidle' })
    let text = await page.evaluate(() => document.body.innerText)
    ALLOWED.forEach((re) => {
      text = text.replace(re, '')
    })
    const hit = text.split('\n').find((line) => DASHES.test(line))
    check(!hit, `${theme} ${route}: no hyphens or dashes in copy${hit ? ` -> "${hit.trim().slice(0, 60)}"` : ''}`)
  }

  // the page moved from /machines to /solution
  await page.goto(`${BASE}/machines`, { waitUntil: 'networkidle' })
  check(new URL(page.url()).pathname.endsWith('/solution'), `${theme} /machines redirects to /solution`)

  // hero: header is transparent over the photo, so its contents must be light
  await page.goto(BASE + '/', { waitUntil: 'networkidle' })
  await page.waitForTimeout(400)
  const hero = await page.evaluate(() => ({
    over: document.querySelector('.header').className.includes('over-hero'),
    link: getComputedStyle(document.querySelector('.header__link')).color,
    sentinel: !!document.getElementById('hero-end'),
    video: !!document.querySelector('.home-hero video'),
    quote: !!document.querySelector('.home-pillars__quote'),
  }))
  check(hero.over && hero.link === 'rgb(255, 255, 255)', `${theme} header is light over the hero photo`)
  check(hero.sentinel, `${theme} hero sentinel present`)
  check(!hero.video, `${theme} no <video> until footage is added`)
  check(hero.quote, `${theme} featured testimonial renders on home`)

  // contrast of the brand colours against the page ground
  const contrast = await page.evaluate(() => {
    const bg = getComputedStyle(document.body).backgroundColor
    const of = (sel, prop = 'color') => {
      const el = document.querySelector(sel)
      return el ? getComputedStyle(el)[prop] : null
    }
    return {
      bg,
      btn: [of('.btn--primary'), of('.btn--primary', 'backgroundColor')],
      eyebrow: [of('.eyebrow'), bg],
      body: [of('.lede'), bg],
    }
  })
  for (const [label, [fg, bgc]] of Object.entries(contrast).filter(([k]) => k !== 'bg')) {
    if (!fg || !bgc) continue
    const r = ratio(fg, bgc)
    check(r >= 4.5, `${theme} ${label} contrast ${r.toFixed(2)}:1`)
  }

  // dock bar: hidden on contact, hidden over the closing banner
  await page.goto(BASE + '/contact', { waitUntil: 'networkidle' })
  const onContact = await page.evaluate(() => ({
    dock: !!document.querySelector('.dockbar'),
    banner: !!document.querySelector('.cta-banner'),
  }))
  check(!onContact.dock && !onContact.banner, `${theme} contact page has no duplicate call to action`)

  // reduced motion swaps the pinned tour for the stacked fallback
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto(BASE + '/', { waitUntil: 'networkidle' })
  const rm = await page.evaluate(() => ({
    stat: !!document.querySelector('.showcase-static'),
    pinned: !!document.querySelector('.showcase'),
  }))
  check(rm.stat && !rm.pinned, `${theme} reduced motion uses the static tour`)
  await page.emulateMedia({ reducedMotion: null })

  // testimonials the client supplied
  await page.goto(BASE + '/about', { waitUntil: 'networkidle' })
  const quotes = await page.evaluate(() => document.querySelectorAll('.about-testimonial').length)
  check(quotes === 3, `${theme} about page shows 3 testimonials (found ${quotes})`)

  await page.close()
}

await browser.close()
console.log(fails.length ? `\n${fails.length} FAILED:\n- ${fails.join('\n- ')}` : '\nAll checks passed.')
process.exit(fails.length ? 1 : 0)
