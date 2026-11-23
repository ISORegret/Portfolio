export type FaqItem = {
  q: string
  a: string
}

/**
 * Mock-style FAQ: question rows separated by hairlines, a + marker that
 * turns into a – when open. Native <details> so answers paint with no JS.
 */
export default function FaqAccordion({ items }: { items: FaqItem[] }) {
  return (
    <div className="faq-list">
      {items.map((item) => (
        <details key={item.q} className="faq-item">
          <summary className="faq-question">
            <span>{item.q}</span>
            <span className="faq-marker" aria-hidden>
              +
            </span>
          </summary>
          <p className="faq-answer">{item.a}</p>
        </details>
      ))}
    </div>
  )
}
