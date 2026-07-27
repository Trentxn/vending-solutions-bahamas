import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { STAGES, STAGE_COUNT } from './stages.js'

/**
 * The copy block for one showcase stage: count chip + eyebrow, title, body,
 * bullets and (on the final stage) the CTA.
 *
 * Rendered as a fragment so both callers can supply their own card shell -
 * the scroll-driven panel wraps it in an animating motion.div, the
 * reduced-motion fallback in a plain div - without the markup drifting apart.
 */
export default function StageCard({ stage }) {
  const st = STAGES[stage]
  if (!st) return null

  const count = `${String(stage + 1).padStart(2, '0')} / ${String(STAGE_COUNT).padStart(2, '0')}`

  return (
    <>
      <span className="showcase__eyebrow">
        <span className="showcase__count">{count}</span>
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
    </>
  )
}
