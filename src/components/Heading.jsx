import { useEffect, useRef } from 'react'
import { revealHeading } from '../lib/motion'

const BASE = import.meta.env.BASE_URL

/** The reference's two heading forms: left-aligned, or centred with `-middle`. */
export default function Heading({ eyebrow, title, center = false, uppercase = center }) {
  const h = useRef(null)

  useEffect(() => revealHeading(h.current), [])

  return (
    <div className={center ? 'section-heading-middle' : 'section-heading'}>
      <div className={`sub-heading d-flex align-items-center${center ? ' mx-auto' : ''}`}>
        <img src={`${BASE}deco/orangeDot.png`} alt="" aria-hidden="true" />
        <p>{eyebrow}</p>
      </div>
      <h2
        className={`black-color line-height-3 h2${uppercase ? ' text-uppercase' : ''}${
          center ? ' text-center' : ''
        }`}
        ref={h}
      >
        {title}
      </h2>
    </div>
  )
}
