'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

export default function StickyBookBar() {
  const pathname = usePathname()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const contact = document.getElementById('contact')
      const contactTop = contact?.getBoundingClientRect().top ?? Number.POSITIVE_INFINITY
      const nearContact = contactTop < window.innerHeight * 0.9
      setVisible(window.scrollY > window.innerHeight * 0.65 && !nearContact)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [pathname])

  if (pathname === '/connect' || !visible) return null

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[rgb(var(--border))] bg-[rgb(var(--bg)/0.94)] p-3 backdrop-blur md:hidden">
      <a href="/#contact" className="btn btn-primary w-full">
        Book a shoot
      </a>
    </div>
  )
}
