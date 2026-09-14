import { useEffect, useRef, useState } from 'react'
import { gsap, prefersReducedMotion } from '../lib/motion'
import { profile } from '../data/profile'

/** Counts to 100 while the page settles, then wipes upward. */
export default function Preloader({ onDone }) {
  const root = useRef(null)
  const fill = useRef(null)
  const done = useRef(onDone)
  const [pct, setPct] = useState(0)

  // Keep the callback current without letting a new inline arrow from the parent
  // restart the intro every time App re-renders.
  done.current = onDone

  useEffect(() => {
    if (prefersReducedMotion()) {
      done.current?.()
      return undefined
    }

    const counter = { v: 0 }
    const tl = gsap.timeline({ onComplete: () => done.current?.() })

    tl.to(counter, {
      v: 100,
      duration: 1.4,
      ease: 'power2.inOut',
      onUpdate: () => setPct(Math.round(counter.v)),
    })
      .to(fill.current, { width: '100%', duration: 1.4, ease: 'power2.inOut' }, 0)
      .to(root.current, { yPercent: -100, duration: 0.9, ease: 'expo.inOut', delay: 0.12 })
      .set(root.current, { display: 'none' })

    return () => tl.kill()
  }, [])

  return (
    <div className="tq-preloader" ref={root} aria-hidden="true">
      <div className="tq-preloader__inner">
        <div className="tq-preloader__name">
          {profile.name}
          <span className="orange-color">.</span>
        </div>
        <div className="tq-preloader__bar">
          <div className="tq-preloader__fill" ref={fill} />
        </div>
        <div className="tq-preloader__pct">{String(pct).padStart(3, '0')}</div>
      </div>
    </div>
  )
}
