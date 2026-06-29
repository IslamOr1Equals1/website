import { ArrowRight } from 'lucide-react'

interface ContactButtonProps {
  label?: string
  /** Renders as a full-width block button when true */
  fullWidth?: boolean
  className?: string
}

/**
 * Server Component — modal is triggered by the global ModalProvider delegation
 * on [data-open-contact]. No client JS needed.
 */
export function ContactButton({
  label = 'Book a Free Consultation',
  fullWidth = false,
  className,
}: ContactButtonProps) {
  return (
    <button
      data-open-contact
      type="button"
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        width: fullWidth ? '100%' : undefined,
        background: 'var(--blue)',
        color: '#fff',
        padding: '14px 28px',
        borderRadius: '8px',
        fontSize: '0.9rem',
        fontWeight: 700,
        border: 'none',
        cursor: 'pointer',
        fontFamily: 'inherit',
        transition: 'background 150ms',
      }}
    >
      {label}
      <ArrowRight size={16} aria-hidden="true" />
    </button>
  )
}
