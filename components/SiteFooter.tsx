import Link from 'next/link'
import Wordmark from './Wordmark'
import BackToTop from './BackToTop'

const explore = [
  { href: '/files', label: 'Files' },
  { href: '/films', label: 'Films' },
  { href: '/#rates', label: 'Rates' },
  { href: '/#spec', label: 'Spec a shoot' },
  { href: '/blog', label: 'Journal' },
  { href: '/connect', label: 'Connect' },
]

export default function SiteFooter() {
  return (
    <>
      <footer className="border-t border-[color:var(--line-strong)] bg-[rgb(var(--bg))]">
        <div className="shell grid gap-10 py-12 md:grid-cols-[1.3fr_1fr_1fr] md:py-14">
          <div>
            <Wordmark />
            <p className="mt-4 max-w-xs text-[0.78rem] leading-relaxed text-[rgb(var(--text-muted))]">
              Photography and videography. Jacksonville and the surrounding areas.
            </p>
          </div>
          <div>
            <p className="eyebrow">Index</p>
            <ul className="mt-4 space-y-1 text-[0.75rem] uppercase tracking-[0.08em]">
              {explore.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="inline-flex min-h-11 items-center text-[rgb(var(--text-muted))] hover:text-[rgb(var(--text))]">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow">Studio</p>
            <ul className="mt-4 space-y-1 text-[0.75rem] uppercase tracking-[0.06em] text-[rgb(var(--text-muted))]">
              <li className="flex min-h-11 items-center">Jacksonville, Florida</li>
              <li className="flex min-h-11 items-center">Northeast Florida</li>
              <li>
                <a href="mailto:Brickel.Ryan@icloud.com" className="inline-flex min-h-11 items-center hover:text-[rgb(var(--text))]">
                  Brickel.Ryan@icloud.com
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/iso.regret/" target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center hover:text-[rgb(var(--text))]">
                  Instagram @iso.regret
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="shell border-t border-[color:var(--line)] py-4 text-[0.68rem] uppercase tracking-[0.1em] text-[rgb(var(--text-subtle))]">
          © {new Date().getFullYear()} ISO.Regret
        </div>
      </footer>
      <BackToTop />
    </>
  )
}
