import { motion, useReducedMotion } from 'framer-motion'

/**
 * Site-wide reveal-on-scroll wrapper — the ONLY animation used outside the
 * Machines showcase. Never wrap the MachineShowcase in this (its transform
 * would break position: sticky pinning).
 */
export default function Reveal({ children, delay = 0, y = 18, className, as = 'div' }) {
  const reduced = useReducedMotion()
  const Tag = motion[as] ?? motion.div

  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y: reduced ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -60px 0px' }}
      transition={{ duration: 0.55, delay, ease: [0.21, 0.6, 0.35, 1] }}
    >
      {children}
    </Tag>
  )
}
