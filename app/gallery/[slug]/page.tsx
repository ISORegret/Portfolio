import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { getProjectBySlug } from '../../data/projects';
import AlbumGallery from '../../../components/AlbumGallery';
import { resolveAlbumBack } from '../../../lib/albumBackNavigation';
import { SITE_URL } from '../../data/site';

type Props = {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const project = getProjectBySlug(params.slug);
  if (!project) return { title: 'Album | ISO.Regret' };

  const title = project.seoTitle ?? project.title;
  const description =
    project.seoDescription ??
    project.blurb ??
    `${project.category} photography by ISO.Regret — Jacksonville, FL`;

  const url = `${SITE_URL}/gallery/${encodeURIComponent(project.slug)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: 'ISO.Regret',
      locale: 'en_US',
      type: 'website',
      images: project.cover
        ? [{ url: project.cover, alt: project.title }]
        : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: project.cover ? [project.cover] : undefined,
    },
    alternates: { canonical: url },
  };
}

export default function AlbumPage({ params, searchParams }: Props) {
  const project = getProjectBySlug(params.slug);
  if (!project) notFound();

  const back = resolveAlbumBack(searchParams?.from);

  const curatedImages = project.curatedImages?.length ? project.curatedImages : project.images ?? [];
  const allImages = Array.from(new Set([project.cover, ...curatedImages])).slice(0, 24);

  return (
    <div className="min-h-screen bg-bg">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <Link
          href={back.href}
          className="inline-flex items-center gap-2 text-[rgb(var(--text-muted))] hover:text-[rgb(var(--text))] transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden />
          Back to {back.label}
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
          {project.story ? (
            <p className="text-[rgb(var(--text-subtle))] mt-5 text-base max-w-2xl mx-auto leading-relaxed border-t border-border/50 pt-5">
              {project.story}
            </p>
          ) : null}
        </header>

        {project.album ? (
          <div className="max-w-3xl mx-auto mb-8 rounded-token border border-border/70 bg-bg-card/90 px-4 py-4 sm:px-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-5 text-center sm:text-left">
            <div className="min-w-0">
              <p className="text-sm font-semibold text-[rgb(var(--text))]">Want the full shoot?</p>
              <p className="text-sm text-[rgb(var(--text-muted))] mt-1 leading-snug">
                View every image in high resolution on Pixieset.
              </p>
            </div>
            <a
              href={project.album}
              target="_blank"
              rel="noopener"
              className="shrink-0 inline-flex items-center justify-center gap-2 rounded-token bg-accent text-neutral-950 hover:bg-accent-muted px-4 py-2.5 text-sm font-semibold transition-colors mx-auto sm:mx-0"
            >
              View full gallery
              <ExternalLink className="w-4 h-4" aria-hidden />
            </a>
          </div>
        ) : null}

        <div className="text-[rgb(var(--text-subtle))] text-sm text-center mb-8 max-w-2xl mx-auto">
          <p>Curated selection — open any image to view it larger.</p>
        </div>
        <div className="w-16 h-0.5 bg-accent/60 mx-auto -mt-4 mb-10 rounded-full" aria-hidden />

        <AlbumGallery
          slug={project.slug}
          title={project.title}
          images={allImages}
          downloadAccess="none"
        />
      </main>
    </div>
  );
}
