'use client'

import { useCallback, useEffect, useState } from 'react'
import { useModal } from '@/providers/ModalProvider'
import { ContactForm } from './ContactForm'

export function ContactModal() {
  const { isContactOpen, closeContact } = useModal()
  const [showSuccess, setShowSuccess] = useState(false)

  // Wraps closeContact so success state is always cleared on close,
  // regardless of which close path is triggered.
  const handleClose = useCallback(() => {
    setShowSuccess(false)
    closeContact()
  }, [closeContact])

  // Close on Escape
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape' && isContactOpen) handleClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [isContactOpen, handleClose])

  // Prevent body scroll when open
  useEffect(() => {
    document.body.style.overflow = isContactOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isContactOpen])

  if (!isContactOpen) return null

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center p-6"
      style={{ background: 'rgba(0,0,0,.75)', backdropFilter: 'blur(8px)' }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={(e) => { if (e.target === e.currentTarget) handleClose() }}
    >
      <div
        className="w-full relative overflow-y-auto rounded-[10px]"
        style={{
          background: 'var(--bg2)',
          border: '1px solid var(--border2)',
          maxWidth: 560,
          maxHeight: '90vh',
        }}
        role="document"
      >
        {/* Header */}
        <div
          className="flex items-start justify-between gap-4 px-8 py-7 border-b sticky top-0 z-[5]"
          style={{ background: 'var(--bg2)', borderColor: 'var(--border)' }}
        >
          <div>
            <h2 id="modal-title" className="text-[1.1rem] font-extrabold text-white tracking-[-0.02em]">
              Book a Security Consultation
            </h2>
            <p className="text-[.78rem] leading-[1.5] mt-1" style={{ color: 'var(--txt2)' }}>
              Tell me about your environment. I&apos;ll respond with a tailored scope proposal within 24 hours.
            </p>
          </div>
          <button
            onClick={handleClose}
            className="w-[30px] h-[30px] rounded-[5px] grid place-items-center flex-shrink-0 transition-all duration-200"
            style={{ border: '1px solid var(--border)', background: 'none', color: 'var(--txt2)' }}
            onMouseEnter={(e) => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.background = 'rgba(255,255,255,.06)' }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--txt2)'; e.currentTarget.style.background = 'none' }}
            aria-label="Close"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="px-8 py-6 pb-8">
          {showSuccess ? (
            <div className="text-center py-8" role="status" aria-live="polite">
              <div
                className="w-[52px] h-[52px] rounded-full grid place-items-center mx-auto mb-4"
                style={{ background: 'rgba(0,214,122,.1)', border: '1px solid rgba(0,214,122,.25)' }}
                aria-hidden="true"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h3 className="text-[1rem] font-bold text-white mb-2">Message Received</h3>
              <p className="text-[.82rem] leading-[1.7]" style={{ color: 'var(--txt2)' }}>
                I&apos;ll review your enquiry and respond with a tailored proposal within 24 hours.
                All conversations are treated as confidential.
              </p>
            </div>
          ) : (
            <ContactForm onSuccess={() => setShowSuccess(true)} />
          )}
        </div>
      </div>
    </div>
  )
}
