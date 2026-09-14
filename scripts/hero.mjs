/** Capture just the hero at several widths, to judge layout and line breaks. */
import puppeteer from 'puppeteer-core'
import { mkdir } from 'node:fs/promises'
import path from 'node:path'

const OUT = path.resolve('shots/hero')
await mkdir(OUT, { recursive: true })

const browser = await puppeteer.launch({
  executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  headless: 'new',
  args: ['--no-sandbox', '--force-device-scale-factor=1'],
})

for (const w of [1920, 1600, 1440, 1280, 1100, 900, 600, 390]) {
  const page = await browser.newPage()
  await page.setViewport({ width: w, height: Math.round(w * 0.62) })
  await page.goto('http://localhost:5180/', { waitUntil: 'networkidle2', timeout: 60000 })
  await new Promise((r) => setTimeout(r, 5200))

  const info = await page.evaluate(() => {
    const h1 = document.querySelector('.h1-home-2')
    const img = document.querySelector('.home-banner-img')
    const sec = document.querySelector('.home-two-banner')
    const box = (el) => {
      if (!el) return null
      const r = el.getBoundingClientRect()
      return { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) }
    }
    return {
      h1: box(h1),
      h1FontSize: h1 ? getComputedStyle(h1).fontSize : null,
      img: box(img),
      section: box(sec),
      overflowRight: Math.round(document.documentElement.scrollWidth - window.innerWidth),
    }
  })

  await page.screenshot({ path: path.join(OUT, `${w}.png`) })
  console.log(
    `${String(w).padStart(4)}  h1 ${info.h1FontSize} ${JSON.stringify(info.h1)}  img ${JSON.stringify(info.img)}  hOverflow ${info.overflowRight}`,
  )
  await page.close()
}

await browser.close()
