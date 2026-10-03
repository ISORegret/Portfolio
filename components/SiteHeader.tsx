'use client';
import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, Instagram } from 'lucide-react';
const links = [{ href: '/work', label: 'Work' }, { href: '/#about', label: 'About' }, { href: '/#contact', label: 'Let’s shoot' }];
export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  return <header className="iso-header">
    <div className="iso-header-inner"><Link href="/" className="iso-wordmark" onClick={() => setOpen(false)}>ISO<span>.</span>REGRET</Link><nav className="iso-desktop-nav" aria-label="Main navigation">{links.map(l => <Link key={l.href} href={l.href}>{l.label}</Link>)}<a href="https://instagram.com/iso.regret" target="_blank" rel="noreferrer" aria-label="ISO.Regret on Instagram"><Instagram size={19} aria-hidden /></a></nav><button type="button" className="iso-menu-button" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? 'Close menu' : 'Open menu'}>{open ? <X /> : <Menu />}</button></div>
    {open && <nav id="mobile-navigation" className="iso-mobile-nav" aria-label="Mobile navigation">{links.map(l => <Link key={l.href} href={l.href} onClick={() => setOpen(false)}>{l.label}</Link>)}<a href="https://instagram.com/iso.regret" target="_blank" rel="noreferrer">Instagram ↗</a></nav>}
  </header>;
}
