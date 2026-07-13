export default function IconCard({ icon: Icon, title, text, tone = 'blue' }) {
  return (
    <div className={`icon-card icon-card--${tone}`}>
      <span className="icon-card__icon">
        <Icon size={22} strokeWidth={2.1} aria-hidden="true" />
      </span>
      <h3 className="icon-card__title">{title}</h3>
      {text && <p className="icon-card__text">{text}</p>}
    </div>
  )
}
