'use client';

import { useState } from 'react';
import { Instagram, Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from './ThemeProvider';

const navLinks = [
  { href: '/work', label: 'Work' },
  { href: '/#services', label: 'Services' },
  { href: '/#about', label: 'About' },
];

export default function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-bg/80 backdrop-blur-xl supports-[backdrop-filter]:bg-bg/70">
      <div className="max-w-[1600px] mx-auto px-5 sm:px-10 lg:px-16 h-[72px] flex items-center justify-between">
        <a
          href="/"
          className="flex items-center gap-2.5 font-display font-semibold tracking-tight text-[rgb(var(--text))] hover:text-accent transition-colors"
        >
          <span className="text-xl font-black uppercase tracking-[-0.06em]">ISO<span className="text-accent">.</span>Regret</span>
        </a>

        <nav className="hidden sm:flex items-center gap-6 lg:gap-8 text-sm text-[rgb(var(--text-muted))]">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="hover:text-[rgb(var(--text))] transition-colors">
              {link.label}
            </a>
          ))}
          <a
            href="/#contact"
            className="bg-accent text-neutral-900 hover:bg-accent-muted px-5 py-2.5 text-xs uppercase tracking-wider font-bold transition-colors shadow-soft"
          >
            Book
          </a>
          <button
            type="button"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-token text-[rgb(var(--text-muted))] hover:text-[rgb(var(--text))] hover:bg-bg-elevated transition-colors"
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
          className="sm:hidden p-2 rounded-token text-[rgb(var(--text-muted))] hover:text-[rgb(var(--text))] hover:bg-bg-elevated transition-colors"
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
