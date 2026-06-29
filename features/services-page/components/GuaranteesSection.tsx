import { Check } from 'lucide-react'
import { SECTION_IDS } from '../constants'

interface Guarantee {
  title: string
  desc: string
}

const GUARANTEES: Guarantee[] = [
  {
    title: 'Fixed-Fee Engagement',
    desc: 'Your price is agreed before testing begins. There are no hourly overruns, no scope-creep invoices, and no surprises on the final invoice.',
  },
  {
    title: 'NDA Before Scoping',
    desc: 'Confidentiality is in place before any technical or commercial details are discussed. Available and signed at the scoping stage, not after.',
  },
  {
    title: 'Complimentary Re-test',
    desc: 'All critical and high-severity findings are re-tested at no additional cost once remediation is complete. The engagement is not closed until findings are verified.',
  },
  {
    title: '24-Hour Response',
    desc: 'Enquiries acknowledged within 24 business hours. Active engagements receive daily written status updates and same-day responses to urgent questions.',
  },
  {
    title: 'Manual Finding Verification',
    desc: 'Every finding in your report has been manually confirmed. No unverified scanner output reaches your team.',
  },
  {
    title: 'Direct Communication',
    desc: 'You communicate directly with the consultant performing your engagement — not an account manager, not a coordinator.',
  },
]

export function GuaranteesSection() {
  return (
    <section
      id={SECTION_IDS.guarantees}
      aria-labelledby="guarantees-heading"
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
          Every Engagement
        </p>

        <h2
          id="guarantees-heading"
          style={{
            fontSize: 'clamp(1.55rem, 2.8vw, 2.3rem)',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            color: 'var(--txt)',
            lineHeight: 1.1,
            marginBottom: '12px',
          }}
        >
          Engagement Guarantees
        </h2>

        <p style={{ fontSize: '0.9rem', lineHeight: 1.75, color: 'var(--txt2)', maxWidth: '580px', marginBottom: '44px' }}>
          These are not aspirational standards — they are structural commitments built into every
          engagement from the proposal stage.
        </p>

        {/* Gap-trick grid: border is the gap background visible between cells */}
        <ul
          role="list"
          aria-label="Engagement guarantees"
          className="guarantees-grid"
          style={{
            listStyle: 'none',
            padding: 0,
            margin: 0,
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1px',
            background: 'var(--border)',
          }}
        >
          {GUARANTEES.map((g) => (
            <li key={g.title} style={{ background: 'var(--bg2)', padding: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                <Check size={15} color="var(--blue)" aria-hidden="true" />
                <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--txt)', margin: 0 }}>
                  {g.title}
                </h3>
              </div>
              <p style={{ fontSize: '0.78rem', lineHeight: 1.65, color: 'var(--txt2)' }}>{g.desc}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
