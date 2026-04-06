'use client';

import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { siteConfig } from '../app/data/site';
import { Button } from './ui';

const BLUR_DATA =
  'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/EABQQAQAAAAAAAAAAAAAAAAAAAAD/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBEQACEQAD8QDu/9k=';

export default function HeroSection() {
  const { hero, colorStory } = siteConfig;
  const wantsVideo = Boolean(hero.videoSrc && hero.videoSrc.length > 0);
  const [videoFailed, setVideoFailed] = useState(false);
  const heroVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setVideoFailed(false);
  }, [hero.videoSrc]);

  const showVideo = wantsVideo && !videoFailed;

  useEffect(() => {
    if (!showVideo) return;
    const v = heroVideoRef.current;
    if (!v) return;
    const kick = () => {
      const p = v.play();
      if (p !== undefined) p.catch(() => {});
    };
    kick();
    v.addEventListener('loadeddata', kick);
    return () => v.removeEventListener('loadeddata', kick);
  }, [showVideo, hero.videoSrc]);

  return (
    <section className="relative isolate overflow-hidden min-h-[100dvh] flex flex-col justify-center">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-[rgb(var(--bg))]/85 via-[rgb(var(--bg))]/50 to-[rgb(var(--bg))]/92 z-20 pointer-events-none" />
        <motion.div
          initial={{ scale: 1.06 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.2, ease: 'easeOut' }}
          className="absolute inset-0 z-0"
        >
          {showVideo ? (
            <video
              ref={heroVideoRef}
              className="hero-bg-video pointer-events-none absolute inset-0 z-0 h-full w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              controls={false}
              disablePictureInPicture
              preload="auto"
              aria-hidden
              poster={hero.imageSrc}
              onError={() => setVideoFailed(true)}
            >
              <source src={hero.videoSrc} type="video/mp4" />
            </video>
          ) : (
            <div className="absolute inset-0 z-10">
              <div className="relative h-full w-full">
                <Image
                  alt={hero.imageAlt}
                  className="object-cover opacity-[0.5]"
                  src={hero.imageSrc}
                  fill
                  priority
                  sizes="100vw"
                  style={{ objectFit: 'cover' }}
                  placeholder="blur"
                  blurDataURL={BLUR_DATA}
                />
              </div>
            </div>
          )}
        </motion.div>
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 sm:py-36 text-center">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-sm sm:text-base text-accent font-medium tracking-wide uppercase mb-4 max-w-2xl mx-auto"
        >
          Jacksonville, FL · Automotive · Real Estate · Street
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35 }}
          className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[rgb(var(--text))] leading-tight"
        >
          {hero.headline}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.55 }}
          className="mt-6 text-[rgb(var(--text-muted))] max-w-3xl mx-auto text-lg sm:text-xl leading-relaxed"
        >
          {hero.subline}
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.85 }}
          className="mt-5 text-sm sm:text-base text-[rgb(var(--text-subtle))] max-w-2xl mx-auto leading-relaxed border-l-2 border-accent/40 pl-4 text-left sm:text-center sm:border-l-0 sm:pl-0 sm:border-0"
        >
          {colorStory}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.05 }}
          className="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <a href="#contact">
            <Button size="lg" className="px-8 py-4 text-lg font-semibold w-full sm:w-auto min-w-[200px]">
              Book a shoot
            </Button>
          </a>
          <a href="#latest">
            <Button variant="secondary" size="lg" className="px-8 py-4 text-lg font-semibold w-full sm:w-auto min-w-[200px]">
              View recent work
            </Button>
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.button
          type="button"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2 text-[rgb(var(--text-muted))] cursor-pointer bg-transparent border-0 p-0 font-inherit"
          onClick={() => document.getElementById('featured-strip')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <span className="text-sm font-medium">Selected work</span>
          <span className="w-6 h-10 border-2 border-neutral-400/80 rounded-full flex justify-center">
            <span className="w-1 h-3 bg-neutral-400 rounded-full mt-2 block" />
          </span>
        </motion.button>
      </motion.div>
    </section>
  );
}
