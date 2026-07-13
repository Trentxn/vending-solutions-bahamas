export default function SpecCard({ title, subtitle, specs }) {
  return (
    <div className="spec-card card">
      <div className="spec-card__head">
        <h3>{title}</h3>
        {subtitle && <span className="badge">{subtitle}</span>}
      </div>
      <dl className="spec-card__grid">
        {specs.map((s) => (
          <div key={s.label} className="spec-card__row">
            <dt>{s.label}</dt>
            <dd>{s.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
