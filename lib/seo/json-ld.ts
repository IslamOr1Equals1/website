import { siteConfig } from '@/config/site'
import type { ConsultingService } from '@/services/consulting-services.service'

interface JsonLdGraph {
  '@context': 'https://schema.org'
  '@graph': object[]
}

function buildPersonSchema() {
  return {
    '@type': 'Person',
    '@id': `${siteConfig.url}/#person`,
    name: siteConfig.author.name,
    jobTitle: 'Offensive Security Consultant',
    url: siteConfig.url,
    sameAs: [siteConfig.socials.linkedin, siteConfig.socials.github],
  }
}

function buildServiceSchema(service: ConsultingService) {
  return {
    '@type': 'Service',
    '@id': `${siteConfig.url}/services#${service.slug}`,
    name: service.name,
    description: service.description,
    provider: { '@id': `${siteConfig.url}/#person` },
    serviceType: 'Security Consulting',
    areaServed: 'GB',
    url: `${siteConfig.url}/services#service-${service.slug}`,
  }
}

export function buildServicesPageJsonLd(services: ConsultingService[]): JsonLdGraph {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      buildPersonSchema(),
      {
        '@type': 'WebPage',
        '@id': `${siteConfig.url}/services`,
        name: 'Offensive Security Consulting Services',
        description: 'Penetration testing, red team engagements, cloud security reviews, and secure code review — delivered by a senior offensive security consultant.',
        url: `${siteConfig.url}/services`,
        isPartOf: { '@type': 'WebSite', url: siteConfig.url },
        about: { '@id': `${siteConfig.url}/#person` },
      },
      ...services.map(buildServiceSchema),
    ],
  }
}
