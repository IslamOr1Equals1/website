'use client'

import { HeroGlobe } from './HeroGlobe'
import { MetricCard } from './MetricCard'
import { ThreatTicker } from './ThreatTicker'
import type { HeroMetricCard, HeroTickerItem } from '../types/hero.types'

interface HeroRightProps {
  metricCards: HeroMetricCard[]
  tickerItems: HeroTickerItem[]
}

const CARD_POSITIONS = [
  { top: '18%', left: 0 },
  { top: '18%', right: 0 },
  { bottom: '20%', left: 0 },
  { bottom: '20%', right: 0 },
] as const

export function HeroRight({ metricCards, tickerItems }: HeroRightProps) {
  return (
    <div
      className="relative flex items-center justify-center"
      style={{ height: 500, zIndex: 2 }}
      aria-label="Command Center"
    >
      <div className="relative" style={{ width: '100%', maxWidth: 460, height: 460 }}>
        {/* Status bar */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 flex items-center gap-4 rounded-[6px] z-[12] px-4 py-[7px] whitespace-nowrap"
          style={{
            background: 'rgba(6,11,23,.9)',
            border: '1px solid var(--border)',
            backdropFilter: 'blur(16px)',
          }}
          role="status"
          aria-label="Threat monitoring status"
        >
          <StatusStat value="LIVE" label="Status" color="var(--green)" />
          <div className="w-px h-6" style={{ background: 'var(--border)' }} aria-hidden="true" />
          <StatusStat value="24/7" label="Monitoring" color="var(--blue)" />
          <div className="w-px h-6" style={{ background: 'var(--border)' }} aria-hidden="true" />
          <StatusStat value="0ms" label="Response" color="var(--amber)" />
        </div>

        {/* Globe */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[48%]">
          <HeroGlobe />
        </div>

        {/* Metric cards */}
        <div className="absolute inset-0 pointer-events-none z-10">
          {metricCards.map((card, i) => (
            <MetricCard
              key={i}
              card={card}
              className="absolute pointer-events-auto"
              style={{
                ...CARD_POSITIONS[i],
                animation: `card-float 5s ease-in-out infinite ${i * 0.7}s`,
              } as React.CSSProperties}
            />
          ))}
        </div>

        {/* Threat ticker */}
        <ThreatTicker items={tickerItems} />
      </div>
    </div>
  )
}

function StatusStat({ value, label, color }: { value: string; label: string; color: string }) {
  return (
    <div className="text-center">
      <p className="text-[.78rem] font-extrabold leading-none tracking-[.04em]" style={{ color, fontFamily: 'var(--font-mono)' }}>
        {value}
      </p>
      <p className="text-[.48rem] tracking-[.08em] uppercase mt-[1px]" style={{ color: 'var(--txt3)' }}>
        {label}
      </p>
    </div>
  )
}
