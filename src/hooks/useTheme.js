import { useSyncExternalStore } from 'react'

const STORAGE_KEY = 'vsb-theme'
const listeners = new Set()

function readTheme() {
  if (typeof document === 'undefined') return 'dark'
  return document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark'
}

function subscribe(cb) {
  listeners.add(cb)
  return () => listeners.delete(cb)
}

export function setTheme(next) {
  const theme = next === 'light' ? 'light' : 'dark'
  document.documentElement.setAttribute('data-theme', theme)
  try {
    localStorage.setItem(STORAGE_KEY, theme)
  } catch {
    /* private mode: the theme still applies for this session */
  }
  const meta = document.querySelector('meta[name="theme-color"]')
  if (meta) meta.setAttribute('content', theme === 'dark' ? '#0B1826' : '#F8F8F8')
  listeners.forEach((cb) => cb())
}

/** Current theme ('dark' | 'light') plus a toggle. The initial value is applied
 *  pre-paint by the inline script in index.html, so this only reads it back. */
export default function useTheme() {
  const theme = useSyncExternalStore(subscribe, readTheme, () => 'dark')
  return { theme, setTheme, toggle: () => setTheme(theme === 'dark' ? 'light' : 'dark') }
}
