# Session 1: Analytics + Project Docs + Directive Language Cleanup

## Why This Is First

You cannot measure MAU, bounce rate, organic traffic share, or return visitor rate without analytics. Every monetization gate in the strategy depends on traffic data. This session also restores the missing CLAUDE.md and TASKS.md files that future sessions depend on, and cleans up the 3 remaining directive language violations.

**Estimated scope:** ~10 files created/modified. Lightest session — gets the foundation right.

## Context

Body Signals is a Next.js 14 static health-research-digest site (App Router, TypeScript strict, Tailwind dark theme). Phase A (legal audit) and Phase B (referral scaffolding) are complete. The site has 450+ statically generated pages, 10 inactive referral partners, and zero analytics.

The privacy page already states "We use privacy-respecting analytics that do not track individual users" but no analytics vendor is implemented. The monetization strategy requires these thresholds before activating revenue paths:
- 50K MAU → activate affiliate partnerships
- 100K MAU → activate provider directory
- 70% organic search traffic share
- <60% bounce rate on detail pages
- 20%+ return visitor rate

CLAUDE.md and TASKS.md are referenced in `docs/DEPLOY_CHECKLIST.md` but do not exist.

Three instances of directive language ("you should") remain in `lib/data/` files, violating the brand voice standard.

---

## 1.1 — Analytics Implementation (Plausible)

**Decision: Plausible Analytics** — privacy-respecting, no cookies, GDPR/PIPEDA compliant by default, lightweight script (<1KB), supports custom events, self-hostable later if needed. Free tier available for testing; paid plan is $9/month for up to 10K monthly pageviews.

### Create:

**`lib/analytics/plausible.ts`**
```typescript
// Plausible event helper — typed custom events for Body Signals
export type PlausibleEvent =
  | 'Feedback Submitted'
  | 'Referral CTA Clicked'
  | 'Source Link Clicked'
  | 'Evidence Badge Clicked'
  | 'Search Used'
  | 'External Link Clicked';

export function trackEvent(event: PlausibleEvent, props?: Record<string, string>): void {
  if (typeof window !== 'undefined' && (window as any).plausible) {
    (window as any).plausible(event, { props });
  }
}
```

### Modify:

**`app/layout.tsx`**
Add Plausible script in `<head>`:
```html
<Script
  defer
  data-domain="bodysignals.org"
  src="https://plausible.io/js/script.js"
  strategy="afterInteractive"
/>
```

Use `next/script` with `strategy="afterInteractive"` so it doesn't block rendering.

Add environment variable check so analytics only loads in production:
```typescript
{process.env.NODE_ENV === 'production' && (
  <Script ... />
)}
```

**`app/privacy/page.tsx`**
Update the analytics section to name Plausible specifically:
- "We use Plausible Analytics, a privacy-respecting analytics service that does not use cookies, does not track individual users, and is compliant with GDPR, PIPEDA, and CCPA by default."
- Link to Plausible's data policy: https://plausible.io/data-policy
- Note: "All analytics data is aggregated. We cannot identify individual visitors."

**`docs/DEPLOY_CHECKLIST.md`**
Add to Launch-Day Gates:
- [ ] Plausible Analytics: `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` env var set (or hardcoded domain verified)
- [ ] Verify Plausible script loads on production (check Network tab for plausible.io/js/script.js)
- [ ] Log one test pageview and confirm it appears in Plausible dashboard
- [ ] Verify no analytics script loads in development (`NODE_ENV !== 'production'`)

**`docs/RUNBOOK.md`**
Add "Analytics" section:
- Dashboard URL: https://plausible.io/bodysignals.org
- Key metrics to monitor weekly: unique visitors, pageviews, bounce rate, top pages, top sources, top countries
- Monetization gate tracking: document current MAU monthly, compare against 50K (Path 1) and 100K (Path 2) thresholds
- Custom events: Referral CTA Clicked (tracks affiliate readiness), Feedback Submitted, Search Used

### Verification:
- `npm run build` succeeds (no new pages — analytics is a script addition)
- In dev mode, Plausible script does NOT load (check page source)
- Privacy page names Plausible and links to their data policy
- Deploy checklist includes analytics verification steps
- `npm run typecheck` passes with new analytics types

---

## 1.2 — CLAUDE.md Restoration

The CLAUDE.md file is referenced in `docs/DEPLOY_CHECKLIST.md` verification step ("research digest" grep should return ≥1 hit in CLAUDE.md). It should exist at the project root.

### Create:

**`CLAUDE.md`**
Content should reflect the current state accurately:

```markdown
# Body Signals — Independent Health Research Digest

## What This Is
An independent research digest and publisher built on Next.js 14. Body Signals summarises peer-reviewed health research — symptoms, conditions, interventions — in plain language for Canadian and US readers. It consolidates 7 source sites from the InfoBank network into one unified destination. Body Signals is not a healthcare provider, does not practise medicine, and does not provide medical advice.

## Current State
- **Pages:** 450+ statically generated
- **Content:** 148 conditions, 109 symptoms, 58 sleep interventions, 78 ADHD systems, 27 movement programs, 4 provider types
- **Phase A (Legal Audit):** Complete — 6 legal pages, research-digest framing, evidence badges link to /methodology
- **Phase B (Referral Scaffolding):** Complete — 10 partners registered (all inactive), /disclosures page, editorial firewall
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
- Research-digest disclaimer on every health page
- Never use directive language ("you should take/use/try/start/stop", "we recommend")
- Crisis numbers on mental health pages: 988 Canada/US, text HOME to 741741 US / CONNECT to 686868 Canada
- Full rules in `docs/CONTENT_STANDARDS.md`

## Key Commands
npm run dev          # Start dev server
npm run build        # Build (verify page count)
npm run typecheck    # TypeScript check
npm run lint         # ESLint
npm run check:crisis # Crisis numbers present
npm run check:phrases # Forbidden phrases check

## Key Gaps (as of 2026-04-13)
- 119 of 145 source arrays are empty — critical backfill needed
- No JSON-LD structured data on any pages
- Search is a visual placeholder — not functional
- Analytics not yet deployed (Plausible ready, needs production env)
- Accessibility needs screen reader testing
```

---

## 1.3 — TASKS.md Creation

### Create:

**`TASKS.md`**
```markdown
# Body Signals — Task Tracker

## Active
- [ ] Source citation backfill — 119/145 arrays empty. Priority: critical safety claims, A/B-rated interventions, mental health conditions. Target: 40+ real PubMed/DOI citations.
- [ ] JSON-LD structured data — MedicalCondition, MedicalSignOrSymptom, MedicalTherapy, BreadcrumbList on all health pages.
- [ ] Functional search — client-side search index over 450+ pages (Fuse.js or similar).
- [ ] Accessibility audit — screen reader testing (VoiceOver, NVDA), focus-visible styles, full ARIA coverage.
- [ ] Analytics deployment — Plausible script ready, needs production environment + domain verification.

## Completed
- [x] Phase A: Legal Language Audit (6 legal pages, research-digest framing, evidence badge links, source rendering)
- [x] Phase B: Referral Scaffolding (10 partners, /disclosures, editorial firewall, placement mapping)

## Deferred
- Phase C: Content licensing infrastructure (content manifest, licensing page)
- Phase C.P: Provider directory (freemium listings, Psychology Today playbook)
- Phase D: AI layer (architecture document only)

## Content Gaps
- Sleep apnoea condition page (linked from mouth-tape intervention)
- Autoimmune conditions expansion
- Dermatological conditions
- Paediatric conditions (requires subject-matter review)

Last updated: 2026-04-13
```

---

## 1.4 — Directive Language Cleanup

Scan `lib/data/` for the 3 remaining instances of directive language and replace with descriptive framing:

```bash
rg -n -i "you should|we recommend|you must|you need to" lib/data/
```

For each hit, replace per brand voice rules:
- "You should prioritize..." → "Some people find it helpful to prioritize..."
- "We recommend..." → "Research suggests..." (with citation if available)
- "You must..." → "It is important to..." or rephrase as a protocol step

### Verification:
- `rg -i "you should|we recommend|you must|you need to" lib/data/` returns 0 hits
- `npm run check:phrases` passes
- `npm run typecheck && npm run lint && npm run build` all pass

---

## Session 1 Gate

- [ ] Plausible analytics script in `app/layout.tsx` (production-only)
- [ ] `lib/analytics/plausible.ts` exists with typed custom events
- [ ] Privacy page names Plausible and links to data policy
- [ ] `CLAUDE.md` exists at project root with current state
- [ ] `TASKS.md` exists at project root with active/completed/deferred items
- [ ] Directive language grep returns 0 hits across `lib/data/`
- [ ] Deploy checklist updated with analytics verification steps
- [ ] Runbook updated with analytics monitoring section
- [ ] `npm run typecheck && npm run lint && npm run build` all pass
- [ ] No new pages created (this session is infrastructure-only)
