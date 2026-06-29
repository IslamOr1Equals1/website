# ADR 0008 — Services Page Architecture

**Date:** 2026-06-29
**Status:** Implemented
**Deciders:** Islam Elsayed
**Last updated:** 2026-06-30

---

## Context

The services page (`/services`) existed as a single `'use client'` prototype file (~1750 lines) containing all data, components, and rendering logic inline. This is acceptable for a prototype but violates every architectural principle in this codebase: Server Components by default, feature-first file structure, service layer abstraction, and no hardcoded content in components.

The services page is the highest-intent page on the site — the primary conversion surface for executives evaluating a security engagement. Its production architecture must match the quality of its content.

---

## Decision

Reimplement the services page as a production-quality feature using the same patterns established for the homepage.

### Component architecture

- `app/(marketing)/services/page.tsx` — async Server Component, fetches all data in parallel via `Promise.all()`, composes 15 section components
- **1 `'use client'` component total**: `StickyServiceNav` (requires IntersectionObserver, DOM interaction)
- `ContactButton` is a **Server Component** — modal is opened via `data-open-contact` attribute, delegated to the global `ModalProvider` click handler. No `useModal()` hook, no client boundary.
- All remaining 17 components are Server Components — zero client JS for rendering

### File structure

All services-page components live under `features/services-page/components/`. Constants under `features/services-page/constants.ts`.

### Data architecture

The `ConsultingService` interface in `services/consulting-services.service.ts` is extended with all fields required for the services page deep-dive: `slug`, `category`, `keyInsight`, `businessRisk`, `visualMoment`, `closingLine`, `scopeLabel`, `deliverables`, `executiveQuestions`, `typicalDuration`, `typicalOutput`, `outcomes`, `industryRelevance`.

This is a single source of truth: the same service objects power both the homepage `ServicesSection` (reads `number`, `iconName`, `name`, `description`, `scope`) and the services page deep-dive (reads the full shape).

### Service files created

| File | Purpose |
|---|---|
| `services/industry-expertise.service.ts` | 4-column industry verticals panel |
| `services/engagement-timeline.service.ts` | 6-phase engagement lifecycle |
| `services/faq.service.ts` | 12 executive FAQ items |
| `services/services-results.service.ts` | 3 case studies (services-page-specific, distinct from homepage) |

### Components created

| Component | Server/Client | Notes |
|---|---|---|
| `ContactButton` | Server | `data-open-contact` delegation; no client JS |
| `StickyServiceNav` | **Client** | IntersectionObserver; only `'use client'` component |
| `ServicesHero` | Server | Static content, stats |
| `ServiceNavigatorSection` | Server | CSS-only hover, native anchor scroll |
| `IndustryExpertiseSection` | Server | 4-column grid |
| `ServiceDeepDive` | Server | 5× rendered, inverted layout for indices ≥ 3 |
| `KeyInsightBlock` | Server | 5 visual variants keyed by slug |
| `RenderVisualMoment` | Server | Discriminated union switch |
| `MethodologySection` | Server | Static data co-located |
| `EngagementTimelineSection` | Server | 6-phase timeline |
| `ReportArchitectureSection` | Server | Static data co-located |
| `StandardsPanel` | Server | Static data co-located |
| `ServicesResultsSection` | Server | Receives `ServicesResultCard[]` |
| `IndependentExpertiseSection` | Server | Static data co-located |
| `GuaranteesSection` | Server | Static data co-located |
| `IdealClientSection` | Server | Static data co-located |
| `FaqSection` | Server | Native `<details>/<summary>`; zero JS |
| `ServicesCtaSection` | Server | Uses `ContactButton` |

### JSON-LD

`lib/seo/json-ld.ts` builds structured data with `@graph` wrapper, including `WebPage`, `Person`, and one `Service` schema per consulting service. Injected via `<script dangerouslySetInnerHTML>` in `page.tsx`.

### Responsive strategy

All multi-column grids receive `className` identifiers. Global CSS in `globals.css` applies `!important` overrides at 1024px and 640px breakpoints. Classes: `deep-dive-grid`, `navigator-grid`, `industry-grid`, `pillar-grid`, `guarantees-grid`, `differentiator-grid`, `ideal-grid`, `results-grid`, `standards-grid`.

### CSS variables

`--navbar-height: 62px` and `--sticky-nav-height: 50px` in `:root`. Used by sticky nav positioning and `scroll-margin-top: calc(var(--navbar-height) + var(--sticky-nav-height))` on deep-dive section anchors.

---

## Deviations from original spec

1. **`businessRisk: string[]` not `string`** — The approved prototype uses multiple paragraphs per service. Multi-paragraph shape preserved.

2. **`ServicesResultCard` type, not `WorkCard`** — The results section uses a completely different card design from the homepage security-impact section. `services-results.service.ts` returns `ServicesResultCard[]` with its own type. `lib/types/security-impact.types.ts` re-exports `WorkCard` for homepage use.

3. **vCISO omitted** — Removed from project before implementation. All constants and IDs reflect 5 services.

4. **`VisualMoment` co-located** — Defined in `consulting-services.service.ts` with the data it describes. Only one consumer; extraction adds indirection with no benefit.

5. **`ContactButton` is a Server Component** — Spec assumed `ContactButton` needed `'use client'` for modal. Solved via `ModalProvider` `[data-open-contact]` delegation pattern instead.

---

## Alternatives Considered

### Single-file page component (rejected)
The prototype approach. Violated Server Component principles, all data hardcoded, unmaintainable.

### Separate data file per service (rejected)
Over-engineered for 5 services with no programmatic generation.

---

## Consequences

- The services page renders with zero client JavaScript for all content — maximum Lighthouse performance
- One `'use client'` component versus the spec's maximum of 2 — better than budgeted
- Adding a sixth service requires editing one file (`consulting-services.service.ts`) — all section components pick it up automatically
- Prototype replaced entirely by Phase C
- `ConsultingService` interface is shared between homepage and services page; changes affect both
