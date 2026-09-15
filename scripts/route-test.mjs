/** Click a project, verify the URL changes and the detail page renders, then go back. */
import puppeteer from 'puppeteer-core'
const base = process.argv[2]
const browser = await puppeteer.launch({
  executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  headless: 'new', args: ['--no-sandbox'],
})
const page = await browser.newPage()
await page.setViewport({ width: 1600, height: 950 })
const errors = []
page.on('pageerror', (e) => errors.push(e.message))
page.on('console', (m) => m.type() === 'error' && errors.push(m.text()))

await page.goto(base, { waitUntil: 'networkidle2', timeout: 60000 })
await new Promise((r) => setTimeout(r, 5200))
await page.evaluate(() => document.querySelector('#recent')?.scrollIntoView())
await new Promise((r) => setTimeout(r, 1400))

const beforeY = await page.evaluate(() => Math.round(window.scrollY))
await page.click('.portfolio-massonary-two-items .tq-card-btn')
await new Promise((r) => setTimeout(r, 2200))

const detail = await page.evaluate(() => ({
  url: location.pathname,
  title: document.querySelector('.tq-page__title')?.textContent,
  docTitle: document.title,
  scrollY: Math.round(window.scrollY),
  shots: document.querySelectorAll('.tq-gal__item').length,
  liveLink: document.querySelector('.tq-page__meta a[href^="http"]')?.href ?? null,
  hasSidebar: !!document.querySelector('.sidebar-navigation-container'),
}))
console.log('after click:', JSON.stringify(detail, null, 2))
await page.screenshot({ path: 'shots/detail-page.png' })

await page.click('.tq-back')
await new Promise((r) => setTimeout(r, 2200))
const home = await page.evaluate(() => ({
  url: location.pathname,
  scrollY: Math.round(window.scrollY),
  cards: document.querySelectorAll('.portfolio-massonary-two-items').length,
}))
console.log(`back -> ${JSON.stringify(home)}  (left home at ${beforeY})`)

// cold deep link
await page.goto(`${base}work/${process.argv[3]}`, { waitUntil: 'networkidle2', timeout: 60000 })
await new Promise((r) => setTimeout(r, 5200))
console.log('cold deep link title:', await page.evaluate(() => document.querySelector('.tq-page__title')?.textContent))

console.log(`\nerrors (${errors.length}):`, errors.slice(0, 5))
await browser.close()
