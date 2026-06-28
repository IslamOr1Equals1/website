'use client'

import type { ThreatFeedItem } from '@/services/executive-briefing.service'

const DOT_STYLES = {
  CRITICAL: { bg: 'var(--red)', shadow: 'rgba(255,68,102,.4)' },
  HIGH: { bg: 'var(--amber)', shadow: 'rgba(255,149,0,.35)' },
  MEDIUM: { bg: 'var(--blue)', shadow: 'rgba(26,107,255,.35)' },
  LOW: { bg: 'var(--green)', shadow: 'rgba(0,214,122,.35)' },
  INFO: { bg: 'var(--green)', shadow: 'rgba(0,214,122,.35)' },
}

interface LiveIntelFeedProps {
  feed: ThreatFeedItem[]
  totalCount: number
}

export function LiveIntelFeed({ feed, totalCount }: LiveIntelFeedProps) {
  const doubled = [...feed, ...feed]

  return (
    <div className="flex flex-col overflow-hidden" style={{ background: 'var(--bg3)' }}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-[13px] border-b flex-shrink-0" style={{ borderColor: 'var(--border)' }}>
        <p className="text-[.7rem] font-bold tracking-[.12em] uppercase text-white">Live Intelligence Feed</p>
        <p className="text-[.6rem] font-bold" style={{ color: 'var(--txt3)', fontFamily: 'var(--font-mono)' }}>
          {totalCount} items
        </p>
      </div>

      {/* Scrolling feed */}
      <div className="flex-1 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-[44px] z-[2] pointer-events-none" style={{ background: 'linear-gradient(var(--bg3),transparent)' }} aria-hidden="true" />
        <div className="absolute bottom-0 left-0 right-0 h-[44px] z-[2] pointer-events-none" style={{ background: 'linear-gradient(transparent,var(--bg3))' }} aria-hidden="true" />

        <div
          className="flex flex-col"
          style={{ animation: 'feed-scroll 38s linear infinite' }}
          onMouseEnter={(e) => (e.currentTarget.style.animationPlayState = 'paused')}
          onMouseLeave={(e) => (e.currentTarget.style.animationPlayState = 'running')}
          aria-label="Live threat intelligence feed"
          aria-live="polite"
        >
          {doubled.map((item, i) => {
            const dot = DOT_STYLES[item.severity]
            return (
              <div
                key={i}
                className="flex gap-2.5 items-start px-[15px] py-2.5 border-b transition-colors duration-180"
                style={{ borderColor: 'var(--border)', cursor: 'default' }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,.025)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-[5px]"
                  style={{ background: dot.bg, boxShadow: `0 0 5px ${dot.shadow}` }}
                  aria-hidden="true"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-[.72rem] font-semibold text-[var(--txt)] leading-[1.3] mb-[2px]">{item.title}</p>
                  <p className="text-[.58rem]" style={{ color: 'var(--txt3)', fontFamily: 'var(--font-mono)' }}>
                    {item.source} · {item.severity}
                  </p>
                </div>
                <p className="flex-shrink-0 text-[.54rem] mt-[3px]" style={{ color: 'var(--txt3)', fontFamily: 'var(--font-mono)' }}>
                  {item.publishedAt}
                </p>
              </div>
            )
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-4 py-2.5 border-t flex-shrink-0" style={{ borderColor: 'var(--border)' }}>
        <p className="text-[.57rem]" style={{ color: 'var(--txt3)', fontFamily: 'var(--font-mono)' }}>
          Aggregated from NVD · CISA · GitHub · ThreatFox
        </p>
        <a
          href="/intelligence-hub"
          className="text-[.65rem] font-semibold transition-opacity hover:opacity-70"
          style={{ color: 'var(--blue)' }}
        >
          View All →
        </a>
      </div>
    </div>
  )
}
