/**
 * Capture a locally-hosted site into public/projects as WebP, the same shape the
 * Taskway pull produces: <prefix>_cover.webp + <prefix>_sN.webp.
 *
 *   node scripts/capture-local.mjs <prefix> <url> [more urls...]
 *
 * The first URL becomes the cover.
 */
import puppeteer from 'puppeteer-core'
import sharp from 'sharp'
import { mkdir } from 'node:fs/promises'
import path from 'node:path'

const [prefix, ...urls] = process.argv.slice(2)
if (!prefix || !urls.length) throw new Error('usage: capture-local.mjs <prefix> <url...>')

const OUT = path.resolve('public/projects')
await mkdir(OUT, { recursive: true })

const browser = await puppeteer.launch({
  executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  headless: 'new',
  args: ['--no-sandbox'],
})

for (const [i, url] of urls.entries()) {
  const page = await browser.newPage()
  await page.setViewport({ width: 1600, height: 1200, deviceScaleFactor: 1.25 })
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 90000 })

  // nudge lazy images into loading, then return to the top
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 700) {
      window.scrollTo(0, y)
      await new Promise((r) => setTimeout(r, 120))
    }
    window.scrollTo(0, 0)
  })
  await new Promise((r) => setTimeout(r, 1200))

  const buf = await page.screenshot({ type: 'png' })
  const name = i === 0 ? `${prefix}_cover.webp` : `${prefix}_s${i}.webp`
  const info = await sharp(buf)
    .resize({ width: i === 0 ? 2000 : 2000, withoutEnlargement: true })
    .webp({ quality: i === 0 ? 86 : 82, effort: 5 })
    .toFile(path.join(OUT, name))
  console.log(`${name.padEnd(26)} ${info.width}x${info.height}  ${Math.round(info.size / 1024)}kb  <- ${url}`)
  await page.close()
}

await browser.close()
