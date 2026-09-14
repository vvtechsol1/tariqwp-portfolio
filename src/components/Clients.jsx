import { useEffect, useRef } from 'react'
import { revealStack } from '../lib/motion'
import { howIWork, profile, promises, upworkJobs } from '../data/profile'
import { testimonials } from '../data/testimonials'
import Heading from './Heading'
import { ArrowRight, Check, Star } from './Icons'

const Monogram = ({ char, muted = false }) => (
  <span
    className="bio-img d-grid"
    style={{
      width: 60,
      height: 60,
      flex: '0 0 auto',
      borderRadius: '50%',
      display: 'grid',
      placeItems: 'center',
      background: muted ? 'var(--soft-fill)' : 'var(--orange-color)',
      color: muted ? 'var(--orange-color)' : '#fff',
      fontFamily: 'Jost, sans-serif',
      fontWeight: 700,
      fontSize: 22,
      marginRight: 16,
    }}
    aria-hidden="true"
  >
    {char}
  </span>
)

/**
 * Sits in the reference's Testimonial slot, in the same card styling — but filled
 * with the real Upwork contract history rather than invented quotes. Any real
 * review added to data/testimonials.js renders alongside them.
 */
export default function Clients() {
  const grid = useRef(null)

  useEffect(
    () =>
      revealStack(grid.current?.querySelectorAll('.testimonial-card'), {
        y: 28,
        stagger: 0.1,
        trigger: grid.current,
      }),
    [],
  )

  return (
    <section id="testimonial" className="testimonial">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="testimonial-wrapper">
              <Heading eyebrow="Clients" title="Why Work With Me" center />

              <div className="row mt-50 row-mobile-margin g-3">
                {promises.map((p) => (
                  <div className="col-12 col-md-6 col-xl-4 d-flex align-items-start" key={p}>
                    <Check size={17} className="orange-color mr-10 mt-1 flex-shrink-0" />
                    <p className="p secondary-black line-height-7 mb-0">{p}</p>
                  </div>
                ))}
              </div>

              <div className="row mt-50 row-mobile-margin g-4 tq-how">
                {howIWork.map((step) => (
                  <div className="col-12 col-md-6 col-xl" key={step.n}>
                    <div className="tq-step h-100">
                      <span className="tq-step__n">{step.n}</span>
                      <h4 className="h5 fw-600 black-color line-height-6 mt-10">{step.title}</h4>
                      <p className="p secondary-black line-height-7 mb-0 mt-1">{step.body}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="testimonial-list-container row-mobile-margin mt-50">
                <div className="row g-4" ref={grid}>
                  {testimonials.map((t) => (
                    <div className="col-12 col-lg-6" key={t.author}>
                      <div className="testimonial-card h-100">
                        <div className="bio d-flex align-items-center">
                          <Monogram char={t.author.charAt(0)} />
                          <div>
                            <h3 className="h3 fw-500 line-height-3 black-color">{t.author}</h3>
                            <p className="p fw-400 line-height-7 secondary-black">{t.role}</p>
                          </div>
                        </div>
                        {t.rating && (
                          <div className="orange-color mt-20 d-flex align-items-center gap-1">
                            {Array.from({ length: Math.round(t.rating) }, (_, i) => (
                              <Star key={i} size={14} />
                            ))}
                          </div>
                        )}
                        <p className="p line-height-7 fw-400 secondary-black mt-20">“{t.quote}”</p>
                      </div>
                    </div>
                  ))}

                  {upworkJobs.map((j) => (
                    <div className="col-12 col-lg-6" key={j.title}>
                      <div className="testimonial-card h-100">
                        <div className="bio d-flex align-items-center">
                          <Monogram char="U" muted={!j.rating} />
                          <div>
                            <h3 className="h3 fw-500 line-height-3 black-color">
                              Upwork contract
                            </h3>
                            <p className="p fw-400 line-height-7 secondary-black">
                              {j.period} · {j.budget} · {j.type}
                            </p>
                          </div>
                        </div>

                        {j.rating ? (
                          <div className="orange-color mt-20 d-flex align-items-center gap-1">
                            {Array.from({ length: 5 }, (_, i) => (
                              <Star key={i} size={14} />
                            ))}
                            <span className="fw-600 ml-10">{j.rating.toFixed(1)}</span>
                          </div>
                        ) : (
                          <p className="p secondary-black mt-20 mb-0">
                            Completed — no written feedback left
                          </p>
                        )}

                        <p className="p line-height-7 fw-600 black-color mt-20">{j.title}</p>

                        <div className="mt-10">
                          {j.tags.map((t) => (
                            <span className="tq-tag" key={t}>
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-center mt-50">
                  <a href={profile.upworkUrl} target="_blank" rel="noreferrer">
                    <span className="btn orange-btn btn_effect">
                      <span className="d-flex align-items-center position-relative z-1">
                        <span>View Upwork profile</span>
                        <ArrowRight size={15} className="text-white ml-10" />
                      </span>
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
