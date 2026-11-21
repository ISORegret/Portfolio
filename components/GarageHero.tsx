'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { albumHrefWithFrom } from '../lib/albumBackNavigation'
import { fileLabel, formatDotDate, formatShortDate } from '../lib/format'
import { floorRate } from '../lib/quote'

export type HeroFile = {
  slug: string
  title: string
  category: string
  date?: string
  fileNumber: number
  cover: string
  blurb?: string
  location?: string
  specs: { label: string; value: string }[]
}

type Props = {
  files: HeroFile[]
}

export default function GarageHero({ files }: Props) {
  const reduce = useReducedMotion()
  const [activeSlug, setActiveSlug] = useState(files[0]?.slug ?? '')
  const swapped = useRef(false)
  const listRef = useRef<HTMLDivElement>(null)
  const active = files.find((file) => file.slug === activeSlug) ?? files[0]

  if (!active) return null

  const meta = [
    `File nº ${fileLabel(active.fileNumber)}`,
    formatDotDate(active.date),
    active.location,
  ]
    .filter(Boolean)
    .join(' — ')

  function select(slug: string) {
    swapped.current = true
    setActiveSlug(slug)
  }

  function onListKey(event: React.KeyboardEvent<HTMLDivElement>) {
    const current = files.findIndex((file) => file.slug === active.slug)
    if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp' && event.key !== 'Home' && event.key !== 'End') return
    event.preventDefault()
    let next = current
    if (event.key === 'ArrowDown') next = Math.min(files.length - 1, current + 1)
    if (event.key === 'ArrowUp') next = Math.max(0, current - 1)
    if (event.key === 'Home') next = 0
    if (event.key === 'End') next = files.length - 1
    const file = files[next]
    if (!file) return
    select(file.slug)
    const option = listRef.current?.querySelector<HTMLButtonElement>(`#file-option-${file.fileNumber}`)
    option?.focus()
  }

  const href = albumHrefWithFrom(active.slug, '/')

  return (
    <section className="garage-hero" aria-label="Latest file">
      <div className="garage-photo">
        <Image
          key={active.cover}
          src={active.cover}
          alt={`${active.title}. ${active.blurb ?? active.category}`}
          fill
          priority={!swapped.current}
          sizes="(min-width: 900px) 58vw, 100vw"
          className={`object-cover ${reduce ? '' : 'frame-fade'}`}
        />
        <p className="file-tag absolute left-4 top-4 md:left-5 md:top-5">
          File nº {fileLabel(active.fileNumber)} / {active.category}
        </p>
      </div>

      <div className="garage-side">
        <div className="garage-head">
          <p className="text-[0.72rem] uppercase tracking-[0.14em] text-[rgb(var(--text-muted))]">{meta}</p>
          <h1 className="sr-only">ISO.Regret garage index</h1>
          <h2 className="display">
            <Link href={href} className="hover:text-[rgb(var(--accent))]">
              {active.title}
            </Link>
          </h2>
          {active.blurb ? <p className="garage-blurb">{active.blurb}</p> : null}
        </div>

        <dl className="spec-grid">
          {active.specs.map((spec) => (
            <div key={spec.label}>
              <dt>
                <span>{spec.label}</span>
              </dt>
              <dd>
                <strong>{spec.value}</strong>
              </dd>
            </div>
          ))}
        </dl>

        <div
          ref={listRef}
          className="garage-index"
          role="listbox"
          aria-label="Recent files"
          onKeyDown={onListKey}
        >
          {files.map((file) => {
            const selected = file.slug === active.slug
            return (
              <button
                key={file.slug}
                id={`file-option-${file.fileNumber}`}
                type="button"
                role="option"
                aria-selected={selected}
                tabIndex={selected ? 0 : -1}
                className="file-row"
                onMouseEnter={() => select(file.slug)}
                onFocus={() => select(file.slug)}
                onClick={() => select(file.slug)}
              >
                <span>{fileLabel(file.fileNumber)}</span>
                <span className="file-title">{file.title}</span>
                <span className="file-cat">{file.category}</span>
                <span>{selected ? '→' : formatShortDate(file.date)}</span>
              </button>
            )
          })}
        </div>
        <Link href="/files" className="file-row border-t border-[color:var(--line-strong)]">
          <span>All</span>
          <span className="file-title">Full index</span>
          <span className="file-cat" />
          <span>→</span>
        </Link>

        <div className="hero-cta">
          <Link href="/#spec">Spec your shoot →</Link>
          <span>{floorRate()}</span>
        </div>
        <p className="sr-only" aria-live="polite">
          Showing file {fileLabel(active.fileNumber)}, {active.title}
        </p>
      </div>
    </section>
  )
}
