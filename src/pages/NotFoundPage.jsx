import usePageTitle from '../hooks/usePageTitle.js'

export default function NotFoundPage() {
  usePageTitle('NotFound')
  return (
    <section className="section">
      <div className="container">
        <h1>NotFound — under construction</h1>
      </div>
    </section>
  )
}
