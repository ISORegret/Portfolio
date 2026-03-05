import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { getProjectBySlug } from '../../data/projects';
import AlbumGallery from '../../../components/AlbumGallery';

type Props = { params: { slug: string } };

export default function AlbumPage({ params }: Props) {
  const project = getProjectBySlug(params.slug);
  if (!project) notFound();

  const allImages = [project.cover, ...(project.images ?? [])];

  return (
    <div className="min-h-screen bg-bg">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <Link
          href="/gallery"
          className="inline-flex items-center gap-2 text-[rgb(var(--text-muted))] hover:text-[rgb(var(--text))] transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to gallery
        </Link>

        <header className="text-center mb-12">
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-[rgb(var(--text))]">
            {project.title}
          </h1>
          <p className="text-[rgb(var(--text-muted))] mt-2 text-sm uppercase tracking-wider">
            {project.category}
          </p>
          {project.blurb && (
            <p className="text-[rgb(var(--text-muted))] mt-3 text-lg max-w-2xl mx-auto">
              {project.blurb}
            </p>
          )}
          <p className="text-[rgb(var(--text-subtle))] mt-2 text-sm">
            Click any photo to view larger · Use arrow keys to move between photos
          </p>
          <div className="w-16 h-0.5 bg-accent/60 mx-auto mt-4 rounded-full" aria-hidden />
        </header>

        <AlbumGallery title={project.title} images={allImages} />

        <div className="mt-12 text-center">
          <a
            href={project.album}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-token bg-accent/10 text-[rgb(var(--text))] hover:bg-accent/20 border border-border/60 px-5 py-2.5 text-sm font-medium transition-colors"
          >
            View full album on Pixieset
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </main>
    </div>
  );
}
