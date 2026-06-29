# ADR-0003: Next.js App Router with Server Components by Default

**Date:** 2026-06-28
**Status:** Accepted
**Deciders:** Islam Ahmed

## Context

Next.js offers two routing paradigms: the legacy Pages Router and the current App Router. The App Router introduces React Server Components (RSC), a model where components render on the server by default and opt into client-side interactivity only when required.

The choice between them has significant performance and architectural implications.

## Decision

The project uses the **App Router** exclusively. All components are Server Components by default. Client Components (`'use client'`) are used only when a component requires:

- Browser APIs (`window`, `document`, `localStorage`)
- React hooks (`useState`, `useEffect`, `useRef`, etc.)
- DOM event handlers (`onClick`, `onMouseEnter`, etc.)
- Third-party libraries that depend on the browser context

A component that only renders HTML and reads props is always a Server Component.

## Alternatives Considered

| Alternative | Reason Rejected |
|---|---|
| Pages Router | Legacy approach; no Server Components; larger client bundles; no route group support; would require migration later |
| Hybrid (Pages + App Router) | Adds complexity without benefit; no pages require the legacy model |
| Client-side SPA (no SSR) | Catastrophic for SEO; unacceptable for a business-critical marketing site |

## Consequences

**Positive:**
- Server Components eliminate JavaScript bundle overhead for all static UI: icons, section layouts, card grids render as pure HTML
- `lucide-react` icon components are never shipped to the browser — only their SVG output
- Excellent Core Web Vitals by default (low JS, fast TTFB, server-rendered HTML)
- Route groups (`(marketing)`) allow shared layouts without affecting URL structure
- `generateStaticParams` enables static generation of dynamic routes (future service detail pages, article pages)

**Negative / Trade-offs:**
- Developers must consciously track the Server/Client boundary; forgetting `'use client'` causes runtime errors when hooks are used
- Some third-party libraries (animation, charting) require Client Components regardless of need
- `next/dynamic` with `ssr: false` is needed for components that use browser-only APIs but must not be included in the initial bundle

**Risks:**
- The RSC model is still evolving; some third-party library support is incomplete. Mitigated by keeping the library surface small and preferring native CSS over JS animation.

## References

- [ARCHITECTURE.md](../ARCHITECTURE.md) — Server vs Client component table
- [ENGINEERING_PRINCIPLES.md](../ENGINEERING_PRINCIPLES.md) — "Server Components by default" principle
- [ADR-0001](0001-project-architecture.md) — overall stack decision
