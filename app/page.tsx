import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import HeroSection from '../components/HeroSection';
import ProjectCard from '../components/ProjectCard';
import ContactForm from '../components/ContactForm';
import { projects } from './data/projects';
export default function Page() {
  const latest = [...projects].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 6);
  return <>
    <HeroSection />
    <main>
      <section id="latest" className="iso-section iso-latest">
        <div className="iso-section-head"><div><p className="iso-eyebrow">Fresh frames</p><h2 className="iso-heading">THE LATEST<span className="iso-gold">.</span></h2></div><Link href="/work" className="iso-text-link">View all work <ArrowRight size={18} aria-hidden /></Link></div>
        <div className="iso-home-albums">{latest.map(p => <ProjectCard key={p.slug} {...p} fromPath="/#latest" />)}</div>
      </section>
      <section id="about" className="iso-about"><div className="iso-section iso-split"><div><p className="iso-eyebrow">The photographer</p><h2 className="iso-heading">GOOD LIGHT.<br /><span className="iso-gold">ZERO REGRET.</span></h2></div><div className="iso-about-copy"><p>ISO.Regret is my view of the world. I’m Ryan, based in Jacksonville, drawn to good light, interesting details, and the stories happening right in front of us.</p><p>Automotive is a big part of the work. There’s plenty more worth photographing.</p><div id="services" className="iso-services"><Link href="/collections/automotive">Automotive</Link><a href="/#contact">Events</a><Link href="/collections/street">People &amp; places</Link><Link href="/collections/real-estate">Real estate</Link></div></div></div></section>
      <section id="contact" className="iso-section iso-contact iso-split"><div><p className="iso-eyebrow">Make something worth keeping</p><h2 className="iso-heading">LET’S MAKE<br />SOMETHING<span className="iso-gold">.</span></h2><p className="iso-contact-copy">A car you’re proud of. An event you’re planning. An idea you want to try. Let’s talk about it.</p><a href="mailto:Brickel.Ryan@icloud.com" className="iso-text-link iso-email">Brickel.Ryan@icloud.com <ArrowUpRight size={18} aria-hidden /></a></div><ContactForm /></section>
    </main>
  </>;
}
