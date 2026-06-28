export type WorkType = 'red' | 'blue' | 'green'

export interface WorkCard {
  type: 'Red Team' | 'Pentest' | 'Advisory'
  typeVariant: WorkType
  industry: string
  title: string
  challenge: string
  findings: string
  impact: string
  tags: string[]
}

export async function getSecurityImpactCards(): Promise<WorkCard[]> {
  return [
    {
      type: 'Red Team',
      typeVariant: 'red',
      industry: 'FINANCIAL SERVICES',
      title: 'Domain Compromise in 3.5 Hours — Regional Bank',
      challenge: 'A UK-based regional bank commissioned a black-box red team engagement to validate their SOC detection and incident response capability. The bank had invested significantly in SIEM tooling and believed their detection coverage to be mature. No environment access or internal documentation was provided.',
      findings: 'Phishing campaign achieved initial access within 90 minutes. Kerberoasting and unconstrained delegation enabled domain admin escalation in 3.5 hours without triggering a single alert. Full exfiltration of the customer data directory completed before the SOC identified any anomaly.',
      impact: 'SOC detection rules overhauled. LAPS deployed across 2,400 endpoints. Mean time to detect improved from 72 hours to under 8 hours post-remediation.',
      tags: ['Active Directory', 'Kerberoasting', 'Phishing', 'Red Team'],
    },
    {
      type: 'Pentest',
      typeVariant: 'blue',
      industry: 'FINTECH / SAAS',
      title: 'IDOR Chain Exposing 2.3M Customer Records — Payment Platform',
      challenge: 'Pre-launch penetration test for a Series B fintech platform processing card-not-present payments across 14 European markets. The platform had passed an automated scanner assessment and internal security review. Testing was scoped to the production-equivalent staging environment under a signed rules of engagement agreement.',
      findings: 'Chained BOLA + mass assignment vulnerability allowed unauthenticated enumeration of all customer accounts and full PII exfiltration without rate limiting. The scanner had not identified the vulnerability chain because each individual endpoint appeared safe in isolation.',
      impact: 'Critical fix deployed before launch. PCI-DSS compliance maintained. Estimated regulatory exposure of €4.2M avoided. Customer data never reached production.',
      tags: ['BOLA / IDOR', 'API Security', 'PCI-DSS', 'Mass Assignment'],
    },
    {
      type: 'Advisory',
      typeVariant: 'green',
      industry: 'HEALTHCARE',
      title: 'Cloud Misconfiguration: Patient Data Exposed via Public S3 Buckets',
      challenge: 'A healthcare SaaS startup storing NHS-integrated patient records engaged for a cloud security review following an internal audit flag. The engineering team had migrated from on-premise to AWS over 18 months. No dedicated cloud security expertise was in place during the migration.',
      findings: '14 S3 buckets publicly accessible, IMDSv1 enabled on all EC2 instances enabling SSRF-to-credential-theft chains, and wildcard IAM policies granting excessive privileges to 23 service accounts. The exposure had existed undetected for over 11 months.',
      impact: 'All critical findings remediated in 72 hours. NHS IG Toolkit compliance restored. Estimated ICO fine exposure of £2.8M eliminated. Zero data exfiltration confirmed.',
      tags: ['AWS', 'S3 Misconfiguration', 'IAM', 'SSRF', 'GDPR'],
    },
  ]
}
