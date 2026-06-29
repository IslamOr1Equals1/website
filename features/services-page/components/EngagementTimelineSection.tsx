import type { EngagementPhase } from '@/services/engagement-timeline.service'
import { SECTION_IDS } from '../constants'

interface EngagementTimelineSectionProps {
  phases: EngagementPhase[]
}

export function EngagementTimelineSection({ phases }: EngagementTimelineSectionProps) {
  return (
    <section
      id={SECTION_IDS.timeline}
      aria-labelledby="timeline-heading"
      style={{ background: 'var(--bg2)', padding: '90px 48px', borderTop: '1px solid var(--border)' }}
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
          Engagement Structure
        </p>

        <h2
          id="timeline-heading"
          style={{
            fontSize: 'clamp(1.55rem, 2.8vw, 2.3rem)',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            color: 'var(--txt)',
            lineHeight: 1.1,
            marginBottom: '12px',
          }}
        >
          A Transparent Process. No Surprises.
        </h2>

        <p style={{ fontSize: '0.9rem', color: 'var(--txt2)', marginBottom: '44px', lineHeight: 1.7, maxWidth: '560px' }}>
          Every engagement begins with a complimentary scoping call before any proposal or
          commercial agreement is in place.
        </p>

        {/* Wrapper provides the positioning context for the vertical connector line */}
        <div style={{ position: 'relative' }}>
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              left: '24px',
              top: '24px',
              bottom: '24px',
              width: '1px',
              background: 'linear-gradient(180deg, var(--blue) 0%, rgba(26,107,255,0.08) 100%)',
            }}
          />
          <ol
            aria-label="Engagement phases"
            style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column' }}
          >
          {phases.map((phase, i) => (
            <li
              key={phase.number}
              style={{
                display: 'flex',
                gap: '28px',
                alignItems: 'flex-start',
                paddingBottom: i < phases.length - 1 ? '28px' : 0,
              }}
            >
              {/* Step indicator */}
              <div
                aria-hidden="true"
                style={{
                  flexShrink: 0,
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  background: 'var(--bg)',
                  border: '1px solid var(--border2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                <span
                  style={{
                    fontSize: '0.6rem',
                    fontWeight: 700,
                    color: 'var(--blue)',
                    fontFamily: 'var(--font-mono)',
                    letterSpacing: '0.1em',
                  }}
                >
                  {phase.number}
                </span>
              </div>

              {/* Content */}
              <div
                style={{
                  flex: 1,
                  background: 'var(--bg)',
                  border: '1px solid var(--border)',
                  borderRadius: '10px',
                  padding: '20px 24px',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    gap: '16px',
                    flexWrap: 'wrap',
                    marginBottom: '8px',
                  }}
                >
                  <h3 style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--txt)', margin: 0 }}>
                    {phase.title}
                  </h3>
                  <span
                    style={{ fontSize: '0.72rem', color: 'var(--txt3)', fontFamily: 'var(--font-mono)', flexShrink: 0 }}
                  >
                    {phase.duration}
                  </span>
                </div>
                <dl className="phase-dl" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 24px' }}>
                  <div>
                    <dt
                      style={{
                        fontSize: '0.65rem',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                        color: 'var(--txt3)',
                        marginBottom: '3px',
                      }}
                    >
                      Client involvement
                    </dt>
                    <dd style={{ fontSize: '0.78rem', color: 'var(--txt2)', margin: 0 }}>{phase.involvement}</dd>
                  </div>
                  <div>
                    <dt
                      style={{
                        fontSize: '0.65rem',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                        color: 'var(--txt3)',
                        marginBottom: '3px',
                      }}
                    >
                      Deliverable
                    </dt>
                    <dd style={{ fontSize: '0.78rem', color: 'var(--txt2)', margin: 0 }}>{phase.deliverable}</dd>
                  </div>
                </dl>
              </div>
            </li>
          ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
