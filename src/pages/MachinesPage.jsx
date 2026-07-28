import { Link } from 'react-router-dom'
import { Check, Coffee, ArrowRight } from 'lucide-react'
import usePageTitle from '../hooks/usePageTitle.js'
import { machinesPage, comboMachine, coffeeMachine, healthSafety, services } from '../content.js'
import SectionHeading from '../components/ui/SectionHeading.jsx'
import SpecCard from '../components/ui/SpecCard.jsx'
import IconCard from '../components/ui/IconCard.jsx'
import Reveal from '../components/ui/Reveal.jsx'
import coffeePhoto from '../assets/photos/coffee-machine.jpg'
import comboPhoto from '../assets/photos/combo-machine.jpg'
import '../styles/machines.css'

export default function MachinesPage() {
  usePageTitle('The Machines')

  return (
    <>
      {/* intro */}
      <section className="page-hero machines-hero">
        <div className="container page-hero__inner">
          <span className="eyebrow">{machinesPage.eyebrow}</span>
          <h1>{machinesPage.headline}</h1>
          <p className="lede">{machinesPage.lede}</p>
          <Link to="/" className="machines-hero__tour-link">
            Watch the interactive tour
            <ArrowRight size={16} strokeWidth={2.2} aria-hidden="true" />
          </Link>
        </div>
      </section>

      {/* combo machine on paper */}
      <section className="section section--surface">
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
            <div className="machines-coffee__badges">
              <span className="badge badge--green">
                <Coffee size={14} aria-hidden="true" /> {services.coffee.selections}
              </span>
            </div>
            <Link to="/contact#survey" className="btn btn--light machines-coffee__cta">
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
      <section className="section section--green-soft">
        <div className="container">
          <SectionHeading center eyebrow="Health & Safety" title={healthSafety.title} />
          <div className="machines-hs-grid">
            {healthSafety.items.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.07}>
                <IconCard icon={item.icon} title={item.title} text={item.text} tone="green" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
