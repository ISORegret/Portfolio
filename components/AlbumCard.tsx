import Image from 'next/image'
import Link from 'next/link'
import { fileLabel, formatLongDate } from '../lib/format'

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

export default function AlbumCard({ href, title, category, cover, date, fileNumber, priority, sizes }: Props) {
  const dateLabel = formatLongDate(date)

  return (
    <Link href={href} className="group flex h-full flex-col border border-[color:var(--line-strong)] bg-bg-elevated">
      <div className="relative aspect-[4/3] overflow-hidden bg-black">
        <Image
          src={cover}
          alt=""
          fill
          sizes={sizes ?? '(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw'}
          className="object-cover transition duration-500 group-hover:scale-[1.02]"
          priority={priority}
        />
      </div>
      <div className="flex flex-1 flex-col gap-1 border-t border-[color:var(--line)] p-4">
        <p className="text-xs uppercase tracking-[0.08em] text-[rgb(var(--text-muted))]">{category}</p>
        <p className="text-xl leading-snug text-[rgb(var(--text))] group-hover:text-[rgb(var(--accent))]">{title}</p>
        {dateLabel ? <p className="text-sm text-[rgb(var(--text-muted))]">{dateLabel}</p> : null}
        <p className="mt-3 text-sm font-medium uppercase tracking-[0.08em] text-[rgb(var(--accent))]">View gallery</p>
        {typeof fileNumber === 'number' ? (
          <p className="text-[0.68rem] text-[rgb(var(--text-subtle))]">No. {fileLabel(fileNumber)}</p>
        ) : null}
      </div>
    </Link>
  )
}
