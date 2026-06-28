export interface TrustReason {
  iconName: string
  title: string
  description: string
}

export async function getTrustReasons(): Promise<TrustReason[]> {
  return [
    {
      iconName: 'file-check',
      title: 'Fixed-Fee Engagements',
      description: 'Every engagement is scoped and priced before a single test runs. No day-rate overruns, no scope creep surprises, no invoice shock. The agreed fee is the final fee — regardless of how long the testing takes to complete properly.',
    },
    {
      iconName: 'shield-check',
      title: 'NDA Before Scoping',
      description: 'A mutual NDA is available before any environment details, architecture diagrams, or sensitive information are discussed. Confidentiality begins at the first conversation, not after the contract is signed.',
    },
    {
      iconName: 'refresh-cw',
      title: 'Free Re-test Included',
      description: 'All critical and high findings are re-tested at no additional cost once remediation is in place. The engagement isn\'t complete until your fixes are confirmed to hold under the same conditions used to find the original vulnerability.',
    },
    {
      iconName: 'clock',
      title: '24-Hour Response',
      description: 'All enquiries receive a substantive, personalised response within 24 hours — not an automated acknowledgement. Urgent pre-launch or compliance-deadline assessments are accommodated where operationally possible.',
    },
  ]
}
