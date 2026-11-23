import Image from 'next/image'
import Link from 'next/link'
import { siteConfig } from '../app/data/site'

/**
 * Single full-screen hero (Trigger Shoots / Easton Chang model):
 * one image or muted reel, oversized wordmark, headline, nothing else.
 * No side frames.
 */
export default function HomeHero() {
  const { hero, brandName } = siteConfig

  return (
    <section className="home-hero" aria-label={brandName}>
      <div className="hero-main">
        {hero.videoSrc ? (
          <video
            className="hero-media"
            autoPlay
            muted
            loop
            playsInline
            poster={hero.imageSrc}
            aria-hidden
          >
            <source src={hero.videoSrc} type="video/mp4" />
          </video>
        ) : (
          <Image
            src={hero.imageSrc}
            alt={hero.imageAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        )}
        <div className="hero-shade absolute inset-0" aria-hidden />
        <div className="shell relative z-10 flex h-full flex-col justify-end pb-10 md:pb-14">
          <div className="hero-copy">
            <p className="hero-wordmark" aria-label={brandName}>
              ISO&nbsp;REGRET
            </p>
            <h1 className="hero-name">{hero.headline}</h1>
            <div className="hero-rule" aria-hidden />
            <p className="hero-line whitespace-pre-line">{hero.subline}</p>
          </div>
          <Link href="/#shoots" className="hero-scroll">
            Scroll — Shoots
          </Link>
        </div>
      </div>
    </section>
  )
}
