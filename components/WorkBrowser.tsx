'use client'

import { useMemo, useState } from 'react'
import ProjectCard from './ProjectCard'
import { projects, type Project } from '../app/data/projects'

type Filter = 'All' | Project['category']

const filters: Filter[] = ['All', 'Automotive', 'Real Estate', 'Street']

export default function WorkBrowser() {
  const [filter, setFilter] = useState<Filter>('All')
  const visibleProjects = useMemo(
    () =>
      [...projects]
        .filter((project) => filter === 'All' || project.category === filter)
        .sort((a, b) => b.date.localeCompare(a.date)),
    [filter],
  )

  return (
    <>
      <div className="sticky top-[var(--header-h)] z-30 -mx-4 mb-10 border-y border-[rgb(var(--border-muted))] bg-[rgb(var(--bg)/0.92)] px-4 py-3 backdrop-blur sm:static sm:mx-0 sm:border-0 sm:bg-transparent sm:p-0 sm:backdrop-blur-none">
        <div className="flex gap-6 overflow-x-auto" role="toolbar" aria-label="Filter albums">
          {filters.map((item) => {
            const active = filter === item
            return (
              <button
                key={item}
                type="button"
                onClick={() => setFilter(item)}
                aria-pressed={active}
                className={`shrink-0 border-b pb-1 text-sm transition-colors ${
                  active
                    ? 'border-[rgb(var(--accent))] text-[rgb(var(--text))]'
                    : 'border-transparent text-[rgb(var(--text-muted))] hover:text-[rgb(var(--text))]'
                }`}
              >
                {item}
              </button>
            )
          })}
        </div>
      </div>

      <div className="masonry">
        {visibleProjects.map((project) => (
          <div key={project.slug}>
            <ProjectCard {...project} fromPath="/work" />
          </div>
        ))}
      </div>
    </>
  )
}
