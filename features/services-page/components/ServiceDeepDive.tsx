import { Globe, Network, Cloud, Crosshair, Code2, Check } from 'lucide-react'
import type { ConsultingService } from '@/services/consulting-services.service'
import { KeyInsightBlock } from './KeyInsightBlock'
import { RenderVisualMoment } from './RenderVisualMoment'
import { SERVICE_DEEP_DIVE_IDS } from '../constants'

const ICON_MAP: Record<string, React.ComponentType<{ size?: number; color?: string; strokeWidth?: number }>> = {
  globe: Globe,
  network: Network,
  cloud: Cloud,
  crosshair: Crosshair,
  code: Code2,
}

interface ServiceDeepDiveProps {
  service: ConsultingService
  index: number
}

export function ServiceDeepDive({ service, index }: ServiceDeepDiveProps) {
  const sectionId = SERVICE_DEEP_DIVE_IDS[index]
  const bg = index % 2 === 0 ? 'var(--bg)' : 'var(--bg2)'
  // Last two services (red-team, code-review) invert the column order for visual rhythm
  const inverted = index >= 3
  const Icon = ICON_MAP[service.iconName] ?? Globe

  const headingId = `${sectionId}-heading`

  const content = (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <p
        style={{
          fontSize: '0.68rem',
          fontWeight: 700,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'var(--blue)',
          marginBottom: '10px',
        }}
      >
        {service.category === 'offensive' ? 'Offensive Testing' : 'Security Architecture'}
      </p>

      <h2
        id={headingId}
        // tabIndex allows StickyServiceNav to move focus here on pill click
        tabIndex={-1}
        style={{
          fontSize: 'clamp(1.4rem, 2.5vw, 2rem)',
          fontWeight: 800,
          letterSpacing: '-0.03em',
          color: 'var(--txt)',
          lineHeight: 1.1,
          marginBottom: '14px',
          outline: 'none',
        }}
      >
        {service.name}
      </h2>

      <KeyInsightBlock text={service.keyInsight} slug={service.slug} />

      <div style={{ marginBottom: '24px' }}>
        {service.businessRisk.map((para, i) => (
          <p
            key={i}
            style={{
              fontSize: '0.87rem',
              lineHeight: 1.78,
              color: 'var(--txt2)',
              marginBottom: i < service.businessRisk.length - 1 ? '10px' : 0,
            }}
          >
            {para}
          </p>
        ))}
      </div>

      <RenderVisualMoment vm={service.visualMoment} />

      <div
        aria-hidden="true"
        style={{ height: '1px', background: 'rgba(255,255,255,0.06)', marginBottom: '24px' }}
      />

      <h3
        style={{
          fontSize: '0.7rem',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          color: 'rgba(139,168,196,0.5)',
          marginBottom: '10px',
        }}
      >
        {service.scopeLabel}
      </h3>
      <ul
        aria-label={service.scopeLabel}
        style={{
          listStyle: 'none',
          padding: 0,
          margin: '0 0 22px',
          display: 'flex',
          flexDirection: 'column',
          gap: '7px',
        }}
      >
        {service.scope.map((item) => (
          <li
            key={item}
            style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.8rem', lineHeight: 1.6, color: 'var(--txt2)' }}
          >
            <span
              aria-hidden="true"
              style={{
                width: '4px',
                height: '4px',
                borderRadius: '50%',
                background: 'var(--blue)',
                flexShrink: 0,
                marginTop: '7px',
                opacity: 0.7,
              }}
            />
            {item}
          </li>
        ))}
      </ul>

      {service.closingLine && (
        <p
          style={{
            fontSize: '0.83rem',
            fontStyle: 'italic',
            color: 'rgba(255,255,255,0.55)',
            lineHeight: 1.65,
            marginBottom: '20px',
            letterSpacing: '-0.005em',
          }}
        >
          {service.closingLine}
        </p>
      )}

      <a
        href="/#cta"
        data-open-contact
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '4px',
          fontSize: '0.82rem',
          fontWeight: 600,
          color: 'var(--blue)',
          textDecoration: 'none',
        }}
        aria-label={`Discuss the ${service.name} engagement`}
      >
        Discuss this engagement →
      </a>
    </div>
  )

  const panel = (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '16px' }}>
      {/* Card 1 — Engagement logistics + deliverables */}
      <div
        style={{
          background: 'var(--card)',
          border: '1px solid var(--border)',
          borderRadius: '10px',
          padding: '24px',
        }}
      >
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
          <Icon size={20} color="var(--blue)" strokeWidth={1.5} />
        </div>

        <p
          style={{
            fontSize: '0.68rem',
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--txt3)',
            marginBottom: '12px',
          }}
        >
          Typical Engagement
        </p>

        <dl style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
          {(
            [
              ['Duration', service.typicalDuration],
              ['Output', service.typicalOutput],
            ] as const
          ).map(([label, val]) => (
            <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <dt style={{ fontSize: '0.65rem', color: 'var(--txt3)', fontWeight: 600 }}>{label}</dt>
              <dd style={{ fontSize: '0.82rem', color: 'var(--txt)', fontWeight: 500, margin: 0 }}>{val}</dd>
            </div>
          ))}
        </dl>

        <div style={{ borderTop: '1px solid var(--border)', paddingTop: '16px' }}>
          <p
            style={{
              fontSize: '0.65rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: 'var(--txt3)',
              marginBottom: '10px',
            }}
          >
            What you receive
          </p>
          <ul
            aria-label="Deliverables"
            style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '7px' }}
          >
            {service.deliverables.map((item) => (
              <li
                key={item}
                style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.76rem', lineHeight: 1.55, color: 'var(--txt2)' }}
              >
                <Check size={11} color="var(--blue)" aria-hidden="true" style={{ flexShrink: 0, marginTop: '2px', opacity: 0.75 }} />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Card 2 — Questions this resolves */}
      {service.executiveQuestions.length > 0 && (
        <div
          style={{
            background: 'var(--card)',
            border: '1px solid var(--border)',
            borderRadius: '10px',
            padding: '24px',
          }}
        >
          <p
            style={{
              fontSize: '0.68rem',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--txt3)',
              marginBottom: '16px',
            }}
          >
            Questions This Resolves
          </p>
          <ul
            style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}
            aria-label="Questions this engagement resolves"
          >
            {service.executiveQuestions.map((q) => (
              <li key={q} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <span
                  aria-hidden="true"
                  style={{
                    fontSize: '0.62rem',
                    fontWeight: 700,
                    color: 'var(--blue)',
                    flexShrink: 0,
                    marginTop: '1px',
                    fontFamily: 'var(--font-mono)',
                    opacity: 0.7,
                  }}
                >
                  ?
                </span>
                <p style={{ fontSize: '0.76rem', lineHeight: 1.6, color: 'var(--txt2)', margin: 0 }}>{q}</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Card 3 — Selected outcomes */}
      {service.outcomes.length > 0 && (
        <div
          style={{
            background: 'var(--card)',
            border: '1px solid var(--border)',
            borderRadius: '10px',
            padding: '24px',
          }}
        >
          <p
            style={{
              fontSize: '0.68rem',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--txt3)',
              marginBottom: '14px',
            }}
          >
            Selected Outcomes
          </p>
          <ul
            style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}
            aria-label="Selected engagement outcomes"
          >
            {service.outcomes.map((outcome) => (
              <li key={outcome.label} style={{ borderLeft: '2px solid var(--blue)', paddingLeft: '12px' }}>
                <p style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--txt)', marginBottom: '3px' }}>
                  {outcome.label}
                </p>
                <p style={{ fontSize: '0.72rem', color: 'var(--txt2)', lineHeight: 1.55 }}>{outcome.context}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )

  return (
    <section
      id={sectionId}
      aria-labelledby={headingId}
      style={{
        background: bg,
        padding: '90px 48px',
        borderTop: '1px solid var(--border)',
        scrollMarginTop: 'calc(var(--navbar-height) + var(--sticky-nav-height))',
      }}
    >
      <div
        className={`deep-dive-grid${inverted ? ' deep-dive-inverted' : ''}`}
        style={{
          maxWidth: '1180px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '60fr 40fr',
          gap: '64px',
          alignItems: 'start',
        }}
      >
        {inverted ? (
          <>
            {panel}
            {content}
          </>
        ) : (
          <>
            {content}
            {panel}
          </>
        )}
      </div>
    </section>
  )
}
