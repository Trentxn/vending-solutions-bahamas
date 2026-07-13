import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout.jsx'
import HomePage from './pages/HomePage.jsx'
import MachinesPage from './pages/MachinesPage.jsx'
import ServicesPage from './pages/ServicesPage.jsx'
import IndustriesPage from './pages/IndustriesPage.jsx'
import AboutPage from './pages/AboutPage.jsx'
import ContactPage from './pages/ContactPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="machines" element={<MachinesPage />} />
        <Route path="services" element={<ServicesPage />} />
        <Route path="industries" element={<IndustriesPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
