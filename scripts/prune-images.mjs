/** Delete project images that src/data/projects.js no longer references. */
import { readFile, readdir, unlink, stat } from 'node:fs/promises'
import path from 'node:path'

const DIR = path.resolve('public/projects')
const used = new Set(
  [...(await readFile('src/data/projects.js', 'utf8')).matchAll(/img\('([^']+)'\)/g)].map(
    (m) => m[1],
  ),
)

let freed = 0
let removed = 0
for (const f of await readdir(DIR)) {
  if (used.has(f)) continue
  freed += (await stat(path.join(DIR, f))).size
  await unlink(path.join(DIR, f))
  removed += 1
}

console.log(`kept ${used.size}, removed ${removed} (${(freed / 1048576).toFixed(1)} MB freed)`)
