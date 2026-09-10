'use client';

import { useMemo, useState } from 'react';
import ProjectCard from './ProjectCard';
import { projects, type Project } from '../app/data/projects';

type Filter = 'All' | Project['category'];

const filters: Filter[] = ['All', 'Automotive', 'Real Estate', 'Street'];

export default function WorkBrowser() {
  const [filter, setFilter] = useState<Filter>('All');
  const visibleProjects = useMemo(
    () =>
      [...projects]
        .filter((project) => filter === 'All' || project.category === filter)
        .sort((a, b) => b.date.localeCompare(a.date)),
    [filter],
  );

  return (
    <>
      <div
        className="sticky top-16 z-30 -mx-4 mb-10 overflow-x-auto border-y border-border/50 bg-bg/90 px-4 py-3 backdrop-blur sm:static sm:mx-0 sm:overflow-visible sm:border-0 sm:bg-transparent sm:p-0 sm:backdrop-blur-none"
        aria-label="Filter albums"
      >
        <div className="flex min-w-max gap-2 sm:min-w-0 sm:justify-center">
          {filters.map((item) => {
            const active = filter === item;
            return (
              <button
                key={item}
                type="button"
                onClick={() => setFilter(item)}
                aria-pressed={active}
                className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                  active
                    ? 'border-accent bg-accent text-neutral-950'
                    : 'border-border bg-bg-card text-[rgb(var(--text-muted))] hover:border-accent/50 hover:text-[rgb(var(--text))]'
                }`}
              >
                {item}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visibleProjects.map((project) => (
          <ProjectCard key={project.slug} {...project} fromPath="/work" />
        ))}
      </div>
    </>
  );
}
