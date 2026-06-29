# Changelog

All notable changes to this project are documented here.

Format: [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)
Versioning: [Semantic Versioning](https://semver.org/spec/v2.0.0.html)

---

## [Unreleased]

### Planned
- Services page (Phase 2)
- Intelligence Hub (Phase 3)

---

## [1.0.0] — 2026-06-28

**Homepage v1.0.0 — Production Lock**

This release locks the homepage as the production baseline following successful completion of all 8 quality phases. See [ADR-0006](adr/0006-homepage-release-v1.0.0.md) for the full gate-by-gate review record.

### Documentation
- Created `docs/adr/` with 7 Architecture Decision Records (ADRs 0001–0007)
- Created `docs/PRD.md` — Product Requirements Document
- Created `docs/ENGINEERING_PRINCIPLES.md` — 16 engineering principles
- Created `docs/API_INTEGRATIONS.md` — all current and planned API integration specs
- Created `docs/THREAT_INTELLIGENCE_ARCHITECTURE.md` — 7-layer threat intel system design
- Created `docs/CODING_STANDARDS.md` — naming, formatting, and structural conventions
- Created `docs/SECURITY_MODEL.md` — complete security model and threat model
- Created `docs/QUALITY_GATES.md` — 8 mandatory quality gates with pass/fail criteria
- Created `docs/README.md` — documentation index
- Replaced root `README.md` boilerplate with project-specific overview
- Restructured `CHANGELOG.md` to Keep a Changelog format

### Security
- Added `X-XSS-Protection: 0` header to `proxy.ts` — disables the deprecated browser XSS auditor; the nonce-based CSP is the modern replacement

### Performance
- Deferred `ContactModal` + Zod (~330KB) via `LazyContactModal` using `next/dynamic` with `ssr: false`
- Removed unused dependencies: `three`, `@types/three`, `framer-motion`, `next-themes` (12 packages total)

### Fixed
- `data-open-contact` buttons on `ServiceCard` and `RiskMetricsPanel` had no click handler — clicks were silently swallowed. Fixed by adding a delegated click listener in `ModalProvider`
- `html { overflow-x: hidden }` added — `body`-only declaration was insufficient; `document.documentElement.scrollWidth` reflected child overflow even when visually clipped
- Hero globe not hiding on mobile — added `@media (max-width: 1024px)` rules targeting `#hero > *:nth-child(4)`

### Changed
- Converted 4 Client Components to Server Components: `ServiceCard`, `MethodCard`, `WorkCard`, `WhyCard` — replaced `onMouseEnter`/`onMouseLeave` with CSS `.hover-bg2` / `.hover-bg3` classes
- `ThemeProvider` was a dead passthrough after `next-themes` removal — replaced with fragment, then removed from `providers/index.tsx`
- Added `<header>` landmark wrapping `<nav>` in `Navbar.tsx`; removed redundant `role="navigation"` attribute
- Added `aria-label` with "(opens in new tab)" notice to LinkedIn and GitHub external links in Footer

---

## [0.5.0] — 2026-06-28

**Responsive QA — All Viewports Verified**

### Fixed
- Removed unlayered CSS reset (`* { margin: 0; padding: 0 }`) from `globals.css` that was overriding all Tailwind margin utilities. Root cause of all spacing regressions across the homepage.
- Added `@media (max-width: 1024px)` responsive rules — single-column hero, collapsed section grids
- Added `@media (max-width: 640px)` responsive rules — single-column footer, approach items
- `MeetIslamSection` inner container restored to use `<Container>` component (restoring 48px padding)

### Added
- Semantic grid classes: `.sec-grid-3`, `.sec-grid-4`, `.meet-grid`, `.meet-approach` — enable CSS media query targeting
- Applied grid classes to: `WhyHireMeSection`, `ServicesSection`, `SecurityImpactSection`, `MethodologySection`, `TrustReasonsSection`, `ProcessSection`, `MeetIslamSection`

### Verification
All 9 viewports verified: 320px, 375px, 390px, 414px, 768px, 1024px, 1280px, 1440px, 1920px — zero horizontal overflow.

---

## [0.4.0] — 2026-06-28

**Content Expansion Pass — Production Copy**

### Changed
- Hero headline: "Find the Attack Paths That Matter — Before Attackers Do"
- Hero body copy updated with executive-first framing targeting CEOs, CTOs, CISOs
- Process steps — all 4 expanded to 3-sentence descriptions
- Meet Islam approach items — all 3 expanded with targeted copy
- Meet Islam bio — 4th paragraph added addressing target audience
- Security Impact case studies — all 3 challenge fields expanded to 3 sentences
- Trust reasons — all 4 descriptions expanded
- Security Impact description updated to clarify NDA and anonymisation

---

## [0.3.0] — 2026-06-28

**Project Governance and Workflow Established**

### Added
- `docs/PROJECT_ROADMAP.md` — vision, phases, page table, API integrations
- `docs/ARCHITECTURE.md` — technical architecture reference
- `docs/DESIGN_SYSTEM.md` — design tokens, typography, grid system
- `docs/DECISIONS.md` — 18 major decisions with rationale
- `docs/DEVELOPMENT_WORKFLOW.md` — 11-step page lifecycle, Definition of Done
- Production engineering workflow established: plan → file list → rationale → risk → approval → implement → quality gates → documentation → declaration

---

## [0.2.0] — 2026-06-28

**Infrastructure and Service Layer**

### Added
- Feature-first architecture (`features/`)
- Service layer with mock data shaped for future API wiring (`services/`)
- Repository pattern — `ContactRepository`, `InsightsRepository`, `ThreatIntelligenceRepository`
- CSP nonce-based security middleware (`proxy.ts`)
- `Container` shared layout component with max-width 1180px and 48px padding
- `LAYOUT` constants (`lib/layout/constants.ts`)
- `buildMetadata()` SEO helper (`lib/seo/metadata.ts`)
- `ModalProvider` with delegated click handler for `[data-open-contact]`
- Environment validation via `@t3-oss/env-nextjs` (`lib/env/index.ts`)
- Resend integration for contact form email delivery
- Integration client stubs for: CISA, NVD, ThreatFox, GitHub Advisories, AbuseIPDB, Shodan, VirusTotal, Exploit-DB, OpenCTI, AlienVault OTX, Calendly
- CSS hover utilities: `.hover-bg2`, `.hover-bg3`
- Feature flag system (`FF_GLOBE_ENABLED`)
- Scroll reveal system (`.rv` class + `ScrollReveal`)

---

## [0.1.0] — 2026-06-28

**Homepage Implementation — All Sections**

### Added
Full homepage implementation matching the approved `is14m-v11.html` design reference:
- Hero (HeroSection, HeroLeft, HeroRight, HeroGlobe, HeroCTAs, HeroStats, MetricCard, ThreatTicker)
- Industry Marquee
- Why Hire Me (WhyHireMeSection, WhyCard)
- Services (ServicesSection, ServiceCard)
- Security Impact (SecurityImpactSection, WorkCard)
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

---

[Unreleased]: https://github.com/is14m/consulting-platform/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/is14m/consulting-platform/compare/v0.5.0...v1.0.0
[0.5.0]: https://github.com/is14m/consulting-platform/compare/v0.4.0...v0.5.0
[0.4.0]: https://github.com/is14m/consulting-platform/compare/v0.3.0...v0.4.0
[0.3.0]: https://github.com/is14m/consulting-platform/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/is14m/consulting-platform/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/is14m/consulting-platform/releases/tag/v0.1.0
