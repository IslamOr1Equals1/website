export interface Testimonial {
  id: string
  quote: string
  authorInitials: string
  authorName: string
  authorRole: string
  company: string
}

export async function getTestimonials(): Promise<Testimonial[]> {
  return [
    {
      id: '1',
      quote: 'Islam found a critical IDOR vulnerability that our internal team and two previous vendors had missed. The report was so clear that our developers fixed every finding within a week.',
      authorInitials: 'SK',
      authorName: 'Sarah K.',
      authorRole: 'CTO',
      company: 'Series B Fintech',
    },
    {
      id: '2',
      quote: 'The red team engagement was eye-opening. Islam\'s team had domain admin in under four hours without triggering a single alert. It was exactly the wake-up call our board needed to approve the security budget.',
      authorInitials: 'MR',
      authorName: 'Mark R.',
      authorRole: 'CISO',
      company: 'Regional Bank',
    },
    {
      id: '3',
      quote: 'We needed a cloud security review before our SOC 2 audit. Islam delivered a thorough assessment with a clear remediation roadmap. We passed the audit with zero exceptions.',
      authorInitials: 'JP',
      authorName: 'James P.',
      authorRole: 'Head of Engineering',
      company: 'Healthcare SaaS',
    },
    {
      id: '4',
      quote: 'What sets Islam apart is the quality of communication. The executive summary was something I could take directly to our board, while the technical appendix gave our developers everything they needed.',
      authorInitials: 'AL',
      authorName: 'Anna L.',
      authorRole: 'CEO',
      company: 'E-commerce Platform',
    },
    {
      id: '5',
      quote: 'Rigorous, professional, and genuinely invested in our security posture. The re-test service is invaluable — we knew exactly when we were safe to deploy.',
      authorInitials: 'DT',
      authorName: 'David T.',
      authorRole: 'VP Engineering',
      company: 'SaaS Startup',
    },
    {
      id: '6',
      quote: 'Islam discovered a business logic flaw in our payment flow that could have been exploited for significant financial fraud. His thorough testing methodology caught something automated tools would never find.',
      authorInitials: 'RM',
      authorName: 'Rachel M.',
      authorRole: 'Head of Security',
      company: 'Payment Provider',
    },
    {
      id: '7',
      quote: 'The API security assessment uncovered three critical authentication flaws. Islam\'s report had clear reproduction steps that made fixing the issues straightforward for our team.',
      authorInitials: 'TC',
      authorName: 'Tom C.',
      authorRole: 'CTO',
      company: 'Enterprise SaaS',
    },
    {
      id: '8',
      quote: 'Outstanding technical depth and clear business communication. Highly recommended for any organisation serious about security.',
      authorInitials: 'FO',
      authorName: 'Fatima O.',
      authorRole: 'CISO',
      company: 'Insurance Group',
    },
  ]
}
