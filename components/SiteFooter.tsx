import Link from 'next/link'
import Wordmark from './Wordmark'
import BackToTop from './BackToTop'
import { bookShootHref, navLinks } from '../lib/nav'

const footerLinks = [...navLinks, { href: bookShootHref, label: 'Book a shoot' }]

export default function SiteFooter() {
  return (
    <>
      <footer className="border-t border-[color:var(--line-strong)] bg-[rgb(var(--bg))]">
        <div className="shell grid gap-8 py-12 md:grid-cols-[1.4fr_1fr] md:py-14">
          <div>
            <Wordmark />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-[rgb(var(--text-muted))]">
              Photography and videography. Jacksonville and the surrounding areas.
            </p>
            <p className="mt-4 text-sm text-[rgb(var(--text-muted))]">
              <a href="mailto:Brickel.Ryan@icloud.com" className="inline-flex min-h-11 items-center hover:text-[rgb(var(--text))]">
                Brickel.Ryan@icloud.com
              </a>
            </p>
          </div>
          <nav aria-label="Footer">
            <ul className="space-y-1 text-base">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="inline-flex min-h-11 items-center text-[rgb(var(--text-muted))] hover:text-[rgb(var(--text))]">
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href="https://www.instagram.com/iso.regret/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-11 items-center text-[rgb(var(--text-muted))] hover:text-[rgb(var(--text))]"
                >
                  Instagram @iso.regret
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <div className="shell border-t border-[color:var(--line)] py-4 text-sm text-[rgb(var(--text-subtle))]">
          © {new Date().getFullYear()} ISO.Regret
        </div>
      </footer>
      <BackToTop />
    </>
  )
}
