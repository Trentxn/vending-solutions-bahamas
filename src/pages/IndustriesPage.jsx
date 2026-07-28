import { Link } from 'react-router-dom'
import { ArrowRight, Banknote, Check, ClipboardCheck, Headset, MapPin } from 'lucide-react'
import usePageTitle from '../hooks/usePageTitle.js'
import { industries, cta } from '../content.js'
import Reveal from '../components/ui/Reveal.jsx'
import IconCard from '../components/ui/IconCard.jsx'
import machinesOnLocation from '../assets/photos/machines-on-location.jpg'
import '../styles/industries.css'

const proofBenefits = [
  { icon: Banknote, label: 'Zero cost to your business' },
  { icon: ClipboardCheck, label: 'Fully managed, end to end' },
  { icon: Headset, label: '24-hour help desk' },
]

const fitChecks = [
  '20+ people on site',
  'Staff or visitor waiting areas',
  'Break rooms & shift work',
  'Public foot traffic',
]

export default function IndustriesPage() {
  usePageTitle('Industries We Serve')

  return (
    <>
      {/* ---------- page hero ---------- */}
      <section className="page-hero">
        <div className="container">
          <Reveal className="page-hero__inner">
            <span className="eyebrow">Industries We Serve</span>
            <h1>Wherever people work, we keep them refreshed</h1>
            <p className="lede">{industries.lede}</p>
          </Reveal>
        </div>
      </section>

      {/* ---------- industry grid ---------- */}
      <section className="section" aria-label="Industries we serve">
        <div className="container">
          <ul className="industries-grid" role="list">
            {industries.items.map((item, i) => (
              <Reveal as="li" key={item.title} delay={(i % 4) * 0.06}>
                <IconCard icon={item.icon} title={item.title} tone={i % 2 === 0 ? 'blue' : 'green'} />
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- proof band ---------- */}
      <section className="section section--surface">
        <div className="container industries-proof">
          <Reveal className="industries-proof__media">
            <figure className="industries-proof__figure">
              <div className="industries-proof__frame">
                <img
                  src={machinesOnLocation}
                  alt="Two Vending Solutions Bahamas machines, a snack and drink combo and a Barista coffee machine, installed in a hospital lobby"
                  width="2048"
                  height="1152"
                  loading="lazy"
                />
                <span className="industries-proof__badge">
                  <MapPin size={16} strokeWidth={2.2} aria-hidden="true" />
                  On location · Nassau
                </span>
              </div>
              <figcaption className="industries-proof__caption">
                A real placement: our combo and coffee machines at work in a hospital-style lobby.
              </figcaption>
            </figure>
          </Reveal>

          <Reveal className="industries-proof__body" delay={0.1}>
            <span className="eyebrow">Proven on location</span>
            <h2>Already at work across Nassau</h2>
            <p>
              Our machines are already serving staff, patients, and guests in professional
              environments across Nassau &amp; Paradise Island, placed to look right at home
              in a lobby, break room, or waiting area.
            </p>
            <ul className="industries-proof__benefits" role="list">
              {proofBenefits.map(({ icon: Icon, label }) => (
                <li key={label} className="industries-proof__benefit">
                  <span className="industries-proof__benefit-icon">
                    <Icon size={20} strokeWidth={2.1} aria-hidden="true" />
                  </span>
                  {label}
                </li>
              ))}
            </ul>
            <Link className="btn btn--primary" to={cta.button.to}>
              {cta.button.label}
              <ArrowRight size={18} strokeWidth={2.2} aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ---------- fit checklist ---------- */}
      <section className="section section--tight section--green-soft">
        <div className="container">
          <Reveal className="industries-fit__inner">
            <span className="eyebrow">Is your location ready?</span>
            <h2>A good fit if…</h2>
            <p className="industries-fit__lede">
              A few quick signs a machine will earn its spot at your location.
            </p>
            <ul className="industries-fit__pills" role="list">
              {fitChecks.map((label) => (
                <li key={label} className="industries-fit__pill">
                  <span className="industries-fit__pill-check">
                    <Check size={14} strokeWidth={3} aria-hidden="true" />
                  </span>
                  {label}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>
    </>
  )
}
