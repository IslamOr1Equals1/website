import { HeroSection } from '@/features/hero/components/HeroSection'
import { IndustryMarquee } from '@/features/industry-marquee/components/IndustryMarquee'
import { WhyHireMeSection } from '@/features/why-hire-me/components/WhyHireMeSection'
import { ServicesSection } from '@/features/services-section/components/ServicesSection'
import { SecurityImpactSection } from '@/features/security-impact/components/SecurityImpactSection'
import { MethodologySection } from '@/features/methodology/components/MethodologySection'
import { ExecutiveBriefingSection } from '@/features/executive-briefing/components/ExecutiveBriefingSection'
import { ProcessSection } from '@/features/process/components/ProcessSection'
import { MeetIslamSection } from '@/features/meet-islam/components/MeetIslamSection'
import { TestimonialsWrapper } from '@/features/testimonials/components/TestimonialsWrapper'
import { SecurityAnalysisSection } from '@/features/security-analysis/components/SecurityAnalysisSection'
import { TrustReasonsSection } from '@/features/trust-reasons/components/TrustReasonsSection'
import { CtaSection } from '@/features/cta/components/CtaSection'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <IndustryMarquee />
      <WhyHireMeSection />
      <ServicesSection />
      <SecurityImpactSection />
      <MethodologySection />
      <ExecutiveBriefingSection />
      <ProcessSection />
      <MeetIslamSection />
      <TestimonialsWrapper />
      <SecurityAnalysisSection />
      <TrustReasonsSection />
      <CtaSection />
    </>
  )
}
