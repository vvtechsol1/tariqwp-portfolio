import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { ScrollTrigger } from './lib/motion'
import { useSmoothScroll } from './hooks/useSmoothScroll'
import { useTheme } from './hooks/useTheme'
import { useRoute, workSlug } from './hooks/useRoute'
import { projects } from './data/projects'

import Preloader from './components/Preloader'
import Sidebar from './components/Sidebar'
import Banner from './components/Banner'
import About from './components/About'
import Services from './components/Services'
import Resume from './components/Resume'
import Portfolio from './components/Portfolio'
import Clients from './components/Clients'
import Partners from './components/Partners'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ProjectPage from './components/ProjectPage'

export default function App() {
  const { theme, toggle } = useTheme()
  const lenisRef = useSmoothScroll()
  const { path, go, back } = useRoute()
  const [ready, setReady] = useState(false)

  const slug = workSlug(path)
  const project = slug ? projects.find((p) => p.slug === slug) : null
  const onProjectPage = Boolean(project)

  // Where the home page was when a project was opened, so Back returns there.
  const homeScroll = useRef(0)

  const jump = useCallback(
    (y, immediate = true) => {
      if (lenisRef.current) lenisRef.current.scrollTo(y, { immediate })
      else window.scrollTo(0, y)
    },
    [lenisRef],
  )

  const openProject = useCallback(
    (to) => {
      if (!onProjectPage) homeScroll.current = window.scrollY
      go(to)
    },
    [go, onProjectPage],
  )

  // Anchor navigation on the one-pager, routed through Lenis for the same easing.
  const navigate = useCallback(
    (id) => {
      if (onProjectPage) {
        back('/')
        return
      }
      const target = document.getElementById(id)
      if (!target) return
      // The reference plugin stops 50px short; below xl the fixed bar needs more.
      const offset = id === 'home' ? 0 : window.innerWidth < 1200 ? -74 : -50
      if (lenisRef.current) lenisRef.current.scrollTo(target, { offset, duration: 1.2 })
      else target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    },
    [lenisRef, onProjectPage, back],
  )

  /**
   * A project page always starts at the top; returning home restores the spot
   * the visitor left, so the grid does not jump back to the banner.
   *
   * The position is set three times on purpose. The two documents are different
   * heights, so the browser clamps the old scroll offset to the new page's
   * maximum the moment the route swaps — a single reset before layout settles
   * left a project page opening 1185px down. This sets it before paint, again
   * on the next frame, and once more after the new images have had a moment to
   * size themselves.
   */
  const prevPath = useRef(path)
  useLayoutEffect(() => {
    if (prevPath.current === path) return
    const leavingProject = workSlug(prevPath.current) && !slug
    const target = leavingProject ? homeScroll.current : 0
    prevPath.current = path

    const settle = () => {
      lenisRef.current?.resize()
      jump(target)
      ScrollTrigger.refresh()
    }

    window.scrollTo(0, target)
    const frame = requestAnimationFrame(settle)
    const timer = window.setTimeout(settle, 140)
    return () => {
      cancelAnimationFrame(frame)
      window.clearTimeout(timer)
    }
  }, [path, slug, jump, lenisRef])

  // Section heights change as images decode; keep the scroll triggers honest.
  useEffect(() => {
    if (!ready) return undefined
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 320)
    const onLoad = () => ScrollTrigger.refresh()
    window.addEventListener('load', onLoad)
    return () => {
      window.clearTimeout(id)
      window.removeEventListener('load', onLoad)
    }
  }, [ready])

  return (
    <>
      <Preloader onDone={() => setReady(true)} />

      {onProjectPage ? (
        <div className="home-two-body row m-0 overflow-x-hidden">
          <ProjectPage project={project} onBack={() => back('/')} onOpen={openProject} />
        </div>
      ) : (
        <div className="home-two-body row m-0 overflow-x-hidden">
          <Sidebar theme={theme} onToggleTheme={toggle} onNavigate={navigate} />

          <main className="home-two col-12 col-xl-10 col-2xl-11 p-0">
            <Banner ready={ready} onNavigate={navigate} />
            <About />
            <Services />
            <Resume />
            <Portfolio onOpen={(p) => openProject(`/work/${p.slug}`)} />
            <Clients />
            <Partners />
            <Contact />
            <Footer onNavigate={navigate} />
          </main>
        </div>
      )}
    </>
  )
}
