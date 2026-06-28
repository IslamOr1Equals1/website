'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { contactSchema, type ContactFormValues } from '../schemas/contact.schema'
import { submitContactForm } from '@/services/contact.service'

interface ContactFormProps {
  onSuccess: () => void
}

export function ContactForm({ onSuccess }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  })

  async function onSubmit(data: ContactFormValues) {
    setIsSubmitting(true)
    setServerError(null)
    const result = await submitContactForm(data)
    setIsSubmitting(false)
    if (result.success) {
      onSuccess()
    } else {
      setServerError(result.message)
    }
  }

  const inputStyle = {
    width: '100%',
    background: 'rgba(255,255,255,.04)',
    border: '1px solid var(--border)',
    borderRadius: 5,
    color: '#fff',
    fontFamily: 'var(--font-inter)',
    fontSize: '.85rem',
    padding: '10px 14px',
    outline: 'none',
    transition: 'border-color .2s, background .2s',
  }

  const labelStyle = {
    display: 'block',
    fontSize: '.68rem',
    fontWeight: 700,
    letterSpacing: '.08em',
    textTransform: 'uppercase' as const,
    color: 'var(--txt2)',
    marginBottom: 7,
  }

  const errorStyle = { fontSize: '.65rem', color: 'var(--red)', marginTop: 4 }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      {/* Honeypot — must be hidden and empty */}
      <div style={{ position: 'absolute', left: '-9999px', tabIndex: -1 } as React.CSSProperties} aria-hidden="true">
        <input {...register('website')} type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 18 }}>
        <div>
          <label htmlFor="f-name" style={labelStyle}>Full Name</label>
          <input
            id="f-name"
            type="text"
            placeholder="Jane Smith"
            autoComplete="name"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'f-name-error' : undefined}
            style={inputStyle}
            {...register('name')}
            onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--blue)'; e.currentTarget.style.background = 'rgba(26,107,255,.04)' }}
            onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'rgba(255,255,255,.04)' }}
          />
          {errors.name && <p id="f-name-error" style={errorStyle} role="alert">{errors.name.message}</p>}
        </div>
        <div>
          <label htmlFor="f-company" style={labelStyle}>Company</label>
          <input
            id="f-company"
            type="text"
            placeholder="Acme Corp"
            autoComplete="organization"
            aria-invalid={!!errors.company}
            aria-describedby={errors.company ? 'f-company-error' : undefined}
            style={inputStyle}
            {...register('company')}
            onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--blue)'; e.currentTarget.style.background = 'rgba(26,107,255,.04)' }}
            onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'rgba(255,255,255,.04)' }}
          />
          {errors.company && <p id="f-company-error" style={errorStyle} role="alert">{errors.company.message}</p>}
        </div>
      </div>

      <div style={{ marginBottom: 18 }}>
        <label htmlFor="f-email" style={labelStyle}>Business Email</label>
        <input
          id="f-email"
          type="email"
          placeholder="jane@company.com"
          autoComplete="email"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'f-email-error' : undefined}
          style={inputStyle}
          {...register('email')}
          onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--blue)'; e.currentTarget.style.background = 'rgba(26,107,255,.04)' }}
          onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'rgba(255,255,255,.04)' }}
        />
        {errors.email && <p id="f-email-error" style={errorStyle} role="alert">{errors.email.message}</p>}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 18 }}>
        <div>
          <label htmlFor="f-size" style={labelStyle}>Company Size</label>
          <select
            id="f-size"
            aria-invalid={!!errors.companySize}
            style={{ ...inputStyle, cursor: 'pointer' }}
            {...register('companySize')}
            onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--blue)'; e.currentTarget.style.background = 'rgba(26,107,255,.04)' }}
            onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'rgba(255,255,255,.04)' }}
          >
            <option value="" disabled>Select size</option>
            <option value="1-10">1–10 employees</option>
            <option value="11-50">11–50 employees</option>
            <option value="51-200">51–200 employees</option>
            <option value="201-1000">201–1,000 employees</option>
            <option value="1000+">1,000+ employees</option>
          </select>
          {errors.companySize && <p style={errorStyle} role="alert">{errors.companySize.message}</p>}
        </div>
        <div>
          <label htmlFor="f-service" style={labelStyle}>Service Needed</label>
          <select
            id="f-service"
            aria-invalid={!!errors.service}
            style={{ ...inputStyle, cursor: 'pointer' }}
            {...register('service')}
            onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--blue)'; e.currentTarget.style.background = 'rgba(26,107,255,.04)' }}
            onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'rgba(255,255,255,.04)' }}
          >
            <option value="" disabled>Select service</option>
            <option value="web-app">Web Application Pentest</option>
            <option value="network-ad">Network &amp; Active Directory</option>
            <option value="cloud">Cloud Security Review</option>
            <option value="red-team">Red Team Engagement</option>
            <option value="advisory">Security Advisory</option>
            <option value="other">Other / Not Sure</option>
          </select>
          {errors.service && <p style={errorStyle} role="alert">{errors.service.message}</p>}
        </div>
      </div>

      <div style={{ marginBottom: 18 }}>
        <label htmlFor="f-message" style={labelStyle}>Tell Me About Your Environment</label>
        <textarea
          id="f-message"
          placeholder="Briefly describe what you're looking to assess — scope, timelines, compliance requirements, or any specific concerns."
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'f-message-error' : undefined}
          style={{ ...inputStyle, resize: 'vertical', minHeight: 100, lineHeight: 1.6 }}
          {...register('message')}
          onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--blue)'; e.currentTarget.style.background = 'rgba(26,107,255,.04)' }}
          onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'rgba(255,255,255,.04)' }}
        />
        {errors.message && <p id="f-message-error" style={errorStyle} role="alert">{errors.message.message}</p>}
      </div>

      <p className="text-[.68rem] leading-[1.6] mb-[22px]" style={{ color: 'var(--txt3)' }}>
        All enquiries are treated as confidential. NDA available on request before any details are discussed. Response within 24 hours.
      </p>

      {serverError && (
        <p className="text-[.78rem] mb-4 p-3 rounded-[5px]" style={{ color: 'var(--red)', background: 'rgba(255,68,102,.07)', border: '1px solid rgba(255,68,102,.18)' }} role="alert">
          {serverError}
        </p>
      )}

      <div className="flex flex-col gap-2.5">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex items-center justify-center gap-2 text-[.9rem] font-semibold text-white py-[13px] rounded-[5px] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
          style={{ background: 'var(--blue)' }}
          onMouseEnter={(e) => { if (!isSubmitting) e.currentTarget.style.background = 'var(--blue2)' }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--blue)' }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="M2 8l10 6 10-6" />
          </svg>
          {isSubmitting ? 'Sending…' : 'Book a Security Consultation'}
        </button>
        <p className="text-[.78rem] font-semibold text-center" style={{ color: 'var(--txt2)' }}>
          Prefer to reach out directly?{' '}
          <a href="mailto:islame.ahmed@outlook.com" className="transition-colors hover:text-white" style={{ color: 'var(--blue)' }} rel="noopener noreferrer">
            Email me directly →
          </a>
        </p>
      </div>
    </form>
  )
}
