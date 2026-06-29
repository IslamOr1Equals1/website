# API Integrations

This document is the implementation roadmap for all external API integrations. Every current and planned integration is recorded here with sufficient detail to implement, operate, and maintain the connection.

Related: [THREAT_INTELLIGENCE_ARCHITECTURE.md](THREAT_INTELLIGENCE_ARCHITECTURE.md) — technical architecture for how these APIs feed the Executive Briefing and Intelligence Hub.

---

## Integration Status Legend

| Status | Meaning |
|---|---|
| `Implemented` | Client stub exists; live data flowing |
| `Stubbed` | Client file exists in `lib/integrations/`; not yet wired to live data |
| `Planned` | On the roadmap; no code written yet |
| `Deferred` | Evaluated and postponed; may be revisited |

---

## 1. Resend (Email Delivery)

| Property | Value |
|---|---|
| **Purpose** | Delivers contact form submissions to Islam Ahmed's inbox |
| **Auth** | API key via `RESEND_API_KEY` environment variable |
| **Docs** | https://resend.com/docs |
| **Rate limits** | 100 emails/day (free tier); 50,000/month (paid) |
| **Refresh interval** | N/A — triggered per form submission |
| **Caching** | N/A |
| **Error handling** | On failure, logs error; returns 500 to client with generic message |
| **Retry strategy** | No automatic retry (preventing duplicate emails); user sees error and can resubmit |
| **Fallback** | If `RESEND_API_KEY` is unset, the API route logs a warning and returns a 200 (dev mode graceful fallback) |
| **Priority** | High — in production |
| **Status** | Implemented |
| **File** | `lib/integrations/resend.client.ts`, `repositories/contact.repository.ts`, `app/api/contact/route.ts` |
| **Notes** | From/to email addresses are set via `RESEND_FROM_EMAIL` and `RESEND_TO_EMAIL` env vars |

---

## 2. CISA Known Exploited Vulnerabilities (KEV)

| Property | Value |
|---|---|
| **Purpose** | Authoritative source for actively exploited vulnerabilities; highest trust signal for the threat feed |
| **Auth** | None — public API |
| **Docs** | https://www.cisa.gov/known-exploited-vulnerabilities-catalog |
| **Endpoint** | `https://www.cisa.gov/sites/default/files/feeds/known_exploited_vulnerabilities.json` |
| **Rate limits** | None documented; treat as polled public resource |
| **Refresh interval** | Every 4 hours (CISA updates daily; 4h is sufficient) |
| **Caching** | Server-side cache with 4-hour TTL; served from cache on subsequent requests |
| **Error handling** | On fetch failure, return last cached result; if no cache, return empty array |
| **Retry strategy** | 3 retries with exponential backoff via `lib/api/client.ts` |
| **Fallback** | Mock data from `threat-intelligence.repository.ts` |
| **Priority** | High — first integration to implement |
| **Status** | Stubbed |
| **File** | `lib/integrations/cisa.client.ts` |
| **Notes** | JSON schema is stable and well-documented; low implementation risk |

---

## 3. NVD / CVE (National Vulnerability Database)

| Property | Value |
|---|---|
| **Purpose** | Comprehensive CVE database with CVSS scores; source for vulnerability metrics and severity counts |
| **Auth** | API key recommended (higher rate limits); `NVD_API_KEY` env var |
| **Docs** | https://nvd.nist.gov/developers/vulnerabilities |
| **Endpoint** | `https://services.nvd.nist.gov/rest/json/cves/2.0` |
| **Rate limits** | 5 requests/30 seconds (no key); 50 requests/30 seconds (with key) |
| **Refresh interval** | Every 15 minutes (recent CVEs query) |
| **Caching** | Server-side cache with 15-minute TTL |
| **Error handling** | Return cached data on failure; log the error |
| **Retry strategy** | 3 retries with exponential backoff; respect rate limit headers |
| **Fallback** | Mock CVE data |
| **Priority** | High |
| **Status** | Stubbed |
| **File** | `lib/integrations/nvd.client.ts` |
| **Notes** | API v2.0 uses pagination; initial implementation should query the last 24 hours of critical/high CVEs only |

---

## 4. ThreatFox (by abuse.ch)

| Property | Value |
|---|---|
| **Purpose** | IOC (Indicator of Compromise) database; malware families and C2 infrastructure |
| **Auth** | API key via `THREATFOX_API_KEY` env var (free with registration) |
| **Docs** | https://threatfox.abuse.ch/api/ |
| **Endpoint** | `https://threatfox-api.abuse.ch/api/v1/` |
| **Rate limits** | Not publicly documented; conservative approach recommended |
| **Refresh interval** | Every 30 minutes |
| **Caching** | Server-side cache with 30-minute TTL |
| **Error handling** | Return cached data; log error |
| **Retry strategy** | 2 retries with exponential backoff |
| **Fallback** | Mock ThreatFox entries in repository |
| **Priority** | Medium |
| **Status** | Stubbed |
| **File** | `lib/integrations/threatfox.client.ts` |
| **Notes** | Free but requires registration; POST-based API; returns IOCs filterable by type and malware family |

---

## 5. GitHub Security Advisories

| Property | Value |
|---|---|
| **Purpose** | Supply chain and dependency vulnerability data; particularly relevant for SaaS and developer audiences |
| **Auth** | GitHub personal access token via `GITHUB_TOKEN` env var (read:security_advisories scope) |
| **Docs** | https://docs.github.com/en/rest/security-advisories |
| **Endpoint** | `https://api.github.com/advisories` |
| **Rate limits** | 5,000 requests/hour (authenticated) |
| **Refresh interval** | Every 60 minutes |
| **Caching** | Server-side cache with 60-minute TTL |
| **Error handling** | Return cached data; log error |
| **Retry strategy** | 3 retries; respect `Retry-After` header |
| **Fallback** | Mock GitHub advisory data |
| **Priority** | Medium |
| **Status** | Stubbed |
| **File** | `lib/integrations/github-advisory.client.ts` |
| **Notes** | Filter by `severity=critical,high`; limit to last 7 days; ecosystem filter optional |

---

## 6. AbuseIPDB

| Property | Value |
|---|---|
| **Purpose** | IP reputation data; active scanning and attack source tracking |
| **Auth** | API key via `ABUSEIPDB_API_KEY` env var |
| **Docs** | https://docs.abuseipdb.com/ |
| **Rate limits** | 1,000 checks/day (free tier) |
| **Refresh interval** | Used on-demand for specific IP lookups; not polled continuously |
| **Caching** | Per-IP cache with 24-hour TTL |
| **Error handling** | Return null for failed lookups; do not surface errors to UI |
| **Retry strategy** | 1 retry only (conserve quota) |
| **Fallback** | Omit IP reputation from output |
| **Priority** | Low |
| **Status** | Stubbed |
| **File** | `lib/integrations/abuseipdb.client.ts` |
| **Notes** | Most useful for the Intelligence Hub (article enrichment) rather than the homepage feed. Consider quota carefully before wiring. |

---

## 7. Shodan

| Property | Value |
|---|---|
| **Purpose** | Internet exposure scanning; identifies publicly exposed services for specific queries |
| **Auth** | API key via `SHODAN_API_KEY` env var |
| **Docs** | https://developer.shodan.io/api |
| **Rate limits** | 1 request/second; query credits vary by plan |
| **Refresh interval** | Every 24 hours (data does not change rapidly) |
| **Caching** | Server-side cache with 24-hour TTL; Shodan data changes slowly |
| **Error handling** | Return cached data; log error; omit from UI if no cache |
| **Retry strategy** | 2 retries with 5-second delay |
| **Fallback** | Omit exposure data |
| **Priority** | Low — requires paid plan for meaningful query access |
| **Status** | Stubbed |
| **File** | `lib/integrations/shodan.client.ts` |
| **Notes** | Potentially powerful for the Executive Briefing ("X internet-facing services with known vulnerabilities detected this week"). Requires careful query design to avoid excessive credit consumption. Evaluate after CISA/NVD are live. |

---

## 8. VirusTotal

| Property | Value |
|---|---|
| **Purpose** | File/URL/domain/IP reputation; malware analysis enrichment |
| **Auth** | API key via `VIRUSTOTAL_API_KEY` env var |
| **Docs** | https://developers.virustotal.com/reference |
| **Rate limits** | 4 lookups/minute (free tier); 500/minute (premium) |
| **Refresh interval** | On-demand for specific IoC lookups |
| **Caching** | Per-hash/URL cache with 1-hour TTL |
| **Error handling** | Return null; do not surface in UI |
| **Retry strategy** | 1 retry; respect rate limits |
| **Fallback** | Omit VirusTotal enrichment |
| **Priority** | Low — enrichment only, not primary feed |
| **Status** | Stubbed |
| **File** | `lib/integrations/virustotal.client.ts` |
| **Notes** | Most useful as enrichment data for Intelligence Hub articles, not as a primary feed source. Free tier rate limits are very tight. |

---

## 9. Exploit-DB

| Property | Value |
|---|---|
| **Purpose** | Public exploit database; demonstrates active exploitation risk for known CVEs |
| **Auth** | None — public |
| **Docs** | https://www.exploit-db.com/api |
| **Rate limits** | Unknown; treat conservatively |
| **Refresh interval** | Every 24 hours |
| **Caching** | Server-side cache with 24-hour TTL |
| **Error handling** | Return empty array on failure |
| **Retry strategy** | 2 retries |
| **Fallback** | Omit from feed |
| **Priority** | Low |
| **Status** | Stubbed |
| **File** | `lib/integrations/exploit-db.client.ts` |
| **Notes** | Useful for pairing with NVD data: "this CVE has a public exploit available" adds urgency to the feed |

---

## 10. OpenCTI

| Property | Value |
|---|---|
| **Purpose** | Open-source cyber threat intelligence platform; structured threat actor and campaign data |
| **Auth** | API token via `OPENCTI_API_KEY` env var; requires self-hosted or third-party instance |
| **Docs** | https://docs.opencti.io/latest/development/api-usage/ |
| **Rate limits** | Depends on deployment |
| **Refresh interval** | Every 60 minutes |
| **Caching** | Server-side cache with 60-minute TTL |
| **Error handling** | Return cached data; log error |
| **Retry strategy** | 3 retries |
| **Fallback** | Omit from feed |
| **Priority** | Deferred — requires infrastructure |
| **Status** | Stubbed |
| **File** | `lib/integrations/opencti.client.ts` |
| **Notes** | Powerful but requires a running OpenCTI instance. Deferred until other public API sources are live and the feed proves valuable. |

---

## 11. AlienVault OTX

| Property | Value |
|---|---|
| **Purpose** | Community threat intelligence; pulses, IOCs, threat actor TTPs |
| **Auth** | API key via `OTX_API_KEY` env var (free with registration) |
| **Docs** | https://otx.alienvault.com/api |
| **Rate limits** | Not publicly documented; conservative polling recommended |
| **Refresh interval** | Every 60 minutes |
| **Caching** | Server-side cache with 60-minute TTL |
| **Error handling** | Return cached data; log error |
| **Retry strategy** | 2 retries |
| **Fallback** | Omit from feed |
| **Priority** | Low — lower signal-to-noise ratio than CISA/NVD |
| **Status** | Planned |
| **Notes** | Community-sourced data has more noise than government feeds. Implement after CISA and NVD are stable. |

---

## 12. Calendly (Booking Integration)

| Property | Value |
|---|---|
| **Purpose** | Allow visitors to book a consultation slot directly, reducing email round-trips |
| **Auth** | OAuth token via `CALENDLY_TOKEN` env var |
| **Docs** | https://developer.calendly.com/ |
| **Rate limits** | 700 requests/hour |
| **Refresh interval** | N/A — event-driven |
| **Status** | Stubbed |
| **File** | `lib/integrations/calendly.client.ts` |
| **Notes** | Planned as an enhancement to the contact flow. Currently deprioritised in favour of the form-based approach. |

---

## Implementation Priority Order

1. **Resend** — ✅ Done
2. **CISA KEV** — Simple, no auth, stable, highest trust signal
3. **NVD / CVE** — Most comprehensive; requires rate limit management
4. **ThreatFox** — Free, well-documented, high value
5. **GitHub Security Advisories** — Relevant to SaaS/developer audience
6. **AbuseIPDB** — Useful but quota-constrained
7. **AlienVault OTX** — Lower priority; more noise
8. **Exploit-DB** — Enrichment use case only
9. **Shodan** — Requires paid plan; defer evaluation
10. **VirusTotal** — Enrichment only; tight rate limits on free tier
11. **OpenCTI** — Requires infrastructure; long-term
12. **Calendly** — UX enhancement; not intelligence-related
