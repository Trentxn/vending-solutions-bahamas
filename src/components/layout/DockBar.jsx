import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

/**
 * A docked CTA pill that rides along once the visitor is past the hero.
 *
 * It is rendered as a direct child of the Layout fragment on purpose: a
 * position: fixed element re-anchors itself to any ancestor carrying a
 * transform / filter / backdrop-filter, and the header and several page
 * sections do exactly that.
 */
export default function DockBar() {
  const { pathname } = useLocation()
  const [pastHero, setPastHero] = useState(false)
  const [blocked, setBlocked] = useState(false)

  // Show the dock once roughly a hero's worth of page has scrolled by.
  useEffect(() => {
    let frame = 0
    const measure = () => {
      frame = 0
      setPastHero(window.scrollY > 0.85 * window.innerHeight)
    }
    const onScroll = () => {
      if (frame) return
      frame = requestAnimationFrame(measure)
    }
    measure()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [pathname])

  // Two things must never sit under the dock: the pre-footer CTA banner (two
  // stacked calls to action read as a mistake), and - on narrow viewports only
  // - the pinned machine showcase, whose stage card fills the bottom of the
  // screen. Both are watched by one observer, re-queried per route.
  useEffect(() => {
    const banner = document.querySelector('.cta-banner')
    const showcase = document.querySelector('.showcase')
    const targets = [banner, showcase].filter(Boolean)
    if (!targets.length) {
      setBlocked(false)
      return undefined
    }

    const narrow = window.matchMedia('(max-width: 899px)')
    const onScreen = new Set()
    const sync = () =>
      setBlocked(onScreen.has(banner) || (narrow.matches && onScreen.has(showcase)))

    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) onScreen.add(entry.target)
        else onScreen.delete(entry.target)
      })
      sync()
    })
    targets.forEach((el) => io.observe(el))
    narrow.addEventListener('change', sync)

    return () => {
      io.disconnect()
      narrow.removeEventListener('change', sync)
    }
  }, [pathname])

  // The contact page is the call to action - a floating copy of it is noise.
  if (pathname === '/contact') return null

  const shown = pastHero && !blocked

  return (
    <div
      className={['dockbar', shown ? '' : 'dockbar--hidden'].filter(Boolean).join(' ')}
      role="region"
      aria-label="Get started"
    >
      <span className="dockbar__note">Free machine &middot; $0 to your business</span>
      <Link to="/contact#survey" className="btn btn--primary btn--sm">
        Free Site Survey
      </Link>
    </div>
  )
}
