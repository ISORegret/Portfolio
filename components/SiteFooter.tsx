import Link from 'next/link'
import Wordmark from './Wordmark'
import BackToTop from './BackToTop'
import { bookShootHref, navLinks } from '../lib/nav'

const footerLinks = [
  ...navLinks,
  { href: '/#rates', label: 'Rates' },
  { href: '/blog', label: 'Journal' },
  { href: bookShootHref, label: 'Book a shoot' },
]

export default function SiteFooter() {
  return (
    <>
      <footer className="border-t border-[color:var(--line)] bg-[rgb(var(--bg))]">
        <div className="shell py-14 md:py-16">
          <Wordmark />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-[rgb(var(--text-muted))]">
            Photography and videography. Jacksonville and the surrounding areas.
          </p>
          <nav aria-label="Footer" className="mt-8 flex flex-wrap gap-x-6">
            {footerLinks.map((link) => (
              <Link key={link.label} href={link.href} className="text-link">
                {link.label}
              </Link>
            ))}
            <a href="https://www.instagram.com/iso.regret/" target="_blank" rel="noreferrer" className="text-link">
              Instagram
            </a>
          </nav>
          <p className="mt-8 text-sm text-[rgb(var(--text-muted))]">
            <a href="mailto:Brickel.Ryan@icloud.com" className="hover:text-[rgb(var(--text))]">
              Brickel.Ryan@icloud.com
            </a>
          </p>
          <p className="mt-6 text-[0.68rem] uppercase tracking-[0.18em] text-[rgb(var(--text-subtle))]">
            © {new Date().getFullYear()} ISO.Regret
          </p>
        </div>
      </footer>
      <BackToTop />
    </>
  )
}
