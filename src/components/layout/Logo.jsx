import useTheme from '../../hooks/useTheme.js'
import LogoMark from '../brand/LogoMark.jsx'
import wordmark from '../../assets/brand/wordmark.png'
import wordmarkOnDark from '../../assets/brand/wordmark-on-dark.png'
import lockup from '../../assets/brand/lockup.png'
import lockupOnDark from '../../assets/brand/lockup-on-dark.png'

/*
 * The brand lockup, built from the client's own artwork:
 *   - the pinwheel mark is vector, traced from logo.pdf (src/brand/mark.js),
 *     so it stays crisp from the 16px favicon up
 *   - the wordmark is cropped from the same artwork with the paper keyed out
 *     (scripts/extract-logo.mjs), in dark ink for light grounds and white for
 *     navy
 *
 * `tagline` picks the taller crop that includes "Power of Choice"; the header
 * uses the wordmark alone, which would otherwise make the bar too tall.
 * `light` forces the on dark artwork for always dark contexts (the footer, and
 * the header while it is transparent over the hero photo).
 */
export default function Logo({ light = false, tagline = false }) {
  const { theme } = useTheme()
  const onDark = light || theme === 'dark'
  const src = tagline ? (onDark ? lockupOnDark : lockup) : onDark ? wordmarkOnDark : wordmark

  return (
    <span className={`logo${tagline ? ' logo--tagline' : ''}`}>
      <LogoMark size={tagline ? 46 : 38} />
      <img
        className="logo__word"
        src={src}
        alt={`Vending Solutions Bahamas${tagline ? ', Power of Choice' : ''}`}
        width="818"
        height={tagline ? '429' : '307'}
      />
    </span>
  )
}
