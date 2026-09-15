/**
 * Turn shots/taskway-raw.json into src/data/projects.js.
 *
 * Everything here comes from the Taskway portfolio — copy, stack, links and
 * images. The only thing this adds is a category, so the filter row means
 * something, and a display order that leads with the WordPress work.
 */
import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

const all = JSON.parse(await readFile('shots/taskway-raw.json', 'utf8'))

/**
 * This portfolio is WordPress-only, so anything that is not an actual WordPress
 * build is dropped. "WordPress Integration" does not count — that is a product
 * that talks to WordPress, not a site built on it.
 */
const isWordPress = (p) =>
  p.tech.some((t) => /^(WordPress|WooCommerce|Elementor|Gutenberg|Block Theme.*|Custom Theme)$/i.test(t))

const fromTaskway = all.filter(isWordPress)


/**
 * Projects that do not live in Taskway. Written in the same shape the pull
 * produces, and merged in below, so re-running the pull never drops them.
 */
const EXTRA = [
  {
    id: 'lms',
    slug: 'damp-mould-academy',
    name: 'Damp & Mould Academy',
    description:
      'Damp & Mould Academy is a WordPress course and membership site for damp and mould professionals — 5 assessed courses across 23 lessons, with 5 assessments and 4 assessors. LearnPress handles the courses and Paid Memberships Pro the subscriptions, with Elementor available for marketing pages, but the parts that decide who sees what are written by hand in a custom theme rather than assembled from plugin settings. Access control lives in one function: each course declares the minimum membership level that opens it, levels are ordered so a higher tier includes everything a lower one opens, and a course with nothing set stays open to any signed-in member — the safer default, so a new course appears to everyone instead of silently locking people out. A custom REST API adds four namespaced endpoints, each with its own permission callback, typed and sanitised arguments, and nonce checks on anything that writes. A Company Administrator role carries its own capability and staff seats attached to a company account, so an employer can enrol their team. The academy changes the rules itself through a per-course access control in the editor and an "Opens at" column in the course list — no developer needed. The front end is hand-written: a design system in plain CSS and progressive JavaScript, with no page builder in the critical path. Covered by 53 assertions across three suites — the access gate and the endpoints’ refusals, signing in over HTTP, and joining from the button through to the membership record.',
    tech: [
      'WordPress',
      'LearnPress',
      'Paid Memberships Pro',
      'Elementor',
      'Custom Theme',
      'PHP',
      'REST API',
      'MySQL',
    ],
    status: 'Live',
    year: '2026',
    live: null,
    cover: 'tw_lms_cover.webp',
    shots: ['tw_lms_s1.webp', 'tw_lms_s2.webp', 'tw_lms_s3.webp', 'tw_lms_s4.webp', 'tw_lms_s5.webp'],
  },
]

const raw = [...EXTRA, ...fromTaskway]

/** Build type — what a WordPress client actually wants to filter by. */
const CATEGORY = {
  'Damp & Mould Academy': 'LMS & Membership',
  'Modern Food': 'WooCommerce',
  'Myemb designs': 'WooCommerce',
  'ALYYO Clothing Co. — WordPress': 'Elementor',
  'Havencrest Realty': 'Custom Theme',
}

/** Taskway stores casual names; these are how the products are actually written. */
const NAME = {
  Closenine: 'CloseNine',
  Voicereachai: 'VoiceReachAI',
  'Cite Rag': 'Cite RAG',
  'Myemb designs': 'MyEmbDesigns',
  '1dollar digitizing': '1Dollar Digitizing',
  'Aplus Digitizing': 'APlusDigitizing',
  'Alyyo Clothing': 'Alyyo Clothing Co.',
}
const displayName = (n) => NAME[n] ?? n

/** Split on sentence ends, but not on abbreviations like "Co." or "Inc.". */
const ABBR = /(?:^|\s)(?:Co|Inc|Ltd|Corp|St|Mr|Mrs|Ms|Dr|vs|etc|e\.g|i\.e|No|Jr|Sr|U\.S|U\.K)\.$/i

function sentences(text) {
  const parts = String(text ?? '')
    .split(/(?<=[.!?])\s+/)
    .filter(Boolean)
  const out = []
  for (const part of parts) {
    if (out.length && ABBR.test(out[out.length - 1])) out[out.length - 1] += ` ${part}`
    else out.push(part)
  }
  return out
}

/** First sentence, cut at a clause boundary if it runs long. */
function tagline(desc, name) {
  const first = sentences(desc)[0]?.trim()
  if (!first) return name
  if (first.length <= 150) return first
  // Prefer to end on an em dash or comma rather than mid-phrase.
  const head = first.slice(0, 150)
  const cut = Math.max(head.lastIndexOf(' — '), head.lastIndexOf(', '))
  return `${(cut > 70 ? head.slice(0, cut) : head).trimEnd()}…`
}

/** Group sentences into readable paragraphs for the case study. */
function paragraphs(desc) {
  const list = sentences(desc)
  const out = []
  for (let i = 0; i < list.length; i += 3) out.push(list.slice(i, i + 3).join(' '))
  return out
}

const esc = (s) => String(s ?? '').replace(/\\/g, '\\\\').replace(/'/g, "\\'")
const arr = (items) => `[${items.map((t) => `'${esc(t)}'`).join(', ')}]`


/**
 * Display order for the WordPress profile: WordPress builds lead, then the wider
 * PHP work, then everything else. Within each band the Taskway order is kept.
 */
const PINNED = [
  'Damp & Mould Academy',
  'Modern Food',
  'ALYYO Clothing Co. — WordPress',
  'Havencrest Realty',
  'Myemb designs',
]

const BANDS = [
  (p) => p.tech.some((t) => /wordpress|woocommerce|elementor|gutenberg/i.test(t)),
  (p) => p.tech.some((t) => /^(PHP|Laravel|MySQL|Zend Framework)$/i.test(t)),
  (p) => p.tech.some((t) => /^(HTML|HTML5|CSS|CSS3|JavaScript|jQuery)$/i.test(t)),
  (p) => p.tech.some((t) => /^(React|Next\.js)$/i.test(t)),
  () => true,
]

const pinRank = (p) => {
  const i = PINNED.indexOf(p.name)
  return i === -1 ? Number.MAX_SAFE_INTEGER : i
}
const band = (p) => BANDS.findIndex((test) => test(p))

const ordered = raw
  .map((p, i) => ({ p, i }))
  .sort((a, b) => pinRank(a.p) - pinRank(b.p) || band(a.p) - band(b.p) || a.i - b.i)
  .map((x) => x.p)

const entries = []
for (const p of ordered) {
  const category = CATEGORY[p.name] ?? 'WordPress'
  const shipped = /completed/i.test(p.status)

  entries.push(`  {
    id: ${JSON.stringify(p.id)},
    slug: '${esc(p.slug)}',
    name: '${esc(displayName(p.name))}',
    category: '${esc(category)}',
    year: '${esc(p.year)}',
    stage: '${shipped ? 'Shipped' : 'Live'}',
    tagline: '${esc(tagline(p.description, displayName(p.name)))}',
    long: [
${paragraphs(p.description)
  .map((t) => `      '${esc(t)}',`)
  .join('\n')}
    ],
    tech: ${arr(p.tech)},
    live: ${p.live ? `'${esc(p.live)}'` : 'null'},
    cover: ${p.cover ? `img('${p.cover}')` : 'null'},
    shots: ${p.shots.length ? `[${p.shots.map((s) => `img('${s}')`).join(', ')}]` : '[]'},
  },`)
}

const order = ['LMS & Membership', 'WooCommerce', 'Elementor', 'Custom Theme', 'WordPress']

const file = `/**
 * Every project from the Taskway portfolio (taskway.freedev.app).
 * Generated by scripts/write-projects.mjs — re-run it after adding work in
 * Taskway rather than editing this file by hand.
 */
const img = (f) => \`\${import.meta.env.BASE_URL}projects/\${f}\`

export const projects = [
${entries.join('\n')}
]

/** Fixed order, so the filter row does not reshuffle as projects come and go. */
export const categories = [
  'All',
  ...${JSON.stringify(order)}.filter((c) => projects.some((p) => p.category === c)),
]
`

await writeFile('src/data/projects.js', file)

const counts = {}
raw.forEach((p) => {
  const c = CATEGORY[p.name] ?? 'WordPress'
  counts[c] = (counts[c] ?? 0) + 1
})
console.log(`wrote src/data/projects.js — ${raw.length} projects (${EXTRA.length} manual + ${raw.length - EXTRA.length} of ${all.length} from Taskway)`)
console.log(counts)
console.log('\norder:')
ordered.forEach((p, i) =>
  console.log(
    `${String(i + 1).padStart(2)}. ${pinRank(p) < 99 ? 'pin' : `b${band(p)}`}  ${p.name}`,
  ),
)
