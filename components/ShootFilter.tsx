'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'

/**
 * The design mock's Shoots wall, exactly: 7 numbered tiles, 12-col grid —
 * wide 7, narrow 5, third 4 — STILLS/FILM tag pills, caption + gold
 * category line, and working All / Automotive / Real Estate / Events / Film
 * filters. The tiles are Ryan's real albums (covers from projects.ts);
 * the Film filter shows his two real films. No real-estate albums exist
 * in the repo, so that filter shows the honest empty state.
 */
export type MockTile = {
  n: string
  title: string
  caption: string
  cats: string[]
  span: 'wide' | 'narrow' | 'third'
  img: string
  alt: string
  tag: string
  film?: boolean
  /** Where a tap/click goes: album tiles → /gallery/<slug>, film tiles → /films#<slug>. */
  href: string
}

const filters = [
  { id: 'all', label: 'All' },
  { id: 'automotive', label: 'Automotive' },
  { id: 'realestate', label: 'Real Estate' },
  { id: 'events', label: 'Events' },
  { id: 'film', label: 'Film' },
] as const
type Filter = (typeof filters)[number]['id']

export default function ShootFilter({ tiles, films = [] }: { tiles: MockTile[]; films?: MockTile[] }) {
  const [active, setActive] = useState<Filter>('all')
  const reduce = useReducedMotion()

  const visible =
    active === 'film' ? films : active === 'all' ? tiles : tiles.filter((tile) => tile.cats.includes(active))

  return (
    <div>
      <div className="m-sec-head">
        <div>
          <span className="caps">Stills — Selected work</span>
          <h2 id="shoots-heading" className="display display-md mt-3">
            Shoots
          </h2>
        </div>
        <div className="filters" role="group" aria-label="Filter shoots">
          {filters.map((filter) => (
            <button
              key={filter.id}
              type="button"
              data-filter={filter.id}
              aria-pressed={active === filter.id}
              onClick={() => setActive(filter.id)}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {visible.length === 0 ? (
        <p className="mt-10 max-w-xl text-[rgb(var(--text-muted))]">
          No real-estate shoots on file yet — the archive holds the automotive, street and event work.{' '}
          <Link href="/files" className="text-link">
            Browse the archive
          </Link>
        </p>
      ) : (
        <div className="wall">
          {visible.map((tile, index) => (
            <motion.figure
              key={tile.title}
              className={`tile ${tile.span}`}
              data-cat={tile.cats.join(' ')}
              initial={reduce ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '80px 0px -40px 0px' }}
              transition={{ duration: 0.7, delay: (index % 3) * 0.07, ease: [0.22, 1, 0.36, 1] }}
            >
              <img src={tile.img} alt={tile.alt} loading="lazy" />
              {tile.n ? <span className="num">{tile.n}</span> : null}
              <span className={`tag${tile.film ? ' film' : ''}`}>{tile.tag}</span>
              <figcaption>
                <span className="t">{tile.title}</span>
                <span className="c">{tile.caption}</span>
              </figcaption>
              <Link href={tile.href} className="tile-link" aria-label={tile.title}>
                <span className="sr-only">{tile.title}</span>
              </Link>
            </motion.figure>
          ))}
        </div>
      )}
    </div>
  )
}
