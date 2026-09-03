import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { LOCATION_PHOTO } from '../../brand/media.js'

/*
 * The first thing a visitor sees: a real photo of the machines on location,
 * with video taking over the moment footage exists.
 *
 * DROPPING IN VIDEO: put hero.mp4 (H.264, 1920x1080, a 10 to 15 second silent
 * loop, ideally under 8 MB since it is committed) into src/assets/video/.
 * No code change needed. Frame a machine in the centre third so the phone crop
 * still works. The photo stays as the poster and the reduced motion fallback.
 */
const found = import.meta.glob('../../assets/video/hero.*', {
  eager: true,
  query: '?url',
  import: 'default',
})

const SOURCES = Object.entries(found).map(([path, url]) => ({
  url,
  type: `video/${path.split('.').pop()}`,
}))

export default function HeroMedia({ alt }) {
  const reduced = useReducedMotion()
  const videoRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const showVideo = SOURCES.length > 0 && !reduced

  // React sets `muted` as a property, and some Chromium builds still refuse
  // autoplay unless it is set before play() is called.
  useEffect(() => {
    const el = videoRef.current
    if (!el) return
    el.muted = true
    el.play().catch(() => {
      /* autoplay blocked: the poster photo carries the hero */
    })
  }, [showVideo])

  return (
    <div className={`home-hero__media${playing ? ' home-hero__media--playing' : ''}`}>
      <img src={LOCATION_PHOTO} alt={alt} fetchpriority="high" decoding="async" />
      {showVideo && (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={LOCATION_PHOTO}
          onCanPlay={() => setPlaying(true)}
          aria-hidden="true"
        >
          {SOURCES.map((s) => (
            <source key={s.url} src={s.url} type={s.type} />
          ))}
        </video>
      )}
      <div className="home-hero__scrim" aria-hidden="true" />
    </div>
  )
}
