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
  const downloadAccess =
    project.downloadAccess ?? (project.album ? 'none' : 'open');

  const downloadHint =
    downloadAccess === 'code'
      ? 'Click any photo to view larger · Downloads need the client access code (unlock below or from the viewer)'
      : downloadAccess === 'none'
        ? project.album
          ? 'Click any photo for a larger preview · Full set and downloads use your Pixieset guest code'
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
          <div className="max-w-3xl mx-auto mb-6 rounded-token border border-border/70 bg-bg-card/90 px-3 py-2.5 sm:px-4 sm:py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 text-center sm:text-left">
            <div className="min-w-0">
              <p className="text-sm font-medium text-[rgb(var(--text))]">Pixieset — full gallery & downloads</p>
              <p className="text-xs text-[rgb(var(--text-muted))] mt-0.5 leading-snug">
                Guest access and print orders happen there; this page is a preview.
              </p>
            </div>
            <a
              href={project.album}
              target="_blank"
              rel="noreferrer"
              className="shrink-0 inline-flex items-center justify-center gap-1.5 rounded-token bg-accent/12 text-[rgb(var(--text))] hover:bg-accent/20 border border-border/60 px-3 py-1.5 text-xs font-medium transition-colors mx-auto sm:mx-0"
            >
              Open on Pixieset
              <ExternalLink className="w-3.5 h-3.5" aria-hidden />
            </a>
          </div>
        ) : null}

        <p className="text-[rgb(var(--text-subtle))] text-sm text-center mb-8 max-w-2xl mx-auto">{downloadHint}</p>
        <div className="w-16 h-0.5 bg-accent/60 mx-auto -mt-4 mb-10 rounded-full" aria-hidden />

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
