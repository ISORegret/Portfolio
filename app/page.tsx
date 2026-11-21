import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import FilmGallery from '../components/FilmGallery'
import HeroSection from '../components/HeroSection'
import ProjectCard from '../components/ProjectCard'
import ContactForm from '../components/ContactForm'
import ServicesSection from '../components/ServicesSection'
import PricingPackages from '../components/PricingPackages'
import Testimonials from '../components/Testimonials'
import SectionHeading from '../components/SectionHeading'
import { projects } from './data/projects'
import { siteConfig } from './data/site'

const crops = [
  'aspect-[4/5]',
  'aspect-[4/5]',
  'aspect-[3/4]',
  'aspect-[3/4]',
  'aspect-[3/4]',
  'aspect-[16/9] lg:aspect-[2.4/1]',
]

const sizes = [
  '(min-width: 1024px) 58vw, 100vw',
  '(min-width: 1024px) 40vw, 100vw',
  '(min-width: 1024px) 32vw, 50vw, 100vw',
  '(min-width: 1024px) 32vw, 50vw, 100vw',
  '(min-width: 1024px) 32vw, 50vw, 100vw',
  '100vw',
]

const spans = [
  'md:col-span-2 lg:col-span-7',
  'lg:col-span-5',
  'lg:col-span-4',
  'lg:col-span-4',
  'lg:col-span-4',
  'md:col-span-2 lg:col-span-12',
]

export default function Page() {
  const latest = [...projects].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 6)

  return (
    <main>
      <HeroSection />
      <section id="latest" className="section">
        <div className="shell">
          <SectionHeading
            index="01"
            eyebrow="Fresh frames"
            title="The latest"
            action={
              <Link href="/work" className="btn-text">
                View all work <ArrowUpRight size={16} aria-hidden />
              </Link>
            }
          />
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-12 lg:gap-x-6 lg:gap-y-12">
            {latest.map((project, index) => (
              <div key={project.slug} className={spans[index] ?? 'lg:col-span-4'}>
                <ProjectCard {...project} fromPath="/#latest" crop={crops[index] ?? 'aspect-[4/5]'} date={project.date} sizes={sizes[index]} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <FilmGallery />
      <ServicesSection />
      <PricingPackages />
      <Testimonials />

      <section id="about" className="section border-t border-[rgb(var(--border-muted))]">
        <div className="shell grid items-start gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          <div>
            <span className="mb-5 block h-px w-10 bg-[rgb(var(--teal))]" aria-hidden />
            <p className="eyebrow">
              <span className="mr-3 text-[rgb(var(--accent))]">06</span>
              The photographer
            </p>
            <h2 className="display mt-3 text-[clamp(3rem,6vw,5rem)]">
              Good light.
              <br />
              <span className="text-[rgb(var(--accent))]">Zero regret.</span>
            </h2>
          </div>
          <div className="max-w-xl space-y-5 text-base leading-relaxed text-[rgb(var(--text-muted))] lg:pt-16">
            <p>ISO.Regret is my view of the world. I’m Ryan, based in Jacksonville, drawn to good light, interesting details, and the stories happening right in front of us.</p>
            <p>Automotive is a big part of the work. There’s plenty more worth photographing.</p>
            <p>{siteConfig.colorStory}</p>
            <div className="flex flex-wrap gap-x-6 gap-y-2 pt-2 text-sm text-[rgb(var(--text))]">
              <Link href="/collections/automotive" className="hover:text-[rgb(var(--accent-muted))]">Automotive</Link>
              <a href="/#contact" className="hover:text-[rgb(var(--accent-muted))]">Events</a>
              <Link href="/collections/street" className="hover:text-[rgb(var(--accent-muted))]">People &amp; places</Link>
              <Link href="/collections/real-estate" className="hover:text-[rgb(var(--accent-muted))]">Real estate</Link>
              <Link href="/blog" className="hover:text-[rgb(var(--accent-muted))]">Journal</Link>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="section border-t border-[rgb(var(--border-muted))]">
        <div className="shell grid items-start gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div>
            <p className="eyebrow">Make something worth keeping</p>
            <h2 className="display mt-3 text-[clamp(3rem,6vw,5rem)]">
              Let’s make
              <br />
              something.
            </h2>
            <p className="mt-6 max-w-sm text-base leading-relaxed text-[rgb(var(--text-muted))]">
              A car you’re proud of. An event you’re planning. An idea you want to try. Let’s talk about it.
            </p>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-[rgb(var(--text-muted))]">
              <span className="text-[rgb(var(--text))]">What happens next. </span>
              I’ll reply within 24 hours. Galleries are typically ready 48–72 hours after the shoot.
            </p>
            <a href="mailto:Brickel.Ryan@icloud.com" className="btn-text mt-4">
              Brickel.Ryan@icloud.com <ArrowUpRight size={16} aria-hidden />
            </a>
          </div>
          <ContactForm />
        </div>
      </section>
    </main>
  )
}
