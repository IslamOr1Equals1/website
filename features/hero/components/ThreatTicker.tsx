'use client'

import type { HeroTickerItem } from '../types/hero.types'

interface ThreatTickerProps {
  items: HeroTickerItem[]
}

export function ThreatTicker({ items }: ThreatTickerProps) {
  const doubled = [...items, ...items]

  return (
    <div
      className="absolute bottom-0 left-0 right-0 rounded-[6px] overflow-hidden z-10"
      style={{
        background: 'rgba(6,11,23,.92)',
        border: '1px solid var(--border)',
        padding: '7px 13px',
      }}
    >
      <div
        className="text-[.48rem] font-bold tracking-[.12em] uppercase mb-[3px] flex items-center gap-[5px]"
        style={{ color: 'var(--red)', fontFamily: 'var(--font-mono)' }}
      >
        <span
          className="w-[5px] h-[5px] rounded-full flex-shrink-0"
          style={{ background: 'var(--red)', animation: 'pulse-dot 1.5s infinite' }}
          aria-hidden="true"
        />
        Live Threat Intelligence
      </div>
      <div className="overflow-hidden whitespace-nowrap" aria-label="Live threat ticker" aria-live="polite">
        <span
          className="inline-block text-[.58rem]"
          style={{
            fontFamily: 'var(--font-mono)',
            color: 'var(--txt2)',
            animation: 'ticker-scroll 28s linear infinite',
          }}
        >
          {doubled.map((item, i) => (
            <span key={i} style={{ paddingRight: '60px' }}>
              {item.text}
            </span>
          ))}
        </span>
      </div>
    </div>
  )
}
