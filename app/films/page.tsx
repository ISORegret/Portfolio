import type { Metadata } from 'next'
import FilmGallery from '../../components/FilmGallery'
import { SITE_URL } from '../data/site'
import { buildArchive } from '../../lib/files'

const title = 'Films'
const description = 'Film files by ISO.Regret, including Tilt Time and Panel Pours.'

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title: `${title} | ISO.Regret`,
    description,
    url: `${SITE_URL}/films`,
  },
  alternates: { canonical: `${SITE_URL}/films` },
}

export default function FilmsPage() {
  const films = buildArchive().filter((file) => file.kind === 'film' && file.src && file.poster)

  return (
    <main className="band band-ink">
      <div className="shell">
      <p className="eyebrow">Motion</p>
      <h1 className="display display-xl mt-3">Films</h1>
      <p className="mt-4 max-w-xl text-base leading-relaxed text-[rgb(var(--text-muted))]">Play a film.</p>
      <div className="mt-8">
        <FilmGallery
          films={films.map((film) => ({
            slug: film.slug,
            title: film.title,
            src: film.src ?? '',
            poster: film.poster ?? film.cover,
            fileNumber: film.fileNumber,
          }))}
        />
      </div>
      </div>
    </main>
  )
}
