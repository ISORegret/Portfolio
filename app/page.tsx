import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import FilmGallery from '../components/FilmGallery'
import GarageHero from '../components/GarageHero'
import SpecBuilder from '../components/SpecBuilder'
import Testimonials from '../components/Testimonials'
import { siteConfig } from './data/site'
import { buildArchive, photoFilesNewestFirst } from '../lib/files'

export default function Page() {
  const photos = photoFilesNewestFirst()
  const films = buildArchive().filter((file) => file.kind === 'film' && file.src && file.poster)

  return (
    <main>
      <GarageHero
        files={photos.map((file) => ({
          slug: file.slug,
          title: file.title,
          category: file.category,
          date: file.date,
          fileNumber: file.fileNumber,
          cover: file.cover,
          blurb: file.blurb,
          location: file.location,
          specs: file.specs,
        }))}
      />

      <section id="films" className="shell py-16 md:py-20">
        <p className="eyebrow">Construction in motion</p>
        <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
          <h2 className="display text-[clamp(3rem,6vw,5.2rem)]">Films</h2>
          <Link href="/films" className="btn-text">
            Film files <ArrowUpRight size={16} aria-hidden />
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
      </section>

      <section id="rates" className="border-t border-[color:var(--line-strong)]">
        <div className="shell py-16 md:py-20">
          <p className="eyebrow">Starting at</p>
          <h2 className="display mt-3 text-[clamp(3rem,6vw,5.2rem)]">Rates</h2>
          <p className="mt-4 max-w-xl text-[0.82rem] leading-relaxed text-[rgb(var(--text-muted))]">
            Every project is scoped to your deliverables — these tiers are a starting point. Final quote after a quick call or form.
          </p>
          <ul className="mt-8 border-t border-[color:var(--line-strong)]">
            {siteConfig.packages.map((pkg) => (
              <li key={pkg.name} className="grid gap-3 border-b border-[color:var(--line)] py-5 md:grid-cols-[1.1fr_0.9fr_1.4fr] md:gap-8">
                <h3 className="text-[0.85rem] uppercase tracking-[0.06em]">{pkg.name}</h3>
                <p className="text-[0.85rem] text-[rgb(var(--accent))]">{pkg.price}</p>
                <div className="text-[0.78rem] leading-relaxed text-[rgb(var(--text-muted))]">
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

      <section id="spec" className="border-t border-[color:var(--line-strong)]">
        <span id="contact" />
        <div className="shell grid items-start gap-12 py-16 md:py-20 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div>
            <p className="eyebrow">Make something worth keeping</p>
            <h2 className="display mt-3 text-[clamp(3rem,6vw,5.2rem)]">Spec your shoot</h2>
            <p className="mt-5 max-w-md text-[0.85rem] leading-relaxed text-[rgb(var(--text-muted))]">
              A car you’re proud of. An event you’re planning. An idea you want to try. Let’s talk about it.
            </p>
            <p className="mt-4 max-w-md text-[0.82rem] leading-relaxed text-[rgb(var(--text-muted))]">
              <span className="text-[rgb(var(--text))]">What happens next. </span>
              I’ll reply within 24 hours. Galleries are typically ready 48–72 hours after the shoot.
            </p>
            <div id="about" className="mt-8 max-w-md space-y-4 text-[0.82rem] leading-relaxed text-[rgb(var(--text-muted))]">
              <p>ISO.Regret is my view of the world. I’m Ryan, based in Jacksonville, drawn to good light, interesting details, and the stories happening right in front of us.</p>
              <p>Automotive is a big part of the work. There’s plenty more worth photographing.</p>
              <p>{siteConfig.colorStory}</p>
            </div>
            <div className="mt-6 flex flex-wrap gap-x-5 text-[0.72rem] uppercase tracking-[0.08em]">
              <Link href="/collections/automotive" className="inline-flex min-h-11 items-center hover:text-[rgb(var(--accent))]">Automotive</Link>
              <Link href="/collections/street" className="inline-flex min-h-11 items-center hover:text-[rgb(var(--accent))]">People &amp; places</Link>
              <Link href="/collections/real-estate" className="inline-flex min-h-11 items-center hover:text-[rgb(var(--accent))]">Real estate</Link>
              <Link href="/blog" className="inline-flex min-h-11 items-center hover:text-[rgb(var(--accent))]">Journal</Link>
            </div>
            <a href="mailto:Brickel.Ryan@icloud.com" className="btn-text mt-2">
              Brickel.Ryan@icloud.com <ArrowUpRight size={16} aria-hidden />
            </a>
          </div>
          <SpecBuilder />
        </div>
      </section>

      <Testimonials />
    </main>
  )
}
