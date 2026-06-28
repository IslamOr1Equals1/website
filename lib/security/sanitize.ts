const SAFE_URL_PROTOCOLS = ['https:', 'http:', 'mailto:']

export function sanitizeUrl(url: string): string | null {
  try {
    const parsed = new URL(url)
    if (!SAFE_URL_PROTOCOLS.includes(parsed.protocol)) return null
    return url
  } catch {
    return null
  }
}

export function sanitizeExternalUrl(url: string): string | null {
  const safe = sanitizeUrl(url)
  if (!safe) return null
  try {
    const parsed = new URL(url)
    if (parsed.hostname === 'localhost' || parsed.hostname.endsWith('.local')) return null
    return safe
  } catch {
    return null
  }
}
