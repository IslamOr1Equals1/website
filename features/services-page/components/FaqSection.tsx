import type { FaqItem } from '@/services/faq.service'
import { SECTION_IDS } from '../constants'

interface FaqSectionProps {
  faqs: FaqItem[]
}

export function FaqSection({ faqs }: FaqSectionProps) {
  return (
    <section
      id={SECTION_IDS.faq}
      aria-labelledby="faq-heading"
      style={{ background: 'var(--bg)', padding: '90px 48px', borderTop: '1px solid var(--border)' }}
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
          Common Questions
        </p>

        <h2
          id="faq-heading"
          style={{
            fontSize: 'clamp(1.55rem, 2.8vw, 2.3rem)',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            color: 'var(--txt)',
            lineHeight: 1.1,
            marginBottom: '12px',
          }}
        >
          Answers for Executive Buyers
        </h2>

        <p style={{ fontSize: '0.9rem', color: 'var(--txt2)', marginBottom: '36px', lineHeight: 1.7 }}>
          If a question is not answered here, it will be answered in the first conversation —
          which is free and carries no commitment.
        </p>

        <div style={{ border: '1px solid var(--border)', borderRadius: '10px', overflow: 'hidden' }}>
          {faqs.map(({ question, answer }) => (
            <details key={question} className="faq-item">
              <summary>{question}</summary>
              <div className="faq-answer">{answer}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

