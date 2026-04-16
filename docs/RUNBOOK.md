# Body Signals — Operational Runbook

**Last reviewed:** 2026-04-11

---

## 1. Content Update

Adding a new condition, sleep intervention, ADHD system, or movement program.

### Procedure

1. Add the entry to the corresponding file in `lib/data/`.
2. Ensure it carries:
   - A valid `EvidenceRating` (A/B/C/D/F)
   - A `lastUpdated` date
   - A `disclaimer` (STANDARD, MH, SLEEP, ADHD, or MOVEMENT variant)
   - Cited sources in the `sources[]` array where applicable
3. Run the pre-commit gate:
   ```bash
   npm run typecheck && npm run lint && npm run build && npm run check:crisis
   ```
4. Run the expanded variant grep:
   ```bash
   rg -i "(studies?|research|evidence|experts?) (show|suggest|indicate|agree|demonstrate)" lib/data/
   ```
   Expect 0 hits.
5. Verify Canadian spelling (`colour`, `behaviour`, `centre`, `practise`, `minimise`, `stabilise`).
6. Verify the page renders correctly on `npm run dev`.
7. Commit with a descriptive message. Include `Co-Authored-By` if AI-assisted.

---

## 2. Correction / Takedown

Handling user-reported content errors via `corrections@bodysignals.org`.

### SLA

- **Medical-content corrections:** 48 hours from receipt to resolution.
- **General feedback / suggestions:** reviewed weekly.

### Procedure

1. Acknowledge receipt within 24 hours.
2. Review the reported issue:
   - If a factual error: verify against primary sources, correct, and commit.
   - If a citation issue: verify DOI/URL resolves, update or remove.
   - If a safety concern: escalate immediately (see Section 4).
3. Commit with label convention: `fix: correct [description] in [file]`.
4. Deploy via Vercel auto-deploy on push to `main`.
5. Reply to the reporter confirming the correction with the page URL.

---

## 3. Incident Response

Handling production errors or outages.

### Detection

- Vercel dashboard: check deployment status and error logs.
- Manual spot-check: load 5 random pages and verify rendering.

### Rollback

1. **If traffic errors >1% in first hour:**
   ```bash
   vercel rollback <previous-deployment-url>
   ```
   Target: <5 minutes from detection.

2. **If content error surfaces:**
   ```bash
   git revert <offending-commit-sha>
   git push
   ```
   Vercel auto-redeploys. Target: <10 minutes from detection.

3. **If CI fails post-deploy:**
   Create a hotfix branch off `main`, minimum edit, merge fast-forward, redeploy.

---

## 4. Crisis-Content Escalation

Handling a challenged mental health claim or crisis-resource error.

### Triggers

- User reports that a crisis number is wrong, out of service, or jurisdiction-incorrect.
- User reports that a mental health claim is harmful or dangerously misleading.
- A crisis-line organisation changes their number or service.

### Procedure

1. **Immediately** verify the reported issue against the official crisis-line website.
2. If confirmed wrong: **fix immediately** — do not wait for the 48-hour SLA.
3. Update the affected disclaimer(s) in `lib/data/conditions.ts` and/or `lib/data/adhd.ts`.
4. Run `npm run check:crisis` to verify the fix passes CI.
5. Commit with label: `fix: correct crisis resource — [description]`.
6. Deploy immediately.
7. Update `docs/CONTENT_STANDARDS.md` crisis-resources table if the canonical number changed.

### Fallback copy

If a crisis resource becomes unavailable and no replacement is confirmed:
```
If you are in crisis and need immediate support, call 911 or go to your nearest emergency department.
```

---

## 5. Dependency Update Cadence

### Pinned versions

- **Next.js 14** / **React 18** / **Tailwind CSS 3** — pinned. Do not jump major versions mid-content-cycle.
- `packageManager: "npm@10.9.0"` — prevents Corepack from auto-loading pnpm.

### Quarterly review

Every 3 months:

1. Run `npm audit` and review vulnerabilities.
2. Update patch/minor versions for security fixes.
3. Do NOT upgrade major versions without a dedicated migration plan.
4. Commit any lockfile changes: `chore: quarterly dependency update`.

### Historical context

The `packageManager` field in `package.json` was added to fix a Vercel/Corepack `ERR_INVALID_THIS` bug where Corepack auto-loaded pnpm despite the project using npm. If this field is removed, the Vercel build may break. See commit `7218212`.

---

## 6. Sources Backfill Procedure

Many condition, sleep, and ADHD records have empty `sources[]` arrays. The target is to backfill these by 2026-06-30.

### Pattern (from `lib/data/movement.ts`)

```typescript
sources: [
  {
    title: 'Study or guideline title',
    url: 'https://doi.org/...',
    type: 'study',     // 'study' | 'guideline' | 'review' | 'medical_guideline' | 'organization' | 'journal'
    year: 2022,
    authors: 'Last F, Last F, Last F, et al.',
  },
],
```

### Procedure

1. Identify the claim the source supports.
2. Find the primary source (prefer peer-reviewed > guideline > review).
3. Verify the DOI or URL resolves.
4. Add to the `sources[]` array with all fields populated.
5. Run typecheck to verify the `Source` type is satisfied.

### Progress tracking

```bash
rg -c "sources: \[\]" lib/data/conditions.ts lib/data/sleep.ts lib/data/adhd.ts
```

---

## 7. Vercel / Corepack Troubleshooting

### Symptom

Vercel build fails with `ERR_INVALID_THIS` or loads the wrong package manager.

### Fix

Ensure `package.json` contains:
```json
{
  "packageManager": "npm@10.9.0"
}
```

This tells Corepack to use npm explicitly. Verify:
- `package-lock.json` is committed (not `pnpm-lock.yaml`).
- No `.npmrc` or `pnpm-workspace.yaml` exists in the repo root.
- Vercel build log shows `Using npm@10.x.x`.

If the fix above doesn't work, add `vercel.json`:
```json
{
  "installCommand": "npm ci"
}
```

---

## 8. Handling Corrections

When a content error is confirmed and corrected, it must be logged in the corrections system.

### Procedure

1. Fix the error in the relevant `lib/data/*.ts` file.
2. Add a `CorrectionEntry` to `lib/data/corrections.ts`:
   ```typescript
   {
     id: 'correction-YYYY-MM-DD-slug',
     date: '2026-04-13',
     pageSlug: 'conditions/depression',
     pageTitle: 'Depression',
     originalText: 'The incorrect claim...',
     correctedText: 'The corrected claim...',
     reason: 'Source updated; original citation retracted',
     severity: 'moderate',
   }
   ```
3. Run `npm run typecheck && npm run build`.
4. Commit with message format: `fix: correct [description] — logged in corrections`.
5. Deploy. The `/corrections` page will automatically render the new entry.

### Severity guide

| Severity | Criteria |
|---|---|
| minor | Spelling, formatting, non-clinical factual error |
| moderate | Evidence rating change, source update, clinical nuance correction |
| significant | Safety-relevant correction, crisis resource error, withdrawn claim |

---

## 9. Handling Editorial Firewall Events

If a situation arises where commercial considerations conflict with editorial integrity (e.g., a referral partner's evidence quality drops, or a conflict of interest is identified):

### Procedure

1. Document the event in `lib/data/corrections.ts` as a `FirewallEvent`.
2. Take the editorially correct action (demote, remove, or update the content).
3. Update the `/disclosures` page if applicable.
4. Commit with message format: `editorial: firewall event — [description]`.
5. Update the "editorial firewall test count" on the `/disclosures` page.

---

## 10. Legal Audit Launch Gate

Before the site goes live, verify all of the following:

- [ ] "Research digest" framing appears in Hero, About, Footer, Disclaimer, CLAUDE.md, README.md
- [ ] All 6 legal pages exist and render: /terms, /privacy, /disclaimer, /editorial, /corrections, /methodology
- [ ] Footer links to all 6 legal pages
- [ ] Evidence badges link to /methodology
- [ ] Sources visible on condition and symptom detail pages (SourceList component)
- [ ] Persistent ResearchDigestBanner on all detail pages
- [ ] `rg -i "medical site" .` → 0 hits
- [ ] `rg -i "health advice" .` → 0 hits in source code
- [ ] `rg -i "we recommend" app/ components/ lib/data/` → 0 hits
- [ ] `npm run typecheck && npm run lint && npm run build` → zero errors
- [ ] Sitemap includes all routes (legal, conditions, topics, providers)
- [ ] Crisis numbers verified on MH and ADHD pages

---

## 11. Managing Referral Partnerships

### Adding a partner

1. Add a new entry to `lib/data/referrals.ts` with `active: false` and `commercialRelationship: 'no_commercial_relationship'`.
2. Populate all fields: id, name, slug, type, jurisdiction, category, description, url.
3. Set `lastReviewed` to today's date.
4. Run `npm run typecheck && npm run build`.
5. Commit with: `feat: add referral partner — [partner name] (inactive)`.

### Activating a partner

1. In `lib/data/referrals.ts`, set `active: true`.
2. Update `commercialRelationship` to `'affiliate'` or `'sponsored'` as applicable.
3. Add or update `disclosureText` if the partner has specific disclosure requirements.
4. Update `lastReviewed` to today's date.
5. Verify `/disclosures` renders the partner in the commercial relationships table.
6. Run the partner ID grep check (see Section 12 below).
7. Commit with: `feat: activate referral partner — [partner name]`.

### Deactivating a partner

1. In `lib/data/referrals.ts`, set `active: false`.
2. The ReferralCTA component will automatically switch to fallback rendering.
3. Consider whether to also reset `commercialRelationship` to `'no_commercial_relationship'`.
4. Update `lastReviewed` to today's date.
5. Commit with: `feat: deactivate referral partner — [partner name]`.

### Quarterly partner review

Every 3 months, review all entries in `lib/data/referrals.ts`:

1. Verify each partner URL still resolves.
2. Check for regulatory actions, FTC/Competition Bureau complaints, or data breaches.
3. Update `lastReviewed` dates.
4. If a partner's evidence quality or trustworthiness has degraded, deactivate and log a firewall event (see Section 9).

### Handling a partner compliance issue

1. Immediately set `active: false` for the affected partner.
2. Log a `FirewallEvent` in `lib/data/corrections.ts`.
3. Update `/disclosures` page if the partner was commercially active.
4. Follow the editorial firewall procedure in Section 9.

### Removing a partner entirely

1. Remove the entry from `lib/data/referrals.ts`.
2. Remove any slug-specific placement overrides in `lib/data/referral-placements.ts`.
3. Run `npm run typecheck && npm run build`.
4. Commit with: `feat: remove referral partner — [partner name]`.

---

## 12. Referral Infrastructure Verification

### Partner ID grep check

No partner ID should appear in any page file (only in `lib/data/referrals.ts`, `lib/data/referral-placements.ts`, and `app/disclosures/page.tsx`):

```bash
rg -l "maple|betterhelp|sesame-care|felix-health|lifelabs|dynacare|rocket-doctor|tia-health|jane-app" app/ --glob '!app/disclosures/'
```

**Expected result:** zero hits.

Update this grep pattern whenever a new partner is added.

---

## 13. Analytics

### Vendor

Plausible Analytics — privacy-respecting, no cookies, GDPR/PIPEDA/CCPA compliant by default.

- **Dashboard:** `https://plausible.io/bodysignals.org`
- **Script:** loaded in `app/layout.tsx`, production-only (`NODE_ENV === 'production'`)
- **Event helper:** `lib/analytics/plausible.ts` — typed custom events

### Weekly Metrics Review

Check the Plausible dashboard weekly for:

- Unique visitors and pageviews
- Bounce rate (target: <60% on detail pages)
- Top pages (identify high-traffic content for priority source backfill)
- Top sources (organic search share target: 70%)
- Top countries (verify CA/US split matches audience assumptions)

### Monetization Gate Tracking

Document current MAU monthly and compare against thresholds:

| Gate | Threshold | Status |
|---|---|---|
| Path 1: Affiliate partnerships | 50K MAU | Not reached |
| Path 2: Provider directory | 100K MAU | Not reached |
| Organic search share | 70% of traffic | Pending measurement |
| Detail page bounce rate | <60% | Pending measurement |
| Return visitor rate | 20%+ | Pending measurement |

### Custom Events

| Event | Trigger | Purpose |
|---|---|---|
| `Referral CTA Clicked` | User clicks a referral CTA | Track affiliate readiness |
| `Feedback Submitted` | User submits feedback form | Measure engagement |
| `Search Used` | User performs a search | Validate search feature usage |
| `Source Link Clicked` | User clicks a citation link | Track source engagement |
| `Evidence Badge Clicked` | User clicks an evidence badge | Track methodology interest |
| `External Link Clicked` | User clicks an external link | Track outbound traffic |

Custom events are not yet wired to UI components — `trackEvent()` in `lib/analytics/plausible.ts` is ready to call from client components when needed.

---

## 14. Error Monitoring

**Status:** Deliberately deferred (as of 2026-04-15).

**Rationale:** Body Signals is a statically generated site with minimal client-side JavaScript (search dialog is the only significant interactive component). Runtime errors are rare in this architecture. Current monitoring relies on:

- **Plausible Analytics** — drop in pageviews signals site-level issues
- **FeedbackWidget** — users can report broken pages or missing content
- **Build-time checks** — TypeScript strict mode, ESLint, forbidden-phrase greps, search index build guard

**Revisit when:** Dynamic features are added (provider directory, AI layer, server-side API routes). At that point, integrate Sentry (free tier: 5K errors/month) with `tracesSampleRate: 0.1` to stay within limits.

---

## 15. Review Schedule

| Document | Cadence | Next review |
|---|---|---|
| `docs/RISK_ASSESSMENT.md` | Quarterly | 2026-07-11 |
| `docs/COMPLIANCE.md` | Quarterly | 2026-07-11 |
| `docs/BRAND_VOICE.md` | On material content change | — |
| `docs/COMPETITIVE_BRIEF.md` | Quarterly | 2026-07-11 |
| `docs/RUNBOOK.md` (this file) | Quarterly | 2026-07-11 |
| `docs/TESTING_STRATEGY.md` | On test infrastructure change | — |
| `docs/DEPLOY_CHECKLIST.md` | Pre-deploy | Every deploy |
| `TASKS.md` | Ongoing | — |
| Plausible Analytics dashboard | Weekly | Ongoing |
| Monetization gate thresholds | Monthly | Ongoing |
