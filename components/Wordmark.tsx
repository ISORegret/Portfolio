import Link from 'next/link'

type Props = {
  href?: string
  className?: string
  onClick?: () => void
}

export default function Wordmark({ href = '/', className = '', onClick }: Props) {
  return (
    <Link href={href} onClick={onClick} className={`wordmark ${className}`}>
      ISO<span>.</span>REGRET
    </Link>
  )
}
