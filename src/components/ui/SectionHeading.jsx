import Reveal from './Reveal.jsx'

export default function SectionHeading({ eyebrow, title, lede, center = false, light = false }) {
  return (
    <Reveal className={`section-heading ${center ? 'section-heading--center' : ''} ${light ? 'section-heading--light' : ''}`}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2 className="section-heading__title">{title}</h2>
      {lede && <p className="lede section-heading__lede">{lede}</p>}
    </Reveal>
  )
}
