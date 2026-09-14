/** Screenshot dark mode and report any element still painted with the old orange. */
import puppeteer from 'puppeteer-core'
import { mkdir } from 'node:fs/promises'

await mkdir('shots', { recursive: true })
const browser = await puppeteer.launch({
  executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  headless: 'new',
  args: ['--no-sandbox'],
})
const page = await browser.newPage()
await page.setViewport({ width: 1600, height: 950 })
await page.goto('http://localhost:5190/', { waitUntil: 'networkidle2', timeout: 60000 })

// flip to dark before the intro finishes so the whole page paints dark
await page.evaluate(() => {
  localStorage.setItem('tq-theme', 'dark')
  document.documentElement.setAttribute('data-theme', 'dark')
})
await page.reload({ waitUntil: 'networkidle2' })
await new Promise((r) => setTimeout(r, 5200))
await page.screenshot({ path: 'shots/dark-01.png' })

await page.evaluate(() => window.scrollTo(0, 1800))
await new Promise((r) => setTimeout(r, 1500))
await page.screenshot({ path: 'shots/dark-02.png' })

// Anything still rendering in the reference orange family?
const strays = await page.evaluate(() => {
  const orange = /rgba?\(\s*2[0-9]{2},\s*(1[0-9]{2}|[5-9][0-9]),\s*([0-9]|[1-9][0-9])\s*[,)]/
  const out = []
  document.querySelectorAll('*').forEach((el) => {
    const cs = getComputedStyle(el)
    const hits = ['color', 'backgroundColor', 'borderTopColor', 'fill']
      .filter((prop) => orange.test(cs[prop]))
      .map((prop) => `${prop}=${cs[prop]}`)
    if (hits.length) {
      out.push(`${el.tagName.toLowerCase()}.${el.className?.toString?.().slice(0, 40)} ${hits.join(' ')}`)
    }
  })
  return [...new Set(out)].slice(0, 15)
})

console.log(`stray orange elements: ${strays.length}`)
strays.forEach((s) => console.log('  ', s))
await browser.close()
