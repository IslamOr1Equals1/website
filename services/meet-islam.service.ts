export interface ProfileFact {
  iconName: string
  value: string
  sub: string
}

export interface ApproachItem {
  number: string
  title: string
  description: string
}

export interface ProfileData {
  facts: ProfileFact[]
  approachItems: ApproachItem[]
  philosophy: string
}

export async function getProfileData(): Promise<ProfileData> {
  return {
    facts: [
      { iconName: 'map-pin', value: 'London, United Kingdom', sub: 'Available for global remote engagements' },
      { iconName: 'briefcase', value: '12+ Years', sub: 'Offensive security experience' },
      { iconName: 'award', value: 'OSCP, CRTO, CEH, eWPTX', sub: 'Active certifications' },
      { iconName: 'users', value: '40+ Enterprise Clients', sub: 'Across 12 countries' },
    ],
    approachItems: [
      {
        number: '01',
        title: 'Business First',
        description: 'Every finding is framed in terms of business risk, not just technical severity. Your board should understand it, your CTO should be able to prioritise it, and your developers should be able to fix it.',
      },
      {
        number: '02',
        title: 'Attacker Mindset',
        description: 'I think like the threat actors targeting your specific industry — their tooling, their objectives, their persistence techniques. Not a generic checklist applied to every client, but a targeted simulation of your actual threat landscape.',
      },
      {
        number: '03',
        title: 'Long-Term Partnership',
        description: 'Security is a continuous programme, not a one-time exercise. I track remediation, re-test fixes, and stay engaged between assessments — so you have a trusted advisor, not just a vendor.',
      },
    ],
    philosophy:
      'Security should enable your business, not obstruct it. My job is to find the vulnerabilities that matter — the ones a motivated attacker would actually exploit — and help you fix them in a way that fits your operational reality. <strong>Technical depth and business clarity in every engagement.</strong>',
  }
}
