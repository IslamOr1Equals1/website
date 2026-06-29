# Architecture Decision Records

This directory contains Architecture Decision Records (ADRs) for the Islam Ahmed Cybersecurity Consulting Platform.

## What is an ADR?

An ADR captures a significant architectural or product decision made during the lifetime of the project. It records the context that made the decision necessary, the decision itself, alternatives that were considered, and the consequences of the choice.

ADRs are **immutable once accepted**. If a decision is reversed or superseded, a new ADR is created referencing the original. This preserves the full history of why the project is the way it is.

## When to Write an ADR

Write an ADR whenever a decision:

- Is difficult to reverse
- Affects multiple parts of the system
- Involves a meaningful trade-off between alternatives
- Would be confusing to a future engineer without explanation
- Changes the architectural direction of the project

## Status Lifecycle

| Status | Meaning |
|---|---|
| `Proposed` | Under discussion — not yet implemented |
| `Accepted` | Approved and in effect |
| `Deprecated` | Was accepted, but is no longer recommended |
| `Superseded by ADR-XXXX` | Replaced by a newer decision |

## Index

| ADR | Title | Status |
|---|---|---|
| [0001](0001-project-architecture.md) | Project Architecture and Technology Stack | Accepted |
| [0002](0002-feature-first-architecture.md) | Feature-First Folder Architecture | Accepted |
| [0003](0003-nextjs-app-router.md) | Next.js App Router with Server Components | Accepted |
| [0004](0004-design-system.md) | Design System and Visual Language | Accepted |
| [0005](0005-homepage-v1.md) | Homepage v1 Information Architecture | Accepted |
| [0006](0006-homepage-release-v1.0.0.md) | Homepage v1.0.0 Production Release | Accepted |
| [0007](0007-threat-intelligence-strategy.md) | Threat Intelligence Integration Strategy | Accepted |

## How to Add a New ADR

1. Copy the template below
2. Number it sequentially (next is `0008`)
3. Fill in all sections
4. Add it to the index above
5. Reference it from `CHANGELOG.md` and `DECISIONS.md` as appropriate

## ADR Template

```markdown
# ADR-XXXX: Title

**Date:** YYYY-MM-DD
**Status:** Proposed | Accepted | Deprecated | Superseded by ADR-XXXX
**Deciders:** Islam Ahmed

## Context

What situation or problem made this decision necessary?

## Decision

What was decided?

## Alternatives Considered

| Alternative | Reason Rejected |
|---|---|
| Option A | ... |
| Option B | ... |

## Consequences

**Positive:**
- ...

**Negative / Trade-offs:**
- ...

**Risks:**
- ...

## References

- [Link to relevant documentation]
```
