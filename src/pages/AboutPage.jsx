import { CalendarCheck, ClipboardCheck, Headset, MapPin, Quote, ShieldCheck } from 'lucide-react'
import usePageTitle from '../hooks/usePageTitle.js'
import { about, coffeeMachine, comboMachine, site, testimonials } from '../content.js'
import Reveal from '../components/ui/Reveal.jsx'
import SectionHeading from '../components/ui/SectionHeading.jsx'
import IconCard from '../components/ui/IconCard.jsx'
import machinesOnLocationPhoto from '../assets/photos/machines-on-location.jpg'
import comboMachinePhoto from '../assets/photos/combo-machine.jpg'
import coffeeMachinePhoto from '../assets/photos/coffee-machine.jpg'
import '../styles/about.css'

const facts = [
  { icon: CalendarCheck, value: `Est. ${site.established}`, label: 'Bahamian-owned from day one' },
  { icon: MapPin, value: site.serviceArea, label: 'Our home service area' },
  { icon: ClipboardCheck, value: 'Fully managed service', label: 'Stocking, cleaning & cash handling' },
  { icon: Headset, value: '24-hour help desk', label: 'Support whenever it matters' },
]

const galleryItems = [
  {
    photo: machinesOnLocationPhoto,
    alt: `A ${comboMachine.name} combo vending machine and a ${coffeeMachine.name} machine installed side by side in a hospital lobby`,
    caption: 'On location — snacks, cold drinks & fresh coffee, side by side',
    wide: true,
  },
  {
    photo: comboMachinePhoto,
    alt: `The ${comboMachine.name} combo vending machine, stocked with cold drinks and snacks`,
    caption: `${comboMachine.name} · ${comboMachine.service}`,
  },
  {
    photo: coffeeMachinePhoto,
    alt: `The ${coffeeMachine.name} vending machine, which brews hot drinks from fresh-ground beans`,
    caption: `${coffeeMachine.name} · ${coffeeMachine.service}`,
  },
]

export default function AboutPage() {
  usePageTitle('About Us')

  return (
    <>
      {/* ---------- page hero ---------- */}
      <section className="page-hero">
        <div className="container">
          <Reveal className="page-hero__inner">
            <span className="eyebrow">About Us</span>
            <h1>
              Bahamian-owned. <span className="text-gradient">Service-obsessed.</span>
            </h1>
            <p className="lede">{about.story[0]}</p>
          </Reveal>
        </div>
      </section>

      {/* ---------- story + quick facts ---------- */}
      <section className="section about-story">
        <div className="container about-story__grid">
          <div className="about-story__copy">
            <SectionHeading eyebrow="Our story" title="Serving Nassau since 2012" />
            {about.story.map((paragraph, i) => (
              <Reveal key={paragraph.slice(0, 32)} as="p" delay={i * 0.06}>
                {paragraph}
              </Reveal>
            ))}
          </div>
          <div className="about-story__facts">
            {facts.map((fact, i) => (
              <Reveal key={fact.value} delay={0.08 + i * 0.06}>
                <div className="about-fact">
                  <span className="about-fact__icon">
                    <fact.icon size={20} strokeWidth={2} aria-hidden="true" />
                  </span>
                  <span className="about-fact__text">
                    <span className="about-fact__value">{fact.value}</span>
                    <span className="about-fact__label">{fact.label}</span>
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- mission ---------- */}
      <section className="section section--navy about-mission">
        <div className="container">
          <Reveal className="about-mission__inner">
            <span className="eyebrow">What drives us</span>
            <figure className="about-mission__figure">
              <span className="about-mission__mark" aria-hidden="true">
                <Quote size={22} strokeWidth={2} />
              </span>
              <blockquote className="about-mission__quote">{about.mission}</blockquote>
              <figcaption className="about-mission__caption">Our mission</figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      {/* ---------- vision & standards ---------- */}
      <section className="section about-vision">
        <div className="container about-vision__grid">
          <SectionHeading
            eyebrow="Our vision"
            title="The most sought-after vending partner in The Bahamas"
            lede={about.vision}
          />
          <Reveal delay={0.1}>
            <div className="card about-standards">
              <span className="about-standards__icon">
                <ShieldCheck size={24} strokeWidth={2} aria-hidden="true" />
              </span>
              <h3>Built to international standards</h3>
              <p>{about.standards}</p>
              <div className="about-standards__badges">
                <span className="badge">ISO-9001</span>
                <span className="badge badge--green">ISO-14001</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- goals ---------- */}
      <section className="section section--surface about-goals">
        <div className="container">
          <SectionHeading center eyebrow="Our goals" title="What we’re building toward" />
          <div className="about-goals__grid">
            {about.goals.map((goal, i) => (
              <Reveal key={goal.text} delay={i * 0.06}>
                <IconCard icon={goal.icon} title={goal.text} tone="green" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- gallery ---------- */}
      <section className="section about-gallery">
        <div className="container">
          <SectionHeading center eyebrow="Gallery" title="Our machines, on location" />
          <div className="about-gallery__grid">
            {galleryItems.map((item, i) => (
              <Reveal
                key={item.caption}
                delay={i * 0.08}
                className={`about-gallery__item${item.wide ? ' about-gallery__item--wide' : ''}`}
              >
                <figure className="about-gallery__figure">
                  <div className="about-gallery__frame">
                    <img src={item.photo} alt={item.alt} loading="lazy" />
                  </div>
                  <figcaption className="about-gallery__caption">{item.caption}</figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- testimonials ----------
          Hidden until real client quotes exist: set testimonials.enabled = true
          in content.js and add items ({ quote, name, role, organization }).
          Never invent quotes here. */}
      {testimonials.enabled && testimonials.items.length > 0 && (
        <section className="section section--surface about-testimonials">
          <div className="container">
            <SectionHeading center eyebrow="Testimonials" title="What our host locations say" />
            <div className="about-testimonials__grid">
              {testimonials.items.map((item, i) => (
                <Reveal key={item.name ?? i} delay={i * 0.06}>
                  <figure className="card about-testimonial">
                    <blockquote>“{item.quote}”</blockquote>
                    <figcaption>
                      <span className="about-testimonial__name">{item.name}</span>
                      <span className="about-testimonial__meta">
                        {[item.role, item.organization].filter(Boolean).join(' · ')}
                      </span>
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
