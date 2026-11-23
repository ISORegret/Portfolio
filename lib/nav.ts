/**
 * Easton Chang minimal nav: one row of small-caps links, top-right —
 * Portfolio (the Stills wall) / Motion (films) / Rates / Contact.
 * The buyer-split collections (Automotive / Real Estate / Events) are
 * still reachable from the Shoots filters and the archive; the header
 * stays out of the way and lets the work lead.
 */
export const navLinks = [
  { href: '/#shoots', label: 'Portfolio' },
  { href: '/films', label: 'Motion' },
  { href: '/#rates', label: 'Rates' },
  { href: '/#contact', label: 'Contact' },
] as const

export const bookShootHref = '/#contact'

export function isNavActive(href: string, pathname: string, hash: string): boolean {
  if (href === '/#shoots') {
    return pathname === '/' && hash === '#shoots'
  }
  if (href === '/films') return pathname === '/films' || pathname.startsWith('/films/')
  if (href === '/#rates') return pathname === '/' && hash === '#rates'
  if (href === '/#contact') return pathname === '/' && (hash === '#contact' || hash === '#spec')
  return false
}
