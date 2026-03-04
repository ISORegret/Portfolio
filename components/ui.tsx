import * as React from 'react'

export function Button({ className = '', variant = 'default', size = 'md', ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'default' | 'secondary'; size?: 'sm' | 'md' | 'lg' }) {
  const base = 'rounded-token inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg'
  const variants = {
    default: 'bg-accent text-neutral-900 hover:bg-accent-muted shadow-soft hover:shadow-glow',
    secondary: 'bg-bg-card border border-border text-[rgb(var(--text))] hover:border-border-muted hover:bg-bg-elevated',
  } as const
  const sizes = { sm: 'text-sm px-3 py-1.5', md: 'text-sm px-4 py-2', lg: 'text-base px-6 py-3' } as const
  return <button className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...props} />
}

export function Card({ className = '', children }: React.PropsWithChildren<{ className?: string }>) {
  return (
    <div className={`rounded-token-lg border border-border/60 bg-bg-card shadow-soft ${className}`}>
      {children}
    </div>
  )
}
export function CardHeader({ children, className = '' }: React.PropsWithChildren<{ className?: string }>) {
  return <div className={`px-5 pt-5 ${className}`}>{children}</div>
}
export function CardTitle({ children, className = '' }: React.PropsWithChildren<{ className?: string }>) {
  return <h3 className={`text-lg font-semibold text-[rgb(var(--text))] ${className}`}>{children}</h3>
}
export function CardContent({ children, className = '' }: React.PropsWithChildren<{ className?: string }>) {
  return <div className={`px-5 pb-5 ${className}`}>{children}</div>
}

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`w-full rounded-token bg-bg-elevated border border-border px-3 py-2.5 text-sm text-[rgb(var(--text))] placeholder:text-[rgb(var(--text-subtle))] outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent/30 ${props.className ?? ''}`}
    />
  )
}
export function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={`w-full rounded-token bg-bg-elevated border border-border px-3 py-2.5 text-sm text-[rgb(var(--text))] placeholder:text-[rgb(var(--text-subtle))] outline-none min-h-[120px] transition-colors focus:border-accent focus:ring-1 focus:ring-accent/30 ${props.className ?? ''}`}
    />
  )
}
