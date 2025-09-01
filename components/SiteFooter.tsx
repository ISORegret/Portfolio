export default function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-neutral-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-sm text-neutral-400 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p>© {new Date().getFullYear()} ISO.Regret · All rights reserved.</p>
        <nav className="flex items-center gap-4">
          <a href="/#services" className="hover:text-neutral-200">Services</a>
          <a href="/#collections" className="hover:text-neutral-200">Collections</a>
          <a href="/#latest" className="hover:text-neutral-200">Latest</a>
          <a href="/#about" className="hover:text-neutral-200">About</a>
          <a href="/#contact" className="hover:text-neutral-200">Contact</a>
        </nav>
      </div>
    </footer>
  );
}
