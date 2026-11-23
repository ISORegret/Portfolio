'use client'

import { useEffect, useRef, useState } from 'react'

const SEEN_KEY = 'iso-loader-seen'
/** Bottega53-style intro: giant wordmark + 0–100% counter, then a curtain lift.
 *  Timer-driven (never waits on images), ~1.6s total, once per session,
 *  skippable by tapping anywhere. Reduced motion / repeat visits: no loader. */
const COUNT_MS = 1150
const LIFT_MS = 450

export default function SiteLoader() {
  const [phase, setPhase] = useState<'loading' | 'leaving' | 'done'>(() => {
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
  const finishedRef = useRef(false)

  useEffect(() => {
    if (phase !== 'loading') return
    const finish = () => {
      if (finishedRef.current) return
      finishedRef.current = true
      setCount(100)
      setPhase('leaving')
      window.setTimeout(() => {
        try {
          window.sessionStorage.setItem(SEEN_KEY, '1')
        } catch {
          // sessionStorage unavailable — loader just shows again next visit.
        }
        document.body.style.overflow = ''
        setPhase('done')
      }, LIFT_MS)
    }
    document.body.style.overflow = 'hidden'
    const start = performance.now()
    let raf = 0
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / COUNT_MS)
      const eased = 1 - Math.pow(1 - p, 3)
      setCount(Math.round(eased * 100))
      if (p < 1) raf = requestAnimationFrame(tick)
      else finish()
    }
    raf = requestAnimationFrame(tick)
    // Hard cap: the loader can never block the site, even if rAF stalls.
    const safety = window.setTimeout(finish, 2000)
    return () => {
      cancelAnimationFrame(raf)
      window.clearTimeout(safety)
      document.body.style.overflow = ''
    }
  }, [phase])

  if (phase === 'done') return null

  return (
    <div
      className={`site-loader${phase === 'leaving' ? ' site-loader--leaving' : ''}`}
      role="status"
      aria-label="Loading ISO Regret Media"
      onClick={() => {
        // Tap anywhere to skip — finishes the lift immediately.
        if (phase === 'loading') {
          setCount(100)
          setPhase('leaving')
          window.setTimeout(() => {
            try {
              window.sessionStorage.setItem(SEEN_KEY, '1')
            } catch {
              // ignore
            }
            document.body.style.overflow = ''
            setPhase('done')
          }, LIFT_MS)
        }
      }}
    >
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
