'use client'

import { useState } from 'react'
import Link from 'next/link'

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

  const visible =
    active === 'film' ? films : active === 'all' ? tiles : tiles.filter((tile) => tile.cats.includes(active))

  return (
    <div>
      <div className="m-sec-head">
        <div>
          <span className="caps">Selected work</span>
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
          {visible.map((tile) => (
            <figure key={tile.title} className={`tile ${tile.span}`} data-cat={tile.cats.join(' ')}>
              <img src={tile.img} alt={tile.alt} loading="lazy" />
              {tile.n ? <span className="num">{tile.n}</span> : null}
              <span className={`tag${tile.film ? ' film' : ''}`}>{tile.tag}</span>
              <figcaption>
                <span className="t">{tile.title}</span>
                <span className="c">{tile.caption}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      )}
    </div>
  )
}
