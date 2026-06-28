import type { WorkCard as WorkCardType } from '@/services/security-impact.service'

const TYPE_STYLES = {
  red: { color: 'var(--red)', bg: 'rgba(255,68,102,.07)', border: 'rgba(255,68,102,.18)' },
  blue: { color: 'var(--blue)', bg: 'var(--blue3)', border: 'var(--border2)' },
  green: { color: 'var(--green)', bg: 'rgba(0,214,122,.07)', border: 'rgba(0,214,122,.18)' },
}

export function WorkCard({ card }: { card: WorkCardType }) {
  const typeStyle = TYPE_STYLES[card.typeVariant]

  return (
    <article
      className="hover-bg2 group relative overflow-hidden flex flex-col transition-colors duration-250"
      style={{ background: 'var(--bg)', padding: 30 }}
    >
      {/* Left accent bar */}
      <div
        className="absolute top-0 left-0 bottom-0 w-[3px] origin-top scale-y-0 transition-transform duration-400 group-hover:scale-y-100"
        style={{ background: 'var(--blue)' }}
        aria-hidden="true"
      />
      <span
        className="inline-flex items-center gap-[5px] text-[.62rem] font-bold tracking-[.1em] uppercase rounded-[3px] px-2 py-[3px] mb-1.5 self-start"
        style={{ color: typeStyle.color, background: typeStyle.bg, border: `1px solid ${typeStyle.border}` }}
      >
        {card.type}
      </span>
      <p className="text-[.6rem] font-semibold tracking-[.1em] uppercase mb-3" style={{ color: 'var(--txt3)', fontFamily: 'var(--font-mono)' }}>
        {card.industry}
      </p>
      <h3 className="text-[.95rem] font-bold tracking-[-0.02em] text-white leading-[1.35] mb-2">{card.title}</h3>
      <p className="text-[.78rem] leading-[1.65] mb-4 flex-1" style={{ color: 'var(--txt2)' }}>
        {card.challenge}
      </p>

      <div className="rounded-[5px] p-[11px_13px] mb-3.5" style={{ background: 'rgba(255,68,102,.04)', border: '1px solid rgba(255,68,102,.12)' }}>
        <p className="text-[.58rem] font-bold tracking-[.1em] uppercase mb-[5px]" style={{ color: 'var(--red)', fontFamily: 'var(--font-mono)' }}>
          Key Findings
        </p>
        <p className="text-[.78rem] leading-[1.55]" style={{ color: 'rgba(255,255,255,.65)' }}>{card.findings}</p>
      </div>

      <div className="rounded-[5px] p-[11px_13px] mb-4" style={{ background: 'rgba(0,214,122,.05)', border: '1px solid rgba(0,214,122,.12)' }}>
        <p className="text-[.58rem] font-bold tracking-[.1em] uppercase mb-[5px]" style={{ color: 'var(--green)', fontFamily: 'var(--font-mono)' }}>
          Business Impact
        </p>
        <p className="text-[.78rem] leading-[1.55]" style={{ color: 'rgba(255,255,255,.65)' }}>{card.impact}</p>
      </div>

      <div className="flex gap-1.5 flex-wrap">
        {card.tags.map((tag) => (
          <span
            key={tag}
            className="text-[.62rem] font-medium px-[7px] py-[2px] rounded-[3px]"
            style={{ color: 'var(--txt3)', border: '1px solid var(--border)' }}
          >
            {tag}
          </span>
        ))}
      </div>
    </article>
  )
}
