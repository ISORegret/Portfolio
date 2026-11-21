'use client'

import Image from 'next/image'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { ChevronLeft, ChevronRight, Download, Lock, X } from 'lucide-react'

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

export default function AlbumGallery({ slug, title, images, downloadAccess, downloadCode }: Props) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [unlocked, setUnlocked] = useState(false)
  const [showCodeModal, setShowCodeModal] = useState(false)
  const [codeInput, setCodeInput] = useState('')
  const [codeError, setCodeError] = useState(false)
  const closeRef = useRef<HTMLButtonElement>(null)
  const triggerRef = useRef<HTMLElement | null>(null)
  const touchRef = useRef<{ x: number; y: number } | null>(null)
  const swipedRef = useRef(false)

  const storageKey = useMemo(() => storageKeyForSlug(slug), [slug])
  const codeRequired = downloadAccess === 'code' && typeof downloadCode === 'string' && downloadCode.trim().length > 0
  const canDownload = downloadAccess === 'open' || (codeRequired && unlocked)

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

  const goPrev = useCallback(() => {
    setLightboxIndex((index) => (index === null ? null : index === 0 ? images.length - 1 : index - 1))
  }, [images.length])

  const goNext = useCallback(() => {
    setLightboxIndex((index) => (index === null ? null : index === images.length - 1 ? 0 : index + 1))
  }, [images.length])

  const close = useCallback(() => {
    setLightboxIndex(null)
    triggerRef.current?.focus()
  }, [])

  const downloadCurrent = useCallback(async () => {
    if (lightboxIndex === null || !canDownload) return
    const src = images[lightboxIndex].src
    const name = downloadFilename(src, lightboxIndex)
    const absoluteUrl = new URL(src, window.location.href).href
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
  }, [lightboxIndex, images, canDownload])

  useEffect(() => {
    if (lightboxIndex === null) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    const onKey = (event: KeyboardEvent) => {
      if (showCodeModal) {
        if (event.key === 'Escape') setShowCodeModal(false)
        return
      }
      if (event.key === 'Escape') close()
      if (event.key === 'ArrowLeft') goPrev()
      if (event.key === 'ArrowRight') goNext()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previous
      window.removeEventListener('keydown', onKey)
    }
  }, [lightboxIndex, close, goPrev, goNext, showCodeModal])

  function onTouchStart(event: React.TouchEvent) {
    touchRef.current = { x: event.touches[0].clientX, y: event.touches[0].clientY }
  }

  function onTouchEnd(event: React.TouchEvent) {
    if (!touchRef.current) return
    const dx = event.changedTouches[0].clientX - touchRef.current.x
    const dy = event.changedTouches[0].clientY - touchRef.current.y
    touchRef.current = null
    if (Math.abs(dx) < 48 || Math.abs(dx) < Math.abs(dy)) return
    swipedRef.current = true
    if (dx < 0) goNext()
    else goPrev()
  }

  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const showUnlockBanner = codeRequired && !unlocked
  const current = lightboxIndex === null ? null : images[lightboxIndex]

  return (
    <>
      {showUnlockBanner ? (
        <div className="mb-8 border border-[rgb(var(--border))] bg-bg-elevated px-4 py-4 sm:px-5">
          <p className="text-sm font-medium">Client downloads</p>
          <p className="mt-1 text-sm text-[rgb(var(--text-muted))]">
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
              className="w-full max-w-xs border border-border bg-bg px-3 py-2 text-sm"
            />
            <button type="button" onClick={tryCode} className="btn btn-line btn-sm w-fit">
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

      <div className="masonry">
        {images.map((image, index) => (
          <figure key={`${image.src}-${index}`}>
            <button
              type="button"
              aria-label={`Open ${title} photo ${index + 1}`}
              onClick={(event) => {
                triggerRef.current = event.currentTarget
                setLightboxIndex(index)
              }}
              className="block w-full overflow-hidden bg-bg-elevated text-left"
            >
              <Image
                src={image.src}
                alt={`${title} — photo ${index + 1}`}
                width={image.width}
                height={image.height}
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="h-auto w-full transition duration-700 hover:scale-[1.015]"
                style={{ width: '100%', height: 'auto' }}
                priority={index < 2}
                placeholder="blur"
                blurDataURL={BLUR_DATA}
                unoptimized={image.src.includes('pixieset.com')}
                referrerPolicy="no-referrer"
              />
            </button>
          </figure>
        ))}
      </div>

      {mounted && current && lightboxIndex !== null
        ? createPortal(
        <div
          className="fixed inset-0 z-[80] bg-black"
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
          onClick={() => {
            if (swipedRef.current) {
              swipedRef.current = false
              return
            }
            close()
          }}
        >
          <div className="absolute right-3 top-3 z-10 flex items-center gap-1 sm:right-5 sm:top-5">
            {canDownload ? (
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation()
                  void downloadCurrent()
                }}
                className="grid h-11 w-11 place-items-center text-white/80 hover:text-white"
                aria-label="Download this photo"
              >
                <Download aria-hidden />
              </button>
            ) : null}
            {codeRequired && !unlocked ? (
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation()
                  setCodeError(false)
                  setCodeInput('')
                  setShowCodeModal(true)
                }}
                className="grid h-11 w-11 place-items-center text-white/80 hover:text-white"
                aria-label="Enter access code to download"
              >
                <Lock aria-hidden />
              </button>
            ) : null}
            <button
              ref={closeRef}
              type="button"
              onClick={(event) => {
                event.stopPropagation()
                close()
              }}
              className="grid h-11 w-11 place-items-center text-white/80 hover:text-white"
              aria-label="Close"
            >
              <X aria-hidden />
            </button>
          </div>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation()
              goPrev()
            }}
            className="absolute left-2 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center text-white/80 hover:text-white sm:left-4"
            aria-label="Previous photo"
          >
            <ChevronLeft className="h-7 w-7" aria-hidden />
          </button>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation()
              goNext()
            }}
            className="absolute right-2 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center text-white/80 hover:text-white sm:right-4"
            aria-label="Next photo"
          >
            <ChevronRight className="h-7 w-7" aria-hidden />
          </button>

          <div
            className="flex h-full items-center justify-center px-12 pb-24 pt-16 sm:px-20"
            onClick={(event) => event.stopPropagation()}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            <div className="relative h-full w-full">
              <Image
                key={current.src}
                src={current.src}
                alt={`${title} — photo ${lightboxIndex + 1}`}
                fill
                className="object-contain"
                sizes="100vw"
                priority
                placeholder="blur"
                blurDataURL={BLUR_DATA}
                unoptimized={current.src.includes('pixieset.com')}
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/70 to-transparent px-6 pb-6 pt-16 text-center">
            <p className="text-sm text-white/75">{title}</p>
            <p className="mt-1 font-display text-2xl text-white" aria-live="polite">
              {lightboxIndex + 1}
              <span className="text-white/45"> / {images.length}</span>
            </p>
          </div>
        </div>,
            document.body,
          )
        : null}

      {mounted && showCodeModal
        ? createPortal(
        <div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-black/70 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Download access code"
          onClick={() => setShowCodeModal(false)}
        >
          <div className="w-full max-w-sm border border-[rgb(var(--border))] bg-bg p-5" onClick={(event) => event.stopPropagation()}>
            <h2 className="font-display text-3xl">Download access</h2>
            <p className="mt-2 text-sm text-[rgb(var(--text-muted))]">Enter the code for this album to enable downloads for this session.</p>
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
              className="mt-4 w-full border border-border bg-bg-elevated px-3 py-2 text-sm"
            />
            {codeError ? (
              <p className="mt-2 text-sm text-red-300" role="alert">
                Code does not match.
              </p>
            ) : null}
            <div className="mt-4 flex justify-end gap-2">
              <button type="button" onClick={() => setShowCodeModal(false)} className="btn btn-line btn-sm">
                Cancel
              </button>
              <button type="button" onClick={tryCode} className="btn btn-primary btn-sm">
                Unlock
              </button>
            </div>
          </div>
        </div>,
            document.body,
          )
        : null}
    </>
  )
}
