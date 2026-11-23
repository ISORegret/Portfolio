'use client'

import { useState } from 'react'
import Link from 'next/link'
import AlbumCard from './AlbumCard'

export type ShootTile = {
  href: string
  title: string
  category: string
  cover: string
  location?: string
  /** True for show/meet albums (Waterfront, Caffeine & Octane, showcases). */
  event: boolean
  kind: 'photo' | 'film'
}

const filters = ['All', 'Automotive', 'Real Estate', 'Events', 'Film'] as const
type Filter = (typeof filters)[number]

export default function ShootFilter({ photos, films }: { photos: ShootTile[]; films: ShootTile[] }) {
  const [active, setActive] = useState<Filter>('All')

  const tiles: ShootTile[] =
    active === 'Film'
      ? films
      : active === 'All'
        ? photos
        : active === 'Automotive'
          ? photos.filter((tile) => tile.category === 'Automotive')
          : active === 'Real Estate'
            ? photos.filter((tile) => tile.category === 'Real Estate')
            : photos.filter((tile) => tile.event)

  return (
    <div>
      <div className="shoot-pills" role="group" aria-label="Filter shoots">
        {filters.map((filter) => (
          <button
            key={filter}
            type="button"
            className={`shoot-pill${active === filter ? ' is-active' : ''}`}
            aria-pressed={active === filter}
            onClick={() => setActive(filter)}
          >
            {filter}
          </button>
        ))}
      </div>

      {tiles.length === 0 ? (
        <p className="mt-10 max-w-xl text-[rgb(var(--text-muted))]">
          No real-estate shoots on file yet — the archive holds the automotive, street and event work.{' '}
          <Link href="/files" className="text-link">
            Browse the archive
          </Link>
        </p>
      ) : (
        <div className="album-grid mt-10 md:mt-14">
          {tiles.map((tile, index) => (
            <AlbumCard
              key={tile.href}
              href={tile.href}
              title={tile.title}
              category={tile.category}
              cover={tile.cover}
              location={tile.location}
              index={index + 1}
              badge={tile.kind === 'film' ? 'Film' : 'Stills'}
              showDate={false}
              priority={index < 3}
            />
          ))}
        </div>
      )}
    </div>
  )
}
