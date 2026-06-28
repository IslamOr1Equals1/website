'use client'

import { useModal } from '@/providers/ModalProvider'

export function MeetIslamCTAs() {
  const { openContact } = useModal()

  return (
    <div className="flex gap-3 items-center flex-wrap">
      <button
        onClick={openContact}
        className="inline-flex items-center gap-2 text-[.85rem] font-semibold text-white px-[22px] py-3 rounded-[6px] transition-all duration-200"
        style={{ background: 'var(--blue)' }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'var(--blue2)'
          e.currentTarget.style.transform = 'translateY(-2px)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'var(--blue)'
          e.currentTarget.style.transform = 'translateY(0)'
        }}
      >
        Work With Me
      </button>
      <a
        href={`mailto:islame.ahmed@outlook.com`}
        className="inline-flex items-center gap-2 text-[.85rem] font-semibold px-[22px] py-3 rounded-[6px] transition-all duration-200"
        style={{ color: 'var(--txt2)', background: 'rgba(255,255,255,.04)', border: '1px solid var(--border)' }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(255,255,255,.08)'
          e.currentTarget.style.color = '#fff'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(255,255,255,.04)'
          e.currentTarget.style.color = 'var(--txt2)'
        }}
        rel="noopener noreferrer"
      >
        Email Directly
      </a>
    </div>
  )
}
