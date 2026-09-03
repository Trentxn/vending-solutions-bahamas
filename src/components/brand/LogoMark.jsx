import { markEllipses } from '../../brand/mark.js'

const ELLIPSES = markEllipses()

/** The pinwheel mark, drawn from the shared geometry in src/brand/mark.js. */
export default function LogoMark({ size = 40, className = '' }) {
  return (
    <svg
      className={`logo-mark ${className}`.trim()}
      viewBox="0 0 100 100"
      width={size}
      height={size}
      aria-hidden="true"
      focusable="false"
    >
      {ELLIPSES.map((e, i) => (
        <ellipse
          key={i}
          cx={e.cx}
          cy={e.cy}
          rx={e.rx}
          ry={e.ry}
          fill={e.fill}
          transform={e.rot ? `rotate(${e.rot} ${e.cx} ${e.cy})` : undefined}
        />
      ))}
    </svg>
  )
}
