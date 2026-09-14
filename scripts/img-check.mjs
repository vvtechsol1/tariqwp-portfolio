/** Compare each cover's natural aspect ratio with how it is actually rendered. */
import puppeteer from 'puppeteer-core'

const browser = await puppeteer.launch({
  executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  headless: 'new',
  args: ['--no-sandbox'],
})
const page = await browser.newPage()
await page.setViewport({ width: 1600, height: 950, deviceScaleFactor: 1 })
await page.goto('http://localhost:5190/', { waitUntil: 'networkidle2', timeout: 60000 })
await new Promise((r) => setTimeout(r, 5200))
await page.evaluate(() => document.querySelector('#recent')?.scrollIntoView())
await new Promise((r) => setTimeout(r, 2000))

const rows = await page.evaluate(() =>
  Array.from(document.querySelectorAll('.portfolio-massonary-two-items img')).map((img) => {
    const r = img.getBoundingClientRect()
    const cs = getComputedStyle(img)
    return {
      alt: img.alt.slice(0, 26),
      natural: `${img.naturalWidth}x${img.naturalHeight}`,
      rendered: `${Math.round(r.width)}x${Math.round(r.height)}`,
      naturalAR: +(img.naturalWidth / img.naturalHeight).toFixed(3),
      renderAR: +(r.width / r.height).toFixed(3),
      objectFit: cs.objectFit,
      // how many source pixels per rendered pixel (want >= 1, ideally 2 for retina)
      density: +(img.naturalWidth / r.width).toFixed(2),
    }
  }),
)

console.log('alt                          natural      rendered    fit       AR nat/render   density')
rows.forEach((r) =>
  console.log(
    `${r.alt.padEnd(28)} ${r.natural.padEnd(12)} ${r.rendered.padEnd(11)} ${r.objectFit.padEnd(9)} ${r.naturalAR} / ${r.renderAR}   ${r.density}x`,
  ),
)
await browser.close()
