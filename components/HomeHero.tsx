'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { siteConfig } from '../app/data/site'

const EASE = [0.22, 1, 0.36, 1] as const

/**
 * Full-screen still hero matching the design mock exactly:
 * S650 Mustang roller (NOT the C8 — the roller stays), vertical side
 * labels on desktop, giant "ISO Regret Media" with the Regret in
 * italic gold, and the market line with gold dots underneath.
 * The nav/wordmark live in the sticky SiteHeader above this section.
 *
 * Entrance (motion only, content unchanged):
 * - First visit: the SiteLoader morphs the full-screen S650 into
 *   this hero's frame — that IS the entrance, so the hero image
 *   stays at scale 1 (no second Ken Burns zoom) and the wordmark /
 *   market line simply fade up once the loader lands
 *   ('iso-loader-complete', fallback ~4.2s).
 * - Repeat visits (no loader): the gentle Ken Burns scale
 *   (1.08 → 1 over ~1.6s) plays immediately, as before.
 * Reduced motion: everything appears instantly.
 */
export default function HomeHero() {
  const { hero, brandName } = siteConfig
  const reduce = useReducedMotion()
  // Read the session flag synchronously at first render, so the
  // initial scale is right before paint: 'loader' on a first visit
  // (morph lands it at scale 1), 'normal' on repeat visits.
  const [mode, setMode] = useState<'loader' | 'normal'>(() => {
    if (typeof window === 'undefined') return 'loader'
    try {
      return window.sessionStorage.getItem('iso-loader-seen') ? 'normal' : 'loader'
    } catch {
      return 'loader'
    }
  })
  const [started, setStarted] = useState(false)

  useEffect(() => {
    if (reduce) {
      setMode('normal')
      setStarted(true)
      return
    }
    if (mode === 'normal') {
      setStarted(true)
      return
    }
    const onDone = () => setStarted(true)
    window.addEventListener('iso-loader-complete', onDone)
    const fallback = window.setTimeout(() => setStarted(true), 4200)
    return () => {
      window.removeEventListener('iso-loader-complete', onDone)
      window.clearTimeout(fallback)
    }
  }, [reduce, mode])

  const instant = Boolean(reduce)
  // Loader first visit: image is already landed at scale 1 by the
  // morph — hold it there. Repeat visits: drift in from 1.08.
  const imageScale = mode === 'loader' ? 1 : 1.08

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
        <motion.span
          className="hero-side-label left"
          initial={instant ? false : { opacity: 0 }}
          animate={started ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.35, ease: EASE }}
        >
          Photo + Video
        </motion.span>
        <motion.span
          className="hero-side-label right"
          initial={instant ? false : { opacity: 0 }}
          animate={started ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.35, ease: EASE }}
        >
          Jacksonville, Florida
        </motion.span>
        <div className="shell relative z-10 flex h-full flex-col justify-end pb-10 md:pb-14">
          <div className="hero-copy">
            <motion.h1
              className="hero-wordmark hero-wordmark--mock"
              aria-label={brandName}
              initial={instant ? false : { opacity: 0, y: 28 }}
              animate={started ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, ease: EASE }}
            >
              ISO <em>Regret</em>
              <br />
              Media
            </motion.h1>
            <motion.p
              className="hero-market"
              initial={instant ? false : { opacity: 0, y: 16 }}
              animate={started ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.15, ease: EASE }}
            >
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
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  )
}
