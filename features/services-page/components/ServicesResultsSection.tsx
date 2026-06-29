import type { ServicesResultCard } from '@/services/services-results.service'
import { SECTION_IDS } from '../constants'

interface ServicesResultsSectionProps {
  results: ServicesResultCard[]
}

export function ServicesResultsSection({ results }: ServicesResultsSectionProps) {
  return (
    <section
      id={SECTION_IDS.results}
      aria-labelledby="results-heading"
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
          Security Impact
        </p>

        <h2
          id="results-heading"
          style={{
            fontSize: 'clamp(1.55rem, 2.8vw, 2.3rem)',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            color: 'var(--txt)',
            lineHeight: 1.1,
            marginBottom: '12px',
          }}
        >
          Selected Security Impact
        </h2>

        <p style={{ fontSize: '0.9rem', lineHeight: 1.75, color: 'var(--txt2)', maxWidth: '580px', marginBottom: '44px' }}>
          Selected engagements conducted under signed NDA. Details generalised and anonymised
          to protect client confidentiality — the attack paths, techniques, and outcomes are real.
        </p>

        <ul
          role="list"
          aria-label="Selected engagement results"
          className="results-grid"
          style={{ listStyle: 'none', padding: 0, margin: '0 0 32px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}
        >
          {results.map((result) => (
            <li key={result.badge}>
              <ResultCard result={result} />
            </li>
          ))}
        </ul>

        <div style={{ textAlign: 'center' }}>
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
          >
            Discuss a similar engagement →
          </a>
        </div>
      </div>
    </section>
  )
}

function ResultCard({ result }: { result: ServicesResultCard }) {
  return (
    <article
      style={{
        background: 'var(--card)',
        border: '1px solid rgba(26,107,255,0.14)',
        borderRadius: '10px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 4px 24px rgba(0,0,0,0.22), 0 0 0 1px rgba(26,107,255,0.06)',
        height: '100%',
      }}
    >
      {/* Header */}
      <div
        style={{
          borderBottom: '1px solid rgba(26,107,255,0.1)',
          padding: '20px 22px 16px',
          background: 'linear-gradient(145deg, rgba(26,107,255,0.12) 0%, rgba(26,107,255,0.04) 50%, transparent 100%)',
        }}
      >
        <span
          style={{
            display: 'inline-block',
            fontSize: '0.6rem',
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--blue)',
            background: 'rgba(26,107,255,0.15)',
            border: '1px solid rgba(26,107,255,0.3)',
            borderRadius: '4px',
            padding: '3px 8px',
            marginBottom: '10px',
          }}
        >
          {result.badge}
        </span>
        <p style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--txt)', lineHeight: 1.5, margin: 0 }}>
          {result.industry}
        </p>
      </div>

      {/* "What was missed" metric */}
      <div
        style={{
          padding: '16px 22px',
          borderBottom: '1px solid rgba(26,107,255,0.08)',
          background: 'rgba(26,107,255,0.04)',
        }}
      >
        <p
          style={{
            fontSize: '0.58rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            color: 'var(--blue)',
            marginBottom: '5px',
            opacity: 0.7,
          }}
        >
          What was missed
        </p>
        <p
          style={{
            fontSize: '0.85rem',
            fontWeight: 700,
            color: 'var(--txt)',
            lineHeight: 1.35,
            margin: 0,
            letterSpacing: '-0.01em',
          }}
        >
          {result.metric}
        </p>
      </div>

      {/* Body */}
      <div style={{ padding: '18px 22px', flex: 1, display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <p style={{ fontSize: '0.76rem', lineHeight: 1.65, color: 'var(--txt2)', margin: 0 }}>
          {result.challenge}
        </p>

        {/* Finding callout — blue left border */}
        <div
          style={{
            background: 'rgba(26,107,255,0.07)',
            border: '1px solid rgba(26,107,255,0.18)',
            borderLeft: '3px solid var(--blue)',
            borderRadius: '0 6px 6px 0',
            padding: '11px 14px',
          }}
        >
          <p
            style={{
              fontSize: '0.58rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              color: 'var(--blue)',
              marginBottom: '5px',
            }}
          >
            Critical Finding
          </p>
          <p style={{ fontSize: '0.8rem', fontWeight: 600, color: '#fff', lineHeight: 1.5, margin: 0 }}>
            {result.finding}
          </p>
        </div>
      </div>

      {/* Outcome footer — green tint */}
      <div
        style={{
          padding: '14px 22px',
          borderTop: '1px solid rgba(0,214,122,0.12)',
          background: 'rgba(0,214,122,0.04)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '6px' }}>
          <span
            style={{
              fontSize: '1.05rem',
              fontWeight: 800,
              color: 'var(--green)',
              letterSpacing: '-0.02em',
              lineHeight: 1,
              flexShrink: 0,
            }}
          >
            {result.statLabel}
          </span>
          <span style={{ fontSize: '0.62rem', color: 'rgba(0,214,122,0.6)', lineHeight: 1.3 }}>
            {result.statContext}
          </span>
        </div>
        <p style={{ fontSize: '0.72rem', lineHeight: 1.55, color: 'var(--txt2)', margin: 0 }}>
          {result.outcome}
        </p>
      </div>
    </article>
  )
}
