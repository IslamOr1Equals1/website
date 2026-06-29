# Engineering Principles

These principles govern every engineering decision on this project. They are not aspirational — they are the standards by which code is written, reviewed, and accepted. A new engineer, or a future AI, reading this file should be able to make the same decisions the original engineer would make.

---

## 1. Server Components by Default

**Principle:** Every React component is a Server Component unless there is a specific, documented reason it must be a Client Component.

**Rationale:** Server Components render on the server and send HTML to the browser. They produce no JavaScript bundle overhead. A card component that renders an icon and some text does not need to be a Client Component — it never will. Defaulting to Server Components keeps the client bundle minimal and performance excellent.

**In practice:**
- Before adding `'use client'`, ask: does this component use `useState`, `useEffect`, a browser API, or an event handler? If no, remove `'use client'`.
- Icons from `lucide-react` render as pure SVG in Server Components. They add zero client JavaScript.
- Hover effects use CSS classes (`.hover-bg2`, `.hover-bg3`), not `onMouseEnter`/`onMouseLeave`.

---

## 2. Client Components Only When Required

**Principle:** `'use client'` is a directive that carries a cost. It must be justified.

**Rationale:** Each Client Component boundary adds to the JavaScript bundle sent to the browser. A component marked `'use client'` and all its children are included in the client bundle. Wrapping a large section component in `'use client'` because it has one interactive button is wrong — the button should be extracted as its own small Client Component.

**In practice:**
- If a component needs `useModal()` just for a button, extract the button to its own `*CTAs.tsx` Client Component.
- Use `next/dynamic` with `ssr: false` for components that are Client-side-only AND non-critical to the initial render (e.g., the contact modal).

---

## 3. Repository Pattern

**Principle:** All data access is abstracted behind a repository interface.

**Rationale:** The UI should not know whether data comes from a mock array, a database, a REST API, or a CMS. The repository is the boundary. This means the UI layer is never rewritten when the data source changes — only the repository implementation changes.

**In practice:**
- `repositories/` contains classes implementing typed interfaces
- Services call repositories; components call services
- Mock data lives in the repository, not in components or services

---

## 4. Service Layer

**Principle:** Business logic and data transformation belong in the service layer, not in components.

**Rationale:** Components should only concern themselves with rendering. If a component is filtering, sorting, or mapping data — that logic belongs in a service function. Services are easier to test, easier to change, and easier to understand in isolation.

**In practice:**
- All service functions in `services/` are `async` and return typed data
- Services accept parameters that will eventually map to real API parameters (even if currently ignored by mock implementations)
- Never import a repository directly in a component

---

## 5. Single Responsibility (SOLID — S)

**Principle:** Every function, component, and module has one clearly defined job.

**Rationale:** Code with mixed responsibilities is harder to test, harder to change, and harder to understand. When a component handles data fetching, transformation, layout, and animation all at once, changing any one of those concerns risks breaking the others.

**In practice:**
- Section components fetch data and compose child components; they do not contain card-level rendering logic
- Card components render a single item; they do not fetch their own data
- Services transform data; they do not render anything

---

## 6. Open/Closed (SOLID — O)

**Principle:** Code should be open for extension but closed for modification.

**Rationale:** Changing existing, working code to add a feature introduces regression risk. Better to extend — add a new service function, a new component variant — than to modify a tested existing one.

**In practice:**
- Adding a new service to the Services page means adding data to `consulting-services.service.ts`, not rewriting `ServicesSection.tsx`
- New design tokens are added to the `:root` block; existing tokens are not renamed

---

## 7. Don't Repeat Yourself (DRY)

**Principle:** Every piece of logic has exactly one canonical location.

**Rationale:** Duplicated logic means two places to update when requirements change — and one will inevitably be missed.

**In practice:**
- Layout constants live in `lib/layout/constants.ts` — never hardcoded in multiple components
- The section header pattern (eyebrow + H2) is a documented design pattern — if it needs a component, extract it; don't copy-paste it
- Metadata is built by `buildMetadata()` — never written by hand per page

---

## 8. Keep It Simple (KISS)

**Principle:** The simplest solution that correctly solves the problem is the right solution.

**Rationale:** Complexity has a maintenance cost that compounds over time. A clever solution that saves 10 lines today creates hours of debugging next year.

**In practice:**
- Don't build abstractions for hypothetical future requirements — build for what is needed now
- Three similar card components are acceptable; a premature generic `<Card variant="...">` component with 15 props is not
- Prefer CSS over JavaScript for visual effects

---

## 9. You Aren't Gonna Need It (YAGNI)

**Principle:** Do not build features, abstractions, or infrastructure that is not required by the current milestone.

**Rationale:** Speculative development wastes time and creates dead code that must be maintained.

**In practice:**
- A contact form that currently has 6 fields does not need a generic form builder
- A site with one blog post does not need a pagination component
- Add live API integration when the UI that consumes it is ready, not before

---

## 10. Composition Over Inheritance

**Principle:** Build behaviour by composing small, focused components and functions. Avoid inheritance hierarchies.

**Rationale:** React's component model is composition-native. Inheritance creates tight coupling and makes refactoring difficult.

**In practice:**
- `MeetIslamSection` composes `Container` + section header + bio text + `MeetIslamCTAs`
- `ContactModal` composes the modal shell + `ContactForm`
- There are no base classes or class inheritance in this codebase

---

## 11. Type Safety

**Principle:** TypeScript strict mode is always on. `as any` and `@ts-ignore` are never acceptable in production code.

**Rationale:** Type errors caught at compile time cost nothing. Type errors caught in production cost hours of debugging and damage client trust.

**In practice:**
- All service function return types are explicitly declared
- All component props have defined TypeScript interfaces
- Zod validation ensures external data conforms to the expected shape at the repository boundary
- The `unknown` type is used for external data; it is narrowed before use

---

## 12. Accessibility First

**Principle:** Accessibility is not an afterthought. It is a first-class requirement for every component.

**Rationale:** The target audience includes procurement teams who may evaluate vendor sites against accessibility standards. Beyond compliance, accessible code is semantic code — it benefits SEO, screen readers, and maintainability.

**In practice:**
- All sections have `aria-labelledby`
- All interactive elements have accessible names
- Heading hierarchy is sequential and validated on every page
- Decorative elements have `aria-hidden="true"`
- All animations respect `prefers-reduced-motion`
- See [QUALITY_GATES.md](QUALITY_GATES.md) for the full accessibility checklist

---

## 13. Security First

**Principle:** Security is a default, not a feature. Every component, API route, and integration is written with security in mind from the start.

**Rationale:** This platform is the public face of a security consultant. A security vulnerability on a security consultant's own website is a catastrophic credibility failure.

**In practice:**
- All external links have `rel="noopener noreferrer"`
- All API routes validate input with Zod before processing
- No secrets or API keys are ever exposed to the client
- The CSP is nonce-based and strict — no `unsafe-inline` for scripts
- `dangerouslySetInnerHTML` is only permitted for trusted, hardcoded static content
- See [SECURITY_MODEL.md](SECURITY_MODEL.md) for the complete security model

---

## 14. Performance First

**Principle:** Performance is a product quality. Slow pages lose executive visitors.

**Rationale:** A security consultant's target audience — CEOs, CTOs — are busy. A page that takes 3 seconds to load is a page they won't see.

**In practice:**
- Server Components by default keeps client JS minimal
- Third-party libraries with large bundles (Zod, react-hook-form) are deferred to when they are actually needed
- Fonts are self-hosted with `next/font` — no render-blocking external request
- Images use `next/image` with explicit dimensions
- See [QUALITY_GATES.md](QUALITY_GATES.md) for performance targets

---

## 15. Progressive Enhancement

**Principle:** Core content and navigation must work without JavaScript. Interactivity is layered on top.

**Rationale:** Server-rendered HTML is the foundation. JavaScript enhances the experience but is not a dependency for the core value proposition.

**In practice:**
- All section content is server-rendered and visible without JavaScript
- The contact modal is the only feature that requires JavaScript; there will be a fallback `/contact` page (planned)
- Scroll reveal animations are pure CSS fallbacks without JavaScript

---

## 16. Maintainability Over Cleverness

**Principle:** Code that a future engineer (or a future AI) can immediately understand is better than code that is clever.

**Rationale:** The original author will not always be available. Months from now, a different engineer or AI will need to extend this codebase. Code that requires intimate knowledge of the original author's intent to understand is a liability.

**In practice:**
- Variable and function names are descriptive and unambiguous
- No magic numbers — use named constants
- Comments are written only when the **why** is non-obvious, never to explain what the code does
- Complex logic is broken into named intermediate values rather than chained one-liners
- See [CODING_STANDARDS.md](CODING_STANDARDS.md) for detailed naming and style conventions
