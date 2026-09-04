/* ============================================================
   Vending Solutions Bahamas - brand mark geometry
   ------------------------------------------------------------
   A recreation of the client's pinwheel mark: a dense golden
   rosette at the centre with six arms of ellipses curling
   clockwise outward, shrinking and cooling from golden yellow
   through olive to soft gray blue at the tips.

   Pure ESM with no dependencies so Node (scripts/build-brand.mjs)
   and the browser (LogoMark.jsx) share one source of truth.

   Every value here is a frozen constant and every number is
   rounded to 2dp, so the output is byte for byte identical on
   every run. The build never calls this: the generated SVGs are
   committed.

   Replacing this with the official artwork: drop logo.svg (and
   optionally logo-on-dark.svg) into src/assets/brand/ - Logo.jsx
   picks it up automatically.
   ============================================================ */

export const BRAND = {
  white: '#F8F8F8',
  gold: '#EEC42A',
  grayBlue: '#A3B2BD',
  slate: '#6B7680',
  cornflower: '#748ADC',
  black: '#2A2A2A',
}

/* ---------- frozen geometry ---------- */
const ARMS = 6
const PER_ARM = 8
const ARM_SPREAD = 360 / ARMS // degrees between arms
const R0 = 12 // radius where an arm starts
const DR = 4.8 // radial step per ellipse
const DTHETA = 16 // angular step per ellipse: the clockwise curl
const RX0 = 7.4 // half length of the first ellipse in an arm
const RX_STEP = 0.8 // how much each successive ellipse shrinks
const RY_RATIO = 0.6 // ellipse thickness relative to its length
const LEAN = 25 // tilt off tangent, which gives the pinwheel its spin

const CORE_R = 4.2 // the single ellipse at dead centre
const PETALS = 6 // gold rosette around it
const PETAL_R = 6.8 // how far the rosette sits from centre
const PETAL_RX = 5.2
const PETAL_RY = 3.3

/* yellow -> olive -> gray blue, sampled along each arm */
const STOPS = [
  [0, [238, 196, 42]],
  [0.3, [217, 185, 58]],
  [0.6, [169, 166, 90]],
  [1, [163, 178, 189]],
]

const r2 = (n) => Number(n.toFixed(2))
const rad = (deg) => (deg * Math.PI) / 180

function hex([r, g, b]) {
  return '#' + [r, g, b].map((v) => Math.round(v).toString(16).padStart(2, '0')).join('').toUpperCase()
}

/** Sample the arm ramp at t (0 to 1) in sRGB. */
function ramp(t) {
  for (let i = 1; i < STOPS.length; i += 1) {
    const [t1, c1] = STOPS[i]
    if (t <= t1 || i === STOPS.length - 1) {
      const [t0, c0] = STOPS[i - 1]
      const f = t1 === t0 ? 0 : (t - t0) / (t1 - t0)
      return hex(c0.map((v, j) => v + (c1[j] - v) * Math.min(Math.max(f, 0), 1)))
    }
  }
  return hex(STOPS[0][1])
}

/**
 * The mark as a flat list of ellipses on a 0 0 100 100 viewBox,
 * in draw order: centre core, rosette, then the six arms.
 */
export function markEllipses() {
  const out = [{ cx: 50, cy: 50, rx: CORE_R, ry: CORE_R, rot: 0, fill: BRAND.gold }]

  for (let p = 0; p < PETALS; p += 1) {
    const theta = p * (360 / PETALS) - 90
    out.push({
      cx: r2(50 + PETAL_R * Math.cos(rad(theta))),
      cy: r2(50 + PETAL_R * Math.sin(rad(theta))),
      rx: PETAL_RX,
      ry: PETAL_RY,
      rot: r2(theta),
      fill: BRAND.gold,
    })
  }

  for (let i = 0; i < ARMS; i += 1) {
    for (let k = 0; k < PER_ARM; k += 1) {
      const theta = i * ARM_SPREAD + k * DTHETA - 90
      const r = R0 + k * DR
      const rx = RX0 - k * RX_STEP
      out.push({
        cx: r2(50 + r * Math.cos(rad(theta))),
        cy: r2(50 + r * Math.sin(rad(theta))),
        rx: r2(rx),
        ry: r2(rx * RY_RATIO),
        rot: r2(theta + 90 + LEAN),
        fill: ramp(k / (PER_ARM - 1)),
      })
    }
  }

  return out
}

/** The same mark as a standalone SVG document (favicon, CSS url()). */
export function markSvgString({ size = 64 } = {}) {
  const body = markEllipses()
    .map(
      (e) =>
        `  <ellipse cx="${e.cx}" cy="${e.cy}" rx="${e.rx}" ry="${e.ry}" fill="${e.fill}"` +
        (e.rot ? ` transform="rotate(${e.rot} ${e.cx} ${e.cy})"` : '') +
        ' />'
    )
    .join('\n')
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="${size}" height="${size}">\n${body}\n</svg>\n`
}
