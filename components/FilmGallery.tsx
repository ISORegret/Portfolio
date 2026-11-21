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
    <article id={film.slug} className="min-w-0 border border-[color:var(--line)] bg-bg-elevated">
      <p className="border-b border-[color:var(--line)] px-3 py-2 text-[0.68rem] uppercase tracking-[0.12em] text-[rgb(var(--text-muted))]">
        File nº {fileLabel(film.fileNumber)} / Film
      </p>
      <div className="relative bg-black" onMouseEnter={playPreview} onMouseLeave={stopPreview} onFocus={playPreview} onBlur={stopPreview}>
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
        <button
          type="button"
          onClick={() => onOpen(film)}
          className="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 via-transparent to-transparent p-4 text-left"
          aria-label={`Play ${film.title}`}
        >
          <span className="file-tag">Play</span>
        </button>
      </div>
      <h3 className="display px-3 py-4 text-3xl">{film.title}</h3>
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
                className="absolute right-4 top-4 grid h-11 w-11 place-items-center border border-[color:var(--line-strong)] text-[rgb(var(--text))]"
                aria-label="Close film"
              >
                <X aria-hidden />
              </button>
              <figure className="w-full max-w-sm" onClick={(event) => event.stopPropagation()}>
                <p className="mb-3 text-[0.68rem] uppercase tracking-[0.12em] text-[rgb(var(--text-muted))]">
                  File nº {fileLabel(active.fileNumber)} / Film
                </p>
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
