import { LAYOUT } from '@/lib/layout/constants'

interface ContainerProps {
  children: React.ReactNode
  /**
   * Override the default max-width.
   * Standard sections → 1180 (default)
   * Executive Briefing → LAYOUT.execContainerMaxWidth (1360)
   */
  maxWidth?: number
  /**
   * Override the horizontal padding inside the container.
   * Standard sections → 48 (default, matches .wrap{padding:0 48px})
   * Executive Briefing → LAYOUT.execContainerPaddingH (32)
   * Sections without inner padding (footer, meet-islam) → 0
   */
  paddingH?: number
  /** Extra top margin (e.g. trust strip: '36px auto 0') */
  marginTop?: number | string
  className?: string
  style?: React.CSSProperties
}

/**
 * Shared inner-section container.
 * Mirrors the HTML `.wrap` class: max-width, centered, with horizontal padding.
 *
 * HTML: .wrap { max-width:1180px; margin:0 auto; padding:0 48px }
 */
export function Container({
  children,
  maxWidth = LAYOUT.containerMaxWidth,
  paddingH = LAYOUT.containerPaddingH,
  marginTop,
  className,
  style,
}: ContainerProps) {
  return (
    <div
      className={className}
      style={{
        maxWidth,
        margin: marginTop != null ? `${marginTop}px auto 0` : '0 auto',
        padding: `0 ${paddingH}px`,
        ...style,
      }}
    >
      {children}
    </div>
  )
}
