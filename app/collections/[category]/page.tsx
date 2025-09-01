'use client';

import ProjectCard from '../../../components/ProjectCard';
import { projects } from '../../data/projects';
import SiteFooter from '../../../components/SiteFooter';

const titleMap: Record<string, 'Automotive' | 'Real Estate' | 'Street'> = {
  'automotive': 'Automotive',
  'real-estate': 'Real Estate',
  'street': 'Street',
};

export default function Page({ params }: { params: { category: string } }) {
  const catKey = params.category.toLowerCase();
  const category = titleMap[catKey];

  const list = category
    ? projects
        .filter((p) => p.category === category)
        .sort((a, b) => b.date.localeCompare(a.date))
    : [];

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      {/* Inline header so collections pages always show navigation */}
      <header className="sticky top-0 z-50 border-b border-neutral-800 bg-neutral-950/80 backdrop-blur">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <a href="/" className="font-semibold tracking-wide">ISO.Regret</a>
          <nav className="flex items-center gap-6 text-sm">
            <a href="/" className="hover:text-white/90">Home</a>
            <a href="/#collections" className="hover:text-white/90">Collections</a>
            <a href="/#latest" className="hover:text-white/90">Latest</a>
            <a href="/#about" className="hover:text-white/90">About</a>
            <a href="/#contact" className="hover:text-white/90">Contact</a>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
        {!category ? (
          <h1 className="text-2xl font-semibold">Category not found.</h1>
        ) : (
          <>
            <header>
              <h1 className="text-3xl font-semibold">{category} Collection</h1>
              <p className="text-neutral-400 mt-2">
                Curated shoots and albums in {category.toLowerCase()}.
              </p>
            </header>

            {list.length === 0 ? (
              category === 'Real Estate' ? (
                <p className="text-neutral-400 italic">🏡 Real Estate projects — Coming Soon.</p>
              ) : (
                <p className="text-neutral-400">No projects yet.</p>
              )
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {list.map((p) => (
                  <ProjectCard
                    key={p.slug}
                    title={p.title}
                    category={p.category}
                    cover={p.cover}
                    album={p.album}
                    blurb={p.blurb}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </main>

      <SiteFooter />
    </div>
  );
}
