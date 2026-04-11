# Body Signals — Unified Health & Body Site

## What This Is
A standalone Next.js 14 site consolidating 7 health information sites from the InfoBank network into one comprehensive health destination. This is the merged "Health & Body" vertical.

## Project Status
Anchor site (Body Signals) is in place. Six source sites need to be merged in:
- Condition Control (9 conditions) → /conditions/
- Gut Health Deep Dive (7 conditions) → /conditions/ (category: digestive)
- Mental Health (6 conditions + providers) → /conditions/ + /providers/
- Sleep Better (20 interventions) → /topics/sleep/
- Movement RX (3 programs) → /topics/movement/
- ADHD Systems (75 systems/tools) → /topics/adhd/

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
- All UI components inlined in `components/ui/` — NO external package dependencies

## Design System
- **Background:** bg-slate-900 | **Surface:** bg-slate-800 | **Accent:** amber-500
- **Evidence Ratings:** A=emerald, B=green, C=amber, D=orange, F=red
- **Font:** Inter | **Container:** max-w-7xl mx-auto px-4 sm:px-6 lg:px-8
- Full spec in `docs/DESIGN_SYSTEM.md`

## Content Rules
- A-F evidence ratings required on all health claims
- Canadian spelling (colour, behaviour, centre)
- No "studies show" without specific citation
- Medical disclaimer on every health page
- Crisis numbers on mental health pages (988 Canada/US, Kids Help Phone 1-800-668-6868)
- Full rules in `docs/CONTENT_STANDARDS.md`

## Key Commands
```bash
npm run dev          # Start dev server
npm run build        # Build (verify zero errors after each phase)
npm run typecheck    # TypeScript check
npm run lint         # ESLint
```

## Merge Execution
See `docs/HEALTH_CONSOLIDATION_STRATEGY.md` for the full strategy.
See `../CLAUDE_CODE_PROMPT.md` for the step-by-step execution prompt.
