import { CreditCard, Layers, Heart, Building2 } from 'lucide-react'
import type { IndustryExpertiseItem } from '@/services/industry-expertise.service'
import { SECTION_IDS } from '../constants'

const ICON_MAP: Record<string, React.ComponentType<{ size?: number; color?: string; strokeWidth?: number }>> = {
  'credit-card': CreditCard,
  layers: Layers,
  heart: Heart,
  'building-2': Building2,
}

interface IndustryExpertiseSectionProps {
  items: IndustryExpertiseItem[]
}

export function IndustryExpertiseSection({ items }: IndustryExpertiseSectionProps) {
  return (
    <section
      id={SECTION_IDS.industry}
      aria-labelledby="industry-heading"
      style={{ background: 'var(--bg)', padding: '90px 48px', borderTop: '1px solid var(--border)' }}
    >
      <div style={{ maxWidth: '1180px', margin: '0 auto' }}>
        <p
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '0.68rem',
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--blue)',
            marginBottom: '10px',
          }}
        >
          <span aria-hidden="true" style={{ width: '16px', height: '1px', background: 'var(--blue)' }} />
          Industry Experience
        </p>

        <h2
          id="industry-heading"
          style={{
            fontSize: 'clamp(1.55rem, 2.8vw, 2.3rem)',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            color: 'var(--txt)',
            lineHeight: 1.1,
            marginBottom: '12px',
          }}
        >
          Built Around Your Industry&apos;s Threat Landscape
        </h2>

        <p style={{ fontSize: '0.9rem', lineHeight: 1.75, color: 'var(--txt2)', maxWidth: '580px', marginBottom: '44px' }}>
          The attack surface facing a fintech platform differs from a healthcare provider or
          enterprise SaaS company. My methodology adapts to your regulatory environment, business
          model, and threat actors.
        </p>

        <ul
          role="list"
          aria-label="Industries served"
          className="industry-grid"
          style={{
            listStyle: 'none',
            padding: 0,
            margin: 0,
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '1px',
            background: 'var(--border)',
          }}
        >
          {items.map((item) => {
            const Icon = ICON_MAP[item.iconName] ?? Building2
            return (
              <li key={item.id} style={{ background: 'var(--bg2)', padding: '30px 26px' }}>
                <div
                  aria-hidden="true"
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '8px',
                    display: 'grid',
                    placeItems: 'center',
                    background: 'var(--blue3)',
                    border: '1px solid var(--border2)',
                    marginBottom: '16px',
                  }}
                >
                  <Icon size={18} color="var(--blue)" strokeWidth={1.5} />
                </div>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--txt)', marginBottom: '8px' }}>
                  {item.name}
                </h3>
                <p style={{ fontSize: '0.78rem', lineHeight: 1.65, color: 'var(--txt2)', marginBottom: '14px' }}>
                  {item.context}
                </p>
                <ul aria-label={`${item.name} threat vectors`} style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '5px' }}>
                  {item.threats.map((threat) => (
                    <li key={threat} style={{ fontSize: '0.68rem', fontWeight: 600, color: 'var(--txt3)', letterSpacing: '0.02em' }}>
                      · {threat}
                    </li>
                  ))}
                </ul>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
