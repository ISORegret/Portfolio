import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { SITE_URL } from '../data/site';
import { withBrand } from '../../lib/brandedTitle';

const title = withBrand('Photography albums');

export const metadata: Metadata = {
  title,
  description: 'Curated photography albums by ISO.Regret.',
  openGraph: {
    title: title.absolute,
    description: 'Curated photography albums by ISO.Regret.',
    url: `${SITE_URL}/work`,
  },
  alternates: { canonical: `${SITE_URL}/work` },
};

export default function GalleryLayout({ children }: { children: ReactNode }) {
  return children;
}
