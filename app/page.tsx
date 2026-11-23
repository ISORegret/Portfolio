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

/**
 * The design mock's 7 Shoots tiles, exactly — including the stand-ins.
 * Do NOT substitute real albums: the mock is the brief.
 */
const mockTiles: MockTile[] = [
  {
    n: '01',
    title: 'Corvette C8 — St. Marys Waterfront',
    caption: 'Waterfront Auto Show 2026',
    cats: ['automotive'],
    span: 'wide',
    img: '/mock/hero-c8.jpg',
    alt: 'Amplify Orange Corvette C8 at the St. Marys waterfront',
    tag: 'Stills',
  },
  {
    n: '02',
    title: 'Porsche 911 GT3 RS — Studio',
    caption: 'Jacksonville',
    cats: ['automotive'],
    span: 'narrow',
    img: '/mock/studio-gt3.jpg',
    alt: 'Matte black Porsche 911 GT3 RS under studio light',
    tag: 'Stills',
  },
  {
    n: '03',
    title: 'Twilight Listing — Ponte Vedra Beach',
    caption: 'Real Estate',
    cats: ['realestate'],
    span: 'third',
    img: '/mock/twilight-home.jpg',
    alt: 'Luxury home photographed at twilight with warm light in every window',
    tag: 'Stills',
  },
  {
    n: '04',
    title: 'Skylight House — Interiors',
    caption: 'Real Estate',
    cats: ['realestate'],
    span: 'third',
    img: '/mock/interior-light.jpg',
    alt: 'Sunlit modern interior with a skylight ceiling',
    tag: 'Stills',
  },
  {
    n: '05',
    title: 'Porsche 911 Turbo — Coastal Run',
    caption: 'Motion',
    cats: ['automotive', 'film'],
    span: 'third',
    img: '/mock/coastal-911.webp',
    alt: 'Porsche 911 Turbo driving a coastal road at dusk',
    tag: 'Film',
    film: true,
  },
  {
    n: '06',
    title: 'Evening Reception — Epping Forest Yacht Club',
    caption: 'Events · Jacksonville',
    cats: ['events'],
    span: 'narrow',
    img: '/mock/event-sparkler.jpg',
    alt: 'Couple leaving an evening reception through a tunnel of sparklers',
    tag: 'Stills',
  },
  {
    n: '07',
    title: 'Night Meet — Jacksonville',
    caption: 'Events',
    cats: ['events', 'film'],
    span: 'wide',
    img: '/mock/meet-night.jpg',
    alt: 'Crowd and modified cars at a night meet under string lights',
    tag: 'Film + Stills',
    film: true,
  },
]

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
          <ShootFilter tiles={mockTiles} />
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
