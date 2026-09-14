/** Frame the services grid on its own, plus a hover state. */
import puppeteer from 'puppeteer-core'

const browser = await puppeteer.launch({
  executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  headless: 'new',
  args: ['--no-sandbox'],
})
const page = await browser.newPage()
await page.setViewport({ width: 1600, height: 1100 })
await page.goto('http://localhost:5190/', { waitUntil: 'networkidle2', timeout: 60000 })
await new Promise((r) => setTimeout(r, 5200))

await page.evaluate(() => document.querySelector('#service')?.scrollIntoView())
await new Promise((r) => setTimeout(r, 2200))

const box = await page.evaluate(() => {
  const el = document.querySelector('.service-grid-container')
  const r = el.getBoundingClientRect()
  return { h: Math.round(r.height), card: Math.round(el.children[0].getBoundingClientRect().height) }
})
console.log(`grid height ${box.h}px   card height ${box.card}px`)

await page.screenshot({ path: 'shots/services.png' })
await page.hover('.service-grid-item')
await new Promise((r) => setTimeout(r, 900))
await page.screenshot({ path: 'shots/services-hover.png' })
await browser.close()
