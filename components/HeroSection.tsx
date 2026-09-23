import Image from 'next/image';
import Link from 'next/link';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-border/70 bg-[rgb(var(--bg))]">
      <div className="mx-auto grid max-w-[1600px] lg:min-h-[720px] lg:grid-cols-[46%_54%]">
        <div className="relative z-10 flex flex-col justify-center px-5 pb-12 pt-16 sm:px-10 lg:px-16 lg:py-20 xl:px-24">
          <p className="mb-8 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.24em] text-accent">
            <span className="h-px w-9 bg-accent" /> Jacksonville, Florida
          </p>
          <h1 className="font-display text-[clamp(3.6rem,7vw,7.8rem)] font-bold leading-[0.9] tracking-[-0.07em] text-[rgb(var(--text))]">
            Made to<br />
            <span className="text-accent">be seen.</span>
          </h1>
          <p className="mt-9 max-w-md text-lg leading-relaxed text-[rgb(var(--text-muted))] sm:text-xl">
            Automotive photography and video with an eye for the details that make a car yours.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link href="/#latest" className="inline-flex min-h-12 items-center gap-3 bg-accent px-6 py-3 text-sm font-bold uppercase tracking-wider text-neutral-950 transition-colors hover:bg-accent-muted">
              Explore the work <ArrowUpRight className="h-5 w-5" aria-hidden />
            </Link>
            <Link href="/#contact" className="inline-flex min-h-12 items-center gap-2 border-b border-[rgb(var(--text-muted))] px-1 text-sm font-semibold text-[rgb(var(--text))] transition-colors hover:border-accent hover:text-accent">
              Let’s shoot your car <ArrowUpRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
          <div className="mt-16 hidden items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-[rgb(var(--text-subtle))] lg:flex">
            <ArrowDownRight className="h-5 w-5 text-accent" aria-hidden /> Scroll to explore
          </div>
        </div>
        <div className="relative min-h-[440px] overflow-hidden sm:min-h-[600px] lg:min-h-full">
          <Image
            src="/gallery/green-macan/green-macan.jpg"
            alt="Green Porsche Macan photographed by ISO.Regret at sunset"
            fill
            priority
            sizes="(min-width: 1024px) 54vw, 100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
          <p className="absolute bottom-6 left-6 text-xs font-semibold uppercase tracking-[0.18em] text-white sm:bottom-10 sm:left-10">
            ISO.Regret <span className="mx-2 text-white/60">/</span> Automotive photography
          </p>
        </div>
      </div>
    </section>
  );
}
