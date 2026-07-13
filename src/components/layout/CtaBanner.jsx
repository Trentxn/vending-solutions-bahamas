import { Link, useLocation } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { cta } from '../../content.js'

export default function CtaBanner() {
  const { pathname } = useLocation()
  const onContact = pathname === '/contact'

  const scrollToForm = (e) => {
    e.preventDefault()
    document.getElementById('survey')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section className="cta-banner" aria-label="Free site assessment">
      <div className="container cta-banner__inner">
        <div>
          <h2 className="cta-banner__heading">{cta.heading}</h2>
          <p className="cta-banner__text">{cta.text}</p>
        </div>
        {onContact ? (
          <a href="#survey" onClick={scrollToForm} className="btn btn--light">
            {cta.button.label} <ArrowRight size={18} />
          </a>
        ) : (
          <Link to={cta.button.to} className="btn btn--light">
            {cta.button.label} <ArrowRight size={18} />
          </Link>
        )}
      </div>
    </section>
  )
}
