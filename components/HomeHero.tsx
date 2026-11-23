import Image from 'next/image'
import Link from 'next/link'
import { siteConfig } from '../app/data/site'

/**
 * Full-screen still hero matching the approved design mock:
 * one photo (S650 Mustang roller), serif "ISO Regret Media" wordmark
 * with the Regret in italic gold, and the market line underneath.
 * No headline, no video — the mock hero is a still with the wordmark.
 */
export default function HomeHero() {
  const { hero, brandName } = siteConfig

  return (
    <section className="home-hero" aria-label={brandName}>
      <div className="hero-main">
        <Image
          src={hero.imageSrc}
          alt={hero.imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="hero-shade absolute inset-0" aria-hidden />
        <div className="shell relative z-10 flex h-full flex-col justify-end pb-10 md:pb-14">
          <div className="hero-copy">
            <p className="hero-kicker">Stills + Motion</p>
            <h1 className="hero-wordmark hero-wordmark--mock" aria-label={brandName}>
              ISO <em>Regret</em> Media
            </h1>
            <p className="hero-market">Automotive&nbsp;&nbsp;·&nbsp;&nbsp;Real Estate&nbsp;&nbsp;·&nbsp;&nbsp;Events&nbsp;&nbsp;·&nbsp;&nbsp;Jacksonville, FL</p>
          </div>
          <Link href="/#shoots" className="hero-scroll">
            Scroll — Shoots
          </Link>
        </div>
      </div>
    </section>
  )
}
