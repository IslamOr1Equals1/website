import { MockThreatIntelRepository } from '@/repositories/threat-intelligence.repository'
import type { ThreatFeedItem, ThreatMetrics } from '@/repositories/threat-intelligence.repository'

export type { ThreatFeedItem, ThreatMetrics }

export interface SectorRisk {
  name: string
  level: 'CRITICAL' | 'HIGH' | 'MEDIUM'
}

export interface ThreatSummaryData {
  metrics: ThreatMetrics
  feed: ThreatFeedItem[]
  sectorsAtRisk: SectorRisk[]
}

const repo = new MockThreatIntelRepository()

export async function getThreatSummaryData(): Promise<ThreatSummaryData> {
  const [metrics, feed] = await Promise.all([repo.getMetrics(), repo.getThreatFeed(12)])

  const sectorsAtRisk: SectorRisk[] = [
    { name: 'Financial Services', level: 'CRITICAL' },
    { name: 'Healthcare', level: 'CRITICAL' },
    { name: 'Government', level: 'HIGH' },
    { name: 'Critical Infrastructure', level: 'HIGH' },
    { name: 'SaaS / Cloud', level: 'MEDIUM' },
  ]

  return { metrics, feed, sectorsAtRisk }
}
