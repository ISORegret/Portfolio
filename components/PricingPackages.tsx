'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { siteConfig } from '../app/data/site';
import { Card, CardContent, CardHeader, CardTitle } from './ui';

export default function PricingPackages() {
  const { packages } = siteConfig;

  return (
    <section id="packages" className="scroll-mt-24" aria-labelledby="packages-heading">
      <div className="text-center mb-14">
        <motion.h2
          id="packages-heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-display text-3xl sm:text-4xl font-bold text-[rgb(var(--text))]"
        >
          Packages & starting rates
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-[rgb(var(--text-muted))] mt-4 text-lg max-w-2xl mx-auto"
        >
          Every project is scoped to your deliverables — these tiers are a starting point. Final quote after a quick call or form.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          className="w-16 h-0.5 bg-accent/60 mx-auto mt-6 rounded-full origin-center"
        />
      </div>

      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-8">
        {packages.map((pkg, i) => (
          <motion.div
            key={pkg.name}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
          >
            <Card
              className={`h-full flex flex-col relative overflow-hidden ${
                pkg.featured ? 'border-accent/50 shadow-glow ring-1 ring-accent/20 md:scale-[1.02]' : ''
              }`}
            >
              {pkg.featured ? (
                <div className="absolute top-0 right-0 rounded-bl-token bg-accent text-neutral-900 text-xs font-bold px-3 py-1">
                  Most booked
                </div>
              ) : null}
              <CardHeader>
                <p className="text-sm font-medium text-accent">{pkg.price}</p>
                <CardTitle className="text-xl mt-1">{pkg.name}</CardTitle>
                <p className="text-[rgb(var(--text-muted))] text-sm mt-2 leading-relaxed">{pkg.description}</p>
              </CardHeader>
              <CardContent className="pt-0 flex flex-col flex-1">
                <ul className="space-y-2.5 flex-1">
                  {pkg.bullets.map((b) => (
                    <li key={b} className="flex gap-2 text-sm text-[rgb(var(--text-muted))]">
                      <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" aria-hidden />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={pkg.href}
                  className={`mt-6 inline-flex justify-center items-center rounded-token text-center font-semibold py-3 px-4 transition-colors ${
                    pkg.featured
                      ? 'bg-accent text-neutral-900 hover:bg-accent-muted'
                      : 'border border-border bg-bg-elevated hover:bg-border/30 text-[rgb(var(--text))]'
                  }`}
                >
                  {pkg.cta}
                </a>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <p className="text-center text-sm text-[rgb(var(--text-subtle))] mt-10 max-w-2xl mx-auto">
        Deliverables: web-optimized previews on this site; full high-res and guest access via Pixieset when applicable.
        Turnaround typically 48–72 hours unless otherwise agreed.
      </p>
    </section>
  );
}
