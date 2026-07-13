import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { AlertTriangle, CheckCircle2, Mail, MessageCircle } from 'lucide-react'
import { FORM_ENDPOINT } from '../../config.js'
import { contact, industries } from '../../content.js'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const INTERESTS = ['Snack & Beverage', 'Coffee', 'Both']

const whatsappHref = `https://wa.me/${contact.phones[0].wa}?text=${encodeURIComponent(
  contact.whatsappMessage,
)}`

export default function ContactForm() {
  const [values, setValues] = useState({
    name: '',
    business: '',
    email: '',
    phone: '',
    locationType: '',
    interest: 'Both',
    message: '',
  })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // 'idle' | 'submitting' | 'success' | 'error'
  const nameRef = useRef(null)
  const emailRef = useRef(null)

  const handleChange = (field) => (e) => {
    const { value } = e.target
    setValues((v) => ({ ...v, [field]: value }))
    if (errors[field]) setErrors((err) => ({ ...err, [field]: undefined }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const formData = new FormData(e.target)

    // Honeypot - bots fill it; humans never see it. Pretend success, send nothing.
    if (formData.get('_gotcha')) {
      setStatus('success')
      return
    }

    const nextErrors = {}
    if (!values.name.trim()) nextErrors.name = 'Please tell us your name.'
    if (!EMAIL_RE.test(values.email.trim())) nextErrors.email = 'Please enter a valid email address.'
    setErrors(nextErrors)
    if (nextErrors.name) {
      nameRef.current?.focus()
      return
    }
    if (nextErrors.email) {
      emailRef.current?.focus()
      return
    }

    setStatus('submitting')
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: formData,
      })
      setStatus(res.ok ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      {status === 'success' ? (
        <motion.div
          key="success"
          className="contact-form__success"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          <span className="contact-form__success-icon" aria-hidden="true">
            <CheckCircle2 size={24} strokeWidth={2} />
          </span>
          <h3>Request received!</h3>
          <p>We&rsquo;ll be in touch within one business day.</p>
          <a className="btn btn--whatsapp" href={whatsappHref} target="_blank" rel="noreferrer">
            <MessageCircle size={18} aria-hidden="true" />
            Faster? WhatsApp us
          </a>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          className="contact-form"
          onSubmit={handleSubmit}
          noValidate
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25, ease: 'easeIn' }}
        >
          {status === 'error' && (
            <div className="contact-form__alert" role="alert">
              <div className="contact-form__alert-head">
                <AlertTriangle size={18} aria-hidden="true" />
                <p>
                  Something didn&rsquo;t go through, but your details are safe. Try again, or reach us
                  directly:
                </p>
              </div>
              <div className="contact-form__alert-actions">
                <a
                  className="btn btn--whatsapp btn--sm"
                  href={whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                >
                  <MessageCircle size={16} aria-hidden="true" />
                  WhatsApp us
                </a>
                <a className="btn btn--outline btn--sm" href={`mailto:${contact.email}`}>
                  <Mail size={16} aria-hidden="true" />
                  Email us
                </a>
              </div>
            </div>
          )}

          <div className="contact-form__row">
            <div className="contact-form__field">
              <label className="contact-form__label" htmlFor="cf-name">
                Name{' '}
                <span className="contact-form__req" aria-hidden="true">
                  *
                </span>
              </label>
              <input
                ref={nameRef}
                id="cf-name"
                name="name"
                type="text"
                autoComplete="name"
                required
                className={`contact-form__input ${errors.name ? 'contact-form__input--error' : ''}`}
                value={values.name}
                onChange={handleChange('name')}
                aria-invalid={errors.name ? 'true' : undefined}
                aria-describedby={errors.name ? 'cf-name-error' : undefined}
              />
              {errors.name && (
                <p className="contact-form__error" id="cf-name-error" role="alert">
                  {errors.name}
                </p>
              )}
            </div>

            <div className="contact-form__field">
              <label className="contact-form__label" htmlFor="cf-business">
                Business name
              </label>
              <input
                id="cf-business"
                name="business"
                type="text"
                autoComplete="organization"
                className="contact-form__input"
                value={values.business}
                onChange={handleChange('business')}
              />
            </div>
          </div>

          <div className="contact-form__row">
            <div className="contact-form__field">
              <label className="contact-form__label" htmlFor="cf-email">
                Email{' '}
                <span className="contact-form__req" aria-hidden="true">
                  *
                </span>
              </label>
              <input
                ref={emailRef}
                id="cf-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className={`contact-form__input ${errors.email ? 'contact-form__input--error' : ''}`}
                value={values.email}
                onChange={handleChange('email')}
                aria-invalid={errors.email ? 'true' : undefined}
                aria-describedby={errors.email ? 'cf-email-error' : undefined}
              />
              {errors.email && (
                <p className="contact-form__error" id="cf-email-error" role="alert">
                  {errors.email}
                </p>
              )}
            </div>

            <div className="contact-form__field">
              <label className="contact-form__label" htmlFor="cf-phone">
                Phone
              </label>
              <input
                id="cf-phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                placeholder="(242) ..."
                className="contact-form__input"
                value={values.phone}
                onChange={handleChange('phone')}
              />
            </div>
          </div>

          <div className="contact-form__field">
            <label className="contact-form__label" htmlFor="cf-location-type">
              Location type
            </label>
            <select
              id="cf-location-type"
              name="locationType"
              className={`contact-form__select ${
                values.locationType ? '' : 'contact-form__select--placeholder'
              }`}
              value={values.locationType}
              onChange={handleChange('locationType')}
            >
              <option value="" disabled>
                Select your location type
              </option>
              {industries.items.map((item) => (
                <option key={item.title} value={item.title}>
                  {item.title}
                </option>
              ))}
            </select>
          </div>

          <fieldset className="contact-form__fieldset">
            <legend className="contact-form__label">I&rsquo;m interested in</legend>
            <div className="contact-form__chips">
              {INTERESTS.map((option) => (
                <label className="contact-form__chip" key={option}>
                  <input
                    type="radio"
                    name="interest"
                    value={option}
                    checked={values.interest === option}
                    onChange={handleChange('interest')}
                  />
                  <span className="contact-form__chip-pill">{option}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <div className="contact-form__field">
            <label className="contact-form__label" htmlFor="cf-message">
              Message
            </label>
            <textarea
              id="cf-message"
              name="message"
              rows={4}
              placeholder="Anything we should know about your location?"
              className="contact-form__textarea"
              value={values.message}
              onChange={handleChange('message')}
            />
          </div>

          <div className="visually-hidden" aria-hidden="true">
            <label htmlFor="cf-gotcha">Leave this field empty</label>
            <input id="cf-gotcha" type="text" name="_gotcha" tabIndex={-1} autoComplete="off" />
          </div>

          <button
            type="submit"
            className="btn btn--primary contact-form__submit"
            disabled={status === 'submitting'}
          >
            {status === 'submitting' ? 'Sending…' : 'Request My Free Site Survey'}
          </button>
        </motion.form>
      )}
    </AnimatePresence>
  )
}
