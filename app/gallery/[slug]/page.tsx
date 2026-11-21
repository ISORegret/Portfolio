import Link from 'next/link'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { getProjectBySlug } from '../../data/projects'
import AlbumGallery from '../../../components/AlbumGallery'
import AlbumPager from '../../../components/AlbumPager'
import { resolveAlbumBack } from '../../../lib/albumBackNavigation'
import { imageSize } from '../../../lib/imageSize'
import { withBrand } from '../../../lib/brandedTitle'
import { SITE_URL } from '../../data/site'
import { formatLongDate, getFileBySlug, visibleImageSrcs } from '../../../lib/files'

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
  const meta = [project.category, formatLongDate(project.date), project.location].filter(Boolean).join(' · ')

  return (
    <main className="pb-16 md:pb-24">
      <header className="shell pt-6 md:pt-10">
        <div className="flex flex-wrap items-center justify-between gap-x-6">
          <Link href={back.href} className="back-link">
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Back to {back.label}
          </Link>
          <AlbumPager slug={project.slug} fromPath={back.href} compact />
        </div>

        <p className="eyebrow mt-6">{meta}</p>
        <h1 className="display mt-3 max-w-4xl text-[clamp(2.7rem,5.4vw,4.6rem)]">{project.title}</h1>
        {project.blurb ? <p className="mt-4 max-w-2xl text-base leading-relaxed text-[rgb(var(--text-muted))]">{project.blurb}</p> : null}

        {project.album ? (
          <p className="mt-6 flex flex-col items-start">
            <span className="eyebrow">Want the full shoot?</span>
            <a href={project.album} target="_blank" rel="noopener noreferrer" className="text-link">
              View full gallery
            </a>
          </p>
        ) : null}

        {project.downloadUrl ? (
          <p className="mt-6 flex flex-col items-start">
            <span className="eyebrow">Full-resolution files</span>
            <a href={project.downloadUrl} target="_blank" rel="noopener noreferrer" className="text-link">
              Download full-res on Pixieset
            </a>
          </p>
        ) : null}
      </header>

      <div className="mt-8">
        <AlbumGallery
          slug={project.slug}
          title={project.title}
          images={images}
          downloadAccess={project.downloadAccess ?? 'none'}
          downloadCode={project.downloadCode}
        />
      </div>

      <div className="shell mt-12">
        {project.story ? (
          <p className="max-w-2xl text-base leading-relaxed text-[rgb(var(--text-muted))]">{project.story}</p>
        ) : null}
        {file ? (
          <dl className={`spec-grid max-w-3xl ${project.story ? 'mt-10' : ''}`}>
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
        <div className="mt-10">
          <AlbumPager slug={project.slug} fromPath={back.href} />
        </div>
      </div>
    </main>
  )
}
