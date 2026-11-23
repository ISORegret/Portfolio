'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { siteConfig } from '../app/data/site'

/**
 * Bottega53-style intro — FIXED Nov 23 after Ryan reported "no full
 * screen s650 or shrink to hero" on the v2 preview.
 *
 * Root causes found:
 * 1. The loader only played ONCE PER SESSION (a sessionStorage flag).
 *    Ryan had already watched the v1 loader in the same tab, so on
 *    the v2 preview the loader returned null — no S650, no shrink.
 *    FIX: no session gate any more. The loader plays on EVERY full
 *    page load. `?loader=0` skips it, `?loader=1` forces it.
 * 2. The v2 push landed 16:26:24Z and Ryan watched ~16:29Z while
 *    Vercel still said "deploying" — the preview was still serving
 *    the old v1 code. (Not a code bug; confirm the deployment is
 *    Ready before asking Ryan to look again.)
 * 3. Even when it played, the "shrink" was invisible by construction:
 *    the hero frame is the full viewport minus a 72px header, so the
 *    morph only moved ~8%. FIX: two-stage morph — the photo first
 *    visibly shrinks into a framed inset (rounded corners, dark
 *    surround), then lands on the hero's real frame.
 *
 * Behaviour now:
 * 1. S650 FULL-SCREEN behind a giant wordmark + slow 0–100% counter (~2.1s).
 * 2. At 100%: shrink to a framed inset (~0.7s), then land on the
 *    hero frame (~0.6s). Same photo in the same frame underneath,
 *    so the landing has no flash or jump. ~3.4s total.
 * 3. No hero on this page: falls back to the curtain lift.
 * Tap anywhere to skip the count (the shrink still plays); tap again
 * during the morph to land instantly. Timer-driven, hard cap.
 * Reduced motion: no loader at all, hero appears instantly.
 */
const COUNT_MS = 2100
const SHRINK_MS = 700
const LAND_MS = 600

type Rect = { left: number; top: number; width: number; height: number }
type Phase = 'loading' | 'shrink' | 'land' | 'done'

function loaderParam(): 'force' | 'skip' | null {
  try {
    const v = new URLSearchParams(window.location.search).get('loader')
    if (v === '0' || v === 'off') return 'skip'
    if (v === '1' || v === 'on') return 'force'
  } catch {
    // URL parsing unavailable — fall through to the default.
  }
  return null
}

export default function SiteLoader() {
  const [phase, setPhase] = useState<Phase>(() => {
    if (typeof window === 'undefined') return 'loading'
    try {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return 'done'
      if (loaderParam() === 'skip') return 'done'
    } catch {
      return 'loading'
    }
    return 'loading'
  })
  const [count, setCount] = useState(0)
  const [target, setTarget] = useState<Rect | null>(null)
  const finishedRef = useRef(false)
  const announcedRef = useRef(false)
  const timersRef = useRef<number[]>([])

  const later = useCallback((fn: () => void, ms: number) => {
    const id = window.setTimeout(fn, ms)
    timersRef.current.push(id)
  }, [])

  // Clear any pending morph timers if the component unmounts mid-flight.
  useEffect(() => {
    const timers = timersRef.current
    return () => {
      timers.forEach((id) => window.clearTimeout(id))
    }
  }, [])

  const announceDone = useCallback(() => {
    if (announcedRef.current) return
    announcedRef.current = true
    window.dispatchEvent(new Event('iso-loader-complete'))
  }, [])

  // If the loader was skipped (reduced motion / ?loader=0), tell the
  // hero immediately instead of making it wait out its fallback timer.
  useEffect(() => {
    if (phase === 'done') announceDone()
  }, [phase, announceDone])

  // Two-stage finish, shared by the counter, the safety cap and
  // tap-to-skip: shrink into a framed inset, then land on the hero.
  const finish = useCallback(() => {
    if (finishedRef.current) return
    finishedRef.current = true
    setCount(100)
    const vw = window.innerWidth
    const vh = window.innerHeight
    // Stage 1 target: a clearly smaller framed inset — this is the
    // shrink Ryan asked for. Deliberately much smaller than the hero
    // frame (which is ~full viewport), so it reads unmistakably.
    const inset: Rect = {
      left: Math.round(vw * 0.05),
      top: Math.round(vh * 0.14),
      width: Math.round(vw * 0.9),
      height: Math.round(vh * 0.68),
    }
    // Stage 2 target: the hero's real frame, measured at runtime —
    // header height, svh, min-height and viewport all included.
    let heroRect: Rect | null = null
    const hero = document.querySelector('.hero-main')
    if (hero) {
      const r = hero.getBoundingClientRect()
      if (r.width > 0 && r.height > 0) {
        heroRect = { left: r.left, top: r.top, width: r.width, height: r.height }
      }
    }
    if (!heroRect) {
      // No hero to land on: curtain-lift the whole loader instead.
      setTarget(null)
      setPhase('land')
      later(() => {
        announceDone()
        setPhase('done')
      }, LAND_MS)
      return
    }
    setTarget(inset)
    setPhase('shrink')
    later(() => {
      setTarget(heroRect)
      setPhase('land')
    }, SHRINK_MS)
    later(() => {
      announceDone()
      setPhase('done')
    }, SHRINK_MS + LAND_MS)
  }, [announceDone, later])

  // Tap during the morph: land instantly instead of waiting it out.
  const landNow = useCallback(() => {
    timersRef.current.forEach((id) => window.clearTimeout(id))
    timersRef.current = []
    announceDone()
    setPhase('done')
  }, [announceDone])

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
    const safety = window.setTimeout(finish, COUNT_MS + SHRINK_MS + LAND_MS + 900)
    return () => {
      cancelAnimationFrame(raf)
      window.clearTimeout(safety)
    }
  }, [phase, finish])

  if (phase === 'done') return null

  const morphing = phase === 'shrink' || phase === 'land'
  // No hero to land on: curtain-lift the whole loader instead.
  const curtain = morphing && !target

  return (
    <div
      className={`site-loader${morphing ? ' site-loader--morphing' : ''}${curtain ? ' site-loader--leaving' : ''}`}
      role="status"
      aria-label="Loading ISO Regret Media"
      onClick={() => {
        // Tap once to skip the count (the shrink still plays, so the
        // landing feels intentional); tap again mid-morph to land now.
        if (phase === 'loading') finish()
        else if (morphing) landNow()
      }}
    >
      {/* The S650, full-screen during the count, shrinking into a
          framed inset, then landing on the hero frame. */}
      <div
        className={`site-loader-media${phase === 'shrink' ? ' site-loader-media--framed' : ''}`}
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
