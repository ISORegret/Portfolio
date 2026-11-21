'use client'

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useReducedMotion } from 'framer-motion'
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
    <article id={film.slug} className="min-w-0">
      <button
        type="button"
        onClick={() => onOpen(film)}
        onMouseEnter={playPreview}
        onMouseLeave={stopPreview}
        onFocus={playPreview}
        onBlur={stopPreview}
        className="album-tile"
        aria-label={`Play ${film.title}`}
      >
        <span className="album-media is-portrait">
          <video
            ref={videoRef}
            className="album-photo absolute inset-0 h-full w-full object-cover"
            muted
            loop
            playsInline
            preload="none"
            poster={film.poster}
            aria-hidden
          >
            <source src={film.src} type="video/mp4" />
          </video>
        </span>
        <span className="album-caption">
          <span className="album-kicker">Film</span>
          <span className="album-title">{film.title}</span>
        </span>
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
      <div className="mx-auto grid max-w-3xl grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-6">
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
              <button ref={closeRef} type="button" onClick={() => setActive(null)} className="text-btn absolute right-4 top-4 text-[rgb(var(--text))]">
                Close
              </button>
              <figure className="w-full max-w-sm" onClick={(event) => event.stopPropagation()}>
                <video key={active.src} className="max-h-[80vh] w-full bg-black" controls autoPlay playsInline poster={active.poster}>
                  <source src={active.src} type="video/mp4" />
                  <a href={active.src}>Watch {active.title}</a>
                </video>
                <figcaption className="mt-4 font-display text-3xl font-medium">{active.title}</figcaption>
              </figure>
            </div>,
            document.body,
          )
        : null}
    </>
  )
}
