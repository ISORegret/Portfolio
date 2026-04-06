'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Car, Building2, Camera, Mail, Phone, MapPin, Instagram, ExternalLink, Quote, ChevronRight } from 'lucide-react';
import ProjectCard from '../components/ProjectCard';
import ContactForm from '../components/ContactForm';
import HeroSection from '../components/HeroSection';
import FeaturedStrip from '../components/FeaturedStrip';
import PricingPackages from '../components/PricingPackages';
import { projects } from './data/projects';
import { siteConfig } from './data/site';
import { testimonials } from './data/testimonials';
import { Button, Card, CardContent, CardHeader, CardTitle } from '../components/ui';

export default function Page() {
  return (
    <div className="bg-bg">
      <HeroSection />
      <FeaturedStrip />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-28 py-20">
        {/* Recent albums — entry point to full shoots */}
        <section id="latest" className="scroll-mt-24">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[rgb(var(--text))]">Recent albums</h2>
            <p className="text-[rgb(var(--text-muted))] mt-4 text-lg max-w-2xl mx-auto">
              Full shoots, one card each — open an album to browse and download previews.
            </p>
            <div className="w-16 h-0.5 bg-accent/60 mx-auto mt-6 rounded-full" aria-hidden />
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...projects]
              .sort((a, b) => b.date.localeCompare(a.date))
              .slice(0, 6)
              .map((p, i) => (
                <motion.div
                  key={p.slug}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: i * 0.08, type: 'spring', stiffness: 100, damping: 18 }}
                >
                  <ProjectCard
                    slug={p.slug}
                    title={p.title}
                    category={p.category}
                    cover={p.cover}
                    album={p.album}
                    blurb={p.blurb}
                    fromPath="/#latest"
                  />
                </motion.div>
              ))}
          </div>
          <motion.div
            className="text-center mt-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="flex flex-wrap items-center justify-center gap-6">
            <a
              href="/#services"
              className="inline-flex items-center gap-2 text-accent hover:text-accent-muted font-medium transition-colors"
            >
              Albums by service
            </a>
            <span className="text-[rgb(var(--text-subtle))]">·</span>
            <a href="/gallery" className="text-accent hover:text-accent-muted font-medium transition-colors">
              All photos grid
            </a>
            <span className="text-[rgb(var(--text-subtle))]">·</span>
            <a href="/blog" className="text-accent hover:text-accent-muted font-medium transition-colors">
              Behind the shot (blog)
            </a>
          </div>
          </motion.div>
        </section>

        {/* Services — each card links to albums in that style */}
        <Services />

        <PricingPackages />

        {/* Testimonials & Featured */}
        <Testimonials />

        {/* About */}
        <About />

        {/* Contact */}
        <Contact />
      </main>
    </div>
  );
}


function Services() {
  const features = [
    {
      href: '/collections/automotive',
      icon: <Car className="w-6 h-6" />,
      title: 'Automotive',
      body: 'Show-ready rollers, rig shots, events, dealers. Night or natural light — your car, your vibe.',
      hint: 'Events & shoots',
    },
    {
      href: '/collections/real-estate',
      icon: <Building2 className="w-6 h-6" />,
      title: 'Real Estate',
      body: 'MLS-ready interiors/exteriors, blue-hour sets, detail vignettes, and optional vertical video add-ons.',
      hint: 'Per listing & packages',
    },
    {
      href: '/collections/street',
      icon: <Camera className="w-6 h-6" />,
      title: 'Street',
      body: 'Candid city moments with cinematic tones. Small-footprint, big storytelling.',
      hint: 'Sessions & day rates',
    },
  ]
  return (
    <section id="services" className="scroll-mt-24">
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
          className="text-[rgb(var(--text-muted))] mt-4 text-lg max-w-2xl mx-auto"
        >
          Packages & custom quotes — tap a service to see albums in that style, or tell me your vision for a new shoot.
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
            key={f.href}
            initial={{ opacity: 0, y: 50, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: i * 0.1, type: "spring", stiffness: 100, damping: 18 }}
            whileHover={{ y: -6, transition: { duration: 0.25, ease: "easeOut" } }}
            className="group"
          >
            <Link
              href={f.href}
              className="block h-full rounded-token focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
              aria-label={`${f.title}: view albums and service details`}
            >
              <Card className="h-full border-border/60 bg-bg-card hover:border-accent/20 hover:shadow-glow transition-all duration-300 overflow-hidden relative cursor-pointer">
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
                  {f.hint && (
                    <p className="mt-3 text-xs text-[rgb(var(--text-subtle))] font-medium uppercase tracking-wider">
                      {f.hint}
                    </p>
                  )}
                  <p className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent group-hover:gap-2 transition-all">
                    View albums
                    <ChevronRight className="w-4 h-4" aria-hidden />
                  </p>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

function Testimonials() {
  return (
    <section id="testimonials" className="scroll-mt-24">
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-sm font-medium uppercase tracking-wider text-accent mb-4">Featured in & kind words</p>
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-[rgb(var(--text))]">What people say</h2>
        <div className="w-16 h-0.5 bg-accent/60 mx-auto mt-6 rounded-full" aria-hidden />
      </motion.div>
      <div className="grid md:grid-cols-3 gap-8">
        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <Card className="h-full border-border/60 bg-bg-card flex flex-col">
              <CardContent className="pt-6 pb-6 flex flex-col flex-1">
                <Quote className="w-8 h-8 text-accent/60 mb-3" aria-hidden />
                <p className="text-[rgb(var(--text-muted))] leading-relaxed flex-1">&ldquo;{t.quote}&rdquo;</p>
                <div className="mt-4 pt-4 border-t border-border/60">
                  <p className="font-semibold text-[rgb(var(--text))]">{t.name}</p>
                  {t.role && <p className="text-sm text-[rgb(var(--text-subtle))]">{t.role}</p>}
                  {t.project && <p className="text-xs text-accent/80 mt-1">{t.project}</p>}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
      <motion.div
        className="mt-12 text-center space-y-3"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-sm text-[rgb(var(--text-subtle))]">
          Events · Realtors · Enthusiasts · Brands
        </p>
        {siteConfig.press.length > 0 ? (
          <p className="text-xs text-[rgb(var(--text-muted))]">
            As seen in:{' '}
            {siteConfig.press.map((p, i) => (
              <span key={p.href}>
                {i > 0 ? ' · ' : null}
                <a href={p.href} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                  {p.name}
                </a>
              </span>
            ))}
          </p>
        ) : null}
      </motion.div>
    </section>
  )
}

function About() {
  return (
    <section id="about" className="scroll-mt-24">
      <motion.div
        className="grid lg:grid-cols-3 gap-10 items-start"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
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
      </motion.div>
    </section>
  )
}

function Contact() {
  return (
    <section id="contact" className="scroll-mt-24">
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-[rgb(var(--text))]">Get in Touch</h2>
        <p className="text-[rgb(var(--text-muted))] mt-4 text-lg">Tell me about your project—date, location, vibe, and deliverables</p>
        <div className="w-16 h-0.5 bg-accent/60 mx-auto mt-6 rounded-full" aria-hidden />
      </motion.div>
      <motion.div
        className="grid lg:grid-cols-3 gap-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card className="lg:col-span-2 border-border/60 bg-bg-card">
          <CardHeader>
            <CardTitle className="text-xl font-bold">Start a booking</CardTitle>
            <p className="text-[rgb(var(--text-muted))] text-sm">Fill out the form below and I'll get back to you within 24 hours</p>
          </CardHeader>
          <CardContent>
            <ContactForm />
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
      </motion.div>
    </section>
  )
}

