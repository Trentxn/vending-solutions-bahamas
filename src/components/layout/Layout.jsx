import { Outlet } from 'react-router-dom'
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import CtaBanner from './CtaBanner.jsx'
import ScrollToTop from './ScrollToTop.jsx'

export default function Layout() {
  return (
    <>
      <ScrollToTop />
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Outlet />
      </main>
      <CtaBanner />
      <Footer />
    </>
  )
}
