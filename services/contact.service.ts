import { Analytics } from '@/lib/analytics'
import type { ContactFormValues } from '@/features/contact/schemas/contact.schema'

export interface ContactServiceResult {
  success: boolean
  message: string
}

export async function submitContactForm(
  data: ContactFormValues,
): Promise<ContactServiceResult> {
  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      const body = await response.json().catch(() => ({})) as { message?: string }
      Analytics.contactFormFailed(body.message ?? 'api_error')
      return { success: false, message: body.message ?? 'Something went wrong. Please try again.' }
    }

    Analytics.contactFormSubmitted(data.service)
    return { success: true, message: 'Message received.' }
  } catch {
    Analytics.contactFormFailed('network_error')
    return { success: false, message: 'Network error. Please check your connection and try again.' }
  }
}
