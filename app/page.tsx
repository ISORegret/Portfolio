import Image from 'next/image'
import Link from 'next/link'
import FilmGallery from '../components/FilmGallery'
import HomeHero from '../components/HomeHero'
import PricingPackages from '../components/PricingPackages'
import Reveal from '../components/Reveal'
import ShootFilter, { type ShootTile } from '../components/ShootFilter'
import FaqAccordion from '../components/FaqAccordion'
import SpecBuilder from '../components/SpecBuilder'
import Testimonials from '../components/Testimonials'
import { siteConfig } from './data/site'
import { albumHrefWithFrom } from '../lib/albumBackNavigation'
import { buildArchive, photoFilesNewestFirst } from '../lib/files'

/** Show / meet albums among the newest shoots (by title — these are the events). */
const eventSlugs = new Set([
  'waterfront-auto-show-2026',
  'endless-summer-showcase-2026-09-26',
  'caffeine-octane-jacksonville-2026-09-12',
  'caffeine-octane-jacksonville',
])

const faqs = [
  {
    q: 'How fast is turnaround?',
    a: 'Galleries are typically ready 48–72 hours after the shoot, and I reply to enquiries within 24 hours.',
  },
  {
    // PLACEHOLDER — no rain policy is published on the site yet. Ryan to fill in.
    q: 'What if it rains on event day?',
    a: 'Rain policy to be confirmed — email Ryan and he’ll confirm the plan for your date.',
  },
  {
    // Derived from site copy: "Jacksonville. Wherever the story goes." + "across the First Coast".
    q: 'Do you travel outside Jacksonville?',
    a: 'Based in Jacksonville, shooting across the First Coast — and wherever the story goes.',
  },
  {
    // PLACEHOLDER — no raw-file policy is published on the site yet. Ryan to fill in.
    q: 'Can I get the raw files?',
    a: 'To be confirmed — ask Ryan when you enquire.',
  },
] as const

export default function Page() {
  const photos: ShootTile[] = photoFilesNewestFirst()
    .slice(0, 7)
    .map((file) => ({
      href: albumHrefWithFrom(file.slug, '/'),
      title: file.title,
      category: file.category,
      cover: file.cover,
      location: file.location,
      event: eventSlugs.has(file.slug),
      kind: 'photo' as const,
    }))
  const films = buildArchive().filter((file) => file.kind === 'film' && file.src && file.poster)
  const filmTiles: ShootTile[] = films.map((film) => ({
    href: `/films#${film.slug}`,
    title: film.title,
    category: 'Film',
    cover: film.poster ?? film.cover,
    event: false,
    kind: 'film' as const,
  }))
  const showreel = films[0]

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
          <Reveal>
            <p className="eyebrow">Selected work</p>
            <div className="section-head">
              <h2 id="shoots-heading" className="display display-xl">
                Shoots
              </h2>
              <Link href="/files" className="text-link">
                All photos
              </Link>
            </div>
          </Reveal>
          <div className="mt-8 md:mt-10">
            <ShootFilter photos={photos} films={filmTiles} />
          </div>
        </div>
      </section>

      <section id="films" className="band band-ink" aria-labelledby="films-heading">
        <div className="shell">
          <Reveal>
            <p className="eyebrow">Motion</p>
            <h2 id="films-heading" className="display display-xl mt-3">
              Films
            </h2>
          </Reveal>
          {showreel ? (
            <figure className="film-band mt-10 md:mt-14">
              <Image
                src={showreel.poster ?? showreel.cover}
                alt={showreel.title}
                width={1600}
                height={900}
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
          ) : null}
          <p className="mt-8 max-w-2xl text-[rgb(var(--text-muted))]">
            More on Instagram —{' '}
            <a href="https://www.instagram.com/iso.regret/" className="text-link">
              @iso.regret
            </a>
          </p>
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

      <section id="about" className="band band-ink">
        <div className="shell">
        <Reveal>
          <p className="eyebrow">Jacksonville</p>
          <h2 className="display display-xl mt-3">About</h2>
        </Reveal>
        <div className="measure mt-6 space-y-4 text-[rgb(var(--text-muted))]">
          <p>ISO.Regret is my view of the world. I’m Ryan, based in Jacksonville, drawn to good light, interesting details, and the stories happening right in front of us.</p>
          <p>Automotive is a big part of the work. There’s plenty more worth photographing.</p>
          <p>{siteConfig.colorStory}</p>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          <Link href="/collections/automotive" className="about-card">
            <p className="eyebrow">01</p>
            <h3 className="mt-3 font-display text-2xl font-medium">Automotive</h3>
            <p className="mt-2 text-sm leading-relaxed text-[rgb(var(--text-muted))]">Cars, meets and shows — rollers, details and the nights around them.</p>
          </Link>
          <Link href="/collections/real-estate" className="about-card">
            <p className="eyebrow">02</p>
            <h3 className="mt-3 font-display text-2xl font-medium">Real estate</h3>
            <p className="mt-2 text-sm leading-relaxed text-[rgb(var(--text-muted))]">MLS-ready stills — interiors, exteriors and the details that sell a listing.</p>
          </Link>
          <Link href="/files" className="about-card">
            <p className="eyebrow">03</p>
            <h3 className="mt-3 font-display text-2xl font-medium">Events</h3>
            <p className="mt-2 text-sm leading-relaxed text-[rgb(var(--text-muted))]">Shows, meets and gatherings — the full story from open to close.</p>
          </Link>
        </div>
        <div className="mt-10 flex flex-wrap gap-x-6">
          <Link href="/collections/street" className="text-link">
            People &amp; places
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
        </div>
      </section>

      <section id="contact" className="band band-charcoal">
        <span id="spec" />
        <div className="shell grid items-start gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <p className="eyebrow">Booking</p>
            <h2 className="display display-xl mt-3">Start a shoot</h2>
            <p className="measure mt-5 text-[rgb(var(--text-muted))]">
              Tell me what you’re shooting and when. The form asks for the details that decide a quote — shoot type, date,
              location and budget — so the first reply can be a real answer, not a back-and-forth.
            </p>
            <p className="mt-6 text-sm leading-relaxed text-[rgb(var(--text-muted))]">
              Rather just email?{' '}
              <a href="mailto:Brickel.Ryan@icloud.com" className="text-link">
                Brickel.Ryan@icloud.com
              </a>
            </p>
            <p className="mt-4 text-sm leading-relaxed text-[rgb(var(--text-muted))]">
              Based in Jacksonville, FL — shooting across the First Coast.
            </p>
          </div>
          <SpecBuilder />
        </div>
        <div className="shell mt-16">
          <p className="eyebrow">Before you ask</p>
          <h3 className="display mt-3 text-[clamp(1.9rem,4vw,2.75rem)]">Questions, answered</h3>
          <div className="mt-8 max-w-3xl">
            <FaqAccordion items={[...faqs]} />
          </div>
        </div>
      </section>

      <Testimonials />
    </main>
  )
}
