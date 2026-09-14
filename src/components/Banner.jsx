import { useEffect, useRef } from 'react'
import { gsap, prefersReducedMotion, splitWords } from '../lib/motion'
import { profile } from '../data/profile'
import Portrait from './Portrait'
import { ArrowRight } from './Icons'

const BASE = import.meta.env.BASE_URL

export default function Banner({ ready, onNavigate }) {
  const root = useRef(null)
  const title = useRef(null)

  useEffect(() => {
    if (!ready) return undefined
    const scope = root.current
    if (!scope || prefersReducedMotion()) return undefined

    const ctx = gsap.context(() => {
      const words = splitWords(title.current)
      words.forEach((w) => {
        if (/^Tariq/.test(w.textContent)) w.style.color = 'var(--orange-color)'
      })

      gsap.set(words, { yPercent: 112 })
      gsap.set('.sub-heading', { y: 18, opacity: 0 })
      gsap.set('.home-two-banner-texts > *', { y: 22, opacity: 0 })
      gsap.set('.home-banner-img-col', { opacity: 0, scale: 0.94 })

      gsap
        .timeline({ defaults: { ease: 'expo.out' } })
        .to('.home-banner-img-col', { opacity: 1, scale: 1, duration: 1.2 })
        .to('.sub-heading', { y: 0, opacity: 1, duration: 0.7 }, '-=0.9')
        .to(words, { yPercent: 0, duration: 1.1, stagger: 0.035 }, '-=0.5')
        .to(
          '.home-two-banner-texts > *',
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.1 },
          '-=0.7',
        )
    }, scope)

    return () => ctx.revert()
  }, [ready])

  return (
    <section id="home" className="home-two-banner position-relative" ref={root}>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div>
              <div className="home-two-banner-wrapper row align-items-center">
                <div className="col-12 col-lg-5 col-xxl-6 text-center position-relative home-banner-img-col">
                  <Portrait
                    className="img-fluid position-relative z-index-10 home-banner-img"
                    src={`${BASE}me.png`}
                    alt={`${profile.fullName} — ${profile.role}`}
                  />
                  <img
                    src={`${BASE}deco/homeTwoBannerCircle.png`}
                    alt=""
                    aria-hidden="true"
                    className="home-two-banner-circle position-absolute content-fade-in-out"
                  />
                </div>

                <div className="col-12 col-lg-7 col-xxl-6 home-banner-text-col position-relative">
                  <div className="sub-heading">
                    <p className="text-uppercase secondary-black">{profile.greeting}</p>
                  </div>

                  {/* Two declared lines, so the name never leaves an orphan word
                      dangling at the end of the first line. */}
                  <h1 className="black-color h1 h1-home-2" ref={title}>
                    <span className="d-block" data-line>
                      Hi, I’m Tariq Aslam
                    </span>
                    <span className="d-block" data-line>
                      A Senior WordPress Developer
                    </span>
                  </h1>

                  <div className="mt-85 ml-95 home-two-banner-texts">
                    <p className="h5 line-height-7 mt-20 fw-400 secondary-black">
                      {profile.tagline}
                    </p>

                    <div className="tq-badges">
                      {profile.badges.map((b) => (
                        <span className="tq-badge" key={b}>
                          {b}
                        </span>
                      ))}
                    </div>
                    <a href="#recent" onClick={(e) => (e.preventDefault(), onNavigate?.('recent'))}>
                      <span className="btn home-banner-btn orange-btn mt-35 btn_effect">
                        <span className="d-flex align-items-center position-relative z-1">
                          <span>See My Work</span>
                          <ArrowRight size={16} className="text-white ml-10" />
                        </span>
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
