import { MessageSquare, FileText, Shield, CheckCircle } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { getProcessSteps } from '@/services/process.service'

const ICONS: Record<string, React.ComponentType<{ size?: number; stroke?: string; strokeWidth?: number }>> = {
  'message-square': MessageSquare,
  'file-text': FileText,
  shield: Shield,
  'check-circle': CheckCircle,
}

export async function ProcessSection() {
  const steps = await getProcessSteps()

  return (
    <section
      id="process"
      style={{ padding: '90px 48px', background: 'var(--bg2)', borderTop: '1px solid var(--border)' }}
      aria-labelledby="process-heading"
    >
      <Container>
        <div className="mb-[44px]">
          <p className="inline-flex items-center gap-2 text-[.68rem] font-bold tracking-[.12em] uppercase mb-2.5" style={{ color: 'var(--blue)' }}>
            <span className="w-4 h-px" style={{ background: 'var(--blue)' }} aria-hidden="true" />
            How It Works
          </p>
          <h2 id="process-heading" className="text-[clamp(1.55rem,2.8vw,2.3rem)] font-extrabold tracking-[-0.03em] text-white leading-[1.1]">
            From Enquiry to Remediation
          </h2>
          <p className="text-[.9rem] leading-[1.75] mt-[10px] max-w-[560px]" style={{ color: 'var(--txt2)' }}>
            A transparent, four-step engagement built to eliminate uncertainty from day one. Fixed-fee pricing, a clear timeline, and daily communication — so you can focus on your business while the testing runs.
          </p>
        </div>

        <ol
          className="grid gap-px sec-grid-4"
          style={{ gridTemplateColumns: 'repeat(4,1fr)', background: 'var(--border)', listStyle: 'none' }}
        >
          {steps.map((step, i) => {
            const Icon = ICONS[step.iconName] ?? Shield
            return (
              <li key={step.number} className="relative" style={{ background: 'var(--bg2)', padding: '30px 26px' }}>
                {/* Connector */}
                {i < steps.length - 1 && (
                  <div
                    className="absolute top-[38px] right-0 w-px"
                    style={{ height: 38, background: 'linear-gradient(to bottom,var(--blue),transparent)', zIndex: 2 }}
                    aria-hidden="true"
                  />
                )}
                <p className="text-[.6rem] font-bold tracking-[.14em] mb-4" style={{ color: 'rgba(26,107,255,.35)', fontFamily: 'var(--font-mono)' }}>
                  {step.number}
                </p>
                <div
                  className="w-[38px] h-[38px] rounded-[8px] grid place-items-center mb-4"
                  style={{ background: 'var(--blue3)', border: '1px solid var(--border2)' }}
                  aria-hidden="true"
                >
                  <Icon size={17} stroke="var(--blue)" strokeWidth={1.6} />
                </div>
                <h3 className="text-[.88rem] font-bold text-white mb-[7px]">{step.title}</h3>
                <p className="text-[.78rem] leading-[1.65]" style={{ color: 'var(--txt2)' }}>
                  {step.description}
                </p>
              </li>
            )
          })}
        </ol>
      </Container>
    </section>
  )
}
