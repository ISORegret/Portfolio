import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { SITE_URL } from '../data/site';

export const metadata: Metadata = {
  title: 'All photos',
  description:
    'Full image grid of every shoot — ISO.Regret. Jacksonville automotive, real estate, and street photography.',
  openGraph: {
    title: 'All photos | ISO.Regret',
    description: 'Browse every image from every album on one page.',
    url: `${SITE_URL}/gallery`,
  },
  alternates: { canonical: `${SITE_URL}/gallery` },
};

export default function GalleryLayout({ children }: { children: ReactNode }) {
  return children;
}
