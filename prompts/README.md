# Body Signals — Pre-Launch Enhancement Prompts

Five Claude Code session prompts, ordered by impact. Each is self-contained and executable in a single session. Run them in order — each builds on the previous.

## Session Order

### Pre-Launch (run in order)

| # | Prompt | What It Does | New Files | Modified | Impact |
|---|--------|-------------|-----------|----------|--------|
| 1 | [Analytics + Project Docs](SESSION_1_ANALYTICS_AND_PROJECT_DOCS.md) | Plausible analytics, CLAUDE.md, TASKS.md, directive language cleanup | ~3 | ~5 | Can't measure anything without this |
| 2 | [Source Citation Backfill](SESSION_2_SOURCE_CITATION_BACKFILL.md) | 40+ real PubMed/DOI citations for critical/high-priority claims | 0 | ~5 | Core brand promise depends on this |
| 3 | [JSON-LD + Evidence Tiers](SESSION_3_JSON_LD_STRUCTURED_DATA.md) | Schema.org structured data on all health pages, evidence tier consolidation | ~3 | ~15 | SEO rich results, single source of truth |
| 4 | [Search + Accessibility](SESSION_4_SEARCH_AND_ACCESSIBILITY.md) | Fuse.js client-side search, WCAG 2.1 AA hardening, skip nav, focus styles | ~5 | ~15 | Usability for 120+ page site |
| 5 | [Launch Hardening](SESSION_5_LAUNCH_HARDENING.md) | OG/Twitter cards, robots.txt, favicon, web manifest, error monitoring, final verification | ~5 | ~5 | Launch-ready deploy gate |

### Deferred (run only when triggered)

| # | Prompt | When To Run | New Files | Modified |
|---|--------|-------------|-----------|----------|
| 6 | [Content Manifest + Licensing](SESSION_6_CONTENT_MANIFEST_AND_LICENSING.md) | When a B2B prospect surfaces or you start outbound to enterprise buyers | ~3 | ~3 |

## How To Use

Feed each prompt file directly into Claude Code as the session instructions. Each prompt contains:

1. **Why** — context on why this matters and where it fits
2. **What to create** — new files with type signatures and implementation notes
3. **What to modify** — existing files with specific changes
4. **Gate checklist** — verification steps that must all pass before the session is done

## What's Already Done

- **Phase A (Legal Audit):** 6 legal pages, research-digest framing, evidence badges, source rendering
- **Phase B (Referral Scaffolding):** 10 partners, /disclosures, editorial firewall, placement mapping

## What's Deferred (Post-Launch)

- **Phase C.P:** Provider directory with freemium listings (target: ~80K MAU)
- **Phase D:** AI architecture document + eventual RAG implementation
- **Ongoing:** Source backfill to 80%+ coverage, quarterly content reviews

## Current Codebase State

- 450+ statically generated pages
- 148 conditions, 109 symptoms, 58 sleep interventions, 78 ADHD systems, 27 movement programs
- Next.js 14, TypeScript strict, Tailwind dark theme
- Zero lint errors, zero TypeScript errors
