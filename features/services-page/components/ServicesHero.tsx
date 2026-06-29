import { ContactButton } from './ContactButton'

export function ServicesHero() {
  return (
    <section
      id="services-hero"
      aria-labelledby="services-hero-heading"
      style={{
        background:
          'radial-gradient(ellipse 80% 50% at 50% -10%, rgba(26,107,255,0.12) 0%, transparent 70%), var(--bg)',
        padding: '120px 48px 100px',
        textAlign: 'center',
      }}
    >
      <div style={{ maxWidth: '680px', margin: '0 auto' }}>
        {/* Availability badge */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '28px',
            padding: '6px 14px',
            borderRadius: '20px',
            border: '1px solid rgba(0,214,122,0.25)',
            background: 'rgba(0,214,122,0.06)',
          }}
          aria-label="Currently available for new engagements"
        >
          <span
            aria-hidden="true"
            style={{
              width: '7px',
              height: '7px',
              borderRadius: '50%',
              background: 'var(--green)',
              animation: 'pulse-dot 2s infinite',
            }}
          />
          <span style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--green)', letterSpacing: '0.04em' }}>
            Available for engagements
          </span>
        </div>

        <h1
          id="services-hero-heading"
          style={{
            fontSize: 'clamp(2.1rem, 4vw, 3.2rem)',
            fontWeight: 800,
            letterSpacing: '-0.04em',
            lineHeight: 1.08,
            color: 'var(--txt)',
            marginBottom: '20px',
          }}
        >
          Know Your Real Attack Surface —{' '}
          <span style={{ color: 'var(--blue)' }}>Before Someone Else Does.</span>
        </h1>

        <p style={{ fontSize: '1rem', lineHeight: 1.75, color: 'var(--txt2)', marginBottom: '14px' }}>
          Penetration testing and security advisory built for decision-makers who need accurate
          findings, executive-ready reporting, and a consultant who is accountable from the first
          call to the final re-test.
        </p>

        <p style={{ fontSize: '0.78rem', color: 'var(--txt3)', marginBottom: '32px', letterSpacing: '0.02em' }}>
          Fixed-fee &nbsp;·&nbsp; NDA before scoping &nbsp;·&nbsp; Complimentary re-test included
        </p>

        <ContactButton label="Book a Free Consultation" />

        <div
          role="list"
          aria-label="Engagement guarantees"
          style={{ display: 'flex', justifyContent: 'center', gap: '40px', marginTop: '48px', flexWrap: 'wrap' }}
        >
          {HERO_STATS.map((stat) => (
            <div key={stat.val} role="listitem" style={{ textAlign: 'center' }}>
              <p
                style={{
                  fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)',
                  fontWeight: 800,
                  color: 'var(--txt)',
                  letterSpacing: '-0.03em',
                }}
              >
                {stat.val}
              </p>
              <p style={{ fontSize: '0.72rem', color: 'var(--txt3)', marginTop: '4px', maxWidth: '140px' }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const HERO_STATS = [
  { val: '100%', label: 'Engagements include a complimentary re-test' },
  { val: 'Every', label: 'Finding manually verified before delivery' },
  { val: '24h', label: 'Response time on all enquiries' },
] as const
