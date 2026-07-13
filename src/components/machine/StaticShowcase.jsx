import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import VendingMachineSVG from './VendingMachineSVG.jsx'
import { STAGES } from './stages.js'

/**
 * prefers-reduced-motion fallback: the six stages rendered as ordinary
 * stacked sections — same content, no pinning, no scroll-driven motion.
 */
export default function StaticShowcase() {
  return (
    <section aria-label="Machine feature tour">
      {STAGES.map((st, i) => (
        <div key={st.id} className={`showcase-static ${i % 2 ? 'showcase-static--alt' : ''}`}>
          <div className="container showcase__grid showcase__grid--static">
            <div className="showcase__machine showcase__machine--static">
              <VendingMachineSVG stage={i} staticMode />
            </div>
            <div className="showcase__card showcase__card--static">
              <span className="showcase__eyebrow">
                <span className="showcase__count">
                  {String(i + 1).padStart(2, '0')} / {String(STAGES.length).padStart(2, '0')}
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
            </div>
          </div>
        </div>
      ))}
    </section>
  )
}
