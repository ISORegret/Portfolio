'use client';

import Image from 'next/image';
import { useState, useCallback, useEffect, useMemo } from 'react';
import { X, ChevronLeft, ChevronRight, Download, Lock } from 'lucide-react';

function downloadFilename(src: string, index: number): string {
  const path = src.split('?')[0];
  const base = path.split('/').pop();
  if (base && /\.[a-z0-9]+$/i.test(base)) return base;
  return `photo-${index + 1}.jpg`;
}

function storageKeyForSlug(slug: string): string {
  return `iso-gallery-dl:${slug}`;
}

const BLUR_DATA =
  'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/EABQQAQAAAAAAAAAAAAAAAAAAAAD/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBEQACEQAD8QDu/9k=';

type DownloadAccess = 'none' | 'open' | 'code';

type Props = {
  slug: string;
  title: string;
  images: string[];
  downloadAccess: DownloadAccess;
  downloadCode?: string;
};

export default function AlbumGallery({
  slug,
  title,
  images,
  downloadAccess,
  downloadCode,
}: Props) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [unlocked, setUnlocked] = useState(false);
  const [showCodeModal, setShowCodeModal] = useState(false);
  const [codeInput, setCodeInput] = useState('');
  const [codeError, setCodeError] = useState(false);

  const storageKey = useMemo(() => storageKeyForSlug(slug), [slug]);

  const codeRequired =
    downloadAccess === 'code' && typeof downloadCode === 'string' && downloadCode.trim().length > 0;

  const canDownload =
    downloadAccess === 'open' ||
    (codeRequired && unlocked) ||
    (downloadAccess === 'code' && !codeRequired && false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(storageKey) === '1') setUnlocked(true);
    } catch {
      /* private mode */
    }
  }, [storageKey]);

  const persistUnlock = useCallback(() => {
    try {
      sessionStorage.setItem(storageKey, '1');
    } catch {
      /* ignore */
    }
    setUnlocked(true);
    setShowCodeModal(false);
    setCodeInput('');
    setCodeError(false);
  }, [storageKey]);

  const tryCode = useCallback(() => {
    if (!downloadCode) return;
    if (codeInput.trim() === downloadCode.trim()) persistUnlock();
    else setCodeError(true);
  }, [codeInput, downloadCode, persistUnlock]);

  const openCodeModal = useCallback(() => {
    setCodeError(false);
    setCodeInput('');
    setShowCodeModal(true);
  }, []);

  const goPrev = useCallback(() => {
    setLightboxIndex((i) => (i === null ? null : i === 0 ? images.length - 1 : i - 1));
  }, [images.length]);

  const goNext = useCallback(() => {
    setLightboxIndex((i) => (i === null ? null : i === images.length - 1 ? 0 : i + 1));
  }, [images.length]);

  const close = useCallback(() => setLightboxIndex(null), []);

  const downloadCurrent = useCallback(async () => {
    if (lightboxIndex === null || !canDownload) return;
    const src = images[lightboxIndex];
    const name = downloadFilename(src, lightboxIndex);
    const absoluteUrl = new URL(src, window.location.href).href;
    try {
      const res = await fetch(absoluteUrl);
      if (!res.ok) throw new Error('fetch failed');
      const blob = await res.blob();
      const objectUrl = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = objectUrl;
      a.download = name;
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(objectUrl);
    } catch {
      window.open(absoluteUrl, '_blank', 'noopener,noreferrer');
    }
  }, [lightboxIndex, images, canDownload]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (showCodeModal) {
        if (e.key === 'Escape') setShowCodeModal(false);
        return;
      }
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightboxIndex, close, goPrev, goNext, showCodeModal]);

  const showUnlockBanner = codeRequired && !unlocked;

  return (
    <>
      {showUnlockBanner ? (
        <div className="mb-8 rounded-token-lg border border-border/60 bg-bg-elevated px-4 py-4 sm:px-5 sm:py-4">
          <p className="text-sm font-medium text-[rgb(var(--text))]">Client downloads</p>
          <p className="text-sm text-[rgb(var(--text-muted))] mt-1">
            Enter the access code you were given to enable saving photos from this album (this browser only).
          </p>
          <div className="mt-3 flex flex-col sm:flex-row gap-2 sm:items-center">
            <input
              type="password"
              autoComplete="off"
              value={codeInput}
              onChange={(e) => {
                setCodeInput(e.target.value);
                setCodeError(false);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') tryCode();
              }}
              placeholder="Access code"
              className="flex-1 max-w-xs rounded-token border border-border bg-bg px-3 py-2 text-sm text-[rgb(var(--text))] placeholder:text-[rgb(var(--text-subtle))] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              aria-invalid={codeError}
            />
            <button
              type="button"
              onClick={tryCode}
              className="rounded-token bg-accent/15 text-[rgb(var(--text))] hover:bg-accent/25 border border-border/60 px-4 py-2 text-sm font-medium transition-colors w-fit"
            >
              Unlock downloads
            </button>
          </div>
          {codeError ? (
            <p className="text-sm text-red-500/90 mt-2" role="alert">
              That code does not match. Try again or contact the photographer.
            </p>
          ) : null}
        </div>
      ) : null}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {images.map((src, i) => (
          <button
            type="button"
            key={`${src}-${i}`}
            onClick={() => setLightboxIndex(i)}
            className="aspect-[4/3] relative overflow-hidden rounded-token-lg bg-bg-elevated text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
          >
            <Image
              src={src}
              alt={`${title} — photo ${i + 1}`}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover hover:scale-105 transition-transform duration-300"
              placeholder="blur"
              unoptimized={src.includes('pixieset.com')}
              referrerPolicy="no-referrer"
              blurDataURL={BLUR_DATA}
            />
          </button>
        ))}
      </div>

      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
        >
          <div className="absolute top-4 right-4 flex items-center gap-1 z-10">
            {downloadAccess !== 'none' && (downloadAccess === 'open' || (codeRequired && unlocked)) ? (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  void downloadCurrent();
                }}
                className="p-2 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Download this photo"
              >
                <Download className="w-6 h-6" />
              </button>
            ) : null}
            {codeRequired && !unlocked ? (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  openCodeModal();
                }}
                className="p-2 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Enter access code to download"
              >
                <Lock className="w-6 h-6" />
              </button>
            ) : null}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                close();
              }}
              className="p-2 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <button
            type="button"
            onClick={goPrev}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-2 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors z-10"
            aria-label="Previous photo"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
          <button
            type="button"
            onClick={goNext}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-2 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors z-10"
            aria-label="Next photo"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
          <div
            className="absolute inset-0 cursor-pointer"
            onClick={close}
            aria-hidden
          />
          <div className="relative max-w-[90vw] max-h-[90vh] w-full h-full flex items-center justify-center p-12 z-10 pointer-events-none">
            <div className="relative w-full h-full max-w-5xl max-h-[85vh] pointer-events-auto">
              <Image
                src={images[lightboxIndex]}
                alt={`${title} — photo ${lightboxIndex + 1}`}
                fill
                className="object-contain"
                sizes="90vw"
                placeholder="blur"
                blurDataURL={BLUR_DATA}
                unoptimized={images[lightboxIndex]?.includes('pixieset.com')}
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
          <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/70 text-sm z-10">
            {lightboxIndex + 1} / {images.length}
          </p>
        </div>
      )}

      {showCodeModal ? (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Download access code"
          onClick={() => setShowCodeModal(false)}
        >
          <div
            className="w-full max-w-sm rounded-token-lg border border-border/60 bg-bg p-5 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="font-display text-lg font-semibold text-[rgb(var(--text))]">Download access</h2>
            <p className="text-sm text-[rgb(var(--text-muted))] mt-2">
              Enter the code for this album to enable downloads for this session.
            </p>
            <input
              type="password"
              autoComplete="off"
              value={codeInput}
              onChange={(e) => {
                setCodeInput(e.target.value);
                setCodeError(false);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') tryCode();
              }}
              placeholder="Access code"
              className="mt-4 w-full rounded-token border border-border bg-bg-elevated px-3 py-2 text-sm text-[rgb(var(--text))] placeholder:text-[rgb(var(--text-subtle))] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              aria-invalid={codeError}
            />
            {codeError ? (
              <p className="text-sm text-red-500/90 mt-2" role="alert">
                Code does not match.
              </p>
            ) : null}
            <div className="mt-4 flex gap-2 justify-end">
              <button
                type="button"
                onClick={() => setShowCodeModal(false)}
                className="rounded-token px-3 py-2 text-sm text-[rgb(var(--text-muted))] hover:text-[rgb(var(--text))] transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={tryCode}
                className="rounded-token bg-accent/15 text-[rgb(var(--text))] hover:bg-accent/25 border border-border/60 px-4 py-2 text-sm font-medium transition-colors"
              >
                Unlock
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
