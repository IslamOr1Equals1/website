export interface HeroStat {
  value: string
  label: string
}

export interface HeroCert {
  code: string
}

export interface HeroMetricCard {
  label: string
  value: string
  sub: string
  accentColor: 'red' | 'blue' | 'amber' | 'green'
}

export interface HeroTickerItem {
  text: string
}
