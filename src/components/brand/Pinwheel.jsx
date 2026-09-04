import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import LogoMark from './LogoMark.jsx'

/*
 * The brand mark as a moving element. Decorative everywhere it is used, so it
 * is always aria-hidden and always disabled under prefers-reduced-motion.
 *
 *   spin="idle"    a slow continuous turn (--brand-spin-duration, 90s)
 *   spin="scroll"  rotation driven by scroll through `target`
 *   spin={false}   static
 *
 * Motion is transform only, so nothing here can reflow the page or interfere
 * with the sticky pin in the machine tour.
 */
export default function Pinwheel({ spin = 'idle', target, size = 320, className = '' }) {
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target,
    offset: ['start end', 'end start'],
  })
  const rotate = useTransform(scrollYProgress, [0, 1], [-24, 24])
  const scrolling = spin === 'scroll' && !reduced && target

  return (
    <motion.div
      className={`pinwheel ${className}`.trim()}
      aria-hidden="true"
      style={{ width: size, height: size, ...(scrolling ? { rotate } : null) }}
      animate={spin === 'idle' && !reduced ? { rotate: 360 } : undefined}
      transition={
        spin === 'idle' && !reduced
          ? { duration: 90, ease: 'linear', repeat: Infinity }
          : undefined
      }
    >
      <LogoMark size="100%" />
    </motion.div>
  )
}
