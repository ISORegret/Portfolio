import type { Metadata } from 'next';
import WorkBrowser from '../../components/WorkBrowser';
import { SITE_URL } from '../data/site';

export const metadata: Metadata = {
  title: 'Work',
  description: 'Curated automotive, real estate, and street photography albums by ISO.Regret.',
  openGraph: {
    title: 'Work | ISO.Regret',
    description: 'Curated automotive, real estate, and street photography albums by ISO.Regret.',
    url: `${SITE_URL}/work`,
  },
  alternates: { canonical: `${SITE_URL}/work` },
};

export default function WorkPage() {
  return (
    <main className="min-h-screen bg-bg px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="mx-auto mb-10 max-w-2xl text-center sm:mb-12">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.18em] text-accent">Selected work</p>
          <h1 className="font-display text-4xl font-bold text-[rgb(var(--text))] sm:text-5xl">
            Pick a lane. Start looking.
          </h1>
          <p className="mt-4 text-lg text-[rgb(var(--text-muted))]">
            Curated albums here. Full-resolution galleries and downloads on Pixieset.
          </p>
        </header>

        <WorkBrowser />
      </div>
    </main>
  );
}
