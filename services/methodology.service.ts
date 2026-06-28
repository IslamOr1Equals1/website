export interface MethodStep {
  number: string
  iconName: string
  title: string
  description: string
  tags: Array<{ label: string; color: 'blue' | 'amber' | 'red' | 'green' | 'purple' }>
}

export async function getMethodologySteps(): Promise<MethodStep[]> {
  return [
    {
      number: '01',
      iconName: 'search',
      title: 'Scoping & Intelligence Gathering',
      description: 'Before touching a single system, I invest time understanding your architecture, technology stack, threat model, and business context. Engagement quality starts here.',
      tags: [
        { label: 'OSINT', color: 'blue' },
        { label: 'Threat Modelling', color: 'blue' },
        { label: 'Attack Surface Mapping', color: 'blue' },
      ],
    },
    {
      number: '02',
      iconName: 'radar',
      title: 'Enumeration & Vulnerability Discovery',
      description: 'Systematic identification of attack surface — from exposed services and misconfigurations to logic flaws that automated scanners consistently miss.',
      tags: [
        { label: 'Manual Testing', color: 'amber' },
        { label: 'Tool-Assisted Scanning', color: 'amber' },
        { label: 'Business Logic Analysis', color: 'amber' },
      ],
    },
    {
      number: '03',
      iconName: 'crosshair',
      title: 'Exploitation & Impact Demonstration',
      description: 'Proving real-world exploitability — not just theoretical risk. Every finding includes proof-of-concept evidence and demonstrated business impact.',
      tags: [
        { label: 'Controlled Exploitation', color: 'red' },
        { label: 'Chained Attack Paths', color: 'red' },
        { label: 'Impact Evidence', color: 'red' },
      ],
    },
    {
      number: '04',
      iconName: 'file-text',
      title: 'Reporting & Remediation Guidance',
      description: 'Findings are translated into business risk — with clear severity ratings, remediation priority, and technical guidance your developers can act on immediately.',
      tags: [
        { label: 'Executive Summary', color: 'green' },
        { label: 'Technical Appendix', color: 'green' },
        { label: 'Remediation Roadmap', color: 'green' },
      ],
    },
    {
      number: '05',
      iconName: 'check-circle',
      title: 'Remediation Verification',
      description: 'After your team addresses findings, I verify that fixes are complete and have not introduced new vulnerabilities. Included at no additional cost.',
      tags: [
        { label: 'Re-testing', color: 'purple' },
        { label: 'Fix Validation', color: 'purple' },
        { label: 'Regression Check', color: 'purple' },
      ],
    },
    {
      number: '06',
      iconName: 'refresh-cw',
      title: 'Continuous Improvement',
      description: 'Ongoing advisory support to help your team implement findings, build security maturity, and prepare for future assessments.',
      tags: [
        { label: 'Advisory Sessions', color: 'blue' },
        { label: 'Developer Training', color: 'blue' },
        { label: 'Security Roadmap', color: 'blue' },
      ],
    },
  ]
}
