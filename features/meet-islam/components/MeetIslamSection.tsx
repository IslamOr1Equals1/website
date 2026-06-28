import { MapPin, Briefcase, Award, Users } from 'lucide-react'
import { getProfileData } from '@/services/meet-islam.service'
import { MeetIslamCTAs } from './MeetIslamCTAs'
import { Container } from '@/components/ui/Container'

const FACT_ICONS: Record<string, React.ComponentType<{ size?: number; stroke?: string; strokeWidth?: number }>> = {
  'map-pin': MapPin,
  briefcase: Briefcase,
  award: Award,
  users: Users,
}

export async function MeetIslamSection() {
  const profile = await getProfileData()

  return (
    <section
      id="meet-islam"
      style={{ padding: '90px 48px', background: 'var(--bg)', borderTop: '1px solid var(--border)' }}
      aria-labelledby="meet-islam-heading"
    >
      <Container>
        <div
          className="grid gap-16 items-start meet-grid"
          style={{ gridTemplateColumns: '340px 1fr' }}
        >
          {/* Photo column */}
          <div className="flex flex-col gap-5">
            {/* Photo placeholder */}
            <div
              className="relative overflow-hidden rounded-[8px] flex items-center justify-center"
              style={{
                width: '100%',
                aspectRatio: '4/5',
                background: 'linear-gradient(135deg,var(--bg2) 0%,var(--bg3) 100%)',
                border: '1px solid var(--border)',
              }}
              role="img"
              aria-label="Islam Ahmed — Offensive Security Consultant"
            >
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(160deg,rgba(26,107,255,.06) 0%,transparent 60%)' }} aria-hidden="true" />
              <div className="flex flex-col items-center gap-3 opacity-40" aria-hidden="true">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--txt3)" strokeWidth="1">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <path d="M21 15l-5-5L5 21" />
                </svg>
                <span className="text-[.68rem] font-medium tracking-[.06em] uppercase" style={{ color: 'var(--txt3)' }}>
                  Photo
                </span>
              </div>
              {/* Label overlay */}
              <div
                className="absolute bottom-4 left-4 right-4 rounded-[5px] px-[13px] py-2.5"
                style={{ background: 'rgba(6,11,23,.85)', border: '1px solid var(--border)', backdropFilter: 'blur(12px)' }}
              >
                <p className="text-[.88rem] font-bold text-white">Islam Ahmed</p>
                <p className="text-[.68rem] mt-[2px]" style={{ color: 'var(--txt3)' }}>Offensive Security Consultant</p>
              </div>
            </div>

            {/* Facts */}
            <div className="flex flex-col gap-px" style={{ background: 'var(--border)' }}>
              {profile.facts.map((fact) => {
                const Icon = FACT_ICONS[fact.iconName] ?? Briefcase
                return (
                  <div
                    key={fact.iconName}
                    className="hover-bg2 flex items-center gap-2.5 px-4 py-[13px]"
                    style={{ background: 'var(--bg)' }}
                  >
                    <div
                      className="w-7 h-7 rounded-[5px] grid place-items-center flex-shrink-0"
                      style={{ background: 'var(--blue3)', border: '1px solid var(--border2)' }}
                      aria-hidden="true"
                    >
                      <Icon size={13} stroke="var(--blue)" strokeWidth={1.8} />
                    </div>
                    <div>
                      <p className="text-[.78rem] font-semibold text-white">{fact.value}</p>
                      <p className="text-[.62rem] mt-[1px]" style={{ color: 'var(--txt3)' }}>{fact.sub}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Content column */}
          <div className="flex flex-col gap-7">
            <div>
              <p className="inline-flex items-center gap-2 text-[.68rem] font-bold tracking-[.12em] uppercase mb-2.5" style={{ color: 'var(--blue)' }}>
                <span className="w-4 h-px" style={{ background: 'var(--blue)' }} aria-hidden="true" />
                Meet Islam Ahmed
              </p>
              <h2 id="meet-islam-heading" className="text-[clamp(1.55rem,2.8vw,2.3rem)] font-extrabold tracking-[-0.03em] text-white leading-[1.1]">
                Offensive Security Specialist
              </h2>
            </div>

            <div className="text-[.92rem] leading-[1.82]" style={{ color: 'var(--txt2)' }}>
              <p className="mb-4">
                With over <strong className="text-white font-semibold">12 years in offensive security</strong>, I&apos;ve conducted
                more than 200 penetration tests and red team engagements across fintech, healthcare, enterprise,
                and government sectors — discovering over 500 critical vulnerabilities that would have led to
                material breaches if left unaddressed.
              </p>
              <p className="mb-4">
                My background spans <strong className="text-white font-semibold">web application security, Active Directory attack paths,
                cloud configuration review, and full red team simulation</strong>. I hold active certifications
                including OSCP, CRTO, CEH, and eWPTX, and I stay current with the evolving threat landscape
                through continuous research and intelligence monitoring.
              </p>
              <p className="mb-4">
                Every engagement I take on is treated as if it were my own organisation at risk — because
                the organisations I work with are genuinely trusting me with their most sensitive attack surface.
              </p>
              <p>
                My clients are <strong className="text-white font-semibold">CEOs, CTOs, CISOs, and founders</strong> who
                need to understand their real security posture — not a compliance checkbox, not a scanner report.
                They need to know what an attacker could actually do to their organisation, and exactly what it
                would take to stop them.
              </p>
            </div>

            {/* Philosophy */}
            <div className="rounded-[8px] px-7 py-6" style={{ background: 'var(--bg2)', border: '1px solid var(--border2)' }}>
              <p className="text-[.62rem] font-bold tracking-[.12em] uppercase flex items-center gap-2 mb-3" style={{ color: 'var(--blue)' }}>
                <span className="w-3.5 h-px" style={{ background: 'var(--blue)' }} aria-hidden="true" />
                Philosophy
              </p>
              <blockquote
                className="text-[.88rem] leading-[1.8] italic"
                style={{ color: 'var(--txt2)' }}
                dangerouslySetInnerHTML={{ __html: profile.philosophy }}
              />
            </div>

            {/* Approach grid */}
            <div className="grid grid-cols-3 gap-px meet-approach" style={{ background: 'var(--border)' }}>
              {profile.approachItems.map((item) => (
                <div
                  key={item.number}
                  className="hover-bg2 px-5 py-5"
                  style={{ background: 'var(--bg)' }}
                >
                  <p className="text-[.58rem] font-bold tracking-[.14em] mb-2.5" style={{ color: 'rgba(26,107,255,.4)', fontFamily: 'var(--font-mono)' }}>
                    {item.number}
                  </p>
                  <p className="text-[.84rem] font-bold text-white mb-1.5">{item.title}</p>
                  <p className="text-[.76rem] leading-[1.65]" style={{ color: 'var(--txt2)' }}>{item.description}</p>
                </div>
              ))}
            </div>

            <MeetIslamCTAs />
          </div>
        </div>
      </Container>
    </section>
  )
}
