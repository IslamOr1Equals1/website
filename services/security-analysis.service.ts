import { MockInsightsRepository } from '@/repositories/insights.repository'
import type { Insight, InsightPreview } from '@/repositories/insights.repository'

export type { Insight, InsightPreview }

const repo = new MockInsightsRepository()

export async function getFeaturedInsight(): Promise<Insight> {
  return repo.getFeaturedInsight()
}

export async function getInsightPreviews(limit = 2): Promise<InsightPreview[]> {
  return repo.getInsightPreviews(limit)
}
