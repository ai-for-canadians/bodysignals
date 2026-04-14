# Body Signals — Independent Health Research Digest

## What This Is
An independent research digest and publisher built on Next.js 14. Body Signals summarises peer-reviewed health research — symptoms, conditions, interventions — in plain language for Canadian and US readers. It consolidates 7 source sites from the InfoBank network into one unified destination. Body Signals is not a healthcare provider, does not practise medicine, and does not provide medical advice.

## Current State
- **Pages:** 120 statically generated
- **Content:** 99 conditions, 23 symptoms, 21 sleep interventions, 19 ADHD systems, 5 movement programs
- **Phase A (Legal Audit):** Complete — 6 legal pages, research-digest framing, evidence badges link to /methodology
- **Phase B (Referral Scaffolding):** Complete — 9 partners registered (all inactive), /disclosures page, editorial firewall
- **Phase C+ (Licensing, Provider Directory, AI):** Not started — see PHASE_B_C_D_PROMPT.md

## Source Data Locations (read-only)
All source sites are in `../extracted-apps/`:
- `../extracted-apps/condition-control/lib/data/`
- `../extracted-apps/gut-health-deep-dive/lib/data/`
- `../extracted-apps/mental-health/lib/data/`
- `../extracted-apps/sleep-better/lib/data/`
- `../extracted-apps/movement-rx/lib/data/`
- `../extracted-apps/adhd-systems/lib/data/`

## Tech Stack
- Next.js 14 (App Router, static generation)
- TypeScript 5 (strict mode)
- Tailwind CSS 3 (dark theme)
- Framer Motion (animations)
- Lucide React (icons)
- Plausible Analytics (privacy-respecting, production-only)
- All UI components inlined in `components/ui/` — NO external package dependencies

## Design System
- **Background:** bg-slate-900 | **Surface:** bg-slate-800 | **Accent:** amber-500
- **Evidence Ratings:** A=emerald, B=green, C=amber, D=orange, F=red
- **Font:** Inter | **Container:** max-w-7xl mx-auto px-4 sm:px-6 lg:px-8
- Full spec in `docs/DESIGN_SYSTEM.md`

## Content Rules
- A-F evidence ratings required on all research summaries (editorial judgments about research quality, not clinical endorsements)
- Canadian spelling (colour, behaviour, centre)
- No "studies show" without specific citation
- Research-digest disclaimer on every health page ("research summary, not medical advice")
- Never use directive language ("you should take/use/try/start/stop", "we recommend", "avoid X") — use descriptive framing ("research suggests", "studies have evaluated", "some people find")
- Crisis numbers on mental health pages (jurisdiction-correct): 988 Canada/US, text HOME to 741741 US / CONNECT to 686868 Canada, Kids Help Phone 1-800-668-6868 Canada, LGBT Youth Line 1-800-268-9688 Canada, Trevor Project 1-866-488-7386 US
- Full rules in `docs/CONTENT_STANDARDS.md`

## Key Commands
```bash
npm run dev          # Start dev server
npm run build        # Build (verify page count)
npm run typecheck    # TypeScript check
npm run lint         # ESLint
npm run check:crisis # Crisis numbers present
npm run check:phrases # Forbidden phrases check
```

## Key Gaps (as of 2026-04-14)
- 0 of 120 source arrays are empty — all backfilled with real, verified PubMed citations
- No JSON-LD structured data on any pages
- Search is a visual placeholder — not functional
- Analytics not yet deployed (Plausible ready, needs production env)
- Accessibility needs screen reader testing
