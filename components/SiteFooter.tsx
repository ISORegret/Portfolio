import Link from 'next/link'
import { Instagram } from 'lucide-react'
import Wordmark from './Wordmark'
import BackToTop from './BackToTop'

const explore = [
  { href: '/work', label: 'Work' },
  { href: '/#films', label: 'Films' },
  { href: '/#services', label: 'Services' },
  { href: '/blog', label: 'Journal' },
  { href: '/#about', label: 'About' },
  { href: '/connect', label: 'Connect' },
]

export default function SiteFooter() {
  return (
    <>
      <footer className="border-t border-[rgb(var(--border-muted))] bg-[rgb(var(--bg))]">
        <div className="shell grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr] md:py-16">
          <div>
            <Wordmark />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-[rgb(var(--text-muted))]">
              Photography and videography. Jacksonville and the surrounding areas.
            </p>
          </div>
          <div>
            <p className="eyebrow">Explore</p>
            <ul className="mt-4 space-y-2 text-sm">
              {explore.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-[rgb(var(--text-muted))] hover:text-[rgb(var(--text))]">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow">Studio</p>
            <ul className="mt-4 space-y-2 text-sm text-[rgb(var(--text-muted))]">
              <li>Jacksonville, Florida</li>
              <li>
                <a href="mailto:Brickel.Ryan@icloud.com" className="hover:text-[rgb(var(--text))]">
                  Brickel.Ryan@icloud.com
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/iso.regret/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-[rgb(var(--text))]">
                  <Instagram size={15} aria-hidden /> @iso.regret
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="shell flex flex-wrap items-center justify-between gap-3 border-t border-[rgb(var(--border-muted))] py-5 text-xs text-[rgb(var(--text-subtle))]">
          <p>© {new Date().getFullYear()} ISO.Regret</p>
          <p>Northeast Florida</p>
        </div>
      </footer>
      <BackToTop />
    </>
  )
}
