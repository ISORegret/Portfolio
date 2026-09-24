'use client';

import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { siteConfig } from '../app/data/site';
import { Button } from './ui';

const BLUR_DATA =
  'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/EABQQAQAAAAAAAAAAAAAAAAAAAAD/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBEQACEQAD8QDu/9k=';

export default function HeroSection() {
  const { hero } = siteConfig;
  const wantsVideo = Boolean(hero.videoSrc);
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
    <section className="relative isolate overflow-hidden min-h-[88dvh] flex flex-col justify-center">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-black/15 z-20 pointer-events-none" />
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
                  className="object-cover opacity-[0.78]"
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

      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-36 pb-28 sm:pt-44 sm:pb-36 text-left">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xs sm:text-sm text-accent font-semibold tracking-[0.22em] uppercase mb-5 max-w-2xl"
        >
          Jacksonville, FL · Automotive Photography + Film
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35 }}
          className="font-display text-5xl sm:text-7xl lg:text-8xl font-bold tracking-[-0.035em] text-white leading-[0.95] max-w-5xl"
        >
          {hero.headline}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.55 }}
          className="mt-7 text-white/75 max-w-2xl text-base sm:text-xl leading-relaxed"
        >
          {hero.subline}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-10 flex flex-col sm:flex-row gap-3 items-start sm:items-center"
        >
          <a href="#latest">
            <Button size="lg" className="px-8 py-4 text-lg font-semibold w-full sm:w-auto min-w-[200px]">
              View the work
            </Button>
          </a>
          <a href="#contact">
            <Button variant="secondary" size="lg" className="px-8 py-4 text-lg font-semibold w-full sm:w-auto min-w-[200px]">
              Book a shoot
            </Button>
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.8 }}
        className="absolute bottom-8 left-4 sm:left-6 lg:left-[max(2rem,calc((100vw-80rem)/2+2rem))] z-20"
      >
        <motion.button
          type="button"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2 text-[rgb(var(--text-muted))] cursor-pointer bg-transparent border-0 p-0 font-inherit"
          onClick={() => document.getElementById('latest')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <span className="text-sm font-medium">Recent albums</span>
          <span className="w-6 h-10 border-2 border-neutral-400/80 rounded-full flex justify-center">
            <span className="w-1 h-3 bg-neutral-400 rounded-full mt-2 block" />
          </span>
        </motion.button>
      </motion.div>
    </section>
  );
}
