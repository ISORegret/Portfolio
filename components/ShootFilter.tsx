'use client'

import { useState } from 'react'

/**
 * The design mock's Shoots wall, exactly: 7 numbered tiles (stand-ins
 * holding the layout), 12-col grid — wide 7, narrow 5, third 4 —
 * STILLS/FILM tag pills, caption + gold category line, and working
 * All / Automotive / Real Estate / Events / Film filters.
 * Images live in public/mock/ (decoded from .b64 at build time).
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

export default function ShootFilter({ tiles }: { tiles: MockTile[] }) {
  const [active, setActive] = useState<Filter>('all')

  const visible = active === 'all' ? tiles : tiles.filter((tile) => tile.cats.includes(active))

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

      <div className="wall">
        {visible.map((tile) => (
          <figure key={tile.n} className={`tile ${tile.span}`} data-cat={tile.cats.join(' ')}>
            <img src={tile.img} alt={tile.alt} loading="lazy" />
            <span className="num">{tile.n}</span>
            <span className={`tag${tile.film ? ' film' : ''}`}>{tile.tag}</span>
            <figcaption>
              <span className="t">{tile.title}</span>
              <span className="c">{tile.caption}</span>
            </figcaption>
          </figure>
        ))}
      </div>
      <p className="standin">
        Frames 02–07 are stand-in photography holding the layout — your own shoots drop straight into the same slots.
      </p>
    </div>
  )
}
