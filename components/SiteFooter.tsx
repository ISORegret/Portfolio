export default function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-sm text-[rgb(var(--text-muted))] flex flex-col sm:flex-row items-center justify-between gap-4">
        <p>© {new Date().getFullYear()} ISO.Regret · All rights reserved.</p>
        <nav className="flex items-center gap-6">
          <a href="/#services" className="hover:text-[rgb(var(--text))] transition-colors">Services</a>
          <a href="/#collections" className="hover:text-[rgb(var(--text))] transition-colors">Collections</a>
          <a href="/#latest" className="hover:text-[rgb(var(--text))] transition-colors">Latest</a>
          <a href="/#about" className="hover:text-[rgb(var(--text))] transition-colors">About</a>
          <a href="/#contact" className="hover:text-[rgb(var(--text))] transition-colors">Contact</a>
        </nav>
      </div>
    </footer>
  );
}
