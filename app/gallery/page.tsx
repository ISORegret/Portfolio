'use client';

import { motion } from 'framer-motion';
import ProjectCard from '../../components/ProjectCard';
import { projects } from '../data/projects';

export default function GalleryPage() {
  const sorted = [...projects].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div className="min-h-screen bg-bg">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-[rgb(var(--text))]">
            Full gallery
          </h1>
          <p className="text-[rgb(var(--text-muted))] mt-4 text-lg">
            All projects — automotive, real estate, and street.
          </p>
          <div className="w-16 h-0.5 bg-accent/60 mx-auto mt-6 rounded-full" aria-hidden />
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sorted.map((p, i) => (
            <motion.div
              key={p.slug}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.06, type: 'spring', stiffness: 100, damping: 18 }}
            >
              <ProjectCard
                title={p.title}
                category={p.category}
                cover={p.cover}
                album={p.album}
                blurb={p.blurb}
              />
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}
