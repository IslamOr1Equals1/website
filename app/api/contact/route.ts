import { type NextRequest, NextResponse } from 'next/server'
import { contactSchema } from '@/features/contact/schemas/contact.schema'
import { EmailContactRepository } from '@/repositories/contact.repository'
import { logger } from '@/lib/logger'

const repo = new EmailContactRepository()

export async function POST(request: NextRequest) {
  let body: unknown

  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ message: 'Invalid request body' }, { status: 400 })
  }

  const parsed = contactSchema.safeParse(body)

  if (!parsed.success) {
    return NextResponse.json(
      { message: 'Validation failed', errors: parsed.error.flatten().fieldErrors },
      { status: 400 },
    )
  }

  const { website, ...data } = parsed.data

  // Honeypot check — silently discard bot submissions
  if (website) {
    return NextResponse.json({ message: 'Message received.' }, { status: 200 })
  }

  try {
    const result = await repo.submit(data)
    if (!result.success) {
      return NextResponse.json({ message: 'Failed to send. Please try again.' }, { status: 500 })
    }
    return NextResponse.json({ message: 'Message received.' }, { status: 200 })
  } catch (err) {
    logger.error('Contact route error', { error: String(err) })
    return NextResponse.json({ message: 'Something went wrong. Please try again.' }, { status: 500 })
  }
}
