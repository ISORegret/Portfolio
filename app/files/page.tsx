import type { Metadata } from 'next'
import FileBrowser from '../../components/FileBrowser'
import { SITE_URL } from '../data/site'
import { buildArchive } from '../../lib/files'

const title = 'Files'
const description = 'Numbered photo and film files by ISO.Regret — automotive, street, and events. Jacksonville, FL.'

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
  const files = buildArchive().map((file) => ({
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
    <main className="shell py-12 md:py-16">
      <p className="eyebrow">Garage index</p>
      <h1 className="display mt-3 text-[clamp(3.2rem,7vw,6rem)]">Files</h1>
      <p className="mt-4 max-w-xl text-[0.82rem] leading-relaxed text-[rgb(var(--text-muted))]">
        Every shoot on record, numbered from the oldest. Filter by category or year, then open a file.
      </p>
      <div className="mt-8">
        <FileBrowser files={files} />
      </div>
    </main>
  )
}
