import Image from 'next/image'
import Link from 'next/link'
import { formatLongDate } from '../lib/format'

type Props = {
  href: string
  title: string
  category: string
  cover: string
  date?: string
  fileNumber?: number
  priority?: boolean
  sizes?: string
  /** When set, the caption kicker shows the shoot location instead of the category. */
  location?: string
  /** 1-based position in the Shoots wall, shown as a Ligthelm-style index number. */
  index?: number
  /** Kind badge shown top-right on the photo (STILLS / FILM), as in the design mock. */
  badge?: string
  /** Show the shoot date under the title. The Shoots wall hides it, like the mock. */
  showDate?: boolean
}

export default function AlbumCard({ href, title, category, cover, date, priority, sizes, location, index, badge, showDate = true }: Props) {
  const dateLabel = formatLongDate(date)

  return (
    <Link href={href} className="album-tile group">
      <span className="album-media">
        <Image
          src={cover}
          alt=""
          fill
          sizes={sizes ?? '(min-width: 1100px) 33vw, (min-width: 700px) 50vw, 100vw'}
          className="album-photo object-cover"
          priority={priority}
        />
        {badge ? (
          <span className="album-badge" aria-hidden>
            {badge}
          </span>
        ) : null}
      </span>
      <span className="album-caption">
        <span className="album-kicker">
          {index !== undefined ? <span className="album-index">{String(index).padStart(2, '0')}</span> : null}
          {location ?? category}
        </span>
        <span className="album-title">{title}</span>
        <span className="album-cat">{category}</span>
        {showDate && dateLabel ? <span className="album-date">{dateLabel}</span> : null}
      </span>
    </Link>
  )
}
