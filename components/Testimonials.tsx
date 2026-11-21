import { testimonials } from '../app/data/testimonials'

export default function Testimonials() {
  return (
    <section aria-labelledby="testimonials-heading">
      <div className="shell pb-20 md:pb-28">
        <p className="eyebrow">On file</p>
        <h2 id="testimonials-heading" className="display mt-3 text-[clamp(2.6rem,5vw,4.25rem)]">
          In their words
        </h2>
        <ul className="mt-8">
          {testimonials.map((item) => (
            <li key={item.name} className="grid gap-4 border-t border-[color:var(--line)] py-8 md:grid-cols-[1fr_16rem] md:gap-12">
              <blockquote>
                <p className="font-display text-[1.65rem] font-normal italic leading-snug">“{item.quote}”</p>
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
