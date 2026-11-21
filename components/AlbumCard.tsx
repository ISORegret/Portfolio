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
}

export default function AlbumCard({ href, title, category, cover, date, priority, sizes }: Props) {
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
      </span>
      <span className="album-caption">
        <span className="album-kicker">{category}</span>
        <span className="album-title">{title}</span>
        {dateLabel ? <span className="album-date">{dateLabel}</span> : null}
      </span>
    </Link>
  )
}
