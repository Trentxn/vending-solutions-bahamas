import { Link } from 'react-router-dom'
import usePageTitle from '../hooks/usePageTitle.js'
import Reveal from '../components/ui/Reveal.jsx'
import Pinwheel from '../components/brand/Pinwheel.jsx'
import { notFound } from '../content.js'
import '../styles/contact.css'

export default function NotFoundPage() {
  usePageTitle('Page Not Found')

  return (
    <section className="section notfound">
      <div className="container">
        <Reveal className="notfound__inner">
          <Pinwheel spin="idle" size={76} className="notfound__wheel" />
          <p className="notfound__code text-gradient" aria-hidden="true">
            404
          </p>
          <h1>{notFound.title}</h1>
          <p className="notfound__text">{notFound.text}</p>
          <Link className="btn btn--primary" to={notFound.button.to}>
            {notFound.button.label}
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
