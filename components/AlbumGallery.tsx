'use client'

import Image from 'next/image'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { ChevronLeft, ChevronRight, Download, Lock } from 'lucide-react'
import { useReducedMotion } from 'framer-motion'

function downloadFilename(src: string, index: number): string {
  const path = src.split('?')[0]
  const base = path.split('/').pop()
  if (base && /\.[a-z0-9]+$/i.test(base)) return base
  return `photo-${index + 1}.jpg`
}

function storageKeyForSlug(slug: string): string {
  return `iso-gallery-dl:${slug}`
}

const BLUR_DATA =
  'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/EABQQAQAAAAAAAAAAAAAAAAAAAAD/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBEQACEQAD8QDu/9k='

type DownloadAccess = 'none' | 'open' | 'code'

export type GalleryImage = {
  src: string
  width: number
  height: number
}

type Props = {
  slug: string
  title: string
  images: GalleryImage[]
  downloadAccess: DownloadAccess
  downloadCode?: string
}

function pad(value: number) {
  return String(value).padStart(2, '0')
}

export default function AlbumGallery({ slug, title, images, downloadAccess, downloadCode }: Props) {
  const reduce = useReducedMotion()
  const [index, setIndex] = useState(0)
  const [mode, setMode] = useState<'frame' | 'grid'>('grid')
  const [unlocked, setUnlocked] = useState(false)
  const [showCodeModal, setShowCodeModal] = useState(false)
  const [codeInput, setCodeInput] = useState('')
  const [codeError, setCodeError] = useState(false)
  const [mounted, setMounted] = useState(false)
  const touchRef = useRef<{ x: number; y: number } | null>(null)
  const railRef = useRef<HTMLDivElement>(null)

  const storageKey = useMemo(() => storageKeyForSlug(slug), [slug])
  const codeRequired = downloadAccess === 'code' && typeof downloadCode === 'string' && downloadCode.trim().length > 0
  const canDownload = downloadAccess === 'open' || (codeRequired && unlocked)
  const current = images[index]

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    try {
      if (sessionStorage.getItem(storageKey) === '1') setUnlocked(true)
    } catch {
      /* private mode */
    }
  }, [storageKey])

  const persistUnlock = useCallback(() => {
    try {
      sessionStorage.setItem(storageKey, '1')
    } catch {
      /* ignore */
    }
    setUnlocked(true)
    setShowCodeModal(false)
    setCodeInput('')
    setCodeError(false)
  }, [storageKey])

  const tryCode = useCallback(() => {
    if (!downloadCode) return
    if (codeInput.trim() === downloadCode.trim()) persistUnlock()
    else setCodeError(true)
  }, [codeInput, downloadCode, persistUnlock])

  const go = useCallback(
    (next: number) => {
      if (images.length === 0) return
      const wrapped = (next + images.length) % images.length
      setIndex(wrapped)
      setMode('frame')
    },
    [images.length],
  )

  const goPrev = useCallback(() => go(index - 1), [go, index])
  const goNext = useCallback(() => go(index + 1), [go, index])

  const downloadCurrent = useCallback(async () => {
    if (!current || !canDownload) return
    const name = downloadFilename(current.src, index)
    const absoluteUrl = new URL(current.src, window.location.href).href
    try {
      const res = await fetch(absoluteUrl)
      if (!res.ok) throw new Error('fetch failed')
      const blob = await res.blob()
      const objectUrl = URL.createObjectURL(blob)
      const anchor = document.createElement('a')
      anchor.href = objectUrl
      anchor.download = name
      anchor.style.display = 'none'
      document.body.appendChild(anchor)
      anchor.click()
      document.body.removeChild(anchor)
      URL.revokeObjectURL(objectUrl)
    } catch {
      window.open(absoluteUrl, '_blank', 'noopener,noreferrer')
    }
  }, [current, canDownload, index])

  useEffect(() => {
    if (mode !== 'frame') return
    const onKey = (event: KeyboardEvent) => {
      const target = event.target
      if (target instanceof HTMLElement) {
        const tag = target.tagName
        if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || target.isContentEditable) return
      }
      if (showCodeModal) {
        if (event.key === 'Escape') setShowCodeModal(false)
        return
      }
      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        go(index - 1)
      }
      if (event.key === 'ArrowRight') {
        event.preventDefault()
        go(index + 1)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [mode, go, index, showCodeModal])

  useEffect(() => {
    const rail = railRef.current
    const thumb = rail?.querySelector<HTMLElement>('[aria-current="true"]')
    if (!rail || !thumb) return
    if (rail.scrollHeight > rail.clientHeight + 8) {
      rail.scrollTop = Math.max(0, thumb.offsetTop - rail.clientHeight / 2 + thumb.offsetHeight / 2)
    } else {
      rail.scrollLeft = Math.max(0, thumb.offsetLeft - rail.clientWidth / 2 + thumb.offsetWidth / 2)
    }
  }, [index, mode])

  function onTouchStart(event: React.TouchEvent) {
    touchRef.current = { x: event.touches[0].clientX, y: event.touches[0].clientY }
  }

  function onTouchEnd(event: React.TouchEvent) {
    if (!touchRef.current) return
    const dx = event.changedTouches[0].clientX - touchRef.current.x
    const dy = event.changedTouches[0].clientY - touchRef.current.y
    touchRef.current = null
    if (Math.abs(dx) < 48 || Math.abs(dx) < Math.abs(dy)) return
    if (dx < 0) goNext()
    else goPrev()
  }

  if (!current) {
    return <p className="text-[0.82rem] text-[rgb(var(--text-muted))]">No photos on file for this album.</p>
  }

  const progress = `${((index + 1) / images.length) * 100}%`

  return (
    <div>
      {codeRequired && !unlocked ? (
        <div className="shell mb-8">
          <p className="eyebrow">Client downloads</p>
          <p className="mt-2 text-[0.78rem] leading-relaxed text-[rgb(var(--text-muted))]">
            Enter the access code you were given to enable saving photos from this album (this browser only).
          </p>
          <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center">
            <input
              type="password"
              autoComplete="off"
              value={codeInput}
              onChange={(event) => {
                setCodeInput(event.target.value)
                setCodeError(false)
              }}
              onKeyDown={(event) => {
                if (event.key === 'Enter') tryCode()
              }}
              placeholder="Access code"
              aria-label="Access code"
              aria-invalid={codeError}
              className="line-control max-w-xs"
            />
            <button type="button" onClick={tryCode} className="text-btn is-accent">
              Unlock downloads
            </button>
          </div>
          {codeError ? (
            <p className="mt-2 text-sm text-red-300" role="alert">
              That code does not match. Try again or contact the photographer.
            </p>
          ) : null}
        </div>
      ) : null}

      <div className="shell mb-3 flex flex-wrap items-center justify-between gap-3">
        <p className="eyebrow">{mode === 'frame' ? 'Arrow keys and swipe' : 'Gallery'}</p>
        <div className="flex gap-5" role="group" aria-label="Gallery view">
          <button type="button" className="choice" aria-pressed={mode === 'grid'} onClick={() => setMode('grid')}>
            Grid
          </button>
          <button type="button" className="choice" aria-pressed={mode === 'frame'} onClick={() => setMode('frame')}>
            One frame
          </button>
        </div>
      </div>

      {mode === 'frame' ? (
        <div className="frame-stage">
          <div>
            <div
              className="frame-fit"
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
            >
              <Image
                key={current.src}
                src={current.src}
                alt={`${title} — photo ${index + 1} of ${images.length}`}
                width={current.width}
                height={current.height}
                sizes="(min-width: 1024px) 72vw, 100vw"
                className={reduce ? undefined : 'frame-fade'}
                priority={index === 0}
                placeholder="blur"
                blurDataURL={BLUR_DATA}
                unoptimized={current.src.includes('pixieset.com')}
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="frame-bar px-4 pb-4 sm:px-6">
              <div>
                <p className="frame-count" aria-live="polite">
                  {pad(index + 1)} <span className="text-[rgb(var(--text-subtle))]">/ {pad(images.length)}</span>
                </p>
                <div className="frame-line" aria-hidden>
                  <span style={{ width: progress }} />
                </div>
              </div>
              <p className="hidden text-[0.72rem] uppercase tracking-[0.08em] text-[rgb(var(--text-muted))] sm:block">{title}</p>
              <div className="flex items-center gap-2 justify-self-start sm:justify-self-end">
                <button type="button" className="text-btn" onClick={goPrev} aria-label="Previous photo">
                  <ChevronLeft className="h-4 w-4" aria-hidden />
                  Prev
                </button>
                <button type="button" className="text-btn" onClick={goNext} aria-label="Next photo">
                  Next
                  <ChevronRight className="h-4 w-4" aria-hidden />
                </button>
                {canDownload ? (
                  <button type="button" className="text-btn" onClick={() => void downloadCurrent()}>
                    <Download className="h-4 w-4" aria-hidden />
                    Download
                  </button>
                ) : null}
                {codeRequired && !unlocked ? (
                  <button
                    type="button"
                    className="text-btn"
                    onClick={() => {
                      setCodeError(false)
                      setCodeInput('')
                      setShowCodeModal(true)
                    }}
                  >
                    <Lock className="h-4 w-4" aria-hidden />
                    Enter code
                  </button>
                ) : null}
              </div>
            </div>
          </div>
          <div className="frame-rail" ref={railRef} aria-label="Frames">
            {images.map((image, imageIndex) => (
              <button
                key={`${image.src}-d-${imageIndex}`}
                type="button"
                aria-current={imageIndex === index}
                aria-label={`Photo ${imageIndex + 1}`}
                onClick={() => setIndex(imageIndex)}
              >
                <Image src={image.src} alt="" width={136} height={92} className="h-full w-full object-cover" sizes="68px" />
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="photo-grid">
          {images.map((image, imageIndex) => (
            <figure key={`${image.src}-g-${imageIndex}`}>
              <button type="button" className="block w-full" onClick={() => go(imageIndex)} aria-label={`Open photo ${imageIndex + 1} in the frame viewer`}>
                <Image
                  src={image.src}
                  alt={`${title} — photo ${imageIndex + 1} of ${images.length}`}
                  width={image.width}
                  height={image.height}
                  sizes="(min-width: 1100px) 33vw, (min-width: 700px) 50vw, 100vw"
                  className="h-auto w-full"
                  style={{ width: '100%', height: 'auto' }}
                  placeholder="blur"
                  blurDataURL={BLUR_DATA}
                  unoptimized={image.src.includes('pixieset.com')}
                  referrerPolicy="no-referrer"
                />
              </button>
            </figure>
          ))}
        </div>
      )}

      {mounted && showCodeModal
        ? createPortal(
            <div
              className="fixed inset-0 z-[90] flex items-center justify-center bg-black/80 p-4"
              role="dialog"
              aria-modal="true"
              aria-label="Download access code"
              onClick={() => setShowCodeModal(false)}
            >
              <div className="w-full max-w-sm bg-[rgb(var(--bg))] px-1 py-6" onClick={(event) => event.stopPropagation()}>
                <h2 className="font-display text-4xl font-medium">Download access</h2>
                <p className="mt-3 text-[0.78rem] leading-relaxed text-[rgb(var(--text-muted))]">
                  Enter the code for this album to enable downloads for this session.
                </p>
                <input
                  type="password"
                  autoComplete="off"
                  value={codeInput}
                  onChange={(event) => {
                    setCodeInput(event.target.value)
                    setCodeError(false)
                  }}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') tryCode()
                  }}
                  placeholder="Access code"
                  aria-label="Access code"
                  aria-invalid={codeError}
                  className="line-control mt-4"
                />
                {codeError ? (
                  <p className="mt-2 text-sm text-red-300" role="alert">
                    Code does not match.
                  </p>
                ) : null}
                <div className="mt-4 flex justify-end gap-2">
                  <button type="button" onClick={() => setShowCodeModal(false)} className="text-btn">
                    Cancel
                  </button>
                  <button type="button" onClick={tryCode} className="text-btn is-accent">
                    Unlock
                  </button>
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}
    </div>
  )
}
