export interface Insight {
  slug: string
  title: string
  category: InsightCategory
  categoryColor: 'red' | 'blue' | 'purple' | 'green' | 'amber'
  executiveSummary: string
  businessImpact: string
  publishedAt: string
  readingTime: number
  isNew?: boolean
}

export type InsightPreview = Omit<Insight, 'businessImpact'>

export type InsightCategory =
  | 'Red Team'
  | 'Vulnerability Research'
  | 'Threat Intelligence'
  | 'Cloud Security'
  | 'Web Application'
  | 'Network Security'

export interface InsightsRepository {
  getFeaturedInsight(): Promise<Insight>
  getInsightPreviews(limit?: number): Promise<InsightPreview[]>
  getInsightBySlug(slug: string): Promise<Insight | null>
}

const MOCK_INSIGHTS: Insight[] = [
  {
    slug: 'active-directory-attack-paths-2024',
    title: 'Active Directory Attack Paths: How Attackers Move from User to Domain Admin in Under 4 Hours',
    category: 'Red Team',
    categoryColor: 'red',
    executiveSummary: 'Analysis of 47 red team engagements reveals that 91% of organizations with default AD configurations can be fully compromised using only publicly available tooling. This report details the attack chains, detection gaps, and remediation priorities.',
    businessImpact: 'Organizations failing to address Kerberoasting, unconstrained delegation, and LAPS misconfigurations face an average attacker dwell time of 72 hours before credential-based full domain compromise.',
    publishedAt: '2024-12-18',
    readingTime: 14,
    isNew: true,
  },
  {
    slug: 'api-security-owasp-top10-enterprise',
    title: 'The Hidden Attack Surface: API Security Failures in Enterprise Environments',
    category: 'Web Application',
    categoryColor: 'purple',
    executiveSummary: 'OWASP API Top 10 analysis across 23 enterprise engagements. Broken object-level authorization remains the most critical and most overlooked vulnerability class.',
    businessImpact: 'BOLA vulnerabilities enable unauthorized data access without triggering standard security controls, making them invisible to most SIEM configurations.',
    publishedAt: '2024-12-05',
    readingTime: 11,
  },
  {
    slug: 'cloud-misconfiguration-threat-landscape',
    title: 'Cloud Misconfiguration: The $4.45M Risk Most Security Teams Are Ignoring',
    category: 'Cloud Security',
    categoryColor: 'blue',
    executiveSummary: 'IMDSv1 exposure, overly permissive IAM roles, and publicly accessible S3 buckets remain the top three initial access vectors in cloud compromise incidents.',
    businessImpact: 'Average breach cost for cloud misconfigurations exceeds $4.45M when combining data exfiltration, regulatory penalties, and incident response costs.',
    publishedAt: '2024-11-22',
    readingTime: 9,
  },
]

export class MockInsightsRepository implements InsightsRepository {
  async getFeaturedInsight(): Promise<Insight> {
    return MOCK_INSIGHTS[0]
  }

  async getInsightPreviews(limit = 2): Promise<InsightPreview[]> {
    return MOCK_INSIGHTS.slice(1, 1 + limit).map(({ businessImpact: _omit, ...rest }) => rest)
  }

  async getInsightBySlug(slug: string): Promise<Insight | null> {
    return MOCK_INSIGHTS.find((i) => i.slug === slug) ?? null
  }
}
