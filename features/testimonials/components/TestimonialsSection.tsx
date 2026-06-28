'use client'

import type { Testimonial } from '@/services/testimonials.service'
import { Container } from '@/components/ui/Container'
import { LAYOUT } from '@/lib/layout/constants'

interface TestimonialsSectionProps {
  testimonials: Testimonial[]
}

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <div
      className="rounded-[8px] p-[22px_24px] flex flex-col flex-shrink-0 transition-[border-color] duration-250"
      style={{
        background: 'var(--bg3)',
        border: '1px solid var(--border)',
        width: 340,
      }}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--border2)')}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
    >
      <p className="text-[.7rem] tracking-[2px] mb-2.5" style={{ color: 'var(--amber)' }} aria-label="5 star rating">★★★★★</p>
      <blockquote className="text-[.8rem] leading-[1.72] flex-1 mb-3.5" style={{ color: 'var(--txt2)' }}>
        &ldquo;{t.quote}&rdquo;
      </blockquote>
      <div className="flex items-center gap-[9px] pt-3 border-t" style={{ borderColor: 'var(--border)' }}>
        <div
          className="w-[30px] h-[30px] rounded-full grid place-items-center text-[.6rem] font-bold flex-shrink-0"
          style={{
            background: 'linear-gradient(135deg,var(--blue3),rgba(26,107,255,.18))',
            border: '1px solid var(--border2)',
            color: 'var(--blue)',
          }}
          aria-hidden="true"
        >
          {t.authorInitials}
        </div>
        <div>
          <p className="text-[.76rem] font-bold text-white leading-none">{t.authorName}</p>
          <p className="text-[.62rem] mt-[2px]" style={{ color: 'var(--txt3)' }}>
            {t.authorRole}, {t.company}
          </p>
        </div>
      </div>
    </div>
  )
}

export function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  const row1 = testimonials.slice(0, Math.ceil(testimonials.length / 2))
  const row2 = testimonials.slice(Math.ceil(testimonials.length / 2))

  return (
    <section
      id="testimonials"
      style={{ padding: '90px 48px', background: 'var(--bg2)', borderTop: '1px solid var(--border)' }}
      aria-labelledby="testimonials-heading"
    >
      <Container>
        <div className="mb-[40px]">
          <p className="inline-flex items-center gap-2 text-[.68rem] font-bold tracking-[.12em] uppercase mb-2.5" style={{ color: 'var(--blue)' }}>
            <span className="w-4 h-px" style={{ background: 'var(--blue)' }} aria-hidden="true" />
            Client Testimonials
          </p>
          <h2 id="testimonials-heading" className="text-[clamp(1.55rem,2.8vw,2.3rem)] font-extrabold tracking-[-0.03em] text-white leading-[1.1]">
            What Clients Say
          </h2>
        </div>
      </Container>

      <div className="relative overflow-hidden" aria-label="Client testimonials">
        {/* Fade edges */}
        <div
          className="absolute top-0 bottom-0 left-0 w-[140px] z-[2] pointer-events-none"
          style={{ background: 'linear-gradient(90deg,var(--bg2),transparent)' }}
          aria-hidden="true"
        />
        <div
          className="absolute top-0 bottom-0 right-0 w-[140px] z-[2] pointer-events-none"
          style={{ background: 'linear-gradient(-90deg,var(--bg2),transparent)' }}
          aria-hidden="true"
        />

        {/* Row 1 — left */}
        <div
          className="flex gap-4 mb-4 w-max"
          style={{ animation: 'tst-left 55s linear infinite' }}
          onMouseEnter={(e) => (e.currentTarget.style.animationPlayState = 'paused')}
          onMouseLeave={(e) => (e.currentTarget.style.animationPlayState = 'running')}
        >
          {[...row1, ...row1].map((t, i) => (
            <TestimonialCard key={i} t={t} />
          ))}
        </div>

        {/* Row 2 — right */}
        <div
          className="flex gap-4 w-max"
          style={{ animation: 'tst-right 55s linear infinite' }}
          onMouseEnter={(e) => (e.currentTarget.style.animationPlayState = 'paused')}
          onMouseLeave={(e) => (e.currentTarget.style.animationPlayState = 'running')}
        >
          {[...row2, ...row2].map((t, i) => (
            <TestimonialCard key={i} t={t} />
          ))}
        </div>
      </div>

      {/* Trust strip */}
      <div
        className="flex items-center justify-center gap-9 flex-wrap mt-9 pt-7"
        style={{ maxWidth: LAYOUT.containerMaxWidth, margin: '36px auto 0', borderTop: '1px solid var(--border)' }}
      >
        {[
          'Fixed-fee engagements',
          'NDA before scoping',
          'Free re-test included',
          '24-hour response',
          '12+ years experience',
        ].map((item) => (
          <div key={item} className="flex items-center gap-[7px] text-[.72rem]" style={{ color: 'var(--txt3)' }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            {item}
          </div>
        ))}
      </div>
    </section>
  )
}
