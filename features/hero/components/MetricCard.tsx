import type { HeroMetricCard } from '../types/hero.types'

const ACCENT_COLORS = {
  red: { border: 'var(--red)', dot: 'var(--red)', text: 'var(--red)' },
  blue: { border: 'var(--blue)', dot: 'var(--blue)', text: 'var(--blue)' },
  amber: { border: 'var(--amber)', dot: 'var(--amber)', text: 'var(--amber)' },
  green: { border: 'var(--green)', dot: 'var(--green)', text: 'var(--green)' },
} as const

interface MetricCardProps {
  card: HeroMetricCard
  className?: string
  style?: React.CSSProperties
}

export function MetricCard({ card, className, style }: MetricCardProps) {
  const accent = ACCENT_COLORS[card.accentColor]

  return (
    <div
      className={className}
      style={{
        ...style,
        background: 'rgba(8,14,28,.92)',
        border: `1px solid var(--border)`,
        borderLeft: `3px solid ${accent.border}`,
        borderRadius: '8px',
        padding: '10px 13px',
        backdropFilter: 'blur(16px)',
        width: 130,
      }}
      role="status"
      aria-label={`${card.label}: ${card.value}`}
    >
      <p
        className="text-[.52rem] font-bold tracking-[.1em] uppercase flex items-center gap-1 mb-[3px]"
        style={{ color: 'var(--txt3)', fontFamily: 'var(--font-mono)' }}
      >
        <span
          className="w-1 h-1 rounded-full flex-shrink-0"
          style={{ background: accent.dot }}
          aria-hidden="true"
        />
        {card.label}
      </p>
      <p className="text-[.95rem] font-bold leading-none text-white">{card.value}</p>
      <p className="text-[.56rem] mt-0.5 leading-[1.3]" style={{ color: 'var(--txt3)' }}>
        {card.sub}
      </p>
    </div>
  )
}
