/**
 * Album pages accept `?from=<encoded-path>` so "Back" returns to the real list.
 * Only same-site paths are allowed.
 */

const ALLOWED = new Set([
  '/',
  '/files',
  '/films',
  '/work',
  '/gallery',
  '/blog',
  '/#films',
  '/#rates',
  '/#spec',
  '/#contact',
  '/#about',
  '/collections/automotive',
  '/collections/real-estate',
  '/collections/street',
])

const LABELS: Record<string, string> = {
  '/': 'photos',
  '/files': 'photos',
  '/films': 'films',
  '/work': 'photos',
  '/gallery': 'photos',
  '/blog': 'journal',
  '/#films': 'films',
  '/#rates': 'rates',
  '/#spec': 'contact',
  '/#contact': 'contact',
  '/#about': 'about',
  '/collections/automotive': 'automotive',
  '/collections/real-estate': 'real estate',
  '/collections/street': 'street',
}

export type AlbumBackTarget = { href: string; label: string }

const DEFAULT_BACK: AlbumBackTarget = { href: '/files', label: 'photos' }

export function resolveAlbumBack(fromParam: string | string[] | undefined): AlbumBackTarget {
  const raw = Array.isArray(fromParam) ? fromParam[0] : fromParam
  if (!raw || typeof raw !== 'string') return DEFAULT_BACK

  let decoded: string
  try {
    decoded = decodeURIComponent(raw.trim())
  } catch {
    return DEFAULT_BACK
  }

  if (!ALLOWED.has(decoded)) return DEFAULT_BACK

  if (decoded === '/' || decoded === '/work' || decoded === '/gallery' || decoded === '/files') {
    return { href: '/files', label: 'photos' }
  }

  if (decoded === '/#films') return { href: '/films', label: 'films' }
  if (decoded === '/#contact' || decoded === '/#spec') return { href: '/#contact', label: 'contact' }

  return {
    href: decoded,
    label: LABELS[decoded] ?? 'photos',
  }
}

/** Append `from` to an album URL when opening from a known list page. */
export function albumHrefWithFrom(slug: string, fromPath: string): string {
  const base = `/gallery/${encodeURIComponent(slug)}`
  return `${base}?from=${encodeURIComponent(fromPath)}`
}
