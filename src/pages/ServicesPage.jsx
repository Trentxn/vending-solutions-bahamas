import { Link } from 'react-router-dom'
import { ArrowRight, Bean, Sparkles, ThermometerSnowflake } from 'lucide-react'
import usePageTitle from '../hooks/usePageTitle.js'
import Reveal from '../components/ui/Reveal.jsx'
import SectionHeading from '../components/ui/SectionHeading.jsx'
import { services, products } from '../content.js'
import comboPhoto from '../assets/photos/combo-machine.jpg'
import coffeePhoto from '../assets/photos/coffee-machine.jpg'
import '../styles/services.css'

export default function ServicesPage() {
  usePageTitle('Our Services')

  return (
    <>
      {/* ---------- page hero ---------- */}
      <section className="page-hero">
        <div className="container">
          <Reveal className="page-hero__inner">
            <span className="eyebrow">Our Services</span>
            <h1>What your team gets to choose from</h1>
            <p className="lede">
              Two machines, one selection built around your location. Here is what goes in them.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------- snack & beverage ---------- */}
      <section className="section" id="snack">
        <div className="container services-split">
          <div>
            <SectionHeading
              eyebrow="Snack &amp; Beverage Service"
              title={services.snack.title}
              lede={services.snack.summary}
            />
            {products.categories.map((category, i) => (
              <Reveal delay={0.06 + i * 0.06} key={category.title}>
                <p className="services-menu__label">
                  <category.icon size={17} strokeWidth={2.2} aria-hidden="true" />
                  {category.title}
                </p>
                <ul className="services-chips" role="list">
                  {category.items.map((item) => (
                    <li className="services-chip" key={item}>
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
            <Reveal delay={0.12}>
              <p className="services-note">
                <ThermometerSnowflake size={18} strokeWidth={2} aria-hidden="true" />
                Over 30 selections in a single temperature zoned machine.
              </p>
              <div className="services-cta-row">
                <Link className="btn btn--outline" to="/solution">
                  See how the solution works
                  <ArrowRight size={18} strokeWidth={2} aria-hidden="true" />
                </Link>
              </div>
            </Reveal>
          </div>
          <Reveal className="services-media" delay={0.1}>
            <div className="services-media__frame">
              <img
                src={comboPhoto}
                alt="The Power of Choice combo vending machine, stocked with snacks and cold drinks behind a full glass front"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- coffee (mirrored, dark) ---------- */}
      <section className="section section--navy" id="coffee">
        <div className="container services-split services-split--dark services-split--media-left">
          <div>
            <SectionHeading
              light
              eyebrow="Specialty Coffee Service"
              title={services.coffee.title}
              lede={services.coffee.summary}
            />
            <Reveal delay={0.06}>
              <ul className="services-chips" role="list">
                {services.coffee.menu.map((item) => (
                  <li className="services-chip" key={item}>
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="services-badge-row">
                <span className="badge badge--gold">{services.coffee.selections}</span>
              </p>
              <p className="services-note">
                <Bean size={18} strokeWidth={2} aria-hidden="true" />
                {services.coffee.beans}
              </p>
              <div className="services-cta-row">
                <Link className="btn btn--primary" to="/contact#survey">
                  Add coffee to your break room
                  <ArrowRight size={18} strokeWidth={2} aria-hidden="true" />
                </Link>
              </div>
            </Reveal>
          </div>
          <Reveal className="services-media" delay={0.1}>
            <div className="services-media__frame">
              <img
                src={coffeePhoto}
                alt="The Barista Coffee vending machine, which grinds fresh whole beans for every cup"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- how the menu gets built ---------- */}
      <section className="section section--sand">
        <div className="container">
          <Reveal className="services-tuned">
            <span className="services-tuned__icon">
              <Sparkles size={22} strokeWidth={2.1} aria-hidden="true" />
            </span>
            <h2>Built around your team</h2>
            <p className="lede">{products.note}</p>
            <p className="services-tuned__highlight">Local favorites on request.</p>
            <Link className="services-tuned__link" to="/solution">
              How hosting works
              <ArrowRight size={17} strokeWidth={2.2} aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  )
}
