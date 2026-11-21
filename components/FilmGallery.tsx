'use client'

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import { useReducedMotion } from 'framer-motion'
import SectionHeading from './SectionHeading'

export const films = [
  { title: 'Tilt Time', src: '/films/tilt-time.mp4', poster: '/films/tilt-time-poster.jpg' },
  { title: 'Panel Pours', src: '/films/panel-pours.mp4', poster: '/films/panel-pours-poster.jpg' },
]

type Film = (typeof films)[number]

function FilmCard({ film, onOpen }: { film: Film; onOpen: (film: Film) => void }) {
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
    <figure className="min-w-0">
      <div className="group relative overflow-hidden bg-black" onMouseEnter={playPreview} onMouseLeave={stopPreview} onFocus={playPreview} onBlur={stopPreview}>
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
          className="absolute inset-0 flex items-end bg-gradient-to-t from-black/55 via-transparent to-transparent p-4 text-left"
          aria-label={`Play ${film.title}`}
        >
          <span className="border border-white/40 bg-black/40 px-3 py-1.5 text-xs tracking-wide text-white backdrop-blur-sm">
            Play
          </span>
        </button>
      </div>
      <figcaption className="mt-4 font-display text-2xl">{film.title}</figcaption>
    </figure>
  )
}

export default function FilmGallery({ index = '02' }: { index?: string }) {
  const [active, setActive] = useState<Film | null>(null)
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
    <section id="films" className="section" aria-labelledby="films-heading">
      <div className="shell">
        <SectionHeading index={index || undefined} eyebrow="Construction in motion" title="Films" id="films-heading" />
        <div className="mx-auto grid max-w-3xl grid-cols-1 gap-10 sm:grid-cols-2">
          {films.map((film) => (
            <FilmCard key={film.src} film={film} onOpen={setActive} />
          ))}
        </div>
      </div>

      {mounted && active
        ? createPortal(
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black p-4"
          role="dialog"
          aria-modal="true"
          aria-label={active.title}
          onClick={() => setActive(null)}
        >
          <button
            ref={closeRef}
            type="button"
            onClick={() => setActive(null)}
            className="absolute right-4 top-4 grid h-11 w-11 place-items-center text-white/80 hover:text-white"
            aria-label="Close film"
          >
            <X aria-hidden />
          </button>
          <figure className="w-full max-w-sm" onClick={(event) => event.stopPropagation()}>
            <video
              key={active.src}
              className="max-h-[80vh] w-full bg-black"
              controls
              autoPlay
              playsInline
              poster={active.poster}
            >
              <source src={active.src} type="video/mp4" />
              <a href={active.src}>Watch {active.title}</a>
            </video>
            <figcaption className="mt-3 text-center text-sm text-white/80">{active.title}</figcaption>
          </figure>
        </div>,
            document.body,
          )
        : null}
    </section>
  )
}
