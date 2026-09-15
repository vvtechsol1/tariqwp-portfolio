import { useCallback, useEffect, useState } from 'react'

/**
 * The whole site is two routes — the one-pager and a project detail page — so
 * this is the History API directly rather than a router dependency.
 *
 * Cloudflare serves the Worker with `not_found_handling = "single-page-application"`,
 * so /work/<slug> loads index.html on a cold visit and this resolves it here.
 */
export function useRoute() {
  const [path, setPath] = useState(() => window.location.pathname)

  useEffect(() => {
    const onPop = () => setPath(window.location.pathname)
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  const go = useCallback((to) => {
    if (to === window.location.pathname) return
    window.history.pushState({}, '', to)
    setPath(to)
  }, [])

  const back = useCallback((fallback = '/') => {
    // Only step back if there is somewhere in this site to step back to;
    // a cold visit straight to a project page has no history entry of ours.
    if (window.history.state && window.history.length > 1) window.history.back()
    else {
      window.history.replaceState({}, '', fallback)
      setPath(fallback)
    }
  }, [])

  return { path, go, back }
}

/** `/work/<slug>` → slug, anything else → null. */
export const workSlug = (path) => path.match(/^\/work\/([^/?#]+)/)?.[1] ?? null
