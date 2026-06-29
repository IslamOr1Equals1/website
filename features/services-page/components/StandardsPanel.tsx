import { CheckCircle2, XCircle } from 'lucide-react'
import { SECTION_IDS } from '../constants'

const EXCLUSIONS = [
  'Compliance checkbox assessments designed to produce a certificate rather than identify real risk',
  'Automated scanner output reformatted as a penetration test report',
  'Generic PDF reports with no prioritisation, no business context, and no clear next steps',
  'Engagements where a senior consultant sells the project and a junior analyst performs the testing',
  'Findings delivered without remediation guidance',
] as const

const INCLUSIONS = [
  'Manual verification of every finding before it reaches your report',
  'Findings evaluated against your business model and risk tolerance',
  'Two reports — one for leadership, one for engineering',
  'Specific, prioritised remediation guidance your team can implement',
  'Direct communication with the consultant performing the work',
] as const

export function StandardsPanel() {
  return (
    <section
      id={SECTION_IDS.standards}
      aria-labelledby="standards-heading"
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
          Engagement Standards
        </p>

        <h2
          id="standards-heading"
          style={{
            fontSize: 'clamp(1.55rem, 2.8vw, 2.3rem)',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            color: 'var(--txt)',
            lineHeight: 1.1,
            marginBottom: '12px',
          }}
        >
          What You Can Expect — and What I Won&apos;t Offer
        </h2>

        <p style={{ fontSize: '0.9rem', lineHeight: 1.75, color: 'var(--txt2)', maxWidth: '580px', marginBottom: '44px' }}>
          The clearest signal of quality is being explicit about what an engagement is not.
        </p>

        <div className="standards-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          {/* Not provided */}
          <div
            style={{
              background: 'var(--card)',
              border: '1px solid var(--border)',
              borderRadius: '10px',
              padding: '28px',
            }}
          >
            <p
              style={{
                fontSize: '0.68rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                color: 'var(--txt3)',
                marginBottom: '18px',
              }}
            >
              This is not what I provide
            </p>
            <ul
              aria-label="What is not included"
              style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}
            >
              {EXCLUSIONS.map((item) => (
                <li
                  key={item}
                  style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.82rem', lineHeight: 1.6, color: 'var(--txt2)' }}
                >
                  <XCircle size={14} color="var(--txt3)" aria-hidden="true" style={{ flexShrink: 0, marginTop: '3px' }} />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Included */}
          <div
            style={{
              background: 'rgba(26,107,255,0.04)',
              border: '1px solid var(--border2)',
              borderRadius: '10px',
              padding: '28px',
            }}
          >
            <p
              style={{
                fontSize: '0.68rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                color: 'var(--blue)',
                marginBottom: '18px',
              }}
            >
              This is what every engagement includes
            </p>
            <ul
              aria-label="What every engagement includes"
              style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}
            >
              {INCLUSIONS.map((item) => (
                <li
                  key={item}
                  style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.82rem', lineHeight: 1.6, color: 'var(--txt2)' }}
                >
                  <CheckCircle2 size={14} color="var(--blue)" aria-hidden="true" style={{ flexShrink: 0, marginTop: '3px' }} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
