export function generateNonce(): string {
  const bytes = new Uint8Array(16)
  crypto.getRandomValues(bytes)
  return btoa(String.fromCharCode(...bytes))
}

export function buildCspHeader(nonce: string, isDev = false): string {
  const scriptSrc = ["'self'", `'nonce-${nonce}'`, "'strict-dynamic'"]
  // React dev overlay and Turbopack HMR both require eval() — dev only
  if (isDev) scriptSrc.push("'unsafe-eval'")

  const connectSrc = ["'self'"]
  // Next.js HMR websocket in development
  if (isDev) connectSrc.push('ws://localhost:*', 'http://localhost:*')

  const directives: Record<string, string[]> = {
    'default-src': ["'self'"],
    'script-src': scriptSrc,
    // Nonce must NOT appear in style-src: per CSP spec, a nonce in style-src causes
    // 'unsafe-inline' to be silently ignored, which blocks all element-level style
    // attributes (React inline styles). The nonce belongs only in script-src.
    'style-src': ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
    'font-src': ["'self'", 'https://fonts.gstatic.com'],
    'img-src': ["'self'", 'data:', 'blob:'],
    'connect-src': connectSrc,
    'frame-src': ["'none'"],
    'object-src': ["'none'"],
    'base-uri': ["'self'"],
    'form-action': ["'self'"],
    'upgrade-insecure-requests': [],
  }

  return Object.entries(directives)
    .map(([key, values]) => (values.length > 0 ? `${key} ${values.join(' ')}` : key))
    .join('; ')
}
