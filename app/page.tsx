import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import AlbumCard from '../components/AlbumCard'
import FilmGallery from '../components/FilmGallery'
import SpecBuilder from '../components/SpecBuilder'
import Testimonials from '../components/Testimonials'
import { siteConfig } from './data/site'
import { albumHrefWithFrom } from '../lib/albumBackNavigation'
import { bookShootHref } from '../lib/nav'
import { buildArchive, photoFilesNewestFirst } from '../lib/files'

export default function Page() {
  const photos = photoFilesNewestFirst()
  const featured = photos[0]
  const morePhotos = photos.slice(1, 7)
  const films = buildArchive().filter((file) => file.kind === 'film' && file.src && file.poster)

  return (
    <main>
      <section className="border-b border-[color:var(--line-strong)]">
        <div className="shell grid items-center gap-8 py-10 md:grid-cols-2 md:py-16">
          <div>
            <h1 className="display text-[clamp(3.4rem,8vw,6.5rem)]">{siteConfig.hero.headline}</h1>
            <p className="mt-5 max-w-md whitespace-pre-line text-base leading-relaxed text-[rgb(var(--text-muted))]">
              {siteConfig.hero.subline}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/files" className="btn btn-line w-full sm:w-auto">
                Photos
              </Link>
              <Link href={bookShootHref} className="btn btn-yellow w-full sm:w-auto">
                Book a shoot
              </Link>
            </div>
          </div>
          {featured ? (
            <AlbumCard
              href={albumHrefWithFrom(featured.slug, '/files')}
              title={featured.title}
              category={featured.category}
              cover={featured.cover}
              date={featured.date}
              fileNumber={featured.fileNumber}
              priority
              sizes="(min-width: 768px) 46vw, 100vw"
            />
          ) : null}
        </div>
      </section>

      <section className="shell py-12 md:py-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="display text-[clamp(2.8rem,6vw,4.5rem)]">Photos</h2>
          <Link href="/files" className="btn btn-line">
            All photos
          </Link>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {morePhotos.map((file) => (
            <AlbumCard
              key={file.slug}
              href={albumHrefWithFrom(file.slug, '/files')}
              title={file.title}
              category={file.category}
              cover={file.cover}
              date={file.date}
              fileNumber={file.fileNumber}
            />
          ))}
        </div>
      </section>

      <section id="films" className="border-t border-[color:var(--line-strong)]">
        <div className="shell py-12 md:py-16">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="display text-[clamp(2.8rem,6vw,4.5rem)]">Films</h2>
            <Link href="/films" className="btn btn-line">
              All films
            </Link>
          </div>
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
      </section>

      <section id="rates" className="border-t border-[color:var(--line-strong)]">
        <div className="shell py-16 md:py-20">
          <h2 className="display text-[clamp(2.8rem,6vw,4.5rem)]">Rates</h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-[rgb(var(--text-muted))]">
            Every project is scoped to your deliverables — these tiers are a starting point. Final quote after a quick call or form.
          </p>
          <ul className="mt-8 border-t border-[color:var(--line-strong)]">
            {siteConfig.packages.map((pkg) => (
              <li key={pkg.name} className="grid gap-3 border-b border-[color:var(--line)] py-5 md:grid-cols-[1.1fr_0.9fr_1.4fr] md:gap-8">
                <h3 className="text-base">{pkg.name}</h3>
                <p className="text-base text-[rgb(var(--accent))]">{pkg.price}</p>
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
        </div>
      </section>

      <section id="about" className="border-t border-[color:var(--line-strong)]">
        <div className="shell py-16 md:py-20">
          <h2 className="display text-[clamp(2.8rem,6vw,4.5rem)]">About</h2>
          <div className="mt-6 max-w-xl space-y-4 text-base leading-relaxed text-[rgb(var(--text-muted))]">
            <p>ISO.Regret is my view of the world. I’m Ryan, based in Jacksonville, drawn to good light, interesting details, and the stories happening right in front of us.</p>
            <p>Automotive is a big part of the work. There’s plenty more worth photographing.</p>
            <p>{siteConfig.colorStory}</p>
          </div>
          <div className="mt-6 flex flex-wrap gap-x-5 text-sm">
            <Link href="/collections/automotive" className="inline-flex min-h-11 items-center hover:text-[rgb(var(--accent))]">
              Automotive
            </Link>
            <Link href="/collections/street" className="inline-flex min-h-11 items-center hover:text-[rgb(var(--accent))]">
              People &amp; places
            </Link>
            <Link href="/collections/real-estate" className="inline-flex min-h-11 items-center hover:text-[rgb(var(--accent))]">
              Real estate
            </Link>
            <Link href="/blog" className="inline-flex min-h-11 items-center hover:text-[rgb(var(--accent))]">
              Journal
            </Link>
          </div>
          <a href="mailto:Brickel.Ryan@icloud.com" className="btn-text mt-2">
            Brickel.Ryan@icloud.com <ArrowUpRight size={16} aria-hidden />
          </a>
        </div>
      </section>

      <section id="contact" className="border-t border-[color:var(--line-strong)]">
        <span id="spec" />
        <div className="shell grid items-start gap-12 py-16 md:py-20 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div>
            <p className="eyebrow">Make something worth keeping</p>
            <h2 className="display mt-3 text-[clamp(2.8rem,6vw,4.5rem)]">Contact</h2>
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
