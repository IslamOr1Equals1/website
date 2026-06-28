import { HeroCTAs } from './HeroCTAs'
import type { HeroCert } from '../types/hero.types'

interface HeroLeftProps {
  certs: HeroCert[]
}

export function HeroLeft({ certs }: HeroLeftProps) {
  return (
    <div className="relative" style={{ maxWidth: 580, zIndex: 2 }}>
      {/* Badge */}
      <div
        className="inline-flex items-center gap-[7px] text-[.68rem] font-bold tracking-[.08em] uppercase rounded-[4px] px-3 py-[5px] mb-[26px]"
        style={{ color: 'var(--blue)', background: 'var(--blue3)', border: '1px solid var(--border2)' }}
      >
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
        Offensive Security Consultant
      </div>

      {/* Headline */}
      <h1
        className="font-extrabold leading-[1.08] tracking-[-0.04em] text-white mb-[22px]"
        style={{ fontSize: 'clamp(2.3rem, 3.8vw, 3.5rem)' }}
      >
        Find the Attack Paths That Matter{' '}
        <em className="not-italic" style={{ color: 'var(--blue)' }}>—</em>{' '}
        Before Attackers Do
      </h1>

      {/* Sub */}
      <p className="text-[1rem] leading-[1.75] max-w-[480px] mb-[22px]" style={{ color: 'var(--txt2)' }}>
        I help{' '}
        <strong className="text-white font-semibold">CEOs, CTOs, and CISOs</strong>{' '}
        across fintech, healthcare, SaaS, and enterprise identify the attack paths that pose the
        greatest business risk — then prioritise the remediation that matters most. Every engagement
        combines adversarial testing, executive-ready reporting, and{' '}
        <strong className="text-white font-semibold">
          a single consultant accountable from scoping through remediation.
        </strong>
      </p>

      {/* Trust & accountability */}
      <div className="mb-[34px] flex flex-col gap-[6px]">
        <p className="text-[.82rem] leading-[1.6]" style={{ color: 'var(--txt3)' }}>
          Helping CEOs, CTOs, and CISOs uncover the attack paths that compliance audits and automated scanners often miss.
        </p>
        <p className="text-[.82rem] leading-[1.6]" style={{ color: 'var(--txt3)' }}>
          You work directly with me — from the first conversation to the final remediation review.
        </p>
      </div>

      {/* CTAs — client component for modal trigger */}
      <HeroCTAs />

      {/* Certs */}
      <div className="flex items-center gap-4 flex-wrap">
        <p className="text-[.65rem] font-semibold tracking-[.08em] uppercase" style={{ color: 'var(--txt3)' }}>
          Certifications
        </p>
        <div className="flex gap-1.5 flex-wrap" role="list" aria-label="Professional certifications">
          {certs.map((cert) => (
            <span
              key={cert.code}
              role="listitem"
              className="text-[.68rem] font-semibold tracking-[.04em] px-[9px] py-[3px] rounded-[3px]"
              style={{ color: 'var(--txt2)', border: '1px solid var(--border)', background: 'rgba(255,255,255,.025)' }}
            >
              {cert.code}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
