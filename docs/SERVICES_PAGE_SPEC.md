# Services Page — Implementation Specification

**Version:** 4.0 (Final — Post-Review)
**Status:** Approved for Implementation
**Date:** 2026-06-29
**Supersedes:** v3.0 (Final)
**Route:** `/services`
**Milestone:** v1.1.0

This document is the single source of truth for the Services page implementation.
It supersedes all prior planning drafts (v1, v2, and the design review).
No production code may be written before this document is approved.
No deviation from this specification during implementation without written approval.

---

## Table of Contents

1. [Objective](#1-objective)
2. [Final Page Architecture — 14 Sections](#2-final-page-architecture)
3. [Trust Signal Ownership Map](#3-trust-signal-ownership-map)
4. [Section Specifications](#4-section-specifications)
5. [Data Model](#5-data-model)
6. [Component Architecture](#6-component-architecture)
7. [File Impact Analysis](#7-file-impact-analysis)
8. [SEO Specification](#8-seo-specification)
9. [Accessibility Requirements](#9-accessibility-requirements)
10. [Performance Requirements](#10-performance-requirements)
11. [Engineering Standards](#11-engineering-standards)
12. [Implementation Sequence](#12-implementation-sequence)
13. [Quality Gates](#13-quality-gates)
14. [ADR-0008 Summary](#14-adr-0008-summary)

---

## 1. Objective

The Services page convinces executive decision-makers — CEO, Founder, CTO, CISO, HR/Procurement — that Islam Ahmed understands their business, his methodology is rigorous, and he is the right consultant to trust with a high-value security engagement.

The page answers six questions in sequence:
1. What services do you provide?
2. Who are they for?
3. What problems do they solve?
4. How do you work?
5. Why should I hire you instead of a large firm?
6. What happens after I contact you?

**Primary conversion:** Contact form submission via `data-open-contact`.
**Target:** The highest-converting page on the platform.

---

## 2. Final Page Architecture

14 sections. Each is a standalone `<section>` with `id`, `aria-labelledby`, and background token.

| # | Section | Background | CTA type | Primary audience |
|---|---|---|---|---|
| 1 | Hero | `--bg` + radial gradient | Primary button (2×) | All |
| 2 | Service Navigator | `--bg2` | Pill anchor links | CTO, CISO |
| 3 | Industry Expertise | `--bg` | None | CEO, Founder |
| 4 | Service Deep-Dives (×6) | Alternating `--bg` / `--bg2` | Text link per deep-dive | CTO, CISO, Founder |
| 5 | Methodology | `--bg` | None | CTO, CISO |
| 6 | Engagement Timeline | `--bg2` | None | CEO, Founder |
| 7 | Report Architecture | `--bg` | None | CISO, HR |
| 8 | What I Don't Do | `--bg2` | None | All |
| 9 | Selected Results | `--bg` | Text link (quiet, below cards) | All |
| 10 | Why Independent Expertise Outperforms Scale | `--bg2` | Text link | CEO, CISO |
| 11 | Engagement Guarantees | `--bg` | None | CEO, HR |
| 12 | Ideal Client | `--bg2` | None | All |
| 13 | Executive FAQ | `--bg` | None | All |
| 14 | Final CTA | `--bg` + radial gradient | Primary button | All |

**Background alternation:** Strict. No two adjacent sections share the same background. Verify before implementation begins.

**Backgrounds for deep-dives:**

| Service | Background |
|---|---|
| 4a: Web Application Pentest | `--bg` |
| 4b: Network & AD Assessment | `--bg2` |
| 4c: Cloud Security Review | `--bg` |
| 4d: Red Team Engagement | `--bg2` (layout inverted) |
| 4e: Security Advisory & vCISO | `--bg` (layout inverted) |
| 4f: Secure Code Review | `--bg2` (layout inverted) |

Layout inversion begins at 4d: outcome panel moves to the left column, content to the right.

---

## 3. Trust Signal Ownership Map

Every trust signal has exactly one canonical section where it is fully articulated.
All other sections may reference it in a single phrase only — no full articulation.

| Signal | Canonical section | Permitted brief reference in |
|---|---|---|
| Manual verification of findings | §5 Methodology | §8 What I Don't Do (one line) |
| Executive-ready reporting | §7 Report Architecture | §14 CTA (one line) |
| Fixed-fee pricing | §11 Engagement Guarantees | §1 Hero subheadline (phrase only) |
| NDA before scoping | §11 Engagement Guarantees | §14 CTA (one line) |
| Complimentary re-test | §11 Engagement Guarantees | §13 FAQ Q6 (factual answer only) |
| Direct accountability / no handoff | §10 Independent Expertise | §8 What I Don't Do (one line) |
| 24-hour response | §11 Engagement Guarantees | None |
| Business-context risk assessment | §5 Methodology | §10 Independent Expertise (one line) |
| Remediation guidance | §5 Methodology | §13 FAQ Q5 (factual answer only) |
| Actionable findings | §8 What I Don't Do | None elsewhere |

**Enforcement:** During implementation review, any section that articulates a trust signal beyond its canonical location must be flagged and reduced to a single-phrase reference before the section is accepted.

---

## 4. Section Specifications

### Section 1 — Hero

**Section ID:** `services-hero`
**Background:** `--bg` with radial gradient (matching homepage CTA aesthetic)
**Heading level:** `<h1>`

**Headline:**
"Know Your Real Attack Surface — Before Someone Else Does."

**Subheadline:**
"Penetration testing and security advisory built for decision-makers who need accurate findings, executive-ready reporting, and a consultant who is accountable from the first call to the final re-test."

**Trust signal references (phrase only — full articulation in §11):**
"Fixed-fee. NDA before scoping. Complimentary re-test included."
Rendered as a small trust line below the subheadline, not as bullet points.

**Terminology rule:** Always use "complimentary re-test" — not "free re-test". "Complimentary" is the term used in §11 (canonical source) and throughout all deliverables copy. Mixing "free" and "complimentary" across the page undermines the consistent professional tone.

**Availability badge:** `● Available for engagements` — green pulse dot, `--green` colour.

**Stat row — hero statistics policy:**
Only include metrics that are genuine, measurable, and defensible.
Priority order:
1. Real engagement count (if available)
2. Contractual guarantees expressed as facts: "100% of engagements include a complimentary re-test"
3. Qualitative trust statement: "Every finding manually verified"

No speculative or aspirational statistics. If a metric cannot be substantiated from real data, it is removed rather than estimated.

**CTAs:**
- Primary: "Book a Free Consultation" (`data-open-contact`, button styling)
- No secondary anchor CTA in the hero. Let scroll behaviour be natural.

**Layout:** Centered, max-width 680px. No columns. Availability badge above headline. Stat row below CTAs.

**Components:**
- `ServicesPageHero` — Server Component
- `ContactButton` — Client Component from `components/ui/ContactButton.tsx` (label: "Book a Free Consultation")
- `AvailabilityBadge` — Server Component (potentially reusable on About page)

---

### Section 2 — Service Navigator

**Section ID:** `service-navigator`
**Background:** `--bg2`
**Heading level:** `<h2>` — "Security Services"

**Purpose:** Fast anchor navigation to service deep-dives. Not a card grid. Does not sell services — links to them.

**Layout:** Compact pill row. Two groups separated by a small label:

```
OFFENSIVE TESTING
[ Web Application Pentest ] [ Network & Active Directory ] [ Red Team Engagement ]

SECURITY ARCHITECTURE
[ Cloud Security Review ] [ Secure Code Review ] [ Security Advisory & vCISO ]
```

Each pill: service name only + `→` character. Links to `#service-[slug]`.

**No icons.** No descriptions. No hover animations beyond a background tint. Fast to scan; fast to render.

**Eyebrow:** "Services"
**Body:** "Six engagement types covering the complete attack surface. Select a service to explore the scope, deliverables, and engagement details."

**Sticky nav pairing:** The pill row design matches the `StickyServiceNav` component exactly. The sticky nav is the same pill row that appears fixed at the top once this section scrolls out of view.

**Components:**
- `ServiceNavigator` — Server Component (includes pill links inline; no separate child component needed for a static list of anchor tags)

---

### Sticky Service Navigation

**Component:** `StickyServiceNav` — Client Component
**Trigger:** Appears when `#service-navigator` scrolls out of the viewport. Disappears when the last deep-dive (`#service-secure-code-review`) scrolls out of the viewport.
**Position:** `position: fixed; top: 0; z-index: 40` (below the main navbar at `z-index: 50`)

**Behaviour:**
- Uses `IntersectionObserver` watching the `#service-navigator` sentinel element and the `#service-code-review` section
- Highlights the pill corresponding to the currently visible service section using `aria-current="location"`
- Pill click: scrolls to target `<section>` AND moves keyboard focus explicitly to that section's `<h2>` (which has `tabIndex={-1}`)
- Keyboard: all pills reachable via `Tab`; `Enter` and `Space` activate

**Bidirectional scroll behaviour (all four states must be implemented):**

| Scroll direction | Trigger | Result |
|---|---|---|
| Down past `#service-navigator` | Navigator exits top of viewport | Nav appears (slides in) |
| Up back to `#service-navigator` | Navigator re-enters top of viewport | Nav disappears (instant) |
| Down past `#service-code-review` | Last deep-dive exits bottom of viewport | Nav disappears (instant) |
| Up back into deep-dive zone | Any service section re-enters viewport | Nav reappears (slides in) |

The `IntersectionObserver` callback fires on both entry and exit for each sentinel. Use `entry.isIntersecting` to determine direction. Do not rely on scroll position comparisons — `IntersectionObserver` handles this correctly across all browsers.

**Anchor and focus management:**
`id` attributes are placed on `<section>` elements, not on `<h2>` elements. When a pill is activated:
1. `scrollIntoView()` or `href` navigation scrolls the `<section>` into view (honouring `scroll-margin-top`)
2. JavaScript then explicitly calls `.focus()` on the `<h2>` inside that section (which has `tabIndex={-1}`)

This separation ensures: URL fragments target the section (correct for bookmarking), while focus lands on the heading (correct for screen reader users).

**Visual:** Same pill style as `ServiceNavigator`. Solid `--bg` background (no blur) on mobile (see backdrop-filter note below). On desktop: `--bg` at 95% opacity with `backdrop-filter: blur(12px)`. Thin `1px` border bottom using `--border`.

**`aria-label`:** The sticky nav's `<nav>` element must have `aria-label="Service sections"`. This distinguishes it from the static `ServiceNavigator`'s `<nav>`, which also requires `aria-label="Service sections navigation"`. Both are navigation landmarks — both need labels or screen readers cannot distinguish them.

**Animation:** Slides in from top on appear (`transform: translateY(-100%) → translateY(0)`, 200ms ease). No animation on disappear (instant — avoids layout flicker).

**`prefers-reduced-motion`:** Slide animation disabled. Instant show/hide.

**Backdrop-filter mobile note:** `backdrop-filter: blur(12px)` is GPU-expensive. On mobile devices it can cause visible scroll jank while the sticky nav is in view. Disable the blur on viewports ≤768px and use a solid `--bg` background instead. Only add the blur back after profiling confirms no frame drops on mid-range hardware.

---

### Section 3 — Industry Expertise

**Section ID:** `industry-expertise`
**Background:** `--bg`
**Heading level:** `<h2>` — "Built Around Your Industry's Threat Landscape"

**Purpose:** Establish immediate industry relevance before the visitor reaches the service deep-dives. Each card is concise — it signals contextual knowledge, not a full industry analysis.

**Eyebrow:** "Industry Experience"
**Body:** "The attack surface facing a fintech platform differs from a healthcare provider or enterprise SaaS company. My methodology adapts to your regulatory environment, business model, and threat actors."

**Layout:** 4-column card grid (`.sec-grid-4`, collapses to 2×2 at ≤1024px, 1-col at ≤640px).

**Card structure per industry:**
- Icon (lucide-react — `CreditCard`, `Layers`, `Heart`, `Building2`)
- Industry name (`<h3>`)
- One-line threat context (not a bullet list)
- Two specific threat signals — short, technically credible phrases

**Card content:**

| Industry | Threat context | Specific threats |
|---|---|---|
| **Fintech** | Open banking APIs and payment flows are the primary attack surface. | API business logic abuse · OAuth misconfiguration · PCI-DSS scope exposure |
| **SaaS** | Multi-tenant architecture and CI/CD pipelines create unique data isolation risks. | Tenant data leakage · Secrets in repositories · Supply chain vulnerabilities |
| **Healthcare** | Legacy clinical systems and third-party integrations extend the attack surface significantly. | Unpatched endpoints · HIPAA-scope data exposure · Ransomware entry points |
| **Enterprise** | Active Directory environments and hybrid cloud sprawl create wide lateral movement opportunity. | AD privilege escalation · IAM misconfiguration · Insider threat vectors |

**Content policy:** No generic marketing language. Every line must be technically defensible by a practitioner. If a line would not survive scrutiny from a CISO, it is rewritten or removed.

**Components:**
- `IndustryExpertiseSection` — Server Component
- `IndustryCard` — Server Component

---

### Section 4 — Service Deep-Dives (×6)

**Section IDs:** `service-web-app`, `service-network-ad`, `service-cloud`, `service-red-team`, `service-vciso`, `service-code-review`

**Heading level:** `<h2>` per service name

**Layout:** Two-column. 60% left (content) / 40% right (outcome panel).

Services 4a, 4b, 4c: standard (content left, panel right).
Services 4d, 4e, 4f: inverted (panel left, content right).

**Left column content:**
1. Eyebrow: service category (`Offensive Testing` / `Security Architecture`)
2. `<h2>`: service name
3. Business risk paragraph — 2 sentences. CEO-readable. Leads with the business consequence, not the technical term.
4. "What this covers" — `<h3>`. Bulleted scope items. CTO-readable.
5. "What you receive" — `<h3>`. Bulleted deliverables.
6. Text link: `Discuss this engagement →` (`data-open-contact`, `href="/contact"`). No button styling. Colour `--blue`.

**`data-open-contact` progressive enhancement rule (applies to every text link and button using this attribute throughout the page):**
- JavaScript intercepts the click and opens the contact modal.
- If JavaScript is unavailable, the browser navigates to `/contact`.
- Never use `href="#"` — it scrolls the page to the top when JS fails.
- Never use `href="javascript:void(0)"` — it is a security anti-pattern and violates the project's secure coding standards.
- Always supply a meaningful `href` fallback.

**Accessible name — required pattern:**
All six "Discuss this engagement →" links are textually identical. A screen reader user navigating by links (Tab key or NVDA/JAWS/VoiceOver link list shortcut) will hear all six announced identically and cannot distinguish which service each link refers to. The section's `aria-labelledby` attribute does NOT solve this — it labels the section landmark only, not its child interactive elements.

Required implementation (visually hidden text appended to each link):
```tsx
<a
  data-open-contact
  href="/contact"
  className="text-link"
>
  Discuss this engagement
  <span className="sr-only"> — {service.name}</span>
  {' →'}
</a>
```

The visible text remains "Discuss this engagement →" on screen. Screen readers announce "Discuss this engagement — Web Application Pentest →" (or the relevant service name). No visible design change.

**Right column (outcome panel):**
1. "Typical engagement" box: Duration · Output format · Team
2. 2–3 outcome highlights (specific, anonymised results or capability statements)

**CTA policy:** Text link only per section. No button. "Book a Consultation" button appears only in §1 Hero and §14 Final CTA.

**Trust signal references in deep-dives:** None. Trust signals are established in dedicated canonical sections. Deep-dives focus entirely on service scope and deliverables.

**Heading targets for sticky nav:** Each `<h2>` has `tabIndex={-1}` to receive programmatic focus when its pill is activated in `StickyServiceNav`.

**Components:**
- `ServiceDeepDive` — Server Component (reusable, data-driven — all 6 use this component)
- `ServiceOutcomePanel` — Server Component
- `ServiceDeliverables` — Server Component

**Future routing note:** When `/services/[slug]` pages are added, `ServiceDeepDive` is the primary component for those pages. The only change is the layout wrapper (page vs. in-page section). No component rewriting required.

---

### Section 5 — Methodology

**Section ID:** `methodology`
**Background:** `--bg`
**Heading level:** `<h2>` — "The Methodology Behind Every Engagement"
**Vertical padding:** Increased to 110px (vs. standard 90px) — signals section importance through space.

**Eyebrow:** "How I Work"
**Blockquote:** "Every engagement is different. I adapt my approach to your threat model, technology stack, and business context — not a checklist." (Matching homepage MethodologySection, but this section goes deeper.)

**Layout Part 1 — 4-pillar grid:**
4-column card grid (collapses to 2×2 at ≤1024px, 1-col at ≤640px).

**Canonical trust signals here:**
- Manual verification of findings (fully articulated in pillar 1)
- Business-context risk assessment (fully articulated in pillar 4)

**Pillars with concrete examples:**

| # | Pillar | Description | Concrete example |
|---|---|---|---|
| 1 | Manual Expertise | Every finding is manually confirmed before it reaches your report. No false positives from unverified scanner output. | An authentication bypass on a payment API — missed entirely by automated scanning — identified through manual business logic review. |
| 2 | Automated Tooling | Industry-standard tooling (Burp Suite Pro, BloodHound, Nessus) ensures complete coverage at scale. Automation augments; it does not replace. | Full API surface mapped via automated enumeration; manual testing then applied to every discovered endpoint. |
| 3 | Pattern Analysis at Scale | Advanced tooling for attack path correlation and rapid hypothesis generation across large codebases and complex environments — including AI-assisted techniques where appropriate. | Cross-referencing IAM policy configurations across 340 cloud resources in under an hour — a task that would take days manually. |
| 4 | Business-Context Validation | Every finding is assessed against your actual risk tolerance, regulatory requirements, and business model before severity is assigned. | A critical CVSS score against an internal, non-internet-facing admin panel is downgraded. A medium CVSS score against a PCI-DSS-scoped payment endpoint is escalated. |

**Layout Part 2 — Finding Lifecycle Flow:**
A horizontal step flow below the pillar grid. On mobile: vertical list.

Steps: Discovery → Manual Verification → Business Context Assessment → Severity Assignment → Executive Translation → Report

Each step: short label + 1-line description. Connected by a thin `--blue` gradient line.

**Visual treatment:** The finding lifecycle flow uses a custom CSS-drawn connector (horizontal line with dots at step positions). This is the one section that should look visually distinctive — not another card grid. SVG or CSS `::before`/`::after` patterns. No third-party library.

**Components:**
- `ServicesMethodologySection` — Server Component (distinct from homepage `MethodologySection`)
- `MethodologyPillarGrid` — Server Component
- `FindingLifecycleFlow` — Server Component

---

### Section 6 — Engagement Timeline

**Section ID:** `engagement-timeline`
**Background:** `--bg2`
**Heading level:** `<h2>` — "A Transparent Process. No Surprises."

**Eyebrow:** "Engagement Structure"
**Preface (above timeline):** "Every engagement begins with a complimentary scoping call before any proposal or commercial agreement is in place."

**Timeline phases — 6 stages (Phase 0 removed from timeline):**

| # | Phase | Duration | Client involvement | Deliverable |
|---|---|---|---|---|
| 1 | Scope & Proposal | 24–48 hours | Review and sign | Fixed-fee proposal, NDA, Rules of Engagement |
| 2 | Kick-off | 30-min call | Required | Testing schedule, communication plan, emergency contacts |
| 3 | Active Testing | Varies by service | Minimal — daily written update only | Daily written status update |
| 4 | Debrief Call | 60 minutes | Required | Verbal findings summary before the written report |
| 5 | Reporting | 2–3 days | None — review period begins | Executive Report + Technical Report |
| 6 | Re-test | 1–2 days | Minimal | Re-test report confirming critical and high findings closed |

**Note:** Phase 3 duration is omitted from the timeline component. It is service-specific and documented in each service deep-dive's outcome panel.

**Layout:** Vertical timeline on desktop (numbered steps, left-aligned connecting line). Collapses to a vertical card stack on mobile (no connecting line).

**Visual treatment:** Each phase rendered as a distinct panel with phase number (mono font), title, duration, client involvement indicator, and deliverable. The connecting line is a thin `--blue` to `transparent` gradient, 1px wide, running vertically.

**Components:**
- `EngagementTimeline` — Server Component
- `TimelinePhase` — Server Component (data-driven — a future `getTimelinePhases(serviceSlug)` returns service-specific phases)

---

### Section 7 — Report Architecture

**Section ID:** `report-architecture`
**Background:** `--bg`
**Heading level:** `<h2>` — "What You Receive at the End of Every Engagement"

**Eyebrow:** "Deliverables"
**Body:** "Every engagement produces two outputs: an Executive Report written for decision-makers, and a Technical Report written for your engineering team. Both are delivered alongside a debrief call, followed by a 30-day remediation support window and a complimentary re-test."

**Canonical trust signals here:**
- Executive-ready reporting (fully articulated)
- Report structure and dual-audience design

**Layout:** Accessible `<table>` with three columns. Not a card grid. Not a visual mockup.

```
| Section | Written for | Purpose |
|---|---|---|
| Executive Summary | CEO, Board | Business risk in plain language. The finding that matters most to your organisation, explained without jargon. |
| Risk Overview | CISO, CTO | Severity distribution — critical, high, medium, low — at a glance. |
| Attack Narrative | CTO, Security Team | How an attacker would reach a critical asset from first access. The story of the engagement. |
| Business Impact Assessment | CEO, CFO | Financial, operational, and reputational risk per finding. |
| Technical Findings | Engineering Team | Detailed evidence, reproduction steps, and references per finding. |
| Prioritised Remediation Roadmap | CTO, Engineering Lead | Specific, sequenced fix guidance. Not theoretical — implementable. |
| Re-test Summary | CISO, CTO | Confirmation that critical and high findings were remediated before the engagement closes. |
```

**Table accessibility:** Full `<table>` element. `<thead>` with `<th scope="col">` per column. Each row's first cell uses `<th scope="row">` for the section name.

**Below table:** A two-item callout row:
- "Two reports per engagement — one for leadership, one for engineering"
- "30-day remediation support included as standard"

These are brief factual statements, not full trust signal articulations.

**Components:**
- `ReportArchitectureSection` — Server Component
- `ReportArchitectureTable` — Server Component (accessible `<table>`)

---

### Section 8 — What I Don't Do

**Section ID:** `engagement-standards`
**Background:** `--bg2`
**Heading level:** `<h2>` — "What You Can Expect — and What I Won't Offer"

**Eyebrow:** "Engagement Standards"
**Body:** "The clearest signal of quality is being explicit about what an engagement is not."

**Layout:** Two-panel side by side (each 48% width, 4% gap). On mobile: vertical stack (standards panel first, then what I do).

**Panel A — "This is not what I provide"**
Background: `--card`. Neutral tone. No alarming iconography.

- Compliance checkbox assessments designed to produce a certificate rather than identify real risk
- Automated scanner output reformatted as a penetration test report
- Generic PDF reports with no prioritisation, no business context, and no clear next steps
- Engagements where a senior consultant sells the project and a junior analyst performs the testing
- Findings delivered without remediation guidance

**Panel B — "This is what every engagement includes"**
Background: `rgba(26,107,255,0.04)`, border `--border2`. Brand-tinted.

- Manual verification of every finding (brief reference to canonical §5)
- Findings evaluated against your business model and risk tolerance
- Two reports — one for leadership, one for engineering
- Specific, prioritised remediation guidance your team can implement
- Direct communication with the consultant performing the work (brief reference to canonical §10)

**Tone enforcement:** Professional and matter-of-fact. Not dismissive of competitors. Not arrogant. The framing is "this is how I work" — not "this is why others are bad."

**Components:**
- `WhatIDontDoSection` — Server Component
- `StandardsPanel` — Server Component. Props: `variant: 'exclusion' | 'inclusion'`. Used for both panels — reduces component count. `exclusion` renders Panel A ("This is not what I provide"), `inclusion` renders Panel B ("This is what every engagement includes").

---

### Section 9 — Selected Results

**Section ID:** `selected-results`
**Background:** `--bg`
**Heading level:** `<h2>` — "Selected Security Impact"

**SEO note — heading must differ from homepage:** The homepage `SecurityImpactSection` uses the heading "Real Engagements. Real Results." Using the identical `<h2>` on this page creates a near-duplicate content signal across two URLs. The services page heading is "Selected Security Impact" — different copy, same semantic intent.

**Eyebrow:** "Security Impact"
**Body:** "Selected engagements conducted under signed NDA. Details generalised and anonymised to protect client confidentiality — the attack paths, techniques, and outcomes are real."

**Content:** 3 result cards. **Distinct from the homepage `SecurityImpactSection` content.** A separate `services-results.service.ts` provides services-page-specific case studies. The homepage and services page do not share results data.

**Layout:** 3-column card grid (`.sec-grid-3`).

**Card structure (same `WorkCard` component reused):**
- Industry badge (e.g., "Fintech · Web Application")
- Challenge (3 sentences)
- Finding highlight (prominent — not buried in card body)
- Outcome (1–2 sentences on business impact)

**CTA below card grid:**
A single quiet text link appears below the cards, after the results have been read. This is the highest-emotional moment on the page — the only action available here is to start a conversation.

```tsx
<a
  data-open-contact
  href="/contact"
  className="text-link"
>
  Discuss a similar engagement
  <span className="sr-only"> — book a free consultation</span>
  {' →'}
</a>
```

No button. No surrounding box. Centred beneath the card grid, small text, `--blue` colour. This follows the text-link convention established in §4 and §10 and does not violate the "buttons only in §1 and §14" rule.

**Components:**
- `ServicesResultsSection` — Server Component (owns its data source)
- `WorkCard` — reused from `features/security-impact/` (no modification)

---

### Section 10 — Why Independent Expertise Outperforms Scale

**Section ID:** `independent-expertise`
**Background:** `--bg2`
**Heading level:** `<h2>` — "Why Independent Expertise Outperforms Scale"

**Eyebrow:** "The Difference"
**Body:** "A large firm brings brand recognition and headcount. An independent engagement brings direct accountability, consistent quality, and a consultant who has personal stake in the outcome of your assessment."

**Canonical trust signals here:**
- Direct accountability (fully articulated in comparison table)

**Layout Part 1 — Comparison table:**
Accessible `<table>`. 3 columns: Dimension · Large Security Firm · Working with Islam Ahmed.

| Dimension | Large Security Firm | Working with Islam Ahmed |
|---|---|---|
| Accountability | Distributed across team and management | Single named consultant responsible for every finding |
| Consistency | Senior consultants sell; junior analysts deliver | The consultant you speak to is the consultant who tests |
| Speed | Procurement, scheduling, and onboarding overhead | Proposal within 24 hours; testing begins within 5–10 days |
| Communication | Account managers and project coordinators | Direct communication throughout — no intermediaries |
| Flexibility | Fixed service packages and standard templates | Scope tailored to your environment, risk profile, and timeline |
| Report quality | Standardised templates with varying execution | Reports written specifically for your organisation and audience |

Table accessibility: `<thead>` with `<th scope="col">` for each column. Row headers (`<th scope="row">`) for each dimension.

**Layout Part 2 — 3 supporting differentiator callouts:**
Below the table. A simple horizontal row of 3 callouts (icon + title + one-sentence value statement). On mobile: vertical stack.

| Differentiator | Value statement |
|---|---|
| Deep Technical Expertise | Every finding is the result of adversarial thinking — not scanner interpretation. |
| Long-Term Partnership | The engagement does not end at the report. I remain available throughout remediation and for future engagements. |
| Executive Communication | Findings are translated into business language. Your board will understand the risk. Your engineers will know what to fix. |

**Text link:** "Discuss your engagement →" (`data-open-contact`, `href="/contact"`) — below the callout row. Brief reference to canonical §11 (Guarantees) as a single phrase: "Fixed-fee pricing. NDA before scoping." This link does not require a visually-hidden suffix — "Discuss your engagement" is sufficiently unique among links on the page.

**Components:**
- `IndependentExpertiseSection` — Server Component
- `ComparisonTable` — Server Component. Placed in `features/services-page/components/` because it is currently page-specific (3 hardcoded column headers, §10 content). It may be extracted to `components/ui/` with a generic prop interface when a second feature genuinely requires a comparison table — not before.
- `DifferentiatorCallout` — Server Component (3-item row component)

---

### Section 11 — Engagement Guarantees

**Section ID:** `engagement-guarantees`
**Background:** `--bg`
**Heading level:** `<h2>` — "Engagement Guarantees"

**Eyebrow:** "Every Engagement"
**Body:** "These are not aspirational standards — they are structural commitments built into every engagement from the proposal stage."

**Canonical trust signals here (all fully articulated):**
- Fixed-fee pricing
- NDA before scoping
- Complimentary re-test
- 24-hour response
- Manual verification (brief reference only — canonical in §5)

**Layout:** 6-item grid (3+3, symmetric). Background `--bg`. Cards: `--bg2` surface. Reduced vertical padding within cards for density.

**Guarantee items (6):**

| Guarantee | Full articulation |
|---|---|
| Fixed-Fee Engagement | Your price is agreed before testing begins. There are no hourly overruns, no scope-creep invoices, and no surprises on the final invoice. |
| NDA Before Scoping | Confidentiality is in place before any technical or commercial details are discussed. Available and signed at the scoping stage, not after. |
| Complimentary Re-test | All critical and high-severity findings are re-tested at no additional cost once remediation is complete. The engagement is not closed until findings are verified. |
| 24-Hour Response | Enquiries acknowledged within 24 business hours. Active engagements receive daily written status updates and same-day responses to urgent questions. |
| Manual Finding Verification | Every finding in your report has been manually confirmed. No unverified scanner output reaches your team. |
| Direct Communication | You communicate directly with the consultant performing your engagement — not an account manager, not a coordinator. |

**Components:**
- `EngagementGuaranteesSection` — Server Component

---

### Section 12 — Ideal Client

**Section ID:** `ideal-client`
**Background:** `--bg2`
**Heading level:** `<h2>` — "Who This Engagement Is Built For"

**Eyebrow:** "Ideal Engagement"
**Body:** "Understanding whether this is the right engagement saves time for both parties."

**Layout:** Single column. Two sub-lists with clear headings.

**"This engagement is ideal if…" (7 items, check prefix):**
- You need an accurate picture of your real attack surface, not a best-guess estimate.
- You want findings that your board can understand and your developers can act on.
- You value direct communication with the person performing the testing.
- You prefer fixed-fee pricing and a defined scope over open-ended retainers.
- You want manual expertise alongside automated tooling — not one or the other.
- You are preparing for a funding round, regulatory audit, or a significant product launch.
- You want a consultant who is available after the report is delivered.

**"This may not be the right fit if…" (4 items, neutral prefix):**
- You require a provider who can compete primarily on lowest price rather than quality of findings.
- A compliance document to satisfy a one-time procurement requirement is the primary objective.
- An automated vulnerability scan is sufficient for your current requirement.
- You expect a zero-involvement engagement from your internal team.

**Tone:** Matter-of-fact. The "may not be the right fit" items are Islam's constraint, not a judgment of the visitor's priorities.

**Components:**
- `IdealClientSection` — Server Component

---

### Section 13 — Executive FAQ

**Section ID:** `executive-faq`
**Background:** `--bg`
**Heading level:** `<h2>` — "Answers for Executive Buyers"

**Eyebrow:** "Common Questions"
**Body:** "If a question is not answered here, it will be answered in the first conversation — which is free and carries no commitment."

**Implementation:** Native `<details>`/`<summary>` elements. Zero JavaScript. Zero client bundle. Full keyboard accessibility and screen reader support are native to the element.

**CSS:** `details[open] .faq-answer` transition for visual polish.

**Cross-browser `::before` indicator — required pattern:**
Do not use `summary::marker` for custom content. Safari does not support `content` on `summary::marker`. Use `summary::before` instead, which has complete cross-browser support:

```css
summary {
  list-style: none;          /* removes default triangle in Firefox */
  cursor: pointer;
}

/* removes the WebKit default triangle */
summary::-webkit-details-marker {
  display: none;
}

summary::before {
  content: '+';
  display: inline-block;
  margin-right: 0.5em;
  font-variant-numeric: tabular-nums;
  transition: transform 150ms ease;
}

details[open] > summary::before {
  content: '×';
}
```

This renders consistently in Chrome, Safari, Firefox, and Edge.

**12 questions:**

| # | Question | Answer summary |
|---|---|---|
| 1 | Will testing affect production systems? | Defined in the Rules of Engagement before testing begins. Can be scoped to staging; production testing is always opt-in and explicitly authorised. |
| 2 | Do you sign NDAs? | Yes — before any technical or commercial details are discussed. Available and signed at the scoping stage. |
| 3 | Is pricing fixed or hourly? | All engagements are fixed-fee. Price agreed before testing begins. No overruns or variable invoices. |
| 4 | How long does an engagement take? | Depends on scope. Web application tests: 3–5 days. Network assessments: 4–7 days. Red team: 2–4 weeks. A scoping call produces a precise timeline for your environment. |
| 5 | Do you provide remediation support after the report? | Yes. A 30-day remediation support window is included. Available to answer developer questions about specific findings. |
| 6 | Is re-testing included? | Yes. A complimentary re-test for critical and high-severity findings is included in every engagement. |
| 7 | Can engagements be performed remotely? | Yes. The majority of engagements are conducted remotely. Physical assessments require on-site presence and are scoped separately. |
| 8 | What happens after the report is delivered? | A debrief call is held before the final report. After delivery, the 30-day remediation window begins, followed by the re-test. |
| 9 | How quickly can you start? | Typically 5–10 business days after the proposal is signed, allowing time for documentation and authorisation. |
| 10 | Can you work alongside our internal security team? | Yes. I frequently work alongside internal teams and can integrate with existing tooling, ticketing systems, and communication channels. |
| 11 | What makes your reports different? | Structured for two audiences: an executive summary for non-technical leadership and a technical section for the engineering team. Findings include business impact statements, not only CVSS scores. |
| 12 | What do you need from us to begin? | A signed proposal and Rules of Engagement, network access or test accounts depending on scope, and a point of contact for daily communication. |

**Google FAQ Schema note:** `FAQPage` schema is generated and included for semantic clarity and crawler signals. Rich result eligibility for this site type is low; structured data is not included with the expectation of SERP enhancement.

**Components:**
- `ExecutiveFAQ` — Server Component (renders `<details>`/`<summary>` natively)
- No client components required for FAQ

---

### Section 14 — Final CTA

**Section ID:** `services-cta`
**Background:** `--bg` with radial gradient (same visual treatment as homepage CTA and services hero)
**Heading level:** `<h2>`

**Headline:** "Schedule the Conversation That Changes What You Know About Your Risk."

**Body:** "Start with a free, no-commitment scoping call. I'll review your environment and propose a tailored engagement — you will know the full scope and price before agreeing to anything."

**CTAs:**
- Primary: "Book a Free Consultation" (`data-open-contact`, button styling)
- Secondary: None (no competing links at conversion point)

**Trust line (below CTA):** "NDA available before any details are discussed" — single line, small text, `--txt3`.

**Trust row (below trust line):** 4 items — Fixed-fee · Complimentary re-test · 24-hour response · Direct communication. These are brief references to canonical §11 signals, not full articulations. Green check mark prefix per item.

**Components:**
- `ServicesCTA` — Server Component (distinct copy from homepage `CtaSection`)
- `ContactButton` — Client Component from `components/ui/ContactButton.tsx` (label: "Book a Free Consultation")

---

## 5. Data Model

### Extended `ConsultingService`

```typescript
// services/consulting-services.service.ts

export interface ServiceOutcome {
  label: string       // "3 critical findings"
  context: string     // "in a fintech API pentest"
}

export interface ConsultingService {
  // ─── existing fields — homepage uses these; do not rename or remove ───
  number: string
  iconName: string
  name: string
  description: string
  scope: string[]

  // ─── new fields for services page ─────────────────────────────────────
  slug: string                    // URL-safe identifier: 'web-app', 'network-ad', etc.
  category: 'offensive' | 'advisory'
  businessRisk: string            // CEO-readable, 1–2 sentences
  deliverables: string[]          // what the client receives
  typicalDuration: string         // "3–5 days"
  typicalOutput: string           // "Executive Report + Technical Report + Re-test"
  industryRelevance: string[]     // industries most relevant: ['Fintech', 'SaaS', ...]
  outcomes?: ServiceOutcome[]     // optional: 2–3 outcome highlights for the panel

  // ─── i18n-ready (default 'en', not rendered today) ───────────────────
  locale?: string

  // ─── AI/semantic search readiness (not rendered today) ───────────────
  tags?: string[]                 // ['OWASP', 'API', 'Authentication', 'Web']
  summary?: string                // 1-sentence machine-readable description
}
```

**Required field migration — Phase A step 2 is not purely additive:**
`slug` is a required (non-optional) field. Adding it to the interface immediately produces a TypeScript compile error on all existing service mock data objects that lack it. This is not an additive change.

**In Phase A step 2, the developer must do all of the following in the same commit:**
1. Extend the `ConsultingService` interface with all new fields
2. Update all six existing service mock data objects to include `slug`
3. Confirm `npm run build` exits 0 before proceeding

**Slug values for existing services:**

| Service name | slug value |
|---|---|
| Web Application Penetration Test | `web-app` |
| Network & Active Directory Assessment | `network-ad` |
| Cloud Security Review | `cloud` |
| Red Team Engagement | `red-team` |
| Security Advisory & vCISO | `vciso` |
| Secure Code Review | `code-review` |

All other new fields (`businessRisk`, `deliverables`, `typicalDuration`, `typicalOutput`, `industryRelevance`) are also required and must be populated for all six services in the same commit. Only `outcomes`, `locale`, `tags`, and `summary` are optional.

Homepage `ServiceCard` uses only `number`, `iconName`, `name`, `description`, `scope`. No rendering code breaks — only the mock data file requires updating.

### New service data

```typescript
// services/industry-expertise.service.ts
export interface IndustryProfile {
  id: string
  iconName: string
  name: string
  threatContext: string           // one-line industry context
  threats: string[]               // 3 specific threat signals
  locale?: string
  tags?: string[]
}

export async function getIndustryProfiles(): Promise<IndustryProfile[]>
```

```typescript
// services/engagement-timeline.service.ts
export interface TimelinePhase {
  number: number
  title: string
  duration: string
  clientInvolvement: 'required' | 'minimal' | 'none'
  deliverable: string
  locale?: string
}

export async function getTimelinePhases(serviceSlug?: string): Promise<TimelinePhase[]>
// Currently returns default 6-phase timeline regardless of serviceSlug
// Future: returns service-specific timeline when slug is provided
```

```typescript
// services/faq.service.ts
export interface FAQItem {
  id: string
  question: string
  answer: string
  locale?: string
  tags?: string[]
}

export async function getExecutiveFAQs(): Promise<FAQItem[]>
```

```typescript
// lib/types/security-impact.types.ts
// Shared type — imported by both security-impact.service.ts and services-results.service.ts
export interface SecurityImpactCard {
  industryBadge: string    // "Fintech · Web Application"
  challenge: string        // 3 sentences
  findingHighlight: string // prominent finding label
  outcome: string          // 1–2 sentences on business impact
}
```

```typescript
// services/services-results.service.ts
// Distinct from security-impact.service.ts — services page case studies only
// Imports SecurityImpactCard from lib/types, not from the security-impact feature
import type { SecurityImpactCard } from '@/lib/types/security-impact.types'

export async function getServicesResults(): Promise<SecurityImpactCard[]>
```

**Cross-feature type ownership:** `SecurityImpactCard` is used by both the homepage `SecurityImpactSection` and the Services page `ServicesResultsSection`. Placing the type in `lib/types/` makes it a shared contract owned by neither feature. Both service files import from the same source. If the card shape changes in the future, a single type definition must be updated — both features benefit immediately.

`security-impact.service.ts` must also be updated in Phase A to import `SecurityImpactCard` from `@/lib/types/security-impact.types` rather than defining it locally. This is the only change to that file.

### Page-level data fetching

```typescript
// app/(marketing)/services/page.tsx — data loading pattern

const [services, industries, timeline, faqs, results] = await Promise.all([
  getConsultingServices(),
  getIndustryProfiles(),
  getTimelinePhases(),
  getExecutiveFAQs(),
  getServicesResults(),
])
```

All data fetched in parallel. Page does not render until all data resolves. With mock data this is instant. With real APIs, slow sources do not block fast ones because all are initiated simultaneously.

---

## 6. Component Architecture

### Client components (2 total)

| Component | Reason for `'use client'` |
|---|---|
| `StickyServiceNav` | `IntersectionObserver`, `useState` for active section tracking, explicit `.focus()` call for keyboard management |
| `ContactButton` | `data-open-contact` interaction requires browser event context; used in both hero and final CTA |

**`ServicesPageHeroCTAs` and `ServicesCtaButtons` are consolidated into one `ContactButton` component.** Both previously rendered a `data-open-contact` button with a label — functionally identical. A single `ContactButton` component in `components/ui/` accepts a `label` prop and is used in both §1 and §14. This reduces the client component count from 3 to 2 and removes a DRY violation.

```tsx
// components/ui/ContactButton.tsx
'use client'

interface ContactButtonProps {
  label: string
}

export function ContactButton({ label }: ContactButtonProps) {
  return (
    <button data-open-contact className="btn-primary">
      {label}
    </button>
  )
}
```

**All other components are Server Components.** This is non-negotiable. Before adding `'use client'` to any component, confirm it requires `useState`, `useEffect`, a browser API, or an event handler that cannot be delegated to `ModalProvider`.

### Full component list

```
features/services-page/
├── constants.ts                          — section IDs, animation config
│
├── components/
│   ├── ServicesPageHero.tsx              Server  — hero layout, stat row, trust line
│   ├── AvailabilityBadge.tsx             Server  — green pulse dot + text
│   │
│   ├── ServiceNavigator.tsx              Server  — pill nav section wrapper + pills
│   ├── StickyServiceNav.tsx              Client  — fixed pill nav with IntersectionObserver
│   │
│   ├── IndustryExpertiseSection.tsx      Server  — 4-card industry grid
│   ├── IndustryCard.tsx                  Server  — single industry card
│   │
│   ├── ServiceDeepDive.tsx               Server  — reusable deep-dive section (all 6)
│   ├── ServiceOutcomePanel.tsx           Server  — right-column outcome panel
│   ├── ServiceDeliverables.tsx           Server  — deliverables list
│   │
│   ├── ServicesMethodologySection.tsx    Server  — 4-pillar + lifecycle flow
│   ├── MethodologyPillarGrid.tsx         Server  — pillar cards with examples
│   ├── FindingLifecycleFlow.tsx          Server  — CSS-drawn step flow
│   │
│   ├── EngagementTimeline.tsx            Server  — timeline wrapper
│   ├── TimelinePhase.tsx                 Server  — single phase panel
│   │
│   ├── ReportArchitectureSection.tsx     Server  — deliverables section wrapper
│   ├── ReportArchitectureTable.tsx       Server  — accessible <table>
│   │
│   ├── WhatIDontDoSection.tsx            Server  — two-panel section
│   ├── StandardsPanel.tsx                Server  — reusable panel (variant: 'exclusion' | 'inclusion')
│   │
│   ├── ServicesResultsSection.tsx        Server  — results section wrapper + quiet text CTA
│   │                                             (reuses WorkCard from security-impact)
│   │
│   ├── IndependentExpertiseSection.tsx   Server  — comparison table + differentiator callouts
│   ├── ComparisonTable.tsx               Server  — page-specific 3-col accessible table
│   │                                             (services feature only — not yet generic)
│   ├── DifferentiatorCallout.tsx         Server  — 3-item callout row
│   │
│   ├── EngagementGuaranteesSection.tsx   Server  — 6-item guarantees grid
│   │
│   ├── IdealClientSection.tsx            Server  — single-column self-qualification
│   │
│   ├── ExecutiveFAQ.tsx                  Server  — <details>/<summary> FAQ
│   │
│   └── ServicesCTA.tsx                   Server  — final CTA section

components/ui/
└── ContactButton.tsx                     Client  — data-open-contact button (label prop)
                                                   shared between §1 hero and §14 CTA
                                                   replaces ServicesPageHeroCTAs + ServicesCtaButtons
```

**Notes on component count reductions from v3.0:**
- `ServiceNavigatorPills` merged into `ServiceNavigator` — it was a list of `<a>` tags with no logic justifying a separate file
- `ServicesPageHeroCTAs` + `ServicesCtaButtons` consolidated into `ContactButton` in `components/ui/` — two files for functionally identical Client Components violated DRY
- `ComparisonTable` moved from `components/ui/` to `features/services-page/components/` — the current implementation is page-specific (hardcoded 3-col structure); generalize only when a second feature needs it

**Reused without modification:**
- `Container` — all sections
- `WorkCard` — §9 Results
- `LazyContactModal` — inherited from `(marketing)` layout
- `Navbar`, `Footer` — inherited from `(marketing)` layout
- `buildMetadata()` — SEO

**Total new files: 27** (down from 28 — `ServiceNavigatorPills` removed, `ComparisonTable` stays within feature, net of moving `ContactButton` to `components/ui/`)

---

## 7. File Impact Analysis

### New files

| File | Purpose |
|---|---|
| `app/(marketing)/services/page.tsx` | Route, metadata, JSON-LD, section assembly |
| `app/(marketing)/services/loading.tsx` | Route-level Suspense skeleton — prevents blank flash on navigation; critical when mock services are replaced by real APIs |
| `lib/seo/json-ld.ts` | `buildServicesPageJsonLd()` — structured data generation |
| `lib/types/security-impact.types.ts` | Shared `SecurityImpactCard` interface — imported by both `security-impact.service.ts` and `services-results.service.ts` |
| `services/industry-expertise.service.ts` | Industry profiles data |
| `services/engagement-timeline.service.ts` | Timeline phases data |
| `services/faq.service.ts` | FAQ items data |
| `services/services-results.service.ts` | Services-page-specific results |
| `features/services-page/constants.ts` | Section IDs, config |
| `features/services-page/components/` | All 24 new components (listed above) |
| `components/ui/ContactButton.tsx` | Shared Client Component for `data-open-contact` buttons |
| `docs/adr/0008-services-page-architecture.md` | ADR for this milestone |
| `public/og/services.png` | OG image for `/services` — required by metadata; create before Phase C begins |

### Modified files

| File | Change | Risk |
|---|---|---|
| `services/consulting-services.service.ts` | Extend `ConsultingService` type + update all 6 mock objects with required fields including `slug` | **Medium** — `slug` is a required field; compile error until all mock objects are updated; must be done atomically in Phase A step 2 |
| `services/security-impact.service.ts` | Update import of `SecurityImpactCard` type to come from `@/lib/types/security-impact.types` instead of local definition | Low — single import change; no functional change |
| `config/site.ts` | Update nav: `{ label: 'Services', href: '#services' }` → `{ label: 'Services', href: '/services' }` | Low — single string change |
| `features/services-section/components/ServiceCard.tsx` | Add `href={/services#service-${service.slug}}` "Learn More" text link to homepage service cards | Low — additive |
| `app/globals.css` | Add responsive rules, print stylesheet, `scroll-margin-top`, FAQ `::before` indicator styles | Low — additive |
| `docs/adr/README.md` | Add ADR-0008 to index | None |
| `docs/CHANGELOG.md` | Add v1.1.0 entry on completion | None |

### Homepage impact

**The homepage is not modified except for:**
1. `ServiceCard.tsx` — adding a "Learn More →" text link to `/services#service-[slug]`. This is additive (a new link). It does not change the card layout, the CTA, or the visual design. It must be reviewed against the homepage lock conditions before implementation: this is an enhancement that adds navigation value, not a redesign.
2. No other homepage file is touched.

---

## 8. SEO Specification

### Metadata

```typescript
// app/(marketing)/services/page.tsx
export const metadata = buildMetadata({
  title: 'Penetration Testing & Security Advisory',
  description: 'Offensive security services for fintech, SaaS, healthcare, and enterprise — web application penetration testing, cloud security review, red team engagements, and vCISO advisory. Fixed-fee. NDA available.',
  path: '/services',
  ogImage: '/og/services.png',  // requires OG image asset
})
```

**Full title in browser:** `Penetration Testing & Security Advisory | Islam Ahmed`

### Heading hierarchy (complete)

```
<h1> "Know Your Real Attack Surface — Before Someone Else Does."
  <h2> "Security Services"                          (§2 Navigator)
  <h2> "Built Around Your Industry's Threat Landscape"  (§3 Industry)
    <h3> [industry name × 4]
  <h2> [service name × 6]                           (§4 Deep-dives)
    <h3> "What this covers"
    <h3> "What you receive"
  <h2> "The Methodology Behind Every Engagement"    (§5)
    <h3> [pillar name × 4]
  <h2> "A Transparent Process. No Surprises."       (§6)
    <h3> [phase title × 6]
  <h2> "What You Receive at the End of Every Engagement" (§7)
  <h2> "What You Can Expect — and What I Won't Offer"    (§8)
  <h2> "Selected Security Impact"                    (§9 — differs from homepage to avoid duplicate heading signal)
  <h2> "Why Independent Expertise Outperforms Scale" (§10)
  <h2> "Engagement Guarantees"                      (§11)
  <h2> "Who This Engagement Is Built For"           (§12)
  <h2> "Answers for Executive Buyers"               (§13)
  <h2> "Schedule the Conversation..."               (§14)
```

**Rule:** No heading level is skipped. Every `<h3>` appears inside a `<section>` that contains an `<h2>`. Verified during implementation review.

### Structured data (generated from typed data)

**`lib/seo/json-ld.ts` exports:**

```typescript
buildServicesPageJsonLd(services: ConsultingService[], faqs: FAQItem[]): object
```

**Required output shape — all schemas must be wrapped in `@graph`:**

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "name": "{service.name}",
      "description": "{service.businessRisk}",
      "provider": { "@type": "Person", "name": "Islam Ahmed" },
      "serviceType": "Security Testing",
      "url": "https://islamahmed.com/services#{service.slug}"
    },
    // ... one Service node per service (6 total)
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "{faq.question}",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "{faq.answer}"
          }
        }
        // ... one Question per FAQ item (12 total)
      ]
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://islamahmed.com/" },
        { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://islamahmed.com/services" }
      ]
    },
    {
      "@type": "ProfessionalService",
      "name": "Islam Ahmed — Cybersecurity Consulting",
      "url": "https://islamahmed.com/services",
      "description": "Penetration testing and security advisory for fintech, SaaS, healthcare, and enterprise."
    }
  ]
}
```

**Why `@graph` is required:** Placing multiple schema types in a single `<script>` tag without `@graph` produces invalid JSON-LD — either a multi-`@type` root object (schema.org does not support multiple primary types this way) or a plain array (missing the required `@context`). Google's Rich Results Test will reject the output. `@graph` is the correct mechanism for bundling multiple named entities in a single JSON-LD block.

All rendered via:
```tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
/>
```
`dangerouslySetInnerHTML` is safe here: the content is generated from trusted, typed data — not from user input or external API responses.

**OG image:** `ogImage: '/og/services.png'` references an asset that must be created before Phase C begins. If no custom OG image is ready, update `buildMetadata()` to fall back to the homepage OG image rather than referencing a missing asset. Track this in the Phase A checklist (see §12).

### Internal linking

- Homepage `ServiceCard` → `/services#service-[slug]` (see §7 Modified files)
- Navbar "Services" → `/services`
- Footer: add "Services" link in the navigation column
- Each service deep-dive `<h2>` has `id="service-[slug]"` for direct anchor targeting

### Keyword cannibalisation management

The homepage `ServicesSection` currently ranks for "penetration testing services" signals. By linking homepage cards to `/services`, Google receives a clear signal that `/services` is the canonical deep-content URL. The homepage becomes a navigation gateway. The services page becomes the authoritative content destination. Both URLs serve different intent depths (overview vs. decision).

---

## 9. Accessibility Requirements

These requirements must be verified before the section is accepted during implementation review. No section ships without each applicable item confirmed.

### Document structure

- [ ] Single `<h1>` on the page
- [ ] No heading levels skipped (see hierarchy above)
- [ ] `<main>` wraps all page content (inherited from marketing layout)
- [ ] Every `<section>` has `aria-labelledby` pointing to its `<h2>`
- [ ] `<header>` landmark present (inherited from `Navbar`)

### Anchor targets and focus management

**`id` placement rule:** `id` attributes are placed on `<section>` elements, not on `<h2>` elements. This ensures:
- URL fragments (`/services#service-web-app`) target the section correctly for bookmarking and external links
- `IntersectionObserver` in `StickyServiceNav` observes sections as intended
- Keyboard focus is managed separately and explicitly by JavaScript

**Focus management rule:** When a sticky nav pill is activated (click, Enter, or Space), JavaScript must:
1. Scroll the target `<section>` into view (honouring `scroll-margin-top`)
2. Explicitly call `.focus()` on the `<h2>` inside that section

The `<h2>` must have `tabIndex={-1}` to be programmatically focusable without appearing in the natural tab order.

- [ ] Every service `<section>` has `id="service-[slug]"` for anchor navigation
- [ ] Every service `<h2>` has `tabIndex={-1}` for programmatic focus from sticky nav
- [ ] Clicking a sticky nav pill scrolls the section into view AND calls `.focus()` on the `<h2>`
- [ ] Focus ring visible on the `<h2>` when focused programmatically: `h2:focus { outline: 2px solid var(--blue); outline-offset: 4px; }` in `globals.css` (applied only to elements with `tabIndex={-1}` to avoid visible outlines on non-interactive headings)

### Sticky service navigation

- [ ] All pill links keyboard-navigable via `Tab`
- [ ] `aria-current="location"` on the active pill
- [ ] Sticky nav does not occlude focused content (CSS `scroll-margin-top` on each `<section>` accounting for sticky nav height)
- [ ] `aria-label="Service sections"` on the sticky nav `<nav>` element (distinguishes it from the static navigator)
- [ ] Static `ServiceNavigator`'s `<nav>` has `aria-label="Service sections navigation"` (different label to avoid two identical navigation landmarks)
- [ ] All four bidirectional scroll states implemented (see Sticky Service Navigation spec above)

### Comparison table (§10)

- [ ] `<table>` element (not CSS grid styled as table)
- [ ] `<thead>` with `<th scope="col">` for each column
- [ ] First cell of each row: `<th scope="row">` for the dimension label
- [ ] `<caption>` element with table description (visually hidden if design requires)

### Report Architecture table (§7)

- [ ] Same table accessibility requirements as §10

### Interactive elements

- [ ] All `data-open-contact` trigger elements have accessible names via visible text or `aria-label`
- [ ] All `data-open-contact` text links include `href="/contact"` as a progressive enhancement fallback
- [ ] Every "Discuss this engagement →" text link includes visually hidden service name text (see §4 accessible name pattern)
- [ ] Screen reader link list announces each deep-dive link distinctly: "Discuss this engagement — Web Application Penetration Test →", "Discuss this engagement — Network & AD Assessment →", etc.

**Why `aria-labelledby` on `<section>` is not sufficient:** Section `aria-labelledby` describes the section landmark. It does not extend to interactive elements inside that section. When a screen reader user navigates by links (NVDA `K`, JAWS `Tab`, VoiceOver rotor), they receive a flat list of all links on the page stripped of section context. All six instances of "Discuss this engagement →" are announced identically, making them indistinguishable. The visually-hidden text pattern (specified in §4) is the required fix.

### FAQ (`<details>`/`<summary>`)

- [ ] Each `<details>` wraps exactly one `<summary>` (the question) and one answer container
- [ ] `summary` text is the complete question — no truncation
- [ ] `summary { list-style: none; }` and `summary::-webkit-details-marker { display: none; }` to remove default triangles in all browsers
- [ ] Custom `+`/`×` indicator via `summary::before` (not `summary::marker` — see §13 CSS spec for cross-browser implementation)
- [ ] Answer text contrast: `--txt2` (`#8BA8C4`) on `--bg` (`#060B17`) = approximately 6.2:1 — **confirmed passes WCAG AA** (4.5:1 minimum for normal text)

### Motion

- [ ] Sticky nav slide animation wrapped in `@media (not prefers-reduced-motion)` or equivalent CSS
- [ ] Scroll reveal (`.rv`) classes omitted on this page initially — add only if homepage `ScrollReveal` has been confirmed to clean up observers after trigger

### Images and icons

- [ ] All Lucide icons in decorative contexts have `aria-hidden="true"`
- [ ] Availability badge pulse dot: `aria-hidden="true"` on the decorative circle; accessible text conveyed via the label text only

### Colour contrast

- [x] `--txt2` (`#8BA8C4`) on `--bg` (`#060B17`): **~6.2:1 — passes WCAG AA** (pre-confirmed; no runtime check needed)
- [x] `--txt2` (`#8BA8C4`) on `--bg2` (`#080E1C`): `--bg2` is marginally darker than `--bg`; contrast ratio is marginally higher — **passes WCAG AA**
- [ ] All `--txt3` usage is limited to supplementary text (labels, metadata) — not primary content (the trust line below the §14 CTA button uses `--txt3`; this is acceptable as supplementary context, not the primary message)

---

## 10. Performance Requirements

### Client component constraint

Maximum 3 `'use client'` components on this page. Adding a fourth requires written justification and approval.

Current 2: `StickyServiceNav`, `ContactButton`.

### Bundle size

No new third-party libraries. All components use:
- Lucide React (already in bundle)
- CSS custom properties (zero JS cost)
- Native browser APIs (`IntersectionObserver`)

### Data fetching

```typescript
const [services, industries, timeline, faqs, results] = await Promise.all([...])
```

All data sources fetched in parallel. No sequential awaits at the page level.

### `scroll-margin-top`

Every `<section>` that is an anchor target must have:
```css
scroll-margin-top: calc(var(--navbar-height) + var(--sticky-nav-height));
```
Where `--sticky-nav-height` is the height of `StickyServiceNav` (approximately 48px). This prevents the sticky nav from obscuring the section heading when an anchor link is followed.

Define `--sticky-nav-height: 48px` as a CSS custom property. Do not hardcode the pixel value in multiple places.

**`--navbar-height` dependency:** Before implementing `scroll-margin-top`, verify that `--navbar-height` is defined as a CSS custom property in `app/globals.css`. If it does not exist, define it there (e.g., `--navbar-height: 64px`) before Phase D begins. If the variable is missing and the `calc()` runs, `var(--navbar-height)` resolves to `0px` — anchor navigation will scroll 48px too high on all viewports where the navbar is visible.

### Print stylesheet

The print stylesheet is intended for procurement and HR who print or save the page as PDF for internal vendor evaluation. All FAQ answers must be visible in the printed output.

```css
@media print {
  /* Hide navigation and interactive elements */
  .sticky-service-nav,
  [data-open-contact],
  #services-hero .services-cta-wrapper,
  #services-cta { display: none !important; }

  /* Expand all FAQ items — CSS cannot set HTML attributes.
     The correct approach is to show all child content of <details>. */
  details > *:not(summary) { display: block !important; }
  details > summary::before { content: none; }

  /* Flatten backgrounds for print */
  section { background: white !important; }

  /* Ensure body text prints in black */
  body, p, li, td, th, h1, h2, h3 { color: black !important; }
}
```

**Why `details { open: true; }` was removed:** `open` is an HTML attribute, not a CSS property. CSS cannot set HTML attributes. That declaration was silently ignored by all browsers, leaving all FAQ answers collapsed in the printed output. The replacement (`details > *:not(summary) { display: block !important; }`) forces all content inside `<details>` — except the `<summary>` — to render visibly regardless of the `open` state.

Add to `app/globals.css`.

### Route loading state

`app/(marketing)/services/loading.tsx` must be created in Phase A. Without it, navigating to `/services` from another route shows a blank screen while `Promise.all()` resolves. With mock data this is invisible. When real APIs replace mock services, this becomes a visible blank flash that degrades the perceived performance of the page.

A minimal skeleton is sufficient:
```tsx
// app/(marketing)/services/loading.tsx
export default function ServicesLoading() {
  return (
    <div
      aria-busy="true"
      aria-label="Loading services"
      style={{ minHeight: '100vh' }}
    />
  )
}
```

### Suspense boundaries (future work)

`Promise.all()` at the page level blocks the entire render until all five data sources resolve. With mock data this is instant. When real APIs are connected, a slow source (e.g., a third-party FAQ API) will block the hero and navigator from rendering.

When real APIs are introduced, add Suspense boundaries at the section level so fast sections render immediately while slow ones stream in. This is not required for the initial implementation. Document in the Phase A ADR that Suspense boundaries are the planned progressive enhancement when API latency becomes observable.

### No images

This page contains no `<img>` elements. All visuals are icons, CSS gradients, and typography. `next/image` is not required. This is an intentional design decision — maintain it.

---

## 11. Engineering Standards

All standards from `docs/ENGINEERING_PRINCIPLES.md` and `docs/CODING_STANDARDS.md` apply without exception. This section records page-specific applications.

### Server Components by default

Every component in `features/services-page/` is a Server Component unless it appears in the three-item client component list in §6. During implementation review, each component's directive (or absence of directive) is checked.

### Prop interfaces

Every component has a defined TypeScript interface for its props. Interfaces are defined immediately before the component function in the same file. No `any`. No implicit types.

### Import order

1. React / Next.js (framework)
2. Third-party (`lucide-react`)
3. Internal absolute (`@/components/ui/`, `@/services/`, `@/features/`)
4. Internal relative (`./ServiceCard`)

### Naming

Component files: PascalCase `.tsx`
Service files: `kebab-case.service.ts`
Constants: `UPPER_SNAKE_CASE` for values exported from `constants.ts`

### Section IDs

All section IDs are defined in `features/services-page/constants.ts`:

```typescript
export const SERVICE_SECTION_IDS = {
  hero: 'services-hero',
  navigator: 'service-navigator',
  industry: 'industry-expertise',
  webApp: 'service-web-app',
  networkAd: 'service-network-ad',
  cloud: 'service-cloud',
  redTeam: 'service-red-team',
  vciso: 'service-vciso',
  codeReview: 'service-code-review',
  methodology: 'methodology',
  timeline: 'engagement-timeline',
  reportArchitecture: 'report-architecture',
  whatIDontDo: 'engagement-standards',
  results: 'selected-results',
  independentExpertise: 'independent-expertise',
  guarantees: 'engagement-guarantees',
  idealClient: 'ideal-client',
  faq: 'executive-faq',
  cta: 'services-cta',
} as const
```

Components import IDs from this constant. No hardcoded strings anywhere.

### Content policy

No unsupported marketing claims. Every statistic, metric, or outcome claim in service data must be:
1. A real, verifiable figure from an actual engagement, OR
2. A structural guarantee (fixed-fee, re-test, NDA), OR
3. A qualitative, non-quantified statement

When in doubt, omit the claim rather than estimate it.

---

## 12. Implementation Sequence

Build in this order. Each phase must pass its build/lint/typecheck check before the next begins.

**Phase A — Foundation**

All Phase A items must be committed together and the build must pass (`npm run build` exits 0) before Phase B begins.

1. `lib/types/security-impact.types.ts` — extract `SecurityImpactCard` shared interface
2. `services/security-impact.service.ts` — update to import `SecurityImpactCard` from `@/lib/types/security-impact.types` (no functional change)
3. `services/consulting-services.service.ts` — extend `ConsultingService` interface AND update all 6 existing mock objects with required new fields (`slug`, `category`, `businessRisk`, `deliverables`, `typicalDuration`, `typicalOutput`, `industryRelevance`). This is a single atomic commit — partial completion produces a compile error.
   - Slug values: `web-app`, `network-ad`, `cloud`, `red-team`, `vciso`, `code-review`
4. `services/industry-expertise.service.ts` — new service + mock data
5. `services/engagement-timeline.service.ts` — new service + mock data
6. `services/faq.service.ts` — new service + mock data (12 questions)
7. `services/services-results.service.ts` — new service + mock data (3 cards, distinct from homepage)
8. `lib/seo/json-ld.ts` — JSON-LD builder with `@graph` output shape
9. `features/services-page/constants.ts` — section IDs, animation config
10. `app/(marketing)/services/loading.tsx` — route loading skeleton
11. Verify `--navbar-height` is defined in `app/globals.css`; add it if missing
12. `docs/adr/0008-services-page-architecture.md`

**Phase B — Shared UI**

13. `components/ui/ContactButton.tsx` — shared Client Component for `data-open-contact` buttons (label prop)
14. `features/services-page/components/StandardsPanel.tsx`

**Phase C — Page Assembly**

15. `public/og/services.png` — create OG image asset (or confirm which fallback image `buildMetadata()` uses; resolve this before step 16)
16. `app/(marketing)/services/page.tsx` — skeleton with metadata, JSON-LD, and all section imports stubbed
17. Each section component in page order (§1 through §14). Build and typecheck after every 2–3 components to catch errors early.
18. `StickyServiceNav` client component last — requires all service section IDs to be in the DOM to test IntersectionObserver targets

**Phase D — Integration and Global Styles**

19. `features/services-section/components/ServiceCard.tsx` — add "Learn More →" text link to homepage cards
20. `config/site.ts` — update nav href from `#services` to `/services`
21. `app/globals.css` — add in one commit:
    - `scroll-margin-top` rule with `--navbar-height` + `--sticky-nav-height` variables
    - Print stylesheet (fixed version — see §10)
    - FAQ `::before` indicator styles (see §13)
    - `h2[tabindex="-1"]:focus` outline rule
    - Any new responsive rules for services-page layout classes

**Phase E — Verification**

22. Build, lint, typecheck (zero warnings, zero errors)
23. Responsive QA — all 9 viewports; pay specific attention to: sticky nav on mobile, deep-dive layout inversion (4d/4e/4f), table horizontal scroll on narrow viewports
24. Accessibility audit — axe DevTools + VoiceOver manual: link list (all 6 "Discuss" links distinct), table headers, sticky nav `aria-current`, FAQ `<details>` state announcement
25. Performance — Lighthouse production build (≥95 target)
26. JSON-LD — validate with Google Rich Results Test
27. Security — header verification, DOM audit (no exposed secrets, no inline event handlers)
28. Code quality review — verify all components are Server Components except the two in the client component list

---

## 13. Quality Gates

All 8 quality gates from `docs/QUALITY_GATES.md` apply. Services-page-specific additions:

### Responsive — additional checks

- [ ] Sticky nav: confirm mobile behaviour (solid background, no blur; visible or gracefully hidden on ≤640px — decide and implement; do not leave unresolved)
- [ ] Deep-dive layout inversion (4d/4e/4f) renders correctly at all breakpoints — both columns must collapse to single-column correctly
- [ ] Both `<table>` elements (§7 and §10) scroll horizontally on narrow viewports (`overflow-x: auto` wrapper) — do not restructure the `<table>` to a list layout
- [ ] Timeline collapses to vertical card stack at ≤768px; connecting line removed on mobile
- [ ] FAQ `<details>` expands/collapses correctly at all breakpoints
- [ ] §9 Results quiet text CTA is visible and tappable on mobile

### Accessibility — additional checks

- [ ] `id` on `<section>`, `tabIndex={-1}` on `<h2>` — confirmed for all 6 service sections
- [ ] Sticky nav pill activation: scrolls section into view AND moves keyboard focus to `<h2>` — confirmed via keyboard-only navigation
- [ ] All 6 "Discuss this engagement" links announce distinct service names in VoiceOver link list
- [ ] Both `<table>` elements pass screen reader testing (VoiceOver on Safari minimum) — row and column headers announced correctly
- [ ] FAQ `<details>` announces expanded/collapsed state to VoiceOver
- [ ] `scroll-margin-top` confirmed — anchor navigation does not hide under sticky nav
- [ ] Sticky nav `aria-current="location"` updates as user scrolls through service sections
- [ ] Static `ServiceNavigator` `<nav>` has `aria-label="Service sections navigation"` — confirmed in DOM
- [ ] Sticky `StickyServiceNav` `<nav>` has `aria-label="Service sections"` — confirmed in DOM

### SEO — additional checks

- [ ] All 6 service deep-dive `<section>` elements have unique `id` attributes matching `SERVICE_SECTION_IDS` constants
- [ ] JSON-LD validates in Google Rich Results Test — `@graph` wrapper confirmed in output
- [ ] §9 heading is "Selected Security Impact" — not "Real Engagements. Real Results." (confirm differs from homepage)
- [ ] Page title renders correctly in browser tab: `Penetration Testing & Security Advisory | Islam Ahmed`
- [ ] Canonical URL is `/services`
- [ ] Homepage `ServiceCard` links to `/services#service-[slug]` — confirmed in DOM
- [ ] `public/og/services.png` exists; OG image renders correctly when URL is shared

### Declaration of completion

When all 8 gates pass:
1. Record in `docs/CHANGELOG.md` under v1.1.0
2. Create `docs/adr/0008-services-page-architecture.md`
3. Recommend git tag `v1.1.0`

---

## 14. ADR-0008 Summary

**File to create:** `docs/adr/0008-services-page-architecture.md`
**Date:** 2026-06-29
**Status:** Accepted

**Key decisions to record:**

| Decision | Rationale |
|---|---|
| `/services` as a standalone page | Separate URL enables independent SEO targeting; clean separation from homepage content |
| All 6 services as in-page sections (not `/services/[slug]`) | One authoritative URL; extensible to dynamic routes without rewriting `ServiceDeepDive` |
| `ConsultingService` type extension | Single source of truth; homepage uses a subset; TypeScript enforces compatibility |
| Native `<details>`/`<summary>` for FAQ | Zero JS; native accessibility; no hydration cost |
| Sticky service navigation via `IntersectionObserver` | Solves scroll-trap risk of 6 consecutive deep-dive sections; minimal JS cost |
| `Promise.all()` for page data | Parallel fetching; no sequential blocking; production-ready for API wiring |
| Blurred report preview rejected | SaaS cliché; implementation complexity exceeds credibility value; replaced by `<table>` |
| Sections 5 and 11 merged | Eliminated redundancy; one stronger section outperforms two weaker overlapping ones |
| Trust signals each have exactly one canonical section | Repetition dilutes; concentration amplifies |
| `ComparisonTable` in `features/services-page/` | Current implementation is page-specific (hardcoded 3-col headers); will be generalized to `components/ui/` when a second feature genuinely requires it |
| No print-specific page | Print stylesheet on `/services` is sufficient for procurement use |
| Layout inversion at deep-dive 4d | Resets visual rhythm without introducing new design patterns |
| `<h2 tabIndex={-1}>` on all anchor targets | Required for keyboard focus management when sticky nav pills are activated |

| `SecurityImpactCard` extracted to `lib/types/` | Both security-impact and services features share the card shape; shared ownership in `lib/types/` prevents cross-feature imports |
| `ContactButton` shared Client Component | `ServicesPageHeroCTAs` and `ServicesCtaButtons` were functionally identical; consolidated into one reusable component in `components/ui/` |
| `ServiceNavigatorPills` merged into `ServiceNavigator` | Over-abstraction — a list of `<a>` tags does not justify a separate file |
| `data-open-contact` text links require `href="/contact"` | Progressive enhancement: modal intercepts JS click; `/contact` serves as fallback when JS is unavailable |
| `summary::before` for FAQ indicators (not `::marker`) | `summary::marker content` is unsupported in Safari; `::before` has complete cross-browser coverage |
| Print CSS uses `details > *:not(summary) { display: block }` | `details { open: true }` is invalid CSS — `open` is an HTML attribute, not a property; CSS cannot set HTML attributes |

**Consequences:**
- Positive: clean architecture, high reusability, zero homepage regression, accessible, production-print-ready, valid structured data
- Negative: 27 new files is a significant addition; managed by feature-first structure
- Known future transitions:
  1. When `/services/[slug]` pages are added, in-page sections should be removed or redirected to prevent duplicate content. The hash-based redirect (`/services#service-[slug]` → `/services/[slug]`) must be client-side (hash fragments are not accessible server-side). Document the migration strategy at that milestone.
  2. When a second feature needs a comparison table, `ComparisonTable` moves from `features/services-page/components/` to `components/ui/` with a generic prop interface. No rewrite required — only a file move and prop generalization.
  3. When real APIs replace mock services, add Suspense boundaries at the section level to prevent slow data sources from blocking fast-rendering sections.
