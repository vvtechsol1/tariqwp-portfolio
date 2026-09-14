import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger, prefersReducedMotion } from '../lib/motion'

const STACK = [
  'React',
  'Next.js',
  'Laravel',
  'Python',
  'LangGraph',
  'WordPress',
  'WooCommerce',
  'Stripe',
  'GSAP',
  'Cloudflare',
  'MySQL',
  'FastAPI',
]

/**
 * The reference runs a client-logo carousel here. There are no client logos to
 * show, so the same strip carries the stack instead — rendered twice so the
 * -50% loop repeats seamlessly.
 */
export default function Partners() {
  const track = useRef(null)

  useEffect(() => {
    const el = track.current
    if (!el || prefersReducedMotion()) return undefined

    const tween = gsap.fromTo(
      el,
      { xPercent: 0 },
      { xPercent: -50, duration: 30, ease: 'none', repeat: -1 },
    )

    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top bottom',
      end: 'bottom top',
      onUpdate: (self) => tween.timeScale(self.direction === 1 ? 1 : -1),
    })

    return () => {
      st.kill()
      tween.kill()
    }
  }, [])

  return (
    <div id="partners" className="partners">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="partners-wrapper">
              <div className="tq-marquee" aria-hidden="true">
                <div className="tq-marquee__track" ref={track}>
                  {[...STACK, ...STACK].map((w, i) => (
                    <span className="tq-marquee__item" key={`${w}-${i}`}>
                      {w}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
