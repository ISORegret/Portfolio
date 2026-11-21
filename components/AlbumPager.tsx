import Link from 'next/link'
import { albumHrefWithFrom } from '../lib/albumBackNavigation'
import { adjacentPhotoAlbums, type ArchiveFile } from '../lib/files'
import { formatLongDate } from '../lib/format'

function AlbumLink({
  file,
  direction,
  fromPath,
  alignEnd,
}: {
  file: ArchiveFile
  direction: 'previous' | 'next'
  fromPath: string
  alignEnd: boolean
}) {
  const dateLabel = formatLongDate(file.date)
  const next = direction === 'next'

  return (
    <Link
      href={albumHrefWithFrom(file.slug, fromPath)}
      className={`flex min-h-[4.75rem] flex-col justify-center border border-[color:var(--line-strong)] px-4 py-4 hover:border-[rgb(var(--accent))] ${
        alignEnd ? 'sm:items-end sm:text-right' : ''
      }`}
    >
      <span className="text-xs uppercase tracking-[0.08em] text-[rgb(var(--text-muted))]">
        {next ? 'Next album' : 'Previous album'}
      </span>
      <span className="mt-1 text-lg leading-snug text-[rgb(var(--text))]">{file.title}</span>
      {dateLabel ? <span className="mt-1 text-sm text-[rgb(var(--text-muted))]">{dateLabel}</span> : null}
    </Link>
  )
}

export default function AlbumPager({ slug, fromPath }: { slug: string; fromPath: string }) {
  const { previous, next } = adjacentPhotoAlbums(slug)
  if (!previous && !next) return null

  const both = Boolean(previous && next)

  return (
    <nav aria-label="More albums" className={`grid gap-3 ${both ? 'sm:grid-cols-2' : ''}`}>
      {previous ? <AlbumLink file={previous} direction="previous" fromPath={fromPath} alignEnd={false} /> : null}
      {next ? <AlbumLink file={next} direction="next" fromPath={fromPath} alignEnd={both} /> : null}
    </nav>
  )
}
