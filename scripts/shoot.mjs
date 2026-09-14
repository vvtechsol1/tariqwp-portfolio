/**
 * Screenshot the running dev server and report anything that is invisible.
 * Usage: node scripts/shoot.mjs [url] [outDir]
 */
import puppeteer from 'puppeteer-core'
import { mkdir } from 'node:fs/promises'
import path from 'node:path'

const URL = process.argv[2] || 'http://localhost:5180/'
const OUT = path.resolve(process.argv[3] || 'shots')
const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe'

await mkdir(OUT, { recursive: true })

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
  args: ['--no-sandbox', '--disable-dev-shm-usage', '--force-device-scale-factor=1'],
})

const page = await browser.newPage()
await page.setViewport({ width: 1600, height: 950 })

const errors = []
page.on('console', (m) => {
  if (m.type() === 'error') errors.push(`console: ${m.text()}`)
})
page.on('pageerror', (e) => errors.push(`pageerror: ${e.message}`))
page.on('requestfailed', (r) => errors.push(`404/failed: ${r.url()}`))

await page.goto(URL, { waitUntil: 'networkidle2', timeout: 60000 })
// let the preloader finish and reveals settle
await new Promise((r) => setTimeout(r, 5200))

await page.screenshot({ path: path.join(OUT, '01-top.png') })

// Walk the page in viewport-sized steps
const height = await page.evaluate(() => document.documentElement.scrollHeight)
const steps = Math.min(9, Math.ceil(height / 950))
for (let i = 1; i < steps; i += 1) {
  await page.evaluate((y) => window.scrollTo(0, y), i * 900)
  await new Promise((r) => setTimeout(r, 1200))
  await page.screenshot({ path: path.join(OUT, `${String(i + 1).padStart(2, '0')}-scroll.png`) })
}

// Audit: which text nodes are effectively invisible?
const hidden = await page.evaluate(() => {
  const out = []
  const els = document.querySelectorAll(
    'h1, h2, h3, h4, h5, p, a, span, li, button, figcaption, label',
  )
  els.forEach((el) => {
    const text = (el.textContent || '').trim()
    if (!text || text.length > 120) return
    const cs = getComputedStyle(el)
    const r = el.getBoundingClientRect()
    const opacity = parseFloat(cs.opacity)
    const problems = []
    if (opacity < 0.05) problems.push(`opacity=${cs.opacity}`)
    if (cs.visibility === 'hidden') problems.push('visibility:hidden')
    if (r.width === 0 || r.height === 0) problems.push(`zero box ${Math.round(r.width)}x${Math.round(r.height)}`)
    if (problems.length) {
      out.push({
        tag: el.tagName.toLowerCase(),
        cls: el.className?.toString?.().slice(0, 70) || '',
        text: text.slice(0, 60),
        why: problems.join(', '),
      })
    }
  })
  return out
})

console.log(`\n=== page errors (${errors.length}) ===`)
errors.slice(0, 20).forEach((e) => console.log(' ', e))

console.log(`\n=== invisible text elements (${hidden.length}) ===`)
hidden.slice(0, 40).forEach((h) => console.log(`  <${h.tag}.${h.cls}> "${h.text}" -> ${h.why}`))

await browser.close()
console.log(`\nshots in ${OUT}`)
