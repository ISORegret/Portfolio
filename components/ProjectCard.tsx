import Image from 'next/image'
import Link from 'next/link'
import { albumHrefWithFrom } from '../lib/albumBackNavigation'
import { imageSize } from '../lib/imageSize'

type Props = {
  slug: string
  title: string
  category: string
  cover: string
  fromPath?: string
  /** Tailwind aspect class. When set, the cover is cropped. Otherwise it keeps its native ratio. */
  crop?: string
  date?: string
  sizes?: string
}

export default function ProjectCard({ slug, title, category, cover, fromPath, crop, date, sizes }: Props) {
  const href = fromPath ? albumHrefWithFrom(slug, fromPath) : `/gallery/${encodeURIComponent(slug)}`
  const { width, height } = imageSize(cover)
  const year = date?.slice(0, 4)
  const remote = cover.includes('pixieset.com')

  return (
    <Link href={href} className="group block min-w-0">
      {crop ? (
        <div className={`relative overflow-hidden bg-bg-elevated ${crop}`}>
          <Image
            src={cover}
            alt={title}
            fill
            sizes={sizes ?? '(min-width: 1024px) 34vw, (min-width: 768px) 50vw, 100vw'}
            className="object-cover transition duration-700 group-hover:scale-[1.03]"
            unoptimized={remote}
            referrerPolicy="no-referrer"
          />
        </div>
      ) : (
        <div className="overflow-hidden bg-bg-elevated">
          <Image
            src={cover}
            alt={title}
            width={width}
            height={height}
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="h-auto w-full transition duration-700 group-hover:scale-[1.02]"
            style={{ width: '100%', height: 'auto' }}
            unoptimized={remote}
            referrerPolicy="no-referrer"
          />
        </div>
      )}
      <h3 className="mt-3 text-base font-medium leading-snug text-[rgb(var(--text))] group-hover:text-[rgb(var(--accent-muted))]">
        {title}
      </h3>
      <p className="mt-1 text-sm text-[rgb(var(--text-muted))]">
        {category}
        {year ? ` · ${year}` : ''} · View album
      </p>
    </Link>
  )
}
