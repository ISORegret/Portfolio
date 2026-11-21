import { testimonials } from '../app/data/testimonials'

export default function Testimonials() {
  return (
    <section className="border-t border-[color:var(--line-strong)]" aria-labelledby="testimonials-heading">
      <div className="shell py-16 md:py-20">
        <p className="eyebrow">On file</p>
        <h2 id="testimonials-heading" className="display mt-3 text-[clamp(3rem,6vw,5.2rem)]">
          In their words
        </h2>
        <ul className="mt-8 border-t border-[color:var(--line-strong)]">
          {testimonials.map((item) => (
            <li key={item.name} className="grid gap-4 border-b border-[color:var(--line)] py-6 md:grid-cols-[1fr_16rem] md:gap-10">
              <blockquote>
                <p className="text-[0.95rem] leading-relaxed">“{item.quote}”</p>
              </blockquote>
              <footer className="text-[0.72rem] uppercase leading-relaxed tracking-[0.08em] text-[rgb(var(--text-muted))]">
                <p className="text-[rgb(var(--text))]">{item.name}</p>
                {item.role ? <p className="mt-1">{item.role}</p> : null}
                {item.project ? <p className="mt-1">{item.project}</p> : null}
              </footer>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
