import Link from 'next/link';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import { getPostBySlug } from '../../data/posts';
import { ArrowLeft } from 'lucide-react';

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: 'Post not found | ISO.Regret' };
  return {
    title: `${post.title} | ISO.Regret Blog`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <div className="min-h-screen bg-bg">
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-[rgb(var(--text-muted))] hover:text-accent transition-colors text-sm font-medium mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to blog
        </Link>
        <article>
          <time className="text-sm text-[rgb(var(--text-subtle))]" dateTime={post.date}>
            {new Date(post.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-[rgb(var(--text))] mt-2">
            {post.title}
          </h1>
          <p className="text-[rgb(var(--text-muted))] mt-3 text-lg">
            {post.excerpt}
          </p>
          <div className="mt-10 max-w-none">
            <ReactMarkdown
              components={{
                p: ({ children }) => <p className="mb-4">{children}</p>,
                strong: ({ children }) => <strong className="font-semibold text-[rgb(var(--text))]">{children}</strong>,
                h2: ({ children }) => <h2 className="font-display text-xl font-semibold text-[rgb(var(--text))] mt-8 mb-3">{children}</h2>,
                ul: ({ children }) => <ul className="list-disc pl-6 mb-4 space-y-1 text-[rgb(var(--text-muted))]">{children}</ul>,
                ol: ({ children }) => <ol className="list-decimal pl-6 mb-4 space-y-1 text-[rgb(var(--text-muted))]">{children}</ol>,
              }}
            >
              {post.body}
            </ReactMarkdown>
          </div>
        </article>
      </main>
    </div>
  );
}
