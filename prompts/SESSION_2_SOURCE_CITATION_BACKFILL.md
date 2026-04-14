# Session 2: Source Citation Backfill (Real PubMed/DOI Citations)

## Why This Is Second

Body Signals' core brand promise is evidence transparency. 82% of source arrays (119/145) are empty. Every A-F evidence grade on the site is an unsupported editorial assertion until there's a citation backing it. This is the single highest-leverage improvement for credibility, liability reduction, and B2B licensing readiness.

**Estimated scope:** Modify 4-6 data files. No new components or pages. Heavy research, light code.

## Context

Body Signals has 450+ pages across conditions, symptoms, sleep interventions, ADHD systems, and movement programs. The `Source` interface is already defined in `types/index.ts`:

```typescript
interface Source {
  title: string;
  url: string;
  type: 'medical_guideline' | 'study' | 'review' | 'organization' | 'journal';
  year?: number;
  authors?: string;
}
```

The `SourceList` component at `components/shared/SourceList.tsx` already renders these arrays on detail pages. The only problem is that most arrays are empty.

26 entries are already populated (Type 2 Diabetes, PCOS, Hypertension, and some sleep interventions have 3-5 real citations each). These are the quality bar — match their format.

## Priority Tiers

### Tier 1: CRITICAL (do these first — safety/liability)

These entries contain safety warnings, contraindications, or drug interaction claims that MUST have citations:

**Sleep interventions with safety profiles** (`lib/data/sleep.ts`):
- Melatonin — dosage claims, drug interactions, contraindications
- Magnesium — dosage, drug interactions
- Valerian — drug interactions, liver toxicity warnings
- L-Theanine — safety claims
- Mouth tape — already partially sourced, verify OSA warnings have citations
- Any supplement with contraindications or "moderate"/"high" risk level

**Conditions with medication interventions** (`lib/data/conditions.ts`):
- Depression — SSRI references, therapy efficacy claims
- Anxiety — benzodiazepine/SSRI references
- Any condition where `intervention.category === 'medication'` and `intervention.sources` is empty

Target: 15-20 citations for Tier 1.

### Tier 2: HIGH (do these second — credibility for strongest claims)

These are A or B rated entries — the strongest evidence claims need the strongest citation backing:

**All A-rated interventions** — search across all data files for `evidenceRating: 'A'` and ensure each has at least 2 sources (one systematic review or meta-analysis, one guideline).

**All B-rated interventions** — ensure each has at least 1 source.

**Mental health conditions** (`lib/data/conditions.ts`, category: 'mental-health'):
- Depression, Anxiety, Bipolar, PTSD, OCD, Eating Disorders
- These carry the highest reader vulnerability and the most scrutiny

Target: 15-20 citations for Tier 2.

### Tier 3: MEDIUM (stretch goal — do if time allows)

**C-rated interventions with numeric claims** — any intervention that cites a specific number (percentage improvement, dosage, duration) needs a source for that number.

**ADHD systems** (`lib/data/adhd.ts`) — the B-rated systems that "map to studied interventions" (per the `ratingNote` field) should cite the underlying study.

Target: 10 citations for Tier 3.

## Source Quality Requirements

Every citation must be a **real, verifiable source**. Use these in order of preference:

1. **PubMed URLs** — `https://pubmed.ncbi.nlm.nih.gov/PMID/` (preferred for studies and reviews)
2. **DOI URLs** — `https://doi.org/10.xxxx/xxxxx` (preferred for journal articles)
3. **Medical guidelines** — direct URLs to guideline PDFs or landing pages (ADA, ACC/AHA, CPA, Health Canada, NICE, WHO)
4. **Cochrane Reviews** — `https://www.cochranelibrary.com/cdsr/doi/...`
5. **Organisation pages** — CDC, NIH, CAMH, Mayo Clinic clinical references

**Do NOT use:**
- Wikipedia
- WebMD, Healthline, or other consumer health sites
- News articles about studies (link to the study itself)
- Retracted papers
- Preprints (unless no peer-reviewed alternative exists and noted as such)

## Citation Format

Match the existing format used in the 26 populated entries:

```typescript
sources: [
  {
    title: 'Melatonin for the prevention and treatment of jet lag',
    url: 'https://pubmed.ncbi.nlm.nih.gov/12076414/',
    type: 'review',
    year: 2002,
    authors: 'Herxheimer A, Petrie KJ'
  },
  {
    title: 'Clinical Practice Guideline for the Treatment of Depression',
    url: 'https://www.apa.org/depression-guideline',
    type: 'medical_guideline',
    year: 2019,
    authors: 'American Psychological Association'
  }
]
```

## Execution Instructions

1. Start with `lib/data/sleep.ts` — scan every entry with a `safetyProfile` that has contraindications or sideEffects. For each one with `sources: []`, search PubMed for the relevant systematic review, meta-analysis, or safety study. Fill the sources array with 2-3 real citations.

2. Move to `lib/data/conditions.ts` — scan entries where `category === 'mental-health'`. For each condition and its interventions with empty sources, find the relevant clinical practice guideline (APA, CPA, NICE) and at least one meta-analysis or landmark RCT.

3. Continue with remaining conditions — prioritise any entry where `evidenceRating === 'A'` or `evidenceRating === 'B'`.

4. Check `lib/data/adhd.ts` for B-rated systems and add their underlying study citations.

5. Check `lib/data/movement.ts` — the `sources` field is optional (`sources?: Source[]`), but the three programs (patellar tendinopathy, low-back McGill Big 3, rotator cuff) are based on named protocols. Add the original research.

## What NOT To Do

- Do NOT change any evidence ratings. The ratings are editorial judgments — this session adds citations, not re-evaluations.
- Do NOT modify any descriptions, protocols, or safety profiles. Content stays the same — only `sources` arrays change.
- Do NOT create placeholder or example citations. Every URL must resolve to a real document.
- Do NOT add sources to entries where no specific claim needs backing (e.g., ADHD tool recommendations for apps are editorial, not research claims).

## Session 2 Gate

- [ ] `rg -c "sources: \[\]" lib/data/` — count should drop from 119 to ≤79 (40+ backfilled)
- [ ] All Tier 1 entries (safety/contraindication claims) have ≥2 citations each
- [ ] All mental health conditions have ≥1 guideline citation
- [ ] All A-rated interventions have ≥2 citations
- [ ] All B-rated interventions have ≥1 citation
- [ ] Every URL in a new citation is a real, resolvable URL (spot-check 10 randomly)
- [ ] No evidence ratings were changed
- [ ] No content text was modified (only `sources` arrays)
- [ ] `npm run typecheck && npm run lint && npm run build` all pass
- [ ] Update `TASKS.md` with new source count: "119/145 → X/145 arrays populated"
- [ ] Update `CLAUDE.md` Key Gaps section with new count
