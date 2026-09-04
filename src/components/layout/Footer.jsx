import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, Mailbox, MessageCircle } from 'lucide-react'
import { site, nav, contact } from '../../content.js'
import Logo from './Logo.jsx'
import Pinwheel from '../brand/Pinwheel.jsx'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      {/* texture that happens to move: one slow turn every 90 seconds */}
      <Pinwheel spin="idle" size={520} className="footer__wheel" />
      <div className="container footer__grid">
        <div className="footer__brand">
          <Logo light tagline />
          <p className="footer__blurb">
            Snack, beverage and specialty coffee vending for businesses across {site.serviceArea},
            installed, stocked and serviced at no cost to you.
          </p>
          <span className="badge badge--gold footer__badge">Est. {site.established} · Bahamian owned</span>
        </div>

        <nav className="footer__col" aria-label="Footer">
          <h3 className="footer__title">Explore</h3>
          <Link to="/">Home</Link>
          {nav.map((item) => (
            <Link key={item.to} to={item.to}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="footer__col">
          <h3 className="footer__title">Contact</h3>
          {contact.phones.map((p) => (
            <a key={p.tel} href={`tel:${p.tel}`}>
              <Phone size={15} /> {p.display}
            </a>
          ))}
          <a href={`mailto:${contact.email}`}>
            <Mail size={15} /> {contact.email}
          </a>
          <a
            href={`https://wa.me/${contact.phones[0].wa}?text=${encodeURIComponent(contact.whatsappMessage)}`}
            target="_blank"
            rel="noreferrer"
          >
            <MessageCircle size={15} /> WhatsApp us
          </a>
          <span className="footer__plain">
            <MapPin size={15} /> {contact.location}
          </span>
          <span className="footer__plain">
            <Mailbox size={15} /> {contact.postal}
          </span>
        </div>
      </div>

      <div className="footer__bar">
        <div className="container footer__bar-inner">
          <span>
            © {year} {site.name}. All rights reserved.
          </span>
          <span>Bahamian owned &amp; operated since {site.established}.</span>
        </div>
      </div>
    </footer>
  )
}
