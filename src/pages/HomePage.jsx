import { Link } from 'react-router-dom'
import { useReducedMotion } from 'framer-motion'
import { ArrowRight, ChevronDown, MapPin, Quote } from 'lucide-react'
import usePageTitle from '../hooks/usePageTitle.js'
import Reveal from '../components/ui/Reveal.jsx'
import SectionHeading from '../components/ui/SectionHeading.jsx'
import HeroMedia from '../components/home/HeroMedia.jsx'
import MachineShowcase from '../components/machine/MachineShowcase.jsx'
import StaticShowcase from '../components/machine/StaticShowcase.jsx'
import { hero, pillars, comboMachine, industries, testimonials } from '../content.js'
import '../styles/home.css'

/** Wrap a phrase inside a sentence so it can carry the brand gold. */
function highlight(text, phrase) {
  const idx = text.indexOf(phrase)
  if (idx === -1) return text
  return (
    <>
      {text.slice(0, idx)}
      <span className="text-gold">{phrase}</span>
      {text.slice(idx + phrase.length)}
    </>
  )
}

const featured = testimonials.enabled ? testimonials.items[0] : null

const industryTeaser = industries.items.slice(0, 6)

export default function HomePage() {
  usePageTitle()
  const reduced = useReducedMotion()

  return (
    <>
      {/* 1. Hero: a real photo first, the client's own words over it */}
      <section className="home-hero panel panel--full">
        <HeroMedia alt={hero.photoAlt} />

        <div className="container home-hero__inner">
          <Reveal className="home-hero__copy">
            <span className="home-hero__tagline">Power of Choice</span>
            <h1 className="home-hero__title">{hero.headline}</h1>
            <p className="home-hero__sub">{hero.subheading}</p>
            <p className="home-hero__promise">{highlight(hero.promise, hero.highlight)}</p>
            <div className="home-hero__actions">
              <Link className="btn btn--primary btn--lg" to={hero.primaryCta.to}>
                {hero.primaryCta.label}
              </Link>
              <Link className="home-hero__secondary" to={hero.secondaryCta.to}>
                {hero.secondaryCta.label}
                <ArrowRight size={16} strokeWidth={2.2} aria-hidden="true" />
              </Link>
            </div>
          </Reveal>
        </div>

        <span className="home-hero__chip">
          <MapPin size={15} strokeWidth={2.2} aria-hidden="true" />
          {hero.photoChip}
        </span>

        {!reduced && (
          <span className="home-hero__cue" aria-hidden="true">
            Scroll to explore
            <ChevronDown size={18} />
          </span>
        )}

        {/* Sentinel: the header stays transparent while this is on screen. */}
        <div id="hero-end" className="home-hero__sentinel" aria-hidden="true" />
      </section>

      {/* 2. The message that dominates the page: what a facilities manager gets */}
      <section className="section section--surface home-pillars">
        <div className="container">
          <SectionHeading center eyebrow={pillars.eyebrow} title={pillars.title} />
          <ul className="home-pillars__grid" role="list">
            {pillars.items.map((item, i) => (
              <Reveal as="li" className="home-pillar" key={item.title} delay={(i % 4) * 0.06} y={14}>
                <span className="home-pillar__icon">
                  <item.icon size={22} strokeWidth={2.1} aria-hidden="true" />
                </span>
                <h3 className="home-pillar__title">{item.title}</h3>
                <p className="home-pillar__text">{item.text}</p>
              </Reveal>
            ))}
          </ul>

          <Reveal className="home-pillars__punch" delay={0.1}>
            <p className="home-pillars__big">
              {pillars.punchline.replace('.', '')}
              <span className="text-gold">.</span>
            </p>
            <p className="home-pillars__script">{pillars.script}</p>
          </Reveal>

          {featured && (
            <Reveal delay={0.16}>
              <figure className="home-pillars__quote">
                <Quote size={20} strokeWidth={2} aria-hidden="true" />
                <blockquote>{featured.quote}</blockquote>
                <figcaption>
                  {featured.name} · {featured.organization}
                </figcaption>
              </figure>
            </Reveal>
          )}
        </div>
      </section>

      {/* 3. Lead-in to the machine tour */}
      <section className="section home-tour-intro" id="tour">
        <div className="container">
          <Reveal className="home-tour-intro__copy">
            <span className="eyebrow">{comboMachine.service}</span>
            <h2>Meet the {comboMachine.name}</h2>
            <p className="lede">{comboMachine.intro}</p>
          </Reveal>
        </div>
      </section>

      {/* 4. The scroll tour: the spine of the page.
          Must stay a direct child here: any wrapper with a transform (Reveal!)
          or non-visible overflow would break the sticky pin. */}
      {reduced ? <StaticShowcase /> : <MachineShowcase />}

      {/* 5. Industries teaser: the full list lives on its own page */}
      <section className="section section--sand home-industries">
        <div className="container">
          <SectionHeading center eyebrow="Industries we serve" title="A fit for every kind of location" />
          <Reveal>
            <ul className="home-industries__cloud" role="list">
              {industryTeaser.map((industry, i) => (
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
            <Link className="home-industries__link" to="/industries">
              See all {industries.items.length} location types
              <ArrowRight size={17} strokeWidth={2.2} aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </section>

    </>
  )
}
