import { resendClient } from '@/lib/integrations/resend.client'
import { env } from '@/lib/env'
import { logger } from '@/lib/logger'

export interface ContactSubmission {
  name: string
  company: string
  email: string
  companySize: string
  service: string
  message: string
}

export interface ContactRepository {
  submit(data: ContactSubmission): Promise<{ success: boolean }>
}

export class EmailContactRepository implements ContactRepository {
  async submit(data: ContactSubmission): Promise<{ success: boolean }> {
    const result = await resendClient.sendEmail({
      to: env.RESEND_TO_EMAIL ?? 'islame.ahmed@outlook.com',
      from: env.RESEND_FROM_EMAIL ?? 'noreply@islamahmed.com',
      replyTo: data.email,
      subject: `New Security Consultation Request — ${data.company}`,
      html: buildEmailHtml(data),
    })

    if (!result.success) {
      logger.error('Contact email delivery failed', { company: data.company })
    }

    return { success: result.success }
  }
}

function buildEmailHtml(data: ContactSubmission): string {
  return `
    <h2>New Consultation Request</h2>
    <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
    <p><strong>Company:</strong> ${escapeHtml(data.company)}</p>
    <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
    <p><strong>Company Size:</strong> ${escapeHtml(data.companySize)}</p>
    <p><strong>Service:</strong> ${escapeHtml(data.service)}</p>
    <hr />
    <p><strong>Message:</strong></p>
    <p>${escapeHtml(data.message).replace(/\n/g, '<br />')}</p>
  `
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}
