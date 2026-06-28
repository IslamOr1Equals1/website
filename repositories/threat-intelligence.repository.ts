export type Severity = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' | 'INFO'

export interface ThreatFeedItem {
  id: string
  title: string
  source: string
  severity: Severity
  publishedAt: string
  summary: string
}

export interface CVEItem {
  id: string
  description: string
  severity: Severity
  cvssScore: number
  publishedAt: string
  affectedProducts: string[]
}

export interface ThreatMetrics {
  criticalCount: number
  highCount: number
  mediumCount: number
  newToday: number
  activeCampaigns: number
  globalRiskScore: number
  globalRiskLevel: 'CRITICAL' | 'HIGH' | 'ELEVATED' | 'MODERATE'
}

export interface ThreatIntelRepository {
  getThreatFeed(limit?: number): Promise<ThreatFeedItem[]>
  getActiveCVEs(severity?: Severity): Promise<CVEItem[]>
  getMetrics(): Promise<ThreatMetrics>
}

const MOCK_FEED: ThreatFeedItem[] = [
  { id: '1', title: 'Critical RCE in Apache Struts (CVE-2024-53677)', source: 'NVD', severity: 'CRITICAL', publishedAt: '2h ago', summary: 'Unauthenticated remote code execution via file upload parameter manipulation.' },
  { id: '2', title: 'CISA KEV: Palo Alto PAN-OS Auth Bypass', source: 'CISA', severity: 'CRITICAL', publishedAt: '4h ago', summary: 'Added to Known Exploited Vulnerabilities catalog. Patch immediately.' },
  { id: '3', title: 'Active Exploitation: Ivanti Connect Secure 0-day', source: 'ThreatFox', severity: 'CRITICAL', publishedAt: '6h ago', summary: 'Nation-state actor exploiting pre-auth RCE in Ivanti gateways.' },
  { id: '4', title: 'GitHub Advisory: supply chain attack via npm package', source: 'GitHub', severity: 'HIGH', publishedAt: '8h ago', summary: 'Malicious package with 2.3M weekly downloads injects credentials stealer.' },
  { id: '5', title: 'Fortinet FortiOS heap buffer overflow', source: 'NVD', severity: 'HIGH', publishedAt: '10h ago', summary: 'CVSS 9.3 — allows unauthenticated execution in SSL-VPN component.' },
  { id: '6', title: 'Microsoft Patch Tuesday: 3 zero-days actively exploited', source: 'MSRC', severity: 'HIGH', publishedAt: '12h ago', summary: 'Includes CLFS, Win32k, and Hyper-V privilege escalation vulnerabilities.' },
  { id: '7', title: 'Ransomware campaign targeting financial sector SMBs', source: 'AbuseIPDB', severity: 'HIGH', publishedAt: '14h ago', summary: 'BlackCat/ALPHV affiliate group using exposed RDP as initial access vector.' },
  { id: '8', title: 'OpenSSH regreSSHion: old vuln re-introduced in distros', source: 'NVD', severity: 'MEDIUM', publishedAt: '16h ago', summary: 'Signal handler race condition allowing unauthenticated root. Update now.' },
  { id: '9', title: 'Kubernetes API server information disclosure', source: 'GitHub', severity: 'MEDIUM', publishedAt: '18h ago', summary: 'Misconfigured RBAC exposes cluster secrets to unauthenticated requests.' },
  { id: '10', title: 'New phishing kit targeting cloud SaaS OAuth flows', source: 'OpenCTI', severity: 'MEDIUM', publishedAt: '20h ago', summary: 'Adversary-in-the-middle technique bypasses MFA via token hijacking.' },
  { id: '11', title: 'Telerik Report Server critical authentication bypass', source: 'NVD', severity: 'CRITICAL', publishedAt: '22h ago', summary: 'CVE-2024-4358 — CVSS 9.8, no authentication required for exploitation.' },
  { id: '12', title: 'ALPHV ransomware infrastructure seized by FBI', source: 'CISA', severity: 'INFO', publishedAt: '1d ago', summary: 'Decryption keys released for 500+ victims. Check if you qualify.' },
]

const MOCK_METRICS: ThreatMetrics = {
  criticalCount: 47,
  highCount: 183,
  mediumCount: 412,
  newToday: 23,
  activeCampaigns: 8,
  globalRiskScore: 72,
  globalRiskLevel: 'HIGH',
}

export class MockThreatIntelRepository implements ThreatIntelRepository {
  async getThreatFeed(limit = 12): Promise<ThreatFeedItem[]> {
    return MOCK_FEED.slice(0, limit)
  }

  async getActiveCVEs(_severity?: Severity): Promise<CVEItem[]> {
    return []
  }

  async getMetrics(): Promise<ThreatMetrics> {
    return MOCK_METRICS
  }
}
