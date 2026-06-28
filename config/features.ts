import { env } from '@/lib/env'

export const features = {
  globeEnabled: env.NEXT_PUBLIC_FF_GLOBE_ENABLED,
} as const

export type Features = typeof features
