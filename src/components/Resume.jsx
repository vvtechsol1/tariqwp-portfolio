import { useEffect, useRef } from 'react'
import { revealStack } from '../lib/motion'
import { timeline } from '../data/profile'
import Heading from './Heading'

const Item = ({ t }) => (
  <>
    <div className="resume-style-two-item d-flex justify-content-between align-items-center">
      <div className="resume-style-two-heading">
        <h5 className="h5 fw-600 line-height-6 black-color mb-1">{t.title}</h5>
        <p className="p line-height-7 secondary-black">{t.org}</p>
      </div>
      <p className="fw-400 line-height-7 orange-color">{t.period}</p>
    </div>
    <hr className="divider-style-one" />
  </>
)

export default function Resume() {
  const grid = useRef(null)

  useEffect(
    () =>
      revealStack(grid.current?.querySelectorAll('.resume-style-two-item'), {
        y: 24,
        stagger: 0.07,
        trigger: grid.current,
      }),
    [],
  )

  const experience = timeline.filter((t) => t.side === 'experience')
  const stack = timeline.filter((t) => t.side === 'stack')

  return (
    <section id="resume" className="resume-two">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="resume-wrapper">
              <Heading eyebrow="Resume" title="Production Work &amp; Stack" center />

              <div className="row mt-50 row-mobile-margin" ref={grid}>
                <div className="col-12 col-lg-6 resume-content-left pl-10 pr-10">
                  {experience.map((t) => (
                    <Item t={t} key={t.title} />
                  ))}
                </div>
                <div className="col-12 col-lg-6 resume-content-right pl-10 pr-10">
                  {stack.map((t) => (
                    <Item t={t} key={t.title} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
