/**
 * Album pages accept `?from=<encoded-path>` so "Back" returns to the real list
 * (collections, recent albums, all photos, etc.). Only same-site paths allowed.
 */

const ALLOWED = new Set([
  '/',
  '/#latest',
  '/#services',
  '/gallery',
  '/blog',
  '/collections/automotive',
  '/collections/real-estate',
  '/collections/street',
]);

const LABELS: Record<string, string> = {
  '/': 'Home',
  '/#latest': 'Recent albums',
  '/#services': 'Services',
  '/gallery': 'All photos',
  '/blog': 'Blog',
  '/collections/automotive': 'Automotive albums',
  '/collections/real-estate': 'Real Estate albums',
  '/collections/street': 'Street albums',
};

export type AlbumBackTarget = { href: string; label: string };

/** Default when `from` is missing or bad: home recent-albums strip, not the all-photos grid. */
const DEFAULT_BACK: AlbumBackTarget = { href: '/#latest', label: 'Recent albums' };

export function resolveAlbumBack(fromParam: string | string[] | undefined): AlbumBackTarget {
  const raw = Array.isArray(fromParam) ? fromParam[0] : fromParam;
  if (!raw || typeof raw !== 'string') return DEFAULT_BACK;

  let decoded: string;
  try {
    decoded = decodeURIComponent(raw.trim());
  } catch {
    return DEFAULT_BACK;
  }

  if (!ALLOWED.has(decoded)) return DEFAULT_BACK;

  return {
    href: decoded,
    label: LABELS[decoded] ?? 'Back',
  };
}

/** Append `from` to an album URL when opening from a known list page. */
export function albumHrefWithFrom(slug: string, fromPath: string): string {
  const base = `/gallery/${encodeURIComponent(slug)}`;
  return `${base}?from=${encodeURIComponent(fromPath)}`;
}
