'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import Wordmark from './Wordmark'

const links = [
  { href: '/files', label: 'Files' },
  { href: '/films', label: 'Films' },
  { href: '/#rates', label: 'Rates' },
]

const more = [
  { href: '/blog', label: 'Journal' },
  { href: '/#about', label: 'About' },
  { href: '/connect', label: 'Connect' },
]

type Props = { fileCount: number }

export default function SiteHeader({ fileCount }: Props) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setOpen(false)
  }, [pathname])

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

  return (
    <header className="sticky top-0 z-50 border-b border-[color:var(--line-strong)] bg-[rgb(var(--bg))]">
      <div className="grid h-[var(--header-h)] grid-cols-[1fr_auto] items-center gap-3 px-4 lg:grid-cols-[1fr_auto_1fr] lg:px-7">
        <p className="hidden min-w-0 truncate text-[0.68rem] uppercase tracking-[0.12em] text-[rgb(var(--text-muted))] lg:block">
          Garage index — {fileCount} {fileCount === 1 ? 'file' : 'files'} on record
        </p>
        <Wordmark onClick={() => setOpen(false)} className="lg:justify-self-center" />
        <div className="flex items-center justify-end gap-3 md:gap-6">
          <nav className="hidden items-center gap-6 text-[0.72rem] uppercase tracking-[0.12em] xl:flex" aria-label="Main">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="text-[rgb(var(--text))] hover:text-[rgb(var(--accent))]">
                {link.label}
              </Link>
            ))}
          </nav>
          <Link href="/#spec" className="btn btn-yellow btn-sm">
            Spec a shoot
          </Link>
          <button
            type="button"
            className="grid h-11 w-11 place-items-center border border-[color:var(--line-strong)] xl:hidden"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <X size={20} aria-hidden /> : <Menu size={20} aria-hidden />}
          </button>
        </div>
      </div>
      {open ? (
        <nav id="mobile-navigation" className="border-t border-[color:var(--line)] bg-[rgb(var(--bg))] px-4 py-2 xl:hidden" aria-label="Mobile">
          <ul>
            {[...links, ...more].map((link) => (
              <li key={link.href} className="border-b border-[color:var(--line)]">
                <Link href={link.href} onClick={() => setOpen(false)} className="flex min-h-11 items-center py-3 text-[0.78rem] uppercase tracking-[0.14em]">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <p className="py-3 text-[0.68rem] uppercase tracking-[0.12em] text-[rgb(var(--text-muted))]">
            {String(fileCount).padStart(3, '0')} on record
          </p>
        </nav>
      ) : null}
    </header>
  )
}
