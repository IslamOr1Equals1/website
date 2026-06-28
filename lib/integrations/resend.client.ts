import { env } from '@/lib/env'
import { logger } from '@/lib/logger'

export interface SendEmailOptions {
  to: string
  from: string
  subject: string
  html: string
  replyTo?: string
}

export interface SendEmailResult {
  success: boolean
  id?: string
}

export const resendClient = {
  async sendEmail(options: SendEmailOptions): Promise<SendEmailResult> {
    if (!env.RESEND_API_KEY) {
      logger.warn('RESEND_API_KEY not configured — email delivery skipped')
      return { success: true }
    }

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(options),
    })

    if (!response.ok) {
      const error = await response.text().catch(() => 'Unknown error')
      logger.error('Resend delivery failed', { status: response.status, error })
      return { success: false }
    }

    const data = await response.json() as { id: string }
    return { success: true, id: data.id }
  },
}
