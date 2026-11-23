import Image from 'next/image'
import { siteConfig } from '../app/data/site'

/**
 * Easton Chang first viewport: one full-screen S650 Mustang roller,
 * no text clutter beyond the header wordmark — the image is the page.
 * The brand h1 is visually hidden (SEO / accessibility); the header
 * wordmark ("ISO REGRET / STILLS + MOTION") carries the brand, and
 * the only other chrome on the image is a quiet "Scroll" cue.
 * Everything below (Stills wall, Motion, Rates, FAQ) stays, reached
 * by scrolling.
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
        <h1 className="sr-only">
          {brandName} — Jacksonville photographer · automotive, real estate &amp; events
        </h1>
        <a href="#shoots" className="hero-scroll-cue" aria-label="Scroll to selected work">
          <span>Scroll</span>
        </a>
      </div>
    </section>
  )
}
