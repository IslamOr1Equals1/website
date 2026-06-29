import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo/metadata'
import { buildServicesPageJsonLd } from '@/lib/seo/json-ld'
import { getConsultingServices } from '@/services/consulting-services.service'
import { getIndustryExpertise } from '@/services/industry-expertise.service'
import { getEngagementTimeline } from '@/services/engagement-timeline.service'
import { getServicesResults } from '@/services/services-results.service'
import { getFaq } from '@/services/faq.service'
import { StickyServiceNav } from '@/features/services-page/components/StickyServiceNav'
import { ServicesHero } from '@/features/services-page/components/ServicesHero'
import { ServiceNavigatorSection } from '@/features/services-page/components/ServiceNavigatorSection'
import { IndustryExpertiseSection } from '@/features/services-page/components/IndustryExpertiseSection'
import { ServiceDeepDive } from '@/features/services-page/components/ServiceDeepDive'
import { MethodologySection } from '@/features/services-page/components/MethodologySection'
import { EngagementTimelineSection } from '@/features/services-page/components/EngagementTimelineSection'
import { ReportArchitectureSection } from '@/features/services-page/components/ReportArchitectureSection'
import { StandardsPanel } from '@/features/services-page/components/StandardsPanel'
import { ServicesResultsSection } from '@/features/services-page/components/ServicesResultsSection'
import { IndependentExpertiseSection } from '@/features/services-page/components/IndependentExpertiseSection'
import { GuaranteesSection } from '@/features/services-page/components/GuaranteesSection'
import { IdealClientSection } from '@/features/services-page/components/IdealClientSection'
import { FaqSection } from '@/features/services-page/components/FaqSection'
import { ServicesCtaSection } from '@/features/services-page/components/ServicesCtaSection'

export const metadata: Metadata = buildMetadata({
  title: 'Offensive Security Consulting Services',
  description:
    'Penetration testing, red team engagements, cloud security reviews, and secure code review — delivered by a senior offensive security consultant.',
  path: '/services',
})

export default async function ServicesPage() {
  const [services, industryItems, phases, results, faqs] = await Promise.all([
    getConsultingServices(),
    getIndustryExpertise(),
    getEngagementTimeline(),
    getServicesResults(),
    getFaq(),
  ])

  const jsonLd = buildServicesPageJsonLd(services)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c').replace(/>/g, '\\u003e').replace(/&/g, '\\u0026') }}
      />

      {/*
        StickyServiceNav is the sole Client Component on this page.
        It uses IntersectionObserver to show/hide and track the active deep-dive section.
        Rendered here so it mounts once and persists across the full scroll journey.
      */}
      <StickyServiceNav />

      <>
        <ServicesHero />
        <ServiceNavigatorSection services={services} />
        <IndustryExpertiseSection items={industryItems} />

        {services.map((service, i) => (
          <ServiceDeepDive key={service.slug} service={service} index={i} />
        ))}

        <MethodologySection />
        <EngagementTimelineSection phases={phases} />
        <ReportArchitectureSection />
        <StandardsPanel />
        <ServicesResultsSection results={results} />
        <IndependentExpertiseSection />
        <GuaranteesSection />
        <IdealClientSection />
        <FaqSection faqs={faqs} />
        <ServicesCtaSection />
      </>
    </>
  )
}
