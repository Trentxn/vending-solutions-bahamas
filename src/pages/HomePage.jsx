import { Link } from 'react-router-dom'
import {
  ArrowDownToLine,
  ArrowRight,
  Banknote,
  Check,
  Coffee,
  Coins,
  CupSoda,
  ListChecks,
  Lock,
  MapPin,
  Zap,
} from 'lucide-react'
import usePageTitle from '../hooks/usePageTitle.js'
import Reveal from '../components/ui/Reveal.jsx'
import SectionHeading from '../components/ui/SectionHeading.jsx'
import IconCard from '../components/ui/IconCard.jsx'
import Steps from '../components/ui/Steps.jsx'
import {
  site,
  hero,
  trustBar,
  services,
  whyChooseUs,
  comboMachine,
  howItWorks,
  industries,
} from '../content.js'
import comboMachinePhoto from '../assets/photos/combo-machine.jpg'
import locationPhoto from '../assets/photos/machines-on-location.jpg'
import '../styles/home.css'

const HERO_GRADIENT_PHRASE = 'The Bahamas'

const heroMicro = ['No cost', 'Fully managed', 'Weekly restocked']

const heroChips = [
  { icon: ListChecks, label: '30+ selections' },
  { icon: Banknote, label: '$0 to your business' },
  { icon: Coins, label: 'BSD & USD accepted' },
]

const serviceCards = [
  { data: services.snack, icon: CupSoda, tone: 'blue' },
  { data: services.coffee, icon: Coffee, tone: 'green' },
]

const teaserChips = [
  { icon: ArrowDownToLine, label: 'Soft elevator delivery' },
  { icon: Coins, label: 'Dual currency — BSD & USD' },
  { icon: Zap, label: 'Energy-saving LED lighting' },
  { icon: Lock, label: 'Three-point security locking' },
]

function renderHeadline(text, phrase) {
  const idx = text.indexOf(phrase)
  if (idx === -1) return text
  return (
    <>
      {text.slice(0, idx)}
      <span className="text-gradient">{phrase}</span>
      {text.slice(idx + phrase.length)}
    </>
  )
}

export default function HomePage() {
  usePageTitle()

  return (
    <>
      {/* 1. Hero */}
      <section className="home-hero">
        <div className="container home-hero__grid">
          <Reveal className="home-hero__copy">
            <span className="eyebrow">{site.serviceArea}</span>
            <h1 className="home-hero__title">{renderHeadline(hero.headline, HERO_GRADIENT_PHRASE)}</h1>
            <p className="lede home-hero__lede">{hero.subheading}</p>
            <div className="home-hero__actions">
              <Link className="btn btn--primary" to={hero.primaryCta.to}>
                {hero.primaryCta.label}
              </Link>
              <Link className="btn btn--outline" to={hero.secondaryCta.to}>
                {hero.secondaryCta.label}
              </Link>
            </div>
            <ul className="home-hero__micro" role="list">
              {heroMicro.map((item) => (
                <li key={item}>
                  <Check size={15} strokeWidth={3} aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="home-hero__visual" delay={0.12} y={26}>
            <div className="home-hero__blob" aria-hidden="true" />
            <div className="home-hero__frame">
              <img
                src={comboMachinePhoto}
                alt="Power of Choice combo vending machine stocked with snacks and cold drinks"
                fetchpriority="high"
                decoding="async"
              />
            </div>
            {heroChips.map((chip, i) => (
              <div key={chip.label} className={`home-hero__chip home-hero__chip--${i + 1}`}>
                <chip.icon size={16} strokeWidth={2.2} aria-hidden="true" />
                {chip.label}
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* 2. Trust bar */}
      <section className="section--tight section--surface" aria-label="Why businesses trust us">
        <div className="container">
          <ul className="home-trust__grid" role="list">
            {trustBar.map((item, i) => (
              <Reveal as="li" key={item.label} delay={i * 0.06} y={12} className="home-trust__item">
                <span className={`home-trust__icon${i % 2 ? ' home-trust__icon--green' : ''}`}>
                  <item.icon size={20} strokeWidth={2.1} aria-hidden="true" />
                </span>
                <span className="home-trust__label">{item.label}</span>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* 3. Services overview */}
      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="What we place"
            title="Two services. Zero hassle."
            lede="A temperature-zoned combo machine for cold drinks and snacks, and a barista-grade coffee machine — both placed, stocked, and serviced entirely by us."
          />
          <div className="home-services__grid">
            {serviceCards.map((service, i) => (
              <Reveal key={service.data.title} delay={i * 0.08}>
                <article className="home-service-card">
                  <span className={`home-service-card__icon home-service-card__icon--${service.tone}`}>
                    <service.icon size={24} strokeWidth={2} aria-hidden="true" />
                  </span>
                  <h3>{service.data.title}</h3>
                  <p className="home-service-card__summary">{service.data.summary}</p>
                  <ul className="home-service-card__features" role="list">
                    {service.data.features.slice(0, 4).map((feature) => (
                      <li key={feature}>
                        <span className="home-service-card__check">
                          <Check size={12} strokeWidth={3} aria-hidden="true" />
                        </span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link className="home-service-card__link" to="/services">
                    Learn more
                    <ArrowRight size={17} strokeWidth={2.2} aria-hidden="true" />
                  </Link>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Machine teaser */}
      <section className="section section--navy">
        <div className="container home-teaser__grid">
          <Reveal className="home-teaser__copy">
            <span className="eyebrow">{comboMachine.service}</span>
            <h2>Meet the {comboMachine.name}</h2>
            <p>{comboMachine.intro}</p>
            <Link className="btn btn--light" to="/machines">
              Explore the machine
              <ArrowRight size={17} strokeWidth={2.2} aria-hidden="true" />
            </Link>
          </Reveal>
          <div className="home-teaser__chips">
            {teaserChips.map((chip, i) => (
              <Reveal key={chip.label} delay={0.1 + i * 0.07} y={14} className="home-teaser__chip">
                <chip.icon size={20} strokeWidth={2} aria-hidden="true" />
                <span>{chip.label}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Why choose us */}
      <section className="section">
        <div className="container">
          <SectionHeading
            center
            eyebrow="Why choose us"
            title="Everything handled, at no cost to you"
            lede="Eleven reasons businesses across Nassau host our machines — and keep them."
          />
          <div className="home-why__grid">
            {whyChooseUs.map((item, i) => (
              <Reveal key={item.title} delay={(i % 4) * 0.06} y={14}>
                <IconCard icon={item.icon} title={item.title} text={item.text} tone={i % 2 ? 'green' : 'blue'} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Industries strip */}
      <section className="section section--sand">
        <div className="container">
          <SectionHeading
            center
            eyebrow="Industries we serve"
            title="A fit for every kind of location"
            lede={industries.lede}
          />
          <Reveal>
            <ul className="home-industries__cloud" role="list">
              {industries.items.map((industry, i) => (
                <li
                  key={industry.title}
                  className={`home-industries__pill${i % 2 ? ' home-industries__pill--blue' : ''}`}
                >
                  <industry.icon size={17} strokeWidth={2.1} aria-hidden="true" />
                  {industry.title}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal className="home-industries__cta" delay={0.12}>
            <Link className="btn btn--outline" to="/industries">
              See how we fit your industry
            </Link>
          </Reveal>
        </div>
      </section>

      {/* 7. How it works */}
      <section className="section section--surface">
        <div className="container">
          <SectionHeading center eyebrow="Getting started" title={howItWorks.title} lede={howItWorks.lede} />
          <Steps steps={howItWorks.steps} />
        </div>
      </section>

      {/* 8. Location photo band */}
      <section className="section" aria-label="Our machines on location">
        <div className="container">
          <Reveal className="home-location__frame" y={24}>
            <img
              src={locationPhoto}
              alt="Two Power of Choice combo vending machines installed in a hospital waiting lounge"
              loading="lazy"
              decoding="async"
            />
            <div className="home-location__caption">
              <MapPin size={18} strokeWidth={2.2} aria-hidden="true" />
              <p>On location — serving businesses across {site.serviceArea}.</p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
