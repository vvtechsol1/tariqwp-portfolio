import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * Fire `cb` once, when `el` first comes near the viewport.
 *
 * Reveals used to hang off ScrollTrigger, which needs correct start/end offsets —
 * and when those are computed against a layout that later shifts (web fonts
 * swapping in, images decoding), a trigger can end up positioned past the end of
 * the document and never fire, leaving its text stuck at opacity 0. An
 * IntersectionObserver just answers "is it on screen yet", so a reveal cannot get
 * stranded. ScrollTrigger is still used for scrubbed effects, where it is the
 * right tool.
 */
export function onceInView(el, cb, rootMargin = '0px 0px -12% 0px') {
  if (!el) return () => {}

  if (typeof IntersectionObserver === 'undefined') {
    cb()
    return () => {}
  }

  const io = new IntersectionObserver(
    (entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        io.disconnect()
        cb()
      }
    },
    { rootMargin, threshold: 0 },
  )
  io.observe(el)
  return () => io.disconnect()
}

/**
 * Split an element's text into word spans, each inside an overflow-hidden mask
 * so it can slide up from nothing. Idempotent — a second call returns the spans
 * the first one made, so React's StrictMode double-invoke re-animates the same
 * nodes instead of animating an empty list.
 */
export function splitWords(el) {
  if (!el) return []
  if (el.dataset.split === 'done') {
    return Array.from(el.querySelectorAll('span[data-word]'))
  }

  // If the heading declares its own lines, split each one in place so the author's
  // line breaks survive — otherwise the whole element is one line.
  const declared = el.querySelectorAll('[data-line]')
  const lines = declared.length ? Array.from(declared) : [el]
  const spans = []

  lines.forEach((line) => {
    const words = line.textContent.trim().split(/\s+/)
    line.textContent = ''

    words.forEach((w) => {
      const mask = document.createElement('span')
      mask.style.display = 'inline-block'
      mask.style.overflow = 'hidden'
      mask.style.verticalAlign = 'top'
      // A mask is only as tall as the line box, so descenders in g/j/p/q/y would
      // be clipped off. Pad the mask and pull the extra height back with a
      // negative margin: room to draw, no change to layout.
      mask.style.paddingBottom = '0.22em'
      mask.style.marginBottom = '-0.22em'

      const inner = document.createElement('span')
      inner.dataset.word = ''
      inner.style.display = 'inline-block'
      inner.style.willChange = 'transform'
      inner.textContent = w

      mask.appendChild(inner)
      line.appendChild(mask)
      line.appendChild(document.createTextNode(' '))
      spans.push(inner)
    })
  })

  el.dataset.split = 'done'
  return spans
}

/** Slide a heading's words up into place the first time it scrolls into view. */
export function revealHeading(el, opts = {}) {
  if (!el) return () => {}

  if (prefersReducedMotion()) {
    gsap.set(el, { opacity: 1 })
    return () => {}
  }

  const words = splitWords(el)
  if (!words.length) return () => {}

  gsap.set(words, { yPercent: 110 })

  let tween
  const stop = onceInView(el, () => {
    tween = gsap.to(words, {
      yPercent: 0,
      duration: 1,
      ease: 'expo.out',
      stagger: 0.045,
      ...opts.tween,
    })
  })

  return () => {
    stop()
    tween?.kill()
  }
}

/** Fade and lift a set of elements in sequence, once they scroll into view. */
export function revealStack(elements, opts = {}) {
  const els = Array.from(elements ?? []).filter(Boolean)
  if (!els.length) return () => {}

  if (prefersReducedMotion()) {
    gsap.set(els, { opacity: 1, y: 0 })
    return () => {}
  }

  gsap.set(els, { opacity: 0, y: opts.y ?? 30 })

  let tween
  const stop = onceInView(opts.trigger ?? els[0], () => {
    tween = gsap.to(els, {
      opacity: 1,
      y: 0,
      duration: opts.duration ?? 0.9,
      ease: 'power3.out',
      stagger: opts.stagger ?? 0.09,
    })
  })

  return () => {
    stop()
    tween?.kill()
  }
}

export { gsap, ScrollTrigger }
