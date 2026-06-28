/**
 * Layout design tokens — mirrors the approved is14m-v11.html spacing system.
 *
 * HTML reference:
 *   .wrap { max-width: 1180px; margin: 0 auto; padding: 0 48px }
 *   #exec-briefing .wrap { max-width: 1360px; padding: 0 32px }
 *   Section-level horizontal padding: 48px (matches .wrap's viewport clearance)
 */

export const LAYOUT = {
  /** Inner container max-width used across all standard sections (.wrap) */
  containerMaxWidth: 1180,

  /** Inner container horizontal padding (.wrap padding: 0 48px) */
  containerPaddingH: 48,

  /** Executive Briefing section uses a wider container */
  execContainerMaxWidth: 1360,
  execContainerPaddingH: 32,

  /** Horizontal padding on the <section> element itself */
  sectionPaddingH: 48,

  /** Vertical padding — standard sections */
  sectionPaddingV: 90,

  /** Vertical padding — Why Hire Me section (80px per approved HTML) */
  whyHirePaddingV: 80,

  /** Vertical padding — CTA section (100px per approved HTML) */
  ctaPaddingV: 100,

  /** Footer vertical padding */
  footerPaddingTop: 52,
  footerPaddingBottom: 28,

  /** Standard s-hdr margin-bottom */
  sectionHeaderMarginBottom: 44,

  /** .s-label margin-bottom */
  labelMarginBottom: 10,
} as const
