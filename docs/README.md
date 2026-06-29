# Documentation

This directory contains all project documentation for the Islam Ahmed Cybersecurity Consulting Platform.

Every document here serves a specific, permanent purpose. These are not throwaway planning notes — they are living reference documents maintained alongside the codebase.

---

## Quick Reference

| I want to understand... | Read this |
|---|---|
| What this product is and who it's for | [PRD.md](PRD.md) |
| The technical architecture | [ARCHITECTURE.md](ARCHITECTURE.md) |
| The design system and visual language | [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) |
| The engineering principles | [ENGINEERING_PRINCIPLES.md](ENGINEERING_PRINCIPLES.md) |
| Coding conventions and naming rules | [CODING_STANDARDS.md](CODING_STANDARDS.md) |
| The security model | [SECURITY_MODEL.md](SECURITY_MODEL.md) |
| What quality standards must be met | [QUALITY_GATES.md](QUALITY_GATES.md) |
| How to implement a new page | [DEVELOPMENT_WORKFLOW.md](DEVELOPMENT_WORKFLOW.md) |
| Why a specific technical decision was made | [adr/](adr/) |
| All API integrations and their status | [API_INTEGRATIONS.md](API_INTEGRATIONS.md) |
| The threat intelligence architecture | [THREAT_INTELLIGENCE_ARCHITECTURE.md](THREAT_INTELLIGENCE_ARCHITECTURE.md) |
| The product roadmap | [PROJECT_ROADMAP.md](PROJECT_ROADMAP.md) |
| A history of decisions and rationale | [DECISIONS.md](DECISIONS.md) |
| What changed and when | [CHANGELOG.md](CHANGELOG.md) |
| The complete Services page implementation spec | [SERVICES_PAGE_SPEC.md](SERVICES_PAGE_SPEC.md) |

---

## Document Index

### Product

- **[PRD.md](PRD.md)** — Product Requirements Document. Vision, personas, business goals, conversion objectives, competitive positioning, SEO strategy, content strategy, and the long-term roadmap. The strategic north star for all decisions.

- **[PROJECT_ROADMAP.md](PROJECT_ROADMAP.md)** — Development phases, milestones, planned pages, and the timeline from homepage through full platform maturity.

### Architecture and Engineering

- **[ARCHITECTURE.md](ARCHITECTURE.md)** — Technical architecture: stack, folder structure, routing, Server vs Client Component strategy, service layer, repository pattern, providers, middleware, and API architecture.

- **[ENGINEERING_PRINCIPLES.md](ENGINEERING_PRINCIPLES.md)** — The 16 engineering principles that govern every code decision. Covers SOLID principles, React patterns, type safety, accessibility, security, performance, and maintainability.

- **[CODING_STANDARDS.md](CODING_STANDARDS.md)** — Naming conventions, file structure, TypeScript standards, Tailwind conventions, import order, comment rules, constants, error handling, and git conventions.

- **[DESIGN_SYSTEM.md](DESIGN_SYSTEM.md)** — Colour tokens, typography scale, spacing system, Container usage, grid system, animation principles, CSS hover utilities, and section structure patterns.

### Security

- **[SECURITY_MODEL.md](SECURITY_MODEL.md)** — Complete security model: threat model, HTTP security headers, CSP design, input validation, secrets management, XSS prevention, dependency security, and incident response.

### Quality

- **[QUALITY_GATES.md](QUALITY_GATES.md)** — The 8 mandatory quality gates (Build, TypeScript, Lint, Responsive, Accessibility, Performance, Security, Code Quality) with pass/fail criteria and verification procedures for each.

### Integrations

- **[API_INTEGRATIONS.md](API_INTEGRATIONS.md)** — Every current and planned API integration, with authentication, rate limits, caching strategy, error handling, and priority order.

- **[THREAT_INTELLIGENCE_ARCHITECTURE.md](THREAT_INTELLIGENCE_ARCHITECTURE.md)** — The 7-layer architecture for the threat intelligence system: integration clients → API client → normalisation → cache → AI summarisation → service layer → frontend rendering.

### Implementation Specifications

- **[SERVICES_PAGE_SPEC.md](SERVICES_PAGE_SPEC.md)** — Complete production-ready implementation specification for the Services page (Milestone v1.1.0). Contains: 14-section architecture, trust signal ownership map, full section specifications, data model, component list (28 files), file impact analysis, SEO spec, accessibility requirements, engineering standards, and implementation sequence.

### History and Decisions

- **[CHANGELOG.md](CHANGELOG.md)** — Chronological record of all significant changes, in Keep a Changelog format. Updated at every milestone.

- **[DECISIONS.md](DECISIONS.md)** — Major technical decisions with rationale and status. Superseded by ADRs for new decisions — see `adr/` directory.

- **[DEVELOPMENT_WORKFLOW.md](DEVELOPMENT_WORKFLOW.md)** — The complete workflow for implementing a new page: plan → approval → implementation → quality gates → documentation → declaration.

### Architecture Decision Records

**[adr/](adr/)** — Immutable decision records. Once accepted, an ADR is never deleted — it is superseded by a newer ADR if the decision changes.

| ADR | Decision |
|---|---|
| [0001](adr/0001-project-architecture.md) | Technology stack |
| [0002](adr/0002-feature-first-architecture.md) | Feature-first folder structure |
| [0003](adr/0003-nextjs-app-router.md) | Next.js App Router and Server Components |
| [0004](adr/0004-design-system.md) | Design system and visual language |
| [0005](adr/0005-homepage-v1.md) | Homepage information architecture |
| [0006](adr/0006-homepage-release-v1.0.0.md) | Homepage production release v1.0.0 |
| [0007](adr/0007-threat-intelligence-strategy.md) | Threat intelligence integration strategy |
| [0008](adr/0008-services-page-architecture.md) | Services page architecture and component strategy |

---

## Documentation Maintenance

### When to update documentation

| Event | Documents to update |
|---|---|
| New page approved and implemented | `CHANGELOG.md`, `PROJECT_ROADMAP.md`, create ADR, update `DECISIONS.md` |
| New API integration added | `API_INTEGRATIONS.md`, `THREAT_INTELLIGENCE_ARCHITECTURE.md` (if relevant) |
| New significant technical decision | Create new ADR in `adr/`, cross-reference from `DECISIONS.md` |
| Security issue found and fixed | `SECURITY_MODEL.md` (if model changes), `CHANGELOG.md` |
| Quality gate standards changed | `QUALITY_GATES.md` |
| Engineering principle added or changed | `ENGINEERING_PRINCIPLES.md` |
| Design system extended | `DESIGN_SYSTEM.md` |
| Dependency added or removed | `ARCHITECTURE.md` stack table |

### What not to document here
- Task-level planning or in-progress notes (use conversation context or tasks)
- Git history or who-changed-what (use `git log`)
- Code explanations (code should be self-explanatory; comments for non-obvious *why* only)
- Temporary debugging notes

### Documentation quality standards
- Every document is accurate at the time of writing
- Stale information is worse than no information — update or remove
- Cross-references use relative markdown links (not URLs)
- Tables are used for structured comparisons; prose for explanations
- Documents are written for a reader who has not seen the conversation that produced them
