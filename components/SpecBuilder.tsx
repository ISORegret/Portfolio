'use client'

import { useMemo, useState } from 'react'
import { CheckCircle2, Loader2 } from 'lucide-react'
import { Field, Input, Textarea } from './ui'
import { addOnOptions, hourOptions, matchPackage, shootTypes } from '../lib/quote'

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mldwlpkk'

export default function SpecBuilder() {
  const [shootType, setShootType] = useState('')
  const [hours, setHours] = useState('')
  const [addOns, setAddOns] = useState<string[]>([])
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [formError, setFormError] = useState('')

  const matched = useMemo(() => matchPackage(shootType, hours), [shootType, hours])
  const realEstate = shootType === 'Real estate'
  const video = shootType === 'Video'

  function toggleAddOn(label: string) {
    setAddOns((current) => (current.includes(label) ? current.filter((item) => item !== label) : [...current, label]))
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!shootType) {
      setFormError('Pick a shoot type.')
      return
    }
    if (!realEstate && !hours) {
      setFormError('Pick a time block so the starting range can match a package.')
      return
    }
    const form = event.currentTarget
    const data = new FormData(form)
    setFormError('')
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
        setShootType('')
        setHours('')
        setAddOns([])
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
          Spec another shoot
        </button>
      </div>
    )
  }

  const locked = status === 'sending'

  return (
    <form action={FORMSPREE_ENDPOINT} method="POST" onSubmit={handleSubmit} className="space-y-6">
      <fieldset disabled={locked}>
        <legend className="eyebrow">Shoot type</legend>
        <div className="mt-3 grid grid-cols-2 gap-2">
          {shootTypes.map((type) => (
            <button
              key={type}
              type="button"
              className="choice"
              aria-pressed={shootType === type}
              onClick={() => setShootType(type)}
            >
              {type}
            </button>
          ))}
        </div>
        <input type="hidden" name="subject" value={shootType} />
      </fieldset>

      <fieldset disabled={locked}>
        <legend className="eyebrow">Hours</legend>
        <div className="mt-3 grid gap-2 sm:grid-cols-3">
          {hourOptions.map((option) => (
            <button
              key={option.id}
              type="button"
              className="choice"
              aria-pressed={hours === option.id}
              onClick={() => setHours(option.id)}
            >
              {option.label}
            </button>
          ))}
        </div>
        <input type="hidden" name="hours" value={hourOptions.find((option) => option.id === hours)?.label ?? ''} />
      </fieldset>

      <fieldset disabled={locked}>
        <legend className="eyebrow">Add-ons</legend>
        <p className="mt-2 text-[0.75rem] leading-relaxed text-[rgb(var(--text-muted))]">
          Named in the rate sheet. They do not change the starting range. The quote comes after scope.
        </p>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {addOnOptions.map((option) => (
            <button
              key={option.id}
              type="button"
              className="choice"
              aria-pressed={addOns.includes(option.label)}
              onClick={() => toggleAddOn(option.label)}
            >
              {option.label}
            </button>
          ))}
        </div>
        <input type="hidden" name="addons" value={addOns.join(', ')} />
      </fieldset>

      <div className="quote-block border-t border-[color:var(--line)] pt-6" aria-live="polite">
        <p className="eyebrow">Starting at</p>
        {matched ? (
          <>
            <p className="mt-3 font-display text-3xl font-medium leading-tight">{matched.name}</p>
            <p className="mt-3 text-[0.95rem] text-[rgb(var(--accent))]">{matched.price}</p>
            <p className="mt-3 text-[0.78rem] leading-relaxed text-[rgb(var(--text-muted))]">{matched.description}</p>
            {realEstate ? (
              <p className="mt-3 text-[0.75rem] leading-relaxed text-[rgb(var(--text-muted))]">
                Real estate listings use this listing rate. Hours are sent with the request.
              </p>
            ) : null}
            {video ? (
              <p className="mt-3 text-[0.75rem] leading-relaxed text-[rgb(var(--text-muted))]">
                There isn’t a separate video rate on file. This is the matching time package. Short video and reels are add-ons, quoted after scope.
              </p>
            ) : null}
          </>
        ) : (
          <p className="mt-3 text-[0.78rem] leading-relaxed text-[rgb(var(--text-muted))]">
            {realEstate
              ? 'The listing rate will show here.'
              : 'Pick a shoot type and a time block to see the matching package’s starting range.'}
          </p>
        )}
      </div>

      <input type="hidden" name="package" value={matched?.name ?? ''} />
      <input type="hidden" name="budget" value={matched?.price ?? ''} />

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
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Date" hint="Optional">
          <Input name="date" type="date" disabled={locked} />
        </Field>
        <Field label="Location" hint="Optional">
          <Input name="location" autoComplete="address-level2" placeholder="Jacksonville, or wherever the story is" disabled={locked} />
        </Field>
      </div>
      <Field label="Project">
        <Textarea name="message" required disabled={locked} placeholder="The car, the listing, the event, the deliverables." />
      </Field>

      {formError ? (
        <p role="alert" className="text-sm text-red-300">
          {formError}
        </p>
      ) : null}
      {status === 'error' ? (
        <p role="alert" className="text-sm text-red-300">
          Something went wrong. Please try again or email me directly.
        </p>
      ) : null}

      <button type="submit" className="btn btn-gold" disabled={locked}>
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
