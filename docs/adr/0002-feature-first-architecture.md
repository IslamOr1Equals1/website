# ADR-0002: Feature-First Folder Architecture

**Date:** 2026-06-28
**Status:** Accepted
**Deciders:** Islam Ahmed

## Context

The project will grow to 10+ pages, 50+ components, and multiple data domains (services, intelligence, case studies, testimonials). A folder structure needed to be chosen that would remain navigable as the codebase scaled.

Two main approaches were evaluated: type-first (grouping by `components/`, `hooks/`, `utils/`) and feature-first (grouping by feature domain).

## Decision

The project uses **feature-first folder organisation**. Every feature owns its components, types, services, hooks, constants, and animations. The `features/` directory is the primary home for all UI logic.

```
features/
├── hero/
│   ├── components/   # All hero UI
│   └── types/        # Hero-specific types
├── services-section/
│   └── components/
└── [other features]/
```

Cross-cutting concerns (shared UI primitives, layout constants, providers) live outside `features/` in purpose-named directories (`components/ui/`, `lib/`, `providers/`).

## Alternatives Considered

| Alternative | Reason Rejected |
|---|---|
| Type-first (`/components`, `/hooks`, `/styles`) | As the codebase grows, related code becomes scattered; a change to one feature requires hunting across many directories |
| Flat `/components` | Unworkable beyond ~20 components without aggressive naming conventions that still obscure relationships |
| Domain-driven (pages as the root) | Works for routing but doesn't map cleanly to reusable section components that appear across pages |

## Consequences

**Positive:**
- All code related to a feature is co-located: a developer making changes to the `meet-islam` section touches only `features/meet-islam/`
- New features are scaffolded predictably: create the feature directory and follow the pattern
- Deletion of a feature is clean — one directory to remove
- Encourages thinking about features as isolated units, which aligns with the service layer abstraction

**Negative / Trade-offs:**
- Some components span features (e.g., `Container`, `ScrollReveal`) and need a home outside `features/`; judgement is required to decide what is shared vs feature-specific
- Feature boundaries are not always obvious for small components

**Risks:**
- Features that grow very large (e.g., Intelligence Hub) will need internal sub-structure; the convention should be extended, not abandoned

## References

- [ARCHITECTURE.md](../ARCHITECTURE.md) — full folder structure documentation
- [CODING_STANDARDS.md](../CODING_STANDARDS.md) — naming and structure conventions
