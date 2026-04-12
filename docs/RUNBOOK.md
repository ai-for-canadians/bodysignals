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

## 8. Review Schedule

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
