/**
 * Navigation split by buyer, not by medium.
 * Collections that exist: automotive, real-estate, street.
 * There is no dedicated events collection, so Events points at the
 * full archive (/files) — event shoots (car shows, meets) live there
 * under Automotive.
 */
export const navLinks = [
  { href: '/collections/automotive', label: 'Automotive' },
  { href: '/collections/real-estate', label: 'Real Estate' },
  { href: '/files', label: 'Events' },
  { href: '/films', label: 'Films' },
  { href: '/#rates', label: 'Rates' },
  { href: '/#contact', label: 'Contact' },
] as const

export const bookShootHref = '/#contact'

export function isNavActive(href: string, pathname: string, hash: string): boolean {
  if (href === '/collections/automotive') {
    return pathname === '/collections/automotive'
  }
  if (href === '/collections/real-estate') {
    return pathname === '/collections/real-estate'
  }
  if (href === '/files') {
    return (
      pathname === '/files' ||
      pathname.startsWith('/gallery') ||
      (pathname.startsWith('/collections') &&
        pathname !== '/collections/automotive' &&
        pathname !== '/collections/real-estate') ||
      pathname === '/work'
    )
  }
  if (href === '/films') return pathname === '/films' || pathname.startsWith('/films/')
  if (href === '/#rates') return pathname === '/' && hash === '#rates'
  if (href === '/#contact') return pathname === '/' && (hash === '#contact' || hash === '#spec')
  return false
}
