'use client'

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import { useReducedMotion } from 'framer-motion'
import { fileLabel } from '../lib/format'

export type FilmFile = {
  slug: string
  title: string
  src: string
  poster: string
  fileNumber: number
}

function FilmCard({ film, onOpen }: { film: FilmFile; onOpen: (film: FilmFile) => void }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const reduce = useReducedMotion()

  function playPreview() {
    if (reduce) return
    const video = videoRef.current
    if (!video) return
    video.play().catch(() => {})
  }

  function stopPreview() {
    const video = videoRef.current
    if (!video) return
    video.pause()
    video.currentTime = 0
  }

  return (
    <article id={film.slug} className="min-w-0 border border-[color:var(--line-strong)] bg-bg-elevated">
      <button
        type="button"
        onClick={() => onOpen(film)}
        onMouseEnter={playPreview}
        onMouseLeave={stopPreview}
        onFocus={playPreview}
        onBlur={stopPreview}
        className="block w-full text-left"
        aria-label={`Play ${film.title}`}
      >
        <div className="relative bg-black">
          <video
            ref={videoRef}
            className="aspect-[9/16] w-full object-cover"
            muted
            loop
            playsInline
            preload="none"
            poster={film.poster}
            aria-hidden
          >
            <source src={film.src} type="video/mp4" />
          </video>
        </div>
        <div className="border-t border-[color:var(--line)] p-4">
          <p className="text-xs uppercase tracking-[0.08em] text-[rgb(var(--text-muted))]">Film</p>
          <h3 className="mt-1 text-2xl leading-snug">{film.title}</h3>
          <p className="mt-3 text-sm font-medium uppercase tracking-[0.08em] text-[rgb(var(--accent))]">Play film</p>
          <p className="mt-2 text-[0.68rem] text-[rgb(var(--text-subtle))]">No. {fileLabel(film.fileNumber)}</p>
        </div>
      </button>
    </article>
  )
}

export default function FilmGallery({ films }: { films: FilmFile[] }) {
  const [active, setActive] = useState<FilmFile | null>(null)
  const [mounted, setMounted] = useState(false)
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    if (!active) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActive(null)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previous
      window.removeEventListener('keydown', onKey)
    }
  }, [active])

  return (
    <>
      <div className="mx-auto grid max-w-3xl grid-cols-1 gap-6 sm:grid-cols-2">
        {films.map((film) => (
          <FilmCard key={film.slug} film={film} onOpen={setActive} />
        ))}
      </div>

      {mounted && active
        ? createPortal(
            <div
              className="fixed inset-0 z-[80] flex items-center justify-center bg-black/90 p-4"
              role="dialog"
              aria-modal="true"
              aria-label={active.title}
              onClick={() => setActive(null)}
            >
              <button
                ref={closeRef}
                type="button"
                onClick={() => setActive(null)}
                className="absolute right-4 top-4 inline-flex min-h-11 items-center gap-2 border border-[color:var(--line-strong)] px-4 text-base text-[rgb(var(--text))]"
              >
                <X className="h-4 w-4" aria-hidden />
                Close
              </button>
              <figure className="w-full max-w-sm" onClick={(event) => event.stopPropagation()}>
                <p className="mb-3 text-sm text-[rgb(var(--text-muted))]">Film · {active.title}</p>
                <video key={active.src} className="max-h-[80vh] w-full bg-black" controls autoPlay playsInline poster={active.poster}>
                  <source src={active.src} type="video/mp4" />
                  <a href={active.src}>Watch {active.title}</a>
                </video>
                <figcaption className="display mt-3 text-3xl">{active.title}</figcaption>
              </figure>
            </div>,
            document.body,
          )
        : null}
    </>
  )
}
