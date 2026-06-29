'use client'

import { useEffect, useState } from 'react'
import { STICKY_NAV_PILLS, SERVICE_DEEP_DIVE_IDS, SECTION_IDS } from '../constants'

export function StickyServiceNav() {
  const [visible, setVisible] = useState(false)
  const [activeId, setActiveId] = useState<string | null>(null)

  useEffect(() => {
    const navigatorEl = document.getElementById(SECTION_IDS.navigator)
    const lastSectionEl = document.getElementById(SERVICE_DEEP_DIVE_IDS[SERVICE_DEEP_DIVE_IDS.length - 1])

    if (!navigatorEl) return

    const showObserver = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0 },
    )
    showObserver.observe(navigatorEl)

    let hideObserver: IntersectionObserver | null = null
    if (lastSectionEl) {
      hideObserver = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting && entry.boundingClientRect.top < 0) setVisible(false)
        },
        { threshold: 0 },
      )
      hideObserver.observe(lastSectionEl)
    }

    const sectionEls = SERVICE_DEEP_DIVE_IDS
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)

    const activeObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id)
        }
      },
      { rootMargin: '-30% 0px -60% 0px' },
    )
    sectionEls.forEach((el) => activeObserver.observe(el))

    return () => {
      showObserver.disconnect()
      hideObserver?.disconnect()
      activeObserver.disconnect()
    }
  }, [])

  function handlePillClick(id: string) {
    const el = document.getElementById(id)
    if (!el) return
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    el.scrollIntoView({ behavior: reducedMotion ? 'instant' : 'smooth' })
    const heading = el.querySelector<HTMLElement>('[tabindex="-1"]')
    heading?.focus({ preventScroll: true })
  }

  return (
    <nav
      aria-label="Jump to service section"
      aria-hidden={!visible}
      className="sticky-service-nav"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        height: 'var(--sticky-nav-height)',
        background: 'rgba(6,11,23,0.95)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--border)',
        transform: visible
          ? 'translateY(var(--navbar-height))'
          : 'translateY(calc(var(--navbar-height) - 100% - 4px))',
        transition: 'transform 220ms cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      <div
        style={{
          maxWidth: 1180,
          margin: '0 auto',
          padding: '0 48px',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          overflowX: 'auto',
          scrollbarWidth: 'none',
        }}
      >
        {STICKY_NAV_PILLS.map((pill) => {
          const isActive = activeId === pill.id
          return (
            <button
              key={pill.id}
              onClick={() => handlePillClick(pill.id)}
              aria-current={isActive ? 'location' : undefined}
              tabIndex={visible ? 0 : -1}
              className="sticky-nav-pill"
              style={{
                flexShrink: 0,
                fontSize: '0.72rem',
                fontWeight: 600,
                padding: '5px 12px',
                borderRadius: '20px',
                border: '1px solid',
                borderColor: isActive ? 'var(--blue)' : 'var(--border)',
                background: isActive ? 'var(--blue3)' : 'transparent',
                color: isActive ? 'var(--blue)' : 'var(--txt2)',
                cursor: 'pointer',
                transition: 'all 150ms',
                fontFamily: 'inherit',
              }}
            >
              {pill.label}
            </button>
          )
        })}
      </div>
    </nav>
  )
}
