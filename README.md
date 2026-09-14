# Tariq — Portfolio

A React port of the [credesign onePageTwo](https://credesign.vercel.app/onePage/onePageTwo/index.html)
template, filled with real project data from Taskway.

The reference's own stylesheets are used directly (`src/vendor/`), so the layout is
the original one — fixed left rail, orange-dot section headings, service icon grid,
two-column resume, masonry portfolio, contact split. The jQuery plugin layer was
replaced with React + GSAP, and a dark theme was layered on top.

## Run it

```bash
npm install
npm run dev        # http://localhost:5180
npm run build      # → dist/
npm run preview
```

`vite.config.js` sets `base: './'`, so `dist/` works from any folder — including
`http://localhost/tariq-portfolio/dist/` under XAMPP.

## What replaced what

| Reference used | This build uses |
| --- | --- |
| Bootstrap grid, `style.css`, `responsive.css` | the same files, in `src/vendor/` |
| AOS scroll reveals | GSAP ScrollTrigger (`src/lib/motion.js`) |
| `jquery.lineProgressbar` | `SkillBar` in `About.jsx` — same 10px/15px-radius look |
| MixItUp portfolio filter | React state + a GSAP re-enter, keeping `.mixitup-control-active` |
| Owl Carousel testimonials | real Upwork contract cards in `.testimonial-card` styling |
| Owl Carousel client logos | a scroll-reactive tech marquee (no client logos to show) |
| Bootstrap image modal | full case-study modal (`CaseStudy.jsx`) with focus trap + Esc |
| meanmenu mobile nav | `.tq-mobile-bar` + `.tq-drawer` in `Sidebar.jsx` |
| FontAwesome icon font | inline SVGs in `Icons.jsx` (saves ~1.5 MB) |
| — | Lenis smooth scroll, preloader, dark/light toggle |

## Theming

The reference hardcoded its colours. A build step rewrote those literals in
`src/vendor/*.css` into CSS variables, which `src/styles/app.css` defines twice —
once for light (the reference's original values) and once for `[data-theme='dark']`.
`index.html` sets the attribute before first paint, so there is no flash on reload.

Light is the default; a visitor whose OS is set to dark gets dark.

## Where the content lives

| File | Holds |
| --- | --- |
| `src/data/profile.js` | Name, role, email, links, services, skills, experience, and the real Upwork contract history |
| `src/data/projects.js` | The six case studies — copy, highlights, tech, live links, cover and screenshots |
| `src/data/testimonials.js` | Real client reviews. **Empty by default** — nothing invented ever renders |

### Add your photo

The banner and About section expect a cut-out portrait. Drop them in and they appear
automatically:

- `public/me.png` — banner (portrait crop, transparent background works best)
- `public/me-about.png` — About section

Until then `Portrait.jsx` renders a monogram panel rather than a broken image.

### Add a testimonial

```js
// src/data/testimonials.js
export const testimonials = [
  { quote: '…', author: 'Client name', role: 'CTO, Company', rating: 5, project: 'Bookora' },
]
```

They render in the Clients section above the Upwork contract cards.

### Change the name

`profile.name` / `profile.fullName` in `src/data/profile.js`, the `<title>` in
`index.html`, and the `/^Tariq/` test in `Banner.jsx` that tints the name orange.

## Images

Project screenshots come from the Taskway database
(`C:/xampp/htdocs/taskway/uploads/projects`), optimised to WebP in `public/projects`
— 12.7 MB down to 2.5 MB.

```bash
npm run images     # re-run after adding screenshots to Taskway
```

Decorative PNGs from the reference (orange dot, banner circles, service icons, send
arrow) live in `public/deco`.

## Notes

- **The contact forms have no backend** — both compose a `mailto:` with the details
  filled in. Swap `submit()` in `Contact.jsx` / `Footer.jsx` for a Formspree or
  Resend endpoint to store submissions.
- `prefers-reduced-motion` disables the preloader, split-word reveals, marquee and
  parallax; the case-study modal traps focus and closes on `Esc`.
