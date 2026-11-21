import { siteConfig } from '../app/data/site'

export const shootTypes = [
  'Automotive',
  'Real estate',
  'Event',
  'People & places',
  'Video',
  'Not sure yet',
] as const

export const hourOptions = [
  { id: '1-2', label: '1–2 hours', packageName: 'Short session (1–2 hrs)' },
  { id: '3-4', label: '3–4 hours', packageName: 'Half-day (3–4 hrs)' },
  { id: 'full', label: 'Full day', packageName: 'Full-day event / show' },
] as const

/** Phrases taken from the existing package list. They do not have their own prices. */
export const addOnOptions = [
  { id: 'hires', label: 'High-res or extended time' },
  { id: 'video', label: 'Short video' },
  { id: 'reels', label: 'Reels / vertical clips' },
  { id: 'twilight', label: 'Blue-hour or twilight' },
] as const

export type PackageRecord = (typeof siteConfig.packages)[number]

export function matchPackage(shootType: string, hoursId: string): PackageRecord | null {
  if (shootType === 'Real estate') {
    return siteConfig.packages.find((pkg) => pkg.name.startsWith('Real estate')) ?? null
  }
  const hours = hourOptions.find((option) => option.id === hoursId)
  if (!hours) return null
  return siteConfig.packages.find((pkg) => pkg.name === hours.packageName) ?? null
}

export function floorRate(): string {
  return siteConfig.packages[0]?.price ?? ''
}
