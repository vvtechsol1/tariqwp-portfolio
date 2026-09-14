import { useEffect, useState } from 'react'
import { profile } from '../data/profile'
import { ArrowUp } from './Icons'

const BASE = import.meta.env.BASE_URL

export default function Footer({ onNavigate }) {
  const [email, setEmail] = useState('')
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 700)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const submit = (e) => {
    e.preventDefault()
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(
      'Consultation request',
    )}&body=${encodeURIComponent(`My email: ${email}\n\nI'd like to talk about:`)}`
  }

  return (
    <>
      <section className="footer-two">
        <div className="footer-wrapper">
          <div className="footer-two-top">
            <div className="container">
              <div className="d-flex align-items-center justify-content-center footer-two-top-contents">
                <div className="footer-contact-form">
                  <h2 className="black-color line-height-3 h2 fw-700 text-center">
                    Let’s Make Consultation With Us!
                  </h2>
                  <form className="row g-3 text-center mt-35" onSubmit={submit}>
                    <div className="col-8 col-sm-10">
                      <input
                        type="email"
                        className="form-control footer-form-input"
                        placeholder="Enter your email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        aria-label="Your email"
                      />
                    </div>
                    <div className="col-4 col-sm-2">
                      <button type="submit" className="btn footer-form-btn btn_effect" aria-label="Send">
                        <img
                          src={`${BASE}deco/send.png`}
                          className="position-relative z-1"
                          alt=""
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>

          <div className="footer-divider-wrapper">
            <div className="container">
              <div className="footer-divider" />
            </div>
          </div>

          <div className="footer-bottom">
            <div className="container">
              <div className="footer-bottom-container">
                <div className="row">
                  <div className="footerbottom-left col-12 col-sm-5 col-md-6 text-start">
                    <p className="p secondary-black line-height-7">
                      All rights reserved © {new Date().getFullYear()} {profile.fullName}
                    </p>
                  </div>
                  <div className="footerbottom-right col-12 col-sm-7 col-md-6">
                    <ul className="d-flex justify-content-sm-end list-unstyled mb-0">
                      <li className="mr-100">
                        <a
                          className="secondary-black p"
                          href={profile.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                        >
                          GitHub
                        </a>
                      </li>
                      <li>
                        <a className="secondary-black p" href={`mailto:${profile.email}`}>
                          Email
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <button
        className={`tq-to-top${showTop ? ' is-on' : ''}`}
        onClick={() => onNavigate?.('home')}
        aria-label="Back to top"
      >
        <ArrowUp />
      </button>
    </>
  )
}
