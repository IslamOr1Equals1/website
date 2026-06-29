# Islam Ahmed — Cybersecurity Consulting Platform

A production-grade personal consulting platform for an Offensive Security Consultant and Penetration Tester. Built to generate qualified consulting leads from C-suite executives across fintech, SaaS, healthcare, and enterprise.

**Homepage:** Live at v1.0.0 — locked.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript (strict mode) |
| Styling | Tailwind CSS v4 |
| Runtime | React 19 |
| Email | Resend |
| Deployment | Vercel |

---

## Development

```bash
npm install
npm run dev       # Start dev server (localhost:3000)
npm run build     # Production build
npm run lint      # ESLint
npx tsc --noEmit  # TypeScript check
```

---

## Project Structure

```
app/                  # Next.js App Router
  (marketing)/        # Route group — homepage + future pages
  api/                # API routes (contact form)
  globals.css         # Design tokens, responsive rules, global styles
features/             # Feature-first components (one folder per section)
  hero/
  services-section/
  executive-briefing/
  contact/
  ...
services/             # Business logic / data transformation
repositories/         # Data access layer (mock → live API)
lib/                  # Shared utilities
  integrations/       # External API clients
  api/                # HTTP client with retry
  layout/             # Spacing constants
  seo/                # Metadata builder
  security/           # CSP builder
providers/            # React context providers (modal, theme)
config/               # Site-wide configuration
docs/                 # Project documentation
```

---

## Documentation

All project documentation is in `docs/`. Start with [`docs/README.md`](docs/README.md) for the full index.

Key documents:

| Document | Purpose |
|---|---|
| [`docs/PRD.md`](docs/PRD.md) | Product vision, personas, business goals |
| [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) | Technical architecture |
| [`docs/ENGINEERING_PRINCIPLES.md`](docs/ENGINEERING_PRINCIPLES.md) | Engineering principles |
| [`docs/QUALITY_GATES.md`](docs/QUALITY_GATES.md) | Quality standards for every page |
| [`docs/SECURITY_MODEL.md`](docs/SECURITY_MODEL.md) | Security architecture |
| [`docs/DEVELOPMENT_WORKFLOW.md`](docs/DEVELOPMENT_WORKFLOW.md) | How to implement a new page |
| [`docs/CHANGELOG.md`](docs/CHANGELOG.md) | What changed and when |
| [`docs/adr/`](docs/adr/) | Architecture Decision Records |

---

## Current Status

| Area | Status |
|---|---|
| Homepage | v1.0.0 — locked |
| Services page | In planning |
| Intelligence Hub | Planned — Phase 3 |
| Live threat intelligence | Stubbed — Phase 7 |
| CMS integration | Planned — Phase 8 |

See [`docs/PROJECT_ROADMAP.md`](docs/PROJECT_ROADMAP.md) for the full roadmap.

---

## Working on This Project

Before writing any code:
1. Read [`docs/DEVELOPMENT_WORKFLOW.md`](docs/DEVELOPMENT_WORKFLOW.md)
2. Present a written plan → file list → rationale → risks
3. Wait for explicit approval
4. Implement → build → lint → typecheck → QA phases → approval

The homepage is locked. Do not modify it without explicit approval.
