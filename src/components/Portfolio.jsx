import { useLayoutEffect, useMemo, useRef, useState } from 'react'
import { gsap, prefersReducedMotion, revealStack } from '../lib/motion'
import { categories, projects } from '../data/projects'
import Heading from './Heading'
import { ArrowRight } from './Icons'

const PAGE = 12

export default function Portfolio({ onOpen }) {
  const [filter, setFilter] = useState('All')
  const [limit, setLimit] = useState(PAGE)
  const grid = useRef(null)
  const first = useRef(true)

  const matching = useMemo(
    () => (filter === 'All' ? projects : projects.filter((p) => p.category === filter)),
    [filter],
  )
  const shown = matching.slice(0, limit)

  useLayoutEffect(() => {
    if (!grid.current) return undefined
    if (first.current) {
      first.current = false
      return revealStack(grid.current.children, { y: 34, stagger: 0.06, trigger: grid.current })
    }
    if (prefersReducedMotion()) return undefined
    // Mixitup animated between filter states; this is the same idea in GSAP.
    const tween = gsap.fromTo(
      grid.current.children,
      { opacity: 0, y: 22, scale: 0.985 },
      { opacity: 1, y: 0, scale: 1, duration: 0.55, ease: 'power3.out', stagger: 0.04 },
    )
    return () => tween.kill()
  }, [filter, limit])

  const pick = (c) => {
    setFilter(c)
    setLimit(PAGE)
  }

  return (
    <section id="recent" className="portfolio-two">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="portfolio-wrapper">
              <Heading eyebrow="Portfolio" title="Some Recent Work" center />

              <div className="mt-50 row-mobile-margin">
                <div className="controls d-flex justify-content-center flex-wrap gap-1 gap-lg-4 mb-45">
                  {categories.map((c) => (
                    <button
                      type="button"
                      key={c}
                      className={`control filter btn border-0 secondary-black${
                        filter === c ? ' mixitup-control-active' : ''
                      }`}
                      onClick={() => pick(c)}
                      aria-pressed={filter === c}
                    >
                      {c}
                      <span className="tq-count">
                        {c === 'All'
                          ? projects.length
                          : projects.filter((p) => p.category === c).length}
                      </span>
                    </button>
                  ))}
                </div>

                <div className="portfolio-massonary-container" ref={grid}>
                  {shown.map((p) => (
                    <article className="portfolio-massonary-two-items position-relative" key={p.id}>
                      <button
                        className="tq-card-btn"
                        onClick={() => onOpen(p)}
                        aria-label={`Open case study: ${p.name}`}
                      />

                      <div className="img-overlay-full">
                        {p.cover ? (
                          <img
                            className="img-fluid"
                            src={p.cover}
                            alt={`${p.name} — ${p.tagline}`}
                            loading="lazy"
                            decoding="async"
                          />
                        ) : (
                          <div className="tq-cover-fallback">{p.name.charAt(0)}</div>
                        )}
                      </div>

                      <div className="tq-pbody">
                        <div className="tq-pmeta">
                          <span className="secondary-black">{p.category}</span>
                          <span className="tq-stage">{p.stage}</span>
                        </div>

                        <h3 className="h4 black-color fw-600 portfolio-massonary-item-link tq-clamp-1">
                          {p.name}
                        </h3>

                        <p className="p secondary-black line-height-7 tq-clamp-2">{p.tagline}</p>

                        <div className="tq-pchips">
                          {p.tech.slice(0, 3).map((t) => (
                            <span className="tq-tag" key={t}>
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </article>
                  ))}
                </div>

                {matching.length > limit && (
                  <div className="text-center mt-50">
                    <button
                      className="btn orange-btn btn_effect"
                      onClick={() => setLimit((n) => n + PAGE)}
                    >
                      <span className="d-flex align-items-center position-relative z-1">
                        <span>
                          Show {Math.min(PAGE, matching.length - limit)} more of{' '}
                          {matching.length}
                        </span>
                        <ArrowRight size={15} className="text-white ml-10" />
                      </span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
