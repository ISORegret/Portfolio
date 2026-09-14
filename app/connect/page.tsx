import type { Metadata } from 'next'
import { ArrowUpRight, CalendarDays, Images, Instagram } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Connect',
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
    <main className="relative isolate min-h-[78vh] overflow-hidden px-5 py-16 sm:py-24">
      <div
        className="absolute inset-0 -z-20 bg-cover bg-center"
        style={{ backgroundImage: "url('/gallery/waterfront-auto-show-2026/cover.jpg')" }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(8,8,10,.46),rgba(8,8,10,.9)_48%,rgb(10,10,12)_100%)]" />

      <section className="mx-auto flex w-full max-w-md flex-col items-center text-center">
        <div className="mb-6 h-px w-16 bg-amber-400" />
        <p className="font-sans text-xs font-semibold uppercase tracking-[0.34em] text-zinc-300">
          Ryan / Jacksonville, Florida
        </p>
        <h1 className="mt-3 font-display text-5xl font-bold uppercase leading-none tracking-[-0.06em] text-white sm:text-6xl">
          ISO<span className="text-amber-400">.</span>Regret
        </h1>
        <p className="mt-4 max-w-sm text-sm leading-6 text-zinc-300">
          Automotive photography and film built around light, motion, and the details that make a car worth remembering.
        </p>

        <div className="mt-10 grid w-full gap-3">
          {links.map(({ label, detail, href, icon: Icon, external }) => (
            <a
              key={label}
              href={href}
              target={external ? '_blank' : undefined}
              rel={external ? 'noreferrer' : undefined}
              className="group flex items-center gap-4 rounded-2xl border border-white/15 bg-black/55 px-5 py-4 text-left shadow-2xl backdrop-blur-md transition hover:-translate-y-0.5 hover:border-amber-400/60 hover:bg-black/70"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-amber-400/40 bg-amber-400/10 text-amber-300">
                <Icon size={20} strokeWidth={1.8} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-display text-base font-semibold uppercase tracking-wide text-white">
                  {label}
                </span>
                <span className="mt-0.5 block text-xs text-zinc-400">{detail}</span>
              </span>
              <ArrowUpRight
                size={18}
                className="shrink-0 text-zinc-500 transition group-hover:text-amber-300"
                aria-hidden="true"
              />
            </a>
          ))}
        </div>

        <p className="mt-10 text-[11px] uppercase tracking-[0.28em] text-zinc-500">
          isoregretmedia.com
        </p>
      </section>
    </main>
  )
}
