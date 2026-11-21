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

function formatDate(iso: string) {
  const date = new Date(`${iso}T12:00:00`)
  if (Number.isNaN(date.getTime())) return iso
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

export default function AlbumPage({ params, searchParams }: Props) {
  const project = getProjectBySlug(params.slug)
  if (!project) notFound()

  const back = resolveAlbumBack(searchParams?.from)
  const curatedImages = project.curatedImages?.length ? project.curatedImages : project.images ?? []
  const allImages = Array.from(new Set([project.cover, ...curatedImages]))
    .slice(0, project.galleryLimit ?? 24)
    .map((src) => ({ src, ...imageSize(src) }))

  return (
    <main className="shell pb-24 pt-28">
      <Link href={back.href} className="btn-text -ml-1 text-sm">
        <ArrowLeft className="h-4 w-4" aria-hidden />
        Back to {back.label}
      </Link>

      <header className="mt-10 max-w-3xl">
        <p className="eyebrow">
          {project.category}
          <span className="mx-2 text-[rgb(var(--border))]">·</span>
          <time dateTime={project.date}>{formatDate(project.date)}</time>
        </p>
        <h1 className="display mt-4 text-[clamp(2.8rem,6vw,5.2rem)]">{project.title}</h1>
        {project.blurb ? <p className="mt-5 text-lg leading-relaxed text-[rgb(var(--text-muted))]">{project.blurb}</p> : null}
        {project.story ? (
          <p className="mt-5 border-t border-[rgb(var(--border-muted))] pt-5 text-base leading-relaxed text-[rgb(var(--text-subtle))]">
            {project.story}
          </p>
        ) : null}
      </header>

      {project.album ? (
        <div className="mt-10 flex flex-col gap-4 border border-[rgb(var(--border-muted))] bg-bg-card px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium">Want the full shoot?</p>
            <p className="mt-1 text-sm text-[rgb(var(--text-muted))]">View every image in high resolution on Pixieset.</p>
          </div>
          <a href={project.album} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">
            View full gallery
            <ExternalLink className="h-4 w-4" aria-hidden />
          </a>
        </div>
      ) : null}

      <p className="mb-6 mt-10 text-sm text-[rgb(var(--text-subtle))]">Curated selection — open any image to view it larger.</p>

      <AlbumGallery
        slug={project.slug}
        title={project.title}
        images={allImages}
        downloadAccess={project.downloadAccess ?? 'none'}
        downloadCode={project.downloadCode}
      />
    </main>
  )
}
