'use client';

import Image from 'next/image';
import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { siteConfig } from '../app/data/site';
import { preparedImageUrl } from '../lib/preparedImageLoader';
export default function HeroSection() {
  const [mode, setMode] = useState<'photo' | 'video'>('photo');
  const [videoFailed, setVideoFailed] = useState(false);
  return <>
    <section className="iso-hero" id="hero-media" aria-label={mode === 'photo' ? 'Featured photograph' : 'Featured film'}>
      <Image src={siteConfig.hero.imageSrc} alt={siteConfig.hero.imageAlt} fill priority sizes="100vw" className="iso-hero-image" />
      {mode === 'video' && !videoFailed ? (
        <video className="iso-hero-video" src="/hero-reel.mp4" controls playsInline preload="metadata" poster={preparedImageUrl(siteConfig.hero.imageSrc, 1280)} onError={() => setVideoFailed(true)} aria-label="ISO.Regret automotive film" />
      ) : null}
      <div className="iso-hero-shade" aria-hidden />
      <div className="iso-hero-copy" hidden={mode === 'video' && !videoFailed}>
        <p className="iso-eyebrow">Jacksonville, Florida · Photo &amp; video</p>
        <h1>LOOK<br /><span>AGAIN.</span></h1>
        <p className="iso-hero-description">Photography with a little attitude.<br />Jacksonville. Wherever the story goes.</p>
        <div className="iso-actions"><a href="/#latest" className="iso-button">Explore the work <ArrowUpRight size={18} aria-hidden /></a><a href="/#contact" className="iso-button iso-button-secondary">Book a shoot</a></div>
      </div>
      {mode === 'video' && videoFailed ? <p className="iso-video-error" role="status">The film couldn’t load. Select Photo to return to the portfolio.</p> : null}
    </section>
    <div className="iso-culture-band">
      <div className="iso-media-toggle" role="group" aria-label="Featured media">
        <button type="button" aria-pressed={mode === 'photo'} aria-controls="hero-media" onClick={() => setMode('photo')}>Photo</button>
        <span aria-hidden>/</span>
        <button type="button" aria-pressed={mode === 'video'} aria-controls="hero-media" onClick={() => { setVideoFailed(false); setMode('video'); }}>Video</button>
      </div>
      <span>Jacksonville, FL</span><span>ISO.Regret</span><span>Look a little closer ↗</span>
    </div>
  </>;
}
