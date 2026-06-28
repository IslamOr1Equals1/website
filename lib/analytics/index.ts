'use client'

export interface AnalyticsEvent {
  name: string
  properties?: Record<string, string | number | boolean>
}

function trackVercelAnalytics(_e: AnalyticsEvent) {
  // Vercel Analytics adapter — va() will be available after @vercel/analytics is added
  // import { track } from '@vercel/analytics'
  // track(event.name, event.properties)
}

export function track(event: AnalyticsEvent): void {
  try {
    trackVercelAnalytics(event)
  } catch {
    // Analytics must never crash the application
  }
}

export const Analytics = {
  contactFormSubmitted: (service: string) =>
    track({ name: 'contact_form_submitted', properties: { service } }),
  contactFormFailed: (reason: string) =>
    track({ name: 'contact_form_failed', properties: { reason } }),
  ctaClicked: (location: string) =>
    track({ name: 'cta_clicked', properties: { location } }),
}
