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
  '/': 'Home',
  '/files': 'Files',
  '/films': 'Films',
  '/work': 'Files',
  '/gallery': 'Files',
  '/blog': 'Journal',
  '/#films': 'Films',
  '/#rates': 'Rates',
  '/#spec': 'Spec your shoot',
  '/#contact': 'Spec your shoot',
  '/#about': 'Home',
  '/collections/automotive': 'Automotive',
  '/collections/real-estate': 'Real estate',
  '/collections/street': 'Street',
}

export type AlbumBackTarget = { href: string; label: string }

const DEFAULT_BACK: AlbumBackTarget = { href: '/files', label: 'Files' }

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

  if (decoded === '/work' || decoded === '/gallery') return { href: '/files', label: 'Files' }

  return {
    href: decoded,
    label: LABELS[decoded] ?? 'Back',
  }
}

/** Append `from` to an album URL when opening from a known list page. */
export function albumHrefWithFrom(slug: string, fromPath: string): string {
  const base = `/gallery/${encodeURIComponent(slug)}`
  return `${base}?from=${encodeURIComponent(fromPath)}`
}
