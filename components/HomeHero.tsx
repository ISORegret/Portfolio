import Image from 'next/image'
import Link from 'next/link'
import { siteConfig } from '../app/data/site'
import { albumHrefWithFrom } from '../lib/albumBackNavigation'

const frames = [
  {
    src: '/gallery/blue-mustang/blue-mustang-crosswalk.jpg',
    alt: 'S650 Mustang GT Premium',
    slug: 'blue-mustang',
    main: true,
  },
  {
    src: '/gallery/green-macan/green-macan.jpg',
    alt: '2018 Macan GTS',
    slug: 'green-macan',
  },
  {
    src: '/gallery/cruise-2026/DSC07127.webp',
    alt: 'Cruise 2026',
    slug: 'cruise-2026',
  },
] as const

export default function HomeHero() {
  const { hero, brandName } = siteConfig
  const main = frames[0]
  const sides = frames.slice(1)

  return (
    <section className="home-hero" aria-label={brandName}>
      <Link href={albumHrefWithFrom(main.slug, '/')} className="hero-main">
        <Image src={main.src} alt={main.alt} fill priority sizes="(min-width: 900px) 64vw, 100vw" className="object-cover" />
        <div className="hero-shade absolute inset-0" aria-hidden />
        <div className="shell relative z-10 flex h-full items-end pb-8 md:pb-12">
          <div className="hero-copy">
            <p className="hero-kicker">{brandName}</p>
            <h1 className="hero-name">{hero.headline}</h1>
            <div className="hero-rule" aria-hidden />
            <p className="hero-line whitespace-pre-line">{hero.subline}</p>
          </div>
        </div>
      </Link>
      <div className="hero-side">
        {sides.map((frame) => (
          <Link key={frame.slug} href={albumHrefWithFrom(frame.slug, '/')} className="hero-frame" aria-label={frame.alt}>
            <Image src={frame.src} alt="" fill sizes="(min-width: 900px) 34vw, 50vw" className="object-cover" />
          </Link>
        ))}
      </div>
    </section>
  )
}
