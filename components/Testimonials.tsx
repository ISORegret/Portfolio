import { testimonials } from '../app/data/testimonials'
import SectionHeading from './SectionHeading'

export default function Testimonials() {
  return (
    <section className="section" aria-labelledby="testimonials-heading">
      <div className="shell">
        <SectionHeading index="05" eyebrow="Clients" title="In their words" id="testimonials-heading" />
        <ul className="grid gap-12 lg:grid-cols-3 lg:gap-10">
          {testimonials.map((item) => (
            <li key={item.name} className="border-t border-[rgb(var(--border-muted))] pt-6">
              <blockquote>
                <p className="text-lg leading-relaxed text-[rgb(var(--text))]">“{item.quote}”</p>
                <footer className="mt-6 text-sm text-[rgb(var(--text-muted))]">
                  <span className="text-[rgb(var(--text))]">{item.name}</span>
                  {item.role ? ` · ${item.role}` : ''}
                  {item.project ? <span className="mt-1 block text-[rgb(var(--text-subtle))]">{item.project}</span> : null}
                </footer>
              </blockquote>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
