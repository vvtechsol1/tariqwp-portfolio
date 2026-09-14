import { useEffect, useRef, useState } from 'react'
import { revealStack } from '../lib/motion'
import { profile } from '../data/profile'
import Heading from './Heading'
import { Github, Mail } from './Icons'

const BUDGETS = ['Under $500', '$500 – $2k', '$2k – $5k', '$5k +']

export default function Contact() {
  const info = useRef(null)
  const [f, setF] = useState({ email: '', name: '', budget: BUDGETS[1], message: '' })

  useEffect(
    () =>
      revealStack(info.current?.querySelectorAll('.d-flex.align-items-center'), {
        y: 20,
        trigger: info.current,
      }),
    [],
  )

  const set = (k) => (e) => setF((v) => ({ ...v, [k]: e.target.value }))

  // No backend — this composes a filled-in email rather than pretending to submit.
  const submit = (e) => {
    e.preventDefault()
    const body = [
      `Name: ${f.name}`,
      `Email: ${f.email}`,
      `Budget: ${f.budget}`,
      '',
      'Project:',
      f.message,
    ].join('\n')
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(
      `New project enquiry — ${f.name || 'Website'}`,
    )}&body=${encodeURIComponent(body)}`
  }

  return (
    <section id="contact" className="home-contact">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="home-contact-wrapper">
              <div className="home-contact-info-container row align-items-center">
                <div className="col-12 col-md-6 home-two-contact-info-col">
                  <Heading eyebrow="Contact Me" title="Need help? Get in touch now!" />

                  <div className="row row-mobile-margin gy-3 gy-sm-0 mt-50" ref={info}>
                    <div className="col-12 d-flex align-items-center">
                      <div className="mr-10">
                        <div className="light-orange-bg-icon">
                          <Mail size={20} className="orange-color" />
                        </div>
                      </div>
                      <div className="about-years-experience">
                        <p className="fw-400 secondary-black p">Email</p>
                        <h4 className="fw-500 black-color h4">
                          <a href={`mailto:${profile.email}`}>{profile.email}</a>
                        </h4>
                      </div>
                    </div>

                    <div className="col-12 d-flex align-items-center row-mobile-margin mt-35">
                      <div className="mr-10">
                        <div className="light-orange-bg-icon">
                          <Github size={20} className="orange-color" />
                        </div>
                      </div>
                      <div className="about-years-experience">
                        <p className="fw-400 secondary-black p">GitHub</p>
                        <h4 className="fw-500 black-color h4">
                          <a href={profile.githubUrl} target="_blank" rel="noreferrer">
                            vvtechsol1
                          </a>
                        </h4>
                      </div>
                    </div>

                    <div className="col-12 row-mobile-margin mt-35">
                      <p className="p secondary-black line-height-7 mb-0">
                        <span className="tq-live-dot" />
                        {profile.availability} · {profile.location}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="col-12 col-md-6 row-mobile-margin">
                  <form className="row g-4" onSubmit={submit}>
                    <div className="col-12 col-sm-6">
                      <input
                        type="text"
                        className="form-control home-four-contact-input"
                        placeholder="Your name"
                        required
                        value={f.name}
                        onChange={set('name')}
                        aria-label="Your name"
                      />
                    </div>
                    <div className="col-12 col-sm-6">
                      <input
                        type="email"
                        className="form-control home-four-contact-input"
                        placeholder="Email"
                        required
                        value={f.email}
                        onChange={set('email')}
                        aria-label="Email"
                      />
                    </div>
                    <div className="col-12">
                      <select
                        className="form-control form-select home-four-contact-input"
                        value={f.budget}
                        onChange={set('budget')}
                        aria-label="Budget range"
                      >
                        {BUDGETS.map((b) => (
                          <option key={b} value={b}>
                            {b}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-12">
                      <textarea
                        className="form-control home-four-contact-input home-four-textarea"
                        placeholder="What are you building?"
                        required
                        value={f.message}
                        onChange={set('message')}
                        aria-label="What are you building?"
                      />
                    </div>
                    <div className="col-12">
                      <button type="submit" className="btn orange-btn btn_effect">
                        <span className="position-relative z-1">Send Me Message</span>
                      </button>
                      <p className="p secondary-black mt-20 mb-0" style={{ fontSize: 13 }}>
                        Opens your email app with the details filled in — nothing is stored here.
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
