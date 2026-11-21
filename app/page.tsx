import Link from 'next/link'
import AlbumCard from '../components/AlbumCard'
import FilmGallery from '../components/FilmGallery'
import HomeHero from '../components/HomeHero'
import SpecBuilder from '../components/SpecBuilder'
import Testimonials from '../components/Testimonials'
import { siteConfig } from './data/site'
import { albumHrefWithFrom } from '../lib/albumBackNavigation'
import { buildArchive, photoFilesNewestFirst } from '../lib/files'

export default function Page() {
  const photos = photoFilesNewestFirst().slice(0, 6)
  const films = buildArchive().filter((file) => file.kind === 'film' && file.src && file.poster)

  return (
    <main>
      <HomeHero />

      <section className="pt-16 md:pt-24" aria-labelledby="photos-heading">
        <div className="shell section-head">
          <h2 id="photos-heading" className="display text-[clamp(2.6rem,5vw,4.25rem)]">
            Photos
          </h2>
          <Link href="/files" className="text-link">
            All photos
          </Link>
        </div>
        <div className="album-grid mt-8 md:mt-12">
          {photos.map((file, index) => (
            <AlbumCard
              key={file.slug}
              href={albumHrefWithFrom(file.slug, '/')}
              title={file.title}
              category={file.category}
              cover={file.cover}
              date={file.date}
              priority={index < 3}
            />
          ))}
        </div>
      </section>

      <section id="films" className="shell py-16 md:py-28" aria-labelledby="films-heading">
        <div className="section-head">
          <h2 id="films-heading" className="display text-[clamp(2.6rem,5vw,4.25rem)]">
            Films
          </h2>
          <Link href="/films" className="text-link">
            All films
          </Link>
        </div>
        <div className="mt-8 md:mt-12">
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
      </section>

      <section id="rates" className="shell pb-16 md:pb-28" aria-labelledby="rates-heading">
        <h2 id="rates-heading" className="display text-[clamp(2.6rem,5vw,4.25rem)]">
          Rates
        </h2>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-[rgb(var(--text-muted))]">
          Every project is scoped to your deliverables — these tiers are a starting point. Final quote after a quick call or form.
        </p>
        <ul className="mt-8">
          {siteConfig.packages.map((pkg) => (
            <li key={pkg.name} className="rate-row">
              <div>
                <h3 className="font-display text-3xl font-medium leading-tight">{pkg.name}</h3>
                <p className="mt-3 text-[0.95rem] text-[rgb(var(--accent))]">{pkg.price}</p>
              </div>
              <div className="text-sm leading-relaxed text-[rgb(var(--text-muted))]">
                <p>{pkg.description}</p>
                <ul className="mt-3 space-y-1">
                  {pkg.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section id="about" className="shell pb-16 md:pb-28">
        <h2 className="display text-[clamp(2.6rem,5vw,4.25rem)]">About</h2>
        <div className="mt-6 max-w-xl space-y-4 text-base leading-relaxed text-[rgb(var(--text-muted))]">
          <p>ISO.Regret is my view of the world. I’m Ryan, based in Jacksonville, drawn to good light, interesting details, and the stories happening right in front of us.</p>
          <p>Automotive is a big part of the work. There’s plenty more worth photographing.</p>
          <p>{siteConfig.colorStory}</p>
        </div>
        <div className="mt-6 flex flex-wrap gap-x-6">
          <Link href="/collections/automotive" className="text-link">
            Automotive
          </Link>
          <Link href="/collections/street" className="text-link">
            People &amp; places
          </Link>
          <Link href="/collections/real-estate" className="text-link">
            Real estate
          </Link>
          <Link href="/#rates" className="text-link">
            Rates
          </Link>
          <Link href="/blog" className="text-link">
            Journal
          </Link>
        </div>
        <a href="mailto:Brickel.Ryan@icloud.com" className="text-link">
          Brickel.Ryan@icloud.com
        </a>
      </section>

      <section id="contact" className="shell pb-20 md:pb-28">
        <span id="spec" />
        <div className="grid items-start gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <p className="eyebrow">Make something worth keeping</p>
            <h2 className="display mt-3 text-[clamp(2.6rem,5vw,4.25rem)]">Contact</h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-[rgb(var(--text-muted))]">
              A car you’re proud of. An event you’re planning. An idea you want to try. Let’s talk about it.
            </p>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-[rgb(var(--text-muted))]">
              <span className="text-[rgb(var(--text))]">What happens next. </span>
              I’ll reply within 24 hours. Galleries are typically ready 48–72 hours after the shoot.
            </p>
          </div>
          <SpecBuilder />
        </div>
      </section>

      <Testimonials />
    </main>
  )
}
