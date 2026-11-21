import AlbumCard from '../../../components/AlbumCard'
import { albumHrefWithFrom } from '../../../lib/albumBackNavigation'
import { buildArchive } from '../../../lib/files'

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
    <main className="pb-16 md:pb-24">
      {!category ? (
        <h1 className="shell pt-14 font-display text-5xl">Category not found.</h1>
      ) : (
        <>
          <header className="shell pb-8 pt-14 md:pt-20">
            <p className="eyebrow">Photos</p>
            <h1 className="display mt-3 text-[clamp(2.8rem,6vw,4.75rem)]">{category}</h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-[rgb(var(--text-muted))]">Galleries in this category.</p>
          </header>

          {list.length === 0 ? (
            <p className="shell py-16 text-sm text-[rgb(var(--text-muted))]">
              {category === 'Real Estate' ? 'Real Estate projects — Coming Soon.' : 'No projects yet.'}
            </p>
          ) : (
            <div className="album-grid">
              {list.map((file) => (
                <AlbumCard
                  key={file.slug}
                  href={albumHrefWithFrom(file.slug, `/collections/${catKey}`)}
                  title={file.title}
                  category={file.category}
                  cover={file.cover}
                  date={file.date}
                  fileNumber={file.fileNumber}
                />
              ))}
            </div>
          )}
        </>
      )}
    </main>
  )
}
