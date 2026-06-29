# Coding Standards

This document defines the naming, formatting, and structural conventions used across this codebase. These standards ensure that code written at any point in the project's life remains consistent, readable, and maintainable.

All engineers and AI contributors must follow these standards. A pull request or AI-generated change that violates these standards must be corrected before it is merged.

Related: [ENGINEERING_PRINCIPLES.md](ENGINEERING_PRINCIPLES.md) — the *why* behind these conventions.

---

## 1. Language and Tooling

| Tool | Version | Configuration |
|---|---|---|
| TypeScript | strict mode | `tsconfig.json` — `strict: true`, `noImplicitAny: true` |
| ESLint | Next.js recommended | `.eslintrc.json` — no exceptions |
| Prettier | Default via `next lint` | No custom Prettier config |
| Tailwind CSS | v4 | `app/globals.css` — `@import "tailwindcss"`, `@theme inline` |

---

## 2. File Naming

| Item | Convention | Example |
|---|---|---|
| React components | PascalCase `.tsx` | `ServiceCard.tsx` |
| Non-component TypeScript | camelCase `.ts` | `consulting-services.service.ts` |
| Utility/helper functions | kebab-case `.ts` | `build-metadata.ts` |
| CSS files | kebab-case `.css` | `globals.css` |
| Constants files | kebab-case `.ts` | `constants.ts` |
| Type definition files | kebab-case `.types.ts` | `threat-intel.types.ts` |
| Test files | Same as source, `.test.ts(x)` | `ServiceCard.test.tsx` |

---

## 3. Component Naming

**Rule:** Component names match their file names exactly.

```typescript
// File: ServiceCard.tsx
export function ServiceCard({ ... }: ServiceCardProps) { ... }

// File: ServicesSection.tsx
export function ServicesSection() { ... }
```

**Naming pattern for common component types:**

| Component Type | Suffix | Example |
|---|---|---|
| Page-level section | `Section` | `ServicesSection` |
| Card within a section | `Card` | `ServiceCard` |
| Interactive sub-element | `CTAs` | `MeetIslamCTAs` |
| Modal | `Modal` | `ContactModal` |
| Provider | `Provider` | `ModalProvider` |
| Layout wrapper | none or descriptive | `Container`, `Navbar`, `Footer` |

---

## 4. TypeScript Conventions

### Interfaces Over Types
Use `interface` for object shapes; use `type` for unions, intersections, and aliases.

```typescript
// ✅
interface ServiceCardProps {
  title: string
  description: string
  icon: LucideIcon
}

// ✅
type Severity = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW'

// ❌ — use interface for object shapes
type ServiceCardProps = {
  title: string
}
```

### Explicit Return Types on Public Functions
Service functions and repository methods must have explicit return types. Component render functions do not.

```typescript
// ✅ Service
export async function getConsultingServices(): Promise<ConsultingService[]> { ... }

// ✅ Component (no explicit return type needed)
export function ServiceCard({ title }: ServiceCardProps) {
  return <div>{title}</div>
}
```

### No `any`
`any` is never permitted. Use `unknown` for external data and narrow it before use.

```typescript
// ❌
function parseResponse(data: any) { ... }

// ✅
function parseResponse(data: unknown): ThreatFeedItem {
  return ThreatFeedItemSchema.parse(data)
}
```

### Props Interface Location
Props interfaces are defined in the same file as the component, immediately before the component function.

```typescript
interface ServiceCardProps {
  title: string
  description: string
}

export function ServiceCard({ title, description }: ServiceCardProps) { ... }
```

---

## 5. React Conventions

### Server Components by Default
No `'use client'` directive unless the component requires:
- `useState`, `useReducer`, `useRef`
- `useEffect`, `useLayoutEffect`
- Browser APIs (`window`, `document`, `localStorage`)
- Event handlers (`onClick`, `onSubmit`, `onMouseEnter`)

### One Component Per File
Every file exports exactly one React component. Exception: small, file-specific helper components (less than 20 lines) may be co-located and unexported.

### Destructure Props
Always destructure props in the function signature.

```typescript
// ✅
export function ServiceCard({ title, description, icon: Icon }: ServiceCardProps) { ... }

// ❌
export function ServiceCard(props: ServiceCardProps) {
  return <div>{props.title}</div>
}
```

### No Inline Styles
All visual styling uses Tailwind CSS classes or CSS custom properties. Inline `style` attributes are only acceptable for dynamic values that cannot be expressed as a class (e.g., CSS custom property set from a JavaScript value).

```typescript
// ✅
<div className="flex items-center gap-4 p-6" />

// ❌
<div style={{ display: 'flex', gap: '16px' }} />
```

---

## 6. Tailwind CSS Conventions

### Class Order
Follow the standard Tailwind class ordering (roughly: layout → positioning → sizing → spacing → typography → colour → border → effects):

```typescript
// ✅ Layout first, decorative last
<div className="flex flex-col gap-6 p-8 rounded-lg bg-[var(--bg2)] border border-white/10" />
```

### CSS Custom Properties for Design Tokens
Never hardcode hex colours. Always use CSS custom properties.

```typescript
// ✅
<div className="bg-[var(--bg2)] text-[var(--txt2)]" />

// ❌
<div className="bg-[#0d1117] text-[#a0aec0]" />
```

### Avoid Arbitrary Values Where Possible
Use design system tokens from `lib/layout/constants.ts` or named Tailwind classes over arbitrary values.

```typescript
// ✅ — using named utility
<div className="text-sm font-medium" />

// ❌ — arbitrary where a standard class exists
<div className="text-[14px] font-[500]" />
```

### `!important` Usage
Tailwind's `!` prefix is only used in `globals.css` responsive rules — never in component JSX. Responsive overrides in `globals.css` use `!important` to override Tailwind's specificity. This is documented and intentional.

---

## 7. Import Organisation

Imports are ordered by type, with a blank line between each group:

```typescript
// 1. React / Next.js (framework)
import type { ReactNode } from 'react'
import Image from 'next/image'

// 2. Third-party
import { Shield } from 'lucide-react'

// 3. Internal — absolute (@/)
import { Container } from '@/components/ui/Container'
import { getConsultingServices } from '@/services/consulting-services.service'

// 4. Internal — relative (same feature)
import { ServiceCard } from './ServiceCard'
import type { ConsultingService } from '../types'
```

---

## 8. Comments

**Write no comments by default.**

The only acceptable comments:
- A **non-obvious why**: a hidden constraint, a browser quirk, a framework gotcha
- A documented workaround for a specific third-party bug
- A deliberate deviation from the standard pattern

```typescript
// ✅ — explains a non-obvious constraint
// ssr: false must be in a Client Component wrapper; cannot use next/dynamic with ssr: false in Server Components
const ContactModal = dynamic(() => import('./ContactModal'), { ssr: false })

// ❌ — restates what the code does
// Get the services and map them to cards
const services = await getConsultingServices()
```

Never write:
- JSDoc comments on components (the types already document the API)
- Section divider comments (`// ---- SECTION ----`)
- TODO/FIXME comments (file a task instead)
- "This was added for X" comments (belongs in the commit message)

---

## 9. Constants

### No Magic Numbers
Every literal value that has business meaning must be a named constant.

```typescript
// ❌
const MAX_FEED_ITEMS = 8  // inline magic number

// ✅ — in lib/layout/constants.ts or the relevant feature constants.ts
export const THREAT_FEED_MAX_ITEMS = 8
```

### Constant Location
- **Layout tokens** → `lib/layout/constants.ts`
- **Feature-specific constants** → `features/[name]/constants.ts`
- **API URLs and configuration** → `lib/integrations/[source].client.ts` (at the top of the file)

---

## 10. Error Handling

### API Routes
All API route handlers return typed JSON responses and never expose internal error details.

```typescript
// ✅
try {
  await sendEmail(payload)
  return NextResponse.json({ success: true })
} catch (error) {
  console.error('Contact form error:', error)
  return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
}
```

### Services
Service functions propagate errors upward. They do not swallow errors silently.

### Repositories
Repositories that call external APIs catch network errors and apply fallback logic (see [THREAT_INTELLIGENCE_ARCHITECTURE.md](THREAT_INTELLIGENCE_ARCHITECTURE.md) for the layered fallback pattern).

---

## 11. Security Standards

### External Links
All external links (not same-domain) must have:
```typescript
<a href={url} target="_blank" rel="noopener noreferrer">...</a>
```

### Input Validation
All data arriving at API routes from the network must be validated with Zod before being used.

```typescript
// ✅
const body = ContactFormSchema.parse(await request.json())

// ❌
const body = await request.json()  // unvalidated
```

### No Client-Side Secrets
Environment variables accessed in Client Components must be prefixed `NEXT_PUBLIC_`. Anything else is server-only. API keys, signing secrets, and service credentials must never be `NEXT_PUBLIC_`.

### `dangerouslySetInnerHTML`
Permitted only for hardcoded, trusted, static content (e.g., JSON-LD structured data). Never for dynamic user-supplied or API-sourced content.

---

## 12. Accessibility Standards

For every new component or page:
- Use semantic HTML elements (`<article>`, `<section>`, `<nav>`, `<header>`, `<main>`, `<footer>`, `<aside>`)
- Heading hierarchy must be sequential (`h2` inside a section that has an `h1` parent)
- Interactive elements must have an accessible name (button text, `aria-label`, or `aria-labelledby`)
- Images must have `alt` text; decorative images use `alt=""`
- Animations must respect `prefers-reduced-motion`

See [QUALITY_GATES.md](QUALITY_GATES.md) for the full accessibility checklist to verify before shipping.

---

## 13. Git Conventions

### Commit Message Format
```
<type>: <short imperative description>

<optional body — explain the why, not the what>
<blank line>
Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
```

**Types:** `feat`, `fix`, `perf`, `refactor`, `docs`, `chore`, `security`

### Branch Naming
```
feature/services-page
fix/contact-form-validation
docs/adr-threat-intelligence
perf/defer-zod-bundle
```

### When to Commit
Commit at every meaningful milestone:
- After a quality phase passes
- After a new page or section is implemented and verified
- After documentation is complete
- Never commit broken code — build and lint must pass first
