import './globals.css'
import type { Metadata, Viewport } from 'next'
import { Playfair_Display, Archivo } from 'next/font/google'
import SiteHeader from '../components/SiteHeader'
import SiteFooter from '../components/SiteFooter'
import { SITE_URL, siteConfig, seoKeywords } from './data/site'

const display = Playfair_Display({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-display',
})

const sans = Archivo({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-sans',
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

export const viewport: Viewport = {
  themeColor: '#090909',
  colorScheme: 'dark',
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
  priceRange: '$150–$2,500',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`} suppressHydrationWarning>
      <body className="min-h-screen bg-bg font-sans text-[rgb(var(--text))] antialiased">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:bg-[rgb(var(--text))] focus:px-4 focus:py-2 focus:text-[rgb(var(--ink))]"
        >
          Skip to content
        </a>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  )
}
