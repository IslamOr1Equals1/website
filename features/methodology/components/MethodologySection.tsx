import { getMethodologySteps } from '@/services/methodology.service'
import { Container } from '@/components/ui/Container'
import { MethodCard } from './MethodCard'

export async function MethodologySection() {
  const steps = await getMethodologySteps()

  return (
    <section
      id="methodology"
      style={{ padding: '90px 48px', background: 'var(--bg)', borderTop: '1px solid var(--border)' }}
      aria-labelledby="methodology-heading"
    >
      <Container>
        <div className="max-w-[680px] mx-auto text-center mb-[52px]">
          <p className="inline-flex items-center gap-2 text-[.68rem] font-bold tracking-[.12em] uppercase mb-2.5" style={{ color: 'var(--blue)' }}>
            <span className="w-4 h-px" style={{ background: 'var(--blue)' }} aria-hidden="true" />
            Adaptive Methodology
          </p>
          <h2 id="methodology-heading" className="text-[clamp(1.55rem,2.8vw,2.3rem)] font-extrabold tracking-[-0.03em] text-white leading-[1.1]">
            How I Work
          </h2>
          <blockquote
            className="text-[.88rem] leading-[1.8] mt-4 italic text-left"
            style={{
              color: 'var(--txt2)',
              borderLeft: '3px solid var(--blue)',
              paddingLeft: 18,
            }}
          >
            Every engagement is different. I adapt my approach to your threat model, technology stack,
            and business context — not a checklist.
          </blockquote>
        </div>

        <div
          className="grid gap-px sec-grid-3"
          style={{ gridTemplateColumns: 'repeat(3,1fr)', background: 'var(--border)' }}
        >
          {steps.map((step) => (
            <MethodCard key={step.number} step={step} />
          ))}
        </div>

        <div
          className="max-w-[900px] mx-auto mt-[44px] text-center rounded-[8px] p-[28px_32px]"
          style={{ border: '1px solid var(--border2)', background: 'rgba(26,107,255,.04)' }}
        >
          <p className="text-[.88rem] leading-[1.8]" style={{ color: 'var(--txt2)' }}>
            All engagements include <strong className="text-white font-semibold">daily status updates</strong>,
            a <strong className="text-white font-semibold">structured debrief call</strong>, and{' '}
            <strong className="text-white font-semibold">complimentary re-test</strong> for critical and high findings.
            NDA available before scoping.
          </p>
        </div>
      </Container>
    </section>
  )
}
