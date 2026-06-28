export interface HeroStat {
  value: string
  label: string
}

export interface HeroCert {
  code: string
}

export interface HeroTickerItem {
  text: string
}

export interface HeroMetricCard {
  label: string
  value: string
  sub: string
  accentColor: 'red' | 'blue' | 'amber' | 'green'
}

export async function getHeroStats(): Promise<HeroStat[]> {
  return [
    { value: '200+', label: 'Security assessments completed' },
    { value: '12+', label: 'Years offensive security experience' },
    { value: '500+', label: 'Critical vulnerabilities discovered' },
    { value: '40+', label: 'Enterprise clients served' },
  ]
}

export async function getHeroCerts(): Promise<HeroCert[]> {
  return [
    { code: 'OSCP' },
    { code: 'CRTO' },
    { code: 'CEH' },
    { code: 'eWPTX' },
  ]
}

export async function getHeroTickerItems(): Promise<HeroTickerItem[]> {
  return [
    { text: 'FINANCIAL SERVICES' },
    { text: 'HEALTHCARE' },
    { text: 'FINTECH' },
    { text: 'SAAS' },
    { text: 'ENTERPRISE' },
    { text: 'GOVERNMENT' },
    { text: 'E-COMMERCE' },
    { text: 'CRITICAL INFRASTRUCTURE' },
    { text: 'CLOUD NATIVE' },
    { text: 'INSURANCE' },
  ]
}

export async function getHeroMetricCards(): Promise<HeroMetricCard[]> {
  return [
    { label: 'ACTIVE THREATS', value: '2,847', sub: 'monitored globally', accentColor: 'red' },
    { label: 'CVEs TRACKED', value: '47', sub: 'critical severity', accentColor: 'blue' },
    { label: 'PATCH LAG', value: '23d', sub: 'avg enterprise delay', accentColor: 'amber' },
    { label: 'DEFENSE SCORE', value: '94%', sub: 'client improvement', accentColor: 'green' },
  ]
}
