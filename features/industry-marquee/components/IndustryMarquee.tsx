'use client'

const INDUSTRIES = [
  'Financial Services',
  'Healthcare',
  'Fintech',
  'SaaS',
  'Enterprise',
  'Government',
  'E-Commerce',
  'Critical Infrastructure',
  'Cloud Native',
  'Insurance',
  'Legal & Compliance',
  'Media & Tech',
]

const DOUBLED = [...INDUSTRIES, ...INDUSTRIES]

export function IndustryMarquee() {
  return (
    <div
      id="marquee"
      style={{
        padding: 0,
        borderBottom: '1px solid var(--border)',
        overflow: 'hidden',
        background: 'var(--bg)',
      }}
      aria-label="Industries served"
    >
      <div className="relative flex items-center overflow-hidden" style={{ height: 52 }}>
        {/* Fade edges */}
        <div
          className="absolute top-0 bottom-0 left-0 w-[120px] z-[2] pointer-events-none"
          style={{ background: 'linear-gradient(90deg,var(--bg),transparent)' }}
          aria-hidden="true"
        />
        <div
          className="absolute top-0 bottom-0 right-0 w-[120px] z-[2] pointer-events-none"
          style={{ background: 'linear-gradient(-90deg,var(--bg),transparent)' }}
          aria-hidden="true"
        />

        <div
          className="flex gap-0"
          style={{
            animation: 'marquee-left 40s linear infinite',
            width: 'max-content',
          }}
        >
          {DOUBLED.map((industry, i) => (
            <div
              key={i}
              className="flex items-center gap-2.5 whitespace-nowrap text-[.7rem] font-bold tracking-[.14em] uppercase"
              style={{
                padding: '0 28px',
                borderRight: '1px solid var(--border)',
                color: 'var(--txt3)',
              }}
            >
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden="true"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              {industry}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
