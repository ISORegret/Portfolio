'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Instagram, Mail, MapPin } from 'lucide-react';
import { projects } from './data/projects';

const picks = ['blue-mustang','green-macan','caffeine-octane-jacksonville','waterfront-auto-show-2026']
  .map((slug) => projects.find((p) => p.slug === slug))
  .filter(Boolean);

export default function Page() {
  return (
    <div className="editorial-home bg-[#080808] text-white">
      <section className="relative min-h-[100svh] overflow-hidden">
        <Image
          src="/gallery/blue-mustang/blue-mustang-roller.jpg"
          alt="S550 Mustang GT photographed by ISO.Regret"
          fill priority sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/90" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-[1500px] px-5 pb-12 sm:px-10 sm:pb-16 lg:px-16 lg:pb-20">
          <motion.p initial={{opacity:0,y:14}} animate={{opacity:1,y:0}} transition={{duration:.7}}
            className="mb-4 text-xs font-semibold uppercase tracking-[.32em] text-white/70">
            Jacksonville, Florida · Automotive Photography
          </motion.p>
          <motion.h1 initial={{opacity:0,y:25}} animate={{opacity:1,y:0}} transition={{duration:.8,delay:.1}}
            className="max-w-5xl font-display text-[clamp(3.6rem,10vw,9rem)] font-bold uppercase leading-[.78] tracking-[-.06em]">
            ISO<br/><span className="text-[#d3272e]">Regret</span>
          </motion.h1>
          <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{duration:.8,delay:.35}}
            className="mt-8 flex flex-wrap items-center gap-5">
            <a href="#work" className="inline-flex items-center gap-2 border border-white/30 bg-black/20 px-5 py-3 text-sm font-semibold backdrop-blur-md transition hover:bg-white hover:text-black">
              View selected work <ArrowRight className="h-4 w-4"/>
            </a>
            <a href="#contact" className="text-sm font-semibold text-white/80 transition hover:text-white">Available for shoots →</a>
          </motion.div>
        </div>
      </section>

      <main>
        <section id="work" className="mx-auto max-w-[1500px] px-5 py-24 sm:px-10 lg:px-16 lg:py-32">
          <div className="mb-12 flex items-end justify-between gap-6 border-b border-white/15 pb-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[.28em] text-[#d3272e]">Portfolio</p>
              <h2 className="mt-3 font-display text-4xl font-bold uppercase tracking-[-.04em] sm:text-6xl">Selected work</h2>
            </div>
            <Link href="/work" className="hidden items-center gap-2 text-sm text-white/60 transition hover:text-white sm:flex">All albums <ArrowRight className="h-4 w-4"/></Link>
          </div>

          <div className="space-y-16 lg:space-y-24">
            {picks.map((p:any, i) => (
              <motion.article key={p.slug} initial={{opacity:0,y:35}} whileInView={{opacity:1,y:0}} viewport={{once:true,margin:'-80px'}} transition={{duration:.65}}
                className={i % 2 ? 'lg:ml-[16%]' : 'lg:mr-[16%]'}>
                <Link href={'/gallery/'+encodeURIComponent(p.slug)} className="group block">
                  <div className={'relative overflow-hidden bg-neutral-900 ' + (i===0 ? 'aspect-[16/9]' : i===1 ? 'aspect-[3/2]' : 'aspect-[16/10]')}>
                    <Image src={p.cover} alt={p.title} fill sizes="(min-width:1024px) 84vw,100vw" className="object-cover transition duration-700 group-hover:scale-[1.025]"/>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent opacity-70"/>
                    <span className="absolute bottom-4 right-4 border border-white/25 bg-black/25 px-3 py-2 text-[10px] font-semibold uppercase tracking-[.22em] backdrop-blur-md">Open album</span>
                  </div>
                  <div className="mt-5 flex items-start justify-between gap-5">
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[.24em] text-[#d3272e]">{p.category}</p>
                      <h3 className="mt-2 font-display text-2xl font-semibold tracking-[-.025em] sm:text-4xl">{p.title}</h3>
                    </div>
                    <ArrowRight className="mt-2 h-5 w-5 text-white/50 transition group-hover:translate-x-1 group-hover:text-white"/>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
          <Link href="/work" className="mt-14 inline-flex items-center gap-2 border-b border-white/40 pb-1 text-sm font-semibold sm:hidden">All albums <ArrowRight className="h-4 w-4"/></Link>
        </section>

        <section className="border-y border-white/10 bg-[#0d0d0d]">
          <div className="mx-auto grid max-w-[1500px] gap-10 px-5 py-20 sm:px-10 lg:grid-cols-[1.2fr_.8fr] lg:px-16 lg:py-28">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[.28em] text-[#d3272e]">The work</p>
              <h2 className="mt-4 max-w-3xl font-display text-4xl font-bold uppercase leading-[.95] tracking-[-.04em] sm:text-6xl">Cars should look as good in the frame as they feel from the driver’s seat.</h2>
            </div>
            <div className="self-end text-base leading-7 text-white/60 sm:text-lg">
              <p>Automotive photography and video built around motion, light, paint and the details owners obsess over. Individual shoots, rolling sets, meets and brand content across Northeast Florida.</p>
              <a href="#contact" className="mt-7 inline-flex items-center gap-2 font-semibold text-white">Plan a shoot <ArrowRight className="h-4 w-4"/></a>
            </div>
          </div>
        </section>

        <section id="contact" className="mx-auto max-w-[1500px] px-5 py-24 sm:px-10 lg:px-16 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[.28em] text-[#d3272e]">Bookings</p>
              <h2 className="mt-4 font-display text-5xl font-bold uppercase leading-[.9] tracking-[-.05em] sm:text-7xl">Have a car?<br/>Let’s shoot it.</h2>
            </div>
            <div className="flex flex-col justify-end gap-5 text-white/70">
              <a href="mailto:Brickel.Ryan@icloud.com" className="flex items-center gap-3 border-b border-white/15 pb-4 text-lg transition hover:text-white"><Mail className="h-5 w-5 text-[#d3272e]"/>Brickel.Ryan@icloud.com</a>
              <div className="flex items-center gap-3 border-b border-white/15 pb-4 text-lg"><MapPin className="h-5 w-5 text-[#d3272e]"/>Jacksonville, Florida</div>
              <a href="https://instagram.com/iso.regret" target="_blank" rel="noreferrer" className="flex items-center gap-3 border-b border-white/15 pb-4 text-lg transition hover:text-white"><Instagram className="h-5 w-5 text-[#d3272e]"/>@iso.regret</a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
