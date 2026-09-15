import puppeteer from 'puppeteer-core'
const browser = await puppeteer.launch({
  executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  headless: 'new', args: ['--no-sandbox'],
})
const page = await browser.newPage()
await page.setViewport({ width: 1600, height: 950 })
await page.goto(process.argv[2], { waitUntil: 'networkidle2', timeout: 60000 })
await new Promise((r) => setTimeout(r, 5200))
await page.evaluate(() => document.querySelector('#recent')?.scrollIntoView())
await new Promise((r) => setTimeout(r, 1500))
await page.click('.portfolio-massonary-two-items .tq-card-btn')

const read = () => page.evaluate(() => {
  const p = document.querySelector('.tq-modal__panel')
  if (!p) return null
  const r = p.getBoundingClientRect()
  const cs = getComputedStyle(p)
  return { top: Math.round(r.top), h: Math.round(r.height), transform: cs.transform, opacity: cs.opacity }
})

for (const ms of [400, 1000, 2000, 3500]) {
  await new Promise((r) => setTimeout(r, ms === 400 ? 400 : 600))
  console.log(`~${ms}ms:`, JSON.stringify(await read()))
}
await new Promise((r) => setTimeout(r, 1200))
console.log('final:', JSON.stringify(await read()))
await page.screenshot({ path: 'shots/modal-open.png' })
await browser.close()
