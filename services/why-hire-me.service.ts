export interface WhyHireMeCard {
  number: string
  iconName: string
  title: string
  description: string
  bullets: string[]
}

export async function getWhyHireMeCards(): Promise<WhyHireMeCard[]> {
  return [
    {
      number: '01',
      iconName: 'target',
      title: 'Offensive-First Thinking',
      description: 'I approach every engagement the way a motivated attacker would — with patience, creativity, and a thorough understanding of how defences fail under real-world pressure, not just in theory.',
      bullets: [
        'Manual testing augmented by custom tooling — never scanner-only assessments',
        'Business logic abuse, chained attack paths, and privilege escalation across layers',
        'Post-exploitation impact demonstration with working proof-of-concept for every finding',
        'Active Directory expertise: Kerberoasting, DCSync, unconstrained delegation, lateral movement',
        'Published CVEs through coordinated, responsible disclosure',
      ],
    },
    {
      number: '02',
      iconName: 'shield',
      title: 'Executive-Ready Reporting',
      description: 'Technical findings translated into business risk your board can act on. Every report bridges the gap between what your developers need to fix and what your executives need to understand.',
      bullets: [
        'CVSS scoring with business-context overlay and regulatory alignment (PCI-DSS, ISO 27001, GDPR)',
        'Remediation effort vs. risk reduction mapping to support prioritisation decisions',
        'Board-level executive summary and full technical appendix delivered in a single document',
        '48-hour report turnaround from test completion to final delivery',
        'Verbal debrief with your technical and executive teams at no additional cost',
      ],
    },
    {
      number: '03',
      iconName: 'lock',
      title: 'Confidential & NDA-Protected',
      description: 'Engagement confidentiality is non-negotiable. Every policy exists to ensure your sensitive infrastructure details, findings, and business data remain exclusively yours.',
      bullets: [
        'Mutual NDA executed before any environment details are shared or scoping begins',
        'Encrypted deliverable handling throughout — no cloud-sharing of sensitive findings',
        'Zero data retention policy: all client data destroyed upon engagement close',
        'Engagement boundary agreement in writing before any testing commences',
        'Professional indemnity insurance maintained for every engagement',
      ],
    },
  ]
}
