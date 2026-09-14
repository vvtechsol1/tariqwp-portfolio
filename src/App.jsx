import { useCallback, useEffect, useState } from 'react'
import { ScrollTrigger } from './lib/motion'
import { useSmoothScroll } from './hooks/useSmoothScroll'
import { useTheme } from './hooks/useTheme'

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
import CaseStudy from './components/CaseStudy'

export default function App() {
  const { theme, toggle } = useTheme()
  const lenisRef = useSmoothScroll()
  const [ready, setReady] = useState(false)
  const [openProject, setOpenProject] = useState(null)

  // Anchor navigation, routed through Lenis so it uses the page's own easing.
  const navigate = useCallback(
    (id) => {
      const target = document.getElementById(id)
      if (!target) return
      // The reference plugin stops 50px short of the section; below xl the fixed
      // top bar needs more room than that.
      const offset = id === 'home' ? 0 : window.innerWidth < 1200 ? -74 : -50
      if (lenisRef.current) lenisRef.current.scrollTo(target, { offset, duration: 1.2 })
      else target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    },
    [lenisRef],
  )

  // Freeze the page behind the case-study modal.
  useEffect(() => {
    const lenis = lenisRef.current
    if (openProject) {
      lenis?.stop()
      document.body.classList.add('is-locked')
    } else {
      lenis?.start()
      document.body.classList.remove('is-locked')
    }
  }, [openProject, lenisRef])

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

      <div className="home-two-body row m-0 overflow-x-hidden">
        <Sidebar theme={theme} onToggleTheme={toggle} onNavigate={navigate} />

        <main className="home-two col-12 col-xl-10 col-2xl-11 p-0">
          <Banner ready={ready} onNavigate={navigate} />
          <About />
          <Services />
          <Resume />
          <Portfolio onOpen={setOpenProject} />
          <Clients />
          <Partners />
          <Contact />
          <Footer onNavigate={navigate} />
        </main>
      </div>

      {openProject && <CaseStudy project={openProject} onClose={() => setOpenProject(null)} />}
    </>
  )
}
