import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { SITE_URL } from '../data/site';

export const metadata: Metadata = {
  title: 'Photography albums',
  description: 'Curated photography albums by ISO.Regret.',
  openGraph: {
    title: 'Photography albums | ISO.Regret',
    description: 'Curated photography albums by ISO.Regret.',
    url: `${SITE_URL}/work`,
  },
  alternates: { canonical: `${SITE_URL}/work` },
};

export default function GalleryLayout({ children }: { children: ReactNode }) {
  return children;
}
