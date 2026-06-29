import { Check } from 'lucide-react'
import { SECTION_IDS } from '../constants'

const IDEAL_ITEMS = [
  'You need an accurate picture of your real attack surface, not a best-guess estimate.',
  'You want findings that your board can understand and your developers can act on.',
  'You value direct communication with the person performing the testing.',
  'You prefer fixed-fee pricing and a defined scope over open-ended retainers.',
  'You want manual expertise alongside automated tooling — not one or the other.',
  'You are preparing for a funding round, regulatory audit, or a significant product launch.',
  'You want a consultant who is available after the report is delivered.',
] as const

const NOT_IDEAL = [
  'Your requirement is a compliance document to satisfy a one-time procurement checklist.',
  'An automated vulnerability scan is sufficient for your current requirement.',
  'You require a provider who can compete primarily on lowest price rather than quality.',
  'Your internal team is unavailable for the brief kick-off and debrief calls this engagement requires.',
] as const

export function IdealClientSection() {
  return (
    <section
      id={SECTION_IDS.idealClient}
      aria-labelledby="ideal-heading"
      style={{ background: 'var(--bg2)', padding: '90px 48px', borderTop: '1px solid var(--border)' }}
    >
      <div style={{ maxWidth: '760px', margin: '0 auto' }}>
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
          Ideal Engagement
        </p>

        <h2
          id="ideal-heading"
          style={{
            fontSize: 'clamp(1.55rem, 2.8vw, 2.3rem)',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            color: 'var(--txt)',
            lineHeight: 1.1,
            marginBottom: '12px',
          }}
        >
          Who This Engagement Is Built For
        </h2>

        <p style={{ fontSize: '0.9rem', color: 'var(--txt2)', marginBottom: '36px', lineHeight: 1.7 }}>
          Understanding whether this is the right engagement saves time for both parties.
        </p>

        <div className="ideal-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
          {/* Ideal */}
          <div>
            <p
              style={{
                fontSize: '0.75rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: 'var(--green)',
                marginBottom: '16px',
              }}
            >
              This engagement is ideal if…
            </p>
            <ul
              style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}
              aria-label="Ideal engagement criteria"
            >
              {IDEAL_ITEMS.map((item) => (
                <li
                  key={item}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '10px',
                    fontSize: '0.82rem',
                    lineHeight: 1.65,
                    color: 'var(--txt2)',
                  }}
                >
                  <Check size={13} color="var(--green)" aria-hidden="true" style={{ flexShrink: 0, marginTop: '3px' }} />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Not ideal */}
          <div>
            <p
              style={{
                fontSize: '0.75rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: 'var(--txt3)',
                marginBottom: '16px',
              }}
            >
              This may not be the right fit if…
            </p>
            <ul
              style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}
              aria-label="Criteria that may indicate a poor fit"
            >
              {NOT_IDEAL.map((item) => (
                <li
                  key={item}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '10px',
                    fontSize: '0.82rem',
                    lineHeight: 1.65,
                    color: 'var(--txt2)',
                  }}
                >
                  <span
                    aria-hidden="true"
                    style={{
                      width: '13px',
                      height: '13px',
                      borderRadius: '50%',
                      border: '1px solid var(--border)',
                      flexShrink: 0,
                      marginTop: '3px',
                    }}
                  />
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
