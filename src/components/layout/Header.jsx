import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { nav } from '../../content.js'
import Logo from './Logo.jsx'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close the mobile panel whenever the route changes.
  useEffect(() => setOpen(false), [pathname])

  return (
    <header className={`header ${scrolled ? 'header--scrolled' : ''}`}>
      <div className="container header__inner">
        <Link to="/" className="header__brand" aria-label="Vending Solutions Bahamas — home">
          <Logo />
        </Link>

        <nav className="header__nav" aria-label="Primary">
          {nav.map((item) => (
            <NavLink key={item.to} to={item.to} className="header__link">
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="header__actions">
          <Link to="/contact#survey" className="btn btn--primary btn--sm header__cta">
            Free Site Survey
          </Link>
          <button
            type="button"
            className="header__burger"
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            className="header__mobile"
            aria-label="Mobile"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
          >
            <div className="container header__mobile-inner">
              {nav.map((item) => (
                <NavLink key={item.to} to={item.to} className="header__mobile-link">
                  {item.label}
                </NavLink>
              ))}
              <Link to="/contact#survey" className="btn btn--primary header__mobile-cta">
                Free Site Survey
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
