import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
    RESEND_API_KEY: z.string().optional(),
    RESEND_FROM_EMAIL: z.string().email().optional(),
    RESEND_TO_EMAIL: z.string().email().optional(),
  },
  client: {
    NEXT_PUBLIC_SITE_URL: z.string().url().default('http://localhost:3000'),
    NEXT_PUBLIC_FF_GLOBE_ENABLED: z.coerce.boolean().default(true),
  },
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    RESEND_FROM_EMAIL: process.env.RESEND_FROM_EMAIL,
    RESEND_TO_EMAIL: process.env.RESEND_TO_EMAIL,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    NEXT_PUBLIC_FF_GLOBE_ENABLED: process.env.NEXT_PUBLIC_FF_GLOBE_ENABLED,
  },
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
})
