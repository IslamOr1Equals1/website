import { Check } from 'lucide-react'
import { ContactButton } from './ContactButton'
import { SECTION_IDS } from '../constants'

const CTA_TRUST_ITEMS = [
  'Fixed-fee',
  'Complimentary re-test',
  '24-hour response',
  'Direct communication',
] as const

export function ServicesCtaSection() {
  return (
    <section
      id={SECTION_IDS.cta}
      aria-labelledby="cta-heading"
      style={{
        background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(26,107,255,0.1) 0%, transparent 70%), var(--bg)',
        padding: '110px 48px',
        textAlign: 'center',
        borderTop: '1px solid var(--border)',
      }}
    >
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <p
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
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
          Get Started
        </p>

        <h2
          id="cta-heading"
          style={{
            fontSize: 'clamp(1.6rem, 3vw, 2.5rem)',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            lineHeight: 1.1,
            color: 'var(--txt)',
            marginBottom: '16px',
          }}
        >
          The Assessment Begins with a Conversation.
        </h2>

        <p style={{ fontSize: '0.9rem', lineHeight: 1.75, color: 'var(--txt2)', marginBottom: '32px' }}>
          Start with a free, no-commitment scoping call. I&apos;ll review your environment and propose
          a tailored engagement — you will know the full scope and price before agreeing to anything.
        </p>

        <ContactButton label="Book a Free Consultation" />

        <p style={{ fontSize: '0.72rem', color: 'var(--txt3)', margin: '12px 0 24px' }}>
          NDA available before any details are discussed
        </p>

        <ul
          role="list"
          style={{
            listStyle: 'none',
            padding: 0,
            margin: 0,
            display: 'flex',
            justifyContent: 'center',
            gap: '20px',
            flexWrap: 'wrap',
          }}
        >
          {CTA_TRUST_ITEMS.map((item) => (
            <li
              key={item}
              style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.72rem', color: 'var(--txt3)' }}
            >
              <Check size={11} color="var(--green)" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
