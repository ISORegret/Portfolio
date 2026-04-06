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

const PIXIESET_CODE_MAILTO =
  'mailto:ryan@isoregret.com?subject=Pixieset%20guest%20code%20%2F%20high-res%20access';

export default function AlbumPage({ params, searchParams }: Props) {
  const project = getProjectBySlug(params.slug);
  if (!project) notFound();

  const back = resolveAlbumBack(searchParams?.from);

  const allImages = [project.cover, ...(project.images ?? [])];
  const downloadAccess = project.downloadAccess ?? 'open';

  const downloadHint =
    downloadAccess === 'code'
      ? 'Click any photo to view larger · Downloads need the client access code (unlock below or from the viewer)'
      : downloadAccess === 'none'
        ? project.album
          ? 'Click any photo for a larger preview · Full set and downloads use your Pixieset guest code'
          : 'Click any photo to view larger · Downloads are disabled for this album'
        : project.album
          ? 'Click any photo to view larger · Arrow keys to move · Download previews here · High-res full gallery on Pixieset (guest code, link below)'
          : 'Click any photo to view larger · Arrow keys to move · Download in the viewer';

  const pixiesetPrimary = Boolean(project.album && downloadAccess === 'none');

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

        {pixiesetPrimary ? (
          <div className="max-w-3xl mx-auto mb-6 rounded-token border border-border/70 bg-bg-card/90 px-3 py-2.5 sm:px-4 sm:py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 text-center sm:text-left">
            <div className="min-w-0">
              <p className="text-sm font-medium text-[rgb(var(--text))]">Pixieset — full gallery and downloads</p>
              <p className="text-xs text-[rgb(var(--text-muted))] mt-0.5 leading-snug">
                Guest access and print orders happen there; this page is a preview. Need the guest code or high-res
                downloads?{' '}
                <a
                  href={PIXIESET_CODE_MAILTO}
                  className="text-accent hover:underline underline-offset-2 whitespace-nowrap"
                >
                  Contact me
                </a>
                .
              </p>
            </div>
            <a
              href={project.album}
              target="_blank"
              rel="noopener"
              className="shrink-0 inline-flex items-center justify-center gap-1.5 rounded-token bg-accent/12 text-[rgb(var(--text))] hover:bg-accent/20 border border-border/60 px-3 py-1.5 text-xs font-medium transition-colors mx-auto sm:mx-0"
            >
              Open on Pixieset
              <ExternalLink className="w-3.5 h-3.5" aria-hidden />
            </a>
          </div>
        ) : null}

        <div className="text-[rgb(var(--text-subtle))] text-sm text-center mb-8 max-w-2xl mx-auto space-y-2">
          <p>{downloadHint}</p>
          {project.album ? (
            <p>
              Don&apos;t have a Pixieset guest code for the full high-res gallery?{' '}
              <a
                href={PIXIESET_CODE_MAILTO}
                className="text-[rgb(var(--text))] underline decoration-accent/40 underline-offset-2 hover:decoration-accent"
              >
                Email me
              </a>{' '}
              and I&apos;ll get you set up.
            </p>
          ) : null}
        </div>
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
              rel="noopener"
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
