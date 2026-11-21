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
    <main className="shell py-12 md:py-16">
      {!category ? (
        <h1 className="display text-5xl">Category not found.</h1>
      ) : (
        <>
          <header>
            <p className="eyebrow">Photos</p>
            <h1 className="display mt-3 text-[clamp(3rem,7vw,5.5rem)]">{category}</h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-[rgb(var(--text-muted))]">Galleries in this category.</p>
          </header>

          {list.length === 0 ? (
            <p className="mt-10 border border-[color:var(--line)] bg-bg-elevated px-4 py-8 text-sm text-[rgb(var(--text-muted))]">
              {category === 'Real Estate' ? 'Real Estate projects — Coming Soon.' : 'No projects yet.'}
            </p>
          ) : (
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
