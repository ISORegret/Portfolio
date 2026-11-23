// Decode the mock stand-in images for the homepage.
// The images are stored base64-encoded in git (public/mock/*.b64) because
// the GitHub connector cannot push binary files; this runs as part of
// `prebuild` so `npm run build` and the Vercel build both produce the real
// files in public/mock/ before Next.js starts.
import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

const dir = path.resolve('public/mock')
await mkdir(dir, { recursive: true })

for (const entry of await readdir(dir)) {
  if (!entry.endsWith('.b64')) continue
  const outName = entry.slice(0, -'.b64'.length)
  const encoded = (await readFile(path.join(dir, entry), 'utf8')).replace(/\s+/g, '')
  await writeFile(path.join(dir, outName), Buffer.from(encoded, 'base64'))
}

console.log('Decoded mock images in public/mock/.')
