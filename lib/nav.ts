export const navLinks = [
  { href: '/files', label: 'Photos' },
  { href: '/films', label: 'Films' },
  { href: '/#about', label: 'About' },
  { href: '/#contact', label: 'Contact' },
] as const

export const bookShootHref = '/#contact'

export function isNavActive(href: string, pathname: string, hash: string): boolean {
  if (href === '/files') {
    return (
      pathname === '/files' ||
      pathname.startsWith('/gallery') ||
      pathname.startsWith('/collections') ||
      pathname === '/work'
    )
  }
  if (href === '/films') return pathname === '/films' || pathname.startsWith('/films/')
  if (href === '/#about') return pathname === '/' && hash === '#about'
  if (href === '/#contact') return pathname === '/' && (hash === '#contact' || hash === '#spec')
  return false
}
