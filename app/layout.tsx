import './globals.css'
import type { Metadata } from 'next'
import { Syne, DM_Sans } from 'next/font/google'
import SiteHeader from '../components/SiteHeader'
import SiteFooter from '../components/SiteFooter'
import { SITE_URL, siteConfig, seoKeywords } from './data/site'

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${siteConfig.brandName} | Jacksonville photographer · automotive, real estate & events`,
    template: `%s | ${siteConfig.brandName}`,
  },
  description: siteConfig.defaultDescription,
  keywords: [...seoKeywords],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: siteConfig.brandName,
    title: `${siteConfig.brandName} | Jacksonville, FL photographer — automotive & real estate`,
    description: siteConfig.defaultDescription,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.brandName} | Jacksonville photographer`,
    description: siteConfig.defaultDescription,
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html data-theme="dark" lang="en" className={`${syne.variable} ${dmSans.variable}`} suppressHydrationWarning>
      <body className="min-h-screen bg-bg text-[rgb(var(--text))] font-sans antialiased">
          <SiteHeader />
          {children}
          <SiteFooter />
      </body>
    </html>
  )
}
