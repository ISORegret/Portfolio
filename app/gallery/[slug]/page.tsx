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
  const downloadAccess = project.downloadAccess ?? 'open';

  const downloadHint =
    downloadAccess === 'code'
      ? 'Click any photo to view larger · Downloads need the client access code (unlock below or from the viewer)'
      : downloadAccess === 'none'
        ? project.album
          ? 'Preview below · Your guest access code for downloads is entered on Pixieset (not on this site)'
          : 'Click any photo to view larger · Downloads are disabled for this album'
        : 'Click any photo to view larger · Arrow keys to move · Download in the viewer';

  const pixiesetPrimary = Boolean(project.album && downloadAccess === 'none');

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
        </header>

        {pixiesetPrimary ? (
          <div className="max-w-2xl mx-auto mb-10 rounded-token-lg border border-accent/25 bg-accent/10 px-5 py-5 text-center">
            <p className="font-display font-semibold text-[rgb(var(--text))]">Full gallery on Pixieset</p>
            <p className="text-sm text-[rgb(var(--text-muted))] mt-2 leading-relaxed">
              View every photo, download files, and order prints on Pixieset. Access and downloads use the guest code you
              already have set up there — this page is a preview only.
            </p>
            <a
              href={project.album}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-token bg-accent text-neutral-900 hover:opacity-95 px-5 py-2.5 text-sm font-semibold transition-opacity"
            >
              Open album on Pixieset
              <ExternalLink className="w-4 h-4" aria-hidden />
            </a>
          </div>
        ) : null}

        <p className="text-[rgb(var(--text-subtle))] text-sm text-center mb-10 max-w-2xl mx-auto">{downloadHint}</p>
        <div className="w-16 h-0.5 bg-accent/60 mx-auto -mt-6 mb-12 rounded-full" aria-hidden />

        <AlbumGallery
          slug={project.slug}
          title={project.title}
          images={allImages}
          downloadAccess={downloadAccess}
          downloadCode={project.downloadCode}
        />

        {project.album && !pixiesetPrimary ? (
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
        ) : null}
      </main>
    </div>
  );
}
