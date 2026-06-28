# Architectural and Design Decisions

A record of every significant decision made during the design and development of this platform. Each entry includes context and rationale so that future decisions can be made with full awareness of prior trade-offs.

---

## Homepage Layout

**Decision:** Single-page scrolling homepage with 13 distinct sections, each owning a clear responsibility.

**Rationale:** Executives decide quickly. A single scrolling page allows a CEO who lands on the site to form a complete opinion without clicking through multiple pages. Each section serves a specific trust-building function: credentials → services → proof → methodology → process → social proof → CTA.

**Status:** Approved and locked.

---

## Hero Messaging

**Decision:** Headline "Find the Attack Paths That Matter — Before Attackers Do" with an executive-first supporting paragraph targeting CEOs, CTOs, and CISOs.

**Rationale:** Rejected generic security positioning ("penetration testing services") in favour of outcome-oriented, business-risk language. The headline speaks directly to the executive's fear (attackers exploiting gaps before they're found) and the value proposition (finding them first). The paragraph names the target audience explicitly so visitors self-qualify immediately.

**Status:** Approved and locked.

---

## Trust Statement Placement

**Decision:** Two trust statements placed below the supporting paragraph and above the CTAs:
1. "Helping CEOs, CTOs, and CISOs uncover the attack paths that compliance audits and automated scanners often miss."
2. "You work directly with me — from the first conversation to the final remediation review."

**Rationale:** These address the two most common executive objections before the CTA appears: (1) Why not just run a scanner? (2) Will I be handed off to a junior? Placing them immediately before the CTAs ensures they are read just before the decision moment.

**Status:** Approved and locked.

---

## No Portfolio Framing

**Decision:** The platform is described as a "cybersecurity consulting platform", not a portfolio.

**Rationale:** Portfolio websites signal freelancer or junior positioning. This platform is positioned to compete with boutique consulting firms. Every design, copy, and engineering decision must reinforce that positioning.

**Status:** Established as project principle.

---

## Executive Security Briefing Section

**Decision:** The homepage includes a live-feeling Executive Security Briefing section with a threat summary panel, risk metrics, and an intelligence feed.

**Rationale:** No other individual security consultant homepage has this. It demonstrates real-time threat awareness and creates the impression of a consultant who is actively tracking the threat landscape. It builds trust with CISOs and technical leaders who understand what they're looking at. Data is currently mocked but the architecture supports live API wiring (Shodan, ThreatFox, VirusTotal).

**Status:** Approved and locked.

---

## Intelligence Hub Direction

**Decision:** The Intelligence Hub (`/intelligence-hub`) will be a publishing platform for original offensive security intelligence articles, not an aggregation feed or news reader.

**Rationale:** Aggregated content has no differentiation. Original analysis — "how attackers move from user to domain admin" — builds genuine authority. The articles serve dual purpose: executive trust-building and organic SEO for service-specific queries.

**Status:** Approved (roadmap item, not yet implemented).

---

## Manual + Automated + AI-Assisted Methodology

**Decision:** The methodology section presents a 6-phase approach: Scoping & Intelligence, Enumeration & Discovery, Exploitation & Impact, Reporting & Remediation, Remediation Verification, Continuous Improvement.

**Rationale:** This sequence mirrors how real-world adversarial testing actually works and differentiates the approach from automated scanning. Including Remediation Verification and Continuous Improvement signals that the engagement doesn't end at the report — a key differentiator for enterprise clients.

**Status:** Approved and locked.

---

## Fixed-Fee Engagement Model

**Decision:** "Fixed-fee engagements" is listed as the first trust reason and reinforced across the homepage.

**Rationale:** Day-rate billing creates budget uncertainty that kills deals with enterprise procurement teams. Fixed-fee removes the primary financial objection before it is raised.

**Status:** Approved and locked.

---

## NDA-First Policy

**Decision:** "NDA before scoping" is a featured trust reason and referenced in multiple sections.

**Rationale:** The NDA-first policy directly addresses enterprise procurement's concern about sharing sensitive architecture information with an external consultant. Naming it prominently demonstrates that this has been thought through.

**Status:** Approved and locked.

---

## CTA Strategy

**Decision:** Primary CTA is "Book a Consultation" (opens contact modal). Secondary CTA is "View Case Studies" (links to security impact section).

**Rationale:** "Book a Consultation" commits to action without the risk word "hire". It frames the first step as a conversation, not a purchase. The secondary CTA gives hesitant visitors a lower-commitment next step (reading evidence rather than engaging).

**Status:** Approved and locked.

---

## Contact Modal vs Dedicated Page

**Decision:** Contact form lives in a modal triggered from any CTA button, rather than a dedicated `/contact` page.

**Rationale:** Reduces navigation steps to zero. The modal can be opened from any point in the page — hero, services, meet section, footer CTA — without losing the visitor's scroll position. A dedicated contact page will be added as a supplementary route for direct-navigation and referral traffic.

**Status:** Approved (modal implemented; standalone page is a planned roadmap item).

---

## Navigation Links to Anchors (Homepage Only)

**Decision:** Current navigation links scroll to homepage sections (`#services`, `#security-analysis`, `#meet-islam`) rather than routing to separate pages.

**Rationale:** During Phase 1, all content exists on the homepage. Links will be updated to proper routes as dedicated pages are built. The navbar structure is already designed to support this transition.

**Status:** Active (will be updated as pages are built).

---

## Homepage Lock

**Decision:** The homepage is locked as a production baseline as of 2026-06-28. No redesign, re-layout, or copy changes may be made without explicit approval.

**Rationale:** The homepage passed all production readiness checks (responsive, accessible, performant, secure, quality) and the design has been approved. Locking it prevents scope creep and establishes a stable foundation for future page development.

**Status:** Locked.

---

## Feature-First Architecture

**Decision:** Code is organised by feature (`/features/hero`, `/features/services-section`, etc.), not by file type (`/components`, `/hooks`, `/styles`).

**Rationale:** As the project scales to many pages and sections, feature-first organisation keeps related code co-located. A developer can find everything about the services section in one place rather than searching across multiple directories.

**Status:** Established as architectural principle.

---

## Server Components by Default

**Decision:** All React components are Server Components unless they require browser APIs, event handlers, or React hooks. `'use client'` is added only when strictly necessary.

**Rationale:** Server Components reduce client-side JavaScript, improve performance, and allow lucide-react icons and other libraries to be rendered server-side without adding to the client bundle.

**Status:** Established as architectural principle.

---

## CSS Hover Over JS Hover

**Decision:** Card hover effects use CSS classes (`.hover-bg2`, `.hover-bg3`) rather than `onMouseEnter` / `onMouseLeave` event handlers.

**Rationale:** JS hover handlers require the component to be a Client Component, which increases client bundle size and prevents server rendering. CSS hover is more performant and allows these components to remain Server Components.

**Status:** Established as pattern. Applied to ServiceCard, MethodCard, WorkCard, WhyCard.

---

## Zod Deferred to Modal Open

**Decision:** Zod validation (and the contact form bundle) is deferred via `next/dynamic` and does not ship in the initial page load.

**Rationale:** Zod is ~330KB. Including it in the initial bundle would materially harm performance. The contact form is only accessed by users who click "Book a Consultation" — a small fraction of visitors. Deferring it to modal open is the correct trade-off.

**Status:** Implemented.

---

## Delegated Click Handler for `[data-open-contact]`

**Decision:** `ModalProvider` registers a global delegated click listener that opens the contact modal when any element with `data-open-contact` is clicked.

**Rationale:** Server Components cannot call `useModal()` because hooks require Client Components. The delegation pattern allows server-rendered buttons and links (inside `ServiceCard`, `RiskMetricsPanel`, etc.) to trigger the client-side modal without requiring those components to become Client Components.

**Status:** Implemented.
