export default function Logo({ light = false }) {
  return (
    <span className="logo">
      <svg viewBox="0 0 64 64" width="38" height="38" aria-hidden="true">
        <defs>
          <linearGradient id="logoGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#0096C7" />
            <stop offset="0.55" stopColor="#00B4D8" />
            <stop offset="1" stopColor="#0C9A6C" />
          </linearGradient>
        </defs>
        <rect x="4" y="4" width="56" height="56" rx="14" fill="url(#logoGrad)" />
        <rect x="18" y="14" width="18" height="36" rx="3" fill="#fff" opacity="0.92" />
        <rect x="40" y="14" width="7" height="36" rx="2" fill="#fff" opacity="0.55" />
        <rect x="21" y="19" width="12" height="2.6" rx="1.3" fill="#0096C7" />
        <rect x="21" y="26" width="12" height="2.6" rx="1.3" fill="#00B4D8" />
        <rect x="21" y="33" width="12" height="2.6" rx="1.3" fill="#0C9A6C" />
        <rect x="21" y="42" width="12" height="4" rx="2" fill="#0B2239" opacity="0.85" />
      </svg>
      <span className={`logo__word ${light ? 'logo__word--light' : ''}`}>
        Vending Solutions
        <em>Bahamas</em>
      </span>
    </span>
  )
}
