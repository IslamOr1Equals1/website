# ADR-0004: Design System and Visual Language

**Date:** 2026-06-28
**Status:** Accepted
**Deciders:** Islam Ahmed

## Context

A cybersecurity consulting platform for C-suite audiences requires a visual language that communicates trust, precision, and authority. The design direction needed to be defined and enforced so that every new page and component adheres to the same standards without renegotiating aesthetic choices.

A secondary concern: cybersecurity aesthetics have strong clichés (Matrix effects, terminal UIs, anonymous masks, excessive neon) that undermine executive credibility when overused.

## Decision

The visual language is **premium enterprise consulting**, not cybersecurity spectacle.

The design system is implemented as:

1. **CSS custom properties** (design tokens) defined in `app/globals.css` under `:root`
2. **Tailwind v4 theme mapping** via `@theme inline` that exposes tokens as Tailwind utilities
3. **`LAYOUT` constants** in `lib/layout/constants.ts` for spacing and container dimensions
4. **`Container` component** in `components/ui/Container.tsx` as the single source of inner section width
5. **Section pattern** documented in `DESIGN_SYSTEM.md` — all sections follow an identical structural template

Key constraints enforced by this system:
- No hardcoded hex values in components — always reference a token
- No hardcoded spacing values — always reference `LAYOUT` constants or Tailwind scale
- No inline hover JavaScript — use `.hover-bg2` / `.hover-bg3` CSS utilities
- All animations respect `prefers-reduced-motion`

## Alternatives Considered

| Alternative | Reason Rejected |
|---|---|
| CSS Modules per component | Fragmented; makes global token changes difficult; no Tailwind utility access |
| Styled Components / Emotion | Runtime CSS-in-JS conflicts with Server Components; performance penalty |
| Separate design token file (JSON/YAML) | Extra build step; simpler to keep tokens in CSS where they are consumed |
| Shadcn/ui component library | Opinionated visual style that would require significant overriding; better to own the design system entirely for a custom brand |

## Consequences

**Positive:**
- Design token changes (one color update) propagate instantly across the entire site
- Every new component inherits the correct visual language by default
- The `Container` component ensures consistent content width without per-section calculations
- Enforced constraints prevent aesthetic drift as the project scales

**Negative / Trade-offs:**
- No visual component library to scaffold from — every card, button, and section is written from scratch
- The token system requires documentation discipline; a new contributor must read `DESIGN_SYSTEM.md` before adding components

**Risks:**
- Token naming must remain stable; renaming a token (e.g., `--bg2` to `--surface-secondary`) requires a global find-replace
- The `LAYOUT` constants are referenced via inline `style` props (to override Tailwind defaults), which means responsive overrides require global CSS selectors rather than per-component Tailwind classes

## References

- [DESIGN_SYSTEM.md](../DESIGN_SYSTEM.md) — full token reference, typography scale, spacing system, component patterns
- [ARCHITECTURE.md](../ARCHITECTURE.md) — `Container` component documentation
- [ADR-0005](0005-homepage-v1.md) — how the design system was applied to the homepage
