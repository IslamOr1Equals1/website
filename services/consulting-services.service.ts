export interface ConsultingService {
  number: string
  iconName: string
  name: string
  description: string
  scope: string[]
}

export async function getConsultingServices(): Promise<ConsultingService[]> {
  return [
    {
      number: '01',
      iconName: 'globe',
      name: 'Web Application Penetration Testing',
      description: 'Full-coverage assessment of web applications — from authentication bypass and injection to business logic abuse and API security failures.',
      scope: [
        'OWASP Top 10 and beyond',
        'API endpoint enumeration and abuse',
        'Authentication and session management',
        'Business logic and privilege escalation',
      ],
    },
    {
      number: '02',
      iconName: 'network',
      name: 'Network & Active Directory Assessment',
      description: 'Simulated insider and external threat to identify exploitable paths from initial access to domain compromise.',
      scope: [
        'Internal and external network pentest',
        'Active Directory attack path analysis',
        'Lateral movement and persistence simulation',
        'Credential and privilege attack chains',
      ],
    },
    {
      number: '03',
      iconName: 'cloud',
      name: 'Cloud Security Review',
      description: 'Comprehensive review of your cloud configuration, IAM posture, and workload security across AWS, Azure, or GCP.',
      scope: [
        'IAM roles, policies, and privilege escalation',
        'Publicly exposed resources and storage',
        'Workload and container security',
        'CI/CD pipeline and secrets management',
      ],
    },
    {
      number: '04',
      iconName: 'crosshair',
      name: 'Red Team Engagement',
      description: 'Full adversary simulation targeting your people, processes, and technology — testing the effectiveness of your detection and response capabilities.',
      scope: [
        'Multi-phase, goal-oriented attack simulation',
        'Physical, social engineering, and technical attacks',
        'Command and control infrastructure',
        'Detection and response gap analysis',
      ],
    },
    {
      number: '05',
      iconName: 'bar-chart',
      name: 'Security Advisory & vCISO',
      description: 'Strategic security guidance for organisations building or maturing their security programme — without the cost of a full-time CISO.',
      scope: [
        'Security roadmap and programme design',
        'Risk assessment and prioritisation',
        'Vendor and tool evaluation',
        'Board and executive communication support',
      ],
    },
    {
      number: '06',
      iconName: 'code',
      name: 'Secure Code Review',
      description: 'Manual and automated review of application source code to identify vulnerabilities before they reach production.',
      scope: [
        'Language-agnostic manual code review',
        'SAST tooling integration and triage',
        'Developer security training sessions',
        'Pre-deployment security sign-off',
      ],
    },
  ]
}
