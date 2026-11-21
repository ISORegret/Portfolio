import type { ReactNode } from 'react'

type Props = {
  index?: string
  eyebrow: string
  title: string
  id?: string
  action?: ReactNode
}

export default function SectionHeading({ index, eyebrow, title, id, action }: Props) {
  return (
    <div className="mb-10 flex flex-wrap items-end justify-between gap-x-8 gap-y-4 md:mb-14">
      <div className="max-w-2xl">
        <p className="eyebrow">
          {index ? <span className="mr-3 text-[rgb(var(--accent))]">{index}</span> : null}
          {eyebrow}
        </p>
        <h2 id={id} className="display mt-3 text-[clamp(2.75rem,6vw,4.5rem)]">
          {title}
        </h2>
      </div>
      {action}
    </div>
  )
}
