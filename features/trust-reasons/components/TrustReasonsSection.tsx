import { FileCheck, Clock, RefreshCw, ShieldCheck } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { getTrustReasons } from '@/services/trust-reasons.service'

const ICONS: Record<string, React.ComponentType<{ size?: number; stroke?: string; strokeWidth?: number }>> = {
  'file-check': FileCheck,
  clock: Clock,
  'refresh-cw': RefreshCw,
  'shield-check': ShieldCheck,
}

export async function TrustReasonsSection() {
  const reasons = await getTrustReasons()

  return (
    <section
      id="trust-reasons"
      style={{ padding: '90px 48px', background: 'var(--bg)', borderTop: '1px solid var(--border)' }}
      aria-labelledby="trust-reasons-heading"
    >
      <Container>
        <div className="mb-[44px]">
          <p className="inline-flex items-center gap-2 text-[.68rem] font-bold tracking-[.12em] uppercase mb-2.5" style={{ color: 'var(--blue)' }}>
            <span className="w-4 h-px" style={{ background: 'var(--blue)' }} aria-hidden="true" />
            Why Organisations Trust Me
          </p>
          <h2 id="trust-reasons-heading" className="text-[clamp(1.55rem,2.8vw,2.3rem)] font-extrabold tracking-[-0.03em] text-white leading-[1.1]">
            Engineered for Enterprise Trust
          </h2>
          <p className="text-[.9rem] leading-[1.75] mt-[10px] max-w-[560px]" style={{ color: 'var(--txt2)' }}>
            Every engagement commitment is honoured — from the first conversation through to post-remediation verification. Clear terms, professional conduct, and policies designed to protect your organisation at every stage.
          </p>
        </div>

        <div className="grid gap-px sec-grid-4" style={{ gridTemplateColumns: 'repeat(4,1fr)', background: 'var(--border)' }}>
          {reasons.map((reason) => {
            const Icon = ICONS[reason.iconName] ?? ShieldCheck
            return (
              <article
                key={reason.iconName}
                className="hover-bg2 group relative overflow-hidden px-[26px] py-[30px]"
                style={{ background: 'var(--bg)' }}
              >
                <div
                  className="absolute top-0 left-0 right-0 h-[3px] origin-left scale-x-0 transition-transform duration-450 group-hover:scale-x-100"
                  style={{ background: 'linear-gradient(90deg,var(--blue),rgba(26,107,255,.1))' }}
                  aria-hidden="true"
                />
                <div
                  className="w-10 h-10 rounded-[8px] grid place-items-center mb-4"
                  style={{ background: 'var(--blue3)', border: '1px solid var(--border2)' }}
                  aria-hidden="true"
                >
                  <Icon size={18} stroke="var(--blue)" strokeWidth={1.6} />
                </div>
                <h3 className="text-[.9rem] font-bold text-white mb-2">{reason.title}</h3>
                <p className="text-[.8rem] leading-[1.7]" style={{ color: 'var(--txt2)' }}>{reason.description}</p>
              </article>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
