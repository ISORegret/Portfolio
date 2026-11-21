import type { Metadata } from 'next'
import { ArrowUpRight } from 'lucide-react'
import { withBrand } from '../../lib/brandedTitle'

export const metadata: Metadata = {
  title: withBrand('Connect'),
  description: 'Follow ISO.Regret, view the automotive portfolio, or book a shoot in Jacksonville, Florida.',
  alternates: { canonical: '/connect' },
}

const links = [
  {
    label: 'View the portfolio',
    detail: 'Automotive photography + film',
    href: '/',
    external: false,
  },
  {
    label: 'Follow @iso.regret',
    detail: 'New work, events + behind the scenes',
    href: 'https://www.instagram.com/iso.regret/',
    external: true,
  },
  {
    label: 'Book an automotive shoot',
    detail: 'Jacksonville + Northeast Florida',
    href: '/#contact',
    external: false,
  },
]

export default function ConnectPage() {
  return (
    <main className="shell py-16 md:py-24">
      <p className="eyebrow">Ryan / Jacksonville, Florida</p>
      <h1 className="display mt-3 text-[clamp(3.4rem,8vw,6.5rem)]">
        ISO<span className="text-[rgb(var(--accent))]">.</span>Regret
      </h1>
      <p className="mt-5 max-w-md text-[0.85rem] leading-relaxed text-[rgb(var(--text-muted))]">
        Automotive photography and film built around light, motion, and the details that make a car worth remembering.
      </p>
      <div className="mt-10 max-w-xl border-t border-[color:var(--line-strong)]">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target={link.external ? '_blank' : undefined}
            rel={link.external ? 'noreferrer' : undefined}
            className="flex items-center justify-between gap-4 border-b border-[color:var(--line)] py-4 hover:bg-bg-elevated"
          >
            <span>
              <span className="block text-[0.85rem] uppercase tracking-[0.06em]">{link.label}</span>
              <span className="mt-1 block text-[0.72rem] text-[rgb(var(--text-muted))]">{link.detail}</span>
            </span>
            <ArrowUpRight size={18} aria-hidden />
          </a>
        ))}
      </div>
    </main>
  )
}
