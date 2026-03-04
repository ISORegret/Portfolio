'use client';

import { Camera, Instagram } from 'lucide-react';

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-bg/80 backdrop-blur-xl supports-[backdrop-filter]:bg-bg/70">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <a
          href="/"
          className="flex items-center gap-2.5 font-display font-semibold tracking-tight text-[rgb(var(--text))] hover:text-accent transition-colors"
        >
          <Camera className="w-5 h-5 text-accent" aria-hidden />
          <span>ISO.Regret</span>
        </a>

        <nav className="hidden sm:flex items-center gap-8 text-sm text-[rgb(var(--text-muted))]">
          <a href="/" className="hover:text-[rgb(var(--text))] transition-colors">Home</a>
          <a href="/#services" className="hover:text-[rgb(var(--text))] transition-colors">Services</a>
          <a href="/#collections" className="hover:text-[rgb(var(--text))] transition-colors">Collections</a>
          <a href="/#latest" className="hover:text-[rgb(var(--text))] transition-colors">Latest</a>
          <a href="/#about" className="hover:text-[rgb(var(--text))] transition-colors">About</a>
          <a href="/#contact" className="hover:text-[rgb(var(--text))] transition-colors">Contact</a>
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
      </div>
    </header>
  );
}
