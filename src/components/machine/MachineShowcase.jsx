import { useRef, useState } from 'react'
import { useScroll, useMotionValueEvent } from 'framer-motion'
import VendingMachineSVG from './VendingMachineSVG.jsx'
import ShowcasePanel from './ShowcasePanel.jsx'
import ProgressRail from './ProgressRail.jsx'
import { STAGE_COUNT } from './stages.js'

/**
 * The pinned scrollytelling showcase. The outer section is STAGE_COUNT × 120vh
 * tall; the inner viewport sticks for the whole ride while scroll progress
 * drives the machine.
 *
 * IMPORTANT: no ancestor of .showcase__sticky may have a transform or
 * non-visible overflow, or the pin breaks - never wrap this in Reveal.
 */
export default function MachineShowcase() {
  const ref = useRef(null)
  const [stage, setStage] = useState(0)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const next = Math.max(0, Math.min(STAGE_COUNT - 1, Math.floor(v * STAGE_COUNT)))
    setStage((prev) => (prev === next ? prev : next))
  })

  const jumpTo = (i) => {
    const el = ref.current
    if (!el) return
    const stageHeight = el.offsetHeight / STAGE_COUNT
    const top = el.getBoundingClientRect().top + window.scrollY
    window.scrollTo({ top: top + i * stageHeight + stageHeight * 0.5, behavior: 'smooth' })
  }

  return (
    <section ref={ref} className="showcase" aria-label="Machine feature tour">
      <div className="showcase__sticky">
        <div className="showcase__grid">
          <div className="showcase__machine">
            <VendingMachineSVG stage={stage} progress={scrollYProgress} />
          </div>
          <ShowcasePanel stage={stage} />
        </div>
        <ProgressRail stage={stage} onJump={jumpTo} />
      </div>
    </section>
  )
}
