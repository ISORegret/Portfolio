import Link from 'next/link'

type Props = { startingAt: string }

/** Phone-only spec bar. Desktop uses the header button. */
export default function StickyBookBar({ startingAt }: Props) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-[1.3fr_0.9fr] border-t border-[color:var(--line-strong)] bg-[rgb(var(--bg))] md:hidden">
      <Link href="/#spec" className="btn btn-yellow min-h-[52px] rounded-none border-0 border-r border-[color:var(--line-strong)]">
        Spec your shoot
      </Link>
      <p className="flex items-center px-3 text-[0.68rem] uppercase leading-tight tracking-[0.04em] text-[rgb(var(--text))]">
        {startingAt}
      </p>
    </div>
  )
}
