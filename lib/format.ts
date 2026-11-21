/** Pure formatters. Safe to import from client components — no album data. */

export function fileLabel(fileNumber: number): string {
  return String(fileNumber).padStart(3, '0')
}

export function formatDotDate(iso?: string): string | undefined {
  if (!iso) return undefined
  const [year, month, day] = iso.split('-')
  if (!year || !month || !day) return iso
  return `${month}.${day}.${year.slice(2)}`
}

export function formatLongDate(iso?: string): string | undefined {
  if (!iso) return undefined
  const date = new Date(`${iso}T12:00:00`)
  if (Number.isNaN(date.getTime())) return iso
  return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
}

export function formatShortDate(iso?: string): string | undefined {
  if (!iso) return undefined
  const [, month, day] = iso.split('-')
  if (!month || !day) return iso
  return `${month}.${day}`
}

export function yearOf(iso?: string): string | undefined {
  if (!iso) return undefined
  return iso.slice(0, 4)
}
