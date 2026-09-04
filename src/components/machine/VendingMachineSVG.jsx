import { useEffect } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import { STAGES, STAGE_COUNT } from './stages.js'
import useTheme from '../../hooks/useTheme.js'

/* ------------------------------------------------------------------
   Anatomical vending machine, modeled on the client's real
   "Power of Choice" combo unit. viewBox: 0 0 360 640.
   - `stage` (0..5) drives focus/dim + discrete animations
   - `progress` (MotionValue 0..1 across the whole showcase) drives
     continuous animations; when absent (static mode) a fixed value
     representative of the stage is used instead.

   Theming: the cream cabinet is true to the real unit and pops on both
   grounds, so it stays literal. Everything that has to sit against the
   *page* (edges, shadow, plinth, spotlight) is routed through the --vm-*
   custom properties defined in global.css.
   ------------------------------------------------------------------ */

const SNACK_PLATES = [126, 184, 242, 300]
const DRINK_PLATES = [364, 428, 492]
const SNACK_X = [38, 76, 114, 152]
const DRINK_X = [40, 77, 114, 151]
const SNACK_COLORS = ['#F2B33D', '#E36414', '#C9563C', '#8CB369']
const DRINK_COLORS = ['#0096C7', '#0C9A6C', '#4EA8DE', '#56CFE1']

function SnackShelf({ plateY, row }) {
  return (
    <g>
      {SNACK_X.map((x, i) => {
        const c = SNACK_COLORS[(i + row) % SNACK_COLORS.length]
        const tall = (i + row) % 2 === 0
        const h = tall ? 32 : 24
        return (
          <g key={i}>
            <rect x={x} y={plateY - h - 2} width={28} height={h} rx={5} fill={c} opacity={0.92} />
            <rect x={x + 4} y={plateY - h + 2} width={8} height={h - 10} rx={4} fill="#fff" opacity={0.22} />
            {/* spiral coil in front of the product */}
            <ellipse cx={x + 14} cy={plateY - 5} rx={13} ry={7.5} fill="none" stroke="#AFBecd" strokeWidth={1.4} opacity={0.85} />
          </g>
        )
      })}
      <rect x={30} y={plateY} width={156} height={3.5} rx={1.75} fill="#C9D6E2" opacity={0.9} />
    </g>
  )
}

function Bottle({ x, bottomY, color, small = false }) {
  const h = small ? 24 : 30
  return (
    <g>
      {!small && <rect x={x + 4.5} y={bottomY - h - 10} width={7} height={8} fill={color} opacity={0.9} />}
      {!small && <rect x={x + 3.5} y={bottomY - h - 13} width={9} height={4} rx={1.5} fill="#0B2239" opacity={0.7} />}
      <rect x={x} y={bottomY - h} width={16} height={h} rx={small ? 3 : 5} fill={color} opacity={0.95} />
      <rect x={x + 2.5} y={bottomY - h + 5} width={11} height={small ? 8 : 10} rx={2} fill="#fff" opacity={0.3} />
    </g>
  )
}

function DrinkShelf({ plateY, row }) {
  return (
    <g>
      {DRINK_X.map((x, i) => (
        <Bottle key={i} x={x} bottomY={plateY - 2} color={DRINK_COLORS[(i + row) % DRINK_COLORS.length]} small={(i + row) % 3 === 2} />
      ))}
      <rect x={30} y={plateY} width={156} height={3.5} rx={1.75} fill="#C9D6E2" opacity={0.9} />
    </g>
  )
}

function KeypadGrid() {
  const cols = [242, 266, 290]
  const rows = [162, 180, 198, 216]
  return (
    <g>
      {rows.map((y) =>
        cols.map((x) => <rect key={`${x}-${y}`} x={x} y={y} width={20} height={14} rx={3.5} fill="#fff" stroke="#C7D2DC" strokeWidth={1} />),
      )}
    </g>
  )
}

export default function VendingMachineSVG({
  stage = 0,
  progress = null,
  staticMode = false,
  showAll = false,
}) {
  const { theme } = useTheme()
  // How far unfocused groups fade back. 0.24 all but vanishes against the
  // near-black Deep Reef ground, so dark holds a little more of the drawing.
  // showAll keeps the whole machine lit for display use (the home hero), where
  // there is no stage being explained and dimming just looks like a dull image.
  const DIM = showAll ? 1 : theme === 'dark' ? 0.34 : 0.24

  // Static fallback: a representative point (~60%) inside the stage window.
  const fallback = useMotionValue((stage + 0.6) / STAGE_COUNT)
  useEffect(() => {
    if (!progress) fallback.set((stage + 0.6) / STAGE_COUNT)
  }, [stage, progress, fallback])
  const p = progress ?? fallback

  // Per-stage sub-progress with 12% dead zones on both ends.
  const seg = (i) => [(i + 0.12) / STAGE_COUNT, (i + 0.88) / STAGE_COUNT]
  const seg0 = useTransform(p, seg(0), [0, 1], { clamp: true })
  const seg1 = useTransform(p, seg(1), [0, 1], { clamp: true })
  const seg2 = useTransform(p, seg(2), [0, 1], { clamp: true })
  const seg3 = useTransform(p, seg(3), [0, 1], { clamp: true })
  const seg5 = useTransform(p, seg(5), [0, 1], { clamp: true })

  /* stage 0 - capacity */
  const shineX = useTransform(seg0, [0.05, 0.9], [-50, 250])
  const shineOpacity = useTransform(seg0, [0, 0.08, 0.82, 0.95], [0, 0.16, 0.16, 0])
  const tempZoneOpacity = useTransform(seg0, [0, 0.25, 0.9, 1], [0, 1, 1, 0])

  /* stage 1 - payment */
  const billY = useTransform(seg1, [0.05, 0.45], [-32, 0])
  const billOpacity = useTransform(seg1, [0, 0.06, 0.5, 0.65], [0, 1, 1, 0])
  const coinY = useTransform(seg1, [0.35, 0.58, 0.68, 0.78], [-36, 10, 6, 9])
  const coinOpacity = useTransform(seg1, [0.28, 0.35, 0.82, 0.92], [0, 1, 1, 0])

  /* stage 2 - delivery */
  const trayY = useTransform(seg2, [0.02, 0.62], [0, 168], { clamp: true })
  const flapScaleY = useTransform(seg2, [0.66, 0.84], [1, 0.06], { clamp: true })
  const doorBottleOpacity = useTransform(seg2, [0.78, 0.87], [0, 1])
  const checkScale = useTransform(seg2, [0.85, 0.95], [0.3, 1])
  const checkOpacity = useTransform(seg2, [0.84, 0.92], [0, 1])

  /* stage 3 - efficiency */
  const ledOpacity = useTransform(seg3, [0, 0.22, 0.38, 0.72, 0.94], [1, 1, 0.07, 0.07, 1])
  const ledGlowOpacity = useTransform(ledOpacity, (v) => v * 0.3)
  const interiorDim = useTransform(ledOpacity, (v) => 0.55 + v * 0.45)
  const snowOpacity = useTransform(seg3, [0.05, 0.2, 0.88, 1], [0, 1, 1, 0])
  const snowScale = useTransform(seg3, [0.25, 0.5, 0.75], [1, 1.22, 1])

  /* stage 5 - diagnostics */
  const scanY = useTransform(seg5, [0.06, 0.88], [0, 468], { clamp: true })
  const scanOpacity = useTransform(seg5, [0, 0.08, 0.82, 0.94], [0, 0.9, 0.9, 0])

  const st = STAGES[stage] ?? STAGES[0]
  const focused = (key) => st.focus.includes('all') || st.focus.includes(key)
  const dimT = staticMode ? { duration: 0 } : { duration: 0.45, ease: 'easeOut' }
  // Plain function (not a component) so the motion.g identity is stable across
  // renders - a component defined in-render would remount its subtree on every
  // stage change and restart all animations.
  const group = (k, children) => (
    <motion.g animate={{ opacity: focused(k) ? 1 : DIM }} transition={dimT}>
      {children}
    </motion.g>
  )

  return (
    <svg
      viewBox="0 0 360 640"
      role="img"
      aria-label="Illustrated diagram of the Power of Choice combo vending machine"
      className="machine-svg"
    >
      <defs>
        <linearGradient id="vmBand" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#EEC42A" />
          <stop offset="0.5" stopColor="#D9B93A" />
          <stop offset="1" stopColor="#A3B2BD" />
        </linearGradient>
        <linearGradient id="vmCabinet" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#FBF7EE" />
          <stop offset="0.75" stopColor="#F4EDDD" />
          <stop offset="1" stopColor="#E9DFC9" />
        </linearGradient>
        <linearGradient id="vmScan" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="var(--color-blue-bright)" stopOpacity="0" />
          <stop offset="0.5" stopColor="var(--color-blue-bright)" />
          <stop offset="1" stopColor="var(--color-blue-bright)" stopOpacity="0" />
        </linearGradient>
        {/* full-strength stops; --vm-spot-o scales the whole circle back down
            in light mode so the net result matches the original wash */}
        <radialGradient id="vmSpot" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="var(--color-blue-bright)" stopOpacity="0.5" />
          <stop offset="0.6" stopColor="var(--color-blue-bright)" stopOpacity="0.18" />
          <stop offset="1" stopColor="var(--color-blue-bright)" stopOpacity="0" />
        </radialGradient>
        <filter id="vmGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="0" stdDeviation="5" floodColor="var(--color-blue-bright)" floodOpacity="0.5" />
        </filter>
        <clipPath id="vmCabinetClip">
          <rect x={8} y={8} width={344} height={584} rx={16} />
        </clipPath>
      </defs>

      {/* drifting spotlight behind the machine */}
      <motion.g animate={{ x: st.spot.x - 180, y: st.spot.y - 300 }} transition={staticMode ? { duration: 0 } : { type: 'spring', stiffness: 60, damping: 20 }}>
        <circle cx={180} cy={300} r={210} fill="url(#vmSpot)" style={{ opacity: 'var(--vm-spot-o)' }} />
      </motion.g>

      {/* floor shadow */}
      <ellipse cx={180} cy={620} rx={152} ry={11} fill="var(--vm-floor)" />

      {/* cabinet */}
      {group('cabinet', <>
        <rect x={8} y={8} width={344} height={584} rx={16} fill="url(#vmCabinet)" stroke="var(--vm-stroke-strong)" strokeWidth={1.5} />
        <rect x={20} y={592} width={320} height={16} rx={5} fill="var(--vm-plinth)" />
        {/* the wrap: the same petals as the mark, as printed on the real cabinet */}
        <g clipPath="url(#vmCabinetClip)" opacity={0.45}>
          <ellipse cx={258} cy={452} rx={26} ry={14} fill="#E4C247" transform="rotate(-34 258 452)" />
          <ellipse cx={306} cy={432} rx={19} ry={10} fill="#C9B25B" transform="rotate(18 306 432)" />
          <ellipse cx={330} cy={486} rx={23} ry={12} fill="#B6AC6E" transform="rotate(-12 330 486)" />
          <ellipse cx={272} cy={514} rx={17} ry={9} fill="#D8BC4E" transform="rotate(41 272 514)" />
          <ellipse cx={318} cy={538} rx={14} ry={8} fill="#A8A87F" transform="rotate(-26 318 538)" />
          <ellipse cx={64} cy={566} rx={22} ry={12} fill="#DCC04A" transform="rotate(-20 64 566)" />
          <ellipse cx={132} cy={574} rx={16} ry={9} fill="#BFB061" transform="rotate(28 132 574)" />
        </g>
        {/* brand band */}
        <path d="M24 8 h312 a16 16 0 0 1 16 16 v30 h-344 v-30 a16 16 0 0 1 16 -16 z" fill="url(#vmBand)" />
        <text x={180} y={34} textAnchor="middle" fontFamily="'Sora Variable', sans-serif" fontStyle="italic" fontWeight="700" fontSize="15" fill="#2A2A2A" letterSpacing="0.5">
          Power of Choice
        </text>
        <text x={180} y={47} textAnchor="middle" fontFamily="'Inter Variable', sans-serif" fontSize="6.2" fill="#2A2A2A" opacity={0.72} letterSpacing="2.4">
          VENDING SOLUTIONS BAHAMAS
        </text>
        {/* seam between glass door and service column */}
        <line x1={224} y1={62} x2={224} y2={545} stroke="var(--vm-stroke-soft)" strokeWidth={1.5} />
        {/* vents, bottom right - like the real unit */}
        {[548, 557, 566, 575, 584].map((y) => (
          <rect key={y} x={244} y={y} width={92} height={4} rx={2} fill="#D6DEE6" />
        ))}
      </>)}

      {/* glass window & interior */}
      {group('glass', <>
        {/* dark interior */}
        <motion.rect x={24} y={66} width={196} height={446} rx={10} fill="var(--vm-interior)" style={{ opacity: interiorDim }} />
      </>)}

      {/* LED strips + glow */}
      {group('leds', <>
        <motion.g style={{ opacity: ledGlowOpacity }}>
          <rect x={31} y={72} width={14} height={434} rx={6} fill="#BFF0FF" />
          <rect x={200} y={72} width={14} height={434} rx={6} fill="#BFF0FF" />
        </motion.g>
        <motion.g style={{ opacity: ledOpacity }}>
          <rect x={28} y={72} width={3.5} height={434} rx={1.75} fill="#E8FBFF" />
          <rect x={213} y={72} width={3.5} height={434} rx={1.75} fill="#E8FBFF" />
        </motion.g>
      </>)}

      {/* snack shelves */}
      {group('snacks', <>
        {SNACK_PLATES.map((y, r) => (
          <SnackShelf key={y} plateY={y} row={r} />
        ))}
      </>)}

      {/* drink shelves */}
      {group('drinks', <>
        {DRINK_PLATES.map((y, r) => (
          <DrinkShelf key={y} plateY={y} row={r} />
        ))}
      </>)}

      {/* temperature zone overlays (stage 0) */}
      {group('tempZones', <>
        <motion.g style={{ opacity: tempZoneOpacity }}>
          <rect x={26} y={70} width={192} height={236} rx={8} fill="#F2B33D" opacity={0.14} />
          <rect x={34} y={80} width={64} height={15} rx={7.5} fill="var(--vm-tz-chip)" opacity={0.75} />
          <text x={66} y={90.5} textAnchor="middle" fontFamily="'Inter Variable', sans-serif" fontSize="7.5" fontWeight="600" fill="#F2B33D" letterSpacing="1.2">
            AMBIENT
          </text>
          <rect x={26} y={310} width={192} height={200} rx={8} fill="#00B4D8" opacity={0.13} />
          <rect x={34} y={318} width={78} height={15} rx={7.5} fill="var(--vm-tz-chip)" opacity={0.75} />
          <text x={73} y={328.5} textAnchor="middle" fontFamily="'Inter Variable', sans-serif" fontSize="7.5" fontWeight="600" fill="#7BE3FF" letterSpacing="1.2">
            CHILLED 4°C
          </text>
        </motion.g>
        {/* snowflake badge (stage 3) */}
        <motion.g style={{ opacity: snowOpacity, scale: snowScale, originX: 0.5, originY: 0.5 }}>
          <circle cx={122} cy={420} r={15} fill="var(--vm-tz-chip)" opacity={0.8} />
          <text x={122} y={426} textAnchor="middle" fontSize="16" fill="#7BE3FF">
            ❄
          </text>
        </motion.g>
      </>)}

      {/* elevator lane */}
      {group('elevator', <>
        <line x1={186} y1={68} x2={186} y2={510} stroke="var(--vm-rail)" strokeWidth={1} opacity={0.5} />
        <line x1={207} y1={72} x2={207} y2={504} stroke="#8FA3B8" strokeWidth={2.5} strokeDasharray="5 4" opacity={0.75} />
        <motion.g style={{ y: trayY }}>
          <Bottle x={190} bottomY={208} color="#0C9A6C" />
          <rect x={188} y={208} width={22} height={4.5} rx={2} fill="#E8FBFF" />
          <rect x={188} y={202} width={3} height={7} rx={1.5} fill="#E8FBFF" />
        </motion.g>
      </>)}

      {/* glass shine + border (over interior contents) */}
      {group('glass', <>
        <motion.g style={{ x: shineX, opacity: shineOpacity }}>
          <rect x={30} y={66} width={34} height={446} fill="#fff" transform="skewX(-12)" />
        </motion.g>
        <rect x={24} y={66} width={196} height={446} rx={10} fill="none" stroke="var(--vm-stroke-strong)" strokeWidth={2} />
      </>)}

      {/* payment & service column */}
      {group('payment', <>
        {/* status display */}
        <rect x={242} y={80} width={96} height={36} rx={6} fill="#0B2239" />
        <rect x={246} y={84} width={88} height={28} rx={4} fill="var(--vm-lcd-glass)" />
        <motion.text
          key={`lcd-${stage}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={staticMode ? { duration: 0 } : { duration: 0.3 }}
          x={290}
          y={102}
          textAnchor="middle"
          fontFamily="ui-monospace, 'SF Mono', monospace"
          fontSize="10.5"
          fill="#6FF2B0"
          letterSpacing="1"
        >
          {st.lcd}
        </motion.text>

        {/* bill acceptor */}
        <rect x={242} y={130} width={96} height={24} rx={5} fill="#E8EDF2" stroke="#C7D2DC" strokeWidth={1} />
        <rect x={256} y={139} width={68} height={6} rx={3} fill="#22384E" />
        <motion.g style={{ y: billY, opacity: billOpacity }}>
          <rect x={262} y={118} width={56} height={13} rx={2} fill="#7BC496" stroke="#4E9A6F" strokeWidth={1} />
          <circle cx={290} cy={124.5} r={4} fill="none" stroke="#4E9A6F" strokeWidth={1} />
        </motion.g>

        {/* keypad + coin slot */}
        <KeypadGrid />
        <rect x={312} y={164} width={26} height={26} rx={6} fill="#E8EDF2" stroke="#C7D2DC" strokeWidth={1} />
        <rect x={322} y={169} width={5.5} height={16} rx={2.5} fill="#22384E" />
        <motion.circle cx={325} cy={152} r={7.5} fill="#E8C766" stroke="#C9A73E" strokeWidth={1.2} style={{ y: coinY, opacity: coinOpacity }} />

        {/* currency chips */}
        <rect x={242} y={240} width={30} height={15} rx={7.5} fill="#fff" stroke="#B9C9D9" strokeWidth={1} />
        <text x={257} y={250.5} textAnchor="middle" fontFamily="'Inter Variable', sans-serif" fontSize="7.5" fontWeight="700" fill="#3E5568">
          BSD
        </text>
        <rect x={278} y={240} width={30} height={15} rx={7.5} fill="#fff" stroke="#B9C9D9" strokeWidth={1} />
        <text x={293} y={250.5} textAnchor="middle" fontFamily="'Inter Variable', sans-serif" fontSize="7.5" fontWeight="700" fill="#3E5568">
          USD
        </text>
      </>)}

      {/* high-waist delivery door */}
      {group('door', <>
        <rect x={238} y={286} width={104} height={104} rx={12} fill="#E3DCCB" stroke="var(--vm-stroke-soft)" strokeWidth={1.5} />
        <rect x={246} y={294} width={88} height={88} rx={8} fill="var(--vm-interior)" />
        {/* delivered bottle appears when the flap opens */}
        <motion.g style={{ opacity: doorBottleOpacity }}>
          <Bottle x={282} bottomY={376} color="#0C9A6C" />
        </motion.g>
        <motion.rect x={246} y={294} width={88} height={88} rx={8} fill="#9FB3C4" opacity={0.92} style={{ scaleY: flapScaleY, originY: 0, originX: 0.5 }} />
        <rect x={246} y={294} width={88} height={88} rx={8} fill="none" stroke="var(--vm-stroke-soft)" strokeWidth={1} />
        <text x={290} y={404} textAnchor="middle" fontFamily="'Inter Variable', sans-serif" fontSize="6.5" fill="var(--vm-label-muted)" letterSpacing="1.6">
          PICK UP HERE
        </text>
        {/* delivered check */}
        <motion.g style={{ opacity: checkOpacity, scale: checkScale, originX: 0.5, originY: 0.5 }}>
          <circle cx={334} cy={292} r={11} fill="#0C9A6C" />
          <path d="M328.5 292 l4 4 l7 -8" fill="none" stroke="#fff" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" />
        </motion.g>
      </>)}

      {/* anti-pick lock cylinder */}
      {group('lockCyl', <>
        <circle cx={290} cy={432} r={9.5} fill="#E8EDF2" stroke="#C7D2DC" strokeWidth={1.2} />
        <motion.g animate={{ rotate: stage === 4 ? 90 : 0 }} transition={staticMode ? { duration: 0 } : { type: 'spring', stiffness: 200, damping: 16, delay: 0.5 }} style={{ originX: 0.5, originY: 0.5 }}>
          <rect x={288.6} y={425.5} width={2.8} height={13} rx={1.4} fill="#22384E" />
        </motion.g>
      </>)}

      {/* 3-point locking bolts on the door seam */}
      {group('locks', <>
        {[150, 320, 470].map((y, i) => (
          <g key={y}>
            <rect x={228} y={y - 2} width={12} height={14} rx={3} fill="#D6DEE6" stroke="#AFBECD" strokeWidth={1} />
            <motion.rect
              x={210}
              y={y}
              width={16}
              height={10}
              rx={3}
              fill="#8FA3B8"
              stroke="#5E7288"
              strokeWidth={1}
              animate={{ x: stage === 4 ? 10 : 0 }}
              transition={staticMode ? { duration: 0 } : { type: 'spring', stiffness: 320, damping: 22, delay: i * 0.16 }}
            />
          </g>
        ))}
      </>)}

      {/* diagnostics scanline (stage 5) */}
      <motion.g style={{ y: scanY, opacity: scanOpacity }}>
        <rect x={18} y={68} width={324} height={3} rx={1.5} fill="url(#vmScan)" />
      </motion.g>

      {/* security outline traced around the cabinet (stage 4) */}
      <motion.rect
        x={8}
        y={8}
        width={344}
        height={584}
        rx={16}
        fill="none"
        stroke="var(--color-gold)"
        strokeWidth={3}
        initial={false}
        animate={{ pathLength: stage === 4 ? 1 : 0, opacity: stage === 4 ? 1 : 0 }}
        transition={staticMode ? { duration: 0 } : { duration: 0.9, ease: 'easeInOut' }}
      />

      {/* per-stage highlight outline (nothing to point at in display mode) */}
      {!showAll && (
        <motion.rect
          key={`hl-${stage}`}
          x={st.hl.x}
          y={st.hl.y}
          width={st.hl.w}
          height={st.hl.h}
          rx={12}
          fill="none"
          stroke="var(--color-blue-bright)"
          strokeWidth={2.2}
          filter="url(#vmGlow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={staticMode ? { duration: 0 } : { duration: 0.7, ease: 'easeOut' }}
        />
      )}
    </svg>
  )
}
