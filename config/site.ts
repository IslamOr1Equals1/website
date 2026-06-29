export const siteConfig = {
  name: 'Islam Ahmed',
  title: 'Islam Ahmed — Offensive Security Consultant',
  description:
    'Offensive Security Consultant and Penetration Tester helping organizations identify and remediate critical vulnerabilities before adversaries can exploit them.',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
  author: {
    name: 'Islam Ahmed',
    email: 'islame.ahmed@outlook.com',
    role: 'Offensive Security Consultant',
    linkedin: 'https://linkedin.com/in/islamahmed',
    github: 'https://github.com/is14m',
  },
  nav: [
    { label: 'Services', href: '/services' },
    { label: 'Security Insights', href: '/#security-analysis' },
    { label: 'About', href: '/#meet-islam' },
  ],
  socials: {
    linkedin: 'https://linkedin.com/in/islamahmed',
    github: 'https://github.com/is14m',
  },
} as const

export type SiteConfig = typeof siteConfig
