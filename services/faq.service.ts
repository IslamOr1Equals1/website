export interface FaqItem {
  question: string
  answer: string
}

export async function getFaq(): Promise<FaqItem[]> {
  return [
    {
      question: 'How is a penetration test different from a vulnerability scan?',
      answer: 'A vulnerability scanner identifies known weaknesses against a database of signatures. A penetration test uses manual techniques to discover, chain, and exploit vulnerabilities — including business logic flaws, authorisation failures, and multi-step attack paths that scanners cannot detect. The difference is not speed; it is depth and accuracy.',
    },
    {
      question: 'Do I need a penetration test or a red team engagement?',
      answer: 'A penetration test answers: "Do vulnerabilities exist?" A red team engagement answers: "Would we detect and stop a real attacker who found them?" If you have invested in defensive capability — a SOC, SIEM, incident response playbooks — a red team engagement tests whether those controls work. If you have not yet validated your attack surface, a penetration test is the right starting point.',
    },
    {
      question: 'Will testing cause downtime or disrupt our production systems?',
      answer: 'Disruption is prevented through scoping. Rules of engagement are agreed before testing begins, including time windows, out-of-scope systems, and actions that require explicit approval before execution. Destructive techniques are never used without written authorisation. Most engagements complete without any production impact.',
    },
    {
      question: 'How is confidentiality handled?',
      answer: 'An NDA is signed before any scope, systems, or business context are discussed. All findings are delivered encrypted. Reports are not retained beyond the agreed delivery period. Third-party subcontractors are never used — your environment is assessed by a single senior consultant.',
    },
    {
      question: 'What does a fixed-fee engagement mean?',
      answer: 'The scope and cost are agreed in writing before testing begins. There are no day-rate overruns, no additional charges for findings that require more analysis, and no commercial pressure to find more (or fewer) vulnerabilities. The fee covers the engagement as defined — including the re-test of critical findings.',
    },
    {
      question: 'How long does a typical engagement take?',
      answer: 'Web application and secure code review engagements typically take 3–5 days. Network and Active Directory assessments run 5–8 days. Cloud security reviews take 4–6 days. Red team engagements are scoped individually but typically span 2–4 weeks. Report delivery follows 2–3 days after testing completes.',
    },
    {
      question: 'What do we receive at the end of the engagement?',
      answer: 'Every engagement delivers two documents: an executive summary written for non-technical readers, and a technical report for your engineering team with CVSS-scored findings, reproduction steps, and a prioritised remediation roadmap. Critical and high findings are re-tested at no additional cost once remediated.',
    },
    {
      question: 'Do you work with companies that have no internal security team?',
      answer: 'Yes. Many clients have no dedicated security function. The executive summary is written specifically for founders, CEOs, and board members who need to understand risk without technical context. Remediation guidance is practical and written in terms your development team can act on.',
    },
    {
      question: 'Which cloud platforms do you assess?',
      answer: 'AWS, Azure, and GCP. Engagements typically focus on IAM posture, exposed resources, workload security, secrets management, and CI/CD pipeline review. Compliance mapping against SOC 2, ISO 27001, and CIS Benchmarks is included.',
    },
    {
      question: 'Can you help us meet a compliance requirement such as PCI-DSS, ISO 27001, or SOC 2?',
      answer: 'Penetration testing is a formal requirement under PCI-DSS, ISO 27001, and SOC 2. The assessments conducted include the scope and documentation required to satisfy these frameworks. However, compliance is treated as a floor, not a ceiling — the assessment is designed to find what an attacker would find, not to generate a checklist pass.',
    },
    {
      question: 'What industries do you specialise in?',
      answer: 'Fintech and regulated financial services, healthcare and NHS-connected systems, SaaS and B2B platforms, e-commerce, legal and professional services, and public sector. Experience with PCI-DSS, GDPR, NHS IG Toolkit, Cyber Essentials Plus, and FCA-regulated environments.',
    },
    {
      question: 'How do I know the findings are accurate and not inflated?',
      answer: 'Every finding includes a proof-of-concept demonstrating the vulnerability is exploitable — not theoretical. CVSS scoring follows the published standard without adjustment. False positives are removed before delivery. The technical debrief before report issuance allows your engineering team to challenge any finding they believe is incorrect.',
    },
  ]
}
