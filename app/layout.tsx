import './globals.css'
import type { Metadata } from 'next'
import { Barlow_Condensed, Outfit } from 'next/font/google'
import SiteHeader from '../components/SiteHeader'
import SiteFooter from '../components/SiteFooter'
import StickyBookBar from '../components/StickyBookBar'
import { SITE_URL, siteConfig, seoKeywords } from './data/site'

const display = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
})

const sans = Outfit({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const ogImage = {
  url: '/og.jpg',
  width: 1200,
  height: 630,
  alt: 'ISO.Regret — Jacksonville photo and film',
}

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
    images: [ogImage],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.brandName} | Jacksonville photographer`,
    description: siteConfig.defaultDescription,
    images: ['/og.jpg'],
  },
  robots: { index: true, follow: true },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': ['Photographer', 'LocalBusiness'],
  name: siteConfig.brandName,
  url: SITE_URL,
  image: `${SITE_URL}/og.jpg`,
  email: 'Brickel.Ryan@icloud.com',
  description: siteConfig.defaultDescription,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Jacksonville',
    addressRegion: 'FL',
    addressCountry: 'US',
  },
  areaServed: ['Jacksonville', 'Northeast Florida'],
  sameAs: ['https://www.instagram.com/iso.regret/'],
  priceRange: 'Roughly $150–$2,500+',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark" className={`${display.variable} ${sans.variable}`} suppressHydrationWarning>
      <body className="min-h-screen bg-bg pb-24 font-sans text-[rgb(var(--text))] antialiased md:pb-0">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:bg-[rgb(var(--accent))] focus:px-4 focus:py-2 focus:text-[rgb(var(--ink))]"
        >
          Skip to content
        </a>
        <SiteHeader />
        {children}
        <SiteFooter />
        <StickyBookBar />
      </body>
    </html>
  )
}
