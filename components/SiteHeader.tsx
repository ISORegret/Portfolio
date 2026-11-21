'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { usePathname } from 'next/navigation'
import Wordmark from './Wordmark'
import { bookShootHref, isNavActive, navLinks } from '../lib/nav'

export default function SiteHeader() {
  const pathname = usePathname()
  const [hash, setHash] = useState('')
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => setMounted(true), [])

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
    <header className="site-header">
      <div className="shell flex h-[var(--header-h)] items-center gap-6">
        <Wordmark onClick={() => onNavigate('/')} className="shrink-0" />
        <nav className="site-nav" aria-label="Main">
          {navLinks.map((link) => {
            const active = isNavActive(link.href, pathname, hash)
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? 'page' : undefined}
                className="nav-link"
                onClick={() => onNavigate(link.href)}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>
        <Link href={bookShootHref} className="book-link site-book" onClick={() => onNavigate(bookShootHref)}>
          Book a shoot
        </Link>
        <button
          type="button"
          className="menu-toggle site-menu-button"
          onClick={() => setOpen(true)}
          aria-expanded={open}
          aria-controls="site-menu"
        >
          Menu
        </button>
      </div>

      {mounted && open
        ? createPortal(
            <div id="site-menu" className="menu-screen fixed inset-0 z-[70] flex flex-col min-[900px]:hidden" role="dialog" aria-modal="true" aria-label="Menu">
              <div className="shell flex h-[var(--header-h)] items-center justify-between">
                <Wordmark onClick={() => onNavigate('/')} />
                <button ref={closeRef} type="button" className="menu-toggle" onClick={() => setOpen(false)}>
                  Close
                </button>
              </div>
              <nav className="shell flex flex-1 flex-col justify-center pb-[8vh]" aria-label="Mobile">
                {navLinks.map((link) => {
                  const active = isNavActive(link.href, pathname, hash)
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      aria-current={active ? 'page' : undefined}
                      className="menu-link"
                      onClick={() => onNavigate(link.href)}
                    >
                      {link.label}
                    </Link>
                  )
                })}
                <Link href={bookShootHref} className="book-link mt-8" onClick={() => onNavigate(bookShootHref)}>
                  Book a shoot
                </Link>
              </nav>
            </div>,
            document.body,
          )
        : null}
    </header>
  )
}
