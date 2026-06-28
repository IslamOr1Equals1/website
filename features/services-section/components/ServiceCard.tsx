import { Globe, Network, Cloud, Crosshair, BarChart2, Code2 } from 'lucide-react'
import type { ConsultingService } from '@/services/consulting-services.service'

const ICONS: Record<string, React.ComponentType<{ size?: number; stroke?: string; strokeWidth?: number }>> = {
  globe: Globe,
  network: Network,
  cloud: Cloud,
  crosshair: Crosshair,
  'bar-chart': BarChart2,
  code: Code2,
}

interface ServiceCardProps {
  service: ConsultingService
}

export function ServiceCard({ service }: ServiceCardProps) {
  const Icon = ICONS[service.iconName] ?? Globe

  return (
    <article
      className="hover-bg3 group relative overflow-hidden transition-colors duration-250"
      style={{ background: 'var(--bg2)', padding: '34px 30px' }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-[3px] origin-left scale-x-0 transition-transform duration-450 group-hover:scale-x-100"
        style={{ background: 'var(--blue)' }}
        aria-hidden="true"
      />
      <p className="text-[.6rem] font-bold tracking-[.14em] mb-[18px]" style={{ color: 'rgba(26,107,255,.35)', fontFamily: 'var(--font-mono)' }}>
        {service.number}
      </p>
      <div
        className="w-[42px] h-[42px] rounded-[8px] grid place-items-center mb-[18px] transition-all duration-250 group-hover:border-[rgba(26,107,255,.38)] group-hover:bg-[rgba(26,107,255,.18)]"
        style={{ background: 'var(--blue3)', border: '1px solid var(--border2)' }}
        aria-hidden="true"
      >
        <Icon size={18} stroke="var(--blue)" strokeWidth={1.5} />
      </div>
      <h3 className="text-[.98rem] font-bold tracking-[-0.02em] text-white mb-[9px]">{service.name}</h3>
      <p className="text-[.82rem] leading-[1.7] mb-5" style={{ color: 'var(--txt2)' }}>
        {service.description}
      </p>
      <ul className="flex flex-col gap-1.5 mb-[22px]" aria-label="Service scope">
        {service.scope.map((item, i) => (
          <li key={i} className="text-[.76rem] leading-[1.5] flex gap-2 items-start" style={{ color: 'var(--txt2)' }}>
            <span className="w-1 h-1 rounded-full mt-1.5 flex-shrink-0" style={{ background: 'var(--blue)' }} aria-hidden="true" />
            {item}
          </li>
        ))}
      </ul>
      <button
        className="text-[.76rem] font-semibold flex items-center gap-1.5 transition-all duration-180 bg-transparent border-0 p-0 hover:gap-2.5"
        style={{ color: 'var(--blue)' }}
        aria-label={`Book consultation for ${service.name}`}
        data-open-contact
      >
        Book a Consultation →
      </button>
    </article>
  )
}
