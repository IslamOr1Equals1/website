# Project Roadmap

## Vision

A production-grade cybersecurity consulting platform for Islam Ahmed, Offensive Security Consultant and Penetration Tester. The platform is designed to generate high-quality consulting leads, build executive trust, and establish Islam as a credible, authoritative advisor to decision-makers at the board and C-suite level.

This is not a portfolio website. It is a professional platform that competes with enterprise consulting firm presences.

---

## Target Audience

| Role | Primary Goal |
|---|---|
| CEO / Founder | Understand business risk, decide whether to engage |
| CTO | Evaluate technical depth and methodology |
| CISO | Validate credentials, approach, and engagement terms |
| HR / Procurement | Vet the consultant for enterprise compliance |
| Enterprise Security Teams | Assess scope and service fit |

**Primary verticals:** Fintech, SaaS, Healthcare, Enterprise

---

## Business Goals

1. Generate inbound consulting leads via the contact form
2. Eliminate friction from the lead qualification process (fixed-fee, NDA-first, direct access)
3. Demonstrate technical authority through published intelligence and case studies
4. Build executive trust through professional presentation and social proof
5. Establish a repeatable content and SEO flywheel via the Intelligence Hub

---

## Development Phases

### Phase 1 — Homepage (COMPLETE, LOCKED)
Production baseline. All sections implemented, responsive, accessible, and performance-verified.

### Phase 2 — Services Page (NEXT)
Dedicated page for each service offering. Deep-dive content, methodology, deliverables, and engagement terms per service. Supports SEO for service-specific queries.

### Phase 3 — Intelligence Hub
Publishing platform for offensive security intelligence articles. Target audience: CISOs, security teams, and technical decision-makers. Drives organic traffic and establishes thought leadership.

### Phase 4 — Case Studies
Detailed, anonymised engagement write-ups expanding on the homepage security impact cards. Full narrative: client context, attack path, impact, remediation.

### Phase 5 — About / Credentials Page
Extended biography, full certification list, professional history, and philosophy. Supports trust-building for enterprise procurement processes.

### Phase 6 — Contact / Intake Page
Standalone contact page for clients who find the page via direct navigation or referral rather than via the homepage CTA.

### Phase 7 — Live API Integrations
Replace mock data in the Executive Security Briefing and Intelligence Feed with live data from threat intelligence APIs (Shodan, VirusTotal, ThreatFox).

### Phase 8 — CMS / Content Dashboard
Admin interface for publishing Intelligence Hub articles, updating case studies, and managing testimonials without code changes.

### Phase 9 — Analytics & Lead Tracking
Privacy-respecting analytics (Plausible or similar), form submission tracking, and conversion funnel measurement.

---

## Remaining Pages

| Page | Route | Priority | Status |
|---|---|---|---|
| Services | `/services` | High | Planned |
| Services — Web App Pentest | `/services/web-application-penetration-testing` | High | Planned |
| Services — Network & AD | `/services/network-active-directory-assessment` | High | Planned |
| Services — Cloud Security | `/services/cloud-security-review` | High | Planned |
| Services — Red Team | `/services/red-team-engagement` | High | Planned |
| Services — Advisory / vCISO | `/services/security-advisory-vciso` | High | Planned |
| Services — Secure Code Review | `/services/secure-code-review` | High | Planned |
| Intelligence Hub | `/intelligence-hub` | High | Planned |
| Intelligence Hub — Article | `/intelligence-hub/[slug]` | High | Planned |
| Case Studies | `/case-studies` | Medium | Planned |
| Case Studies — Detail | `/case-studies/[slug]` | Medium | Planned |
| About | `/about` | Medium | Planned |
| Contact | `/contact` | Medium | Planned |

---

## Planned API Integrations

| Integration | Purpose | Status |
|---|---|---|
| Resend | Contact form email delivery | Implemented (env-gated) |
| Shodan | Live threat intelligence feed | Client built, not wired |
| VirusTotal | Threat data enrichment | Client built, not wired |
| ThreatFox | IOC / malware intel feed | Client built, not wired |

---

## Planned CMS / Dashboard

A lightweight admin dashboard (likely Next.js Route Handlers + a headless CMS such as Sanity or a simple Postgres-backed solution) for:

- Publishing and editing Intelligence Hub articles
- Uploading and managing case study content
- Updating testimonials
- Managing service descriptions without code deploys

---

## Future Enhancements

- **Open Graph image generation** — Dynamic per-page OG images via `@vercel/og`
- **Newsletter / briefing subscription** — Weekly intelligence digest opt-in
- **Availability calendar** — Live booking integration for consultation scheduling
- **Verified client portal** — Password-protected area for active clients to access reports
- **Multi-language support** — Arabic localisation for regional market expansion
