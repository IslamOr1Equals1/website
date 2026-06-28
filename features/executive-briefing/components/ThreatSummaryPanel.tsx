'use client'

import type { ThreatSummaryData } from '@/services/executive-briefing.service'

const SEV_STYLES = {
  CRITICAL: { color: 'var(--red)', border: 'var(--red)', label: 'CRIT' },
  HIGH: { color: 'var(--amber)', border: 'var(--amber)', label: 'HIGH' },
  MEDIUM: { color: 'var(--blue)', border: 'var(--blue)', label: 'MED' },
  LOW: { color: 'var(--green)', border: 'var(--green)', label: 'LOW' },
  INFO: { color: 'var(--green)', border: 'var(--green)', label: 'INFO' },
} as const

interface ThreatSummaryPanelProps {
  data: ThreatSummaryData
}

export function ThreatSummaryPanel({ data }: ThreatSummaryPanelProps) {
  const { metrics, feed, sectorsAtRisk } = data

  return (
    <div className="flex flex-col overflow-hidden" style={{ background: 'var(--bg2)' }}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-[13px] border-b flex-shrink-0" style={{ borderColor: 'var(--border)' }}>
        <p className="text-[.7rem] font-bold tracking-[.12em] uppercase text-white">Threat Summary</p>
        <div className="flex items-center gap-[5px] text-[.58rem] font-bold tracking-[.08em] uppercase" style={{ color: 'var(--green)' }}>
          <span className="w-[5px] h-[5px] rounded-full" style={{ background: 'var(--green)', animation: 'pulse-dot 2s infinite' }} aria-hidden="true" />
          Live
        </div>
      </div>

      {/* Metrics row */}
      <div className="grid grid-cols-3 gap-px flex-shrink-0" style={{ background: 'var(--border)' }}>
        <MetricCell value={String(metrics.criticalCount)} label="Critical" colorClass="var(--red)" />
        <MetricCell value={String(metrics.highCount)} label="High" colorClass="var(--amber)" />
        <MetricCell value={String(metrics.newToday)} label="New Today" colorClass="var(--blue)" />
      </div>

      {/* Threat list */}
      <div className="flex flex-col gap-px flex-1 overflow-auto" style={{ background: 'var(--border)' }}>
        {feed.map((item) => {
          const sev = SEV_STYLES[item.severity]
          return (
            <div
              key={item.id}
              className="flex gap-[9px] items-start px-[13px] py-[9px] transition-colors duration-200"
              style={{
                background: 'var(--bg2)',
                borderLeft: `3px solid ${sev.border}`,
                cursor: 'default',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--bg3)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--bg2)')}
            >
              <p
                className="flex-shrink-0 text-[.48rem] font-bold tracking-[.05em] uppercase mt-[3px] w-[34px]"
                style={{ color: sev.color, fontFamily: 'var(--font-mono)' }}
              >
                {sev.label}
              </p>
              <div className="flex-1 min-w-0">
                <p className="text-[.72rem] font-semibold text-white leading-[1.3] mb-[2px] truncate">{item.title}</p>
                <p className="text-[.62rem] leading-[1.35]" style={{ color: 'var(--txt3)' }}>{item.source}</p>
              </div>
              <p className="flex-shrink-0 text-[.52rem] mt-[3px]" style={{ color: 'var(--txt3)', fontFamily: 'var(--font-mono)' }}>
                {item.publishedAt}
              </p>
            </div>
          )
        })}
      </div>

      {/* Sectors */}
      <div className="px-[14px] py-2.5 border-t flex items-center gap-1.5 flex-wrap flex-shrink-0" style={{ borderColor: 'var(--border)' }}>
        <p className="text-[.57rem] font-bold tracking-[.1em] uppercase flex-shrink-0" style={{ color: 'var(--txt3)' }}>
          At Risk
        </p>
        {sectorsAtRisk.map((s) => (
          <span
            key={s.name}
            className="text-[.6rem] font-semibold px-1.5 py-[2px] rounded-[3px]"
            style={{ color: 'var(--txt2)', border: '1px solid var(--border)' }}
          >
            {s.name}
          </span>
        ))}
      </div>
    </div>
  )
}

function MetricCell({ value, label, colorClass }: { value: string; label: string; colorClass: string }) {
  return (
    <div className="text-center py-[11px] px-2" style={{ background: 'var(--bg2)' }}>
      <p className="text-[1.3rem] font-extrabold tracking-[-0.04em] leading-none" style={{ color: colorClass }}>
        {value}
      </p>
      <p className="text-[.52rem] mt-[3px] leading-[1.3]" style={{ color: 'var(--txt3)' }}>{label}</p>
    </div>
  )
}
