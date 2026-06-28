import type { HeroStat } from '../types/hero.types'

interface HeroStatsProps {
  stats: HeroStat[]
}

export function HeroStats({ stats }: HeroStatsProps) {
  return (
    <div
      className="col-span-full grid border-t"
      style={{
        gridTemplateColumns: `repeat(${stats.length}, 1fr)`,
        borderColor: 'var(--border)',
        position: 'relative',
        zIndex: 2,
      }}
    >
      {stats.map((stat, i) => (
        <div
          key={i}
          className="group relative px-8 py-[22px] overflow-hidden transition-colors duration-250"
          style={{
            borderRight: i < stats.length - 1 ? '1px solid var(--border)' : 'none',
          }}
        >
          {/* Top accent bar */}
          <div
            className="absolute top-0 left-0 right-0 h-[2px] origin-left scale-x-0 transition-transform duration-400 group-hover:scale-x-100"
            style={{ background: 'var(--blue)' }}
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 opacity-0 transition-opacity duration-250 group-hover:opacity-100"
            style={{ background: 'rgba(26,107,255,.03)' }}
            aria-hidden="true"
          />
          <p className="text-[2rem] font-extrabold leading-none tracking-[-0.04em]" style={{ color: 'var(--blue)' }}>
            {stat.value}
          </p>
          <p className="text-[.72rem] mt-1" style={{ color: 'var(--txt2)' }}>
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  )
}
