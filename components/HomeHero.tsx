'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { siteConfig } from '../app/data/site'

export default function HomeHero() {
  const { hero, brandName } = siteConfig
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
    <section className="home-hero" aria-label={brandName}>
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
        <button type="button" onClick={togglePlayback} aria-pressed={playing} className="hero-pause text-btn">
          {playing ? 'Pause' : 'Play'}
        </button>
      ) : null}
      <div className="shell relative z-10 flex h-full items-end pb-10 md:pb-14">
        <div>
          <h1 className="hero-name">{brandName}</h1>
          <p className="hero-line">{hero.headline}</p>
        </div>
      </div>
    </section>
  )
}
