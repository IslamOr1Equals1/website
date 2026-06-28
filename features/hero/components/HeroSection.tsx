import {
  getHeroCerts,
  getHeroMetricCards,
  getHeroStats,
  getHeroTickerItems,
} from '@/services/hero.service'
import { HeroLeft } from './HeroLeft'
import { HeroRight } from './HeroRight'
import { HeroStats } from './HeroStats'

export async function HeroSection() {
  const [certs, stats, metricCards, tickerItems] = await Promise.all([
    getHeroCerts(),
    getHeroStats(),
    getHeroMetricCards(),
    getHeroTickerItems(),
  ])

  return (
    <section
      id="hero"
      className="relative overflow-hidden"
      style={{
        minHeight: 'calc(100vh - 62px)',
        display: 'grid',
        gridTemplateColumns: '55fr 45fr',
        gap: 48,
        alignItems: 'center',
        padding: '80px 48px',
      }}
      aria-label="Hero"
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(26,107,255,.035) 1px,transparent 1px),linear-gradient(90deg,rgba(26,107,255,.035) 1px,transparent 1px)',
          backgroundSize: '56px 56px',
        }}
        aria-hidden="true"
      />
      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 65% at 28% 50%,rgba(26,107,255,.07) 0%,transparent 65%),' +
            'radial-gradient(ellipse at 50% 0%,rgba(26,107,255,.05),transparent 55%)',
        }}
        aria-hidden="true"
      />

      <HeroLeft certs={certs} />
      <HeroRight metricCards={metricCards} tickerItems={tickerItems} />
      <HeroStats stats={stats} />
    </section>
  )
}
