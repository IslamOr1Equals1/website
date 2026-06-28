import {
  getFeaturedInsight,
  getInsightPreviews,
  type Insight,
  type InsightPreview,
} from '@/services/security-analysis.service'
import { Container } from '@/components/ui/Container'

const CAT_STYLES: Record<string, { color: string; bg: string; border: string }> = {
  red: { color: 'var(--red)', bg: 'rgba(255,68,102,.07)', border: 'rgba(255,68,102,.18)' },
  blue: { color: 'var(--blue)', bg: 'var(--blue3)', border: 'var(--border2)' },
  purple: { color: 'var(--purple)', bg: 'rgba(139,92,246,.07)', border: 'rgba(139,92,246,.18)' },
  green: { color: 'var(--green)', bg: 'rgba(0,214,122,.07)', border: 'rgba(0,214,122,.18)' },
  amber: { color: 'var(--amber)', bg: 'rgba(255,149,0,.07)', border: 'rgba(255,149,0,.18)' },
}

export async function SecurityAnalysisSection() {
  const [featured, previews] = await Promise.all([getFeaturedInsight(), getInsightPreviews(2)])

  return (
    <section
      id="security-analysis"
      style={{ padding: '90px 48px', background: 'var(--bg2)', borderTop: '1px solid var(--border)' }}
      aria-labelledby="security-analysis-heading"
    >
      <Container>
        <div className="flex justify-between items-end gap-6 mb-[44px] flex-wrap">
          <div>
            <p className="inline-flex items-center gap-2 text-[.68rem] font-bold tracking-[.12em] uppercase mb-2.5" style={{ color: 'var(--blue)' }}>
              <span className="w-4 h-px" style={{ background: 'var(--blue)' }} aria-hidden="true" />
              Security Analysis & Insights
            </p>
            <h2 id="security-analysis-heading" className="text-[clamp(1.55rem,2.8vw,2.3rem)] font-extrabold tracking-[-0.03em] text-white leading-[1.1]">
              Offensive Security Intelligence
            </h2>
            <p className="text-[.9rem] leading-[1.75] mt-2.5 max-w-[500px]" style={{ color: 'var(--txt2)' }}>
              Technical research and executive briefings from active engagements and threat intelligence.
            </p>
          </div>
          <a href="/insights" className="text-[.8rem] font-semibold flex items-center gap-[5px] transition-colors duration-200 hover:text-white" style={{ color: 'var(--txt2)', whiteSpace: 'nowrap' }}>
            All Insights →
          </a>
        </div>

        <div className="grid gap-px" style={{ gridTemplateColumns: '1.5fr 1fr', background: 'var(--border)' }}>
          <FeaturedInsightCard insight={featured} />
          <div className="flex flex-col" style={{ background: 'var(--bg2)' }}>
            {previews.map((preview) => (
              <MiniInsightCard key={preview.slug} insight={preview} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}

function FeaturedInsightCard({ insight }: { insight: Insight }) {
  const cat = CAT_STYLES[insight.categoryColor]

  return (
    <article
      className="hover-bg3 group relative overflow-hidden flex flex-col"
      style={{ background: 'var(--bg2)', padding: 34 }}
    >
      <div className="absolute top-0 left-0 bottom-0 w-[3px] origin-top scale-y-0 transition-transform duration-380 group-hover:scale-y-100" style={{ background: 'var(--blue)' }} aria-hidden="true" />
      {insight.isNew && (
        <div
          className="inline-flex items-center gap-[5px] text-[.6rem] font-bold tracking-[.1em] uppercase rounded-[3px] px-[9px] py-[3px] mb-3 self-start"
          style={{ color: 'var(--green)', background: 'rgba(0,214,122,.07)', border: '1px solid rgba(0,214,122,.18)' }}
        >
          <span className="w-[5px] h-[5px] rounded-full" style={{ background: 'var(--green)', animation: 'pulse-dot 2s infinite' }} aria-hidden="true" />
          New
        </div>
      )}
      <span
        className="inline-flex text-[.6rem] font-bold tracking-[.1em] uppercase px-2 py-[3px] rounded-[3px] mb-2.5 self-start"
        style={{ color: cat.color, background: cat.bg, border: `1px solid ${cat.border}` }}
      >
        {insight.category}
      </span>
      <h3 className="text-[1.05rem] font-bold tracking-[-0.02em] text-white leading-[1.3] mb-[9px]">
        {insight.title}
      </h3>
      <p className="text-[.58rem] font-bold tracking-[.1em] uppercase mb-[5px]" style={{ color: 'var(--txt3)', fontFamily: 'var(--font-mono)' }}>
        Executive Summary
      </p>
      <p className="text-[.8rem] leading-[1.65] flex-1 mb-2.5" style={{ color: 'var(--txt2)' }}>
        {insight.executiveSummary}
      </p>
      <div className="rounded-[4px] px-3 py-[9px] mb-3" style={{ background: 'rgba(255,149,0,.05)', border: '1px solid rgba(255,149,0,.14)' }}>
        <p className="text-[.57rem] font-bold tracking-[.1em] uppercase mb-[3px]" style={{ color: 'var(--amber)', fontFamily: 'var(--font-mono)' }}>
          Business Impact
        </p>
        <p className="text-[.76rem] leading-[1.5]" style={{ color: 'rgba(255,255,255,.6)' }}>{insight.businessImpact}</p>
      </div>
      <div className="flex items-center justify-between border-t pt-3 mt-auto" style={{ borderColor: 'var(--border)' }}>
        <p className="text-[.6rem]" style={{ color: 'var(--txt3)', fontFamily: 'var(--font-mono)' }}>
          {insight.publishedAt} · {insight.readingTime} min read
        </p>
        <a href={`/insights/${insight.slug}`} className="text-[.68rem] font-semibold" style={{ color: 'var(--blue)' }}>
          Read Full Analysis →
        </a>
      </div>
    </article>
  )
}

function MiniInsightCard({ insight }: { insight: InsightPreview }) {
  const cat = CAT_STYLES[insight.categoryColor]

  return (
    <article
      className="hover-bg3 group relative overflow-hidden flex flex-col justify-between flex-1 border-b last:border-b-0"
      style={{ background: 'var(--bg2)', padding: '22px 26px', borderColor: 'var(--border)' }}
    >
      <div className="absolute top-0 left-0 bottom-0 w-[3px] origin-top scale-y-0 transition-transform duration-380 group-hover:scale-y-100" style={{ background: 'var(--blue)' }} aria-hidden="true" />
      <div>
        <span
          className="inline-flex text-[.6rem] font-bold tracking-[.1em] uppercase px-2 py-[3px] rounded-[3px] mb-2.5"
          style={{ color: cat.color, background: cat.bg, border: `1px solid ${cat.border}` }}
        >
          {insight.category}
        </span>
        <h3 className="text-[.86rem] font-bold tracking-[-0.01em] text-white leading-[1.3] mb-[7px]">{insight.title}</h3>
        <p className="text-[.8rem] leading-[1.65]" style={{ color: 'var(--txt2)' }}>
          {insight.executiveSummary.slice(0, 120)}…
        </p>
      </div>
      <div className="flex items-center justify-between border-t pt-3 mt-3" style={{ borderColor: 'var(--border)' }}>
        <p className="text-[.6rem]" style={{ color: 'var(--txt3)', fontFamily: 'var(--font-mono)' }}>
          {insight.publishedAt} · {insight.readingTime} min read
        </p>
        <a href={`/insights/${insight.slug}`} className="text-[.68rem] font-semibold" style={{ color: 'var(--blue)' }}>
          Read →
        </a>
      </div>
    </article>
  )
}
