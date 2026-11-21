'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { siteConfig } from '../app/data/site'

function HeroTitle({ headline }: { headline: string }) {
  const cleaned = headline.replace(/\.$/, '')
  const words = cleaned.split(/\s+/)
  if (words.length === 2) {
    return (
      <>
        {words[0]}
        <br />
        {words[1]}
        <span className="text-[rgb(var(--accent))]">.</span>
      </>
    )
  }
  return <>{headline}</>
}

export default function HeroSection() {
  const { hero } = siteConfig
  const reduce = useReducedMotion()
  const videoRef = useRef<HTMLVideoElement>(null)
  const [ready, setReady] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [failed, setFailed] = useState(false)
  const showVideo = Boolean(hero.videoSrc) && !reduce && !failed

  useEffect(() => {
    const video = videoRef.current
    if (!video || !showVideo) return
    const play = () => {
      video.play().then(() => setPlaying(true)).catch(() => setFailed(true))
    }
    if (video.readyState >= 2) play()
    else video.addEventListener('canplay', play, { once: true })
    return () => video.removeEventListener('canplay', play)
  }, [showVideo])

  function togglePlayback() {
    const video = videoRef.current
    if (!video) return
    if (video.paused) {
      video.play().then(() => setPlaying(true)).catch(() => setFailed(true))
    } else {
      video.pause()
      setPlaying(false)
    }
  }

  return (
    <>
      <section className="relative isolate flex h-[100svh] min-h-[640px] items-end overflow-hidden" aria-label="Featured film">
        <Image
          src={hero.imageSrc}
          alt={hero.imageAlt}
          fill
          priority
          unoptimized
          sizes="100vw"
          className={`hero-media transition-opacity duration-700 ${ready ? 'opacity-0' : 'opacity-100'}`}
        />
        {showVideo ? (
          <video
            ref={videoRef}
            className={`hero-media transition-opacity duration-700 ${ready ? 'opacity-100' : 'opacity-0'}`}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={hero.imageSrc}
            aria-hidden
            onPlaying={() => {
              setReady(true)
              setPlaying(true)
            }}
            onError={() => setFailed(true)}
          >
            <source src={hero.videoSrc} type="video/mp4" />
          </video>
        ) : null}
        <div className="hero-shade absolute inset-0" aria-hidden />

        {showVideo ? (
          <button
            type="button"
            onClick={togglePlayback}
            aria-pressed={playing}
            className="absolute right-4 top-[5.25rem] z-10 border border-white/25 bg-black/35 px-3 py-2 text-xs text-white/85 backdrop-blur-sm hover:text-white"
          >
            {playing ? 'Pause film' : 'Play film'}
          </button>
        ) : null}

        <div className="shell relative z-10 pb-8 md:pb-10">
          <div className="max-w-xl">
            <h1 className="display text-[clamp(3.4rem,6vw,4.75rem)]">
              <HeroTitle headline={hero.headline} />
            </h1>
            <p className="mt-5 max-w-md text-base leading-relaxed text-[rgb(var(--text))] md:text-lg">
              {hero.subline.split('\n').map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              <a href="/#latest" className="btn btn-primary">
                Explore the work
              </a>
              <Link href="/#contact" className="btn-text">
                Book a shoot
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="border-b border-[rgb(var(--border-muted))]">
        <div className="shell flex flex-wrap gap-x-5 gap-y-1 py-4 text-sm text-[rgb(var(--text-subtle))]">
          <a href="/#films" className="text-[rgb(var(--text-muted))] hover:text-[rgb(var(--text))]">
            Watch films
          </a>
          <span aria-hidden>·</span>
          <span>Jacksonville, FL</span>
          <span aria-hidden>·</span>
          <span>ISO.Regret</span>
          <span className="hidden sm:inline" aria-hidden>·</span>
          <span className="hidden sm:inline">Look a little closer</span>
        </div>
      </div>
    </>
  )
}
