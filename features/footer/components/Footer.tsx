import Link from 'next/link'
import { siteConfig } from '@/config/site'
import { LAYOUT } from '@/lib/layout/constants'

const FOOTER_LINKS = {
  Services: [
    { label: 'Web Application Pentest', href: '/services#service-web-app' },
    { label: 'Network & Active Directory', href: '/services#service-network-ad' },
    { label: 'Cloud Security Review', href: '/services#service-cloud' },
    { label: 'Red Team Engagement', href: '/services#service-red-team' },
    { label: 'Secure Code Review', href: '/services#service-code-review' },
  ],
  Company: [
    { label: 'About', href: '/#meet-islam' },
    { label: 'Security Insights', href: '/#security-analysis' },
    { label: 'Intelligence Hub', href: '/intelligence-hub' },
    { label: 'Contact', href: '/#cta' },
  ],
}

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer style={{ background: 'var(--bg2)', borderTop: '1px solid var(--border)', padding: '52px 48px 28px' }}>
      <div className="grid" style={{ maxWidth: LAYOUT.containerMaxWidth, margin: '0 auto 36px', display: 'grid', gridTemplateColumns: '260px 1fr 1fr 200px', gap: 44 }}>
        {/* Brand */}
        <div>
          <p className="text-[.95rem] font-bold text-white mb-[3px] tracking-[-0.01em]">{siteConfig.name}</p>
          <p className="text-[.72rem] mb-2.5 font-medium" style={{ color: 'var(--txt3)' }}>Offensive Security Consultant</p>
          <p className="text-[.76rem] leading-[1.7] max-w-[210px] mb-4" style={{ color: 'var(--txt3)' }}>
            Helping organisations stop breaches before attackers find the gap.
          </p>
          <div
            className="flex items-center gap-[7px] text-[.68rem] font-semibold mb-3.5"
            style={{ color: 'var(--green)' }}
            aria-label="Availability status: Available for new engagements"
          >
            <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: 'var(--green)', animation: 'pulse-dot 2s infinite' }} aria-hidden="true" />
            Available for New Engagements
          </div>
          <div className="flex gap-1.5 flex-wrap">
            {[
              { label: 'LinkedIn', href: siteConfig.socials.linkedin },
              { label: 'GitHub', href: siteConfig.socials.github },
              { label: 'Email', href: `mailto:${siteConfig.author.email}` },
            ].map((soc) => {
              const isExternal = soc.href.startsWith('http')
              return (
                <a
                  key={soc.label}
                  href={soc.href}
                  className="text-[.68rem] font-semibold px-2.5 py-1 rounded-[4px] transition-all duration-200 hover:text-white hover:border-[rgba(255,255,255,.2)]"
                  style={{ color: 'var(--txt3)', border: '1px solid var(--border)' }}
                  {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  aria-label={isExternal ? `${soc.label} (opens in new tab)` : undefined}
                >
                  {soc.label}
                </a>
              )
            })}
          </div>
        </div>

        {/* Link columns */}
        {Object.entries(FOOTER_LINKS).map(([title, links]) => (
          <div key={title}>
            <p className="text-[.65rem] font-bold tracking-[.12em] uppercase mb-3.5" style={{ color: 'var(--txt3)' }}>
              {title}
            </p>
            <nav className="flex flex-col gap-[9px]" aria-label={`${title} links`}>
              {links.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-[.8rem] transition-colors duration-200 hover:text-white"
                  style={{ color: 'var(--txt3)' }}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        ))}

        {/* CTA column */}
        <div className="flex flex-col">
          <p className="text-[.65rem] font-bold tracking-[.12em] uppercase mb-3.5" style={{ color: 'var(--txt3)' }}>
            Start a Conversation
          </p>
          <a
            href={`mailto:${siteConfig.author.email}`}
            className="text-center text-[.78rem] font-semibold py-[9px] px-3.5 rounded-[5px] mb-2.5 transition-all duration-200 hover:border-[rgba(26,107,255,.5)] hover:bg-[rgba(26,107,255,.1)]"
            style={{ color: 'var(--blue)', border: '1px solid rgba(26,107,255,.3)', background: 'rgba(26,107,255,.05)' }}
          >
            Send an Email →
          </a>
          <p className="text-[.64rem] leading-[1.6] mt-1.5" style={{ color: 'var(--txt3)' }}>
            NDA available before any scope discussion. Response within 24 hours.
          </p>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="flex justify-between items-center flex-wrap gap-2.5 pt-[22px] border-t"
        style={{ maxWidth: LAYOUT.containerMaxWidth, margin: '0 auto', borderColor: 'var(--border)' }}
      >
        <p className="text-[.68rem]" style={{ color: 'rgba(255,255,255,.18)', fontFamily: 'var(--font-mono)' }}>
          © {year} Islam Ahmed. All rights reserved.
        </p>
        <p className="text-[.68rem]" style={{ color: 'rgba(255,255,255,.18)', fontFamily: 'var(--font-mono)' }}>
          Offensive Security Consultant · London, UK
        </p>
      </div>
    </footer>
  )
}
