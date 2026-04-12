# Body Signals — Testing Strategy

**Last reviewed:** 2026-04-11

This document defines the testing strategy for Body Signals. **Phase 4 ships this strategy document only — Playwright is not installed.** Implementation is tracked in `TASKS.md`.

---

## What We Test

### 1. Smoke Tests (113 pages)

Every statically-generated page must:
- Return HTTP 200
- Contain an `<h1>` element
- Contain a disclaimer block (verify via `data-testid="disclaimer"` or text match)

**Implementation:** Playwright `test.describe.parallel` iterating over all routes from the build output.

### 2. Crisis-Contacts Regression

Every mental health and ADHD page must contain in its rendered HTML:
- `988` (Suicide & Crisis Lifeline)
- Either `741741` (US Crisis Text Line) or `686868` (Canada Kids Help Phone)

**Note:** `npm run check:crisis` catches this at the source level (`lib/data/*.ts`). Playwright catches render regressions — a UI refactor that accidentally hides the disclaimer text would pass CI but fail Playwright.

### 3. Internal Link Hygiene

No internal links (`<a href="/">`, `<Link href="/">`) should return 404. Crawler-style test that follows all internal links from the home page.

### 4. Meta Description Length

All `<meta name="description">` tags must be ≤160 characters. Caught at build time by the meta audit script; Playwright provides a rendered-HTML safety net.

---

## What We Do NOT Test

| Category | Reason |
|---|---|
| Unit tests | Zero business logic on a static content site. All "logic" is `generateStaticParams` and data lookups — tested implicitly by the build. |
| Visual regression | No design system changes are expected without a dedicated design phase. Overkill for a 113-page static site. |
| API integration tests | No API endpoints (Formspree is fire-and-forget from the client). |
| Performance benchmarks | Not launch-blocking. Lighthouse audits can be run manually. |

---

## CI Integration

### Current (Phase 4)

```yaml
# .github/workflows/ci.yml
- Typecheck (npm run typecheck)
- Lint (npm run lint)
- Crisis-line regression (npm run check:crisis)
- Build (npm run build)
```

### Future (Phase 5, after Playwright install)

```yaml
# .github/workflows/ci.yml — additional steps
- Start dev server (npm run start &)
- Wait for server ready
- Run Playwright smoke tests
- Run Playwright crisis-contact tests
- Run Playwright link audit
```

---

## Manual Spot Checks (Pre-Deploy)

These are documented in `docs/DEPLOY_CHECKLIST.md` and should be run on `npm run dev` before every deploy:

1. `/providers` — 4 cards, both CA and US coverage rows.
2. `/symptoms/[any-slug]` — disclaimer block visible.
3. `/conditions/depression` — MH disclaimer with 988, 741741, 686868, Kids Help Phone, LGBT Youth Line, Trevor Project.
4. `/topics/adhd` — meta description references "Canadian and US".
5. `/topics/sleep/mouth-tape` — red-tone OSA warning callout ABOVE description; contraindications include screening language.
6. Any page — FeedbackWidget button visible; opens; either POSTs to Formspree or shows "launching soon" fallback.
7. `/contact` — renders, corrections email visible.
8. Trigger a runtime error — `app/error.tsx` renders.
9. Visit `/nonexistent-slug` — `app/not-found.tsx` renders.
