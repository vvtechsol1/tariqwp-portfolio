/**
 * Pull every project from the live Taskway public portfolio into this site.
 *
 *   node scripts/pull-taskway.mjs "https://taskway.freedev.app/p.php?u=<token>"
 *
 * It walks the index for project cards, opens each detail page, and takes the
 * name, description, stack, live link and gallery shots straight from the page —
 * then downloads the images, converts them to WebP, and writes src/data/projects.js.
 *
 * The portfolio must be set to Public in Taskway, otherwise p.php renders
 * "This portfolio is private" and there is nothing to read.
 */
import puppeteer from 'puppeteer-core'
import sharp from 'sharp'
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'

const INDEX = process.argv[2]
if (!INDEX) throw new Error('usage: node scripts/pull-taskway.mjs <public portfolio url>')

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe'
const IMG_DIR = path.resolve('public/projects')
await mkdir(IMG_DIR, { recursive: true })

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
  args: ['--no-sandbox', '--ignore-certificate-errors'],
})

const open = async (url) => {
  const page = await browser.newPage()
  await page.setViewport({ width: 1440, height: 900 })
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 90000 })
  await new Promise((r) => setTimeout(r, 900))
  return page
}

// ---- index: collect the detail links ----
const index = await open(INDEX)
const isPrivate = await index.evaluate(() =>
  /this portfolio is private/i.test(document.body.innerText),
)
if (isPrivate) {
  await browser.close()
  throw new Error(
    'Taskway says the portfolio is private. Open Taskway → Portfolio and switch it to 🌐 Public, then re-run.',
  )
}

const links = await index.evaluate(() =>
  Array.from(document.querySelectorAll('a.pcard')).map((a) => a.href),
)
await index.close()
console.log(`found ${links.length} projects`)

// ---- detail pages ----
const slugify = (s) =>
  s
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .slice(0, 48)

const projects = []

for (const [i, href] of links.entries()) {
  const page = await open(href)

  const d = await page.evaluate(() => {
    const txt = (sel) => document.querySelector(sel)?.textContent?.trim() ?? ''
    const meta = {}
    document.querySelectorAll('.dmeta > div').forEach((el) => {
      const k = el.querySelector('i')?.textContent?.trim()
      const v = el.querySelector('b')?.textContent?.trim()
      if (k) meta[k.toLowerCase()] = v ?? ''
    })
    return {
      id: Number(new URL(location.href).searchParams.get('p')),
      name: txt('.dtitle'),
      description: txt('p.about'),
      tech: Array.from(document.querySelectorAll('.dbody .chips .chip')).map((c) =>
        c.textContent.trim(),
      ),
      status: meta.status ?? '',
      year: meta.year ?? String(new Date().getFullYear()),
      live:
        document.querySelector('.dside a[href^="http"]')?.href ??
        document.querySelector('.dmeta a[href^="http"]')?.href ??
        null,
      cover: document.querySelector('.dcover img')?.currentSrc || null,
      coverColor:
        document.querySelector('.dcover .cover-fallback')?.style.background || null,
      coverIcon: document.querySelector('.dcover .cover-fallback span')?.textContent?.trim() || null,
      shots: Array.from(document.querySelectorAll('.gal .shot img')).map(
        (img) => img.currentSrc || img.src,
      ),
    }
  })

  // ---- download + optimise images ----
  const grab = async (url, outName, width, quality) => {
    if (!url) return null
    try {
      const res = await page.goto(url, { timeout: 60000 })
      const buf = await res.buffer()
      const info = await sharp(buf)
        .resize({ width, withoutEnlargement: true })
        .webp({ quality, effort: 5 })
        .toFile(path.join(IMG_DIR, outName))
      return { name: outName, kb: Math.round(info.size / 1024) }
    } catch (e) {
      console.warn(`   ! image failed ${url}: ${e.message}`)
      return null
    }
  }

  const slug = slugify(d.name) || `project-${d.id}`
  const cover = await grab(d.cover, `tw_${d.id}_cover.webp`, 1280, 80)
  const shots = []
  for (const [n, s] of d.shots.entries()) {
    const got = await grab(s, `tw_${d.id}_s${n + 1}.webp`, 1800, 78)
    if (got) shots.push(got.name)
  }

  await page.close()

  projects.push({
    id: d.id,
    slug,
    name: d.name,
    description: d.description,
    tech: d.tech,
    status: d.status,
    year: d.year,
    live: d.live,
    cover: cover?.name ?? null,
    coverColor: d.coverColor,
    coverIcon: d.coverIcon,
    shots,
  })

  console.log(
    `${String(i + 1).padStart(2)}/${links.length}  ${d.name}  cover:${cover ? 'y' : '-'}  shots:${shots.length}  live:${d.live ? 'y' : '-'}`,
  )
}

await browser.close()
await writeFile('shots/taskway-raw.json', JSON.stringify(projects, null, 2))
console.log(`\nwrote shots/taskway-raw.json (${projects.length} projects)`)
console.log('next: node scripts/write-projects.mjs')
