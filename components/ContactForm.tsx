'use client';

import { useState } from 'react';
import { Button, Input, Textarea } from './ui';
import { CheckCircle2, Loader2 } from 'lucide-react';

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mldwlpkk';

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setStatus('sending');
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });
      if (res.ok) {
        setStatus('success');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-token-lg border border-border/60 bg-bg-card p-8 text-center">
        <CheckCircle2 className="w-12 h-12 text-accent mx-auto mb-4" aria-hidden />
        <h3 className="font-display text-xl font-semibold text-[rgb(var(--text))]">Message sent</h3>
        <p className="text-[rgb(var(--text-muted))] mt-2">I&apos;ll get back to you within 24 hours.</p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="mt-6 text-accent hover:text-accent-muted font-medium transition-colors"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form action={FORMSPREE_ENDPOINT} method="POST" onSubmit={handleSubmit} className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <Input required name="name" placeholder="Your name" className="w-full" disabled={status === 'sending'} />
        </div>
        <div>
          <Input
            required
            type="email"
            name="email"
            placeholder="Email address"
            className="w-full"
            disabled={status === 'sending'}
          />
        </div>
      </div>
      <div>
        <Input
          name="phone"
          type="tel"
          placeholder="Phone number (optional)"
          className="w-full"
          disabled={status === 'sending'}
        />
      </div>
      <div>
        <Input
          name="subject"
          placeholder="Shoot type / subject"
          className="w-full"
          disabled={status === 'sending'}
        />
      </div>
      <div>
        <Textarea
          required
          name="message"
          placeholder="Tell me about your project… date, location, vibe, and deliverables"
          className="w-full min-h-[120px]"
          disabled={status === 'sending'}
        />
      </div>
      {status === 'error' && (
        <p className="text-sm text-red-400">Something went wrong. Please try again or email me directly.</p>
      )}
      <Button type="submit" className="w-full sm:w-auto px-8 py-3 text-lg font-semibold" disabled={status === 'sending'}>
        {status === 'sending' ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin mr-2 inline" aria-hidden />
            Sending…
          </>
        ) : (
          'Send Message'
        )}
      </Button>
    </form>
  );
}
