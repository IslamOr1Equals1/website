# Architecture

## Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript 5 (strict) |
| UI | React 19 (Server Components by default) |
| Styling | Tailwind CSS v4 (`@import "tailwindcss"`) |
| Fonts | Inter (body), JetBrains Mono (code) — self-hosted via `next/font/google` |
| Email | Resend (env-gated) |
| Validation | Zod 4 (server-side only) |
| Forms | react-hook-form + @hookform/resolvers (contact modal only, lazy-loaded) |
| Env validation | @t3-oss/env-nextjs |
| Icons | lucide-react (tree-shaken) |

---

## Folder Structure

```
is14m/
├── app/
│   ├── (marketing)/          # Route group — shared Navbar/Footer/Modal layout
│   │   ├── layout.tsx        # Marketing layout (Navbar, Footer, LazyContactModal)
│   │   └── page.tsx          # Homepage (/)
│   ├── api/
│   │   └── contact/
│   │       └── route.ts      # POST /api/contact — contact form submission
│   ├── layout.tsx            # Root layout (fonts, metadata, Providers, ScrollReveal)
│   └── globals.css           # Design tokens, base styles, animations, responsive rules
│
├── features/                 # Feature-first: each feature owns its components
│   ├── hero/
│   │   ├── components/       # HeroSection, HeroLeft, HeroRight, HeroGlobe, HeroCTAs, ...
│   │   └── types/
│   ├── navbar/
│   ├── footer/
│   ├── contact/
│   │   ├── components/       # ContactModal, ContactForm, LazyContactModal
│   │   └── schemas/          # contact.schema.ts (Zod — server + client shared)
│   ├── services-section/
│   ├── why-hire-me/
│   ├── security-impact/
│   ├── methodology/
│   ├── executive-briefing/
│   ├── process/
│   ├── meet-islam/
│   ├── testimonials/
│   ├── security-analysis/
│   ├── trust-reasons/
│   ├── industry-marquee/
│   └── cta/
│
├── services/                 # Data service layer — mock now, live API later
│   ├── hero.service.ts
│   ├── consulting-services.service.ts
│   ├── methodology.service.ts
│   └── ...
│
├── repositories/             # Data access layer (persistence abstraction)
│   ├── contact.repository.ts
│   ├── insights.repository.ts
│   └── threat-intelligence.repository.ts
│
├── lib/
│   ├── api/                  # Generic API client with retry logic
│   ├── analytics/            # Analytics abstraction layer
│   ├── cache/                # Cache utilities
│   ├── env/                  # Environment variable validation (t3-env)
│   ├── integrations/         # Third-party API clients (Shodan, VirusTotal, ThreatFox)
│   ├── layout/               # LAYOUT constants (spacing tokens)
│   ├── logger/               # Structured logger
│   ├── security/             # CSP builder, sanitization utilities
│   ├── seo/                  # buildMetadata() helper
│   └── utils/                # cn() and other utilities
│
├── providers/
│   ├── index.tsx             # Providers wrapper (composes all providers)
│   └── ModalProvider.tsx     # Contact modal state + delegated click handler
│
├── components/
│   ├── ui/
│   │   └── Container.tsx     # Shared inner-section wrapper (max-width + padding)
│   └── ScrollReveal.tsx      # Client component — wires .rv scroll animation
│
├── config/
│   ├── site.ts               # siteConfig (name, nav, socials, author)
│   └── features.ts           # Feature flags (FF_GLOBE_ENABLED)
│
├── proxy.ts                  # Next.js middleware — security headers + CSP nonce
├── next.config.ts            # Next.js configuration
└── docs/                     # Project documentation (this directory)
```

---

## Routing Strategy

All public-facing pages live inside the `(marketing)` route group, which provides the shared Navbar, Footer, and ContactModal through its layout.

| Route | File | Type |
|---|---|---|
| `/` | `app/(marketing)/page.tsx` | Static (SSG) |
| `/services` | `app/(marketing)/services/page.tsx` | Static (SSG) — planned |
| `/services/[slug]` | `app/(marketing)/services/[slug]/page.tsx` | Static (generateStaticParams) — planned |
| `/intelligence-hub` | `app/(marketing)/intelligence-hub/page.tsx` | Static or ISR — planned |
| `/intelligence-hub/[slug]` | `app/(marketing)/intelligence-hub/[slug]/page.tsx` | ISR — planned |
| `/api/contact` | `app/api/contact/route.ts` | Dynamic (Edge/Node) |

---

## Component Hierarchy

```
RootLayout (server)
└── Providers (client — ModalProvider)
    └── (marketing) Layout (server)
        ├── Navbar (server)
        │   └── NavbarClient (client — scroll state, openContact)
        ├── main > Page (server)
        │   └── [Section components] (server by default)
        │       └── [Card components] (server — lucide icons SSR)
        ├── Footer (server)
        └── LazyContactModal (client shell, dynamic import)
            └── ContactModal (client — modal state)
                └── ContactForm (client — react-hook-form, Zod)
```

---

## Server vs Client Components

**Default: Server Components.** Client components are used only when a browser API or interactivity is strictly required.

| Component | Type | Reason |
|---|---|---|
| All section components | Server | No interactivity needed |
| All card components | Server | Hover handled via CSS classes |
| `NavbarClient` | Client | `useState` (scroll), `useModal` |
| `HeroRight` | Client | Canvas animation (globe), ticker |
| `HeroGlobe` | Client | `useEffect`, `useRef`, canvas drawing |
| `ThreatTicker` | Client | Scroll animation |
| `HeroCTAs` | Client | `useModal` |
| `MeetIslamCTAs` | Client | `useModal` |
| `CtaButtons` | Client | `useModal` |
| `IndustryMarquee` | Client | CSS animation needs client mount |
| `TestimonialsSection` | Client | Pause-on-hover for animation |
| `LiveIntelFeed` | Client | `useEffect` polling |
| `ThreatSummaryPanel` | Client | Dynamic state |
| `ContactModal` | Client | `useState`, modal logic |
| `ContactForm` | Client | `react-hook-form` |
| `LazyContactModal` | Client shell | `next/dynamic` wrapper |
| `ScrollReveal` | Client | `IntersectionObserver` |
| `ModalProvider` | Client | `useState`, delegated click handler |

---

## Service Layer

Every data requirement is abstracted behind a service function in `/services`. Services are `async` functions that currently return mock data but are shaped to accept real API parameters. This allows live API wiring without changes to components.

```ts
// Pattern
export async function getConsultingServices(): Promise<ConsultingService[]> {
  // Currently: return mock data
  // Future: return await repo.getServices() or fetch('/api/services')
}
```

---

## Repository Pattern

`/repositories` holds data access classes that abstract persistence. The contact form uses `EmailContactRepository` which delegates to Resend. Future repositories will handle CMS content, analytics events, and threat intelligence data.

---

## Providers

| Provider | Purpose |
|---|---|
| `ModalProvider` | Global contact modal state. Exposes `openContact` / `closeContact`. Also handles `[data-open-contact]` delegation so server-rendered buttons can trigger the modal without being client components. |

---

## Middleware (`proxy.ts`)

Runs on every request (excluding static assets). Responsibilities:

1. Generates a per-request CSP nonce via `crypto.getRandomValues`
2. Builds a strict nonce-based Content-Security-Policy header
3. Sets all required security headers (X-Frame-Options, HSTS, Referrer-Policy, etc.)
4. Forwards the nonce to the request via `x-nonce` header (consumed by script tags)

---

## Error Handling

- API route errors return structured JSON with HTTP status codes
- Zod validation errors return flattened field errors
- Server Component errors bubble to the nearest `error.tsx` boundary (not yet implemented — planned per page)
- Client errors in forms show inline validation messages via react-hook-form

---

## State Management

No global client state library. State is local to components or handled by context:

- **Modal state** — `ModalProvider` (React Context + useState)
- **Form state** — `react-hook-form` (local to ContactForm)
- **Scroll state** — `NavbarClient` (local useState)
- **Animation state** — CSS transitions and IntersectionObserver (no JS state)

---

## API Architecture

### Contact Form (`POST /api/contact`)
1. Parses request body
2. Validates with Zod (`contactSchema`)
3. Checks honeypot field (silent discard)
4. Passes to `EmailContactRepository`
5. Repository sends email via Resend (falls back gracefully if `RESEND_API_KEY` is unset)

### Planned API Routes
- `GET /api/intelligence` — Fetches threat intelligence for Executive Briefing (with caching)
- `GET /api/insights` — Returns Intelligence Hub article list
- `GET /api/insights/[slug]` — Returns a single article
