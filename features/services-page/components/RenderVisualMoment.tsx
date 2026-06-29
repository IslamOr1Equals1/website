import { Fragment } from 'react'
import type { VisualMoment } from '@/services/consulting-services.service'

export function RenderVisualMoment({ vm }: { vm: VisualMoment }) {
  switch (vm.type) {
    case 'stat-contrast':
      return (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            marginBottom: '28px',
            borderRadius: '8px',
            overflow: 'hidden',
            border: '1px solid var(--border)',
          }}
        >
          {vm.pairs.map((pair, i) => (
            <div
              key={pair.label}
              style={{
                padding: '18px 20px',
                background: i === 1 ? 'rgba(26,107,255,0.07)' : 'rgba(255,255,255,0.02)',
                borderLeft: i === 1 ? '1px solid var(--border)' : undefined,
              }}
            >
              <p
                style={{
                  fontSize: '2rem',
                  fontWeight: 800,
                  color: i === 1 ? 'var(--blue)' : 'rgba(139,168,196,0.4)',
                  letterSpacing: '-0.04em',
                  lineHeight: 1,
                  marginBottom: '6px',
                }}
              >
                {pair.value}
              </p>
              <p style={{ fontSize: '0.68rem', color: 'var(--txt3)', lineHeight: 1.45, margin: 0 }}>
                {pair.label}
              </p>
            </div>
          ))}
        </div>
      )

    case 'attack-chain':
      return (
        <div
          style={{ display: 'flex', alignItems: 'center', gap: 0, marginBottom: '28px', flexWrap: 'wrap', rowGap: '8px' }}
        >
          {vm.steps.map((step, i) => (
            <Fragment key={step}>
              <div
                style={{
                  padding: '8px 12px',
                  background: i === vm.steps.length - 1 ? 'rgba(26,107,255,0.1)' : 'rgba(255,255,255,0.03)',
                  border: `1px solid ${i === vm.steps.length - 1 ? 'rgba(26,107,255,0.3)' : 'var(--border)'}`,
                  borderRadius: '6px',
                }}
              >
                <span
                  style={{
                    fontSize: '0.68rem',
                    fontFamily: 'var(--font-mono)',
                    color: i === vm.steps.length - 1 ? 'var(--blue)' : 'var(--txt2)',
                    fontWeight: 600,
                    whiteSpace: 'nowrap',
                  }}
                >
                  {step}
                </span>
              </div>
              {i < vm.steps.length - 1 && (
                <span
                  aria-hidden="true"
                  style={{ fontSize: '0.75rem', color: 'var(--txt3)', padding: '0 6px', flexShrink: 0 }}
                >
                  →
                </span>
              )}
            </Fragment>
          ))}
        </div>
      )

    case 'metric-callout':
      return (
        <div
          style={{
            padding: '20px 22px',
            background: 'rgba(26,107,255,0.05)',
            border: '1px solid rgba(26,107,255,0.16)',
            borderRadius: '8px',
            marginBottom: '28px',
          }}
        >
          <p
            style={{
              fontSize: '2rem',
              fontWeight: 800,
              color: 'var(--blue)',
              letterSpacing: '-0.04em',
              lineHeight: 1,
              marginBottom: '4px',
            }}
          >
            {vm.value}
          </p>
          <p
            style={{
              fontSize: '0.72rem',
              fontWeight: 600,
              color: 'var(--txt3)',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              marginBottom: '10px',
            }}
          >
            {vm.label}
          </p>
          <p style={{ fontSize: '0.76rem', color: 'var(--txt2)', lineHeight: 1.65, margin: 0 }}>
            {vm.context}
          </p>
        </div>
      )

    case 'day-timeline':
      return (
        <div
          style={{
            padding: '18px 20px',
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid var(--border)',
            borderRadius: '8px',
            marginBottom: '28px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start' }}>
            {vm.entries.map((entry, i) => (
              <div key={entry.day} style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                  <div
                    aria-hidden="true"
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      flexShrink: 0,
                      background: entry.critical ? 'var(--blue)' : 'rgba(139,168,196,0.35)',
                      boxShadow: entry.critical ? '0 0 8px rgba(26,107,255,0.5)' : undefined,
                    }}
                  />
                  {i < vm.entries.length - 1 && (
                    <div
                      aria-hidden="true"
                      style={{ flex: 1, height: '1px', background: 'var(--border)' }}
                    />
                  )}
                </div>
                <p
                  style={{
                    fontSize: '0.6rem',
                    fontWeight: 700,
                    color: 'var(--blue)',
                    letterSpacing: '0.08em',
                    marginBottom: '4px',
                    textTransform: 'uppercase',
                  }}
                >
                  {entry.day}
                </p>
                <p style={{ fontSize: '0.7rem', color: 'var(--txt3)', lineHeight: 1.5, paddingRight: '12px', margin: 0 }}>
                  {entry.event}
                </p>
              </div>
            ))}
          </div>
        </div>
      )

    case 'code-block':
      return (
        <figure
          style={{
            padding: '16px 18px',
            background: 'rgba(0,0,0,0.35)',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: '6px',
            marginBottom: '28px',
            fontFamily: 'var(--font-mono)',
          }}
        >
          {vm.lines.map((line, i) => (
            <p
              key={i}
              style={{
                fontSize: '0.75rem',
                color: line.startsWith('//') ? 'rgba(139,168,196,0.45)' : 'rgba(255,255,255,0.72)',
                margin: '0 0 2px',
                lineHeight: 1.65,
                minHeight: line === '' ? '0.5em' : undefined,
              }}
              aria-hidden={line === '' ? 'true' : undefined}
            >
              {line || ' '}
            </p>
          ))}
          <figcaption
            style={{
              fontSize: '0.62rem',
              color: 'var(--txt3)',
              marginTop: '10px',
              fontFamily: 'var(--font-inter)',
              fontStyle: 'italic',
            }}
          >
            {vm.caption}
          </figcaption>
        </figure>
      )
  }
}
