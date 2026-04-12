# Body Signals — Task Backlog

Phase 5 and ongoing tasks, grouped by bucket. Each carries a size estimate (S/M/L) and target date where applicable.

---

## Content

### [L] Sources Backfill — Target: 2026-06-30
Many condition, sleep, and ADHD records have empty `sources[]` arrays (~60 records). Each record needs at least one primary source with a verified DOI/URL. Procedure documented in `docs/RUNBOOK.md` Section 6.

**Track progress:**
```bash
rg -c "sources: \[\]" lib/data/conditions.ts lib/data/sleep.ts lib/data/adhd.ts
```

### [M] Condition Gap: Sleep Apnoea
The mouth-tape intervention links to `/symptoms/shortness-of-breath` as a fallback because `/conditions/sleep-apnea` does not exist. A full condition page should include: definition, risk factors, diagnosis (home sleep study, polysomnography), treatment (CPAP, oral appliance, positional therapy, weight management), and red flags. This is high priority given the mouth-tape safety mitigation depends on it.

### [L] Voice Audit Pass
If the decision is made to normalise the clinical vs tactical voice split (currently documented in `docs/BRAND_VOICE.md` but not enforced), this would involve reviewing and potentially rewriting 27 condition descriptions. Deferred — codification was chosen over normalisation in Phase 4.

### [S] Variant "Studies Show" Fixes
If the expanded grep (`rg -i "(studies?|research|evidence|experts?) (show|suggest|indicate|agree|demonstrate)" lib/data/`) finds any hits beyond the two fixed in Phase 4, fix them. Currently returns 0 hits.

### [L] New Condition Categories
Potential additions: autoimmune (lupus, rheumatoid arthritis), dermatological (eczema, psoriasis), paediatric. Each requires subject-matter review and evidence grading.

---

## Engineering

### [M] Sidebar Extraction
Four detail pages (`app/conditions/[slug]/page.tsx`, `app/symptoms/[slug]/page.tsx`, `app/topics/sleep/[slug]/page.tsx`, `app/topics/adhd/[slug]/page.tsx`) each render a sidebar with a "Quick Facts" card and a "Medical Disclaimer" card. Extract into `components/detail/DetailSidebar.tsx` to reduce duplication. Refactor, not launch-blocking.

### [S] FeedbackWidget: Formspree to Custom Endpoint
If Formspree free tier (50 submissions/month) becomes insufficient, migrate to a custom endpoint (e.g., Next.js API route with email forwarding, or a serverless function). The widget already supports a custom `onSubmit` handler.

### [M] Playwright Smoke Tests
Implement the testing strategy from `docs/TESTING_STRATEGY.md`. Covers 113-page smoke tests (assert 200, `<h1>`, disclaimer), crisis-contacts regression in rendered HTML, and internal link hygiene.

### [S] Tighten Safety System
Audit all `urgency: 'emergency'` symptoms to ensure each has a 911 callout in the red-flags section. If any are missing, add them. Currently verified by manual spot-check; Playwright tests would automate this.

### [S] Focus-Visible Styles Audit
Audit all interactive elements for visible focus indicators. Currently using browser defaults; should be upgraded to a custom focus ring (e.g., `focus-visible:ring-2 focus-visible:ring-amber-500`) for WCAG 2.1 AA compliance.

---

## Operations

### Quarterly: Dependency Review + npm Audit
Every 3 months: `npm audit`, update patch/minor for security. Do not jump major versions (Next 14 → 15, React 18 → 19, Tailwind 3 → 4) without a dedicated migration plan. Next review: 2026-07-11.

### Quarterly: RISK_ASSESSMENT + COMPLIANCE Review
Review `docs/RISK_ASSESSMENT.md` and `docs/COMPLIANCE.md`. Update if scope has changed (new data collection, new jurisdiction, new content category). Next review: 2026-07-11.

---

## Growth

### [M] SEO Audit — Phase 5
Full SEO audit per user decision. Deferred from Phase 4.

### [L] Provider Directory — Q2 2026
Expand the `/providers` page into a full searchable directory with decision trees, sample questions, and expanded coverage details. Currently a static comparison of 4 provider types.

### [S] Analytics Installation
Install Plausible or Fathom analytics (privacy-respecting, no cookie banner needed). Verify with a test event before opening traffic. Documented in `docs/DEPLOY_CHECKLIST.md` launch-day gates.
