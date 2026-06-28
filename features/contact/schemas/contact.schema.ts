import { z } from 'zod'

export const contactSchema = z.object({
  name: z.string().min(2, 'Full name is required').max(100),
  company: z.string().min(1, 'Company is required').max(150),
  email: z.string().email('Please enter a valid business email'),
  companySize: z.enum(['1-10', '11-50', '51-200', '201-1000', '1000+'], {
    error: 'Please select a company size',
  }),
  service: z.enum(
    ['web-app', 'network-ad', 'cloud', 'red-team', 'advisory', 'other'],
    { error: 'Please select a service' },
  ),
  message: z.string().min(20, 'Please provide at least 20 characters').max(2000),
  website: z.string().max(0).optional(), // honeypot — must be empty
})

export type ContactFormValues = z.infer<typeof contactSchema>
