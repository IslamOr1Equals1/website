import type { ConsultingService } from '@/services/consulting-services.service'
import { SECTION_IDS, SERVICE_DEEP_DIVE_IDS, TRUST_SIGNALS } from '../constants'

interface ServiceNavigatorSectionProps {
  services: ConsultingService[]
}

export function ServiceNavigatorSection({ services }: ServiceNavigatorSectionProps) {
  const offensiveServices = services.slice(0, 4)
  const codeServices = services.slice(4)

  return (
    <section
      id={SECTION_IDS.navigator}
      aria-labelledby="navigator-heading"
      style={{
        background: 'var(--bg2)',
        padding: '80px 48px',
        borderTop: '1px solid var(--border)',
      }}
    >
      <div
        className="navigator-grid"
        style={{
          maxWidth: '1180px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '5fr 7fr',
          gap: '72px',
          alignItems: 'start',
        }}
      >
        {/* Left — heading + trust signals */}
        <div style={{ paddingTop: '4px' }}>
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
            Services
          </p>
          <h2
            id="navigator-heading"
            style={{
              fontSize: 'clamp(1.6rem, 2.8vw, 2.4rem)',
              fontWeight: 800,
              letterSpacing: '-0.035em',
              color: 'var(--txt)',
              lineHeight: 1.08,
              marginBottom: '18px',
            }}
          >
            Where Is Your Organisation Most Exposed?
          </h2>
          <p style={{ fontSize: '0.88rem', color: 'var(--txt2)', lineHeight: 1.75, marginBottom: '32px' }}>
            Five engagements covering the full attack surface. Select the service that maps to
            where your organisation carries the most unverified risk — from a single application
            to a complete adversary simulation.
          </p>

          <dl style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {TRUST_SIGNALS.map(({ val, label }) => (
              <div key={val} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <dt style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--blue)', minWidth: '78px' }}>
                  {val}
                </dt>
                <dd style={{ fontSize: '0.72rem', color: 'var(--txt3)', margin: 0 }}>{label}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Right — navigation list */}
        <nav aria-label="Jump to service section">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            <ServiceGroup label="Offensive Testing" services={offensiveServices} startIndex={0} />
            <ServiceGroup label="Code Security" services={codeServices} startIndex={4} />
          </div>
        </nav>
      </div>
    </section>
  )
}

function ServiceGroup({
  label,
  services,
  startIndex,
}: {
  label: string
  services: ConsultingService[]
  startIndex: number
}) {
  return (
    <div>
      <p className="nav-group-header" aria-hidden="true">
        {label}
      </p>
      <ul role="list" style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {services.map((service, i) => {
          const sectionId = SERVICE_DEEP_DIVE_IDS[startIndex + i]
          return (
            <li key={service.slug}>
              <a
                href={`#${sectionId}`}
                className="nav-pill-btn"
                aria-label={`Jump to ${service.name}`}
              >
                <span className="nav-pill-number" aria-hidden="true">
                  {service.number}
                </span>
                <span>
                  <span className="nav-pill-label">{service.name}</span>
                  <span className="nav-pill-desc">{service.navigatorDescription}</span>
                </span>
                <span className="nav-pill-arrow" aria-hidden="true">→</span>
              </a>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

