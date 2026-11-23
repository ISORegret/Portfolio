'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { siteConfig } from '../app/data/site'

const SEEN_KEY = 'iso-loader-seen'
/**
 * Bottega53-style intro, Ryan's Nov 23 tweak: SLOWER, BIGGER wordmark,
 * and the S650 full-screen behind it.
 *
 * 1. Loader: the S650 Mustang roller FULL-SCREEN behind a giant
 *    "ISO REGRET" wordmark + a slow 0–100% counter (~2.1s).
 * 2. At 100%: the full-screen photo MORPHS (FLIP-style) down into the
 *    main hero's real frame — measured at runtime from .hero-main, so
 *    it lands exactly, on mobile and desktop. The hero underneath is
 *    the same photo in the same frame, so when the loader unmounts
 *    there is no flash, no jump, no duplicate image.
 * 3. No hero on this page (album/gallery pages): falls back to the
 *    old curtain lift.
 *
 * Timer-driven (never waits on images), ~2.9s total, once per session,
 * tap anywhere to skip the count (the morph still plays, ~0.8s).
 * Reduced motion / repeat visits: no loader at all.
 */
const COUNT_MS = 2100
const MORPH_MS = 800

type Rect = { left: number; top: number; width: number; height: number }

export default function SiteLoader() {
  const [phase, setPhase] = useState<'loading' | 'morphing' | 'done'>(() => {
    if (typeof window === 'undefined') return 'loading'
    try {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return 'done'
      if (window.sessionStorage.getItem(SEEN_KEY)) return 'done'
    } catch {
      return 'loading'
    }
    return 'loading'
  })
  const [count, setCount] = useState(0)
  const [target, setTarget] = useState<Rect | null>(null)
  const finishedRef = useRef(false)

  // Single finish path, shared by the counter, the safety cap and
  // tap-to-skip: measure the hero frame, morph into it, then unmount.
  const finish = useCallback(() => {
    if (finishedRef.current) return
    finishedRef.current = true
    setCount(100)
    // Measure the hero's real frame right now — header height, svh,
    // min-height and viewport all included, no hardcoded guess.
    let rect: Rect | null = null
    const hero = document.querySelector('.hero-main')
    if (hero) {
      const r = hero.getBoundingClientRect()
      if (r.width > 0 && r.height > 0) {
        rect = { left: r.left, top: r.top, width: r.width, height: r.height }
      }
    }
    setTarget(rect)
    setPhase('morphing')
    window.setTimeout(() => {
      try {
        window.sessionStorage.setItem(SEEN_KEY, '1')
      } catch {
        // sessionStorage unavailable — loader just shows again next visit.
      }
      window.dispatchEvent(new Event('iso-loader-complete'))
      setPhase('done')
    }, MORPH_MS)
  }, [])

  // Lock scroll while the loader / morph is on screen.
  useEffect(() => {
    document.body.style.overflow = phase === 'done' ? '' : 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [phase])

  useEffect(() => {
    if (phase !== 'loading') return
    const start = performance.now()
    let raf = 0
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / COUNT_MS)
      // Ease-out cubic, but slower overall — the count lingers, then
      // settles into 100 rather than rushing past it.
      const eased = 1 - Math.pow(1 - p, 3)
      setCount(Math.round(eased * 100))
      if (p < 1) raf = requestAnimationFrame(tick)
      else finish()
    }
    raf = requestAnimationFrame(tick)
    // Hard cap: the loader can never block the site, even if rAF stalls.
    const safety = window.setTimeout(finish, COUNT_MS + MORPH_MS + 900)
    return () => {
      cancelAnimationFrame(raf)
      window.clearTimeout(safety)
    }
  }, [phase, finish])

  if (phase === 'done') return null

  const morphing = phase === 'morphing'
  // No hero to land on: curtain-lift the whole loader instead.
  const curtain = morphing && !target

  return (
    <div
      className={`site-loader${morphing ? ' site-loader--morphing' : ''}${curtain ? ' site-loader--leaving' : ''}`}
      role="status"
      aria-label="Loading ISO Regret Media"
      onClick={() => {
        // Tap anywhere to skip the count — the morph still plays, so
        // the landing feels intentional instead of abrupt.
        if (phase === 'loading') finish()
      }}
    >
      {/* The S650, full-screen during the count, morphing into the hero frame. */}
      <div
        className="site-loader-media"
        style={
          morphing && target
            ? { left: target.left, top: target.top, width: target.width, height: target.height }
            : undefined
        }
        aria-hidden
      >
        {/* Plain <img>: same URL as the hero's priority image, so the
            browser serves it from cache and the landing frame matches. */}
        <img src={siteConfig.hero.imageSrc} alt="" className="site-loader-img" />
      </div>
      <div className="site-loader-shade" aria-hidden />
      <div className="site-loader-inner">
        <p className="site-loader-kicker">Stills + Motion</p>
        <p className="site-loader-wordmark display" aria-hidden>
          ISO Regret
        </p>
        <p className="site-loader-sub">Jacksonville, Florida</p>
      </div>
      <p className="site-loader-count" aria-hidden>
        {count}
        <span>%</span>
      </p>
      <button type="button" className="site-loader-skip" aria-label="Skip loading animation">
        Skip
      </button>
      <span className="site-loader-bar" style={{ width: `${count}%` }} aria-hidden />
    </div>
  )
}
