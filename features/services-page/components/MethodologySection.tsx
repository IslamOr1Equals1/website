import { Fragment } from 'react'
import { Target, Shield, Brain, FileText } from 'lucide-react'

interface MethodologyPillar {
  Icon: React.ComponentType<{ size?: number; color?: string; strokeWidth?: number }>
  title: string
  description: string
  example: string
}

interface LifecycleStep {
  label: string
  desc: string
}

const METHODOLOGY_PILLARS: MethodologyPillar[] = [
  {
    Icon: Target,
    title: 'Manual Expertise',
    description:
      'Every finding is manually confirmed before it reaches your report. No false positives from unverified scanner output.',
    example:
      'An authentication bypass on a payment API — missed entirely by automated scanning — identified through manual business logic review.',
  },
  {
    Icon: Shield,
    title: 'Automated Tooling',
    description:
      'Industry-standard tooling (Burp Suite Pro, BloodHound, Nessus) ensures complete coverage at scale. Automation augments; it does not replace.',
    example:
      'Full API surface mapped via automated enumeration; manual testing then applied to every discovered endpoint.',
  },
  {
    Icon: Brain,
    title: 'Pattern Analysis at Scale',
    description:
      'Advanced tooling for attack path correlation and rapid hypothesis generation across large codebases and complex environments — including AI-assisted techniques where appropriate.',
    example:
      'Cross-referencing IAM policy configurations across 340 cloud resources in under an hour — a task that would take days manually.',
  },
  {
    Icon: FileText,
    title: 'Business-Context Validation',
    description:
      'Every finding is assessed against your actual risk tolerance, regulatory requirements, and business model before severity is assigned.',
    example:
      'A critical CVSS score against an internal, non-internet-facing admin panel is downgraded. A medium CVSS score against a PCI-DSS-scoped payment endpoint is escalated.',
  },
]

const LIFECYCLE_STEPS: LifecycleStep[] = [
  { label: 'Discovery', desc: 'Map the attack surface' },
  { label: 'Manual Verification', desc: 'Confirm every finding' },
  { label: 'Business Context', desc: 'Assess real-world impact' },
  { label: 'Severity Assignment', desc: 'Risk-calibrated scoring' },
  { label: 'Executive Translation', desc: 'Plain-language summaries' },
  { label: 'Report', desc: 'Dual-audience delivery' },
]

export function MethodologySection() {
  return (
    <section
      id="methodology"
      aria-labelledby="methodology-heading"
      style={{ background: 'var(--bg)', padding: '110px 48px', borderTop: '1px solid var(--border)' }}
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
          How I Work
        </p>

        <h2
          id="methodology-heading"
          style={{
            fontSize: 'clamp(1.55rem, 2.8vw, 2.3rem)',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            color: 'var(--txt)',
            lineHeight: 1.1,
            marginBottom: '12px',
          }}
        >
          The Methodology Behind Every Engagement
        </h2>

        <blockquote
          style={{
            fontSize: '0.95rem',
            fontStyle: 'italic',
            color: 'var(--txt2)',
            borderLeft: '3px solid var(--blue)',
            paddingLeft: '16px',
            margin: '0 0 44px',
            lineHeight: 1.7,
            maxWidth: '560px',
          }}
        >
          Every engagement is different. I adapt my approach to your threat model, technology
          stack, and business context — not a checklist.
        </blockquote>

        <ul
          role="list"
          aria-label="Methodology pillars"
          className="pillar-grid"
          style={{
            listStyle: 'none',
            padding: 0,
            margin: '0 0 48px',
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '1px',
            background: 'var(--border)',
          }}
        >
          {METHODOLOGY_PILLARS.map(({ Icon, title, description, example }) => (
            <li key={title} style={{ background: 'var(--bg2)', padding: '28px 24px' }}>
              <div
                aria-hidden="true"
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '8px',
                  display: 'grid',
                  placeItems: 'center',
                  background: 'var(--blue3)',
                  border: '1px solid var(--border2)',
                  marginBottom: '16px',
                }}
              >
                <Icon size={17} color="var(--blue)" strokeWidth={1.6} />
              </div>
              <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--txt)', marginBottom: '8px' }}>
                {title}
              </h3>
              <p style={{ fontSize: '0.78rem', lineHeight: 1.65, color: 'var(--txt2)', marginBottom: '12px' }}>
                {description}
              </p>
              <div style={{ borderTop: '1px solid var(--border)', paddingTop: '12px', marginTop: '12px' }}>
                <p
                  style={{
                    fontSize: '0.68rem',
                    fontWeight: 600,
                    color: 'var(--txt3)',
                    letterSpacing: '0.04em',
                    marginBottom: '6px',
                    textTransform: 'uppercase',
                  }}
                >
                  Example
                </p>
                <p style={{ fontSize: '0.72rem', lineHeight: 1.6, color: 'rgba(139,168,196,0.7)', fontStyle: 'italic' }}>
                  {example}
                </p>
              </div>
            </li>
          ))}
        </ul>

        {/* Finding lifecycle flow — a visual process diagram, not a semantic list */}
        <div>
          <p
            style={{
              fontSize: '0.68rem',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--txt3)',
              marginBottom: '20px',
            }}
          >
            Finding Lifecycle
          </p>
          <div
            role="list"
            aria-label="Finding lifecycle steps"
            className="lifecycle-flow"
            style={{ display: 'flex', alignItems: 'center' }}
          >
            {LIFECYCLE_STEPS.map((step, i) => (
              <Fragment key={step.label}>
                <div role="listitem" style={{ flex: 1, textAlign: 'center' }}>
                  <div
                    aria-hidden="true"
                    style={{
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      background: 'var(--blue)',
                      margin: '0 auto 10px',
                      boxShadow: '0 0 8px rgba(26,107,255,0.5)',
                    }}
                  />
                  <p style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--txt)', marginBottom: '3px' }}>
                    {step.label}
                  </p>
                  <p style={{ fontSize: '0.65rem', color: 'var(--txt3)' }}>{step.desc}</p>
                </div>
                {i < LIFECYCLE_STEPS.length - 1 && (
                  <div
                    aria-hidden="true"
                    style={{
                      height: '1px',
                      width: '100%',
                      maxWidth: '40px',
                      flexShrink: 0,
                      background: 'linear-gradient(90deg, var(--blue), rgba(26,107,255,0.2))',
                    }}
                  />
                )}
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
