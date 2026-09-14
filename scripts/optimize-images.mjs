import sharp from 'sharp'
import { readdir, mkdir } from 'node:fs/promises'
import path from 'node:path'

const SRC = 'C:/xampp/htdocs/taskway/uploads/projects'
const OUT = path.resolve('public/projects')

await mkdir(OUT, { recursive: true })
const files = (await readdir(SRC)).filter((f) => /\.(png|jpe?g)$/i.test(f))

let before = 0
let after = 0

for (const file of files) {
  const isCover = /_cover\./i.test(file)
  const name = file.replace(/\.(png|jpe?g)$/i, '.webp')
  const img = sharp(path.join(SRC, file))
  const meta = await img.metadata()
  before += meta.size ?? 0

  const info = await img
    .resize({ width: isCover ? 1280 : 1800, withoutEnlargement: true })
    .webp({ quality: isCover ? 80 : 78, effort: 5 })
    .toFile(path.join(OUT, name))

  after += info.size
  console.log(`${file} -> ${name}  ${(info.size / 1024).toFixed(0)}kb  ${info.width}x${info.height}`)
}

console.log(`\n${files.length} images | ${(before / 1048576).toFixed(1)}MB -> ${(after / 1048576).toFixed(1)}MB`)
