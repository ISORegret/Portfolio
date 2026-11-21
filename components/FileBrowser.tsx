'use client'

import { useMemo, useState } from 'react'
import AlbumCard from './AlbumCard'
import { albumHrefWithFrom } from '../lib/albumBackNavigation'
import { yearOf } from '../lib/format'

export type BrowserFile = {
  kind: 'photo' | 'film'
  slug: string
  title: string
  category: string
  date?: string
  fileNumber: number
  cover: string
  href: string
}

const categoryOrder = ['Automotive', 'Real Estate', 'Street', 'Film'] as const

type SortMode = 'newest' | 'oldest' | 'number'

export default function FileBrowser({ files }: { files: BrowserFile[] }) {
  const [category, setCategory] = useState('All')
  const [year, setYear] = useState('All')
  const [sort, setSort] = useState<SortMode>('newest')

  const categories = useMemo(() => {
    const found = new Set(files.map((file) => file.category))
    return ['All', ...categoryOrder.filter((item) => found.has(item))]
  }, [files])

  const years = useMemo(() => {
    const found = new Set<string>()
    files.forEach((file) => {
      const yearValue = yearOf(file.date)
      if (yearValue) found.add(yearValue)
    })
    return ['All', ...Array.from(found).sort((a, b) => b.localeCompare(a))]
  }, [files])

  const visible = useMemo(() => {
    const filtered = files.filter((file) => {
      if (category !== 'All' && file.category !== category) return false
      if (year !== 'All' && yearOf(file.date) !== year) return false
      return true
    })
    const dated = (file: BrowserFile) => file.date ?? ''
    filtered.sort((a, b) => {
      if (sort === 'number') return a.fileNumber - b.fileNumber
      if (sort === 'oldest') return dated(a).localeCompare(dated(b)) || a.fileNumber - b.fileNumber
      return dated(b).localeCompare(dated(a)) || b.fileNumber - a.fileNumber
    })
    return filtered
  }, [files, category, year, sort])

  return (
    <div>
      <div className="flex flex-col gap-4 border-y border-[color:var(--line-strong)] py-4">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
          {categories.map((item) => (
            <button key={item} type="button" className="choice" aria-pressed={category === item} onClick={() => setCategory(item)}>
              {item}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap items-end gap-4">
          <label className="block text-sm text-[rgb(var(--text-muted))]">
            Year
            <select
              value={year}
              onChange={(event) => setYear(event.target.value)}
              className="mt-2 block min-h-11 border border-[color:var(--line)] bg-bg-elevated px-3 text-[rgb(var(--text))]"
            >
              {years.map((item) => (
                <option key={item} value={item}>
                  {item === 'All' ? 'All years' : item}
                </option>
              ))}
            </select>
          </label>
          <label className="block text-sm text-[rgb(var(--text-muted))]">
            Sort
            <select
              value={sort}
              onChange={(event) => setSort(event.target.value as SortMode)}
              className="mt-2 block min-h-11 border border-[color:var(--line)] bg-bg-elevated px-3 text-[rgb(var(--text))]"
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="number">Number</option>
            </select>
          </label>
        </div>
      </div>

      <p className="py-3 text-sm text-[rgb(var(--text-muted))]" aria-live="polite">
        {visible.length} {visible.length === 1 ? 'gallery' : 'galleries'}
      </p>

      {visible.length === 0 ? (
        <p className="border border-[color:var(--line)] bg-bg-elevated px-4 py-8 text-sm leading-relaxed text-[rgb(var(--text-muted))]">
          {category === 'Real Estate' ? 'Real Estate projects — Coming Soon.' : 'Nothing in this filter.'}
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((file, index) => (
            <AlbumCard
              key={file.slug}
              href={file.kind === 'photo' ? albumHrefWithFrom(file.slug, '/files') : file.href}
              title={file.title}
              category={file.category}
              cover={file.cover}
              date={file.date}
              fileNumber={file.fileNumber}
              priority={index < 3}
            />
          ))}
        </div>
      )}
    </div>
  )
}
