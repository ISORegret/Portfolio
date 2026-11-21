import { siteConfig } from '../app/data/site'

/** Drop a trailing brand suffix so the document title gets exactly one. */
export function stripBrand(title: string): string {
  return title
    .replace(/\s*\|\s*ISO\.Regret(?:\s+Blog|\s+Jacksonville)?\s*$/i, '')
    .trim()
}

/** Absolute title. Bypasses the root template so the suffix is never doubled or dropped. */
export function withBrand(title: string): { absolute: string } {
  const clean = stripBrand(title)
  return { absolute: `${clean} | ${siteConfig.brandName}` }
}
