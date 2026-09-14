import { useState } from 'react'
import { profile } from '../data/profile'

/**
 * The reference uses a cut-out photo of the developer in the banner and the About
 * section. Drop your own at `public/me.png` / `public/me-about.png` and it appears
 * automatically; until then this renders a deliberate monogram panel rather than a
 * broken image.
 */
export default function Portrait({ src, className = '', alt }) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <div
        className={className}
        style={{
          aspectRatio: '1 / 1.12',
          width: '100%',
          maxWidth: 420,
          margin: '0 auto',
          borderRadius: '50% 50% 44% 44% / 56% 56% 44% 44%',
          background: 'var(--soft-fill)',
          border: '1px solid var(--soft-line)',
          display: 'grid',
          placeItems: 'center',
        }}
        aria-label={alt}
        role="img"
      >
        <span
          style={{
            fontFamily: 'Jost, sans-serif',
            fontSize: 'clamp(4rem, 12vw, 7rem)',
            fontWeight: 800,
            lineHeight: 1,
            color: 'var(--orange-color)',
          }}
        >
          {profile.name.charAt(0)}
        </span>
      </div>
    )
  }

  return (
    <img
      className={className}
      src={src}
      alt={alt}
      onError={() => setFailed(true)}
      decoding="async"
    />
  )
}
