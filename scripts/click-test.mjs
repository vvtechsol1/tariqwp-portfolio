/** Click a project card on the live site and report whether the case study opens. */
import puppeteer from 'puppeteer-core'

const URL = process.argv[2]
const browser = await puppeteer.launch({
  executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  headless: 'new',
  args: ['--no-sandbox'],
})
const page = await browser.newPage()
await page.setViewport({ width: 1600, height: 950 })

const errors = []
page.on('pageerror', (e) => errors.push(`pageerror: ${e.message}`))
page.on('console', (m) => m.type() === 'error' && errors.push(`console: ${m.text()}`))

await page.goto(URL, { waitUntil: 'networkidle2', timeout: 60000 })
await new Promise((r) => setTimeout(r, 5200))
await page.evaluate(() => document.querySelector('#recent')?.scrollIntoView())
await new Promise((r) => setTimeout(r, 1800))

const cards = await page.$$('.portfolio-massonary-two-items')
console.log(`cards on page: ${cards.length}`)

// what actually sits under the pointer at the centre of the first card?
const hit = await page.evaluate(() => {
  const card = document.querySelector('.portfolio-massonary-two-items')
  if (!card) return null
  const r = card.getBoundingClientRect()
  const el = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2)
  return {
    cardBox: `${Math.round(r.width)}x${Math.round(r.height)} @ ${Math.round(r.top)}`,
    topElement: `${el?.tagName.toLowerCase()}.${el?.className?.toString?.().slice(0, 40)}`,
    hasButton: !!card.querySelector('.tq-card-btn'),
    buttonZ: card.querySelector('.tq-card-btn')
      ? getComputedStyle(card.querySelector('.tq-card-btn')).zIndex
      : null,
  }
})
console.log('hit test:', JSON.stringify(hit, null, 2))

await page.click('.portfolio-massonary-two-items .tq-card-btn').catch((e) =>
  console.log('click threw:', e.message),
)
await new Promise((r) => setTimeout(r, 1800))

const modal = await page.evaluate(() => {
  const m = document.querySelector('.tq-modal')
  if (!m) return { open: false }
  const links = Array.from(m.querySelectorAll('a[href]')).map((a) => a.href)
  return { open: true, title: m.querySelector('h3')?.textContent, links }
})
console.log('modal:', JSON.stringify(modal, null, 2))
await page.screenshot({ path: 'shots/click-test.png' })

console.log(`\nerrors (${errors.length}):`)
errors.slice(0, 8).forEach((e) => console.log('  ', e))
await browser.close()
