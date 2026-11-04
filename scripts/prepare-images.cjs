// Prepare website variants at build time instead of using Vercel transformations.
const fs = require('node:fs/promises');
const path = require('node:path');
const sharp = require('sharp');
const { createHash } = require('node:crypto');

async function walk(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(entries.map(entry => entry.isDirectory()
    ? walk(path.join(directory, entry.name))
    : /\.(jpe?g|png|webp)$/i.test(entry.name) ? [path.join(directory, entry.name)] : []));
  return nested.flat();
}

async function main() {
  const root = path.resolve('public');
  const files = await walk(path.join(root, 'gallery'));
  let cursor = 0;
  let sourceBytes = 0;
  let thumbnailBytes = 0;
  // Keep memory bounded on Vercel's build machines.
  await Promise.all(Array.from({ length: 3 }, async () => {
    while (cursor < files.length) {
      const file = files[cursor++];
      const source = await fs.stat(file);
      sourceBytes += source.size;
      const output = path.join(root, 'prepared', path.relative(root, file));
      await fs.mkdir(output, { recursive: true });
      // Restored build caches can be newer than freshly checked-out source files.
      // Compare content so a replaced photo always gets new thumbnails.
      const fingerprint = createHash('sha256').update(await fs.readFile(file)).digest('hex');
      const fingerprintPath = path.join(output, '.source-sha256');
      const priorFingerprint = await fs.readFile(fingerprintPath, 'utf8').catch(() => null);
      for (const width of [640, 1280, 2048]) {
        const destination = path.join(output, `${width}.webp`);
        const existing = await fs.stat(destination).catch(() => null);
        if (!existing || priorFingerprint !== fingerprint) {
          await sharp(file).rotate().resize({ width, withoutEnlargement: true })
            .toColourspace('srgb').webp({ quality: 85 }).toFile(destination);
        }
        if (width === 640) thumbnailBytes += (await fs.stat(destination)).size;
      }
      await fs.writeFile(fingerprintPath, fingerprint);
    }
  }));
  console.log(`Prepared ${files.length} photos. Sources: ${(sourceBytes / 1048576).toFixed(1)} MB; 640px thumbnails: ${(thumbnailBytes / 1048576).toFixed(1)} MB.`);
}
main().catch(error => { console.error(error); process.exitCode = 1; });
