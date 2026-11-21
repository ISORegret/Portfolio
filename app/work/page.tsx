import type { Metadata } from 'next'
import FilmGallery from '../../components/FilmGallery'
import WorkBrowser from '../../components/WorkBrowser'
import { withBrand } from '../../lib/brandedTitle'
import { SITE_URL } from '../data/site'

const title = withBrand('Work')
const description = 'Curated automotive, real estate, and street photography albums by ISO.Regret.'

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title: title.absolute,
    description,
    url: `${SITE_URL}/work`,
  },
  alternates: { canonical: `${SITE_URL}/work` },
}

export default function WorkPage() {
  return (
    <main>
      <div className="shell pb-8 pt-28">
        <header className="mb-12 max-w-2xl">
          <p className="eyebrow">Selected work</p>
          <h1 className="display mt-3 text-[clamp(3.2rem,7vw,5.5rem)]">Find your frame.</h1>
          <p className="mt-5 text-lg text-[rgb(var(--text-muted))]">
            Curated albums here. Full-resolution galleries and downloads on Pixieset.
          </p>
        </header>
        <WorkBrowser />
      </div>
      <FilmGallery index="" />
    </main>
  )
}
