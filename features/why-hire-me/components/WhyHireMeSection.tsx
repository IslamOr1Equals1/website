import { getWhyHireMeCards } from '@/services/why-hire-me.service'
import { Container } from '@/components/ui/Container'
import { WhyCard } from './WhyCard'

export async function WhyHireMeSection() {
  const cards = await getWhyHireMeCards()

  return (
    <section
      id="why-hire"
      style={{
        padding: '80px 48px',
        background: 'var(--bg2)',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
      }}
      aria-labelledby="why-hire-heading"
    >
      <Container>
        <div className="mb-[44px]">
          <p className="inline-flex items-center gap-2 text-[.68rem] font-bold tracking-[.12em] uppercase mb-2.5" style={{ color: 'var(--blue)' }}>
            <span className="w-4 h-px" style={{ background: 'var(--blue)' }} aria-hidden="true" />
            Why Work With Me
          </p>
          <h2 id="why-hire-heading" className="text-[clamp(1.55rem,2.8vw,2.3rem)] font-extrabold tracking-[-0.03em] text-white leading-[1.1]">
            What Sets This Apart
          </h2>
          <p className="text-[.9rem] leading-[1.75] mt-[10px] max-w-[560px]" style={{ color: 'var(--txt2)' }}>
            Every penetration test produces a report. Not every penetration test produces change. I&apos;m engaged by organisations that need findings their board can understand, their CTO can prioritise, and their developers can fix — not a PDF that collects dust.
          </p>
        </div>

        <div
          className="grid gap-px sec-grid-3"
          style={{
            gridTemplateColumns: 'repeat(3,1fr)',
            background: 'var(--border)',
          }}
        >
          {cards.map((card) => (
            <WhyCard key={card.number} card={card} />
          ))}
        </div>
      </Container>
    </section>
  )
}
