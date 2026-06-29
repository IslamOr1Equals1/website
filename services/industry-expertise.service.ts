export interface IndustryExpertiseItem {
  id: string
  iconName: string
  name: string
  context: string
  threats: string[]
}

export async function getIndustryExpertise(): Promise<IndustryExpertiseItem[]> {
  return [
    {
      id: 'fintech',
      iconName: 'credit-card',
      name: 'Fintech',
      context: 'Open banking APIs and payment flows are the primary attack surface.',
      threats: ['API business logic abuse', 'OAuth misconfiguration', 'PCI-DSS scope exposure'],
    },
    {
      id: 'saas',
      iconName: 'layers',
      name: 'SaaS',
      context: 'Multi-tenant architecture and CI/CD pipelines create unique data isolation risks.',
      threats: ['Tenant data leakage', 'Secrets in repositories', 'Supply chain vulnerabilities'],
    },
    {
      id: 'healthcare',
      iconName: 'heart',
      name: 'Healthcare',
      context: 'Legacy clinical systems and third-party integrations extend the attack surface significantly.',
      threats: ['Unpatched endpoints', 'HIPAA-scope data exposure', 'Ransomware entry points'],
    },
    {
      id: 'enterprise',
      iconName: 'building-2',
      name: 'Enterprise',
      context: 'Active Directory environments and hybrid cloud sprawl create wide lateral movement opportunity.',
      threats: ['AD privilege escalation', 'IAM misconfiguration', 'Insider threat vectors'],
    },
  ]
}
