# Security Model

This platform is the public face of a cybersecurity consultant. Any security vulnerability on this website represents a catastrophic credibility failure. This document defines the complete security model — every layer, every mechanism, and every practice that keeps the platform secure.

---

## 1. Threat Model

### What We Protect

| Asset | Why It Matters |
|---|---|
| Visitor trust | A compromised site served to a potential client ends the relationship permanently |
| Contact form submissions | These are qualified business leads; their privacy must be protected |
| Site availability | Downtime during a critical lead's evaluation costs business |
| API credentials | Leaked keys enable abuse of third-party services at the project's cost |
| Islam Ahmed's professional reputation | The site's security reflects directly on the security consultant's competence |

### Primary Threat Actors

| Actor | Motivation | Attack Vector |
|---|---|---|
| Opportunistic bots | Spam, abuse of contact form | Form submission, credential stuffing |
| Competitive intelligence gathering | Understand competitive positioning | Read-only; not a security concern |
| Reputation attack | Damage professional credibility | Defacement, XSS, content injection |
| Supply chain | Compromise via dependencies | Malicious npm packages |

### Out of Scope
This is a marketing and consulting platform. It does not:
- Store user credentials or authentication tokens
- Process payments
- Store personal data beyond transient contact form processing

This dramatically reduces the attack surface relative to a full web application.

---

## 2. Security Headers

All responses from the application include the following HTTP security headers, set by `proxy.ts` middleware:

| Header | Value | Purpose |
|---|---|---|
| `Content-Security-Policy` | Nonce-based strict policy | Prevents XSS and injection |
| `X-Frame-Options` | `DENY` | Prevents clickjacking |
| `X-Content-Type-Options` | `nosniff` | Prevents MIME sniffing |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | Limits referrer leakage |
| `Permissions-Policy` | Camera, microphone, geolocation, payment all disabled | Prevents feature abuse |
| `Strict-Transport-Security` | `max-age=63072000; includeSubDomains; preload` | Enforces HTTPS |
| `X-XSS-Protection` | `0` | Disabled intentionally — CSP is the modern replacement |

---

## 3. Content Security Policy

The CSP is the primary defence against XSS. It is generated fresh per request with a cryptographically unique nonce.

### Configuration

```
script-src  'nonce-{request-nonce}' 'strict-dynamic'
style-src   'unsafe-inline'
img-src     'self' data:
font-src    'self'
connect-src 'self'
frame-src   'none'
object-src  'none'
base-uri    'self'
```

### Design Decisions

**`script-src` uses nonce + `strict-dynamic`:**
- Each page request generates a new cryptographically random nonce
- Only scripts with the matching nonce attribute execute
- `'strict-dynamic'` propagates the nonce to dynamically loaded scripts (required for Next.js's own script injection)
- No `'unsafe-inline'` or `'unsafe-eval'` for scripts

**`style-src` uses `'unsafe-inline'`:**
- Required because React Server Components inject inline styles for CSS-in-JS compatibility
- This is a known limitation; mitigated by the absence of `'unsafe-eval'` and the strict `script-src`
- Tailwind v4 generates static CSS at build time — no runtime style injection from third-party libraries

**`frame-src 'none'`:**
- The site has no legitimate need to embed iframes or be embedded
- Prevents clickjacking via iframe embedding

### Nonce Implementation (`proxy.ts`)

```typescript
const nonce = Buffer.from(crypto.randomUUID()).toString('base64')
response.headers.set('Content-Security-Policy', buildCSP(nonce))
response.headers.set('x-nonce', nonce)  // available to Server Components via headers()
```

---

## 4. Input Validation

All data entering the application at API boundaries is validated with Zod before processing.

### Contact Form (`app/api/contact/route.ts`)

```typescript
const ContactSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  company: z.string().max(200).optional(),
  message: z.string().min(10).max(5000),
  service: z.enum([...SERVICES]),
  budget: z.enum([...BUDGETS]),
})

const body = ContactSchema.parse(await request.json())
```

**What this prevents:**
- Oversized payloads that could exhaust memory
- Malformed data reaching downstream services
- Type confusion attacks

**Rate limiting:**
- Implemented at the CDN/hosting layer (Vercel or Cloudflare)
- Each API route is serverless; no persistent connection for DDoS

### Threat Intelligence APIs
All external API responses are validated with Zod at the repository boundary before being used in the application. A malformed or malicious response from an external API cannot corrupt application state or reach the UI in an unexpected shape.

---

## 5. Secrets Management

### Principle: Secrets never touch the client

| Environment Variable | Access | Usage |
|---|---|---|
| `RESEND_API_KEY` | Server only | Email delivery |
| `NVD_API_KEY` | Server only | CVE database |
| `THREATFOX_API_KEY` | Server only | Threat intelligence |
| `GITHUB_TOKEN` | Server only | Security advisories |
| `ABUSEIPDB_API_KEY` | Server only | IP reputation |
| `SHODAN_API_KEY` | Server only | Exposure scanning |
| `VIRUSTOTAL_API_KEY` | Server only | Malware enrichment |
| `OPENCTI_API_KEY` | Server only | CTI platform |
| `OTX_API_KEY` | Server only | AlienVault OTX |

**Rules:**
- Never prefix threat intelligence or service keys with `NEXT_PUBLIC_`
- Integration clients are server-side modules; they are never imported in `'use client'` components
- Secrets are loaded from `.env.local` in development; from hosting platform secrets in production
- `.env.local` is in `.gitignore` — never committed

---

## 6. External Link Safety

All external links are rendered with:

```typescript
target="_blank" rel="noopener noreferrer"
```

- `noopener` prevents the new tab from accessing `window.opener` (prevents tab-napping)
- `noreferrer` prevents the referrer header from leaking the visitor's origin to the linked site

---

## 7. XSS Prevention

### Server-Rendered HTML
All content rendered via React JSX is automatically escaped. React does not render raw HTML without explicit use of `dangerouslySetInnerHTML`.

### `dangerouslySetInnerHTML`
Permitted **only** for:
- JSON-LD structured data (hardcoded strings, never dynamic content)
- Server-side trusted content that has been explicitly reviewed

**Absolutely prohibited for:**
- User-submitted content
- API-sourced content that has not been sanitised and reviewed

### Rich Text / Markdown
When articles or case studies are added (Intelligence Hub), all Markdown rendering must:
1. Use a library that sanitises output (e.g., `rehype-sanitize`)
2. Disallow `<script>` tags, event handlers, and `javascript:` URLs
3. Never render raw HTML from the CMS without sanitisation

---

## 8. Dependency Security

### Supply Chain
- All dependencies are pinned in `package.json`
- `npm audit` is run as part of every deployment pipeline
- Unused dependencies are removed (three.js, framer-motion, next-themes removed in Phase 6)
- Only established, widely-used packages are added; no obscure or unmaintained libraries

### Audit Cadence
- Run `npm audit` before every significant code change
- Review Dependabot or equivalent security advisories weekly once the project is in production

---

## 9. Authentication and Authorisation

The current platform has no authentication. There are no protected routes.

**Future implementation (when an admin dashboard or CMS is added):**
- Use an established auth provider (Clerk, Auth0, or NextAuth.js) — no hand-rolled auth
- Admin routes protected at the middleware layer, not just the page level
- MFA required for any admin access
- Session tokens use secure, HttpOnly, SameSite=Strict cookies

---

## 10. API Security

### Contact Route (`/api/contact`)

**Protections:**
- Method check: `POST` only; all other methods return 405
- Zod validation of all fields before processing
- Generic error messages returned to client (no internal error details exposed)
- No rate limiting at the application layer (relies on CDN/hosting layer)

**No CSRF token:**
- The contact form POSTs JSON, not form-encoded data
- Browser CSRF attacks require `application/x-www-form-urlencoded` or `multipart/form-data`
- JSON API routes are protected from cross-site form submissions by the content type

### Future API Routes
Every new API route must:
1. Validate input with Zod
2. Return generic error messages only
3. Log detailed errors server-side only
4. Implement appropriate rate limiting
5. Reject unexpected HTTP methods

---

## 11. Production Security Checklist

Before deploying any new page or feature:

- [ ] `npm audit` — zero high/critical vulnerabilities
- [ ] No secrets in client bundle (`NEXT_PUBLIC_` prefixed variables)
- [ ] All external links have `rel="noopener noreferrer"`
- [ ] All user inputs validated with Zod
- [ ] No `dangerouslySetInnerHTML` for dynamic content
- [ ] No new `eval()`, `Function()`, or `setTimeout(string)` calls
- [ ] CSP headers still active and not weakened
- [ ] No new third-party scripts added (each requires CSP + security review)

---

## 12. Incident Response

If a security issue is discovered:
1. Assess severity (Critical / High / Medium / Low)
2. Critical and High: take the affected route or feature offline immediately
3. Investigate and fix in an isolated branch
4. Deploy the fix
5. Record the incident in `CHANGELOG.md` under `Security`
6. Create an ADR if the fix required a significant architectural change

**Do not publicly disclose security findings for 90 days** — allow time to fix and verify before any disclosure.
