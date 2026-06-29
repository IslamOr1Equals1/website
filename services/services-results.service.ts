export interface ServicesResultCard {
  badge: string
  industry: string
  metric: string
  challenge: string
  finding: string
  outcome: string
  statLabel: string
  statContext: string
}

// Services-page-specific case studies. Distinct from the homepage SecurityImpactSection.
export async function getServicesResults(): Promise<ServicesResultCard[]> {
  return [
    {
      badge: 'Fintech · Web Application',
      industry: 'Series B Fintech',
      metric: 'Critical finding missed by automated scanning',
      challenge: 'A Series B fintech platform prepared for PCI-DSS audit after automated scans returned no critical findings. A manual assessment was commissioned before the audit window opened.',
      finding: 'Authentication bypass in payment initiation API — transactions completed without valid session tokens',
      outcome: 'Finding identified and remediated 3 weeks before audit. Audit passed without material findings on the payment flow.',
      statLabel: '3 weeks',
      statContext: 'before the audit window',
    },
    {
      badge: 'SaaS · Cloud Infrastructure',
      industry: 'B2B SaaS — 200+ Enterprise Customers',
      metric: '23 overpermissioned IAM roles, 4 years unreviewed',
      challenge: 'A B2B SaaS platform needed to validate its AWS security posture ahead of SOC 2 Type II. Infrastructure had grown organically for four years without a formal security review.',
      finding: '23 overpermissioned IAM roles with cross-account access — one with AdministratorAccess attached',
      outcome: 'Complete IAM remediation in 6 weeks. SOC 2 audit passed. Customer data isolation confirmed across all tenants.',
      statLabel: '6 weeks',
      statContext: 'to complete full IAM remediation',
    },
    {
      badge: 'Healthcare · API Security',
      industry: 'Digital Health — Multi-Provider Platform',
      metric: 'Cross-patient data exposure — pre-production',
      challenge: 'A digital health platform handling patient records across clinical providers needed API security assessment before expanding to a new clinical partner network.',
      finding: 'IDOR vulnerability allowing authenticated users to access other patients\' records by iterating a numeric ID',
      outcome: 'Identified and remediated pre-production. HIPAA-scope exposure prevented before any clinical partner integration.',
      statLabel: 'Pre-production',
      statContext: '— prevented before any data was exposed',
    },
  ]
}
