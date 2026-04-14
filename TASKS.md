# Body Signals — Task Tracker

## Active
- [ ] JSON-LD structured data — MedicalCondition, MedicalSignOrSymptom, MedicalTherapy, BreadcrumbList on all health pages.
- [ ] Functional search — client-side search index over 120+ pages (Fuse.js or similar).
- [ ] Accessibility audit — screen reader testing (VoiceOver, NVDA), focus-visible styles (`focus-visible:ring-2 ring-amber-500`), full ARIA coverage.
- [ ] Analytics deployment — Plausible script ready in `app/layout.tsx`, needs production environment + domain verification.
- [ ] Playwright smoke tests — 120-page smoke tests (assert 200, `<h1>`, disclaimer), crisis-contacts regression, internal link hygiene. Strategy in `docs/TESTING_STRATEGY.md`.
- [ ] Sidebar extraction — 4 detail pages duplicate Quick Facts + Medical Disclaimer sidebar. Extract to `components/detail/DetailSidebar.tsx`.

## Completed
- [x] Phase A: Legal Language Audit (6 legal pages, research-digest framing, evidence badge links, source rendering)
- [x] Phase B: Referral Scaffolding (9 partners, /disclosures, editorial firewall, placement mapping)
- [x] Session 1: Analytics + Project Docs + Directive Language Cleanup
- [x] Session 2: Source Citation Backfill — 120/120 source arrays populated with verified PubMed citations. Fixed incorrect lactose PMID.

## Deferred
- Phase C: Content licensing infrastructure (content manifest, licensing page)
- Phase C.P: Provider directory (freemium listings, Psychology Today playbook)
- Phase D: AI layer (architecture document only)

## Content Gaps
- Sleep apnoea condition page (linked from mouth-tape intervention — high priority)
- Autoimmune conditions expansion (lupus, rheumatoid arthritis)
- Dermatological conditions (eczema, psoriasis)
- Paediatric conditions (requires subject-matter review)

Last updated: 2026-04-14
