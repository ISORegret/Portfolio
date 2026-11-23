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
 * Entrance (motion only, content unchanged): the hero image drifts in
 * with a slow Ken Burns scale (1.08 → 1 over ~1.6s) while the wordmark
 * and market line fade up in stagger. On a first visit it starts as
 * the loader lifts (~1.25s in); on repeat visits — or with reduced
 * motion — it plays immediately / not at all.
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
    let seen = false
    try {
      seen = Boolean(window.sessionStorage.getItem('iso-loader-seen'))
    } catch {
      seen = false
    }
    const t = window.setTimeout(() => setStarted(true), seen ? 0 : 1250)
    return () => window.clearTimeout(t)
  }, [reduce])

  const instant = Boolean(reduce)

  return (
    <section className="home-hero" aria-label={brandName}>
      <div className="hero-main">
        <motion.div
          className="absolute inset-0"
          initial={instant ? false : { scale: 1.08 }}
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
