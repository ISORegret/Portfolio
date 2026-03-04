'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Car, Building2, Camera, Mail, Phone, MapPin, Instagram, ExternalLink } from 'lucide-react';
import ProjectCard from '../components/ProjectCard';
import { projects } from './data/projects';
import { Button, Card, CardContent, CardHeader, CardTitle, Input, Textarea } from '../components/ui';

export default function Page() {
  return (
    <div className="bg-bg">
      <Hero />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-28 py-20">
        {/* Services */}
        <Services />

        {/* Collections */}
        <div className="relative">
          <div className="absolute inset-0 bg-bg-elevated/50 rounded-token-xl blur-2xl" aria-hidden />
          <div className="relative bg-bg-card/90 backdrop-blur-sm border border-border/60 rounded-token-xl p-12 -mx-4 sm:-mx-6 lg:-mx-8 shadow-soft">
            <section id="collections" className="scroll-mt-24">
              <div className="text-center mb-12">
                <h2 className="font-display text-3xl sm:text-4xl font-bold text-[rgb(var(--text))]">Collections</h2>
                <p className="text-[rgb(var(--text-muted))] mt-4 text-lg">Explore by category</p>
                <div className="w-16 h-0.5 bg-accent/60 mx-auto mt-6 rounded-full" aria-hidden />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                {[
                  { href: "/collections/automotive", title: "Automotive", description: "Events, rollers, features.", gradient: "from-red-500/10 to-orange-500/10", hoverColor: "group-hover:text-red-400" },
                  { href: "/collections/real-estate", title: "Real Estate", description: "MLS-ready interiors & exteriors.", gradient: "from-blue-500/10 to-cyan-500/10", hoverColor: "group-hover:text-blue-400" },
                  { href: "/collections/street", title: "Street", description: "Candid, cinematic city life.", gradient: "from-purple-500/10 to-pink-500/10", hoverColor: "group-hover:text-purple-400" }
                ].map((collection, i) => (
                  <motion.a
                    key={i}
                    href={collection.href}
                    className="group block"
                    initial={{ opacity: 0, y: 60, scale: 0.8 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ 
                      duration: 0.8, 
                      delay: i * 0.2,
                      type: "spring",
                      stiffness: 80,
                      damping: 20
                    }}
                    whileHover={{ 
                      y: -12,
                      scale: 1.02,
                      transition: { duration: 0.4, ease: "easeOut" }
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="relative rounded-token-xl border border-border/60 bg-bg-card p-8 hover:border-accent/30 hover:shadow-glow transition-all duration-300 overflow-hidden">
                      <motion.div
                        className={`absolute inset-0 bg-gradient-to-br ${collection.gradient} rounded-token-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                        initial={false}
                      />
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        initial={false}
                      />
                      <div className="relative">
                        <motion.h3
                          className={`font-display text-xl font-bold text-[rgb(var(--text))] ${collection.hoverColor} transition-colors duration-300`}
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.2 }}
                        >
                          {collection.title}
                        </motion.h3>
                        <motion.p
                          className="text-[rgb(var(--text-muted))] mt-3 leading-relaxed group-hover:text-[rgb(var(--text))] transition-colors duration-300"
                          initial={{ opacity: 0.8 }}
                          whileHover={{ opacity: 1 }}
                        >
                          {collection.description}
                        </motion.p>
                      </div>
                    </div>
                  </motion.a>
                ))}
              </div>
            </section>
          </div>
        </div>

        {/* Latest Projects */}
        <section id="latest" className="scroll-mt-24">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[rgb(var(--text))]">Latest Projects</h2>
            <p className="text-[rgb(var(--text-muted))] mt-4 text-lg">Recent shoots, listings, and sets</p>
            <div className="w-16 h-0.5 bg-accent/60 mx-auto mt-6 rounded-full" aria-hidden />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...projects]
              .sort((a, b) => b.date.localeCompare(a.date))
              .slice(0, 6)
              .map((p) => (
                <ProjectCard
                  key={p.slug}
                  title={p.title}
                  category={p.category}
                  cover={p.cover}
                  album={p.album}
                  blurb={p.blurb}
                />
              ))}
          </div>
        </section>

        {/* About */}
        <About />

        {/* Contact */}
        <Contact />
      </main>
    </div>
  );
}


function Hero() {
  return (
    <section className="relative isolate overflow-hidden h-screen flex items-center">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-[rgb(var(--bg))]/80 via-[rgb(var(--bg))]/60 to-[rgb(var(--bg))]" />
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="w-full h-full"
        >
          <Image
            alt="Hero background — automotive and candid photography"
            className="w-full h-full object-cover opacity-50"
            src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2000&auto=format&fit=crop"
            fill
            priority
            sizes="100vw"
            style={{ objectFit: 'cover' }}
          />
        </motion.div>
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[rgb(var(--text))] leading-tight"
        >
          Cinematic Photography & Videography
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-8 text-[rgb(var(--text-muted))] max-w-3xl mx-auto text-lg sm:text-xl leading-relaxed"
        >
          Candid & automotive. I turn moments into moving pictures with cinematic frames and
          timeless storytelling. Photos that speak. Videos that move.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="mt-12 flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          <a href="#services">
            <Button size="lg" className="px-8 py-4 text-lg font-semibold">
              View Services
            </Button>
          </a>
          <a href="#contact">
            <Button variant="secondary" size="lg" className="px-8 py-4 text-lg font-semibold">
              Book a Shoot
            </Button>
          </a>
        </motion.div>
      </div>
      
      {/* Scroll indicator at bottom of hero */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-[rgb(var(--text-muted))] cursor-pointer"
          onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <span className="text-sm font-medium">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-6 h-10 border-2 border-neutral-400 rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-1 h-3 bg-neutral-400 rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </motion.div>
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
    <section id="services" className="scroll-mt-24 relative">
      {/* Scroll indicator */}
      <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-2 text-[rgb(var(--text-muted))]"
        >
          <span className="text-sm font-medium">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-6 h-10 border-2 border-[rgb(var(--text-muted))] rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-1 h-3 bg-accent rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </div>

      <div className="text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-display text-3xl sm:text-4xl font-bold text-[rgb(var(--text))]"
        >
          Services
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-[rgb(var(--text-muted))] mt-4 text-lg"
        >
          Clean deliverables, quick turnarounds, and transparent pricing
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="w-16 h-0.5 bg-accent/60 mx-auto mt-6 rounded-full origin-center"
        />
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 50, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: i * 0.1, type: "spring", stiffness: 100, damping: 18 }}
            whileHover={{ y: -6, transition: { duration: 0.25, ease: "easeOut" } }}
            className="group"
          >
            <Card className="h-full border-border/60 bg-bg-card hover:border-accent/20 hover:shadow-glow transition-all duration-300 overflow-hidden relative">
              <CardHeader className="relative">
                <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }} className="inline-block">
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <span className="text-accent group-hover:text-accent-muted transition-colors">{f.icon}</span>
                    <span className="text-[rgb(var(--text))] group-hover:text-[rgb(var(--text))]">{f.title}</span>
                  </CardTitle>
                </motion.div>
              </CardHeader>
              <CardContent className="relative">
                <p className="text-[rgb(var(--text-muted))] leading-relaxed group-hover:text-[rgb(var(--text))]/90 transition-colors">
                  {f.body}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

function About() {
  return (
    <section id="about" className="scroll-mt-24">
      <div className="grid lg:grid-cols-3 gap-10 items-start">
        <div className="lg:col-span-2">
          <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[rgb(var(--text))]">About</h2>
          <p className="mt-4 text-[rgb(var(--text-muted))] leading-relaxed">
            I’m <strong>Ryan</strong>—the eye behind <em>ISO.Regret</em>. I shoot crisp, cinematic images across
            <strong> Automotive</strong>, <strong>Real Estate</strong>, and <strong>Street</strong> work. Whether it’s a moody downtown
            walk or a blue-hour exterior for an MLS listing, I focus on clean lines, striking color, and honest moments.
          </p>
          <p className="mt-4 text-[rgb(var(--text-muted))] leading-relaxed">
            Gear-wise, I run Sony mirrorless bodies with fast zooms and primes, and a streamlined lighting kit for
            quick setups. Expect clear communication, punctual delivery, and files tailored to where they’ll live—web,
            print, or billboard.
          </p>
        </div>
        <Card className="border-border/60">
          <CardHeader><CardTitle>Quick Facts</CardTitle></CardHeader>
          <CardContent className="text-[rgb(var(--text-muted))] text-sm space-y-3">
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
      <div className="text-center mb-16">
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-[rgb(var(--text))]">Get in Touch</h2>
        <p className="text-[rgb(var(--text-muted))] mt-4 text-lg">Tell me about your project—date, location, vibe, and deliverables</p>
        <div className="w-16 h-0.5 bg-accent/60 mx-auto mt-6 rounded-full" aria-hidden />
      </div>
      <div className="grid lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 border-border/60 bg-bg-card">
          <CardHeader>
            <CardTitle className="text-xl font-bold">Start a booking</CardTitle>
            <p className="text-[rgb(var(--text-muted))] text-sm">Fill out the form below and I'll get back to you within 24 hours</p>
          </CardHeader>
          <CardContent>
            <form action="https://formspree.io/f/mldwlpkk" method="POST" className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Input 
                    required 
                    name="name" 
                    placeholder="Your name" 
                    className="w-full"
                  />
                </div>
                <div>
                  <Input 
                    required 
                    type="email" 
                    name="email" 
                    placeholder="Email address" 
                    className="w-full"
                  />
                </div>
              </div>
              <div>
                <Input 
                  name="phone" 
                  type="tel"
                  placeholder="Phone number (optional)" 
                  className="w-full"
                />
              </div>
              <div>
                <Input 
                  name="subject" 
                  placeholder="Shoot type / subject" 
                  className="w-full"
                />
              </div>
              <div>
                <Textarea 
                  required 
                  name="message" 
                  placeholder="Tell me about your project… date, location, vibe, and deliverables"
                  className="w-full min-h-[120px]"
                />
              </div>
              <Button type="submit" className="w-full sm:w-auto px-8 py-3 text-lg font-semibold">
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>
        <Card className="border-border/60 bg-bg-card">
          <CardHeader>
            <CardTitle className="text-xl font-bold">Contact Info</CardTitle>
            <p className="text-[rgb(var(--text-muted))] text-sm">Get in touch directly</p>
          </CardHeader>
          <CardContent className="space-y-3 text-[rgb(var(--text-muted))]">
            <div className="flex items-center gap-3 p-3 rounded-token bg-bg-elevated hover:bg-border/20 transition-colors">
              <Mail className="w-5 h-5 text-accent shrink-0" />
              <a href="mailto:ryan@isoregret.com" className="hover:text-[rgb(var(--text))] transition-colors truncate">
                ryan@isoregret.com
              </a>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-token bg-bg-elevated hover:bg-border/20 transition-colors">
              <Phone className="w-5 h-5 text-accent shrink-0" />
              <a href="tel:+19047186429" className="hover:text-[rgb(var(--text))] transition-colors">
                (904) 718-6429
              </a>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-token bg-bg-elevated hover:bg-border/20 transition-colors">
              <MapPin className="w-5 h-5 text-accent shrink-0" />
              <span>Jacksonville, Florida</span>
            </div>
            <div className="pt-4 border-t border-border/60">
              <a
                className="inline-flex items-center gap-3 p-3 rounded-token bg-accent/10 hover:bg-accent/20 text-accent transition-colors w-full"
                href="https://instagram.com/iso.regret"
                target="_blank"
                rel="noreferrer"
              >
                <Instagram className="w-5 h-5 shrink-0" />
                <span className="font-medium">Follow on Instagram</span>
                <ExternalLink className="w-4 h-4 ml-auto opacity-70" />
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

