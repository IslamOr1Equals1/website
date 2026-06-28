import { Search, Radar, Crosshair, FileText, CheckCircle, RefreshCw } from 'lucide-react'
import type { MethodStep } from '@/services/methodology.service'

const ICONS: Record<string, React.ComponentType<{ size?: number; stroke?: string; strokeWidth?: number }>> = {
  search: Search,
  radar: Radar,
  crosshair: Crosshair,
  'file-text': FileText,
  'check-circle': CheckCircle,
  'refresh-cw': RefreshCw,
}

const TAG_COLORS: Record<string, string> = {
  blue: 'var(--blue)',
  amber: 'var(--amber)',
  red: 'var(--red)',
  green: 'var(--green)',
  purple: 'var(--purple)',
}

export function MethodCard({ step }: { step: MethodStep }) {
  const Icon = ICONS[step.iconName] ?? Search

  return (
    <article
      className="hover-bg2 group relative overflow-hidden transition-colors duration-250"
      style={{ background: 'var(--bg)', padding: '38px 32px' }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-[3px] origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
        style={{ background: 'linear-gradient(90deg,var(--blue),rgba(26,107,255,.15))' }}
        aria-hidden="true"
      />
      <p className="text-[.6rem] font-bold tracking-[.14em] mb-[22px]" style={{ color: 'rgba(26,107,255,.35)', fontFamily: 'var(--font-mono)' }}>
        {step.number}
      </p>
      <div
        className="w-[52px] h-[52px] rounded-[12px] grid place-items-center mb-[22px] transition-all duration-250 group-hover:scale-105 group-hover:border-[rgba(26,107,255,.38)] group-hover:bg-[rgba(26,107,255,.18)]"
        style={{ background: 'var(--blue3)', border: '1px solid var(--border2)' }}
        aria-hidden="true"
      >
        <Icon size={22} stroke="var(--blue)" strokeWidth={1.5} />
      </div>
      <h3 className="text-[1.05rem] font-bold tracking-[-0.02em] text-white mb-2.5">{step.title}</h3>
      <p className="text-[.82rem] leading-[1.75] mb-[22px]" style={{ color: 'var(--txt2)' }}>
        {step.description}
      </p>
      <div className="flex flex-col gap-[7px]">
        {step.tags.map((tag) => (
          <div key={tag.label} className="flex items-center gap-[9px] text-[.76rem] leading-[1.4]" style={{ color: 'var(--txt2)' }}>
            <span className="w-[5px] h-[5px] rounded-full flex-shrink-0" style={{ background: TAG_COLORS[tag.color] ?? 'var(--blue)' }} aria-hidden="true" />
            {tag.label}
          </div>
        ))}
      </div>
    </article>
  )
}
