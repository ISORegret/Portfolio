import * as React from 'react'

const fieldClass =
  'w-full rounded-token border border-border bg-bg-elevated px-3 py-3 text-sm text-[rgb(var(--text))] outline-none transition-colors placeholder:text-[rgb(var(--text-subtle))] focus:border-[rgb(var(--accent))]'

export function Button({
  className = '',
  variant = 'default',
  size = 'md',
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'default' | 'secondary'; size?: 'sm' | 'md' | 'lg' }) {
  const base = 'inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--accent))] focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:opacity-60'
  const variants = {
    default: 'bg-accent text-[rgb(var(--ink))] hover:bg-accent-muted',
    secondary: 'border border-border bg-bg-card text-[rgb(var(--text))] hover:border-[rgb(var(--accent))]',
  } as const
  const sizes = { sm: 'text-sm px-3 py-1.5', md: 'text-sm px-4 py-2', lg: 'text-base px-6 py-3' } as const
  return <button className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...props} />
}

export function Card({ className = '', children }: React.PropsWithChildren<{ className?: string }>) {
  return <div className={`border border-border/70 bg-bg-card ${className}`}>{children}</div>
}

export function CardHeader({ children, className = '' }: React.PropsWithChildren<{ className?: string }>) {
  return <div className={`px-5 pt-5 ${className}`}>{children}</div>
}

export function CardTitle({ children, className = '' }: React.PropsWithChildren<{ className?: string }>) {
  return <h3 className={`font-display text-2xl font-medium leading-none text-[rgb(var(--text))] ${className}`}>{children}</h3>
}

export function CardContent({ children, className = '' }: React.PropsWithChildren<{ className?: string }>) {
  return <div className={`px-5 pb-5 ${className}`}>{children}</div>
}

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`${fieldClass} ${props.className ?? ''}`} />
}

export function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={`${fieldClass} min-h-[140px] ${props.className ?? ''}`} />
}

export function Select({ className, children, ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select {...props} className={`${fieldClass} ${className ?? ''}`}>
      {children}
    </select>
  )
}

export function Field({
  label,
  children,
  hint,
}: {
  label: string
  children: React.ReactNode
  hint?: string
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm text-[rgb(var(--text-muted))]">{label}</span>
      {children}
      {hint ? <span className="mt-1 block text-xs text-[rgb(var(--text-subtle))]">{hint}</span> : null}
    </label>
  )
}
