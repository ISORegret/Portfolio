'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { siteConfig } from '../app/data/site'
import SectionHeading from './SectionHeading'

export default function PricingPackages() {
  const reduce = useReducedMotion()
  const { packages } = siteConfig

  return (
    <section id="rates" className="band band-warm scroll-mt-24" aria-labelledby="rates-heading">
      <div className="shell">
        <SectionHeading index="03" eyebrow="Published pricing" title="Rates" id="rates-heading" />
        <p className="-mt-6 mb-10 max-w-2xl text-[rgb(var(--text-muted))] md:-mt-8">
          Every project is scoped to your deliverables — these tiers are a starting point. Final quote after a quick call or form.
        </p>
        <div className="grid gap-5 md:grid-cols-2">
          {packages.map((pkg, index) => (
            <motion.article
              key={pkg.name}
              initial={reduce ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '120px 0px -40px 0px' }}
              transition={{ duration: 0.45, delay: index * 0.05 }}
              className={`rate-card flex h-full flex-col border bg-bg-card p-5 md:p-7 ${
                pkg.featured ? 'border-[rgb(var(--accent))]' : 'border-[rgb(var(--border-muted))]'
              }`}
            >
              <p className="eyebrow">{pkg.name}</p>
              <p className="rate-price mt-4">{pkg.price}</p>
              <p className="mt-4 text-sm leading-relaxed text-[rgb(var(--text-muted))]">{pkg.description}</p>
              <ul className="rate-list mt-6 flex-1 text-sm text-[rgb(var(--text-muted))]">
                {pkg.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
              <a href={pkg.href} className={`btn mt-6 ${pkg.featured ? 'btn-primary' : 'btn-line'}`}>
                {pkg.cta}
              </a>
            </motion.article>
          ))}
        </div>
        <p className="mt-8 max-w-2xl text-sm leading-relaxed text-[rgb(var(--text-subtle))]">
          Deliverables: web-optimized previews on this site; full high-res and guest access via Pixieset when applicable.
          Turnaround typically 48–72 hours unless otherwise agreed.
        </p>
      </div>
    </section>
  )
}
