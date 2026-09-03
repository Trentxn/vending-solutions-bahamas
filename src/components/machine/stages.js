import {
  Layers,
  Thermometer,
  Eye,
  Banknote,
  Keyboard,
  MonitorCheck,
  MoveVertical,
  Hand,
  PackageCheck,
  Lightbulb,
  Snowflake,
  PlugZap,
  Shield,
  Lock,
  KeyRound,
  Activity,
  RefreshCw,
  Headset,
} from 'lucide-react'

/**
 * The six scroll stages of the machine showcase.
 * All copy is grounded in the client's real spec sheet.
 *
 * focus  : SVG group keys kept at full opacity (everything else dims)
 * hl     : highlight outline rect in SVG user units (viewBox 0 0 360 640)
 * lcd    : what the status display reads during the stage
 * spot   : spotlight center (SVG user units)
 */
export const STAGES = [
  {
    id: 'capacity',
    eyebrow: 'Capacity',
    title: 'One machine. 30+ selections.',
    body:
      'Snacks stay ambient up top, drinks stay chilled below, all in one cabinet.',
    bullets: [
      { icon: Layers, text: '4 snack + 3 beverage shelves' },
      { icon: Thermometer, text: 'Dual temperature zones' },
      { icon: Eye, text: 'Full view 43½″ × 21″ glass front' },
    ],
    focus: ['glass', 'snacks', 'drinks', 'tempZones', 'elevator'],
    hl: { x: 20, y: 60, w: 204, h: 458 },
    lcd: 'WELCOME',
    spot: { x: 122, y: 290 },
  },
  {
    id: 'payment',
    eyebrow: 'Payment',
    title: 'Pay your way, BSD or USD.',
    body:
      'Bahamian and U.S. bills and coins, both accepted without a thought.',
    bullets: [
      { icon: Banknote, text: 'Bills & coins, BSD and USD' },
      { icon: Keyboard, text: 'Simple keypad selection' },
      { icon: MonitorCheck, text: 'Clear digital display' },
    ],
    focus: ['payment'],
    hl: { x: 234, y: 72, w: 112, h: 200 },
    lcd: '$1.25',
    spot: { x: 292, y: 170 },
  },
  {
    id: 'delivery',
    eyebrow: 'Delivery',
    title: 'Soft elevator. Guaranteed delivery.',
    body:
      'Every item rides down gently and arrives at waist height.',
    bullets: [
      { icon: MoveVertical, text: 'Soft Elevator Delivery System' },
      { icon: Hand, text: 'Waist height door, easy reach' },
      { icon: PackageCheck, text: 'Guaranteed product delivery' },
    ],
    focus: ['elevator', 'door'],
    hl: { x: 182, y: 66, w: 164, h: 344 },
    lcd: 'DISPENSING…',
    spot: { x: 264, y: 320 },
  },
  {
    id: 'efficiency',
    eyebrow: 'Efficiency',
    title: 'Bright when busy. Frugal when idle.',
    body:
      'The lights sleep when nobody is around, and drinks stay cold on a household circuit.',
    bullets: [
      { icon: Lightbulb, text: 'LED lighting that dims itself' },
      { icon: Snowflake, text: 'R134A, CFC free cooling' },
      { icon: PlugZap, text: '110 to 115 VAC on just 8 amps' },
    ],
    focus: ['glass', 'leds', 'drinks', 'tempZones'],
    hl: { x: 20, y: 60, w: 204, h: 458 },
    lcd: 'ECO MODE',
    spot: { x: 122, y: 420 },
  },
  {
    id: 'security',
    eyebrow: 'Security',
    title: 'Built like a vault.',
    body:
      'Rust proofed steel, a cylinder that defeats picking, and three bolts across the door.',
    bullets: [
      { icon: Shield, text: 'Vandal proof steel housing' },
      { icon: KeyRound, text: 'Pick resistant lock cylinder' },
      { icon: Lock, text: 'Three point door locking' },
    ],
    focus: ['locks', 'lockCyl', 'cabinet'],
    hl: { x: 8, y: 8, w: 344, h: 584 },
    lcd: 'SECURED',
    spot: { x: 180, y: 300 },
  },
  {
    id: 'reliability',
    eyebrow: 'Reliability',
    title: 'It checks on itself. We handle the rest.',
    body:
      'The machine flags its own problems before anyone else notices them.',
    bullets: [
      { icon: Activity, text: 'Continuous self diagnostics' },
      { icon: RefreshCw, text: 'Routine restocking' },
      { icon: Headset, text: '24 hour help desk' },
    ],
    focus: ['all'],
    hl: { x: 238, y: 74, w: 104, h: 48 },
    lcd: 'ALL SYSTEMS OK',
    spot: { x: 180, y: 300 },
    cta: true,
  },
]

export const STAGE_COUNT = STAGES.length
