'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { projects } from '../data/projects';

const BLUR_DATA =
  'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/EABQQAQAAAAAAAAAAAAAAAAAAAAD/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBEQACEQAD8QDu/9k=';

/** One photo entry for the grid: image URL + on-site album path + title for overlay */
type GalleryPhoto = { src: string; slug: string; title: string };

function getGalleryPhotos(): GalleryPhoto[] {
  const out: GalleryPhoto[] = [];
  const sorted = [...projects].sort((a, b) => b.date.localeCompare(a.date));
  for (const p of sorted) {
    out.push({ src: p.cover, slug: p.slug, title: p.title });
    if (p.images?.length) {
      for (const src of p.images) {
        out.push({ src, slug: p.slug, title: p.title });
      }
    }
  }
  return out;
}

export default function GalleryPage() {
  const photos = getGalleryPhotos();

  return (
    <div className="min-h-screen bg-bg">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-[rgb(var(--text))]">
            Gallery
          </h1>
          <p className="text-[rgb(var(--text-muted))] mt-3 text-lg">
            All photos — tap any image to view the album on this site.
          </p>
          <div className="w-16 h-0.5 bg-accent/60 mx-auto mt-4 rounded-full" aria-hidden />
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3">
          {photos.map((photo, i) => (
            <motion.div
              key={`${photo.slug}-${i}-${photo.src.slice(-20)}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: Math.min(i * 0.03, 0.6) }}
              className="aspect-square relative overflow-hidden rounded-token group"
            >
              <Link href={`/gallery/${encodeURIComponent(photo.slug)}`} className="block w-full h-full">
                <Image
                  src={photo.src}
                  alt={photo.title}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  placeholder="blur"
                  blurDataURL={BLUR_DATA}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-end">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-sm font-medium p-2 truncate w-full bg-gradient-to-t from-black/60 to-transparent">
                    {photo.title}
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}
