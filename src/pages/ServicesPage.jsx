import { Link } from 'react-router-dom'
import { ArrowRight, Bean, Check, ThermometerSnowflake } from 'lucide-react'
import usePageTitle from '../hooks/usePageTitle.js'
import Reveal from '../components/ui/Reveal.jsx'
import SectionHeading from '../components/ui/SectionHeading.jsx'
import { services, products, coffeeMachine } from '../content.js'
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
            <h1>Fully managed vending, two ways</h1>
            <p className="lede">
              Snack &amp; beverage combo machines and fresh bean coffee vending, installed,
              stocked, and maintained by our team at no cost to your business.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------- snack & beverage ---------- */}
      <section className="section" id="snack">
        <div className="container services-split">
          <div>
            <SectionHeading
              eyebrow="Traditional Service"
              title={services.snack.title}
              lede={services.snack.summary}
            />
            <Reveal delay={0.06}>
              <ul className="services-checks" role="list">
                {services.snack.features.slice(0, 4).map((feature) => (
                  <li className="services-check" key={feature}>
                    <span className="services-check__icon">
                      <Check size={14} strokeWidth={3} aria-hidden="true" />
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="services-note">
                <ThermometerSnowflake size={18} strokeWidth={2} aria-hidden="true" />
                Over 30 selections in a single temperature zoned machine.
              </p>
              <div className="services-cta-row">
                <Link className="btn btn--outline" to="/machines">
                  See the machine in action
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
              eyebrow="Hot Drink Service"
              title={services.coffee.title}
              lede={services.coffee.summary}
            />
            <Reveal delay={0.06}>
              <ul className="services-checks" role="list">
                {services.coffee.features.slice(0, 4).map((feature) => (
                  <li className="services-check" key={feature}>
                    <span className="services-check__icon">
                      <Check size={14} strokeWidth={3} aria-hidden="true" />
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="services-badge-row">
                <span className="badge badge--green">{services.coffee.selections}</span>
              </p>
              <p className="services-note">
                <Bean size={18} strokeWidth={2} aria-hidden="true" />
                {coffeeMachine.intro}
              </p>
              <div className="services-cta-row">
                <Link className="btn btn--light" to="/contact#survey">
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

      {/* ---------- product categories ---------- */}
      <section className="section section--sand">
        <div className="container">
          <SectionHeading
            center
            eyebrow="Products"
            title="Stocked with what your team wants"
            lede={products.note}
          />
          <div className="services-cats">
            {products.categories.map((category, i) => {
              const Icon = category.icon
              const isLast = i === products.categories.length - 1
              return (
                <Reveal as="article" className="services-cat" key={category.title} delay={i * 0.06}>
                  <span className={`services-cat__icon${isLast ? ' services-cat__icon--green' : ''}`}>
                    <Icon size={22} strokeWidth={2} aria-hidden="true" />
                  </span>
                  <h3 className="services-cat__title">{category.title}</h3>
                  <ul className="services-chips" role="list">
                    {category.items.map((item) => (
                      <li className="services-chip" key={item}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* ---------- cross-link to machines ---------- */}
      <section className="section section--tight services-crosslink-section">
        <div className="container">
          <Reveal className="services-crosslink" y={24}>
            <div className="services-crosslink__copy">
              <h2>Want the engineering tour?</h2>
              <p>Specs, dimensions, and the tech inside both machines.</p>
            </div>
            <Link className="btn btn--light" to="/machines">
              Explore the machines
              <ArrowRight size={18} strokeWidth={2} aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  )
}
