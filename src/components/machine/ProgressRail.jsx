import { STAGES } from './stages.js'

export default function ProgressRail({ stage, onJump }) {
  return (
    <div className="showcase__rail" role="tablist" aria-label="Machine feature stages">
      {STAGES.map((st, i) => (
        <button
          key={st.id}
          type="button"
          role="tab"
          aria-selected={stage === i}
          aria-label={`${st.eyebrow}: ${st.title}`}
          className={`showcase__dot ${stage === i ? 'showcase__dot--active' : ''}`}
          onClick={() => onJump(i)}
        />
      ))}
    </div>
  )
}
