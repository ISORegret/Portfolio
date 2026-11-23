import Link from 'next/link'

type Props = {
  href?: string
  className?: string
  onClick?: () => void
}

/**
 * Easton Chang wordmark: refined serif "ISO REGRET" in spaced caps
 * with a gold "STILLS + MOTION" sub-line — the brand device, top-left,
 * legible over the full-screen hero. See .wordmark in globals.css.
 */
export default function Wordmark({ href = '/', className = '', onClick }: Props) {
  return (
    <Link href={href} onClick={onClick} className={`wordmark ${className}`}>
      <span className="wm-name">ISO REGRET</span>
      <span className="wm-sub">Stills + Motion</span>
    </Link>
  )
}
