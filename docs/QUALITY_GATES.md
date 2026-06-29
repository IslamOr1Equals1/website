# Quality Gates

Every page, section, and feature shipped on this platform must pass all quality gates before being declared complete. This document defines the standards for each gate and the procedures for verifying them.

These standards are not optional. A page that passes 7 of 8 gates is not done — it is incomplete.

---

## Quality Gate Overview

| Gate | When | Tool |
|---|---|---|
| 1. Build | After every implementation | `npm run build` |
| 2. TypeScript | After every implementation | `npx tsc --noEmit` |
| 3. Lint | After every implementation | `npm run lint` |
| 4. Responsive | Before declaring complete | Browser DevTools + manual |
| 5. Accessibility | Before declaring complete | axe DevTools + manual |
| 6. Performance | Before declaring complete | Lighthouse + manual |
| 7. Security | Before declaring complete | Browser DevTools + manual |
| 8. Code Quality | Before declaring complete | Manual review |

---

## Gate 1: Build

**Standard:** Production build completes with zero errors and zero warnings.

**Command:**
```bash
npm run build
```

**Pass criteria:**
- Exit code 0
- Zero TypeScript compilation errors
- Zero Next.js build errors
- Zero unresolved imports
- Bundle size reviewed — no unexpected increase in initial bundle

**Fail criteria:**
- Any build error
- Any TypeScript error
- New large library added without `next/dynamic` deferred loading

**Note:** Dev server running does not substitute for a production build check. Run `npm run build` explicitly.

---

## Gate 2: TypeScript

**Standard:** TypeScript strict mode — zero type errors.

**Command:**
```bash
npx tsc --noEmit
```

**Pass criteria:**
- Exit code 0
- Zero errors in strict mode
- No `@ts-ignore`, no `as any`, no `// @ts-nocheck`

**Fail criteria:**
- Any TypeScript error
- Any suppression that hides a type error

---

## Gate 3: Lint

**Standard:** Zero ESLint errors or warnings.

**Command:**
```bash
npm run lint
```

**Pass criteria:**
- Exit code 0
- Zero errors
- Zero warnings

**Common issues to watch for:**
- Unused imports
- Missing `key` props in list renders
- Incorrect hook dependency arrays
- Accessibility-related lint rules (next/a11y)

---

## Gate 4: Responsive

**Standard:** The page renders correctly at all tested viewport widths with no horizontal overflow.

**Viewports to verify:**

| Viewport | Width | Represents |
|---|---|---|
| 320px | iPhone SE | Smallest common mobile |
| 375px | iPhone 14 | Standard mobile |
| 390px | iPhone 14 Pro | Large mobile |
| 430px | iPhone 14 Plus | Largest mobile |
| 768px | iPad portrait | Tablet |
| 1024px | iPad landscape | Large tablet / small laptop |
| 1280px | Standard laptop | Most common laptop |
| 1440px | Wide laptop / monitor | Common desktop |
| 1920px | Full HD | Wide desktop |

**Verification procedure:**
1. Open the page in Chrome DevTools Responsive Mode
2. Test each viewport in the table above
3. Check: no horizontal scrollbar, no elements overflowing the viewport
4. Check: grid columns collapse correctly (3-col → 1-col on mobile)
5. Check: typography is legible at all sizes
6. Check: CTAs remain accessible (not cut off, not too small to tap)
7. Check: the hero section hides the right column on tablet and mobile

**Pass criteria:**
- Zero horizontal overflow at any tested viewport
- All grid systems collapse correctly
- All text remains readable
- All interactive elements remain usable
- `document.documentElement.scrollWidth === window.innerWidth` at all viewports

---

## Gate 5: Accessibility

**Standard:** Zero accessibility violations. All WCAG 2.1 AA criteria met.

**Tools:**
- axe DevTools browser extension (primary)
- Manual screen reader verification for new interactive patterns

**Checklist:**

### Document Structure
- [ ] Single `<h1>` per page
- [ ] Heading hierarchy is sequential (no skipping levels)
- [ ] `<header>` landmark contains navigation
- [ ] `<main>` landmark wraps page content
- [ ] `<footer>` landmark present
- [ ] All sections have `aria-labelledby` pointing to their heading

### Interactive Elements
- [ ] All buttons have accessible names (visible text or `aria-label`)
- [ ] All links have accessible names
- [ ] External links have `aria-label` indicating they open in a new tab
- [ ] All form fields have associated `<label>` elements
- [ ] Form error messages are associated with their fields via `aria-describedby`

### Images and Icons
- [ ] Informative images have descriptive `alt` text
- [ ] Decorative images have `alt=""`
- [ ] Icon-only buttons have `aria-label`
- [ ] Lucide icons in decorative contexts have `aria-hidden="true"`

### Keyboard Navigation
- [ ] All interactive elements reachable via Tab
- [ ] Focus indicator visible on all interactive elements
- [ ] Modal traps focus correctly while open
- [ ] Modal returns focus to trigger when closed
- [ ] No keyboard traps

### Motion
- [ ] All animations respect `prefers-reduced-motion: reduce`
- [ ] Marquee / scrolling elements pause or stop with reduced motion preference

### Colour
- [ ] Text contrast ratio ≥ 4.5:1 (normal text)
- [ ] Text contrast ratio ≥ 3:1 (large text, ≥18px bold or ≥24px)
- [ ] UI component contrast ≥ 3:1 (borders, icons used as indicators)
- [ ] No information conveyed by colour alone

**Pass criteria:**
- Zero axe violations (Critical, Serious, Moderate, Minor)
- All manual checklist items verified

---

## Gate 6: Performance

**Standard:** Lighthouse Performance ≥ 95 in production mode.

**Procedure:**
1. Run `npm run build && npm start`
2. Open Chrome DevTools Lighthouse
3. Run Lighthouse in **Incognito** (no extensions), **Desktop** mode
4. Record scores

**Targets:**

| Metric | Target | Description |
|---|---|---|
| Lighthouse Performance | ≥ 95 | Overall performance score |
| LCP | < 2.5s | Largest Contentful Paint |
| FID | < 100ms | First Input Delay |
| CLS | < 0.1 | Cumulative Layout Shift |
| FCP | < 1.8s | First Contentful Paint |
| TTFB | < 600ms | Time to First Byte |
| Lighthouse Accessibility | ≥ 95 | Lighthouse accessibility score |

**Bundle constraints:**
- Initial page JavaScript: no new large library without justification and deferred loading
- CSS: minimise unused CSS (Tailwind purging is automatic in production)
- Fonts: self-hosted via `next/font` only; no external font requests
- Images: `next/image` with explicit width and height; modern formats (WebP/AVIF)

**Common causes of regressions:**
- Adding a `'use client'` wrapper around a large section (increases client JS)
- Importing a large library eagerly (Zod, date-fns, chart libraries)
- Using `<img>` instead of `next/image`
- Not setting explicit dimensions on images (causes CLS)

**Pass criteria:**
- Lighthouse Performance ≥ 95
- All Core Web Vitals in "Good" range
- No new undeferred large library additions

---

## Gate 7: Security

**Standard:** All 8 security headers present. Zero XSS-vulnerable DOM patterns.

**Header verification:**
```bash
curl -I https://[production-url] | grep -E "(Content-Security-Policy|X-Frame-Options|X-Content-Type-Options|Referrer-Policy|Permissions-Policy|Strict-Transport-Security|X-XSS-Protection)"
```

All 7 headers must be present with correct values (see [SECURITY_MODEL.md](SECURITY_MODEL.md) for expected values).

**DOM inspection checklist:**
- [ ] No `dangerouslySetInnerHTML` for dynamic/API-sourced content
- [ ] No `eval()` or `Function()` calls in source code
- [ ] All external links have `rel="noopener noreferrer"`
- [ ] No API keys visible in page source or network requests
- [ ] Contact form submissions go to `/api/contact` (not a third-party endpoint)
- [ ] No third-party scripts added without CSP update

**CSP verification:**
- Open browser DevTools → Console
- Look for any CSP violation warnings (blocked scripts, blocked styles)
- Zero CSP violations in production

**Pass criteria:**
- All 7 security headers present
- Zero CSP violations
- Zero DOM XSS patterns
- No exposed secrets

---

## Gate 8: Code Quality

**Standard:** Code is production-quality, follows all conventions, and passes manual review.

**Checklist:**

### Structure
- [ ] Feature-first architecture maintained
- [ ] No business logic in components
- [ ] No data fetching in Client Components
- [ ] Components have a single clear responsibility

### TypeScript
- [ ] No `as any`
- [ ] All service functions have explicit return types
- [ ] All component props have typed interfaces
- [ ] Zod validation at API boundaries

### Conventions
- [ ] File naming follows the standard (PascalCase for components, kebab-case for utilities)
- [ ] No magic numbers — named constants used
- [ ] Import order correct (framework → third-party → internal absolute → internal relative)
- [ ] No commented-out code

### Cleanup
- [ ] No unused imports
- [ ] No dead code (unused functions, variables, components)
- [ ] No TODO/FIXME comments
- [ ] No console.log statements (use `console.error` for server-side errors only)

### Security
- [ ] External links secured
- [ ] Input validation in place
- [ ] No secrets in client bundle

**Pass criteria:**
- All checklist items verified
- Code would pass review from a senior engineer unfamiliar with the project

---

## Quality Gate Sign-Off

When all 8 gates are passed for a new page or major feature:

1. Record the results in `CHANGELOG.md` under the appropriate version
2. If a new page: create an ADR documenting the significant decisions
3. If appropriate: declare a git milestone (tag)
4. Update `docs/README.md` if new documentation was created

The page or feature is then **declared complete**. No further changes may be made without re-running all affected gates.
