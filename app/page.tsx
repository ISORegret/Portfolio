import Link from 'next/link'
import AlbumCard from '../components/AlbumCard'
import FilmGallery from '../components/FilmGallery'
import HomeHero from '../components/HomeHero'
import PricingPackages from '../components/PricingPackages'
import Reveal from '../components/Reveal'
import SpecBuilder from '../components/SpecBuilder'
import Testimonials from '../components/Testimonials'
import { siteConfig } from './data/site'
import { albumHrefWithFrom } from '../lib/albumBackNavigation'
import { buildArchive, photoFilesNewestFirst } from '../lib/files'

const faqs = [
  {
    q: 'How fast will I get my photos?',
    a: 'Galleries are typically ready 48–72 hours after the shoot, and I reply to enquiries within 24 hours.',
  },
  {
    q: 'What happens after I enquire?',
    a: 'Tell me what you’re shooting, when, and where — I’ll come back with a quote scoped to your deliverables, then we lock in a date.',
  },
  {
    q: 'Where do I see my photos?',
    a: 'Web-optimised previews live on this site, and full high-res delivery with guest access runs through Pixieset where applicable.',
  },
] as const

export default function Page() {
  const photos = photoFilesNewestFirst().slice(0, 6)
  const films = buildArchive().filter((file) => file.kind === 'film' && file.src && file.poster)

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
        </div>
        <div className="album-grid mt-10 md:mt-14">
          {photos.map((file, index) => (
            <AlbumCard
              key={file.slug}
              href={albumHrefWithFrom(file.slug, '/')}
              title={file.title}
              category={file.category}
              cover={file.cover}
              date={file.date}
              location={file.location}
              index={index + 1}
              priority={index < 3}
            />
          ))}
        </div>
      </section>

      <section id="films" className="band band-ink" aria-labelledby="films-heading">
        <div className="shell">
          <Reveal>
            <p className="eyebrow">Motion</p>
            <div className="section-head">
              <h2 id="films-heading" className="display display-xl">
                Films
              </h2>
              <Link href="/films" className="text-link">
                All films
              </Link>
            </div>
          </Reveal>
          <p className="mt-5 max-w-2xl text-[rgb(var(--text-muted))]">
            Rollers, reveals and recap films. More on Instagram —{' '}
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
            <p className="eyebrow">Make something worth keeping</p>
            <h2 className="display display-xl mt-3">Contact</h2>
            <p className="measure mt-5 text-[rgb(var(--text-muted))]">
              A car you’re proud of. An event you’re planning. An idea you want to try. Let’s talk about it.
            </p>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-[rgb(var(--text-muted))]">
              <span className="text-[rgb(var(--text))]">What happens next. </span>
              I’ll reply within 24 hours. Galleries are typically ready 48–72 hours after the shoot.
            </p>
            <p className="mt-6 text-sm leading-relaxed text-[rgb(var(--text-muted))]">
              Rather just email?{' '}
              <a href="mailto:Brickel.Ryan@icloud.com" className="text-link">
                Brickel.Ryan@icloud.com
              </a>
            </p>
          </div>
          <SpecBuilder />
        </div>
        <div className="shell mt-16">
          <p className="eyebrow">Before you ask</p>
          <h3 className="display mt-3 text-[clamp(1.9rem,4vw,2.75rem)]">Questions, answered</h3>
          <div className="mt-8 grid gap-x-12 gap-y-8 md:grid-cols-3">
            {faqs.map((faq) => (
              <div key={faq.q}>
                <h4 className="font-display text-xl font-medium leading-snug">{faq.q}</h4>
                <p className="mt-2 text-sm leading-relaxed text-[rgb(var(--text-muted))]">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Testimonials />
    </main>
  )
}
