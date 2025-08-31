import * as React from 'react'

export function Button({ className = '', variant = 'default', size = 'md', ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & {variant?: 'default'|'secondary', size?: 'sm'|'md'|'lg'}) {
  const base = 'rounded-2xl inline-flex items-center justify-center font-medium transition px-4 py-2'
  const variants = {
    default: 'bg-white text-neutral-900 hover:opacity-90',
    secondary: 'bg-neutral-800 text-neutral-100 hover:bg-neutral-700'
  } as const
  const sizes = { sm: 'text-sm px-3 py-1.5', md: 'text-sm', lg: 'text-base px-5 py-3' } as const
  return <button className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...props} />
}

export function Card({ className = '', children }: React.PropsWithChildren<{className?: string}>) {
  return <div className={`rounded-2xl border border-neutral-800 bg-neutral-900 ${className}`}>{children}</div>
}
export function CardHeader({ children, className='' }: React.PropsWithChildren<{className?: string}>) {
  return <div className={`px-5 pt-5 ${className}`}>{children}</div>
}
export function CardTitle({ children, className='' }: React.PropsWithChildren<{className?: string}>) {
  return <h3 className={`text-lg font-semibold ${className}`}>{children}</h3>
}
export function CardContent({ children, className='' }: React.PropsWithChildren<{className?: string}>) {
  return <div className={`px-5 pb-5 ${className}`}>{children}</div>
}

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`w-full rounded-xl bg-neutral-800 border border-neutral-700 px-3 py-2 text-sm outline-none focus:border-neutral-500 ${props.className||''}`} />
}
export function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={`w-full rounded-xl bg-neutral-800 border border-neutral-700 px-3 py-2 text-sm outline-none min-h-[120px] focus:border-neutral-500 ${props.className||''}`} />
}
