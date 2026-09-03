import useTheme from '../../hooks/useTheme.js'
import LogoMark from '../brand/LogoMark.jsx'

/*
 * The brand lockup: pinwheel mark + wordmark + optional script tagline.
 *
 * SWAPPING IN THE OFFICIAL ARTWORK: drop logo.svg (or .png) into
 * src/assets/brand/. Add logo-on-dark.svg too if the wordmark is dark ink,
 * and it will be used on the dark theme and on dark bands. Nothing else
 * needs to change - the recreation below is only the fallback.
 */
const official = import.meta.glob('../../assets/brand/logo{,-on-dark}.{svg,png}', {
  eager: true,
  query: '?url',
  import: 'default',
})

const pick = (dark) => {
  const entries = Object.entries(official)
  if (!entries.length) return null
  const onDark = entries.find(([p]) => p.includes('logo-on-dark'))
  const base = entries.find(([p]) => !p.includes('logo-on-dark'))
  return (dark ? onDark || base : base || onDark)?.[1] ?? null
}

export default function Logo({ light = false, tagline = false }) {
  const { theme } = useTheme()
  const src = pick(light || theme === 'dark')

  if (src) {
    return (
      <span className="logo">
        <img className="logo__img" src={src} alt="Vending Solutions Bahamas" />
      </span>
    )
  }

  return (
    <span className="logo">
      <LogoMark size={40} />
      <span className={`logo__word ${light ? 'logo__word--light' : ''}`}>
        <span className="logo__name">
          <b>V</b>ending <b>S</b>olutions
        </span>
        <span className="logo__country">Bahamas</span>
        {tagline && <span className="logo__tagline">Power of Choice</span>}
      </span>
    </span>
  )
}
