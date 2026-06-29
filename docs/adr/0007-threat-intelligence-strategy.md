# ADR-0007: Threat Intelligence Integration Strategy

**Date:** 2026-06-28
**Status:** Accepted
**Deciders:** Islam Ahmed

## Context

The Executive Security Briefing section on the homepage displays a live-looking threat intelligence feed, risk metrics, and vulnerability summaries. These are currently served from mock data in the repository layer. A strategy was needed for how and when to wire these to real APIs, and which data sources to prioritise.

A secondary concern: threat intelligence data from public APIs is often noisy, inconsistently formatted, and occasionally unavailable. The integration architecture must degrade gracefully.

## Decision

Threat intelligence is integrated in a **layered, progressive approach**:

1. **Phase 1 (current):** All data served from the mock repository (`threat-intelligence.repository.ts`). The data shape mirrors what a real API would return. The UI is fully implemented and verified.

2. **Phase 2 (next integration milestone):** Wire real APIs behind the existing repository interface. The component layer does not change — only the repository implementation changes.

3. **Phase 3 (optimised):** Add a server-side cache layer with configurable TTLs per data source. Add AI summarisation for raw CVE descriptions.

**Data source priority order:**
1. CISA KEV — authoritative, stable, US government source
2. NVD / CVE — comprehensive CVE data with CVSS scores
3. ThreatFox — IOC and malware intelligence
4. GitHub Security Advisories — supply chain and dependency risk
5. AbuseIPDB — IP reputation (lower priority)
6. Shodan — internet exposure scanning (premium, higher cost)
7. AlienVault OTX — community threat intelligence (lower signal-to-noise)

**Architecture principles:**
- All API calls happen **server-side only** — never expose API keys to the client
- Each source is wrapped in a typed client (`lib/integrations/[source].client.ts`)
- All sources implement a common normalisation interface (see `repositories/threat-intelligence.repository.ts`)
- Failures from any single source do not break the UI — mock data is the fallback

## Alternatives Considered

| Alternative | Reason Rejected |
|---|---|
| Wire all APIs immediately | Premature — adds API costs, rate limit management, and error handling complexity before the UI is validated |
| Single commercial threat feed (e.g., Recorded Future) | Cost-prohibitive for current stage; planned as a future premium option |
| Client-side API calls | Exposes API keys; violates security model; adds latency |
| GraphQL aggregation layer | Over-engineered for current data volume; adds infrastructure complexity |

## Consequences

**Positive:**
- The mock-first approach allowed the full UI to be built and verified without API accounts or costs
- The repository pattern means wiring real APIs is a single-file change per source
- Progressive activation means the site works perfectly at every stage of integration

**Negative / Trade-offs:**
- The Executive Briefing section currently shows static data. A visitor who inspects the network tab will see no live API calls. This is acceptable at the current stage but must be resolved before presenting the site as a live intelligence platform.
- Rate limits from free-tier APIs will constrain refresh frequency; a caching strategy is required before go-live

**Risks:**
- Public free-tier APIs (NVD, CISA) have rate limits; high traffic could exhaust quotas. Mitigated by server-side caching with long TTLs (15–60 minutes depending on source).
- API schemas change without notice. Mitigated by Zod validation at the repository boundary — schema changes fail loudly rather than silently corrupting the UI.

## References

- [THREAT_INTELLIGENCE_ARCHITECTURE.md](../THREAT_INTELLIGENCE_ARCHITECTURE.md) — full technical architecture
- [API_INTEGRATIONS.md](../API_INTEGRATIONS.md) — per-source integration specifications
- [ARCHITECTURE.md](../ARCHITECTURE.md) — repository pattern documentation
