import { getConsultingServices } from '@/services/consulting-services.service'
import { Container } from '@/components/ui/Container'
import { ServiceCard } from './ServiceCard'

export async function ServicesSection() {
  const services = await getConsultingServices()

  return (
    <section
      id="services"
      style={{ padding: '90px 48px', background: 'var(--bg2)', borderTop: '1px solid var(--border)' }}
      aria-labelledby="services-heading"
    >
      <Container>
        <div className="flex justify-between items-end gap-6 mb-[44px] flex-wrap">
          <div>
            <p className="inline-flex items-center gap-2 text-[.68rem] font-bold tracking-[.12em] uppercase mb-2.5" style={{ color: 'var(--blue)' }}>
              <span className="w-4 h-px" style={{ background: 'var(--blue)' }} aria-hidden="true" />
              Services
            </p>
            <h2 id="services-heading" className="text-[clamp(1.55rem,2.8vw,2.3rem)] font-extrabold tracking-[-0.03em] text-white leading-[1.1]">
              Security Services
            </h2>
            <p className="text-[.9rem] leading-[1.75] mt-2.5 max-w-[500px]" style={{ color: 'var(--txt2)' }}>
              Offensive security services tailored to your environment, risk profile, and compliance requirements.
            </p>
          </div>
        </div>

        <div
          className="grid gap-px sec-grid-3"
          style={{ gridTemplateColumns: 'repeat(3,1fr)', background: 'var(--border)' }}
        >
          {services.map((svc) => (
            <ServiceCard key={svc.number} service={svc} />
          ))}
        </div>
      </Container>
    </section>
  )
}
