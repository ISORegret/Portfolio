'use client'

import { useState } from 'react'
import { CheckCircle2, Loader2 } from 'lucide-react'

/**
 * Booking form, styled to the design mock: shoot type, date, location,
 * budget range, "What are we shooting?" — gold "Send enquiry by email".
 * Delivery is unchanged: POST to the existing Formspree endpoint.
 * Name + email are included (the mock omits them, but an enquiry with
 * no way to reply is undeliverable).
 */
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mldwlpkk'

const shootTypes = ['Automotive', 'Real estate', 'Event', 'Film / video', 'Other'] as const
const budgetRanges = ['$150 – $400', '$400 – $900', '$900 – $1,600', '$1,600 – $2,500', 'Not sure yet'] as const

export default function SpecBuilder() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    setStatus('sending')
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      })
      if (res.ok) {
        setStatus('success')
        form.reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="py-6" role="status">
        <CheckCircle2 className="mb-4 h-8 w-8 text-[rgb(var(--accent))]" aria-hidden />
        <h3 className="font-display text-4xl font-medium">Message sent</h3>
        <p className="mt-3 text-[0.82rem] leading-relaxed text-[rgb(var(--text-muted))]">I’ll get back to you within 24 hours.</p>
        <button type="button" onClick={() => setStatus('idle')} className="text-link mt-2">
          Send another enquiry
        </button>
      </div>
    )
  }

  const locked = status === 'sending'

  return (
    <form action={FORMSPREE_ENDPOINT} method="POST" onSubmit={handleSubmit} className="book">
      <input type="hidden" name="_subject" value="New shoot enquiry — ISO.Regret Media" />
      <label>
        Shoot type
        <select name="shoot_type" disabled={locked} defaultValue="Automotive">
          {shootTypes.map((type) => (
            <option key={type}>{type}</option>
          ))}
        </select>
      </label>
      <label>
        Date
        <input type="date" name="date" disabled={locked} />
      </label>
      <label>
        Location
        <input type="text" name="location" placeholder="Venue or neighbourhood" disabled={locked} />
      </label>
      <label>
        Budget range
        <select name="budget" disabled={locked} defaultValue="$400 – $900">
          {budgetRanges.map((range) => (
            <option key={range}>{range}</option>
          ))}
        </select>
      </label>
      <label>
        Name
        <input type="text" name="name" autoComplete="name" placeholder="Your name" required disabled={locked} />
      </label>
      <label>
        Email
        <input type="email" name="email" autoComplete="email" placeholder="you@example.com" required disabled={locked} />
      </label>
      <label className="full">
        What are we shooting?
        <textarea name="message" placeholder="Car, listing, event — and anything else that matters" required disabled={locked} />
      </label>

      {status === 'error' ? (
        <p role="alert" className="full text-sm text-red-300">
          Something went wrong. Please try again or email me directly.
        </p>
      ) : null}

      <button type="submit" disabled={locked}>
        {locked ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
            Sending…
          </>
        ) : (
          'Send enquiry by email'
        )}
      </button>
    </form>
  )
}
