# Product Requirements Document

**Product:** Islam Ahmed Cybersecurity Consulting Platform
**Version:** 1.0
**Last Updated:** 2026-06-28
**Status:** Living document — update as the product evolves

---

## 1. Vision

To be the single most credible individual cybersecurity consultant website on the internet — one that an enterprise CISO or fintech CTO encounters and immediately thinks: *this person understands our threat landscape, speaks our language, and is worth a conversation.*

The platform exists to make Islam Ahmed's expertise legible to decision-makers who do not have time to evaluate credentials slowly. It does the qualification work before the first conversation happens.

---

## 2. Mission

**Short form:** Turn executive skepticism into consultation bookings.

**Long form:** Deliver a platform that positions Islam Ahmed as a trusted offensive security advisor to C-suite decision-makers across fintech, SaaS, healthcare, and enterprise — by demonstrating technical authority, business-risk fluency, and professional accountability before any contact is made.

---

## 3. Target Audience

### Primary Personas

#### The Risk-Aware CEO
- **Background:** Leads a fintech, SaaS, or healthcare company with 50–500 employees
- **Security posture:** Knows security matters; doesn't know their actual exposure
- **Pain point:** Can't evaluate security vendors technically; relies on trust signals
- **What they need:** Confidence that this consultant understands business risk, not just technical CVEs
- **Trigger:** A board question about cyber risk, a competitor breach, or a compliance deadline

#### The Technical CTO
- **Background:** Responsible for engineering and infrastructure; technically fluent
- **Security posture:** Has opinions about security; may have done basic hardening
- **Pain point:** Doesn't know if what they've built is actually secure; wants a peer, not a sales pitch
- **What they need:** Evidence of real technical depth; methodology they can evaluate; someone who speaks their language
- **Trigger:** A pre-launch security review requirement, an investor request, or a near-miss incident

#### The Enterprise CISO
- **Background:** Full-time security leadership; manages vendors and procurement
- **Security posture:** Has a formal security programme; looking to supplement internal capability
- **Pain point:** Needs a penetration tester who won't waste time, who produces actionable findings, and who can present to the board
- **What they need:** Professional credentials, clear engagement terms, evidence of real-world results, a re-test guarantee
- **Trigger:** Annual pentest requirement, a new system going to production, a compliance audit

#### The HR / Procurement Lead
- **Background:** Responsible for vendor vetting; not technically fluent
- **Security posture:** N/A — evaluating the consultant as a supplier
- **Pain point:** Needs to justify the engagement to leadership; needs NDA and clear commercial terms
- **What they need:** Professional presentation, clear policy terms (NDA, fixed-fee, re-test), contact process
- **Trigger:** A referral or a request from the CTO / CISO to evaluate

### Secondary Audiences
- Security engineers researching the Intelligence Hub
- Other security consultants assessing the competitive landscape
- Recruiters and enterprise security teams evaluating advisors

---

## 4. Business Goals

| Goal | Metric | Target |
|---|---|---|
| Generate consulting leads | Contact form submissions per month | 5+ qualified leads |
| Increase lead quality | % of leads from target industries | 80%+ from fintech/SaaS/healthcare/enterprise |
| Reduce sales friction | Time from first contact to engagement proposal | ≤48 hours |
| Build organic traffic | Monthly organic search sessions | Growing month-over-month |
| Establish thought leadership | Intelligence Hub article engagement | Measured by time-on-page and return visits |

---

## 5. Conversion Goals

**Primary conversion:** Contact form submission ("Book a Consultation")

**Secondary conversions:**
- Clicking to the Intelligence Hub (content engagement)
- Time spent on case studies / security impact section
- Return visits (indicator of trust-building in progress)

**The funnel:**
1. Arrive (organic search, referral, direct)
2. Land on homepage — form first impression in <5 seconds
3. Scroll through proof sections (services, case studies, methodology)
4. Reach a CTA point with sufficient trust built
5. Open contact modal and complete the form

---

## 6. Success Metrics

### Business Metrics
- Monthly qualified lead volume
- Lead-to-engagement conversion rate
- Revenue attribution to platform

### Platform Metrics
- Organic search ranking for target keywords (e.g., "penetration testing UK", "web application pentest fintech")
- Page speed scores (Lighthouse ≥95 Performance, ≥95 Accessibility)
- Core Web Vitals: LCP <2.5s, FID <100ms, CLS <0.1

### Content Metrics
- Intelligence Hub: articles published per month
- Average time-on-page for Intelligence Hub articles
- Backlinks earned from security community

---

## 7. Competitive Positioning

### Competitive Landscape

| Competitor Type | Strengths | Weaknesses |
|---|---|---|
| Large consultancies (Big 4, Accenture) | Brand, scale, enterprise relationships | Expensive, relationship-driven, slow, junior staff on engagements |
| Mid-size security firms (NCC Group, Rapid7 services) | Breadth, tool access, certifications | Impersonal, high volume, often outsourced |
| Other individual consultants | Cost, personal service | Typically poor marketing; hard to evaluate quality; generic portfolio sites |
| Automated platforms (Detectify, Synack) | Speed, cost, always-on | No adversarial simulation; weak on business logic; no board-ready reporting |

### Unique Selling Proposition

**The platform communicates three differentiators that no automated tool and few individual consultants match:**

1. **Business-risk framing** — findings are presented in terms of business impact, not just CVSS scores. The CEO can understand the report.

2. **Direct accountability** — a single named consultant, from scoping to remediation verification. Not a firm, not a team of unknowns.

3. **Executive Briefing intelligence** — real-time threat landscape awareness demonstrated on the homepage itself. No other individual consultant does this.

### Positioning Statement

*For C-suite leaders who need to understand their real security posture — not a compliance checkbox and not an automated scan — Islam Ahmed provides adversarial penetration testing and security advisory that is accountable, business-focused, and built around the specific threats facing their industry.*

---

## 8. Information Architecture

### Current Site Map

```
/ (Homepage)
├── Hero
├── Why Hire Me
├── Services (overview)
├── Security Impact (case studies)
├── Methodology
├── Executive Briefing
├── Process
├── Meet Islam
├── Testimonials
├── Intelligence Hub (preview)
├── Trust Reasons
└── CTA

/services (planned)
├── Service overview
├── [6 service detail sections]
└── CTA

/services/[slug] (planned)
└── Individual service deep-dive

/intelligence-hub (planned)
├── Article index
└── Featured articles

/intelligence-hub/[slug] (planned)
└── Individual article

/case-studies (planned)
└── Anonymised engagement write-ups

/about (planned)
└── Extended biography and credentials

/contact (planned)
└── Standalone contact page
```

---

## 9. Page Objectives

| Page | Primary Objective | Secondary Objective |
|---|---|---|
| Homepage | Build trust across all personas; drive contact form submissions | Demonstrate intelligence capability; introduce services |
| Services | Enable service-specific discovery; qualify visitor by service need | Drive consultation bookings per service |
| Intelligence Hub | Establish thought leadership; drive organic traffic | Build return-visit habit; nurture non-ready leads |
| Case Studies | Prove results with specificity; address risk objection | Illustrate engagement process |
| About | Build personal trust; address "who is this person" | Provide credentials for procurement vetting |
| Contact | Standalone conversion point for referral and direct traffic | Reduce friction for visitors who skip the homepage |

---

## 10. SEO Strategy

### Target Keywords

**Service-based (commercial intent):**
- penetration testing [industry] (fintech, healthcare, SaaS)
- web application penetration testing UK
- red team engagement consultant
- cloud security review AWS/Azure/GCP
- vCISO consultant
- secure code review service

**Thought leadership (informational intent):**
- active directory attack paths
- API security vulnerabilities
- cloud misconfiguration risks
- OWASP Top 10 [current year]

### Technical SEO Requirements
- All pages: canonical URL, OG image, structured title/description
- Intelligence Hub articles: `Article` schema markup, `author` schema
- Services pages: `Service` schema markup
- Homepage: `Person` + `ProfessionalService` schema (planned)
- Sitemap: auto-generated by Next.js
- `robots.txt`: allow all except `/api/`

---

## 11. Content Strategy

### Homepage Content
Static — locked at v1.0.0. Copy approved. Changes require explicit approval.

### Intelligence Hub
Original articles written by Islam Ahmed on offensive security topics. Target: 1–2 articles per month. Each article must:
- Address a specific technical topic that decision-makers find credible
- Be accessible to a technical-but-not-security audience (CTO level)
- Include practical takeaways and mitigation guidance
- Support a commercial intent query (e.g., "why you need a penetration test for [use case]")

### Case Studies
Anonymised write-ups of real engagements. Each must:
- Be approved for publication (NDA review)
- Follow the structure: Client context → Attack path → Business impact → Remediation
- Protect all identifying information while preserving technical credibility

---

## 12. Intelligence Hub Vision

The Intelligence Hub is the long-term content engine of the platform. Its purpose is to:

1. **Attract** — rank organically for informational queries from security-aware decision-makers
2. **Educate** — demonstrate technical depth without requiring a conversation
3. **Nurture** — bring visitors back repeatedly; they may not be ready to buy today
4. **Convert** — each article ends with a relevant CTA connecting the topic to a service

**Architecture:** The Intelligence Hub will eventually be powered by a lightweight CMS (Sanity or similar) to allow article publishing without code deploys. Until then, articles are stored as MDX or structured data within the repository.

---

## 13. Long-Term Product Roadmap

See [PROJECT_ROADMAP.md](PROJECT_ROADMAP.md) for the full phased roadmap.

**Summary of phases beyond the current homepage:**
- Phase 2: Services page (current milestone)
- Phase 3: Intelligence Hub
- Phase 4: Case Studies
- Phase 5: About / Credentials
- Phase 6: Contact page
- Phase 7: Live API integrations (threat intelligence)
- Phase 8: CMS / content dashboard
- Phase 9: Analytics and lead tracking

---

## Document Maintenance

This PRD is a living document. It should be updated whenever:
- A new page or feature is approved
- Business goals or success metrics change
- The competitive landscape shifts significantly
- A new persona or audience segment is identified

Major changes should be versioned (e.g., PRD v1.1, v2.0) and recorded in `CHANGELOG.md`.
