# ADR-0005: Homepage v1 Information Architecture

**Date:** 2026-06-28
**Status:** Accepted
**Deciders:** Islam Ahmed

## Context

The homepage is the primary lead generation surface of the platform. It must serve multiple audiences simultaneously (CEO, CTO, CISO, HR) while guiding each toward a single conversion action (booking a consultation). The structure, section order, and content strategy were deliberate decisions that trade off completeness against executive attention span.

## Decision

The homepage follows a **trust-building narrative arc** with 13 sections:

| Section | Business Function |
|---|---|
| Hero | Headline value proposition; primary CTA |
| Industry Marquee | Social proof via industry verticals served |
| Why Hire Me | Differentiators vs. automated tools and large firms |
| Services | Service offering overview; anchor links to detail |
| Security Impact | Proof of results (anonymised case studies) |
| Methodology | Credibility through process transparency |
| Executive Briefing | Differentiation: live threat intelligence awareness |
| Process | Friction reduction: what working together looks like |
| Meet Islam | Personal trust: biography, philosophy, approach |
| Testimonials | Social proof from named clients |
| Intelligence Hub | Thought leadership preview; traffic channel |
| Trust Reasons | Policy-level trust signals (fixed-fee, NDA, re-test) |
| CTA | Final conversion prompt |

**Key structural decisions:**
- **Single scrolling page** for Phase 1 — executives can form a full opinion without navigation
- **Hero copy is outcome-first** — "Find the Attack Paths That Matter — Before Attackers Do" speaks to fear and value, not service category
- **Executive Briefing is unique** — no individual security consultant homepage offers live threat intelligence awareness; this is a primary differentiator
- **CTAs appear at multiple scroll depths** — hero, services, meet section, and a dedicated final CTA section

## Alternatives Considered

| Alternative | Reason Rejected |
|---|---|
| Tabbed / filtered single-page layout | Adds navigation complexity; hides content from SEO and from non-interactive readers |
| Minimal one-screen hero with no scroll | Insufficient depth for enterprise trust-building; requires visitors to navigate to find proof |
| Services as the first section | Premature; visitor needs to understand who Islam is before evaluating services |
| Removing Executive Briefing | Eliminates the single most distinctive differentiator on the page |

## Consequences

**Positive:**
- Complete information on a single URL; excellent for sharing ("here's my website") and for SEO
- Each section has a discrete conversion function — any one section failing to land does not kill the page
- The narrative arc guides a skeptical executive from awareness to trust to action

**Negative / Trade-offs:**
- Long page requires careful performance management to maintain fast LCP
- Section order is opinionated; changing it requires re-approval as it affects the trust narrative
- As content grows, some sections (Executive Briefing, Intelligence Hub) will need to become separate pages rather than expanding inline

**Risks:**
- Mobile experience must be verified carefully — a 13-section page on small viewports requires thoughtful truncation and prioritisation

## References

- [ADR-0006](0006-homepage-release-v1.0.0.md) — production release record
- [CHANGELOG.md](../CHANGELOG.md) — implementation history
- [DECISIONS.md](../DECISIONS.md) — individual decision rationale
