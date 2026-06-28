import { Shield, Target, Lock } from 'lucide-react'
import type { WhyHireMeCard } from '@/services/why-hire-me.service'

const ICONS: Record<string, React.ComponentType<{ size?: number; stroke?: string; strokeWidth?: number }>> = {
  target: Target,
  shield: Shield,
  lock: Lock,
}

interface WhyCardProps {
  card: WhyHireMeCard
}

export function WhyCard({ card }: WhyCardProps) {
  const Icon = ICONS[card.iconName] ?? Shield

  return (
    <article
      className="hover-bg3 group relative overflow-hidden transition-colors duration-250"
      style={{ background: 'var(--bg2)', padding: '36px 32px' }}
    >
      {/* Top accent bar */}
      <div
        className="absolute top-0 left-0 right-0 h-[3px] origin-left scale-x-0 transition-transform duration-450 group-hover:scale-x-100"
        style={{ background: 'linear-gradient(90deg,var(--blue),rgba(26,107,255,.2))' }}
        aria-hidden="true"
      />
      <p className="text-[.6rem] font-bold tracking-[.14em] mb-5" style={{ color: 'rgba(26,107,255,.4)', fontFamily: 'var(--font-mono)' }}>
        {card.number}
      </p>
      <div
        className="w-[46px] h-[46px] rounded-[10px] grid place-items-center mb-5 transition-all duration-250 group-hover:border-[rgba(26,107,255,.35)] group-hover:bg-[rgba(26,107,255,.18)]"
        style={{ background: 'var(--blue3)', border: '1px solid var(--border2)' }}
        aria-hidden="true"
      >
        <Icon size={20} stroke="var(--blue)" strokeWidth={1.6} />
      </div>
      <h3 className="text-[1.05rem] font-bold tracking-[-0.02em] text-white mb-2.5">{card.title}</h3>
      <p className="text-[.84rem] leading-[1.75] mb-5" style={{ color: 'var(--txt2)' }}>
        {card.description}
      </p>
      <ul className="flex flex-col gap-2" aria-label={`${card.title} features`}>
        {card.bullets.map((bullet, i) => (
          <li key={i} className="text-[.78rem] leading-[1.5] flex gap-2 items-start" style={{ color: 'var(--txt2)' }}>
            <span className="w-1 h-1 rounded-full mt-[7px] flex-shrink-0" style={{ background: 'var(--blue)' }} aria-hidden="true" />
            {bullet}
          </li>
        ))}
      </ul>
    </article>
  )
}
