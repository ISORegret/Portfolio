import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ISO.Regret — Photography Portfolio',
  description: 'Automotive, Real Estate, and Street photography by Ryan. Jacksonville, FL.',
  metadataBase: new URL('https://example.com')
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
