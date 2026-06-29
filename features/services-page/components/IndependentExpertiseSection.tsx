import { Target, Shield, FileText } from 'lucide-react'
import { SECTION_IDS } from '../constants'

interface ComparisonRow {
  dimension: string
  firm: string
  islam: string
}

interface Differentiator {
  Icon: React.ComponentType<{ size?: number; color?: string; strokeWidth?: number }>
  title: string
  desc: string
}

const COMPARISON_ROWS: ComparisonRow[] = [
  {
    dimension: 'Accountability',
    firm: 'Distributed across team and management',
    islam: 'Single named consultant responsible for every finding',
  },
  {
    dimension: 'Consistency',
    firm: 'Senior consultants sell; junior analysts deliver',
    islam: 'The consultant you speak to is the consultant who tests',
  },
  {
    dimension: 'Speed',
    firm: 'Procurement, scheduling, and onboarding overhead',
    islam: 'Proposal within 24 hours; testing begins within 5–10 days',
  },
  {
    dimension: 'Communication',
    firm: 'Account managers and project coordinators',
    islam: 'Direct communication throughout — no intermediaries',
  },
  {
    dimension: 'Flexibility',
    firm: 'Fixed service packages and standard templates',
    islam: 'Scope tailored to your environment, risk profile, and timeline',
  },
  {
    dimension: 'Report quality',
    firm: 'Standardised templates with varying execution',
    islam: 'Reports written specifically for your organisation and audience',
  },
]

const DIFFERENTIATORS: Differentiator[] = [
  {
    Icon: Target,
    title: 'Deep Technical Expertise',
    desc: 'Every finding is the result of adversarial thinking — not scanner interpretation.',
  },
  {
    Icon: Shield,
    title: 'Long-Term Partnership',
    desc: 'The engagement does not end at the report. I remain available throughout remediation and for future engagements.',
  },
  {
    Icon: FileText,
    title: 'Executive Communication',
    desc: 'Findings are translated into business language. Your board will understand the risk. Your engineers will know what to fix.',
  },
]

export function IndependentExpertiseSection() {
  return (
    <section
      id={SECTION_IDS.independent}
      aria-labelledby="independent-heading"
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
          The Difference
        </p>

        <h2
          id="independent-heading"
          style={{
            fontSize: 'clamp(1.55rem, 2.8vw, 2.3rem)',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            color: 'var(--txt)',
            lineHeight: 1.1,
            marginBottom: '12px',
          }}
        >
          Why Independent Expertise Outperforms Scale
        </h2>

        <p style={{ fontSize: '0.9rem', lineHeight: 1.75, color: 'var(--txt2)', maxWidth: '580px', marginBottom: '40px' }}>
          A large firm brings brand recognition and headcount. An independent engagement brings
          direct accountability, consistent quality, and a consultant who has personal stake in
          the outcome of your assessment.
        </p>

        {/* Comparison table */}
        <div style={{ overflowX: 'auto', marginBottom: '40px' }}>
          <table
            style={{ width: '100%', borderCollapse: 'collapse', minWidth: '560px' }}
            aria-label="Comparison: large security firm vs. working with Islam Ahmed"
          >
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                <th
                  scope="col"
                  style={{
                    textAlign: 'left',
                    padding: '10px 16px',
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    color: 'var(--txt3)',
                    width: '22%',
                  }}
                >
                  Dimension
                </th>
                <th
                  scope="col"
                  style={{
                    textAlign: 'left',
                    padding: '10px 16px',
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    color: 'var(--txt3)',
                    width: '39%',
                  }}
                >
                  Large Security Firm
                </th>
                <th
                  scope="col"
                  style={{
                    textAlign: 'left',
                    padding: '10px 16px',
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    color: 'var(--blue)',
                    width: '39%',
                  }}
                >
                  Working with Islam Ahmed
                </th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON_ROWS.map((row, i) => (
                <tr
                  key={row.dimension}
                  style={{
                    borderBottom: '1px solid var(--border)',
                    background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.015)',
                  }}
                >
                  <th
                    scope="row"
                    style={{
                      textAlign: 'left',
                      padding: '12px 16px',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      color: 'var(--txt)',
                    }}
                  >
                    {row.dimension}
                  </th>
                  <td style={{ padding: '12px 16px', fontSize: '0.78rem', color: 'var(--txt2)', lineHeight: 1.55 }}>
                    {row.firm}
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: '0.78rem', color: 'var(--txt)', lineHeight: 1.55, fontWeight: 500 }}>
                    {row.islam}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 3 differentiator callouts */}
        <ul
          role="list"
          aria-label="Key differentiators"
          className="differentiator-grid"
          style={{ listStyle: 'none', padding: 0, margin: '0 0 28px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}
        >
          {DIFFERENTIATORS.map(({ Icon, title, desc }) => (
            <li
              key={title}
              style={{
                background: 'var(--bg)',
                border: '1px solid var(--border)',
                borderRadius: '10px',
                padding: '24px',
              }}
            >
              <div
                aria-hidden="true"
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '7px',
                  display: 'grid',
                  placeItems: 'center',
                  background: 'var(--blue3)',
                  border: '1px solid var(--border2)',
                  marginBottom: '14px',
                }}
              >
                <Icon size={16} color="var(--blue)" strokeWidth={1.6} />
              </div>
              <h3 style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--txt)', marginBottom: '6px' }}>
                {title}
              </h3>
              <p style={{ fontSize: '0.78rem', lineHeight: 1.65, color: 'var(--txt2)' }}>{desc}</p>
            </li>
          ))}
        </ul>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <a
            href="/#cta"
            data-open-contact
            style={{
              fontSize: '0.82rem',
              fontWeight: 600,
              color: 'var(--blue)',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            Discuss your engagement →
          </a>
          <span style={{ fontSize: '0.72rem', color: 'var(--txt3)' }}>Fixed-fee pricing. NDA before scoping.</span>
        </div>
      </div>
    </section>
  )
}
