import type { ThreatSummaryData } from '@/services/executive-briefing.service'

const SECTOR_RISK_STYLES = {
  CRITICAL: { color: 'var(--red)', bg: 'rgba(255,68,102,.05)', border: 'rgba(255,68,102,.12)', dot: 'var(--red)' },
  HIGH: { color: 'var(--amber)', bg: 'rgba(255,149,0,.05)', border: 'rgba(255,149,0,.12)', dot: 'var(--amber)' },
  MEDIUM: { color: 'var(--blue)', bg: 'var(--blue4)', border: 'var(--border2)', dot: 'var(--blue)' },
}

export function RiskMetricsPanel({ data }: { data: ThreatSummaryData }) {
  const { metrics, sectorsAtRisk } = data
  const today = new Date().toISOString().slice(0, 10)

  return (
    <div className="flex flex-col overflow-hidden border-l" style={{ background: 'var(--bg2)', borderColor: 'var(--border)' }}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-[13px] border-b flex-shrink-0" style={{ borderColor: 'var(--border)' }}>
        <p className="text-[.7rem] font-bold tracking-[.12em] uppercase text-white">Risk Metrics</p>
        <p className="text-[.55rem]" style={{ color: 'var(--txt3)', fontFamily: 'var(--font-mono)' }}>{today}</p>
      </div>

      {/* Global risk */}
      <div className="px-[14px] py-3 border-b flex-shrink-0" style={{ borderColor: 'var(--border)' }}>
        <p className="text-[.57rem] font-bold tracking-[.1em] uppercase mb-[9px]" style={{ color: 'var(--txt3)' }}>
          Global Risk Level
        </p>
        <div className="rounded-[4px] p-[10px_12px]" style={{ background: 'rgba(255,149,0,.04)', border: '1px solid rgba(255,149,0,.14)' }}>
          <p className="text-[.54rem] font-bold tracking-[.1em] uppercase mb-1" style={{ color: 'var(--txt3)' }}>
            Current Level
          </p>
          <p className="text-[1rem] font-extrabold tracking-[.04em] mb-1.5" style={{ color: 'var(--amber)' }}>
            {metrics.globalRiskLevel}
          </p>
          <div className="h-[3px] rounded-[2px] overflow-hidden" style={{ background: 'rgba(255,255,255,.07)' }}>
            <div
              className="h-full rounded-[2px]"
              style={{
                width: `${metrics.globalRiskScore}%`,
                background: 'linear-gradient(90deg,var(--amber),rgba(255,149,0,.35))',
              }}
              role="progressbar"
              aria-valuenow={metrics.globalRiskScore}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`Global risk score: ${metrics.globalRiskScore}%`}
            />
          </div>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-px flex-shrink-0" style={{ background: 'var(--border)' }}>
        <StatCell value={String(metrics.criticalCount)} label="Critical CVEs" color="var(--red)" />
        <StatCell value={String(metrics.highCount)} label="High CVEs" color="var(--amber)" />
        <StatCell value={String(metrics.activeCampaigns)} label="Active Campaigns" color="var(--blue)" />
        <StatCell value={String(metrics.newToday)} label="New Today" color="var(--green)" />
      </div>

      {/* Sectors at risk */}
      <div className="px-[14px] py-3 border-t flex-shrink-0" style={{ borderColor: 'var(--border)' }}>
        <p className="text-[.57rem] font-bold tracking-[.1em] uppercase mb-[6px]" style={{ color: 'var(--txt3)' }}>
          Sectors at Elevated Risk
        </p>
        <div className="flex flex-col gap-1">
          {sectorsAtRisk.map((sector) => {
            const style = SECTOR_RISK_STYLES[sector.level]
            return (
              <div
                key={sector.name}
                className="flex items-center gap-[7px] text-[.69rem] font-semibold px-2 py-1 rounded-[3px]"
                style={{ color: style.color, background: style.bg, border: `1px solid ${style.border}` }}
              >
                <span className="w-[5px] h-[5px] rounded-full flex-shrink-0" style={{ background: style.dot }} aria-hidden="true" />
                {sector.name}
              </div>
            )
          })}
        </div>
      </div>

      {/* CTA */}
      <div className="mt-auto px-4 py-[14px] border-t flex-shrink-0" style={{ borderColor: 'var(--border)' }}>
        <p className="text-[.73rem] leading-[1.6] mb-2.5" style={{ color: 'var(--txt2)' }}>
          Get a tailored threat briefing for your industry and attack surface.
        </p>
        <button
          className="w-full text-center text-[.78rem] font-semibold py-[9px] rounded-[5px] transition-all duration-200"
          style={{ color: 'var(--blue)', border: '1px solid rgba(26,107,255,.3)', background: 'rgba(26,107,255,.05)' }}
          data-open-contact
        >
          Request a Briefing
        </button>
      </div>
    </div>
  )
}

function StatCell({ value, label, color }: { value: string; label: string; color: string }) {
  return (
    <div className="text-center py-[11px] px-2" style={{ background: 'var(--bg2)' }}>
      <p className="text-[1.3rem] font-extrabold tracking-[-0.04em] leading-none" style={{ color, fontFamily: 'var(--font-mono)' }}>
        {value}
      </p>
      <p className="text-[.52rem] mt-[3px] leading-[1.4]" style={{ color: 'var(--txt3)' }}>{label}</p>
    </div>
  )
}
