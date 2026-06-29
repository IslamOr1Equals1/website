# ADR-0006: Homepage Production Release v1.0.0

**Date:** 2026-06-28
**Status:** Accepted
**Deciders:** Islam Ahmed

## Context

The homepage implementation was completed and required a formal production readiness review before being declared the project baseline. This ADR records the gate criteria that were evaluated, the issues found and resolved, and the formal decision to lock the homepage.

## Decision

The homepage was declared **production-ready and locked at version 1.0.0** on 2026-06-28, following successful completion of all quality phases.

### Quality Phases Completed

| Phase | Result | Notes |
|---|---|---|
| Build | ✓ Pass | Clean production build, static homepage, dynamic API route |
| Lint | ✓ Pass | Zero warnings or errors |
| TypeScript | ✓ Pass | Strict mode, zero errors |
| Responsive | ✓ Pass | 9/9 viewports (320px–1920px), no horizontal overflow |
| Accessibility | ✓ Pass | 0 issues: single H1, sequential headings, all landmarks, all ARIA |
| Performance | ✓ Pass | TTFB 17ms, FCP 260ms, Load 55ms, CSS 7KB |
| Security | ✓ Pass | 7/7 headers, 0 DOM issues, CSP nonce-based |
| Code Quality | ✓ Pass | 0 `as any`, 0 TODO/FIXME, feature-first architecture intact |

### Issues Found and Resolved During Review

| Issue | Severity | Resolution |
|---|---|---|
| `mb-[44px]` producing 0px margins site-wide | Critical | Removed unlayered `* { margin: 0 }` reset from `globals.css`; Tailwind v4 preflight already provides this inside `@layer base` |
| Hero right column not hiding on mobile | High | Added `@media (max-width: 1024px)` responsive rules; introduced semantic grid classes |
| `html` not preventing document width overflow | High | Added `overflow-x: hidden` to `html` element; `body`-only declaration was insufficient |
| `data-open-contact` buttons not wired to modal | High | Added delegated click handler in `ModalProvider` |
| 4 card components unnecessarily Client Components | Medium | Converted to Server Components by replacing JS hover with CSS `.hover-bg2`/`.hover-bg3` classes |
| Zod (330KB) in initial page bundle | Medium | Deferred via `LazyContactModal` (`next/dynamic` + `ssr: false`) |
| `next-themes`, `three`, `framer-motion` installed but unused | Low | Removed from `package.json` |
| Missing `<header>` landmark | Low | Wrapped `<nav>` in `<header>` in `Navbar.tsx` |
| External links missing screen-reader new-tab notice | Low | Added `aria-label` to LinkedIn and GitHub footer links |
| `ThemeProvider` was a dead passthrough | Low | Removed; site is always dark via CSS variables |

### Lock Conditions

The homepage is **locked**. The following changes may be made without approval:
- Bug fixes
- Security vulnerability patches
- Performance optimisations that do not alter appearance or behaviour

The following require **explicit approval**:
- Any copy change
- Any layout or spacing change
- Any colour, typography, or animation change
- Any section addition, removal, or reordering
- Any component restructuring

## Consequences

**Positive:**
- A stable, verified baseline exists for all future development
- The quality gate results provide a benchmark for all future pages
- Locking prevents scope creep and accidental regressions

**Negative / Trade-offs:**
- Some content on the homepage (mock threat intelligence, testimonials) is static. Real data integration will require targeted changes within the lock boundary — each requiring approval.

## References

- [ADR-0005](0005-homepage-v1.md) — homepage information architecture
- [CHANGELOG.md](../CHANGELOG.md) — detailed implementation history
- [QUALITY_GATES.md](../QUALITY_GATES.md) — quality standards that must be met for all future pages
