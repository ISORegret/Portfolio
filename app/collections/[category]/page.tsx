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
    <main className="shell space-y-10 py-28">
      {!category ? (
        <h1 className="display text-4xl">Category not found.</h1>
      ) : (
        <>
          <header>
            <h1 className="display text-[clamp(3rem,7vw,5rem)]">{category}</h1>
            <p className="mt-4 text-lg text-[rgb(var(--text-muted))]">Albums in this category — open a card for the full set.</p>
          </header>

          {list.length === 0 ? (
            category === 'Real Estate'
              ? <p className="text-[rgb(var(--text-muted))]">Real Estate projects — Coming Soon.</p>
              : <p className="text-[rgb(var(--text-muted))]">No projects yet.</p>
          ) : (
            <div className="masonry">
              {list.map((p) => (
                <ProjectCard
                  key={p.slug}
                  slug={p.slug}
                  title={p.title}
                  category={p.category}
                  cover={p.cover}
                  date={p.date}
                  fromPath={`/collections/${catKey}`}
                />
              ))}
            </div>
          )}
        </>
      )}
    </main>
  );
}
