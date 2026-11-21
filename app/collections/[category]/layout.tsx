import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { SITE_URL } from '../../data/site';
import { withBrand } from '../../../lib/brandedTitle';

const titleMap: Record<string, string> = {
  automotive: 'Automotive albums',
  'real-estate': 'Real Estate albums',
  street: 'Street photography albums',
};

export async function generateMetadata({
  params,
}: {
  params: { category: string };
}): Promise<Metadata> {
  const key = params.category.toLowerCase();
  const label = titleMap[key];
  if (!label) return { title: withBrand('Category') };

  const title = withBrand(label);
  const description = `Browse ${label.toLowerCase()} — Jacksonville, FL. ISO.Regret photography.`;
  const url = `${SITE_URL}/collections/${encodeURIComponent(key)}`;

  return {
    title,
    description,
    openGraph: { title: title.absolute, description, url },
    alternates: { canonical: url },
  };
}

export default function CollectionLayout({ children }: { children: ReactNode }) {
  return children;
}
