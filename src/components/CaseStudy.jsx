import { useCallback, useEffect, useLayoutEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '../lib/motion'
import { ArrowRight, Close, Github, Globe } from './Icons'

/** Replaces the reference's Bootstrap image modal with a full case study. */
export default function CaseStudy({ project, onClose }) {
  const panel = useRef(null)
  const scrim = useRef(null)
  const closeBtn = useRef(null)
  const tl = useRef(null)

  const dismiss = useCallback(() => {
    if (prefersReducedMotion() || !tl.current) {
      onClose()
      return
    }
    tl.current.eventCallback('onReverseComplete', onClose).reverse()
  }, [onClose])

  useLayoutEffect(() => {
    if (prefersReducedMotion()) {
      gsap.set([scrim.current, panel.current], { opacity: 1, yPercent: 0 })
      return undefined
    }
    const t = gsap
      .timeline({ defaults: { ease: 'expo.out' } })
      .to(scrim.current, { opacity: 1, duration: 0.45 })
      .fromTo(panel.current, { yPercent: 100 }, { yPercent: 0, duration: 0.8 }, '-=0.35')
      .from('[data-cs]', { y: 24, opacity: 0, duration: 0.6, stagger: 0.06 }, '-=0.4')
    tl.current = t
    return () => t.kill()
  }, [])

  useEffect(() => {
    closeBtn.current?.focus()
    const onKey = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        dismiss()
        return
      }
      if (e.key !== 'Tab') return
      const f = panel.current?.querySelectorAll('a[href], button:not([disabled])')
      if (!f?.length) return
      const first = f[0]
      const last = f[f.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [dismiss])

  if (!project) return null
  const p = project

  return (
    <div className="tq-modal" role="dialog" aria-modal="true" aria-label={`${p.name} case study`}>
      <div className="tq-modal__scrim" ref={scrim} onClick={dismiss} />

      <div className="tq-modal__panel" ref={panel}>
        <div className="tq-modal__bar">
          <span className="tq-tag" style={{ margin: 0 }}>
            {p.category}
          </span>
          <h3>{p.name}</h3>
          <button
            className="tq-modal__close"
            onClick={dismiss}
            ref={closeBtn}
            aria-label="Close case study"
          >
            <Close />
          </button>
        </div>

        <div className="tq-modal__scroll">
          <div className="container-fluid p-0">
            {p.cover && (
              <div className="tq-modal__cover" data-cs>
                <img src={p.cover} alt={`${p.name} cover`} decoding="async" />
              </div>
            )}

            <div className="row">
              <div className="col-12 col-lg-8" data-cs>
                <h4 className="h4 fw-600 black-color line-height-3 mb-20">{p.tagline}</h4>
                {p.long.map((para, i) => (
                  <p className="p secondary-black fw-400 line-height-7 mt-20" key={i}>
                    {para}
                  </p>
                ))}

                <div className="mt-35 d-flex flex-wrap gap-3">
                  {p.live && (
                    <a href={p.live} target="_blank" rel="noreferrer">
                      <span className="btn orange-btn btn_effect">
                        <span className="d-flex align-items-center position-relative z-1">
                          <Globe size={15} />
                          <span className="ml-10">Visit live site</span>
                          <ArrowRight size={15} className="ml-10" />
                        </span>
                      </span>
                    </a>
                  )}
                  {p.git && (
                    <a
                      href={p.git}
                      target="_blank"
                      rel="noreferrer"
                      className="h5 fw-600 black-color d-inline-flex align-items-center"
                      style={{ gap: 9 }}
                    >
                      <Github size={17} />
                      Source on GitHub
                    </a>
                  )}
                </div>
              </div>

              <div className="col-12 col-lg-4 mt-4 mt-lg-0" data-cs>
                {p.highlights?.length > 0 && (
                  <div className="tq-aside">
                    <h5>Highlights</h5>
                    <ul className="tq-hi">
                      {p.highlights.map((h) => (
                        <li key={h}>{h}</li>
                      ))}
                    </ul>
                  </div>
                )}

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
                  <h5>Details</h5>
                  <div className="d-flex justify-content-between secondary-black">
                    <span>Year</span>
                    <span className="black-color">{p.year}</span>
                  </div>
                  <div className="d-flex justify-content-between secondary-black mt-2">
                    <span>Status</span>
                    <span style={{ color: '#2fbf71' }}>{p.stage ?? 'Live'}</span>
                  </div>
                  <div className="d-flex justify-content-between secondary-black mt-2">
                    <span>Type</span>
                    <span className="black-color">{p.category}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-50" data-cs>
              {p.shots.map((s, i) => (
                <figure className="tq-shot" key={s}>
                  <img src={s} alt={`${p.name} screen ${i + 1}`} loading="lazy" decoding="async" />
                </figure>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
