'use client'

import { useEffect, useState } from 'react'
import { ChevronUp } from 'lucide-react'

export default function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 700)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!visible) return null

  return (
    <button
      type="button"
      onClick={() => {
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
      }}
      className="fixed bottom-6 right-4 z-30 hidden h-11 w-11 place-items-center border border-[color:var(--line-strong)] bg-[rgb(var(--bg))] text-[rgb(var(--text))] md:grid"
      aria-label="Back to top"
    >
      <ChevronUp className="h-5 w-5" aria-hidden />
    </button>
  )
}
