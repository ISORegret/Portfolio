'use client';

import { Camera, Instagram } from 'lucide-react';

export default function SiteHeader() {
  return (
    <div className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-neutral-950/70 border-b border-neutral-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Make the logo go HOME */}
        <a href="/" className="flex items-center gap-2 font-semibold tracking-wide">
          <Camera className="w-5 h-5" />
          <span>ISO.Regret</span>
        </a>

        {/* On non-home pages, section hashes won’t work.
            So point to anchors on the home page using "/#..." */}
        <nav className="hidden sm:flex items-center gap-6 text-sm">
          <a href="/" className="hover:text-white/90">Home</a>
          <a href="/#services" className="hover:text-white/90">Services</a>
          <a href="/#collections" className="hover:text-white/90">Collections</a>
          <a href="/#latest" className="hover:text-white/90">Latest</a>
          <a href="/#about" className="hover:text-white/90">About</a>
          <a href="/#contact" className="hover:text-white/90">Contact</a>
          <a href="https://instagram.com/iso.regret" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2">
            <Instagram className="w-4 h-4" /> <span>Instagram</span>
          </a>
        </nav>
      </div>
    </div>
  );
}
