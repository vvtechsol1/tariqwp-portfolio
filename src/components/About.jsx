import { useEffect, useRef, useState } from 'react'
import { gsap, onceInView, prefersReducedMotion, revealStack } from '../lib/motion'
import { profile, skills } from '../data/profile'
import Heading from './Heading'
import Portrait from './Portrait'

const BASE = import.meta.env.BASE_URL

/** Replaces jquery.lineProgressbar with the same look, filled on scroll. */
function SkillBar({ label, level }) {
  const fill = useRef(null)
  const [pct, setPct] = useState(0)

  useEffect(() => {
    if (prefersReducedMotion()) {
      setPct(level)
      if (fill.current) fill.current.style.width = `${level}%`
      return undefined
    }
    const counter = { v: 0 }
    const tweens = []

    const stop = onceInView(fill.current, () => {
      tweens.push(
        gsap.to(fill.current, { width: `${level}%`, duration: 1.6, ease: 'expo.out' }),
        gsap.to(counter, {
          v: level,
          duration: 1.6,
          ease: 'expo.out',
          onUpdate: () => setPct(Math.round(counter.v)),
        }),
      )
    })

    return () => {
      stop()
      tweens.forEach((t) => t.kill())
    }
  }, [level])

  return (
    <div className="skill-progressbar-container">
      {/* reference puts the label and the percentage on one line, bar underneath */}
      <div className="d-flex justify-content-between align-items-baseline mb-10">
        <p className="p secondary-black fw-400 line-height-7 mb-0">{label}</p>
        <span className="tq-progress__count">{pct}%</span>
      </div>
      <div
        className="tq-progress"
        role="progressbar"
        aria-valuenow={level}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label}
      >
        <div className="tq-progress__fill" ref={fill} />
      </div>
    </div>
  )
}

export default function About() {
  const text = useRef(null)

  useEffect(
    () =>
      revealStack(text.current?.querySelectorAll('p.secondary-black'), {
        y: 22,
        trigger: text.current,
      }),
    [],
  )

  return (
    <section id="about" className="about">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="about-wrapper">
              <div className="row align-items-center about-two-container">
                <div className="about-text-col col-12 col-lg-6">
                  <div className="about-text-top" ref={text}>
                    <Heading
                      eyebrow="About Me"
                      title="WordPress, done properly — and fixed properly."
                    />
                    <p className="secondary-black line-height-7 mt-20">
                      I’m a WordPress developer with 10+ years of experience building, fixing,
                      optimising and maintaining WordPress websites — over 50 of them delivered.
                    </p>
                    <p className="secondary-black line-height-7 mt-20">
                      Most work arrives one of two ways: a new site that needs building from a
                      Figma file or from scratch, or an existing site that has broken, slowed down
                      or been hacked. I do both — and I fix the cause rather than hiding the symptom.
                    </p>
                    <p className="secondary-black line-height-7 mt-20">
                      Small fixes are welcome too. Send me the details and you’ll get an honest
                      assessment, a realistic timeline and a clear plan to get it done.
                    </p>
                  </div>

                  <div className="row-mobile-margin mt-50">
                    {skills.map((s) => (
                      <SkillBar key={s.label} label={s.label} level={s.level} />
                    ))}
                  </div>
                </div>

                <div className="about-image-col col-12 col-lg-6 text-center text-lg-end position-relative">
                  <Portrait
                    className="about-two-img position-relative z-1 img-fluid"
                    src={`${BASE}me-about.png`}
                    alt={`${profile.fullName} at work`}
                  />
                  <img
                    className="home-two-about-bg-circle content-fade-in-out"
                    src={`${BASE}deco/homeTwoAboutCircle.png`}
                    alt=""
                    aria-hidden="true"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
