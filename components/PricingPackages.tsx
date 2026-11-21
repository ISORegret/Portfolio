'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { siteConfig } from '../app/data/site'
import SectionHeading from './SectionHeading'

export default function PricingPackages() {
  const reduce = useReducedMotion()
  const { packages } = siteConfig

  return (
    <section id="packages" className="section scroll-mt-24" aria-labelledby="packages-heading">
      <div className="shell">
        <SectionHeading index="04" eyebrow="Starting at" title="Packages" id="packages-heading" />
        <p className="-mt-6 mb-10 max-w-2xl text-[rgb(var(--text-muted))] md:-mt-8">
          Every project is scoped to your deliverables — these tiers are a starting point. Final quote after a quick call or form.
        </p>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {packages.map((pkg, index) => (
            <motion.article
              key={pkg.name}
              initial={reduce ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.05 }}
              className={`flex h-full flex-col border bg-bg-card p-5 ${
                pkg.featured ? 'border-[rgb(var(--accent))]' : 'border-[rgb(var(--border-muted))]'
              }`}
            >
              <p className="eyebrow">Starting at</p>
              <p className="mt-3 text-sm text-[rgb(var(--accent-muted))]">{pkg.price}</p>
              <h3 className="mt-3 font-display text-[1.7rem] leading-none">{pkg.name}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[rgb(var(--text-muted))]">{pkg.description}</p>
              <ul className="mt-5 flex-1 space-y-2.5 text-sm text-[rgb(var(--text-muted))]">
                {pkg.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-2">
                    <span className="mt-2 h-px w-3 shrink-0 bg-[rgb(var(--accent))]" aria-hidden />
                    <span>{bullet}</span>
                  </li>
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
