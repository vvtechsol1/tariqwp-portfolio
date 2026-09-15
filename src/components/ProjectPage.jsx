import { useEffect, useRef } from 'react'
import { revealHeading, revealStack } from '../lib/motion'
import { projects } from '../data/projects'
import { profile } from '../data/profile'
import { ArrowRight, Github, Globe, Mail } from './Icons'

/**
 * Full case-study page at /work/<slug> — replaces the slide-up modal so a
 * project can be linked, shared and opened in its own page.
 */
export default function ProjectPage({ project: p, onBack, onOpen }) {
  const title = useRef(null)
  const body = useRef(null)
  const gallery = useRef(null)

  const index = projects.findIndex((x) => x.slug === p.slug)
  const prev = index > 0 ? projects[index - 1] : projects[projects.length - 1]
  const next = index < projects.length - 1 ? projects[index + 1] : projects[0]

  useEffect(() => {
    document.title = `${p.name} — ${profile.fullName}`
    return () => {
      document.title = `${profile.fullName} — ${profile.role}`
    }
  }, [p.name])

  useEffect(() => {
    const stops = [
      revealHeading(title.current),
      revealStack(body.current?.children, { y: 22, trigger: body.current }),
      revealStack(gallery.current?.children, { y: 30, stagger: 0.08, trigger: gallery.current }),
    ]
    return () => stops.forEach((s) => s?.())
  }, [p.slug])

  return (
    <main className="home-two col-12 p-0 tq-page">
      {/* --- top bar --- */}
      <div className="tq-page__bar">
        <div className="container d-flex align-items-center justify-content-between gap-3">
          <button className="tq-back" onClick={onBack}>
            <ArrowRight size={15} style={{ transform: 'rotate(180deg)' }} />
            <span>Back to portfolio</span>
          </button>
          <a className="tq-logo" href="/" onClick={(e) => (e.preventDefault(), onBack())}>
            {profile.name}
            <span className="orange-color">.</span>
          </a>
        </div>
      </div>

      {/* --- hero --- */}
      <section className="tq-page__hero">
        <div className="container">
          <span className="tq-tag">{p.category}</span>
          <h1 className="black-color h1 h1-home-2 tq-page__title" ref={title}>
            {p.name}
          </h1>
          <p className="h5 fw-400 line-height-7 secondary-black tq-page__lead">{p.tagline}</p>

          <div className="tq-page__meta">
            <div>
              <i>Status</i>
              <b>{p.stage ?? 'Live'}</b>
            </div>
            <div>
              <i>Year</i>
              <b>{p.year}</b>
            </div>
            <div>
              <i>Stack</i>
              <b>{p.tech.slice(0, 3).join(' · ')}</b>
            </div>
            {p.live && (
              <a className="btn orange-btn btn_effect" href={p.live} target="_blank" rel="noreferrer">
                <span className="d-flex align-items-center position-relative z-1">
                  <Globe size={15} />
                  <span className="ml-10">Visit live website</span>
                  <ArrowRight size={15} className="ml-10" />
                </span>
              </a>
            )}
          </div>
        </div>
      </section>

      {/* --- cover --- */}
      {p.cover && (
        <div className="container">
          <figure className="tq-page__cover">
            <img src={p.cover} alt={`${p.name} — cover`} decoding="async" />
          </figure>
        </div>
      )}

      {/* --- body --- */}
      <section className="portfolio-details tq-page__body">
        <div className="container">
          <div className="row">
            <div className="col-12 col-lg-8" ref={body}>
              <h2 className="h3 fw-600 black-color line-height-3">About this project</h2>
              {p.long.map((para, i) => (
                <p className="p secondary-black fw-400 line-height-7 mt-20" key={i}>
                  {para}
                </p>
              ))}
            </div>

            <aside className="col-12 col-lg-4 mt-5 mt-lg-0">
              <div className="tq-aside">
                <h5>Built with</h5>
                <div>
                  {p.tech.map((t) => (
                    <span className="tq-tag" key={t}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="tq-aside">
                <h5>Project links</h5>
                <div className="d-grid gap-2">
                  {p.live ? (
                    <a className="tq-link" href={p.live} target="_blank" rel="noreferrer">
                      <Globe size={15} />
                      <span>Live website</span>
                      <ArrowRight size={14} className="ms-auto" />
                    </a>
                  ) : (
                    <span className="secondary-black" style={{ fontSize: 13.5 }}>
                      No public link for this one.
                    </span>
                  )}
                  {p.git && (
                    <a className="tq-link" href={p.git} target="_blank" rel="noreferrer">
                      <Github size={15} />
                      <span>Source on GitHub</span>
                      <ArrowRight size={14} className="ms-auto" />
                    </a>
                  )}
                </div>
              </div>

              <div className="tq-aside">
                <h5>Start something like this</h5>
                <a className="tq-link" href={`mailto:${profile.email}`}>
                  <Mail size={15} />
                  <span>{profile.email}</span>
                </a>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* --- gallery --- */}
      {p.shots.length > 0 && (
        <section className="tq-page__gallery">
          <div className="container">
            <h2 className="h3 fw-600 black-color line-height-3">Website gallery</h2>
            <p className="p secondary-black mt-1 mb-4">
              Captured from the live site — {p.shots.length} section
              {p.shots.length === 1 ? '' : 's'}
            </p>
            <div className="tq-gal" ref={gallery}>
              {p.shots.map((s, i) => (
                <figure className={`tq-gal__item${i === 0 ? ' tq-gal__item--wide' : ''}`} key={s}>
                  <img src={s} alt={`${p.name} — section ${i + 1}`} loading="lazy" decoding="async" />
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* --- prev / next --- */}
      <nav className="tq-page__nav">
        <div className="container d-flex flex-wrap justify-content-between gap-3">
          <button className="tq-page__nav-link" onClick={() => onOpen(`/work/${prev.slug}`)}>
            <i>Previous</i>
            <b>← {prev.name}</b>
          </button>
          <button
            className="tq-page__nav-link text-end ms-auto"
            onClick={() => onOpen(`/work/${next.slug}`)}
          >
            <i>Next</i>
            <b>{next.name} →</b>
          </button>
        </div>
      </nav>
    </main>
  )
}
