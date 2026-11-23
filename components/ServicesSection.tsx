import Image from 'next/image'
import Link from 'next/link'
import SectionHeading from './SectionHeading'
import Reveal from './Reveal'

type Service = {
  index: string
  name: string
  summary: string
  deliverables: string[]
  turnaround: string
  href: string
  linkLabel: string
  image?: string
  imageAlt?: string
  note?: string
}

const services: Service[] = [
  {
    index: '01',
    name: 'Automotive',
    summary:
      'Automotive photography and short-form video for owners, events, and brands across Jacksonville and Northeast Florida.',
    deliverables: [
      'One car, a small meet, or a tight creative set',
      'Web and social files, plus a gallery',
      'High-res or extended time added as needed',
    ],
    turnaround: 'Typically delivered within 5 days.',
    href: '/collections/automotive',
    linkLabel: 'View automotive work',
    image: '/gallery/blue-mustang/s550-roller-front.webp',
    imageAlt: 'S650 Mustang GT Premium rolling automotive photography in Jacksonville, Florida — ISO.Regret',
  },
  {
    index: '02',
    name: 'Real estate',
    summary: 'MLS-ready stills. Luxury homes, and homes with more rooms, usually land higher in the range.',
    deliverables: [
      'Interiors, exteriors, and key details',
      'Sized for MLS and marketing',
      'Blue-hour or twilight add-ons optional',
    ],
    turnaround: 'Typically delivered within 5 days, aligned with your closing needs.',
    href: '/collections/real-estate',
    linkLabel: 'View real estate work',
    note: 'Real Estate projects — Coming Soon.',
  },
  {
    index: '03',
    name: 'Events',
    summary: 'Car shows, long events, or coverage that needs breadth from open to close.',
    deliverables: [
      'Full event narrative and hero moments',
      'High volume, organized delivery',
      'Reels and vertical clips available',
    ],
    turnaround: 'Typically delivered within 5 days.',
    href: '/gallery/waterfront-auto-show-2026',
    linkLabel: 'View a show set',
    image: '/gallery/waterfront-auto-show-2026/cover.jpg',
    imageAlt: 'Waterfront Auto Show 2026 — St. Marys, GA',
  },
  {
    index: '04',
    name: 'Video',
    summary: 'Short-form video for owners, events, and brands. Reels and vertical clips are available.',
    deliverables: ['Optional short video add-ons', 'Reels and vertical clips', 'Quote after scope'],
    turnaround: 'Films typically delivered within 10 days unless otherwise agreed.',
    href: '/#films',
    linkLabel: 'Watch the films',
    image: '/films/tilt-time-poster.jpg',
    imageAlt: 'Tilt Time — a construction film still',
  },
]

export default function ServicesSection() {
  return (
    <section id="services" className="section" aria-labelledby="services-heading">
      <div className="shell">
        <SectionHeading index="03" eyebrow="What the work covers" title="Services" id="services-heading" />
        <div>
          {services.map((service, index) => (
            <Reveal key={service.name}>
              <article className="grid items-center gap-8 border-t border-[rgb(var(--border-muted))] py-12 lg:grid-cols-2 lg:gap-16 lg:py-16">
                <div className={index % 2 === 1 ? 'lg:order-2' : undefined}>
                  {service.image ? (
                    <Link href={service.href} className="group relative block aspect-[4/5] overflow-hidden bg-bg-elevated">
                      <Image
                        src={service.image}
                        alt={service.imageAlt ?? service.name}
                        fill
                        unoptimized={!service.image.startsWith('/gallery/')}
                        sizes="(min-width: 1024px) 40vw, 100vw"
                        className="object-cover transition duration-700 group-hover:scale-[1.03]"
                      />
                    </Link>
                  ) : (
                    <div className="flex aspect-[4/5] items-end bg-bg-elevated p-8">
                      <div>
                        <p className="eyebrow">Portfolio</p>
                        <p className="display mt-4 text-5xl">Coming soon.</p>
                        <p className="mt-4 max-w-xs text-sm leading-relaxed text-[rgb(var(--text-muted))]">{service.note}</p>
                      </div>
                    </div>
                  )}
                </div>
                <div>
                  <p className="font-display text-sm tracking-[0.18em] text-[rgb(var(--accent))]">{service.index}</p>
                  <h3 className="display mt-3 text-5xl md:text-6xl">{service.name}</h3>
                  <p className="mt-5 max-w-md text-base leading-relaxed text-[rgb(var(--text-muted))]">{service.summary}</p>
                  <ul className="mt-6 space-y-2 text-sm leading-relaxed text-[rgb(var(--text))]">
                    {service.deliverables.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span className="mt-2 h-px w-4 shrink-0 bg-[rgb(var(--accent))]" aria-hidden />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-6 text-sm text-[rgb(var(--text-muted))]">{service.turnaround}</p>
                  <Link href={service.href} className="btn-text mt-4">
                    {service.linkLabel}
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
