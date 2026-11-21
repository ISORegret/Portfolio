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
    <main className="shell py-12 md:py-16">
      <p className="eyebrow">Construction in motion</p>
      <h1 className="display mt-3 text-[clamp(3.2rem,7vw,6rem)]">Films</h1>
      <p className="mt-4 max-w-xl text-[0.82rem] leading-relaxed text-[rgb(var(--text-muted))]">
        Each film is its own file. Play opens the player.
      </p>
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
    </main>
  )
}
