import Link from 'next/link';
import { posts } from '../data/posts';
import { ArrowRight, PenLine } from 'lucide-react';

export const metadata = {
  title: 'Blog — Behind the shot | ISO.Regret',
  description: 'Short posts on how select shots were made — gear, light, and process.',
};

export default function BlogPage() {
  const sorted = [...posts].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div className="min-h-screen bg-bg">
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="mb-12">
          <p className="text-sm font-medium uppercase tracking-wider text-accent mb-2">Behind the shot</p>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-[rgb(var(--text))]">
            Blog
          </h1>
          <p className="text-[rgb(var(--text-muted))] mt-3 text-lg">
            How select images were made — gear, light, and process.
          </p>
        </div>

        <ul className="space-y-8">
          {sorted.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="group block rounded-token-lg border border-border/60 bg-bg-card p-6 sm:p-8 hover:border-accent/30 hover:shadow-glow transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <span className="rounded-full bg-accent/10 p-2 text-accent shrink-0" aria-hidden>
                    <PenLine className="w-5 h-5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <time className="text-sm text-[rgb(var(--text-subtle))]" dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </time>
                    <h2 className="font-display text-xl sm:text-2xl font-semibold text-[rgb(var(--text))] mt-1 group-hover:text-accent transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-[rgb(var(--text-muted))] mt-2 leading-relaxed">
                      {post.excerpt}
                    </p>
                    <span className="inline-flex items-center gap-1 mt-3 text-accent font-medium text-sm group-hover:gap-2 transition-all">
                      Read more
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
