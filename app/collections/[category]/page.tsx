'use client';

import ProjectCard from '../../../components/ProjectCard';
import { projects } from '../../data/projects';
import SiteHeader from '../../../components/SiteHeader';
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
      <SiteHeader />
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


    </main>
  );
}
