# Changelog

All milestones are recorded here chronologically. Future milestones should be appended at the bottom.

---

## [Unreleased]

_Planned: Services page._

---

## 2026-06-28 — Homepage Production Lock

**Milestone:** Homepage locked as production baseline following full production readiness review.

### Production Readiness Phases Completed

**Phase 3 — Build / Lint / TypeScript**
- `npm run build` passes clean (static homepage, dynamic API route)
- `npm run lint` passes with zero warnings
- TypeScript strict mode passes

**Phase 4 — Responsive QA**
- Fixed root cause of all mobile overflow: `html { overflow-x: hidden }` added to `globals.css`
- Added `@media (max-width: 1024px)` rules collapsing hero to single column, hiding globe, collapsing all section grids
- Added `@media (max-width: 640px)` rules for single-column footer and approach items
- Introduced semantic grid classes: `.sec-grid-3`, `.sec-grid-4`, `.meet-grid`, `.meet-approach`
- Added `id="hero-right"` targeting via `nth-child` selector to hide globe on mobile
- All 9 viewports verified: 320px, 375px, 390px, 414px, 768px, 1024px, 1280px, 1440px, 1920px — all pass

**Phase 5 — Accessibility QA**
- 0 issues found after fixes
- Added `<header>` landmark wrapping `<nav>` in `Navbar.tsx`
- Removed redundant `role="navigation"` from `<nav>` element
- Added `aria-label` with new-tab notice to LinkedIn and GitHub external links in Footer

**Phase 6 — Performance**
- Production metrics: TTFB 17ms, FCP 260ms, Load 55ms, CSS 7KB
- Deferred `ContactModal` + Zod (~330KB) via `LazyContactModal` (`next/dynamic` + `ssr: false`)
- Created `LazyContactModal.tsx` as client shell for the dynamic import
- Removed unused dependencies: `three`, `@types/three`, `framer-motion`, `next-themes` (12 packages removed)
- `ThemeProvider` was a dead passthrough (next-themes wrapper with forced dark theme) — replaced with fragment, then inlined away

**Phase 7 — Security**
- Added `X-XSS-Protection: 0` to `proxy.ts` (disables deprecated browser XSS auditor; CSP is the modern replacement)
- All 7 security headers now present: X-Frame-Options, X-Content-Type-Options, X-XSS-Protection, HSTS, CSP (nonce-based), Permissions-Policy, Referrer-Policy
- 0 DOM security issues
- `dangerouslySetInnerHTML` usage confirmed safe (static hardcoded service data only)

**Phase 8 — Code Quality**
- **Bug fix:** `data-open-contact` buttons in `ServiceCard` and `RiskMetricsPanel` had no click handler — clicks did nothing. Fixed by adding delegated click listener in `ModalProvider`.
- Converted 4 Client Components to Server Components by replacing JS hover with CSS classes: `ServiceCard`, `MethodCard`, `WorkCard`, `WhyCard`
- Removed `ThemeProvider` wrapper from `providers/index.tsx` (dead code after `next-themes` removal)

---

## 2026-06-28 — Hero Copy Implementation

**Milestone:** Approved hero copy implemented in `HeroLeft.tsx`.

### Changes
- Headline updated to: "Find the Attack Paths That Matter — Before Attackers Do"
- Supporting paragraph updated with executive-first framing targeting CEOs, CTOs, CISOs across fintech, healthcare, SaaS, enterprise
- Trust statement added: "Helping CEOs, CTOs, and CISOs uncover the attack paths that compliance audits and automated scanners often miss."
- Accountability statement added: "You work directly with me — from the first conversation to the final remediation review."
- Layout, typography, spacing, colors, and animations unchanged

---

## 2026-06-28 — Layout Spacing Audit and Fix

**Milestone:** All section wrapper spacing and container widths restored to match the approved HTML reference.

### Root Cause
An unlayered CSS reset (`* { margin: 0; padding: 0 }`) in `globals.css` was overriding all Tailwind `@layer utilities` margin classes (e.g., `mb-[44px]`), producing zero margin-bottom across all sections.

### Changes
- **`app/globals.css`** — Removed the unlayered `*, *::before, *::after` reset. Tailwind v4 preflight already provides this inside `@layer base`, so the unlayered version was redundant and destructive.
- **`features/meet-islam/components/MeetIslamSection.tsx`** — Fixed inner container: replaced bare `<div style={{ maxWidth, margin }}>` with `<Container>` to restore the `48px` horizontal padding.

### Verification
Post-fix audit confirmed: `headerComputedMarginBottom: 44px`, `inner padLeft: 48px`, all section gaps correct.

---

## 2026-06-28 — Content Expansion Pass

**Milestone:** All homepage sections populated with production-quality copy.

### Changes
- **Process steps** — All 4 steps expanded to 3-sentence descriptions with specific details
- **Approach items** — All 3 items in Meet Islam expanded with targeted copy
- **Bio** — 4th paragraph added addressing the CEO/CTO/CISO target audience explicitly
- **Security Impact case studies** — All 3 `challenge` fields expanded from 1 to 3 sentences
- **Trust reasons** — All 4 descriptions expanded with additional qualifying clause
- **Security Impact description** — Updated to clarify NDA and anonymisation

---

## 2026-06-XX — Homepage Implementation (Phase 1 Complete)

**Milestone:** Full homepage implemented, matching approved `is14m-v11.html` design reference.

### Sections Implemented
- Hero (HeroSection, HeroLeft, HeroRight, HeroGlobe, HeroCTAs, HeroStats, MetricCard, ThreatTicker)
- Industry Marquee
- Why Hire Me
- Services (ServicesSection, ServiceCard)
- Security Impact / Work (SecurityImpactSection, WorkCard)
- Methodology (MethodologySection, MethodCard)
- Executive Briefing (ExecutiveBriefingSection, ThreatSummaryPanel, RiskMetricsPanel, LiveIntelFeed)
- Process (ProcessSection)
- Meet Islam (MeetIslamSection, MeetIslamCTAs)
- Testimonials (TestimonialsSection, TestimonialsWrapper)
- Security Analysis (SecurityAnalysisSection)
- Trust Reasons (TrustReasonsSection)
- CTA (CtaSection, CtaButtons)
- Navbar (Navbar, NavbarClient)
- Footer

### Infrastructure Built
- Feature-first architecture established
- Service layer with mock data (API-shaped)
- Repository pattern (ContactRepository, InsightsRepository, ThreatIntelligenceRepository)
- CSP nonce-based security middleware (`proxy.ts`)
- Scroll reveal system (`.rv` class + `ScrollReveal` client component)
- `Container` shared layout component
- `LAYOUT` constants
- `buildMetadata()` SEO helper
- `ModalProvider` with contact modal
- Environment validation via `@t3-oss/env-nextjs`
- Resend integration for contact form email delivery
- Globe canvas animation (HeroGlobe)
- `features` flag system (`FF_GLOBE_ENABLED`)

---

_Future milestones will be appended below this line._
