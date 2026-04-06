'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { siteConfig } from '../app/data/site';
import { projects } from '../app/data/projects';
import { albumHrefWithFrom } from '../lib/albumBackNavigation';

const BLUR_DATA =
  'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/EABQQAQAAAAAAAAAAAAAAAAAAAAD/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBEQACEQAD8QDu/9k=';

export default function FeaturedStrip() {
  const strip = siteConfig.featuredStripSlugs
    .map((slug) => projects.find((p) => p.slug === slug))
    .filter(Boolean) as typeof projects;

  if (strip.length === 0) return null;

  return (
    <section
      id="featured-strip"
      className="border-y border-border/50 bg-bg-elevated/30 scroll-mt-24"
      aria-label="Selected work"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-[rgb(var(--text))]">Selected work</h2>
          <p className="text-[rgb(var(--text-muted))] mt-2 text-sm sm:text-base">
            A fast scroll through recent sets — tap any frame to open the album.
          </p>
        </motion.div>
        <div className="flex gap-3 sm:gap-4 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-thin -mx-4 px-4 sm:mx-0 sm:px-0">
          {strip.map((p, i) => (
            <motion.div
              key={p.slug}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: Math.min(i * 0.04, 0.4) }}
              className="snap-start shrink-0 w-[72vw] max-w-[280px] sm:w-64 sm:max-w-none"
            >
              <Link
                href={albumHrefWithFrom(p.slug, '/#latest')}
                className="group block relative aspect-[4/5] rounded-token-lg overflow-hidden border border-border/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <Image
                  src={p.cover}
                  alt={p.title}
                  fill
                  sizes="280px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  placeholder="blur"
                  blurDataURL={BLUR_DATA}
                  unoptimized={p.cover.includes('pixieset.com')}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-90" />
                <p className="absolute bottom-0 left-0 right-0 p-3 text-sm font-medium text-white line-clamp-2">
                  {p.title}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
