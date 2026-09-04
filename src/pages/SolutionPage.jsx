import { Link } from 'react-router-dom'
import { Clock, ArrowRight } from 'lucide-react'
import usePageTitle from '../hooks/usePageTitle.js'
import {
  solutionPage,
  included,
  serviceCommitment,
  terms,
  howItWorks,
  comboMachine,
  coffeeMachine,
  healthSafety,
} from '../content.js'
import SectionHeading from '../components/ui/SectionHeading.jsx'
import SpecCard from '../components/ui/SpecCard.jsx'
import IconCard from '../components/ui/IconCard.jsx'
import Reveal from '../components/ui/Reveal.jsx'
import Steps from '../components/ui/Steps.jsx'
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
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* how hosting actually starts */}
      <section className="section">
        <div className="container">
          <SectionHeading center eyebrow="Getting started" title={howItWorks.title} lede={howItWorks.lede} />
          <Steps steps={howItWorks.steps} />
        </div>
      </section>

      {/* the commercial side: the question only this page answers */}
      <section className="section section--surface">
        <div className="container">
          <SectionHeading center eyebrow={terms.eyebrow} title={terms.title} />
          <div className="solution-terms__grid">
            {terms.items.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.07} y={14}>
                <IconCard icon={item.icon} title={item.title} text={item.text} tone={i === 1 ? 'gold' : 'blue'} />
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.14}>
            <p className="solution-terms__note">{terms.note}</p>
          </Reveal>
        </div>
      </section>

      {/* both machines on paper, side by side */}
      <section className="section">
        <div className="container">
          <SectionHeading
            center
            eyebrow="Specifications"
            title="The equipment, on paper"
            lede={coffeeMachine.idealFor}
          />
          <div className="solution-specs">
            <Reveal>
              <SpecCard title={comboMachine.name} subtitle="Snacks & beverages" specs={comboMachine.specs} />
            </Reveal>
            <Reveal delay={0.1}>
              <SpecCard title={coffeeMachine.name} subtitle="Specialty coffee" specs={coffeeMachine.specs} />
            </Reveal>
          </div>
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
