'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { siteConfig } from '../app/data/site'

/**
 * Published rates, exactly as in the design mock:
 * Essential $150 from / Signature $650 from (featured, gold border) /
 * Cinematic $2,500 from. Three across.
 */
export default function PricingPackages() {
  const reduce = useReducedMotion()
  const { packages } = siteConfig

  return (
    <section id="rates" className="band band-ink scroll-mt-24" aria-labelledby="rates-heading">
      <div className="shell">
        <div className="m-sec-head">
          <div>
            <span className="caps">Published pricing</span>
            <h2 id="rates-heading" className="display display-md mt-3">
              Rates
            </h2>
          </div>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
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
              <p className="rate-price mt-4">
                {pkg.price}
                <small>&nbsp;{pkg.priceNote}</small>
              </p>
              <ul className="rate-list mt-6 flex-1 text-sm text-[rgb(var(--text-muted))]">
                {pkg.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
              <a href={pkg.href} className={`btn mt-6 ${pkg.featured ? 'btn-gold' : 'btn-line'}`}>
                {pkg.cta}
              </a>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
