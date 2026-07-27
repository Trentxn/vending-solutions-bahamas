import { AnimatePresence, motion } from 'framer-motion'
import StageCard from './StageCard.jsx'

/** Scroll-driven copy panel: the animating shell around the shared StageCard. */
export default function ShowcasePanel({ stage }) {
  return (
    <div className="showcase__panel">
      <AnimatePresence mode="wait">
        <motion.div
          key={stage}
          className="showcase__card"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
        >
          <StageCard stage={stage} />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
