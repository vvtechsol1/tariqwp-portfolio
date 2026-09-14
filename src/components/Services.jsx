import { useEffect, useRef } from 'react'
import { revealStack } from '../lib/motion'
import { services } from '../data/profile'
import Heading from './Heading'
import * as Icons from './Icons'
import { ArrowUpRight } from './Icons'

export default function Services() {
  const grid = useRef(null)

  useEffect(
    () => revealStack(grid.current?.children, { y: 26, stagger: 0.04, trigger: grid.current }),
    [],
  )

  return (
    <section id="service" className="services">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="services-wrapper">
              <Heading eyebrow="Services" title="My Services" center />

              <div className="service-grid-container mt-50 row-mobile-margin" ref={grid}>
                {services.map((s) => {
                  // The reference ships four icon PNGs; there are sixteen services, so
                  // these are inline SVGs in the same line-art style instead.
                  const Ico = Icons[s.icon] ?? Icons.IcoWordPress
                  return (
                    <article className="service-grid-item tq-svc" key={s.n}>
                      <span className="tq-svc__num">{s.n}</span>

                      <span className="tq-svc__ico" aria-hidden="true">
                        <Ico />
                      </span>

                      <h3 className="tq-svc__title black-color">{s.title}</h3>
                      <p className="tq-svc__body secondary-black">{s.body}</p>

                      <div className="tq-svc__tags">
                        {s.tags.slice(0, 2).map((t) => (
                          <span className="tq-tag" key={t}>
                            {t}
                          </span>
                        ))}
                        {s.tags.length > 2 && (
                          <span className="tq-tag tq-tag--more">+{s.tags.length - 2}</span>
                        )}
                        <ArrowUpRight className="tq-svc__arrow" size={15} />
                      </div>
                    </article>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
