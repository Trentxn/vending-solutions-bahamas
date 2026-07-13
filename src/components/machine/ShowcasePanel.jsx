import { AnimatePresence, motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { STAGES, STAGE_COUNT } from './stages.js'

export default function ShowcasePanel({ stage }) {
  const st = STAGES[stage]

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
          <span className="showcase__eyebrow">
            <span className="showcase__count">
              {String(stage + 1).padStart(2, '0')} / {String(STAGE_COUNT).padStart(2, '0')}
            </span>
            {st.eyebrow}
          </span>
          <h3 className="showcase__title">{st.title}</h3>
          <p className="showcase__body">{st.body}</p>
          <ul className="showcase__bullets" role="list">
            {st.bullets.map((b) => (
              <li key={b.text}>
                <b.icon size={17} strokeWidth={2.2} aria-hidden="true" />
                <span>{b.text}</span>
              </li>
            ))}
          </ul>
          {st.cta && (
            <Link to="/contact#survey" className="btn btn--primary btn--sm showcase__cta">
              Get this machine free <ArrowRight size={16} />
            </Link>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
