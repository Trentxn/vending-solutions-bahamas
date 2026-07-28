import { Link, useLocation } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { cta } from '../../content.js'

export default function CtaBanner() {
  const { pathname } = useLocation()

  // The contact page opens with this exact pitch above a live form, so
  // repeating it at the foot of the same page is pure noise.
  if (pathname === '/contact') return null

  return (
    <section className="cta-banner" aria-label="Free site assessment">
      <div className="container cta-banner__inner">
        <div>
          <h2 className="cta-banner__heading">{cta.heading}</h2>
          <p className="cta-banner__text">{cta.text}</p>
        </div>
        <Link to={cta.button.to} className="btn btn--light">
          {cta.button.label} <ArrowRight size={18} />
        </Link>
      </div>
    </section>
  )
}
