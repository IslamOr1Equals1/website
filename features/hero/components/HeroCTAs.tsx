'use client'

import { useModal } from '@/providers/ModalProvider'

export function HeroCTAs() {
  const { openContact } = useModal()

  return (
    <div className="flex gap-2.5 mb-[36px] flex-wrap">
      <button
        onClick={openContact}
        className="inline-flex items-center gap-2 text-[.85rem] font-semibold text-white px-[22px] py-3 rounded-[6px] transition-all duration-200 hover:-translate-y-0.5"
        style={{ background: 'var(--blue)' }}
        onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--blue2)')}
        onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--blue)')}
        aria-label="Book a security consultation"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="M2 8l10 6 10-6" />
        </svg>
        Book a Consultation
      </button>
      <a
        href="#work"
        className="inline-flex items-center gap-2 text-[.85rem] font-semibold px-[22px] py-3 rounded-[6px] transition-all duration-200"
        style={{
          color: 'var(--txt2)',
          background: 'rgba(255,255,255,.04)',
          border: '1px solid var(--border)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(255,255,255,.08)'
          e.currentTarget.style.color = '#fff'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(255,255,255,.04)'
          e.currentTarget.style.color = 'var(--txt2)'
        }}
      >
        View Security Impact
      </a>
    </div>
  )
}
