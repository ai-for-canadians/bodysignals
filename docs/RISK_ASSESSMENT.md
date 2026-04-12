# Body Signals — Risk Assessment

**Last reviewed:** 2026-04-11
**Next review:** 2026-07-11 (quarterly)
**Scope:** Static, non-interactive, non-personalised medical-information website targeting Canada and the US.

---

## 1. Medical Liability

| Factor | Status | Notes |
|---|---|---|
| Content type | Educational, not advisory | Every page carries a disclaimer; no diagnosis flows. |
| Personalisation | None | No accounts, no symptom checkers, no user-generated content. |
| Crisis resources | Jurisdiction-correct | 988 (CA/US), 741741 (US), 686868 (CA), LGBT Youth Line, Trans Lifeline, Trevor Project. Enforced by CI `check:crisis` script. |
| Disclaimer coverage | Complete | Conditions, sleep, ADHD, movement, and symptoms all carry disclaimers. MH/ADHD disclaimers include crisis contacts. |
| Evidence transparency | A–F rating on all claims | Users see the strength of evidence before acting. |

**Residual risk:** A user ignores the disclaimer and treats the content as medical advice. Mitigated by prominently displaying disclaimers on every content page and including a sitewide disclaimer banner.

---

## 2. Highest Residual Risk: Mouth-Tape Intervention

The mouth-taping entry in `lib/data/sleep.ts` is the single highest-liability record in the dataset. Using mouth tape without first ruling out obstructive sleep apnoea (OSA) can be fatal.

**Mitigations in place:**
- Red-tone warning callout rendered ABOVE the intervention description on `/topics/sleep/mouth-tape`.
- Explicit contraindication: "Untreated obstructive sleep apnoea (OSA) — mouth taping without diagnosis can be fatal."
- Screening language in contraindications: "Do not use without first screening for sleep apnoea — contact a physician for a home sleep study if you snore loudly, wake gasping, or experience daytime sleepiness."
- Risk level set to "moderate" (was "low").
- Link to `/symptoms/shortness-of-breath` which lists sleep apnoea as a possible cause.

**Residual risk:** Users who ignore both the callout and the contraindications. Accepted — no additional reasonable mitigation exists on a static informational site. A `/conditions/sleep-apnea` page is logged as a Phase 5 content gap in `TASKS.md`.

---

## 3. Privacy Exposure

### PIPEDA (Canada)
**Exposure: Near-zero.** The site collects no personal information beyond an optional email field in the FeedbackWidget, which is gated behind an 18+ age confirmation checkbox. No analytics that track individuals. No accounts. No cookies beyond what Next.js sets for static page serving.

### COPPA (US)
**Exposure: Mitigated.** ADHD and mental health pages reference Kids Help Phone (ages 5–29). The FeedbackWidget requires an 18+ confirmation before submission, preventing collection of children's personal information. If a minor checks the box dishonestly, the legal burden shifts to the user's misrepresentation.

### HIPAA
**Not applicable.** Body Signals is not a covered entity, business associate, or health plan. No protected health information (PHI) is collected, stored, or transmitted.

---

## 4. Regulatory Exposure

### FTC / HHS (US)
**Exposure: Near-zero.** No advertising, no affiliate links, no supplement sales, no sponsored content. FTC endorsement guidelines do not apply. No health claims that would trigger FDA enforcement.

### Health Canada
**Exposure: Near-zero.** The site references Health Canada guidelines as one authority source. Body Signals is not a medical device, not regulated software, and does not diagnose or recommend treatments that require Health Canada approval.

### FDA (US)
**Parity framing with Health Canada.** The site references FDA alongside Health Canada. No claims are made that would constitute drug or device marketing.

---

## 5. Disclaimer Sufficiency

| Page type | Disclaimer | Crisis contacts |
|---|---|---|
| Conditions (27) | Per-condition disclaimer (STANDARD or MH variant) | MH conditions include 988 + jurisdiction-correct text lines |
| Sleep interventions (20) | SLEEP_DISCLAIMER | N/A (not mental health) |
| ADHD systems (18) + tools (6) | ADHD_DISCLAIMER | 988 + 741741 (US) + 686868 (CA) |
| Movement programs (3) | MOVEMENT_DISCLAIMER | N/A |
| Symptoms (24) | STANDARD_DISCLAIMER | N/A (physical symptoms) |
| About / Contact | Emergency disclaimer | 988 + 911 |

**Verified:** No content page renders without a disclaimer. The STANDARD_DISCLAIMER stays crisis-free per user decision; only MH_DISCLAIMER and ADHD_DISCLAIMER carry crisis-line additions.

---

## 6. Dependency Supply Chain

**Exposure: Low.** All dependencies are pinned in `package.json` with a committed `package-lock.json`. No runtime data fetching — the entire site is statically generated.

| Mitigation | Status |
|---|---|
| Pinned versions in `package.json` | Yes |
| `package-lock.json` committed | Yes |
| Quarterly `npm audit` | Per runbook |
| `packageManager` field set | Yes (`npm@10.9.0` — prevents Corepack auto-loading pnpm) |
| No user-generated content | N/A — no XSS surface |

**Historical reference:** event-stream (2018), ua-parser-js (2021), colors.js (2022) demonstrate supply-chain risk in the npm ecosystem. Body Signals mitigates this through version pinning and build-time-only dependencies.

---

## 7. Out-of-Scope Risks (none present today)

The following risk categories do **not** apply to Body Signals in its current state. If any are added in the future, this assessment must be updated before launch:

- Third-party embeds or tracking pixels
- User-generated content (comments, forums)
- Personalisation or recommendation engines
- User accounts or authentication
- Payment processing
- Supplement or product sales
- Third-party advertising

---

## 8. Review Cadence

This risk assessment is reviewed **quarterly** or whenever a material change occurs:
- New content category added (e.g., supplements, pediatrics)
- New data collection surface added (e.g., accounts, analytics)
- New third-party integration added
- Regulatory change affecting PIPEDA, COPPA, or health-content liability

**Owner:** Site maintainer. See `docs/RUNBOOK.md` for the review procedure.
