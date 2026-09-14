import { useEffect, useState } from 'react'
import { profile } from '../data/profile'
import { Github, Mail, Moon, Globe, Sun } from './Icons'

/** The reference plugin's `navStart`: a section activates 200px before its top. */
const NAV_START = 200

export const NAV = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'service', label: 'Services' },
  { id: 'resume', label: 'Resume' },
  { id: 'recent', label: 'Recent Work' },
  { id: 'testimonial', label: 'Clients' },
  { id: 'contact', label: 'Contact' },
]

/**
 * The reference's fixed left rail on xl+, and a compact top bar + full-screen
 * drawer below that (standing in for the meanmenu plugin).
 */
export default function Sidebar({ theme, onToggleTheme, onNavigate }) {
  const [step, setStep] = useState(0)
  const [open, setOpen] = useState(false)

  /**
   * The rail is a stepper. The active step follows the reference's onepageNav
   * plugin exactly: walk the sections in order and keep the last one whose top
   * has passed `NAV_START` px above the scroll position.
   *
   * `step` carries the fraction between two markers as well, which is what fills
   * the connecting line — so the rail advances continuously and each marker
   * lights up as the fill reaches it.
   */
  useEffect(() => {
    let frame = 0

    const measure = () => {
      frame = 0
      const y = window.scrollY

      // The plugin's activation line: a section counts as reached 200px early.
      const marks = NAV.map((n) => {
        const el = document.getElementById(n.id)
        if (!el) return null
        return el.getBoundingClientRect().top + y - NAV_START
      })

      let next = 0
      for (let i = 0; i < marks.length; i += 1) {
        if (marks[i] == null || y <= marks[i]) continue
        next = i
        const to = marks[i + 1]
        if (to != null && to > marks[i]) {
          next = i + Math.min(1, (y - marks[i]) / (to - marks[i]))
        }
      }

      // Pin the rail to the end once the page bottoms out, so the last step can
      // always be reached even when the final section is short.
      const docEnd = document.documentElement.scrollHeight - window.innerHeight
      if (docEnd > 0 && y >= docEnd - 2) next = NAV.length - 1

      setStep(Math.max(0, Math.min(NAV.length - 1, next)))
    }

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(measure)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    measure()

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  const activeIndex = Math.floor(step + 0.0001)
  // Markers sit at the centre of each row, so the fill spans first to last marker.
  const fillPct = NAV.length > 1 ? (step / (NAV.length - 1)) * 100 : 0

  useEffect(() => {
    document.body.classList.toggle('is-locked', open)
    return () => document.body.classList.remove('is-locked')
  }, [open])

  const go = (e, id) => {
    e.preventDefault()
    setOpen(false)
    onNavigate?.(id)
  }

  const ThemeButton = (
    <button
      className="tq-theme-toggle"
      onClick={onToggleTheme}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
    >
      <span className="tq-theme-toggle__knob">{theme === 'light' ? <Sun /> : <Moon />}</span>
    </button>
  )

  return (
    <>
      <aside className="sidebar-navigation-container col-12 col-xl-2 col-2xl-1">
        <header className="mt-55 sidebar-header d-none d-xl-block">
          <div className="position-relative">
            <div className="sidebar-header-logo">
              <a className="tq-logo" href="#home" onClick={(e) => go(e, 'home')}>
                {profile.name}
                <span className="orange-color">.</span>
              </a>
            </div>

            <div className="sidebar-navigation">
              <nav className="sidebar-nav-menu">
                <ul id="onepage-nav" className="header-menu d-flex flex-column justify-content-center">
                  {/* orange fill running down the rail's connecting line */}
                  <span className="tq-rail" style={{ '--rail': `${fillPct}%` }} aria-hidden="true" />

                  {NAV.map((n, i) => (
                    <li className="sidebar-menu-item" key={n.id}>
                      <a
                        className={`menu-link scroll${i === activeIndex ? ' active' : ''}${
                          i < activeIndex ? ' is-done' : ''
                        }`}
                        href={`#${n.id}`}
                        onClick={(e) => go(e, n.id)}
                        aria-current={i === activeIndex ? 'true' : undefined}
                      >
                        {n.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            <div className="sidebar-social-media">
              <div className="social-container d-flex align-items-center">
                <a
                  className="mr-20 secondary-black"
                  href={profile.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                >
                  <Github size={18} />
                </a>
                <a
                  className="mr-20 secondary-black"
                  href={profile.upworkUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Upwork profile"
                >
                  <Globe size={18} />
                </a>
                <a className="mr-20 secondary-black" href={`mailto:${profile.email}`} aria-label="Email">
                  <Mail size={18} />
                </a>
              </div>
              {ThemeButton}
            </div>
          </div>
        </header>
      </aside>

      {/* below xl the rail collapses into a bar + drawer */}
      <div className="tq-mobile-bar d-flex d-xl-none">
        <a className="tq-logo" href="#home" onClick={(e) => go(e, 'home')}>
          {profile.name}
          <span className="orange-color">.</span>
        </a>
        <div className="d-flex align-items-center gap-2">
          <button
            className="tq-theme-toggle"
            style={{ marginTop: 0 }}
            onClick={onToggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
          >
            <span className="tq-theme-toggle__knob">{theme === 'light' ? <Sun /> : <Moon />}</span>
          </button>
          <button
            className={`tq-burger${open ? ' is-open' : ''}`}
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      <div className={`tq-drawer${open ? ' is-open' : ''}`}>
        <nav className="d-flex flex-column">
          {NAV.map((n, i) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              onClick={(e) => go(e, n.id)}
              style={{ transitionDelay: open ? `${0.15 + i * 0.05}s` : '0s' }}
            >
              {n.label}
            </a>
          ))}
        </nav>
      </div>
    </>
  )
}
