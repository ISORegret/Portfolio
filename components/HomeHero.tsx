import Image from 'next/image'
import { siteConfig } from '../app/data/site'

/**
 * Full-screen still hero matching the design mock exactly:
 * S650 Mustang roller (NOT the C8 — the roller stays), vertical side
 * labels on desktop, giant "ISO Regret Media" with the Regret in
 * italic gold, and the market line with gold dots underneath.
 * The nav/wordmark live in the sticky SiteHeader above this section.
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
        <span className="hero-side-label left">Photo + Video</span>
        <span className="hero-side-label right">Jacksonville, Florida</span>
        <div className="shell relative z-10 flex h-full flex-col justify-end pb-10 md:pb-14">
          <div className="hero-copy">
            <h1 className="hero-wordmark hero-wordmark--mock" aria-label={brandName}>
              ISO <em>Regret</em>
              <br />
              Media
            </h1>
            <p className="hero-market">
              <span>Automotive</span>
              <span className="dot" aria-hidden>
                ·
              </span>
              <span>Real Estate</span>
              <span className="dot" aria-hidden>
                ·
              </span>
              <span>Events</span>
              <span className="dot" aria-hidden>
                ·
              </span>
              <span>Jacksonville, FL</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
