import { Link } from 'react-router-dom'
import { Check, Clock, Coffee, ArrowRight } from 'lucide-react'
import usePageTitle from '../hooks/usePageTitle.js'
import {
  solutionPage,
  included,
  serviceCommitment,
  comboMachine,
  coffeeMachine,
  healthSafety,
  services,
} from '../content.js'
import SectionHeading from '../components/ui/SectionHeading.jsx'
import SpecCard from '../components/ui/SpecCard.jsx'
import IconCard from '../components/ui/IconCard.jsx'
import Reveal from '../components/ui/Reveal.jsx'
import coffeePhoto from '../assets/photos/coffee-machine.jpg'
import comboPhoto from '../assets/photos/combo-machine.jpg'
import '../styles/machines.css'

export default function SolutionPage() {
  usePageTitle('The Solution')

  return (
    <>
      {/* intro */}
      <section className="page-hero machines-hero">
        <div className="container page-hero__inner">
          <span className="eyebrow">{solutionPage.eyebrow}</span>
          <h1>{solutionPage.headline}</h1>
          <p className="lede">{solutionPage.lede}</p>
          <Link to={solutionPage.tourLink.to} className="machines-hero__tour-link">
            {solutionPage.tourLink.label}
            <ArrowRight size={16} strokeWidth={2.2} aria-hidden="true" />
          </Link>
        </div>
      </section>

      {/* what the service covers, before any hardware detail */}
      <section className="section section--surface">
        <div className="container">
          <SectionHeading center eyebrow={included.eyebrow} title={included.title} lede={included.lede} />
          <div className="solution-included__grid">
            {included.items.map((item, i) => (
              <Reveal key={item.title} delay={(i % 3) * 0.06} y={14}>
                <IconCard icon={item.icon} title={item.title} text={item.text} tone={i % 2 ? 'blue' : 'gold'} />
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.12}>
            <div className="card solution-commitment">
              <span className="solution-commitment__icon">
                <Clock size={22} strokeWidth={2.1} aria-hidden="true" />
              </span>
              <div>
                <h3>{serviceCommitment.title}</h3>
                <p>{serviceCommitment.text}</p>
                <ul className="solution-values" role="list">
                  {serviceCommitment.values.map((value) => (
                    <li key={value}>{value}</li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* combo machine on paper */}
      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow={comboMachine.service}
            title={`${comboMachine.name}, on paper`}
            lede={comboMachine.intro}
          />
          <div className="machines-spec-grid">
            <Reveal>
              <SpecCard title={comboMachine.name} subtitle="Combo machine" specs={comboMachine.specs} />
            </Reveal>
            <Reveal delay={0.1} className="machines-photo-card">
              <img
                src={comboPhoto}
                alt="The Power of Choice combo vending machine, stocked with snacks and cold drinks"
              />
              <span className="machines-photo-card__caption">The real thing, stocked and on location</span>
            </Reveal>
          </div>
        </div>
      </section>

      {/* coffee machine - dark section */}
      <section className="section section--navy machines-coffee">
        <div className="container machines-coffee__grid">
          <Reveal className="machines-coffee__photo">
            <img src={coffeePhoto} alt="The Barista Coffee hot drink vending machine" />
          </Reveal>
          <div>
            <SectionHeading
              light
              eyebrow={coffeeMachine.service}
              title="Barista Coffee: fresh beans, zero baristas"
              lede={coffeeMachine.intro}
            />
            <ul className="machines-coffee__list" role="list">
              {coffeeMachine.features.map((f, i) => (
                <Reveal as="li" key={f} delay={i * 0.06}>
                  <Check size={18} strokeWidth={2.6} aria-hidden="true" />
                  <span>{f}</span>
                </Reveal>
              ))}
            </ul>
            <p className="machines-coffee__ideal">{coffeeMachine.idealFor}</p>
            <div className="machines-coffee__badges">
              <span className="badge badge--gold">
                <Coffee size={14} aria-hidden="true" /> {services.coffee.selections}
              </span>
            </div>
            <Link to="/contact#survey" className="btn btn--primary machines-coffee__cta">
              Add coffee to your break room <ArrowRight size={17} />
            </Link>
          </div>
        </div>
        <div className="container machines-coffee__spec">
          <Reveal>
            <SpecCard title={coffeeMachine.name} subtitle="Hot drink machine" specs={coffeeMachine.specs} />
          </Reveal>
        </div>
      </section>

      {/* health & safety */}
      <section className="section section--gold-soft">
        <div className="container">
          <SectionHeading center eyebrow="Health & Safety" title={healthSafety.title} />
          <div className="machines-hs-grid">
            {healthSafety.items.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.07}>
                <IconCard icon={item.icon} title={item.title} text={item.text} tone="gold" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
