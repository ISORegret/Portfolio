'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Shows only once the user has stopped scrolling (past 700px) so the
 * button never slides over titles or card text mid-scroll.
 */
export default function BackToTop() {
  const [visible, setVisible] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const onScroll = () => {
      setVisible(false)
      if (timer.current) clearTimeout(timer.current)
      timer.current = setTimeout(() => {
        setVisible(window.scrollY > 700)
      }, 450)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (timer.current) clearTimeout(timer.current)
    }
  }, [])

  if (!visible) return null

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={() => {
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
      }}
      className="text-btn fixed bottom-6 right-5 z-30 border border-[color:var(--line-strong)] bg-[#14100d] px-4 shadow-lg md:right-8"
    >
      Top
    </button>
  )
}
