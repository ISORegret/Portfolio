import Link from 'next/link'
import { albumHrefWithFrom } from '../../../lib/albumBackNavigation'
import { buildArchive } from '../../../lib/files'
import { fileLabel, formatDotDate } from '../../../lib/format'

const titleMap: Record<string, 'Automotive' | 'Real Estate' | 'Street'> = {
  automotive: 'Automotive',
  'real-estate': 'Real Estate',
  street: 'Street',
}

export default function Page({ params }: { params: { category: string } }) {
  const catKey = params.category.toLowerCase()
  const category = titleMap[catKey]
  const list = category
    ? buildArchive()
        .filter((file) => file.kind === 'photo' && file.category === category)
        .sort((a, b) => (b.date ?? '').localeCompare(a.date ?? ''))
    : []

  return (
    <main className="shell py-12 md:py-16">
      {!category ? (
        <h1 className="display text-5xl">Category not found.</h1>
      ) : (
        <>
          <header>
            <p className="eyebrow">Files</p>
            <h1 className="display mt-3 text-[clamp(3rem,7vw,5.5rem)]">{category}</h1>
            <p className="mt-4 max-w-xl text-[0.82rem] leading-relaxed text-[rgb(var(--text-muted))]">
              Albums in this category — open a file for the set.
            </p>
          </header>

          {list.length === 0 ? (
            <p className="mt-10 border border-[color:var(--line)] bg-bg-elevated px-4 py-8 text-[0.82rem] text-[rgb(var(--text-muted))]">
              {category === 'Real Estate' ? 'Real Estate projects — Coming Soon.' : 'No projects yet.'}
            </p>
          ) : (
            <div className="mt-8 border-t border-[color:var(--line-strong)]">
              {list.map((file) => (
                <Link key={file.slug} href={albumHrefWithFrom(file.slug, `/collections/${catKey}`)} className="file-row">
                  <span>{fileLabel(file.fileNumber)}</span>
                  <span className="file-title">{file.title}</span>
                  <span className="file-cat">{file.category}</span>
                  <span>{formatDotDate(file.date)}</span>
                </Link>
              ))}
            </div>
          )}
        </>
      )}
    </main>
  )
}
