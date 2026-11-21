import Link from 'next/link'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import { getPostBySlug } from '../../data/posts'
import { SITE_URL } from '../../data/site'
import { withBrand } from '../../../lib/brandedTitle'
import { ArrowLeft } from 'lucide-react'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return { title: withBrand('Post not found') }
  const title = withBrand(post.title)
  const url = `${SITE_URL}/blog/${encodeURIComponent(slug)}`
  return {
    title,
    description: post.excerpt,
    openGraph: { title: title.absolute, description: post.excerpt, url, type: 'article' },
    twitter: { card: 'summary_large_image', title: title.absolute, description: post.excerpt },
    alternates: { canonical: url },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  return (
    <main className="shell max-w-3xl py-12 md:py-16">
      <Link href="/blog" className="btn-text -ml-1 text-sm">
        <ArrowLeft className="h-4 w-4" aria-hidden />
        Back to journal
      </Link>
      <article className="mt-10">
        <time className="text-sm text-[rgb(var(--text-subtle))]" dateTime={post.date}>
          {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </time>
        <h1 className="display mt-3 text-[clamp(2.8rem,6vw,4.5rem)]">{post.title}</h1>
        <p className="mt-4 text-lg text-[rgb(var(--text-muted))]">{post.excerpt}</p>
        <div className="mt-10 text-[1.05rem] leading-8 text-[rgb(var(--text-muted))]">
          <ReactMarkdown
            components={{
              p: ({ children }) => <p className="mb-5">{children}</p>,
              strong: ({ children }) => <strong className="font-semibold text-[rgb(var(--text))]">{children}</strong>,
              em: ({ children }) => <em className="text-[rgb(var(--text))]">{children}</em>,
              h2: ({ children }) => <h2 className="mb-3 mt-10 font-display text-3xl text-[rgb(var(--text))]">{children}</h2>,
              ul: ({ children }) => <ul className="mb-5 list-disc space-y-1 pl-6">{children}</ul>,
              ol: ({ children }) => <ol className="mb-5 list-decimal space-y-1 pl-6">{children}</ol>,
            }}
          >
            {post.body}
          </ReactMarkdown>
        </div>
      </article>
    </main>
  )
}
