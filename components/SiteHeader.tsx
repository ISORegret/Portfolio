'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { Instagram, Menu, X } from 'lucide-react'
import { useReducedMotion } from 'framer-motion'
import Wordmark from './Wordmark'

const links = [
  { href: '/work', label: 'Work' },
  { href: '/#films', label: 'Films' },
  { href: '/#services', label: 'Services' },
  { href: '/blog', label: 'Journal' },
  { href: '/#about', label: 'About' },
]

const INSTAGRAM = 'https://www.instagram.com/iso.regret/'

export default function SiteHeader() {
  const pathname = usePathname()
  const reduce = useReducedMotion()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    let last = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      const delta = y - last
      setScrolled(y > 12)
      if (open || reduce || y < 72) setHidden(false)
      else if (delta > 8) setHidden(true)
      else if (delta < -8) setHidden(false)
      last = y
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [open, reduce])

  useEffect(() => {
    if (!open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previous
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  const solid = scrolled || open || pathname !== '/'

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-transform duration-300 ${
          hidden && !open ? '-translate-y-full' : 'translate-y-0'
        }`}
      >
        <div
          className={`border-b transition-colors duration-300 ${
            solid ? 'border-[rgb(var(--border-muted))] bg-[rgb(var(--bg)/0.92)] backdrop-blur-md' : 'border-transparent bg-transparent'
          }`}
        >
          <div className="shell flex h-[var(--header-h)] items-center justify-between gap-6">
            <Wordmark onClick={() => setOpen(false)} />
            <nav className="hidden items-center gap-7 text-sm text-[rgb(var(--text-muted))] xl:flex" aria-label="Main">
              {links.map((link) => (
                <Link key={link.href} href={link.href} className="transition-colors hover:text-[rgb(var(--text))]">
                  {link.label}
                </Link>
              ))}
              <a href="/#contact" className="btn btn-primary btn-sm">
                Book a shoot
              </a>
              <a href={INSTAGRAM} target="_blank" rel="noreferrer" aria-label="ISO.Regret on Instagram" className="text-[rgb(var(--text-muted))] hover:text-[rgb(var(--text))]">
                <Instagram size={18} aria-hidden />
              </a>
            </nav>
            <button
              type="button"
              className="grid h-11 w-11 place-items-center border border-[rgb(var(--border))] text-[rgb(var(--text))] xl:hidden"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="mobile-navigation"
              aria-label={open ? 'Close menu' : 'Open menu'}
            >
              {open ? <X size={20} aria-hidden /> : <Menu size={20} aria-hidden />}
            </button>
          </div>
        </div>
      </header>

      {open ? (
        <nav
          id="mobile-navigation"
          className="fixed inset-0 z-40 overflow-y-auto bg-[rgb(var(--bg))] px-6 pb-16 pt-28"
          aria-label="Mobile"
        >
          <ol className="mx-auto flex w-full max-w-lg flex-col">
            {links.map((link, index) => (
              <li key={link.href} className="border-b border-[rgb(var(--border-muted))]">
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="display flex items-baseline gap-4 py-4 text-[2.6rem]"
                >
                  <span className="font-sans text-sm tracking-[0.16em] text-[rgb(var(--accent))]">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  {link.label}
                </Link>
              </li>
            ))}
          </ol>
          <div className="mx-auto mt-8 flex w-full max-w-lg flex-col items-start gap-4">
            <a href="/#contact" onClick={() => setOpen(false)} className="btn btn-primary">
              Book a shoot
            </a>
            <a href={INSTAGRAM} target="_blank" rel="noreferrer" className="btn-text">
              <Instagram size={16} aria-hidden /> Instagram
            </a>
          </div>
        </nav>
      ) : null}
    </>
  )
}
