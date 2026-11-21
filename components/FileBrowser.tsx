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
      <div className="shell flex flex-col gap-6">
        <div className="flex flex-wrap gap-x-5 gap-y-1" role="group" aria-label="Filter by category">
          {categories.map((item) => (
            <button key={item} type="button" className="choice" aria-pressed={category === item} onClick={() => setCategory(item)}>
              {item}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap items-end gap-8">
          <label className="block min-w-[9rem] text-[rgb(var(--text-subtle))]">
            <span className="eyebrow">Year</span>
            <select value={year} onChange={(event) => setYear(event.target.value)} className="line-control">
              {years.map((item) => (
                <option key={item} value={item}>
                  {item === 'All' ? 'All years' : item}
                </option>
              ))}
            </select>
          </label>
          <label className="block min-w-[9rem] text-[rgb(var(--text-subtle))]">
            <span className="eyebrow">Sort</span>
            <select value={sort} onChange={(event) => setSort(event.target.value as SortMode)} className="line-control">
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="number">Number</option>
            </select>
          </label>
        </div>
        <p className="eyebrow" aria-live="polite">
          {visible.length} {visible.length === 1 ? 'gallery' : 'galleries'}
        </p>
      </div>

      {visible.length === 0 ? (
        <p className="shell py-16 text-sm leading-relaxed text-[rgb(var(--text-muted))]">
          {category === 'Real Estate' ? 'Real Estate projects — Coming Soon.' : 'Nothing in this filter.'}
        </p>
      ) : (
        <div className="album-grid mt-8">
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
