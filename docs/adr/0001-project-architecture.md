# ADR-0001: Project Architecture and Technology Stack

**Date:** 2026-06-28
**Status:** Accepted
**Deciders:** Islam Ahmed

## Context

A professional cybersecurity consulting platform was needed that would:

- Generate inbound consulting leads from C-suite and enterprise decision-makers
- Project executive credibility — competing with boutique consulting firm presences, not freelancer portfolios
- Support a growing content strategy (threat intelligence, case studies)
- Be maintainable by a solo consultant over multiple years
- Perform exceptionally — both for user experience and SEO

The technology choices needed to serve the business objectives first. A complex multi-framework setup would add maintenance burden without proportional benefit.

## Decision

The following stack was selected:

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 (strict) |
| UI library | React 19 |
| Styling | Tailwind CSS v4 |
| Runtime | Node.js (Vercel Edge for middleware) |
| Email | Resend |
| Validation | Zod 4 |
| Fonts | Inter + JetBrains Mono (self-hosted via `next/font`) |
| Icons | lucide-react |
| Forms | react-hook-form + @hookform/resolvers |
| Env validation | @t3-oss/env-nextjs |

## Alternatives Considered

| Alternative | Reason Rejected |
|---|---|
| Astro | Excellent for static sites, but weaker React ecosystem integration; future dynamic features (live intel feeds, CMS) would require more workarounds |
| Remix | Strong for form-heavy apps; less established for content-heavy marketing sites; smaller ecosystem at time of decision |
| SvelteKit | Smaller talent pool; less documentation and community resources for long-term maintenance |
| Plain HTML / WordPress | Insufficient for planned live API integrations and component reuse; poor developer experience for long-term maintenance |
| Custom CMS (Sanity, Contentful) | Deferred — to be evaluated when content volume justifies the integration cost |

## Consequences

**Positive:**
- App Router enables Server Components by default, giving excellent performance without manual optimisation
- Tailwind v4 eliminates the need for a separate CSS file strategy
- TypeScript strict mode catches class of errors at compile time
- `@t3-oss/env-nextjs` prevents the runtime errors caused by missing environment variables
- Self-hosted fonts eliminate a render-blocking external request and guarantee performance

**Negative / Trade-offs:**
- Next.js 16 (Turbopack) is a relatively new major version; some edge cases in the ecosystem may not yet be resolved
- Tailwind v4 CSS layer behaviour differs from v3 in ways that required specific debugging (`@layer` cascade interaction)
- `lucide-react` adds bundle weight if not kept to server components

**Risks:**
- Lock-in to Vercel deployment target for some features (Edge middleware, Image Optimisation). Mitigated by keeping platform-specific code isolated to infrastructure layer.

## References

- [ARCHITECTURE.md](../ARCHITECTURE.md) — full folder structure and component hierarchy
- [ADR-0003](0003-nextjs-app-router.md) — specific decision on App Router vs Pages Router
