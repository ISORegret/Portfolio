'use client';

import ProjectCard from '../../../components/ProjectCard';
import { projects } from '../../data/projects';

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
    <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-10">
      {!category ? (
        <h1 className="font-display text-2xl font-semibold text-[rgb(var(--text))]">Category not found.</h1>
      ) : (
        <>
          <header>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-[rgb(var(--text))]">{category} Collection</h1>
            <p className="text-[rgb(var(--text-muted))] mt-2 text-lg">Curated shoots and albums in {category.toLowerCase()}.</p>
            <div className="w-16 h-0.5 bg-accent/60 rounded-full mt-4" aria-hidden />
          </header>

          {list.length === 0 ? (
            category === 'Real Estate'
              ? <p className="text-[rgb(var(--text-muted))] italic">🏡 Real Estate projects — Coming Soon.</p>
              : <p className="text-[rgb(var(--text-muted))]">No projects yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {list.map((p) => (
                <ProjectCard
                  key={p.slug}
                  slug={p.slug}
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
  );
}
