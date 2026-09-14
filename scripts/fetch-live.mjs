/** Read the live Taskway public portfolio and dump its projects as JSON. */
import puppeteer from 'puppeteer-core'
import { writeFile } from 'node:fs/promises'

const URL = process.argv[2]
const browser = await puppeteer.launch({
  executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  headless: 'new',
  args: ['--no-sandbox', '--ignore-certificate-errors'],
})
const page = await browser.newPage()
const resp = await page.goto(URL, { waitUntil: 'networkidle2', timeout: 90000 })
console.log('status', resp?.status())

await new Promise((r) => setTimeout(r, 2500))

const data = await page.evaluate(() => ({
  title: document.title,
  h1: document.querySelector('h1')?.textContent?.trim(),
  imgs: Array.from(document.images).map((i) => i.currentSrc || i.src).filter(Boolean),
  links: Array.from(document.querySelectorAll('a[href]'))
    .map((a) => a.href)
    .filter((h) => !h.includes('taskway.freedev.app') || h.includes('p.php')),
  text: document.body.innerText.slice(0, 6000),
}))

await writeFile('shots/live-portfolio.json', JSON.stringify(data, null, 2))
await page.screenshot({ path: 'shots/live-portfolio.png', fullPage: true })
console.log('title:', data.title)
console.log('images:', data.imgs.length)
console.log('links:', [...new Set(data.links)].slice(0, 30).join('\n  '))
await browser.close()
