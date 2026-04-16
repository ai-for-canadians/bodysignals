# Body Signals — Task Tracker

## Active
- [ ] Analytics deployment — Plausible script ready in `app/layout.tsx`, needs production environment + domain verification.
- [ ] Playwright smoke tests — 120-page smoke tests (assert 200, `<h1>`, disclaimer), crisis-contacts regression, internal link hygiene. Strategy in `docs/TESTING_STRATEGY.md`.
- [ ] Sidebar extraction — 4 detail pages duplicate Quick Facts + Medical Disclaimer sidebar. Extract to `components/detail/DetailSidebar.tsx`.

## Completed
- [x] Phase A: Legal Language Audit (6 legal pages, research-digest framing, evidence badge links, source rendering)
- [x] Phase B: Referral Scaffolding (9 partners, /disclosures, editorial firewall, placement mapping)
- [x] Session 1: Analytics + Project Docs + Directive Language Cleanup
- [x] Session 2: Source Citation Backfill — 120/120 source arrays populated with verified PubMed citations. Fixed incorrect lactose PMID.
- [x] Session 3: JSON-LD Structured Data + Evidence Tier Consolidation — MedicalCondition, MedicalSignOrSymptom, MedicalTherapy, ExercisePlan, FAQPage, MedicalWebPage, BreadcrumbList on all health pages. Evidence tier consolidation (Badge.tsx hardcoded config removed). Domain fix (.ca → .org in sitemap/robots).
- [x] Session 4: Functional Search + Accessibility Hardening — Fuse.js client-side search (97-entry build-time index, Cmd+K dialog, analytics wiring, empty-state UX). WCAG 2.1 AA: skip-nav, focus-visible, prefers-reduced-motion, ARIA on Header/Badge, `<article>` + `aria-hidden` on 5 detail pages.
- [x] Session 5: Launch Hardening — OG/Twitter Card metadata on layout + 5 detail pages. Favicon/icon suite (512, 192, 180, 32 ICO) + OG image (1200×630, 55KB) via sharp. Web manifest (standalone PWA). Viewport export for themeColor. Error monitoring deliberately deferred (documented in RUNBOOK.md §14). All verification checks pass (typecheck, lint, build, crisis, forbidden phrases, partner isolation).

## Deferred
- Phase C: Content licensing infrastructure (content manifest, licensing page)
- Phase C.P: Provider directory (freemium listings, Psychology Today playbook)
- Phase D: AI layer (architecture document only)
- Dynamic per-page OG images via Next.js `opengraph-image.tsx` route handlers (Phase 2 OG enhancement)

## Content Gaps
- Sleep apnoea condition page (linked from mouth-tape intervention — high priority)
- Autoimmune conditions expansion (lupus, rheumatoid arthritis)
- Dermatological conditions (eczema, psoriasis)
- Paediatric conditions (requires subject-matter review)

Last updated: 2026-04-15
