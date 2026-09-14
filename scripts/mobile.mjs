/** Full-page mobile capture at realistic phone viewports. */
import puppeteer from 'puppeteer-core'
import { mkdir } from 'node:fs/promises'
import path from 'node:path'

const OUT = path.resolve('shots/mobile')
await mkdir(OUT, { recursive: true })

const browser = await puppeteer.launch({
  executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  headless: 'new',
  args: ['--no-sandbox', '--force-device-scale-factor=1'],
})

for (const [w, h] of [[390, 844], [768, 1024]]) {
  const page = await browser.newPage()
  await page.setViewport({ width: w, height: h, isMobile: w < 700, hasTouch: w < 700 })
  await page.goto('http://localhost:5180/', { waitUntil: 'networkidle2', timeout: 60000 })
  await new Promise((r) => setTimeout(r, 5200))

  await page.screenshot({ path: path.join(OUT, `${w}-fold.png`) })

  const overflow = await page.evaluate(() => {
    const bad = []
    document.querySelectorAll('*').forEach((el) => {
      const r = el.getBoundingClientRect()
      if (r.width > 0 && r.right > window.innerWidth + 1) {
        bad.push(`${el.tagName.toLowerCase()}.${el.className?.toString?.().slice(0, 45)} right=${Math.round(r.right)}`)
      }
    })
    return {
      docWidth: document.documentElement.scrollWidth,
      viewport: window.innerWidth,
      bad: bad.slice(0, 12),
    }
  })

  console.log(`\n${w}x${h}: doc ${overflow.docWidth} vs viewport ${overflow.viewport}`)
  overflow.bad.forEach((b) => console.log('   overflows:', b))
  await page.close()
}

await browser.close()
