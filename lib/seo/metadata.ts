import type { Metadata } from 'next'
import { siteConfig } from '@/config/site'

interface BuildMetadataOptions {
  title?: string
  description?: string
  path?: string
  noIndex?: boolean
  ogImage?: string
  type?: 'website' | 'article'
}

export function buildMetadata(options: BuildMetadataOptions = {}): Metadata {
  const {
    title,
    description = siteConfig.description,
    path = '/',
    noIndex = false,
    ogImage = '/og/default.png',
    type = 'website',
  } = options

  const fullTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.title
  const url = `${siteConfig.url}${path}`

  return {
    title: fullTitle,
    description,
    metadataBase: new URL(siteConfig.url),
    alternates: { canonical: url },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      type,
      url,
      title: fullTitle,
      description,
      siteName: siteConfig.name,
      images: [{ url: ogImage, width: 1200, height: 630, alt: fullTitle }],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [ogImage],
    },
  }
}
