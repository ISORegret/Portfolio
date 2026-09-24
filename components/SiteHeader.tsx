'use client';

import { useState } from 'react';
import { Instagram, Menu, X, Sun, Moon } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useTheme } from './ThemeProvider';

const navLinks = [
  { href: '/work', label: 'Work' },
  { href: '/#services', label: 'Services' },
  { href: '/#about', label: 'About' },
];

export default function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const isHome = pathname === '/';

  return (
    <header className={`${isHome ? 'absolute' : 'sticky'} top-0 z-50 w-full ${isHome ? 'border-b border-white/10 bg-black/20 backdrop-blur-md' : 'border-b border-border/60 bg-bg/80 backdrop-blur-xl supports-[backdrop-filter]:bg-bg/70'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <a
          href="/"
          className="font-display text-lg sm:text-xl font-bold tracking-[0.18em] text-white hover:text-accent transition-colors"
        >
          <span>ISO<span className="text-accent">.</span>REGRET</span>
        </a>

        <nav className={`hidden sm:flex items-center gap-6 lg:gap-8 text-sm ${isHome ? 'text-white/75' : 'text-[rgb(var(--text-muted))]'}`}>
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className={`${isHome ? 'hover:text-white' : 'hover:text-[rgb(var(--text))]'} transition-colors`}>
              {link.label}
            </a>
          ))}
          <a
            href="/#contact"
            className="rounded-token border border-accent/70 bg-accent/10 text-accent hover:bg-accent hover:text-neutral-950 px-4 py-2 text-sm font-semibold transition-colors"
          >
            Book
          </a>
          <button
            type="button"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className={`p-2 rounded-token ${isHome ? 'text-white/70 hover:text-white hover:bg-white/10' : 'text-[rgb(var(--text-muted))] hover:text-[rgb(var(--text))] hover:bg-bg-elevated'} transition-colors`}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <a
            href="https://instagram.com/iso.regret"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-accent hover:text-accent-muted transition-colors"
          >
            <Instagram className="w-4 h-4" aria-hidden />
            <span>Instagram</span>
          </a>
        </nav>

        <button
          type="button"
          onClick={() => setMobileOpen((o) => !o)}
          className={`sm:hidden p-2 rounded-token ${isHome ? 'text-white/80 hover:text-white hover:bg-white/10' : 'text-[rgb(var(--text-muted))] hover:text-[rgb(var(--text))] hover:bg-bg-elevated'} transition-colors`}
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="sm:hidden border-t border-border/60 bg-bg/95 backdrop-blur-xl">
          <nav className="max-w-6xl mx-auto px-4 py-4 flex flex-col gap-1 text-sm">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="py-3 px-3 rounded-token text-[rgb(var(--text-muted))] hover:text-[rgb(var(--text))] hover:bg-bg-elevated transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="/#contact"
              onClick={() => setMobileOpen(false)}
              className="py-3 px-3 rounded-token bg-accent text-neutral-900 font-semibold text-center hover:bg-accent-muted transition-colors"
            >
              Book a shoot
            </a>
            <button
              type="button"
              onClick={() => { setTheme(theme === 'dark' ? 'light' : 'dark'); setMobileOpen(false); }}
              className="py-3 px-3 rounded-token text-[rgb(var(--text-muted))] hover:bg-bg-elevated flex items-center gap-2"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              {theme === 'dark' ? 'Light mode' : 'Dark mode'}
            </button>
            <a
              href="https://instagram.com/iso.regret"
              target="_blank"
              rel="noreferrer"
              onClick={() => setMobileOpen(false)}
              className="py-3 px-3 rounded-token text-accent hover:bg-accent/10 transition-colors inline-flex items-center gap-2"
            >
              <Instagram className="w-4 h-4" />
              Instagram
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
