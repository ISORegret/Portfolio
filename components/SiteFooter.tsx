import BackToTop from './BackToTop'

/**
 * Mock footer: exactly three lines.
 * © ISO.Regret Media — Jacksonville, FL · Instagram — @iso.regret · Brickel.Ryan@icloud.com
 */
export default function SiteFooter() {
  return (
    <>
      <footer className="m-foot">
        <span>© ISO.Regret Media — Jacksonville, FL</span>
        <a href="https://www.instagram.com/iso.regret" target="_blank" rel="noreferrer">
          Instagram — @iso.regret
        </a>
        <a href="mailto:Brickel.Ryan@icloud.com">Brickel.Ryan@icloud.com</a>
      </footer>
      <BackToTop />
    </>
  )
}
