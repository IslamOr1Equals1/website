import { getTestimonials } from '@/services/testimonials.service'
import { TestimonialsSection } from './TestimonialsSection'

export async function TestimonialsWrapper() {
  const testimonials = await getTestimonials()
  return <TestimonialsSection testimonials={testimonials} />
}
