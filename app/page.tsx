'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Car, Building2, Camera, Mail, Phone, MapPin, Instagram, ExternalLink } from 'lucide-react';
import ProjectCard from '../components/ProjectCard';
import { projects } from './data/projects';
import { Button, Card, CardContent, CardHeader, CardTitle, Input, Textarea } from '../components/ui';

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 text-neutral-100">
      <Hero />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-32 py-20">
        {/* Services */}
        <Services />

        {/* Collections - with enhanced background separator */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-800/20 via-neutral-700/30 to-neutral-800/20 rounded-3xl blur-xl"></div>
          <div className="relative bg-gradient-to-br from-neutral-900/80 to-neutral-800/60 backdrop-blur-sm border border-neutral-700/50 rounded-3xl p-12 -mx-4 sm:-mx-6 lg:-mx-8 shadow-2xl">
            <section id="collections" className="scroll-mt-24">
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-white to-neutral-300 bg-clip-text text-transparent">Collections</h2>
                <p className="text-neutral-400 mt-4 text-lg">Explore by category</p>
                <div className="w-24 h-1 bg-gradient-to-r from-neutral-600 to-neutral-400 mx-auto mt-6 rounded-full"></div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                <a href="/collections/automotive" className="group">
                  <div className="relative rounded-3xl border border-neutral-700/50 bg-gradient-to-br from-neutral-800/80 to-neutral-900/80 p-8 hover:border-neutral-500/70 hover:shadow-2xl hover:shadow-neutral-900/50 transition-all duration-500 transform hover:-translate-y-2 backdrop-blur-sm">
                    <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-orange-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative">
                      <h3 className="text-xl font-bold text-white group-hover:text-red-400 transition-colors duration-300">Automotive</h3>
                      <p className="text-neutral-400 mt-3 leading-relaxed">Events, rollers, features.</p>
                    </div>
                  </div>
                </a>
                <a href="/collections/real-estate" className="group">
                  <div className="relative rounded-3xl border border-neutral-700/50 bg-gradient-to-br from-neutral-800/80 to-neutral-900/80 p-8 hover:border-neutral-500/70 hover:shadow-2xl hover:shadow-neutral-900/50 transition-all duration-500 transform hover:-translate-y-2 backdrop-blur-sm">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative">
                      <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300">Real Estate</h3>
                      <p className="text-neutral-400 mt-3 leading-relaxed">MLS-ready interiors & exteriors.</p>
                    </div>
                  </div>
                </a>
                <a href="/collections/street" className="group">
                  <div className="relative rounded-3xl border border-neutral-700/50 bg-gradient-to-br from-neutral-800/80 to-neutral-900/80 p-8 hover:border-neutral-500/70 hover:shadow-2xl hover:shadow-neutral-900/50 transition-all duration-500 transform hover:-translate-y-2 backdrop-blur-sm">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative">
                      <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors duration-300">Street</h3>
                      <p className="text-neutral-400 mt-3 leading-relaxed">Candid, cinematic city life.</p>
                    </div>
                  </div>
                </a>
              </div>
            </section>
          </div>
        </div>

        {/* Latest Projects */}
        <section id="latest" className="scroll-mt-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-white to-neutral-300 bg-clip-text text-transparent">Latest Projects</h2>
            <p className="text-neutral-400 mt-4 text-lg">Recent shoots, listings, and sets</p>
            <div className="w-24 h-1 bg-gradient-to-r from-neutral-600 to-neutral-400 mx-auto mt-6 rounded-full"></div>
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
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/60 via-neutral-900/40 to-neutral-950/80" />
        <Image
          alt="Hero background"
          className="w-full h-full object-cover opacity-50"
          src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=2000&auto=format&fit=crop"
          fill
          priority
          sizes="100vw"
          style={{ objectFit: 'cover' }}
        />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight bg-gradient-to-r from-white via-neutral-200 to-neutral-400 bg-clip-text text-transparent leading-tight"
        >
          Cinematic Photography & Videography
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-8 text-neutral-300 max-w-3xl mx-auto text-lg sm:text-xl leading-relaxed"
        >
          Automotive. Real Estate. Candid shots. I turn moments into moving pictures with cinematic frames and
          timeless storytelling. Photos that speak. Videos that move.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-12 flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          <a href="#services">
            <Button size="lg" className="px-8 py-4 text-lg font-semibold shadow-2xl hover:shadow-neutral-900/50 transition-all duration-300">
              View Services
            </Button>
          </a>
          <a href="#contact">
            <Button variant="secondary" size="lg" className="px-8 py-4 text-lg font-semibold shadow-2xl hover:shadow-neutral-900/50 transition-all duration-300">
              Book a Shoot
            </Button>
          </a>
        </motion.div>
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
    <section id="services" className="scroll-mt-24 relative">
      {/* Scroll indicator */}
      <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-2 text-neutral-400"
        >
          <span className="text-sm font-medium">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
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
      </div>

      <div className="text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-white to-neutral-300 bg-clip-text text-transparent"
        >
          Services
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-neutral-400 mt-4 text-lg"
        >
          Clean deliverables, quick turnarounds, and transparent pricing
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="w-24 h-1 bg-gradient-to-r from-neutral-600 to-neutral-400 mx-auto mt-6 rounded-full origin-center"
        />
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.2 }}
          >
            <Card className="h-full border-neutral-700/50 bg-gradient-to-br from-neutral-900/80 to-neutral-800/60 backdrop-blur-sm hover:border-neutral-500/70 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-neutral-900/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl">
                  <span className="text-neutral-400">{f.icon}</span>
                  <span>{f.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-neutral-300 leading-relaxed">{f.body}</p>
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
      <div className="text-center mb-16">
        <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-white to-neutral-300 bg-clip-text text-transparent">Get in Touch</h2>
        <p className="text-neutral-400 mt-4 text-lg">Tell me about your project—date, location, vibe, and deliverables</p>
        <div className="w-24 h-1 bg-gradient-to-r from-neutral-600 to-neutral-400 mx-auto mt-6 rounded-full"></div>
      </div>
      <div className="grid lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 border-neutral-700/50 bg-gradient-to-br from-neutral-900/80 to-neutral-800/60 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-xl font-bold">Start a booking</CardTitle>
            <p className="text-neutral-400 text-sm">Fill out the form below and I'll get back to you within 24 hours</p>
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
              <Button 
                type="submit" 
                className="w-full sm:w-auto px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>
        <Card className="border-neutral-700/50 bg-gradient-to-br from-neutral-900/80 to-neutral-800/60 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-xl font-bold">Contact Info</CardTitle>
            <p className="text-neutral-400 text-sm">Get in touch directly</p>
          </CardHeader>
          <CardContent className="space-y-4 text-neutral-300">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-neutral-800/50 hover:bg-neutral-700/50 transition-colors duration-300">
              <Mail className="w-5 h-5 text-neutral-400"/>
              <a href="mailto:ryan@isoregret.com" className="hover:text-white transition-colors duration-300">
                ryan@isoregret.com
              </a>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-neutral-800/50 hover:bg-neutral-700/50 transition-colors duration-300">
              <Phone className="w-5 h-5 text-neutral-400"/>
              <a href="tel:+19047186429" className="hover:text-white transition-colors duration-300">
                (904) 718-6429
              </a>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-neutral-800/50 hover:bg-neutral-700/50 transition-colors duration-300">
              <MapPin className="w-5 h-5 text-neutral-400"/>
              <span>Jacksonville, Florida</span>
            </div>
            <div className="pt-4 border-t border-neutral-700/50">
              <a 
                className="inline-flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-pink-500/20 to-purple-500/20 hover:from-pink-500/30 hover:to-purple-500/30 transition-all duration-300 w-full" 
                href="https://instagram.com/iso.regret" 
                target="_blank" 
                rel="noreferrer"
              >
                <Instagram className="w-5 h-5 text-pink-400"/>
                <span className="font-medium">Follow on Instagram</span>
                <ExternalLink className="w-4 h-4 text-neutral-400 ml-auto"/>
              </a>
            </div>
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
          <a href="#collections" className="hover:text-neutral-200">Collections</a>
          <a href="#latest" className="hover:text-neutral-200">Latest</a>
          <a href="#about" className="hover:text-neutral-200">About</a>
          <a href="#contact" className="hover:text-neutral-200">Contact</a>
        </nav>
      </div>
    </footer>
  )
}
