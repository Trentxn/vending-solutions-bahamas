import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages serves the site from /vending-solutions-bahamas/, so builds for
// it need that base path. Local dev and other hosts keep the root default:
//   GH_PAGES=1 npm run build
export default defineConfig({
  base: process.env.GH_PAGES ? '/vending-solutions-bahamas/' : '/',
  plugins: [react()],
})
