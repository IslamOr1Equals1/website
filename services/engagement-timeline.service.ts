export interface EngagementPhase {
  number: string
  title: string
  duration: string
  involvement: string
  deliverable: string
}

export async function getEngagementTimeline(): Promise<EngagementPhase[]> {
  return [
    {
      number: '01',
      title: 'Scope & Proposal',
      duration: '24–48 hours',
      involvement: 'Review and sign',
      deliverable: 'Fixed-fee proposal, NDA, Rules of Engagement',
    },
    {
      number: '02',
      title: 'Kick-off',
      duration: '30-min call',
      involvement: 'Required',
      deliverable: 'Testing schedule, communication plan, emergency contacts',
    },
    {
      number: '03',
      title: 'Active Testing',
      duration: 'Varies by service',
      involvement: 'Minimal — daily update only',
      deliverable: 'Daily written status update',
    },
    {
      number: '04',
      title: 'Debrief Call',
      duration: '60 minutes',
      involvement: 'Required',
      deliverable: 'Verbal findings summary before the written report',
    },
    {
      number: '05',
      title: 'Reporting',
      duration: '2–3 days',
      involvement: 'None — review begins',
      deliverable: 'Executive Report + Technical Report',
    },
    {
      number: '06',
      title: 'Re-test',
      duration: '1–2 days',
      involvement: 'Minimal',
      deliverable: 'Re-test report confirming critical and high findings closed',
    },
  ]
}
