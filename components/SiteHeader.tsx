'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import Wordmark from './Wordmark'
import { bookShootHref, isNavActive, navLinks } from '../lib/nav'

function linkClass(active: boolean, size: 'bar' | 'menu') {
  if (size === 'menu') {
    return `flex min-h-[4.5rem] items-center border-b border-[color:var(--line)] text-4xl ${
      active ? 'text-[rgb(var(--accent))]' : 'text-[rgb(var(--text))]'
    }`
  }
  return `inline-flex min-h-11 items-center border-b-2 text-[0.95rem] lg:text-base ${
    active
      ? 'border-[rgb(var(--accent))] text-[rgb(var(--accent))]'
      : 'border-transparent text-[rgb(var(--text))] hover:border-[rgb(var(--text-muted))]'
  }`
}

export default function SiteHeader() {
  const pathname = usePathname()
  const [hash, setHash] = useState('')
  const [open, setOpen] = useState(false)
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    const read = () => setHash(window.location.hash)
    read()
    window.addEventListener('hashchange', read)
    return () => window.removeEventListener('hashchange', read)
  }, [pathname])

  useEffect(() => {
    if (!open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    closeRef.current?.focus()
    return () => {
      document.body.style.overflow = previous
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  function onNavigate(href: string) {
    setOpen(false)
    setHash(href.includes('#') ? href.slice(href.indexOf('#')) : '')
  }

  return (
    <header className="sticky top-0 z-50 border-b border-[color:var(--line-strong)] bg-[rgb(var(--bg))]">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center gap-3 px-4 md:gap-6 md:px-7">
        <Wordmark onClick={() => onNavigate('/')} className="shrink-0" />
        <nav className="ml-auto hidden items-center gap-5 lg:gap-8 md:flex" aria-label="Main">
          {navLinks.map((link) => {
            const active = isNavActive(link.href, pathname, hash)
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? 'page' : undefined}
                className={linkClass(active, 'bar')}
                onClick={() => onNavigate(link.href)}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>
        <div className="hidden shrink-0 md:block">
          <Link href={bookShootHref} className="btn btn-yellow" onClick={() => onNavigate(bookShootHref)}>
            Book a shoot
          </Link>
        </div>
        <button
          type="button"
          className="ml-auto inline-flex min-h-11 items-center border border-[color:var(--line-strong)] px-4 text-base md:hidden"
          onClick={() => setOpen(true)}
          aria-expanded={open}
          aria-controls="site-menu"
        >
          Menu
        </button>
      </div>

      {open ? (
        <div id="site-menu" className="fixed inset-0 z-[70] flex flex-col bg-[rgb(var(--bg))] md:hidden" role="dialog" aria-modal="true" aria-label="Menu">
          <div className="flex h-16 items-center justify-between border-b border-[color:var(--line-strong)] px-4">
            <Wordmark onClick={() => onNavigate('/')} />
            <button
              ref={closeRef}
              type="button"
              className="inline-flex min-h-11 items-center border border-[color:var(--line-strong)] px-4 text-base"
              onClick={() => setOpen(false)}
            >
              Close
            </button>
          </div>
          <nav className="flex flex-1 flex-col overflow-y-auto px-5 pb-8 pt-2" aria-label="Mobile">
            {navLinks.map((link) => {
              const active = isNavActive(link.href, pathname, hash)
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? 'page' : undefined}
                  className={linkClass(active, 'menu')}
                  onClick={() => onNavigate(link.href)}
                >
                  {link.label}
                </Link>
              )
            })}
            <Link href={bookShootHref} className="btn btn-yellow mt-8 min-h-14 w-full" onClick={() => onNavigate(bookShootHref)}>
              Book a shoot
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  )
}
