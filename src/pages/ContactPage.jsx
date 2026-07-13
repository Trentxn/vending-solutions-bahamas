import { Clock, Mail, MapPin, MessageCircle, Phone, PhoneCall } from 'lucide-react'
import usePageTitle from '../hooks/usePageTitle.js'
import Reveal from '../components/ui/Reveal.jsx'
import SectionHeading from '../components/ui/SectionHeading.jsx'
import Accordion from '../components/ui/Accordion.jsx'
import ContactForm from '../components/contact/ContactForm.jsx'
import { contact, cta, faq, site } from '../content.js'
import { MAP_EMBED_URL } from '../config.js'
import '../styles/contact.css'

export default function ContactPage() {
  usePageTitle('Contact Us')

  return (
    <>
      {/* ---------- hero ---------- */}
      <section className="page-hero">
        <div className="container">
          <Reveal className="page-hero__inner">
            <span className="eyebrow">Contact</span>
            <h1>{cta.heading}</h1>
            <p className="lede">{cta.text}</p>
          </Reveal>
        </div>
      </section>

      {/* ---------- form + contact details ---------- */}
      <section className="section contact-main" id="survey">
        <div className="container contact-grid">
          <Reveal className="contact-grid__main">
            <div className="card contact-form-card">
              <div className="contact-form-card__head">
                <h2 className="contact-form-card__title">Tell us about your location</h2>
                <p className="contact-form-card__sub">
                  Takes about a minute. No cost, no obligation — just better breaks.
                </p>
              </div>
              <ContactForm />
            </div>
          </Reveal>

          <div className="contact-aside">
            <Reveal delay={0.06} className="contact-aside__cell">
              <div className="card contact-info-card">
                <div className="contact-info-card__head">
                  <span className="contact-info-card__icon" aria-hidden="true">
                    <PhoneCall size={18} strokeWidth={2} />
                  </span>
                  <h3>Call or WhatsApp</h3>
                </div>
                <ul className="contact-info-card__phones" role="list">
                  {contact.phones.map((p) => (
                    <li key={p.tel} className="contact-info-card__phone-row">
                      <a className="contact-info-card__tel" href={`tel:${p.tel}`}>
                        <Phone size={16} aria-hidden="true" />
                        {p.display}
                      </a>
                      <a
                        className="btn btn--whatsapp btn--sm"
                        href={`https://wa.me/${p.wa}?text=${encodeURIComponent(contact.whatsappMessage)}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <MessageCircle size={16} aria-hidden="true" />
                        WhatsApp
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.12} className="contact-aside__cell">
              <div className="card contact-info-card contact-info-card--green">
                <div className="contact-info-card__head">
                  <span className="contact-info-card__icon" aria-hidden="true">
                    <Mail size={18} strokeWidth={2} />
                  </span>
                  <h3>Email</h3>
                </div>
                <a className="contact-info-card__link" href={`mailto:${contact.email}`}>
                  {contact.email}
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.18} className="contact-aside__cell">
              <div className="card contact-info-card">
                <div className="contact-info-card__head">
                  <span className="contact-info-card__icon" aria-hidden="true">
                    <Clock size={18} strokeWidth={2} />
                  </span>
                  <h3>Business hours</h3>
                </div>
                <p className="contact-info-card__text">{contact.hours}</p>
              </div>
            </Reveal>

            <Reveal delay={0.24} className="contact-aside__cell">
              <div className="card contact-info-card contact-info-card--green">
                <div className="contact-info-card__head">
                  <span className="contact-info-card__icon" aria-hidden="true">
                    <MapPin size={18} strokeWidth={2} />
                  </span>
                  <h3>Service area</h3>
                </div>
                <p className="contact-info-card__text">{contact.location}</p>
                <p className="contact-info-card__muted">Serving {site.serviceArea}</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- map ---------- */}
      <section className="section--tight">
        <div className="container">
          <Reveal>
            <div className="contact-map">
              <span className="contact-map__placeholder" aria-hidden="true">
                <MapPin size={26} strokeWidth={2} />
                {contact.location}
              </span>
              <iframe
                src={MAP_EMBED_URL}
                title="Map of Nassau, The Bahamas"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- FAQ ---------- */}
      <section className="section section--surface">
        <div className="container">
          <SectionHeading center eyebrow="FAQ" title="Questions businesses ask us" />
          <Reveal className="contact-faq">
            <Accordion items={faq} />
          </Reveal>
        </div>
      </section>
    </>
  )
}
