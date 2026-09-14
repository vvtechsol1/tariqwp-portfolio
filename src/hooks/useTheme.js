import { useCallback, useEffect, useState } from 'react'

const KEY = 'tq-theme'

const initial = () => {
  if (typeof document === 'undefined') return 'dark'
  return document.documentElement.getAttribute('data-theme') || 'dark'
}

export function useTheme() {
  const [theme, setTheme] = useState(initial)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', theme === 'light' ? '#eff6ff' : '#0a0f1a')
    try {
      localStorage.setItem(KEY, theme)
    } catch {
      /* private mode — the in-memory value still works for this visit */
    }
  }, [theme])

  const toggle = useCallback(() => setTheme((t) => (t === 'light' ? 'dark' : 'light')), [])

  return { theme, toggle }
}
