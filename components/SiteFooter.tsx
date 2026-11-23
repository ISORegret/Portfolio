import Link from 'next/link'
import Wordmark from './Wordmark'
import BackToTop from './BackToTop'
import { bookShootHref, navLinks } from '../lib/nav'

const footerLinks = [
  ...navLinks,
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
          <p className="footer-line mt-10">© {new Date().getFullYear()} ISO.Regret Media — Jacksonville, FL</p>
          <p className="footer-line mt-3">
            Instagram —{' '}
            <a href="https://www.instagram.com/iso.regret/" target="_blank" rel="noreferrer" className="hover:text-[rgb(var(--text))]">
              @iso.regret
            </a>
          </p>
          <p className="footer-line mt-3">
            <a href="mailto:Brickel.Ryan@icloud.com" className="hover:text-[rgb(var(--text))]">
              Brickel.Ryan@icloud.com
            </a>
          </p>
        </div>
      </footer>
      <BackToTop />
    </>
  )
}
