import type { Metadata } from 'next'
import { ArrowUpRight, CalendarDays, Images, Instagram } from 'lucide-react'
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
    icon: Images,
    external: false,
  },
  {
    label: 'Follow @iso.regret',
    detail: 'New work, events + behind the scenes',
    href: 'https://www.instagram.com/iso.regret/',
    icon: Instagram,
    external: true,
  },
  {
    label: 'Book an automotive shoot',
    detail: 'Jacksonville + Northeast Florida',
    href: '/#contact',
    icon: CalendarDays,
    external: false,
  },
]

export default function ConnectPage() {
  return (
    <main className="relative isolate min-h-[100svh] overflow-hidden px-5 pb-16 pt-28">
      <div
        className="absolute inset-0 -z-20 bg-cover bg-center"
        style={{ backgroundImage: "url('/gallery/waterfront-auto-show-2026/cover.jpg')" }}
        aria-hidden
      />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(12_11_10/0.55),rgb(12_11_10/0.82)_42%,rgb(12_11_10)_100%)]" />

      <section className="mx-auto flex w-full max-w-md flex-col items-center text-center">
        <span className="mb-6 block h-px w-12 bg-[rgb(var(--accent))]" />
        <p className="eyebrow">Ryan / Jacksonville, Florida</p>
        <h1 className="mt-4 font-display text-5xl font-semibold tracking-[0.08em] sm:text-6xl">
          ISO<span className="text-[rgb(var(--accent))]">.</span>REGRET
        </h1>
        <p className="mt-4 max-w-sm text-sm leading-6 text-[rgb(var(--text-muted))]">
          Automotive photography and film built around light, motion, and the details that make a car worth remembering.
        </p>

        <div className="mt-10 grid w-full gap-3">
          {links.map(({ label, detail, href, icon: Icon, external }) => (
            <a
              key={label}
              href={href}
              target={external ? '_blank' : undefined}
              rel={external ? 'noreferrer' : undefined}
              className="group flex items-center gap-4 border border-white/15 bg-black/50 px-5 py-4 text-left backdrop-blur-md transition hover:border-[rgb(var(--accent))]"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-[rgb(var(--accent)/0.45)] text-[rgb(var(--accent-muted))]">
                <Icon size={18} strokeWidth={1.7} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-medium text-white">{label}</span>
                <span className="mt-0.5 block text-xs text-[rgb(var(--text-subtle))]">{detail}</span>
              </span>
              <ArrowUpRight size={18} className="shrink-0 text-[rgb(var(--text-subtle))] group-hover:text-[rgb(var(--accent-muted))]" aria-hidden />
            </a>
          ))}
        </div>

        <p className="mt-10 text-xs tracking-[0.22em] text-[rgb(var(--text-subtle))]">isoregretmedia.com</p>
      </section>
    </main>
  )
}
