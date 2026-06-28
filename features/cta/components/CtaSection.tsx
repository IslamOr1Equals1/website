import { CtaButtons } from './CtaButtons'

export function CtaSection() {
  return (
    <section
      id="cta"
      className="relative overflow-hidden"
      style={{ padding: '100px 48px', background: 'var(--bg)', borderTop: '1px solid var(--border)' }}
      aria-labelledby="cta-heading"
    >
      <div
        className="absolute pointer-events-none"
        style={{
          top: -120,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 600,
          height: 600,
          background: 'radial-gradient(circle,rgba(26,107,255,.06) 0%,transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="max-w-[640px] mx-auto text-center relative">
        <h2
          id="cta-heading"
          className="font-extrabold text-white leading-[1.1] tracking-[-0.04em] mb-4"
          style={{ fontSize: 'clamp(1.7rem, 3.2vw, 2.5rem)' }}
        >
          Ready to Identify What{' '}
          <em className="not-italic" style={{ color: 'var(--blue)' }}>Attackers</em>{' '}
          See in Your Business?
        </h2>
        <p className="text-[.95rem] leading-[1.78] mb-8 max-w-[500px] mx-auto" style={{ color: 'var(--txt2)' }}>
          Start with a free consultation. I&apos;ll review your environment and propose a tailored
          scope — no commitment required.
        </p>

        <CtaButtons />

        <p className="text-[.7rem] mt-6" style={{ color: 'var(--txt3)' }}>
          NDA available before any details are discussed
        </p>

        {/* Trust row */}
        <div
          className="flex items-center justify-center gap-[22px] flex-wrap mt-7 pt-6 border-t"
          style={{ borderColor: 'var(--border)' }}
        >
          {[
            'Fixed-fee engagements',
            'Free re-test included',
            'NDA before scoping',
            '24-hour response',
          ].map((item) => (
            <div key={item} className="flex items-center gap-1.5 text-[.72rem] font-medium" style={{ color: 'var(--txt2)' }}>
              <div
                className="w-3.5 h-3.5 rounded-full grid place-items-center flex-shrink-0"
                style={{ background: 'rgba(0,214,122,.1)', border: '1px solid rgba(0,214,122,.2)' }}
                aria-hidden="true"
              >
                <svg width="7" height="7" viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
