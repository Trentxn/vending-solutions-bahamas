import { Quote, ShieldCheck } from 'lucide-react'
import usePageTitle from '../hooks/usePageTitle.js'
import { about, site, testimonials } from '../content.js'
import Reveal from '../components/ui/Reveal.jsx'
import SectionHeading from '../components/ui/SectionHeading.jsx'
import IconCard from '../components/ui/IconCard.jsx'
import '../styles/about.css'

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
              Bahamian owned. <span className="text-gradient">Obsessed with service.</span>
            </h1>
            <p className="lede">{about.lede}</p>
          </Reveal>
        </div>
      </section>

      {/* ---------- story + quick facts ---------- */}
      <section className="section about-story">
        <div className="container about-story__grid">
          <div className="about-story__copy">
            <SectionHeading eyebrow="Our story" title={`Serving ${site.serviceArea} since 2012`} />
            {about.story.map((paragraph, i) => (
              <Reveal key={paragraph.slice(0, 32)} as="p" delay={i * 0.06}>
                {paragraph}
              </Reveal>
            ))}
          </div>
          <div className="about-story__facts">
            {about.facts.map((fact, i) => (
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
            title="The most sought after vending partner in The Bahamas"
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
                <span className="badge">ISO 9001</span>
                <span className="badge badge--gold">ISO 14001</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- goals ---------- */}
      <section className="section section--surface about-values">
        <div className="container">
          <SectionHeading center eyebrow="Our values" title="What we hold ourselves to" />
          <div className="about-values__grid">
            {about.values.map((value, i) => (
              <Reveal key={value.title} delay={i * 0.06}>
                <IconCard icon={value.icon} title={value.title} text={value.text} tone={i % 2 ? 'gold' : 'blue'} />
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
