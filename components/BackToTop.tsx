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
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-24 right-4 z-30 grid h-11 w-11 place-items-center border border-[rgb(var(--border))] bg-[rgb(var(--bg)/0.9)] text-[rgb(var(--text-muted))] backdrop-blur hover:text-[rgb(var(--text))] md:bottom-6"
      aria-label="Back to top"
    >
      <ChevronUp className="h-5 w-5" aria-hidden />
    </button>
  )
}
