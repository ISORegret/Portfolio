
'use client'

import Image from 'next/image'
import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Camera, Car, Building2, Mail, Instagram, Phone, MapPin, ExternalLink, Filter, CameraOff } from 'lucide-react'
import { Button, Card, CardContent, CardHeader, CardTitle, Input, Textarea } from '../components/ui'

type Tag = 'All' | 'Automotive' | 'Real Estate' | 'Street'

type GalleryItem = {
  id: string
  title: string
  src: string
  tags: Array<'Automotive'|'Real Estate'|'Street'>
}

// Add at the top:
import ProjectCard from '../components/ProjectCard';
import { projects } from './data/projects';

// Inside your <main> ... add these two sections where Gallery used to be:

{/* Collections tiles */}
<section id="collections" className="scroll-mt-24">
  <div className="mb-6">
    <h2 className="text-2xl sm:text-3xl font-semibold">Collections</h2>
    <p className="text-neutral-400 mt-2">Explore by category.</p>
  </div>
  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
    <a href="/collections/automotive">
      <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6 hover:border-neutral-700 transition">
        <h3 className="text-lg font-semibold">Automotive</h3>
        <p className="text-neutral-400 text-sm mt-1">Events, rollers, features.</p>
      </div>
    </a>
    <a href="/collections/real-estate">
      <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6 hover:border-neutral-700 transition">
        <h3 className="text-lg font-semibold">Real Estate</h3>
        <p className="text-neutral-400 text-sm mt-1">MLS-ready interiors & exteriors.</p>
      </div>
    </a>
    <a href="/collections/street">
      <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6 hover:border-neutral-700 transition">
        <h3 className="text-lg font-semibold">Street</h3>
        <p className="text-neutral-400 text-sm mt-1">Candid, cinematic city life.</p>
      </div>
    </a>
  </div>
</section>

{/* Latest Projects */}
<section id="latest" className="scroll-mt-24">
  <div className="mb-6">
    <h2 className="text-2xl sm:text-3xl font-semibold">Latest Projects</h2>
    <p className="text-neutral-400 mt-2">Recent shoots, listings, and sets.</p>
  </div>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {[...projects]
      .sort((a, b) => b.date.localeCompare(a.date))
      .slice(0, 6)
      .map(p => (
        <ProjectCard key={p.slug} title={p.title} category={p.category} cover={p.cover} album={p.album} blurb={p.blurb} />
      ))}
  </div>
</section>


const tags: Tag[] = ['All','Automotive','Real Estate','Street']

export default function Page() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <Header />
      <Hero />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24 py-16">
        <Services />
        <Gallery />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

function Header() {
  return (
    <div className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-neutral-950/70 border-b border-neutral-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2 font-semibold tracking-wide">
          <Camera className="w-5 h-5" />
          <span>ISO.Regret</span>
        </a>
        <nav className="hidden sm:flex items-center gap-6 text-sm">
          <a href="#services" className="hover:text-white/90">Services</a>
          <a href="#gallery" className="hover:text-white/90">Albums</a>
          <a href="#about" className="hover:text-white/90">About</a>
          <a href="#contact" className="hover:text-white/90">Contact</a>
          <a href="https://instagram.com/iso.regret" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2">
            <Instagram className="w-4 h-4" /> <span>Instagram</span>
          </a>
        </nav>
      </div>
    </div>
  )
}

function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/40 to-neutral-950" />
        <Image
          alt="Hero background"
          className="w-full h-[50vh] object-cover opacity-60"
          src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=2000&auto=format&fit=crop"
          fill
          priority
          sizes="100vw"
          style={{ objectFit: 'cover' }}
        />
      </div>
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-6xl font-bold tracking-tight"
        >
          Jacksonville Photographer / Videographer 
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-4 text-neutral-300 max-w-2xl"
        >
          Automotive. Real Estate. Street stories. I turn moments into moving pictures with cinematic frames, timeless stories where every shot tells a story. Photos that speak. Videos that move
        </motion.p>
        <div className="mt-8 flex gap-3">
          <a href="#gallery"><Button size="lg">View Albums</Button></a>
          <a href="#contact"><Button variant="secondary" size="lg">Book a Shoot</Button></a>
        </div>
      </div>
    </section>
  )
}

function Services() {
  const features = [
    { icon: <Car className="w-6 h-6" />, title: 'Automotive', body: 'Show-ready rollers, rig shots, events, dealers. Night or natural light — your car, your vibe.' },
    { icon: <Building2 className="w-6 h-6" />, title: 'Real Estate', body: 'MLS-ready interiors/exteriors, blue-hour sets, detail vignettes, and optional vertical video add-ons.' },
    { icon: <Camera className="w-6 h-6" />, title: 'Street', body: 'Candid city moments with cinematic tones. Small-footprint, big storytelling.' },
  ]
  return (
    <section id="services" className="scroll-mt-24">
      <div className="mb-8">
        <h2 className="text-2xl sm:text-3xl font-semibold">Services</h2>
        <p className="text-neutral-400 mt-2">Clean deliverables, quick turnarounds, and transparent pricing.</p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((f, i) => (
          <Card key={i}>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">{f.icon}<span>{f.title}</span></CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-neutral-300 leading-relaxed">{f.body}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

function Gallery() {
  const [active, setActive] = useState<Tag>('All')
  const filtered = useMemo(() => active === 'All' ? gallery : gallery.filter(g => g.tags.includes(active as any)), [active])
  return (
    <section id="gallery" className="scroll-mt-24">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl sm:text-3xl font-semibold">Albums</h2>
          <p className="text-neutral-400 mt-2">Browse selected sets. Ask for private client galleries if needed.</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Filter className="w-4 h-4 opacity-70" />
          {tags.map(t => (
            <Button key={t} variant={t === active ? 'default' : 'secondary'} size="sm" onClick={() => setActive(t)}>
              {t}
            </Button>
          ))}
        </div>
      </div>
      {filtered.length === 0 ? (
        <div className="flex items-center gap-2 text-neutral-400"><CameraOff className="w-4 h-4"/> No images yet.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(item => (
            <figure key={item.id} className="group relative overflow-hidden rounded-2xl bg-neutral-900 border border-neutral-800">
              {/* Using next/image for performance */}
              <Image alt={item.title} src={item.src} width={800} height={600} className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <figcaption className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-neutral-950/80 to-transparent text-sm flex items-center justify-between">
                <span className="font-medium">{item.title}</span>
                <span className="text-neutral-300">{item.tags[0]}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      )}
      <div className="mt-6 text-sm text-neutral-400">
        Want private, passworded albums? I can host client-proofing links (Pixieset/SmugMug/Frame.io/Google Drive).
      </div>
    </section>
  )
}

function About() {
  return (
    <section id="about" className="scroll-mt-24">
      <div className="grid lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2">
          <h2 className="text-2xl sm:text-3xl font-semibold">About</h2>
          <p className="mt-3 text-neutral-300 leading-relaxed">
            I’m <strong>Ryan</strong>—the eye behind <em>ISO.Regret</em>. I shoot crisp, cinematic images across
            <strong> Automotive</strong>, <strong>Real Estate</strong>, and <strong>Street</strong> work. Whether it’s a moody downtown
            walk or a blue-hour exterior for an MLS listing, I focus on clean lines, striking color, and honest moments.
          </p>
          <p className="mt-3 text-neutral-300 leading-relaxed">
            Gear-wise, I run Sony mirrorless bodies with fast zooms and primes, and a streamlined lighting kit for
            quick setups. Expect clear communication, punctual delivery, and files tailored to where they’ll live—web,
            print, or billboard.
          </p>
        </div>
        <Card>
          <CardHeader><CardTitle>Quick Facts</CardTitle></CardHeader>
          <CardContent className="text-neutral-300 text-sm space-y-2">
            <p>• Based in Jacksonville, FL</p>
            <p>• Turnaround: typically 48–72 hours (project dependent)</p>
            <p>• Delivery: online album + downloadable high-res</p>
            <p>• Add-ons: short-form reels, vertical video, reels cover frames</p>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

function Contact() {
  return (
    <section id="contact" className="scroll-mt-24">
      <div className="mb-8">
        <h2 className="text-2xl sm:text-3xl font-semibold">Get in Touch</h2>
        <p className="text-neutral-400 mt-2">Tell me about your project—date, location, vibe, and deliverables.</p>
      </div>
      <div className="grid lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2">
          <CardHeader><CardTitle>Start a booking</CardTitle></CardHeader>
          <CardContent>
            {/* Replace action with your Formspree/Netlify endpoint */}
            <form action="https://formspree.io/f/your-form-id" method="POST" className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <Input required name="name" placeholder="Your name" />
                <Input required type="email" name="email" placeholder="Email" />
              </div>
              <Input name="phone" placeholder="Phone (optional)" />
              <Input name="subject" placeholder="Shoot type / subject" />
              <Textarea required name="message" placeholder="Tell me about your project…" />
              <Button type="submit">Send</Button>
            </form>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Contact Info</CardTitle></CardHeader>
          <CardContent className="space-y-3 text-neutral-300">
            <p className="flex items-center gap-2"><Mail className="w-4 h-4"/> ryan@isoregret.com</p>
            <p className="flex items-center gap-2"><Phone className="w-4 h-4"/> (904) 718-6429</p>
            <p className="flex items-center gap-2"><MapPin className="w-4 h-4"/> Jacksonville, Florida</p>
            <a className="inline-flex items-center gap-2 hover:underline" href="https://instagram.com/iso.regret" target="_blank" rel="noreferrer">
              <Instagram className="w-4 h-4"/> Instagram <ExternalLink className="w-4 h-4"/>
            </a>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="mt-20 border-t border-neutral-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-sm text-neutral-400 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p>© {new Date().getFullYear()} ISO.Regret · All rights reserved.</p>
        <nav className="flex items-center gap-4">
          <a href="#services" className="hover:text-neutral-200">Services</a>
          <a href="#gallery" className="hover:text-neutral-200">Albums</a>
          <a href="#about" className="hover:text-neutral-200">About</a>
          <a href="#contact" className="hover:text-neutral-200">Contact</a>
        </nav>
      </div>
    </footer>
  )
}
