'use client';

import { Camera, Instagram } from 'lucide-react';
import BackToTop from './BackToTop';

export default function SiteFooter() {
  return (
    <>
      <footer className="mt-24 border-t border-border/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-2.5 font-display font-semibold text-[rgb(var(--text))]">
              <Camera className="w-5 h-5 text-accent" aria-hidden />
              <span>ISO.Regret</span>
            </div>
            <nav className="flex items-center gap-6 text-sm text-[rgb(var(--text-muted))]">
              <a href="/#services" className="hover:text-[rgb(var(--text))] transition-colors">Services</a>
              <a href="/#collections" className="hover:text-[rgb(var(--text))] transition-colors">Collections</a>
              <a href="/#latest" className="hover:text-[rgb(var(--text))] transition-colors">Latest</a>
              <a href="/blog" className="hover:text-[rgb(var(--text))] transition-colors">Blog</a>
              <a href="/gallery" className="hover:text-[rgb(var(--text))] transition-colors">Gallery</a>
              <a href="/#about" className="hover:text-[rgb(var(--text))] transition-colors">About</a>
              <a href="/#contact" className="hover:text-[rgb(var(--text))] transition-colors">Contact</a>
            </nav>
          </div>
          <div className="mt-8 pt-8 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-[rgb(var(--text-muted))]">
            <p>© {new Date().getFullYear()} ISO.Regret · Jacksonville, FL</p>
            <a
              href="https://instagram.com/iso.regret"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-accent hover:text-accent-muted transition-colors"
            >
              <Instagram className="w-4 h-4" />
              @iso.regret
            </a>
          </div>
        </div>
      </footer>
      <BackToTop />
    </>
  );
}
