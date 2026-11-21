'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import { albumHrefWithFrom } from '../lib/albumBackNavigation'
import { fileLabel, formatDotDate, formatShortDate, yearOf } from '../lib/format'

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

const categories = ['All', 'Automotive', 'Real Estate', 'Street', 'Film'] as const

type SortMode = 'newest' | 'oldest' | 'number'

export default function FileBrowser({ files }: { files: BrowserFile[] }) {
  const [category, setCategory] = useState<(typeof categories)[number]>('All')
  const [year, setYear] = useState('All')
  const [sort, setSort] = useState<SortMode>('newest')
  const [view, setView] = useState<'list' | 'grid'>('list')

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
          <label className="block text-[0.72rem] uppercase tracking-[0.1em] text-[rgb(var(--text-muted))]">
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
          <label className="block text-[0.72rem] uppercase tracking-[0.1em] text-[rgb(var(--text-muted))]">
            Sort
            <select
              value={sort}
              onChange={(event) => setSort(event.target.value as SortMode)}
              className="mt-2 block min-h-11 border border-[color:var(--line)] bg-bg-elevated px-3 text-[rgb(var(--text))]"
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="number">File number</option>
            </select>
          </label>
          <div className="ml-auto flex gap-2" role="group" aria-label="View">
            <button type="button" className="choice" aria-pressed={view === 'list'} onClick={() => setView('list')}>
              List
            </button>
            <button type="button" className="choice" aria-pressed={view === 'grid'} onClick={() => setView('grid')}>
              Grid
            </button>
          </div>
        </div>
      </div>

      <p className="py-3 text-[0.72rem] uppercase tracking-[0.1em] text-[rgb(var(--text-muted))]" aria-live="polite">
        {visible.length} {visible.length === 1 ? 'file' : 'files'}
      </p>

      {visible.length === 0 ? (
        <p className="border border-[color:var(--line)] bg-bg-elevated px-4 py-8 text-[0.82rem] leading-relaxed text-[rgb(var(--text-muted))]">
          {category === 'Real Estate' ? 'Real Estate projects — Coming Soon.' : 'No files in this filter.'}
        </p>
      ) : view === 'list' ? (
        <div className="border-t border-[color:var(--line-strong)]">
          {visible.map((file) => (
            <Link
              key={file.slug}
              href={file.kind === 'photo' ? albumHrefWithFrom(file.slug, '/files') : file.href}
              className="file-row"
            >
              <span>{fileLabel(file.fileNumber)}</span>
              <span className="file-title">{file.title}</span>
              <span className="file-cat">{file.category}</span>
              <span>{formatShortDate(file.date) ?? '—'}</span>
            </Link>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((file, index) => (
            <Link
              key={file.slug}
              href={file.kind === 'photo' ? albumHrefWithFrom(file.slug, '/files') : file.href}
              className="group block border border-[color:var(--line)] bg-bg-elevated"
            >
              <div className="relative aspect-[4/3] bg-black">
                <Image
                  src={file.cover}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                  priority={index < 2}
                />
              </div>
              <div className="border-t border-[color:var(--line)] px-3 py-3">
                <p className="text-[0.68rem] uppercase tracking-[0.12em] text-[rgb(var(--accent))]">
                  File nº {fileLabel(file.fileNumber)} / {file.category}
                </p>
                <h2 className="mt-2 text-[0.85rem] uppercase leading-snug tracking-[0.04em] group-hover:text-[rgb(var(--accent))]">
                  {file.title}
                </h2>
                <p className="mt-2 text-[0.68rem] uppercase tracking-[0.08em] text-[rgb(var(--text-muted))]">
                  {formatDotDate(file.date) ?? 'Date not on file'}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
