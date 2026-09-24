'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowDownRight, ArrowRight, Instagram, Mail } from 'lucide-react';
import { projects } from './data/projects';

const project = (slug:string) => projects.find(p => p.slug === slug)!;
const mustang=project('blue-mustang');
const macan=project('green-macan');
const event=projects.find(p => p.slug === 'caffeine-octane-jacksonville') || projects.find(p => p.slug === 'waterfront-auto-show-2026')!;
const more=projects.filter(p=>![mustang.slug,macan.slug,event.slug].includes(p.slug)).slice(0,5);

function Label({children}:{children:React.ReactNode}) {
 return <span className="text-[10px] font-semibold uppercase tracking-[.3em] text-white/45">{children}</span>;
}

export default function Page(){
 return <div className="bg-[#070707] text-white selection:bg-white selection:text-black">
  <section className="relative min-h-[100svh]">
   <Image src="/gallery/blue-mustang/blue-mustang-roller.jpg" alt="S550 Mustang GT by ISO.Regret" fill priority sizes="100vw" className="object-cover"/>
   <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80"/>
   <div className="absolute bottom-0 left-0 right-0 mx-auto max-w-[1600px] px-5 pb-10 sm:px-10 lg:px-16 lg:pb-14">
    <Label>Jacksonville · Florida</Label>
    <h1 className="mt-3 font-display text-[clamp(3.7rem,11vw,10rem)] font-bold uppercase leading-[.78] tracking-[-.065em]">ISO<span className="text-white/35">.</span>REGRET</h1>
    <div className="mt-7 flex items-end justify-between gap-8 border-t border-white/25 pt-5">
     <p className="max-w-lg text-sm leading-6 text-white/65 sm:text-base">Automotive photography and motion. Built around the car, the location and the light.</p>
     <a href="#featured" className="hidden items-center gap-2 text-xs font-semibold uppercase tracking-[.18em] sm:flex">Selected work <ArrowDownRight className="h-4 w-4"/></a>
    </div>
   </div>
  </section>

  <main id="featured">
   <section className="mx-auto max-w-[1600px] px-5 py-24 sm:px-10 lg:px-16 lg:py-36">
    <div className="grid items-end gap-8 lg:grid-cols-[.36fr_1fr]">
     <div className="pb-3 lg:pb-14">
      <Label>01 · Personal</Label>
      <h2 className="mt-4 font-display text-5xl font-bold uppercase leading-[.86] tracking-[-.055em] sm:text-7xl lg:text-8xl">2018<br/>Macan<br/><span className="text-white/35">GTS</span></h2>
      <p className="mt-6 max-w-xs text-sm leading-6 text-white/50">Golden-hour Porsche study. Shape, reflections and details without overworking the frame.</p>
      <Link href={'/gallery/'+macan.slug} className="mt-7 inline-flex items-center gap-2 border-b border-white/30 pb-1 text-xs font-semibold uppercase tracking-[.18em]">View story <ArrowRight className="h-3.5 w-3.5"/></Link>
     </div>
     <Link href={'/gallery/'+macan.slug} className="group relative aspect-[4/3] overflow-hidden lg:aspect-[16/10]">
      <Image src="/gallery/green-macan/05-sunset-three-quarter.webp" alt={macan.title} fill sizes="(min-width:1024px) 70vw,100vw" className="object-cover transition duration-1000 group-hover:scale-[1.015]"/>
     </Link>
    </div>
    <div className="mt-4 grid grid-cols-[1.15fr_.85fr] gap-4 sm:ml-[24%]">
     <div className="relative aspect-[16/10] overflow-hidden"><Image src="/gallery/green-macan/04-side-profile-forest.webp" alt="" fill sizes="60vw" className="object-cover"/></div>
     <div className="relative aspect-[4/5] overflow-hidden"><Image src="/gallery/green-macan/22-sunset-wheel-vertical.webp" alt="" fill sizes="35vw" className="object-cover"/></div>
    </div>
   </section>

   <section className="overflow-hidden border-y border-white/10 bg-[#0b0b0b] py-24 lg:py-36">
    <div className="mx-auto max-w-[1600px] px-5 sm:px-10 lg:px-16">
     <div className="mb-9 flex items-end justify-between">
      <div><Label>02 · Street / Motion</Label><h2 className="mt-3 font-display text-5xl font-bold uppercase tracking-[-.05em] sm:text-7xl">S550 Mustang GT</h2></div>
      <span className="hidden text-8xl font-bold tracking-[-.08em] text-white/[.035] lg:block">S550</span>
     </div>
     <Link href={'/gallery/'+mustang.slug} className="group block">
      <div className="relative aspect-[16/8] min-h-[330px] overflow-hidden">
       <Image src="/gallery/blue-mustang/s550-roller-front.webp" alt={mustang.title} fill sizes="100vw" className="object-cover transition duration-1000 group-hover:scale-[1.015]"/>
      </div>
     </Link>
     <div className="mt-4 grid grid-cols-12 gap-4">
      <div className="relative col-span-5 aspect-[4/5] overflow-hidden sm:col-span-4"><Image src="/gallery/blue-mustang/s550-front-detail.webp" alt="" fill sizes="34vw" className="object-cover"/></div>
      <div className="relative col-span-7 mt-12 aspect-[3/2] overflow-hidden sm:col-span-6 sm:col-start-7 sm:mt-20"><Image src="/gallery/blue-mustang/s550-rear-sunset.webp" alt="" fill sizes="55vw" className="object-cover"/></div>
     </div>
     <div className="mt-8 flex justify-end"><Link href={'/gallery/'+mustang.slug} className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[.18em]">Explore the full set <ArrowRight className="h-4 w-4"/></Link></div>
    </div>
   </section>

   <section className="mx-auto max-w-[1600px] px-5 py-24 sm:px-10 lg:px-16 lg:py-36">
    <div className="grid gap-10 lg:grid-cols-[.42fr_1fr]">
     <div className="lg:sticky lg:top-28 lg:self-start">
      <Label>03 · Event coverage</Label>
      <h2 className="mt-4 font-display text-4xl font-bold uppercase leading-[.9] tracking-[-.045em] sm:text-6xl">{event.title}</h2>
      <p className="mt-6 max-w-sm text-sm leading-6 text-white/50">{event.blurb}</p>
      <Link href={'/gallery/'+encodeURIComponent(event.slug)} className="mt-7 inline-flex items-center gap-2 border-b border-white/30 pb-1 text-xs font-semibold uppercase tracking-[.18em]">Open coverage <ArrowRight className="h-3.5 w-3.5"/></Link>
     </div>
     <div className="grid grid-cols-2 gap-3">
      {(event.images||[]).slice(0,6).map((src,i)=><div key={src} className={'relative overflow-hidden '+(i===0?'col-span-2 aspect-[16/9]':i===3?'col-span-2 aspect-[16/7]':'aspect-[4/5]')}><Image src={src} alt="" fill sizes={i===0||i===3?'70vw':'35vw'} className="object-cover"/></div>)}
     </div>
    </div>
   </section>

   <section className="border-t border-white/10 py-20 lg:py-28">
    <div className="mx-auto max-w-[1600px] px-5 sm:px-10 lg:px-16">
     <div className="mb-8 flex items-end justify-between"><div><Label>Archive</Label><h2 className="mt-3 font-display text-3xl font-bold uppercase tracking-[-.035em] sm:text-5xl">More work</h2></div><Link href="/work" className="text-xs font-semibold uppercase tracking-[.18em] text-white/55">View all →</Link></div>
     <div className="-mx-5 flex snap-x gap-3 overflow-x-auto px-5 pb-4 sm:-mx-10 sm:px-10 lg:-mx-16 lg:px-16">
      {more.map((p,i)=><Link href={'/gallery/'+encodeURIComponent(p.slug)} key={p.slug} className="group min-w-[72vw] snap-start sm:min-w-[42vw] lg:min-w-[29vw]">
       <div className="relative aspect-[3/2] overflow-hidden"><Image src={p.cover} alt={p.title} fill sizes="40vw" className="object-cover transition duration-700 group-hover:scale-[1.02]"/></div>
       <div className="mt-3 flex items-start justify-between gap-4"><div><p className="text-[9px] uppercase tracking-[.2em] text-white/35">{String(i+4).padStart(2,'0')} · {p.category}</p><h3 className="mt-1 font-display text-xl font-semibold">{p.title}</h3></div><ArrowRight className="mt-1 h-4 w-4 text-white/35"/></div>
      </Link>)}
     </div>
    </div>
   </section>

   <section id="contact" className="border-t border-white/10 bg-white text-black">
    <div className="mx-auto grid max-w-[1600px] gap-12 px-5 py-20 sm:px-10 lg:grid-cols-[1fr_.55fr] lg:px-16 lg:py-28">
     <h2 className="font-display text-5xl font-bold uppercase leading-[.85] tracking-[-.055em] sm:text-7xl lg:text-8xl">Your car.<br/>My camera.<br/><span className="text-black/25">Let’s make it.</span></h2>
     <div className="flex flex-col justify-end gap-5">
      <a href="mailto:Brickel.Ryan@icloud.com" className="flex items-center gap-3 border-b border-black/20 pb-4 font-semibold"><Mail className="h-4 w-4"/>Brickel.Ryan@icloud.com</a>
      <a href="https://instagram.com/iso.regret" target="_blank" rel="noreferrer" className="flex items-center gap-3 border-b border-black/20 pb-4 font-semibold"><Instagram className="h-4 w-4"/>@iso.regret</a>
      <p className="text-sm text-black/55">Jacksonville, Florida · Available for automotive shoots, events and brand work.</p>
     </div>
    </div>
   </section>
  </main>
 </div>
}
