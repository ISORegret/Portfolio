import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { siteConfig } from '../app/data/site';
export default function HeroSection() {
  return <>
    <section className="iso-hero">
      <Image src={siteConfig.hero.imageSrc} alt={siteConfig.hero.imageAlt} fill priority sizes="100vw" className="iso-hero-image" />
      <div className="iso-hero-shade" aria-hidden />
      <div className="iso-hero-copy">
        <p className="iso-eyebrow">Jacksonville, Florida · Photo &amp; video</p>
        <h1>LOOK<br /><span>AGAIN.</span></h1>
        <p className="iso-hero-description">Photography with a little attitude.<br />Jacksonville. Wherever the story goes.</p>
        <div className="iso-actions"><a href="/#latest" className="iso-button">Explore the work <ArrowUpRight size={18} aria-hidden /></a><a href="/#contact" className="iso-button iso-button-secondary">Book a shoot</a></div>
      </div>
    </section>
    <div className="iso-culture-band"><span>Photo / Video</span><span>Jacksonville, FL</span><span>ISO.Regret</span><span>Look a little closer ↗</span></div>
  </>;
}
