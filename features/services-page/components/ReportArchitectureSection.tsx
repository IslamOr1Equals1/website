import { Check } from 'lucide-react'

interface ReportRow {
  section: string
  audience: string
  purpose: string
}

const REPORT_ROWS: ReportRow[] = [
  {
    section: 'Executive Summary',
    audience: 'CEO, Board',
    purpose:
      'Business risk in plain language. The finding that matters most to your organisation, explained without jargon.',
  },
  {
    section: 'Risk Overview',
    audience: 'CISO, CTO',
    purpose: 'Severity distribution — critical, high, medium, low — at a glance.',
  },
  {
    section: 'Attack Narrative',
    audience: 'CTO, Security Team',
    purpose:
      'How an attacker would reach a critical asset from first access. The story of the engagement.',
  },
  {
    section: 'Business Impact Assessment',
    audience: 'CEO, CFO',
    purpose: 'Financial, operational, and reputational risk per finding.',
  },
  {
    section: 'Technical Findings',
    audience: 'Engineering Team',
    purpose: 'Detailed evidence, reproduction steps, and references per finding.',
  },
  {
    section: 'Remediation Roadmap',
    audience: 'CTO, Engineering Lead',
    purpose: 'Specific, sequenced fix guidance. Not theoretical — implementable.',
  },
  {
    section: 'Re-test Summary',
    audience: 'CISO, CTO',
    purpose:
      'Confirmation that critical and high findings were remediated before the engagement closes.',
  },
]

export function ReportArchitectureSection() {
  return (
    <section
      id="report-architecture"
      aria-labelledby="report-heading"
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
          Deliverables
        </p>

        <h2
          id="report-heading"
          style={{
            fontSize: 'clamp(1.55rem, 2.8vw, 2.3rem)',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            color: 'var(--txt)',
            lineHeight: 1.1,
            marginBottom: '12px',
          }}
        >
          What You Receive at the End of Every Engagement
        </h2>

        <p style={{ fontSize: '0.9rem', lineHeight: 1.75, color: 'var(--txt2)', maxWidth: '580px', marginBottom: '44px' }}>
          Every engagement produces two outputs: an Executive Report written for decision-makers,
          and a Technical Report written for your engineering team. Both are delivered alongside a
          debrief call, followed by a 30-day remediation support window and a complimentary re-test.
        </p>

        <div style={{ overflowX: 'auto' }}>
          <table
            style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}
            aria-label="Report structure"
          >
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                {(['Report Section', 'Written for', 'Purpose'] as const).map((h) => (
                  <th
                    key={h}
                    scope="col"
                    style={{
                      textAlign: 'left',
                      padding: '12px 16px',
                      fontSize: '0.68rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      color: 'var(--txt3)',
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {REPORT_ROWS.map((row, i) => (
                <tr
                  key={row.section}
                  style={{
                    borderBottom: '1px solid var(--border)',
                    background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.015)',
                  }}
                >
                  <th
                    scope="row"
                    style={{
                      textAlign: 'left',
                      padding: '14px 16px',
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      color: 'var(--txt)',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {row.section}
                  </th>
                  <td style={{ padding: '14px 16px', fontSize: '0.78rem', color: 'var(--txt3)', whiteSpace: 'nowrap' }}>
                    {row.audience}
                  </td>
                  <td style={{ padding: '14px 16px', fontSize: '0.78rem', color: 'var(--txt2)', lineHeight: 1.6 }}>
                    {row.purpose}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <ul
          role="list"
          style={{ display: 'flex', gap: '24px', marginTop: '28px', flexWrap: 'wrap', listStyle: 'none', padding: 0 }}
        >
          {[
            'Two reports per engagement — one for leadership, one for engineering',
            '30-day remediation support included as standard',
          ].map((text) => (
            <li
              key={text}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 16px',
                background: 'var(--bg2)',
                border: '1px solid var(--border)',
                borderRadius: '8px',
              }}
            >
              <Check size={14} color="var(--green)" aria-hidden="true" />
              <span style={{ fontSize: '0.8rem', color: 'var(--txt2)' }}>{text}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
