import Link from 'next/link'
import { posts } from '../data/posts'
import { withBrand } from '../../lib/brandedTitle'
import { ArrowRight } from 'lucide-react'

const title = withBrand('Journal')

export const metadata = {
  title,
  description: 'Short posts on how select shots were made — gear, light, and process.',
}

export default function BlogPage() {
  const sorted = [...posts].sort((a, b) => b.date.localeCompare(a.date))

  return (
    <main className="shell py-28">
      <header className="mb-14 max-w-2xl">
        <p className="eyebrow">Behind the shot</p>
        <h1 className="display mt-3 text-[clamp(3.2rem,7vw,5.5rem)]">Journal</h1>
        <p className="mt-5 text-lg text-[rgb(var(--text-muted))]">How select images were made — gear, light, and process.</p>
      </header>

      <ul className="max-w-3xl divide-y divide-[rgb(var(--border-muted))] border-y border-[rgb(var(--border-muted))]">
        {sorted.map((post) => (
          <li key={post.slug}>
            <Link href={`/blog/${post.slug}`} className="group block py-8">
              <time className="text-sm text-[rgb(var(--text-subtle))]" dateTime={post.date}>
                {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </time>
              <h2 className="mt-2 font-display text-4xl group-hover:text-[rgb(var(--accent-muted))]">{post.title}</h2>
              <p className="mt-3 max-w-xl leading-relaxed text-[rgb(var(--text-muted))]">{post.excerpt}</p>
              <span className="btn-text mt-3 text-sm">
                Read <ArrowRight className="h-4 w-4" aria-hidden />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}
