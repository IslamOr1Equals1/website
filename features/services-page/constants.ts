export const SECTION_IDS = {
  navigator: 'service-navigator',
  webApp: 'service-web-app',
  networkAd: 'service-network-ad',
  cloud: 'service-cloud',
  redTeam: 'service-red-team',
  codeReview: 'service-code-review',
  standards: 'services-standards',
  industry: 'services-industry',
  timeline: 'services-timeline',
  results: 'services-results',
  independent: 'independent-expertise',
  guarantees: 'engagement-guarantees',
  idealClient: 'ideal-client',
  faq: 'services-faq',
  cta: 'services-cta',
} as const

export type SectionId = (typeof SECTION_IDS)[keyof typeof SECTION_IDS]

// Ordered list of service deep-dive section IDs for sticky nav
export const SERVICE_DEEP_DIVE_IDS = [
  SECTION_IDS.webApp,
  SECTION_IDS.networkAd,
  SECTION_IDS.cloud,
  SECTION_IDS.redTeam,
  SECTION_IDS.codeReview,
] as const

export const STICKY_NAV_PILLS = [
  { label: 'Web Application', id: SECTION_IDS.webApp },
  { label: 'Network & AD', id: SECTION_IDS.networkAd },
  { label: 'Cloud Security', id: SECTION_IDS.cloud },
  { label: 'Red Team', id: SECTION_IDS.redTeam },
  { label: 'Secure Code Review', id: SECTION_IDS.codeReview },
] as const

export const TRUST_SIGNALS = [
  { val: 'Fixed-fee', label: 'Price agreed before testing begins — no day-rate overruns' },
  { val: 'NDA first', label: 'Confidentiality established before scope is discussed' },
  { val: 'Re-test included', label: 'Critical findings re-tested at no additional cost' },
] as const
