'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { siteConfig } from '../app/data/site'

const EASE = [0.22, 1, 0.36, 1] as const

/**
 * Combined loader + Easton Chang hero:
 * - Easton Chang first viewport: one full-screen S650 Mustang roller,
 *   no text clutter beyond the header wordmark — the image is the page.
 *   The brand h1 is visually hidden (SEO / accessibility); the header
 *   wordmark ("ISO REGRET / STILLS + MOTION") carries the brand, and
 *   the only other chrome on the image is a quiet "Scroll" cue.
 *   Everything below (Stills wall, Motion, Rates, FAQ) stays, reached
 *   by scrolling.
 * - Loader entrance: the SiteLoader morphs the full-screen S650 into
 *   this hero's frame — that IS the entrance, so the hero image stays
 *   at scale 1 (no second Ken Burns zoom) and the Scroll cue simply
 *   fades up once the loader lands ('iso-loader-complete', fallback
 *   ~5s). The loader plays on every full page load (no
 *   once-per-session gate — that gate is what hid the loader from
 *   Ryan on a revisit), so the hero always waits for it.
 *   Reduced motion: instant.
 */
export default function HomeHero() {
  const { hero, brandName } = siteConfig
  const reduce = useReducedMotion()
  const [started, setStarted] = useState(false)

  useEffect(() => {
    if (reduce) {
      setStarted(true)
      return
    }
    // The loader always plays on a full page load now, so always wait
    // for it to land; the fallback covers a loader that never fires.
    const onDone = () => setStarted(true)
    window.addEventListener('iso-loader-complete', onDone)
    const fallback = window.setTimeout(() => setStarted(true), 5000)
    return () => {
      window.removeEventListener('iso-loader-complete', onDone)
      window.clearTimeout(fallback)
    }
  }, [reduce])

  const instant = Boolean(reduce)
  // The morph IS the entrance: the hero image is already landed at
  // scale 1 by it — hold it there, no second zoom.
  const imageScale = 1

  return (
    <section className="home-hero" aria-label={brandName}>
      <div className="hero-main">
        <motion.div
          className="absolute inset-0"
          initial={instant ? false : { scale: imageScale }}
          animate={started ? { scale: 1 } : {}}
          transition={{ duration: 1.6, ease: EASE }}
        >
          <Image
            src={hero.imageSrc}
            alt={hero.imageAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
        <div className="hero-shade absolute inset-0" aria-hidden />
        <h1 className="sr-only">
          {brandName} — Jacksonville photographer · automotive, real estate &amp; events
        </h1>
        <motion.a
          href="#shoots"
          className="hero-scroll-cue"
          aria-label="Scroll to selected work"
          initial={instant ? false : { opacity: 0 }}
          animate={started ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.35, ease: EASE }}
        >
          <span>Scroll</span>
        </motion.a>
      </div>
    </section>
  )
}
