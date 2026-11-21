import Link from 'next/link'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ArrowLeft, ExternalLink } from 'lucide-react'
import { getProjectBySlug } from '../../data/projects'
import AlbumGallery from '../../../components/AlbumGallery'
import { resolveAlbumBack } from '../../../lib/albumBackNavigation'
import { imageSize } from '../../../lib/imageSize'
import { withBrand } from '../../../lib/brandedTitle'
import { SITE_URL } from '../../data/site'
import { fileLabel, formatDotDate, getFileBySlug, visibleImageSrcs } from '../../../lib/files'

type Props = {
  params: { slug: string }
  searchParams?: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const project = getProjectBySlug(params.slug)
  if (!project) return { title: withBrand('Album') }

  const branded = withBrand(project.seoTitle ?? project.title)
  const description =
    project.seoDescription ??
    project.blurb ??
    `${project.category} photography by ISO.Regret — Jacksonville, FL`
  const url = `${SITE_URL}/gallery/${encodeURIComponent(project.slug)}`

  return {
    title: branded,
    description,
    openGraph: {
      title: branded.absolute,
      description,
      url,
      siteName: 'ISO.Regret',
      locale: 'en_US',
      type: 'website',
      images: project.cover ? [{ url: project.cover, alt: project.title }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: branded.absolute,
      description,
      images: project.cover ? [project.cover] : undefined,
    },
    alternates: { canonical: url },
  }
}

export default function AlbumPage({ params, searchParams }: Props) {
  const project = getProjectBySlug(params.slug)
  if (!project) notFound()

  const file = getFileBySlug(project.slug)
  const back = resolveAlbumBack(searchParams?.from)
  const images = visibleImageSrcs(project).map((src) => ({ src, ...imageSize(src) }))
  const meta = [
    file ? `File nº ${fileLabel(file.fileNumber)}` : null,
    formatDotDate(project.date),
    project.location,
  ]
    .filter(Boolean)
    .join(' — ')

  return (
    <main className="shell py-8 md:py-12">
      <Link href={back.href} className="btn-text -ml-1 text-[0.72rem]">
        <ArrowLeft className="h-4 w-4" aria-hidden />
        Back to {back.label}
      </Link>

      <header className="mt-6 border-b border-[color:var(--line-strong)]">
        <p className="text-[0.72rem] uppercase tracking-[0.14em] text-[rgb(var(--text-muted))]">{meta}</p>
        <h1 className="display mt-3 max-w-4xl text-[clamp(3rem,7vw,6.2rem)]">{project.title}</h1>
        {project.blurb ? <p className="mt-4 max-w-2xl text-[0.85rem] leading-relaxed text-[rgb(var(--text-muted))]">{project.blurb}</p> : null}
        {file ? (
          <dl className="spec-grid mt-6">
            {file.specs.map((spec) => (
              <div key={spec.label}>
                <dt>
                  <span>{spec.label}</span>
                </dt>
                <dd>
                  <strong>{spec.value}</strong>
                </dd>
              </div>
            ))}
          </dl>
        ) : null}
        {project.story ? (
          <p className="max-w-2xl py-5 text-[0.82rem] leading-relaxed text-[rgb(var(--text-muted))]">{project.story}</p>
        ) : (
          <div className="h-5" />
        )}
      </header>

      {project.album ? (
        <div className="mt-6 flex flex-col gap-4 border border-[color:var(--line)] bg-bg-elevated px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[0.78rem] uppercase tracking-[0.08em]">Want the full shoot?</p>
            <p className="mt-1 text-[0.78rem] text-[rgb(var(--text-muted))]">View every image in high resolution on Pixieset.</p>
          </div>
          <a href={project.album} target="_blank" rel="noopener noreferrer" className="btn btn-yellow btn-sm">
            View full gallery
            <ExternalLink className="h-4 w-4" aria-hidden />
          </a>
        </div>
      ) : null}

      <div className="mt-8">
        <AlbumGallery
          slug={project.slug}
          title={project.title}
          images={images}
          downloadAccess={project.downloadAccess ?? 'none'}
          downloadCode={project.downloadCode}
        />
      </div>
    </main>
  )
}
