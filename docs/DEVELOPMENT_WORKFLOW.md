# Development Workflow

This document defines the required lifecycle for every future page, feature, or milestone on this project. No code may be written before the planning and approval steps are complete.

---

## Guiding Principles

1. **Stability over speed.** A slower, deliberate process produces maintainable code.
2. **Approval gates are mandatory.** No implementation begins without explicit approval.
3. **Locked pages are untouchable.** Approved and locked pages may not be modified except for bug fixes, security fixes, or performance optimizations that do not alter behaviour or appearance.
4. **Build verification is non-negotiable.** Every meaningful change must pass build, lint, and typecheck before it is considered complete.
5. **Definition of Done is absolute.** A page or feature is not complete until every criterion is met.

---

## Page Development Lifecycle

Every new page follows these steps in order. Steps may not be skipped.

### Step 1 — Planning

Before writing a single line of code, present a written implementation plan covering:

- **Information architecture** — what content lives on this page and why
- **User journey** — who arrives, what they need, what they should do next
- **Section breakdown** — every section, its purpose, and its position in the hierarchy
- **Component architecture** — which components are new, which are reused, Server vs Client
- **SEO considerations** — page title, description, canonical URL, OG image, structured data
- **Accessibility considerations** — landmark structure, heading hierarchy, interactive elements
- **API / data requirements** — what data is needed and where it comes from
- **Future extensibility** — how the page accommodates planned future content or live data
- **Risks** — any architectural concerns, edge cases, or design challenges
- **Files that will be created or modified** — with a reason for each

### Step 2 — Architecture Review

Review the plan against the existing architecture. Confirm:

- No duplication of existing components or patterns
- No modifications to locked pages
- Consistent with `ARCHITECTURE.md` principles
- Consistent with `DESIGN_SYSTEM.md` tokens and patterns
- Consistent with the feature-first folder structure

### Step 3 — Approval

**Do not begin implementation until explicit approval is given.**

Present the plan and wait. The plan may require revision before approval.

### Step 4 — Implementation

Once approved, implement in this order:

1. Service layer (mock data, API-shaped)
2. Types
3. Server components (sections, cards)
4. Client components (interactivity only)
5. Page file and metadata
6. CSS additions to `globals.css` (if any)
7. Route registration in `config/site.ts` (if nav changes)

Follow all patterns established in `ARCHITECTURE.md` and `DESIGN_SYSTEM.md`.

### Step 5 — Build Verification

Run all three checks. All must pass before proceeding:

```bash
npm run build
npm run lint
npx tsc --noEmit  # if not covered by build
```

Resolve every issue before moving on.

### Step 6 — Responsive QA

Test at all 9 standard viewports:

| Viewport | Category |
|---|---|
| 320px | Smallest mobile |
| 375px | iPhone SE / standard mobile |
| 390px | iPhone 14 |
| 414px | iPhone Plus |
| 768px | Tablet portrait |
| 1024px | Tablet landscape / small laptop |
| 1280px | Standard desktop |
| 1440px | Large desktop |
| 1920px | Wide desktop |

Verify: no horizontal overflow, correct grid collapse, readable typography, no clipped content.

### Step 7 — Accessibility QA

Verify:

- Single `<h1>` per page
- Sequential heading hierarchy (no skipped levels)
- All sections have `aria-labelledby`
- All interactive elements have accessible names
- All images have `alt` attributes
- External links include `rel="noopener noreferrer"` and screen-reader new-tab notice
- `<header>`, `<main>`, `<nav>`, `<footer>` landmarks present
- Keyboard navigation works for all interactive elements

### Step 8 — Performance QA

Verify production build metrics:

- TTFB under 200ms
- FCP under 1.8s
- No new third-party scripts added to initial load
- No large dependencies added to client bundle without justification
- New images use `next/image` with explicit width/height

### Step 9 — Final Approval

Present the completed page for review. Include:

- Screenshot or screen recording of the page
- QA results summary (responsive, accessibility, performance, build)
- List of all files created or modified

Wait for explicit approval before proceeding.

### Step 10 — Git Milestone

Once approved, recommend a Git commit message summarising the work. Format:

```
feat(services): implement Services page with 6 service detail cards

- Adds /services route under (marketing) layout
- Service data driven by consulting-services.service.ts
- Fully responsive, accessible, and performance-verified
- All QA phases passed
```

The approved state at this commit becomes the new project baseline.

### Step 11 — Lock

Record the page as locked in `DECISIONS.md` and append a milestone entry to `CHANGELOG.md`.

---

## Development Rules

### What is always forbidden

- Redesigning any approved, locked page
- Refactoring code unrelated to the current milestone
- Modifying locked pages for any reason other than bug, security, or performance fix
- Introducing breaking changes to the existing design system
- Removing approved content without explicit approval
- Committing without passing build + lint + typecheck

### What requires explicit approval before starting

- Any new page
- Any new section on an existing page
- Any change to `globals.css` design tokens
- Any change to `LAYOUT` constants
- Any change to the navigation structure
- Any new dependency added to `package.json`
- Any modification to `proxy.ts` (middleware / security headers)
- Any modification to `lib/security/csp.ts`

### What may proceed without approval

- Bug fixes on non-locked pages
- Adding new mock data to an existing service
- Updating documentation files under `docs/`
- Adding new entries to `CHANGELOG.md`

---

## Definition of Done

A page or feature is **complete** only when every item is checked:

- [ ] All planned functionality is implemented
- [ ] `npm run build` passes with no errors
- [ ] `npm run lint` passes with no warnings
- [ ] TypeScript passes with no errors
- [ ] No runtime errors in browser console
- [ ] Responsive: all 9 viewports verified
- [ ] Accessibility: heading hierarchy, landmarks, ARIA, keyboard nav
- [ ] Performance: TTFB, FCP, bundle size reviewed
- [ ] Security: no new vulnerabilities introduced, headers unchanged
- [ ] Final approval received
- [ ] Git milestone recommended
- [ ] `CHANGELOG.md` updated
- [ ] `DECISIONS.md` updated (if any new decisions were made)
- [ ] Page marked as LOCKED

---

## Documentation Updates

After every milestone, update:

| File | What to update |
|---|---|
| `CHANGELOG.md` | Append milestone entry with date and changes |
| `DECISIONS.md` | Record any new architectural or design decisions |
| `PROJECT_ROADMAP.md` | Mark completed items, update status table |
| `ARCHITECTURE.md` | Update if new patterns, routes, or components were introduced |
| `DESIGN_SYSTEM.md` | Update if new tokens, utilities, or component patterns were added |
