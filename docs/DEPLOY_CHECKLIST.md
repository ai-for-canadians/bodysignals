# Body Signals — Deploy Checklist

Run every item before `vercel deploy` (or before merging to `main` if auto-deploy is enabled).

---

## Pre-Flight Gates

All must be green:

- [ ] `npm run typecheck` — zero errors
- [ ] `npm run lint` — zero warnings or errors
- [ ] `npm run check:crisis` — crisis numbers present in source
- [ ] `npm run build` — succeeds with **113 pages** (or current expected count)

### Content Regression Checks

- [ ] Expanded variant grep returns 0 hits:
  ```bash
  rg -i "(studies?|research|evidence|experts?) (show|suggest|indicate|agree|demonstrate)" lib/data/
  ```
- [ ] No unintentional console output:
  ```bash
  rg -n "console\.(log|error|warn)" components/ app/
  ```
  (Expect 0 hits, or marked with `// eslint-disable` or `// TODO`)

- [ ] Meta descriptions all ≤160 chars (run the audit script from Phase 4)

### Crisis-Line Verification

- [ ] `rg -n "988" lib/data/` returns ≥3 hits
- [ ] `rg -n "741741" lib/data/` returns ≥2 hits (MH + ADHD, US label)
- [ ] `rg -n "686868" lib/data/` returns ≥2 hits (MH + ADHD, Canada label)
- [ ] `rg -n "LGBT Youth Line" lib/data/` returns ≥1 hit
- [ ] `rg -n "Trevor Project" lib/data/` returns ≥1 hit

### Symptom Disclaimer

- [ ] `rg -n -i "disclaimer" "app/symptoms/[slug]/page.tsx"` returns ≥1 hit

### Error/404 Boundaries

- [ ] `ls app/error.tsx app/global-error.tsx app/not-found.tsx` — all exist

### Infrastructure

- [ ] `package.json` contains `"packageManager": "npm@..."` field
- [ ] `package-lock.json` is committed (not `pnpm-lock.yaml`)

### Content Spot Checks (on `npm run dev`)

- [ ] `/providers` — 4 cards, both CA and US coverage rows, Medicare Part B precision on psychiatrist
- [ ] `/symptoms/[any-slug]` — disclaimer block visible in sidebar
- [ ] `/conditions/depression` — MH disclaimer mentions 988, 741741 (US), 686868 (Canada), Kids Help Phone, LGBT Youth Line, Trevor Project
- [ ] `/topics/adhd` — meta references "Canadian and US"
- [ ] `/topics/sleep/mouth-tape` — red-tone OSA warning callout ABOVE description; contraindications include screening language; link to `/symptoms/shortness-of-breath` works
- [ ] Any page — FeedbackWidget button visible; opens; either POSTs to Formspree or shows "launching soon" — NOT silently logging
- [ ] `/contact` — renders, corrections email visible
- [ ] Footer — "Contact / Corrections" link present and working
- [ ] Trigger a runtime error — `app/error.tsx` renders themed fallback
- [ ] Visit `/nonexistent-slug` — `app/not-found.tsx` renders themed 404

### Documentation

- [ ] All docs present:
  - `docs/RISK_ASSESSMENT.md`
  - `docs/COMPLIANCE.md`
  - `docs/BRAND_VOICE.md`
  - `docs/COMPETITIVE_BRIEF.md`
  - `docs/RUNBOOK.md`
  - `docs/TESTING_STRATEGY.md`
  - `docs/DEPLOY_CHECKLIST.md`
  - `TASKS.md`

### CI

- [ ] CI green on the current branch/commit

---

## Launch-Day Gates

(First production deploy only — skip on subsequent deploys)

- [ ] DNS cutover: `bodysignals.org` → Vercel, SSL cert active, HSTS header verified
- [ ] Analytics installed and verified (Plausible or Fathom — log one test event before opening traffic)
- [ ] `NEXT_PUBLIC_FEEDBACK_FORM_ID` env var set in Vercel project settings (if Formspree path taken)
- [ ] Submit one test feedback from production to confirm Formspree endpoint works end-to-end
- [ ] Social preview / OG image renders correctly on Facebook debugger + Twitter card validator

---

## Rollback Plan

### Deployment Error (traffic errors >1%)

```bash
vercel rollback <previous-deployment-url>
```
Target: <5 minutes from detection.

### Content Error

```bash
git revert <offending-commit-sha>
git push
```
Vercel auto-redeploys. Target: <10 minutes from detection.

### CI Failure Post-Deploy

Create a hotfix branch off `main`, minimum edit, merge fast-forward, redeploy. Do not force-push to `main`.

---

## Environment Variables

| Variable | Required | Where | Purpose |
|---|---|---|---|
| `NEXT_PUBLIC_FEEDBACK_FORM_ID` | No | Vercel project settings | Formspree form ID (e.g., `xyzabc12`). If not set, FeedbackWidget shows "launching soon" fallback. |

No other environment variables are required — all content is compiled at build time.
