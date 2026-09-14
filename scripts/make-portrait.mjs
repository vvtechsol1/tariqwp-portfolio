/**
 * Turn the supplied office photo into the two circular portraits the layout wants.
 * The reference uses a cut-out person; a circular mask reads the same against the
 * decorative circle behind it and keeps the edges clean.
 *
 * Note: sharp always resizes before compositing, so the mask is built at the
 * final output size, not the crop size.
 */
import sharp from 'sharp'
import path from 'node:path'

const SRC = process.argv[2]
if (!SRC) throw new Error('usage: node scripts/make-portrait.mjs <source image>')

const meta = await sharp(SRC).metadata()
console.log(`source ${meta.width}x${meta.height}`)

// Square crop that keeps the subject centred with the face just above middle.
const side = Math.min(meta.width, meta.height) * 0.88
const size = Math.round(side)
const left = Math.round((meta.width - size) / 2)
const top = Math.round(Math.max(0, (meta.height - size) / 2 - size * 0.04))

const maskFor = (n) =>
  Buffer.from(
    `<svg width="${n}" height="${n}"><circle cx="${n / 2}" cy="${n / 2}" r="${n / 2}" fill="#fff"/></svg>`,
  )

for (const [name, out] of [
  ['public/me.png', 900],
  ['public/me-about.png', 820],
]) {
  const info = await sharp(SRC)
    .extract({ left, top, width: size, height: size })
    .resize(out, out)
    .composite([{ input: maskFor(out), blend: 'dest-in' }])
    .png({ compressionLevel: 9 })
    .toFile(path.resolve(name))
  console.log(`${name}  ${info.width}x${info.height}  ${(info.size / 1024).toFixed(0)}kb`)
}
