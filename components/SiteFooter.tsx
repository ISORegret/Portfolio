import Link from 'next/link';
import { Instagram } from 'lucide-react';
import BackToTop from './BackToTop';
export default function SiteFooter() {
  return <><footer className="iso-footer"><Link href="/" className="iso-wordmark">ISO<span>.</span>REGRET</Link><p>Photography &amp; videography<br />Jacksonville &amp; surrounding areas</p><a href="https://instagram.com/iso.regret" target="_blank" rel="noreferrer"><Instagram size={17} aria-hidden /> @iso.regret</a><p>© {new Date().getFullYear()} ISO.Regret</p></footer><BackToTop /></>;
}
