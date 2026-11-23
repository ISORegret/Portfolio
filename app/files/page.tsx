import type { Metadata } from 'next'
import FileBrowser from '../../components/FileBrowser'
import { SITE_URL } from '../data/site'
import { buildArchive } from '../../lib/files'

const title = 'Photos'
const description = 'Photo galleries by ISO.Regret — automotive, street, and events. Jacksonville, FL.'

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title: `${title} | ISO.Regret`,
    description,
    url: `${SITE_URL}/files`,
  },
  alternates: { canonical: `${SITE_URL}/files` },
}

export default function FilesPage() {
  const files = buildArchive()
    .filter((file) => file.kind === 'photo')
    .map((file) => ({
      kind: file.kind,
      slug: file.slug,
      title: file.title,
      category: file.category,
      date: file.date,
      fileNumber: file.fileNumber,
      cover: file.cover,
      href: file.href,
    }))

  return (
    <main className="pb-16 md:pb-24">
      <div className="band band-charcoal">
        <div className="shell">
        <p className="eyebrow">Galleries</p>
        <h1 className="display display-xl mt-3">Photos</h1>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-[rgb(var(--text-muted))]">
          Every photo gallery. Filter by category or year, then open one.
        </p>
        </div>
      </div>
      <FileBrowser files={files} />
    </main>
  )
}
