export interface ProcessStep {
  number: string
  iconName: string
  title: string
  description: string
}

export async function getProcessSteps(): Promise<ProcessStep[]> {
  return [
    {
      number: '01',
      iconName: 'message-square',
      title: 'Initial Consultation',
      description: 'A free 30-minute call to understand your environment, threat model, compliance requirements, and timeline. No sales process — just a direct conversation about what you need.',
    },
    {
      number: '02',
      iconName: 'file-text',
      title: 'Scope & Proposal',
      description: 'A tailored scope document and fixed-fee proposal delivered within 24 hours. Includes testing approach, timeline, rules of engagement, and deliverables. No ambiguity, no hidden costs.',
    },
    {
      number: '03',
      iconName: 'shield',
      title: 'Engagement & Testing',
      description: 'Structured testing conducted within the agreed scope and timeline, with daily status updates. Your team stays informed throughout — critical findings flagged immediately, not held until the report.',
    },
    {
      number: '04',
      iconName: 'check-circle',
      title: 'Report & Remediation',
      description: 'Executive and technical report delivered within 48 hours of test completion. A verbal debrief is included. Critical and high findings are re-tested at no cost once your team has remediated.',
    },
  ]
}
