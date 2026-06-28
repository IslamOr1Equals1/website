import { getThreatSummaryData } from '@/services/executive-briefing.service'
import { Container } from '@/components/ui/Container'
import { LAYOUT } from '@/lib/layout/constants'
import { ThreatSummaryPanel } from './ThreatSummaryPanel'
import { LiveIntelFeed } from './LiveIntelFeed'
import { RiskMetricsPanel } from './RiskMetricsPanel'

export async function ExecutiveBriefingSection() {
  const data = await getThreatSummaryData()

  return (
    <section
      id="exec-briefing"
      style={{ padding: '90px 48px', background: 'var(--bg2)', borderTop: '1px solid var(--border)' }}
      aria-labelledby="exec-briefing-heading"
    >
      <Container maxWidth={LAYOUT.execContainerMaxWidth} paddingH={LAYOUT.execContainerPaddingH}>
        <div className="flex justify-between items-end gap-6 mb-[44px] flex-wrap">
          <div>
            <p className="inline-flex items-center gap-2 text-[.68rem] font-bold tracking-[.12em] uppercase mb-2.5" style={{ color: 'var(--blue)' }}>
              <span className="w-4 h-px" style={{ background: 'var(--blue)' }} aria-hidden="true" />
              Executive Security Briefing
            </p>
            <h2 id="exec-briefing-heading" className="text-[clamp(1.55rem,2.8vw,2.3rem)] font-extrabold tracking-[-0.03em] text-white leading-[1.1]">
              The Threat Landscape Right Now
            </h2>
            <p className="text-[.9rem] leading-[1.75] mt-2.5 max-w-[500px]" style={{ color: 'var(--txt2)' }}>
              Live intelligence aggregated from NVD, CISA KEV, GitHub Security Advisories, and ThreatFox.
            </p>
          </div>
        </div>

        <div
          className="grid gap-px border rounded-[8px] overflow-hidden"
          style={{
            gridTemplateColumns: '0.86fr 1.22fr 0.72fr',
            height: 680,
            background: 'var(--border)',
            border: '1px solid var(--border)',
          }}
        >
          <ThreatSummaryPanel data={data} />
          <LiveIntelFeed feed={data.feed} totalCount={data.metrics.criticalCount + data.metrics.highCount + data.metrics.mediumCount} />
          <RiskMetricsPanel data={data} />
        </div>
      </Container>
    </section>
  )
}
