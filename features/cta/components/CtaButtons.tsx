'use client'

import { useModal } from '@/providers/ModalProvider'

export function CtaButtons() {
  const { openContact } = useModal()

  return (
    <div className="flex gap-3 justify-center flex-wrap">
      <button
        onClick={openContact}
        className="inline-flex items-center gap-2 text-[.9rem] font-semibold text-white px-7 py-[13px] rounded-[6px] transition-all duration-200"
        style={{ background: 'var(--blue)' }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'var(--blue2)'
          e.currentTarget.style.transform = 'translateY(-2px)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'var(--blue)'
          e.currentTarget.style.transform = 'translateY(0)'
        }}
        aria-label="Book a security consultation"
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="M2 8l10 6 10-6" />
        </svg>
        Book a Security Consultation
      </button>
      <a
        href="#services"
        className="inline-flex items-center gap-2 text-[.9rem] font-semibold px-7 py-[13px] rounded-[6px] transition-all duration-200"
        style={{ color: 'var(--txt2)', background: 'rgba(255,255,255,.04)', border: '1px solid var(--border)' }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(255,255,255,.08)'
          e.currentTarget.style.color = '#fff'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(255,255,255,.04)'
          e.currentTarget.style.color = 'var(--txt2)'
        }}
      >
        View Services
      </a>
    </div>
  )
}
