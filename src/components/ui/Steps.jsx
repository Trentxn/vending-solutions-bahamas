import Reveal from './Reveal.jsx'

export default function Steps({ steps }) {
  return (
    <ol className="steps" role="list">
      {steps.map((step, i) => (
        <Reveal as="li" key={step.title} delay={i * 0.08} className="steps__item">
          <span className="steps__num" aria-hidden="true">
            {String(i + 1).padStart(2, '0')}
          </span>
          <span className="steps__icon">
            <step.icon size={20} strokeWidth={2.1} aria-hidden="true" />
          </span>
          <h3 className="steps__title">{step.title}</h3>
          <p className="steps__text">{step.text}</p>
        </Reveal>
      ))}
    </ol>
  )
}
