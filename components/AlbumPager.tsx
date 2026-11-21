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
    <Link href={albumHrefWithFrom(file.slug, fromPath)} className={`pager-link ${alignEnd ? 'sm:items-end sm:text-right' : ''}`}>
      <span className="eyebrow">{next ? 'Next album' : 'Previous album'}</span>
      <span className="pager-title">{file.title}</span>
      {dateLabel ? <span className="text-sm text-[rgb(var(--text-muted))]">{dateLabel}</span> : null}
    </Link>
  )
}

export default function AlbumPager({
  slug,
  fromPath,
  compact = false,
}: {
  slug: string
  fromPath: string
  compact?: boolean
}) {
  const { previous, next } = adjacentPhotoAlbums(slug)
  if (!previous && !next) return null

  if (compact) {
    return (
      <nav aria-label="More albums" className="flex flex-wrap gap-x-6">
        {previous ? (
          <Link href={albumHrefWithFrom(previous.slug, fromPath)} className="text-link">
            Previous album
          </Link>
        ) : null}
        {next ? (
          <Link href={albumHrefWithFrom(next.slug, fromPath)} className="text-link">
            Next album
          </Link>
        ) : null}
      </nav>
    )
  }

  const both = Boolean(previous && next)

  return (
    <nav aria-label="More albums" className={`grid gap-x-10 ${both ? 'sm:grid-cols-2' : ''}`}>
      {previous ? <AlbumLink file={previous} direction="previous" fromPath={fromPath} alignEnd={false} /> : null}
      {next ? <AlbumLink file={next} direction="next" fromPath={fromPath} alignEnd={both} /> : null}
    </nav>
  )
}
