export type StatPair = { value: string; label: string }
export type DayEntry = { day: string; event: string; critical?: boolean }

export type VisualMoment =
  | { type: 'stat-contrast'; pairs: StatPair[] }
  | { type: 'attack-chain'; steps: string[] }
  | { type: 'metric-callout'; value: string; label: string; context: string }
  | { type: 'day-timeline'; entries: DayEntry[] }
  | { type: 'code-block'; language: string; caption: string; lines: string[] }

export interface ServiceOutcome {
  label: string
  context: string
}

export interface ConsultingService {
  slug: string
  number: string
  iconName: string
  name: string
  description: string
  navigatorDescription: string
  category: 'offensive' | 'advisory'
  keyInsight: string
  businessRisk: string[]
  visualMoment: VisualMoment
  closingLine: string
  scopeLabel: string
  scope: string[]
  deliverables: string[]
  executiveQuestions: string[]
  typicalDuration: string
  typicalOutput: string
  outcomes: ServiceOutcome[]
  industryRelevance: string[]
  tags?: string[]
  summary?: string
}

export async function getConsultingServices(): Promise<ConsultingService[]> {
  return [
    {
      slug: 'web-app',
      number: '01',
      iconName: 'globe',
      name: 'Web Application Penetration Testing',
      description: 'Full-coverage assessment of web applications — from authentication bypass and injection to business logic abuse and API security failures.',
      navigatorDescription: 'Auth logic, business logic, API attack surface',
      category: 'offensive',
      keyInsight: 'A clean scan report is not the same as a secure application.',
      businessRisk: [
        'Most web application security reviews begin and end with an automated scan. The report returns nothing critical. The timeline moves forward. This is the gap that gets exploited.',
        'Web application vulnerabilities live where business logic meets implementation detail — the token that only validates on the expected path, the authorisation check that trusts a parameter it should not, the API endpoint reachable from a direction your own team never considered.',
        'An attacker does not follow your test plan. They find the authentication flow that only breaks under specific sequencing. Your scanner does not know what your application is supposed to do. That distinction is where critical findings live.',
      ],
      visualMoment: {
        type: 'stat-contrast',
        pairs: [
          { value: '0', label: 'Critical findings — automated scan, same engagement' },
          { value: '3', label: 'Critical findings — manual review, same engagement' },
        ],
      },
      closingLine: 'The question is not whether the vulnerability exists. The question is whether you find it before someone else does.',
      scopeLabel: 'What this covers',
      scope: [
        'Authentication and session management testing',
        'Business logic and API abuse testing',
        'OWASP Top 10 coverage',
        'Input validation and injection testing',
        'Third-party integration security',
      ],
      deliverables: [
        'Executive Report',
        'Technical Report with reproduction steps',
        'Prioritised remediation roadmap',
        'Re-test report',
      ],
      executiveQuestions: [
        'Does your application have vulnerabilities your scanner would never identify?',
        'Is your authentication logic exploitable from request paths you have not tested?',
        'What would an assessor find if they tested your API the way no one on your team would?',
      ],
      typicalDuration: '3–5 days',
      typicalOutput: 'Executive + Technical Report + Re-test',
      outcomes: [
        { label: 'Authentication bypass', context: 'in a fintech payment API — missed by scanner, identified via manual logic review' },
        { label: 'Tenant data isolation failure', context: 'across 12 customer accounts in a multi-tenant SaaS platform' },
      ],
      industryRelevance: ['Fintech', 'SaaS', 'E-commerce', 'Healthcare', 'Legal'],
      tags: ['web', 'api', 'owasp', 'authentication', 'business-logic'],
    },
    {
      slug: 'network-ad',
      number: '02',
      iconName: 'network',
      name: 'Network & Active Directory Assessment',
      description: 'Simulated insider and external threat to identify exploitable paths from initial access to domain compromise.',
      navigatorDescription: 'Lateral movement paths, domain escalation, service account risk',
      category: 'offensive',
      keyInsight: 'The most dangerous paths inside your network are the ones that look like normal traffic.',
      businessRisk: [
        'The workstation belonged to someone in finance. Compromised through a phishing email. By Thursday, an attacker had enumerated your entire domain — not through an exploit, but through a service account created during a migration three years ago that still carried delegation rights it no longer needed.',
        'Active Directory contains the full administrative history of your organisation. Every trust, every delegation, every account created under a different security posture than the one you operate under today.',
        'Most of it has never been formally reviewed. A subset of it provides a direct path from a compromised workstation to your domain controller — and that path looks exactly like legitimate activity.',
      ],
      visualMoment: {
        type: 'attack-chain',
        steps: ['One phishing email', 'Kerberoastable account', 'Credential harvest', 'Domain Admin'],
      },
      closingLine: 'The path from a single compromised workstation to domain admin is usually shorter than the last time anyone measured it.',
      scopeLabel: 'What gets mapped',
      scope: [
        'Active Directory enumeration and attack path mapping',
        'Kerberoasting and credential abuse testing',
        'Lateral movement simulation',
        'Network segmentation assessment',
        'Privilege escalation paths',
      ],
      deliverables: [
        'Executive Report',
        'Attack path diagrams',
        'Technical Report',
        'Remediation roadmap',
        'Re-test report',
      ],
      executiveQuestions: [
        'How far could an attacker travel from a single compromised endpoint?',
        'Are there privilege escalation paths in your Active Directory that have never been mapped?',
        'If a workstation was compromised today, how quickly would it reach your domain controller?',
      ],
      typicalDuration: '4–7 days',
      typicalOutput: 'Executive + Technical Report + Attack path diagrams + Re-test',
      outcomes: [
        { label: 'Domain Admin escalation', context: 'from a standard user account in under 2 hours via Kerberoasting' },
        { label: '340 misconfigured IAM policies', context: 'correlated and prioritised in a single assessment session' },
      ],
      industryRelevance: ['Financial Services', 'Healthcare', 'Government', 'Enterprise'],
      tags: ['active-directory', 'internal-pentest', 'lateral-movement', 'kerberoasting'],
    },
    {
      slug: 'cloud',
      number: '03',
      iconName: 'cloud',
      name: 'Cloud Security Review',
      description: 'Comprehensive review of your cloud configuration, IAM posture, and workload security across AWS, Azure, or GCP.',
      navigatorDescription: 'Overpermissioned access, exposed storage, drift since last review',
      category: 'offensive',
      keyInsight: 'Every permission your team has ever granted is still attached to something.',
      businessRisk: [
        'Your cloud environment looks controlled in the console. Dashboards are clean. Cost anomalies within expected range. No active alerts.',
        'Eighteen months ago, a role was created for a project that shipped and closed. Never removed. Six months ago, a Lambda function needed broad permissions to meet a deadline — it is still running with them. A bucket was briefly public during a deployment window, corrected, but the access log was never audited.',
        'Cloud environments accumulate risk the way codebases accumulate technical debt — gradually, invisibly, until a review makes it visible. The difference is that technical debt slows velocity. Misconfigured access exposes your customers.',
      ],
      visualMoment: {
        type: 'metric-callout',
        value: '14 months',
        label: 'exposure undetected',
        context: 'A publicly readable S3 bucket containing customer PII went undetected in one production environment. No alert fired. The access logs showed activity throughout the entire period.',
      },
      closingLine: 'The access that concerns you most is the access you do not know about.',
      scopeLabel: 'What gets reviewed',
      scope: [
        'IAM policy and permission analysis',
        'Storage bucket and object access review',
        'Network exposure and security group audit',
        'Secrets and credential exposure scanning',
        'Cloud-native service configuration review',
      ],
      deliverables: [
        'Executive Report',
        'Technical Report',
        'IAM policy recommendations',
        'Remediation roadmap',
        'Re-test report',
      ],
      executiveQuestions: [
        'Which of your IAM roles can reach resources they were never intended to access?',
        'If an attacker obtained a single cloud credential, what would they be able to do with it?',
        'When was your permission model last reviewed against the principle of least privilege?',
      ],
      typicalDuration: '3–5 days',
      typicalOutput: 'Executive + Technical Report + IAM recommendations + Re-test',
      outcomes: [
        { label: '23 overpermissioned roles', context: 'providing cross-account access beyond intended boundaries' },
        { label: 'Publicly readable S3 bucket', context: 'containing customer PII — undetected for 14 months' },
      ],
      industryRelevance: ['Healthcare', 'Fintech', 'SaaS', 'E-commerce'],
      tags: ['aws', 'azure', 'gcp', 'iam', 'cloud-security', 'compliance'],
    },
    {
      slug: 'red-team',
      number: '04',
      iconName: 'crosshair',
      name: 'Red Team Engagement',
      description: 'Full adversary simulation targeting your people, processes, and technology — testing the effectiveness of your detection and response capabilities.',
      navigatorDescription: 'End-to-end adversary simulation — tests whether controls work together',
      category: 'offensive',
      keyInsight: 'Every other security investment you have made assumes this test would pass.',
      businessRisk: [
        'You have a firewall, endpoint detection, a SIEM, documented policies, and either a SOC or a contract with one. You passed your last compliance audit. Each of those investments was justified individually.',
        'A red team engagement tests whether any of it works together under realistic adversarial pressure — not in a vendor environment, not against a synthetic threat model, but against a consultant operating the way a motivated attacker would.',
        'Day one: a phishing email, clicked by one person. Day three: persistence established, credentials harvested. Day nine: domain admin. No alerts fired. Every control functioned correctly in isolation. None of them interrupted the progression.',
      ],
      visualMoment: {
        type: 'day-timeline',
        entries: [
          { day: 'Day 1', event: 'Phishing email — one click, one foothold' },
          { day: 'Day 3', event: 'Persistence established, credentials harvested' },
          { day: 'Day 9', event: 'Domain Admin — zero alerts fired', critical: true },
        ],
      },
      closingLine: 'Your security programme is only as strong as its worst undetected failure.',
      scopeLabel: 'Attack scope',
      scope: [
        'Full attack lifecycle from initial access to objective completion',
        'Social engineering and phishing simulation',
        'Physical security testing (where in scope)',
        'Detection and response capability assessment',
        'Executive-level risk reporting',
      ],
      deliverables: [
        'Executive Report with attack narrative',
        'Technical Report',
        'Detection capability assessment',
        'Remediation roadmap',
        'Re-test of critical paths',
      ],
      executiveQuestions: [
        'Would your SOC detect a sustained adversary presence inside your environment?',
        'What does the gap between your security investment and your detection capability look like?',
        'If someone had been inside your network for 30 days, would you know?',
      ],
      typicalDuration: '2–4 weeks',
      typicalOutput: 'Full attack narrative + Technical Report + Detection assessment',
      outcomes: [
        { label: 'Initial access via phishing', context: 'followed by domain compromise in 6 days — undetected throughout' },
        { label: 'Zero alerts triggered', context: 'across a 3-week engagement against a SIEM-monitored environment' },
      ],
      industryRelevance: ['Financial Services', 'Government', 'Critical Infrastructure', 'Healthcare'],
      tags: ['red-team', 'adversary-simulation', 'detection-response', 'social-engineering'],
    },
    {
      slug: 'code-review',
      number: '05',
      iconName: 'code',
      name: 'Secure Code Review',
      description: 'Manual and automated review of application source code to identify vulnerabilities before they reach production.',
      navigatorDescription: 'Authorisation assumptions, injection paths, pre-production exposure',
      category: 'offensive',
      keyInsight: 'The most dangerous assumption in your codebase is the one that has never been questioned.',
      businessRisk: [
        'The function was twelve lines. It received a user ID from the request and assumed the middleware had already validated it — because the middleware had been working correctly for two years. This assumption was never documented. It was simply understood.',
        'Six months later, a different engineer added a new endpoint. Same pattern. Same assumption. Different execution context. The middleware did not run in the same order. Neither engineer had reason to know.',
        'This is how authorisation vulnerabilities appear in mature codebases. Not from carelessness. From assumptions that made sense when they were written and were never re-examined when the context changed around them.',
      ],
      visualMoment: {
        type: 'code-block',
        language: 'js',
        caption: 'The assumption that middleware validates is the vulnerability.',
        lines: [
          '// Middleware validates. Always has.',
          'const record = await db.get(req.params.userId)',
          '',
          '// New endpoint. Same pattern. Different context.',
          '// The assumption did not travel with the code.',
        ],
      },
      closingLine: 'Every mature codebase contains assumptions. The question is which ones have never been challenged by someone whose job is to challenge them.',
      scopeLabel: 'Where I look',
      scope: [
        'Authentication and authorisation logic review',
        'Input validation and injection vulnerability identification',
        'Cryptography and secrets handling assessment',
        'Third-party dependency vulnerability review',
        'Business logic security analysis',
      ],
      deliverables: [
        'Technical Report with file and line references',
        'Prioritised remediation guidance',
        'Developer-readable findings',
        'Re-test of critical findings',
      ],
      executiveQuestions: [
        'Are there authorisation assumptions in your codebase that have never been independently verified?',
        'Which parts of your application carry the highest concentration of security-sensitive logic?',
        'Is the vulnerability that would damage your reputation already present in your repository?',
      ],
      typicalDuration: '3–5 days',
      typicalOutput: 'Technical Report + Developer remediation guide + Re-test',
      outcomes: [
        { label: 'IDOR vulnerability', context: 'in a healthcare API allowing cross-patient record access — pre-production' },
        { label: 'Hardcoded credentials', context: 'in 3 production services — rotated and remediated within 48 hours of report' },
      ],
      industryRelevance: ['Fintech', 'SaaS', 'Healthcare', 'E-commerce', 'Legal'],
      tags: ['code-review', 'sast', 'authorisation', 'secure-development'],
    },
  ]
}
