'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useModal } from '@/providers/ModalProvider'
import { siteConfig } from '@/config/site'
import { cn } from '@/lib/utils/cn'

const NAV_LINK_STYLE = {
  base: 'text-[.8rem] font-medium px-3 py-1.5 rounded-[5px] transition-colors duration-200',
  hover: 'hover:text-white hover:bg-[rgba(255,255,255,.05)]',
}

export function NavbarClient() {
  const [scrolled, setScrolled] = useState(false)
  const { openContact } = useModal()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={cn(
        'sticky top-0 z-[200] h-[62px] flex items-center justify-between',
        'px-12 transition-[border-color] duration-300',
        'backdrop-blur-[20px]',
      )}
      style={{
        background: 'rgba(6,11,23,.94)',
        borderBottom: `1px solid ${scrolled ? 'rgba(255,255,255,.1)' : 'var(--border)'}`,
      }}
      aria-label="Main navigation"
    >
      {/* Brand — links to homepage */}
      <Link
        href="/"
        className="flex items-center gap-2.5 focus-visible:outline-2 focus-visible:outline-[var(--blue)] focus-visible:outline-offset-4 rounded-[4px]"
        aria-label="Islam Ahmed — Home"
      >
        <div
          className="w-7 h-7 rounded-[4px] grid place-items-center flex-shrink-0"
          style={{ background: 'var(--blue)' }}
          aria-hidden="true"
        >
          <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="#fff" strokeWidth="2.2">
            <path d="M10 2L18 6v8l-8 4-8-4V6z" />
          </svg>
        </div>
        <span className="text-[.9rem] font-bold tracking-[-0.01em] text-white">
          Islam Ahmed{' '}
          <small className="font-normal text-[.8rem]" style={{ color: 'var(--txt3)' }}>
            · Security Consultant
          </small>
        </span>
      </Link>

      {/* Center nav — Link handles both routes (/services) and hash anchors (/#section) */}
      <div className="hidden md:flex items-center gap-0.5">
        {siteConfig.nav.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(NAV_LINK_STYLE.base, NAV_LINK_STYLE.hover)}
            style={{ color: 'var(--txt2)' }}
          >
            {link.label}
          </Link>
        ))}
        <Link
          href="/intelligence-hub"
          className="flex items-center gap-1.5 text-[.78rem] font-semibold px-3 py-[5px] rounded-[5px] ml-1.5 transition-all duration-200 hover:bg-[rgba(26,107,255,.12)] hover:border-[rgba(26,107,255,.4)]"
          style={{
            color: 'var(--blue)',
            border: '1px solid rgba(26,107,255,.25)',
            background: 'rgba(26,107,255,.06)',
          }}
        >
          Intelligence Hub
          <span className="text-[.72rem]" aria-hidden="true">→</span>
        </Link>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2.5">
        <div
          className="hidden sm:flex items-center gap-1.5 text-[.68rem] font-semibold tracking-[.05em] px-3 py-[5px] rounded-full"
          style={{
            color: 'var(--green)',
            background: 'rgba(0,214,122,.06)',
            border: '1px solid rgba(0,214,122,.18)',
          }}
          aria-label="Availability status: Available"
        >
          <span
            className="w-[5px] h-[5px] rounded-full flex-shrink-0"
            style={{ background: 'var(--green)', animation: 'pulse-dot 2s infinite' }}
            aria-hidden="true"
          />
          Available
        </div>
        <button
          onClick={openContact}
          className="text-[.8rem] font-semibold text-white px-[18px] py-2 rounded-[5px] transition-all duration-200 hover:bg-[var(--blue2)] hover:-translate-y-px focus-visible:outline-2 focus-visible:outline-[var(--blue)] focus-visible:outline-offset-2"
          style={{ background: 'var(--blue)' }}
          aria-label="Book a security consultation"
        >
          Book a Consultation
        </button>
      </div>
    </nav>
  )
}
