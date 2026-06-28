import { getSecurityImpactCards } from '@/services/security-impact.service'
import { Container } from '@/components/ui/Container'
import { WorkCard } from './WorkCard'

export async function SecurityImpactSection() {
  const cards = await getSecurityImpactCards()

  return (
    <section
      id="work"
      style={{ padding: '90px 48px', background: 'var(--bg)', borderTop: '1px solid var(--border)' }}
      aria-labelledby="work-heading"
    >
      <Container>
        <div className="flex justify-between items-end gap-6 mb-[44px] flex-wrap">
          <div>
            <p className="inline-flex items-center gap-2 text-[.68rem] font-bold tracking-[.12em] uppercase mb-2.5" style={{ color: 'var(--blue)' }}>
              <span className="w-4 h-px" style={{ background: 'var(--blue)' }} aria-hidden="true" />
              Security Impact
            </p>
            <h2 id="work-heading" className="text-[clamp(1.55rem,2.8vw,2.3rem)] font-extrabold tracking-[-0.03em] text-white leading-[1.1]">
              Real Engagements. Real Results.
            </h2>
            <p className="text-[.9rem] leading-[1.75] mt-2.5 max-w-[500px]" style={{ color: 'var(--txt2)' }}>
              Selected engagements conducted under signed NDA. Details generalised and anonymised to protect client confidentiality — the vulnerabilities, techniques, and outcomes are real.
            </p>
          </div>
        </div>

        <div
          className="grid gap-px sec-grid-3"
          style={{ gridTemplateColumns: 'repeat(3,1fr)', background: 'var(--border)' }}
        >
          {cards.map((card, i) => (
            <WorkCard key={i} card={card} />
          ))}
        </div>
      </Container>
    </section>
  )
}
