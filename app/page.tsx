import Image from 'next/image'
import Link from 'next/link'
import FilmGallery from '../components/FilmGallery'
import HomeHero from '../components/HomeHero'
import PricingPackages from '../components/PricingPackages'
import Reveal from '../components/Reveal'
import ShootFilter, { type MockTile } from '../components/ShootFilter'
import FaqAccordion from '../components/FaqAccordion'
import SpecBuilder from '../components/SpecBuilder'
import { buildArchive } from '../lib/files'
import { albumHrefWithFrom } from '../lib/albumBackNavigation'

import { projects } from '../app/data/projects'

/**
 * The design mock's exact Shoots wall — 7 numbered tiles, 12-col grid
 * (wide 7, narrow 5, third 4), STILLS/FILM tag pills, caption + gold
 * category line, working All / Automotive / Real Estate / Events / Film
 * filters — but the tiles are Ryan's REAL albums, not the mock's stand-ins.
 * Covers/titles come from app/data/projects.ts so they stay in sync.
 * Order: newest first. No real-estate albums exist in the repo, so the
 * Real Estate filter shows the empty state (see ShootFilter).
 */
const wallSpec = [
  { slug: 'cruise-2026', caption: 'MSC Grandiosa · Nov 2026', cats: ['events'], span: 'wide' },
  { slug: 'endless-summer-showcase-2026-09-26', caption: 'Downtown Jacksonville', cats: ['automotive'], span: 'narrow' },
  { slug: 'blue-mustang', caption: 'Jacksonville', cats: ['automotive'], span: 'third' },
  { slug: 'green-macan', caption: 'Jacksonville', cats: ['automotive'], span: 'third' },
  { slug: 'caffeine-octane-jacksonville-2026-09-12', caption: 'Jacksonville · Sep 2026', cats: ['automotive', 'events'], span: 'third' },
  { slug: 'waterfront-auto-show-2026', caption: 'St. Marys, GA', cats: ['automotive', 'events'], span: 'narrow' },
  { slug: 'caffeine-octane-jacksonville', caption: 'Jacksonville', cats: ['automotive', 'events'], span: 'wide' },
] as const

const realTiles: MockTile[] = wallSpec.map((spec, index) => {
  const project = projects.find((p) => p.slug === spec.slug)
  if (!project) throw new Error(`Wall album missing from projects.ts: ${spec.slug}`)
  return {
    n: String(index + 1).padStart(2, '0'),
    title: project.title,
    caption: spec.caption,
    cats: [...spec.cats],
    span: spec.span,
    img: project.cover,
    alt: `${project.title} — photographed by ISO.Regret`,
    tag: 'Stills',
    href: albumHrefWithFrom(spec.slug, '/'),
  }
})

const faqs = [
  {
    q: 'How fast is turnaround?',
    a: 'Edited galleries are typically delivered within 5 days, and films within 10 days.',
  },
  {
    q: 'What if it rains on event day?',
    a: 'Shoots go ahead rain or shine where it’s safe to do so — I work around the weather and chase the light. If severe weather makes the shoot impossible, we reschedule your date free of charge.',
  },
  {
    q: 'Do you travel outside Jacksonville?',
    a: 'Regularly across the First Coast — St. Augustine, Amelia Island, Daytona — with travel quoted up front.',
  },
  {
    q: 'Can I get the raw files?',
    a: 'No — delivery is the edited gallery only (Pixieset, high resolution). Raw files are not included.',
  },
] as const

export default function Page() {
  const films = buildArchive().filter((file) => file.kind === 'film' && file.src && file.poster)
  const filmTiles: MockTile[] = films.map((film) => ({
    n: '',
    title: film.title,
    caption: 'Film',
    cats: ['film'],
    span: 'third',
    img: film.poster ?? film.cover,
    alt: `${film.title} — film by ISO.Regret`,
    tag: 'Film',
    film: true,
    href: `/films#${film.slug}`,
  }))

  return (
    <main>
      <HomeHero />

      <section className="band band-ink statement-band" aria-label="Introduction">
        <div className="shell">
          <Reveal>
            <p className="statement">Built to be seen.</p>
            <p className="measure mt-5 text-[rgb(var(--text-muted))]">
              Cars, listings and nights worth remembering — shot in Jacksonville and across the First Coast.
            </p>
          </Reveal>
        </div>
      </section>

      <section id="shoots" className="band band-charcoal" aria-labelledby="shoots-heading">
        <div className="shell">
          <ShootFilter tiles={realTiles} films={filmTiles} />
        </div>
      </section>

      <section id="films" className="band band-ink" aria-labelledby="films-heading">
        <div className="shell">
          <Reveal>
            <p className="eyebrow">Motion</p>
            <h2 id="films-heading" className="display display-md mt-3">
              Films
            </h2>
          </Reveal>
          <figure className="film-band mt-10 md:mt-14">
            <Image
              src="/mock/coastal-911.webp"
              alt="Porsche 911 Turbo on a coastal road at dusk, film still"
              width={1600}
              height={686}
              sizes="100vw"
              className="film-band-media"
            />
            <figcaption className="film-band-caption">
              <p className="eyebrow">Showreel</p>
              <p className="film-band-title">Rollers, reveals &amp; recap films</p>
              <a
                href="https://www.instagram.com/iso.regret/"
                target="_blank"
                rel="noreferrer"
                className="btn btn-line film-band-cta"
              >
                <span aria-hidden>▶</span> Watch on Instagram
              </a>
            </figcaption>
          </figure>
          <div className="mt-10 md:mt-14">
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
          <p className="mt-8">
            <Link href="/films" className="text-link">
              All films
            </Link>
          </p>
        </div>
      </section>

      <PricingPackages />

      <section id="contact" className="band band-charcoal">
        <span id="spec" />
        <div className="shell">
          <div className="m-sec-head">
            <div>
              <span className="caps">Booking</span>
              <h2 className="display display-md mt-3">Start a shoot</h2>
            </div>
          </div>
          <div className="book-grid">
            <div className="book-info">
              <p>
                Tell me what you’re shooting and when. The form asks for the details that decide a quote — shoot type, date,
                location and budget — so the first reply can be a real answer, not a back-and-forth.
              </p>
              <p>Rather just email?</p>
              <a className="mail" href="mailto:Brickel.Ryan@icloud.com">
                Brickel.Ryan@icloud.com
              </a>
              <p style={{ marginTop: 16 }}>Based in Jacksonville, FL — shooting across the First Coast.</p>
            </div>
            <SpecBuilder />
          </div>
          <div className="mt-9 max-w-3xl">
            <FaqAccordion items={[...faqs]} />
          </div>
        </div>
      </section>
    </main>
  )
}
