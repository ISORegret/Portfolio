'use client'

import { useState } from 'react'
import { CheckCircle2, Loader2 } from 'lucide-react'
import { Field, Input, Select, Textarea } from './ui'

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mldwlpkk'

const shootTypes = ['Automotive', 'Real estate', 'Event', 'Video', 'People & places', 'Not sure yet']

const budgets = [
  'Roughly $150–$500+',
  'Roughly $400–$1,000+',
  'Roughly $800–$2,500+',
  'Real estate — roughly $150–$500+ per listing',
  'Not sure yet',
]

export default function ContactForm() {
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
      <div className="border border-[rgb(var(--border))] bg-bg-card px-6 py-10 text-center" role="status">
        <CheckCircle2 className="mx-auto mb-4 h-10 w-10 text-[rgb(var(--accent))]" aria-hidden />
        <h3 className="font-display text-3xl">Message sent</h3>
        <p className="mt-3 text-[rgb(var(--text-muted))]">I’ll get back to you within 24 hours.</p>
        <button type="button" onClick={() => setStatus('idle')} className="btn-text mx-auto mt-6">
          Send another message
        </button>
      </div>
    )
  }

  const locked = status === 'sending'

  return (
    <form action={FORMSPREE_ENDPOINT} method="POST" onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name">
          <Input name="name" autoComplete="name" required disabled={locked} />
        </Field>
        <Field label="Email">
          <Input name="email" type="email" autoComplete="email" required disabled={locked} />
        </Field>
      </div>
      <Field label="Phone" hint="Optional">
        <Input name="phone" type="tel" autoComplete="tel" disabled={locked} />
      </Field>
      <Field label="Shoot type">
        <Select name="subject" defaultValue="" disabled={locked}>
          <option value="">Select a shoot type</option>
          {shootTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </Select>
      </Field>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Date" hint="Optional">
          <Input name="date" type="date" disabled={locked} />
        </Field>
        <Field label="Location" hint="Optional">
          <Input name="location" autoComplete="address-level2" placeholder="Jacksonville, or wherever the story is" disabled={locked} />
        </Field>
      </div>
      <Field label="Budget" hint="Optional. Ranges are starting points.">
        <Select name="budget" defaultValue="" disabled={locked}>
          <option value="">Select a range</option>
          {budgets.map((budget) => (
            <option key={budget} value={budget}>
              {budget}
            </option>
          ))}
        </Select>
      </Field>
      <Field label="Project">
        <Textarea name="message" required disabled={locked} placeholder="The car, the event, the deliverables." />
      </Field>
      {status === 'error' ? (
        <p role="alert" className="text-sm text-red-300">
          Something went wrong. Please try again or email me directly.
        </p>
      ) : null}
      <button type="submit" className="btn btn-primary w-full sm:w-auto" disabled={locked}>
        {locked ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
            Sending…
          </>
        ) : (
          'Send message'
        )}
      </button>
    </form>
  )
}
