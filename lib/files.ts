import { films } from '../app/data/films'
import { projects, type Project } from '../app/data/projects'
import { formatLongDate } from './format'

export { fileLabel, formatDotDate, formatLongDate, formatShortDate, yearOf } from './format'

export type SpecField = {
  label: string
  value: string
}

export type ArchiveFile = {
  kind: 'photo' | 'film'
  slug: string
  title: string
  category: string
  /** ISO date. Films have none on file. */
  date?: string
  fileNumber: number
  cover: string
  blurb?: string
  story?: string
  location?: string
  photoCount?: number
  specs: SpecField[]
  href: string
  album?: string
  src?: string
  poster?: string
}

/** File numbers follow shoot date, oldest first. Films have no date, so they follow the photo files. */

/** The curated set the album page actually shows. */
export function visibleImageSrcs(project: Project): string[] {
  const curated = project.curatedImages?.length ? project.curatedImages : project.images ?? []
  return Array.from(new Set([project.cover, ...curated])).slice(0, project.galleryLimit ?? 24)
}

function photoSpecs(project: Project, photoCount: number): SpecField[] {
  const specs: SpecField[] = [{ label: 'Category', value: project.category }]
  const longDate = formatLongDate(project.date)
  if (longDate) specs.push({ label: 'Date', value: longDate })
  if (project.location) specs.push({ label: 'Location', value: project.location })
  specs.push({ label: 'Photos', value: String(photoCount) })
  if (project.color) specs.push({ label: 'Color', value: project.color })
  if (project.light) specs.push({ label: 'Light', value: project.light })
  if (project.rig) specs.push({ label: 'Rig', value: project.rig })
  if (project.framesDelivered) specs.push({ label: 'Frames delivered', value: project.framesDelivered })
  return specs
}

export function buildArchive(): ArchiveFile[] {
  const photos = [...projects].sort(
    (a, b) => a.date.localeCompare(b.date) || a.title.localeCompare(b.title),
  )

  const photoFiles: ArchiveFile[] = photos.map((project, index) => {
    const photoCount = visibleImageSrcs(project).length
    return {
      kind: 'photo',
      slug: project.slug,
      title: project.title,
      category: project.category,
      date: project.date,
      fileNumber: index + 1,
      cover: project.cover,
      blurb: project.blurb,
      story: project.story,
      location: project.location,
      photoCount,
      specs: photoSpecs(project, photoCount),
      href: `/gallery/${encodeURIComponent(project.slug)}`,
      album: project.album,
    }
  })

  const filmFiles: ArchiveFile[] = films.map((film, index) => ({
    kind: 'film' as const,
    slug: film.slug,
    title: film.title,
    category: 'Film',
    fileNumber: photoFiles.length + index + 1,
    cover: film.poster,
    poster: film.poster,
    src: film.src,
    specs: [{ label: 'Category', value: 'Film' }],
    href: `/films#${film.slug}`,
  }))

  return [...photoFiles, ...filmFiles]
}

export function getFileBySlug(slug: string): ArchiveFile | undefined {
  let decoded = slug
  try {
    decoded = decodeURIComponent(slug)
  } catch {
    decoded = slug
  }
  return buildArchive().find((file) => file.slug === decoded)
}

export function photoFilesNewestFirst(): ArchiveFile[] {
  return buildArchive()
    .filter((file) => file.kind === 'photo')
    .sort((a, b) => (b.date ?? '').localeCompare(a.date ?? ''))
}

/** Neighbors in the same order as the Photos page (newest first). */
export function adjacentPhotoAlbums(slug: string): { previous?: ArchiveFile; next?: ArchiveFile } {
  const photos = photoFilesNewestFirst()
  const index = photos.findIndex((file) => file.slug === slug)
  if (index < 0) return {}
  return {
    previous: index > 0 ? photos[index - 1] : undefined,
    next: index < photos.length - 1 ? photos[index + 1] : undefined,
  }
}
