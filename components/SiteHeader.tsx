'use client';

import { useState } from 'react';
import { Instagram, Menu, X } from 'lucide-react';

const links=[{href:'/work',label:'Work'},{href:'/#work',label:'Selected'},{href:'/#contact',label:'Contact'}];

export default function SiteHeader(){
 const [open,setOpen]=useState(false);
 return <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/55 text-white backdrop-blur-xl">
  <div className="mx-auto flex h-16 max-w-[1500px] items-center justify-between px-5 sm:px-10 lg:px-16">
   <a href="/" className="font-display text-lg font-bold uppercase tracking-[-.03em]">ISO<span className="text-[#d3272e]">.</span>REGRET</a>
   <nav className="hidden items-center gap-8 text-xs font-semibold uppercase tracking-[.16em] text-white/65 sm:flex">
    {links.map(l=><a key={l.href} href={l.href} className="transition hover:text-white">{l.label}</a>)}
    <a href="https://instagram.com/iso.regret" target="_blank" rel="noreferrer" aria-label="Instagram" className="text-white transition hover:text-[#d3272e]"><Instagram className="h-4 w-4"/></a>
   </nav>
   <button className="sm:hidden" onClick={()=>setOpen(!open)} aria-label="Toggle menu">{open?<X/>:<Menu/>}</button>
  </div>
  {open&&<nav className="border-t border-white/10 bg-black/90 px-5 py-4 sm:hidden">{links.map(l=><a key={l.href} href={l.href} onClick={()=>setOpen(false)} className="block py-3 text-sm font-semibold uppercase tracking-[.15em] text-white/75">{l.label}</a>)}</nav>}
 </header>
}
