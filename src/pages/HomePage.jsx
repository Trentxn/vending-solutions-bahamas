import { Link } from 'react-router-dom'
import { useReducedMotion } from 'framer-motion'
import {
  ArrowRight,
  Banknote,
  Check,
  ChevronDown,
  Coffee,
  Coins,
  CupSoda,
  ListChecks,
  MapPin,
} from 'lucide-react'
import usePageTitle from '../hooks/usePageTitle.js'
import Reveal from '../components/ui/Reveal.jsx'
import SectionHeading from '../components/ui/SectionHeading.jsx'
import IconCard from '../components/ui/IconCard.jsx'
import Steps from '../components/ui/Steps.jsx'
import MachineShowcase from '../components/machine/MachineShowcase.jsx'
import StaticShowcase from '../components/machine/StaticShowcase.jsx'
import VendingMachineSVG from '../components/machine/VendingMachineSVG.jsx'
import { site, hero, services, whyChooseUs, comboMachine, howItWorks, industries } from '../content.js'
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
  const reduced = useReducedMotion()

  return (
    <>
      {/* 1. Hero: full-bleed, the machine itself is the opening image */}
      <section className="home-hero panel panel--full">
        <div className="container home-hero__grid">
          <Reveal className="home-hero__copy">
            <span className="eyebrow">{site.serviceArea}</span>
            <h1 className="home-hero__title">{renderHeadline(hero.headline, HERO_GRADIENT_PHRASE)}</h1>
            <p className="lede home-hero__lede">{hero.subheading}</p>
            <div className="home-hero__actions">
              <Link className="btn btn--primary btn--lg" to={hero.primaryCta.to}>
                {hero.primaryCta.label}
              </Link>
              <Link className="home-hero__secondary" to={hero.secondaryCta.to}>
                {hero.secondaryCta.label}
                <ArrowRight size={16} strokeWidth={2.2} aria-hidden="true" />
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
            <div className="home-hero__machine">
              <VendingMachineSVG stage={0} staticMode showAll />
            </div>
            {heroChips.map((chip, i) => (
              <div key={chip.label} className={`home-hero__chip home-hero__chip--${i + 1}`}>
                <chip.icon size={16} strokeWidth={2.2} aria-hidden="true" />
                {chip.label}
              </div>
            ))}
          </Reveal>
        </div>

        {!reduced && (
          <span className="home-hero__cue" aria-hidden="true">
            Scroll to explore
            <ChevronDown size={18} />
          </span>
        )}

        {/* Sentinel: the header stays transparent while this is on screen. */}
        <div id="hero-end" className="home-hero__sentinel" aria-hidden="true" />
      </section>

      {/* 2. Services overview */}
      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="What we place"
            title="Two services. Zero hassle."
            lede="A temperature zoned combo machine for cold drinks and snacks, and a barista grade coffee machine, both placed, stocked, and serviced entirely by us."
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

      {/* 4. Lead-in to the machine tour */}
      <section className="section home-tour-intro">
        <div className="container">
          <Reveal className="home-tour-intro__copy">
            <span className="eyebrow">{comboMachine.service}</span>
            <h2>Meet the {comboMachine.name}</h2>
            <p className="lede">{comboMachine.intro}</p>
          </Reveal>
        </div>
      </section>

      {/* 5. The scroll tour: the spine of the page.
          Must stay a direct child here: any wrapper with a transform (Reveal!)
          or non-visible overflow would break the sticky pin. */}
      {reduced ? <StaticShowcase /> : <MachineShowcase />}

      {/* 6. Why choose us */}
      <section className="section section--surface">
        <div className="container">
          <SectionHeading center eyebrow="Why choose us" title="Everything handled, at no cost to you" />
          <div className="home-why__grid">
            {whyChooseUs.map((item, i) => (
              <Reveal key={item.title} delay={(i % 4) * 0.06} y={14}>
                <IconCard icon={item.icon} title={item.title} text={item.text} tone={i % 2 ? 'green' : 'blue'} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Industries */}
      <section className="section section--sand home-industries panel--full-lg">
        <div className="container">
          <SectionHeading center eyebrow="Industries we serve" title="A fit for every kind of location" />
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

      {/* 8. How it works */}
      <section className="section">
        <div className="container">
          <SectionHeading center eyebrow="Getting started" title={howItWorks.title} lede={howItWorks.lede} />
          <Steps steps={howItWorks.steps} />
        </div>
      </section>

      {/* 9. Cinematic close: the real thing, on location */}
      <section className="home-location" aria-label="Our machines on location">
        <Reveal className="home-location__frame" y={24}>
          <img
            src={locationPhoto}
            alt="Two Power of Choice combo vending machines installed in a hospital waiting lounge"
            loading="lazy"
            decoding="async"
          />
          <div className="home-location__caption">
            <MapPin size={18} strokeWidth={2.2} aria-hidden="true" />
            <p>On location, serving businesses across {site.serviceArea}.</p>
          </div>
        </Reveal>
      </section>
    </>
  )
}
