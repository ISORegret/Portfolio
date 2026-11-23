import Link from 'next/link'

type Props = {
  href?: string
  className?: string
  onClick?: () => void
}

/**
 * Mock wordmark: "ISO REGRET" in Playfair 700 with a gold
 * "STILLS + MOTION" sub-line.
 */
export default function Wordmark({ href = '/', className = '', onClick }: Props) {
  return (
    <Link href={href} onClick={onClick} className={`wordmark ${className}`}>
      <span className="wm-name">ISO REGRET</span>
      <span className="wm-sub">Stills + Motion</span>
    </Link>
  )
}
