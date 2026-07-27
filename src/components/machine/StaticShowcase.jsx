import VendingMachineSVG from './VendingMachineSVG.jsx'
import StageCard from './StageCard.jsx'
import { STAGES } from './stages.js'

/**
 * prefers-reduced-motion fallback: the six stages rendered as ordinary
 * stacked sections - same content, no pinning, no scroll-driven motion.
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
              <StageCard stage={i} />
            </div>
          </div>
        </div>
      ))}
    </section>
  )
}
