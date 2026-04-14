# Session 3: JSON-LD Structured Data + Evidence Tier Consolidation

## Why This Is Third

Body Signals has 450+ pages but Google can't understand them as medical content. Without Schema.org structured data, you're competing for plain blue links against WebMD and Healthline which have rich results (condition panels, FAQ snippets, medical entity cards). JSON-LD is the difference between ranking and ranking *visibly*. This session also extracts evidence tier definitions into a single source of truth — a prerequisite for Phase C (content manifest) and Phase D (AI layer).

**Estimated scope:** ~3 new files, ~15 modified files. No new pages.

## Context

Body Signals has 148 conditions, 109 symptoms, 58 sleep interventions, 78 ADHD systems, 27 movement programs. All have typed data models in `types/index.ts` with `evidenceRating`, `sources`, `lastUpdated`, and structured metadata. None have JSON-LD output.

Evidence tier descriptions currently exist only as prose text hardcoded on the `/methodology` page and in `EvidenceBadge` tooltip strings. The same information should be importable from one data file.

---

## 3.1 — Evidence Tier Data File (goes first — other steps import from it)

### Create:

**`lib/data/evidence-tiers.ts`**
```typescript
import { EvidenceRating } from '@/types';

export interface EvidenceTier {
  grade: EvidenceRating;
  label: string;                     // "Strong Evidence"
  shortDescription: string;          // One line — tooltips, badges
  fullDescription: string;           // Paragraph — methodology page
  criteria: string[];                // What qualifies for this grade
  colour: string;                    // Tailwind class: "emerald", "green", etc.
  colourClasses: {
    bg: string;                      // "bg-emerald-500"
    text: string;                    // "text-emerald-500"
    border: string;                  // "border-emerald-500"
  };
}

export const EVIDENCE_TIERS: Record<EvidenceRating, EvidenceTier> = {
  A: {
    grade: 'A',
    label: 'Strong Evidence',
    shortDescription: 'Supported by multiple high-quality RCTs or systematic reviews',
    fullDescription: '...', // Pull exact text from current methodology page
    criteria: [
      'Multiple randomised controlled trials with consistent results',
      'At least one high-quality systematic review or meta-analysis',
      'Endorsed by major clinical practice guidelines (APA, ADA, NICE, etc.)',
    ],
    colour: 'emerald',
    colourClasses: { bg: 'bg-emerald-500', text: 'text-emerald-500', border: 'border-emerald-500' },
  },
  // ... B through F following the same pattern
  // Pull exact descriptions from app/methodology/page.tsx
};
```

Read `app/methodology/page.tsx` first to extract the exact current descriptions for each grade. Do not paraphrase — use the existing text verbatim.

### Modify:

**`components/ui/Badge.tsx`** (or wherever EvidenceBadge lives)
- Import `EVIDENCE_TIERS` from `lib/data/evidence-tiers.ts`
- Replace hardcoded colour mapping with `EVIDENCE_TIERS[rating].colourClasses`
- Replace hardcoded tooltip/label text with `EVIDENCE_TIERS[rating].shortDescription`

**`app/methodology/page.tsx`**
- Import `EVIDENCE_TIERS` and render the grade rubric section from it
- Remove hardcoded grade descriptions — generate from `Object.values(EVIDENCE_TIERS)`

**`components/shared/EvidenceScaleLegend.tsx`**
- Import from `evidence-tiers.ts` instead of any hardcoded values
- Render legend items from `Object.values(EVIDENCE_TIERS)`

**Index pages that may have grade legends** (check each — modify only if they hardcode tier info):
- `app/conditions/page.tsx`
- `app/topics/sleep/page.tsx`
- `app/topics/adhd/page.tsx`
- `app/topics/movement/page.tsx`

### Verification:
- `EVIDENCE_TIERS` is the single import for all grade-related display logic
- No hardcoded grade descriptions remain in any component or page
- `npm run typecheck` passes
- Evidence badges render identically to before (visual regression: none)

---

## 3.2 — JSON-LD Utility Functions (parallel with 3.1 if evidence-tiers not needed)

### Create:

**`lib/utils/structured-data.ts`**

Build helper functions that generate JSON-LD objects. Each function takes a typed data object and returns a plain JavaScript object ready for `JSON.stringify()`.

```typescript
import { Condition, Symptom, SleepIntervention, MovementProgram } from '@/types';
import { EVIDENCE_TIERS } from '@/lib/data/evidence-tiers';

// Base page wrapper — every health page gets this
export function medicalWebPageJsonLd(page: {
  title: string;
  description: string;
  url: string;
  dateModified: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    name: page.title,
    description: page.description,
    url: page.url,
    dateModified: page.dateModified,
    publisher: {
      '@type': 'Organization',
      name: 'Body Signals',
      url: 'https://bodysignals.org',
    },
    inLanguage: 'en',
    isAccessibleForFree: true,
    medicalAudience: {
      '@type': 'MedicalAudience',
      audienceType: 'Patient',
    },
  };
}

// Conditions → MedicalCondition
export function conditionJsonLd(condition: Condition, baseUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalCondition',
    name: condition.name,
    description: condition.summary,
    url: `${baseUrl}/conditions/${condition.slug}`,
    // Map condition.symptoms to MedicalSignOrSymptom references
    signOrSymptom: condition.symptoms.map(s => ({
      '@type': 'MedicalSignOrSymptom',
      name: s.name,
      description: s.description,
    })),
    // Map interventions where type maps to Schema.org
    possibleTreatment: condition.interventions.map(i => ({
      '@type': i.category === 'medication' ? 'Drug' : 'MedicalTherapy',
      name: i.name,
      description: i.description,
    })),
  };
}

// Symptoms → MedicalSignOrSymptom
export function symptomJsonLd(symptom: Symptom, baseUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalSignOrSymptom',
    name: symptom.name,
    description: symptom.summary,
    url: `${baseUrl}/symptoms/${symptom.slug}`,
    possibleCause: symptom.relatedConditions.map(rc => ({
      '@type': 'MedicalCondition',
      name: rc.name,
    })),
  };
}

// Sleep interventions → MedicalTherapy
export function sleepInterventionJsonLd(intervention: SleepIntervention, baseUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalTherapy',
    name: intervention.name,
    description: intervention.tagline,
    url: `${baseUrl}/topics/sleep/${intervention.slug}`,
    // Include contraindications if they exist
    ...(intervention.safetyProfile.contraindications.length > 0 && {
      contraindication: intervention.safetyProfile.contraindications.join('; '),
    }),
  };
}

// Breadcrumbs — every page
export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

// Helper to inject into page <head>
export function jsonLdScript(data: Record<string, any>): string {
  return JSON.stringify(data);
}
```

**Important implementation note:** Next.js 14 App Router supports JSON-LD via the `metadata` export or by adding a `<script type="application/ld+json">` tag directly in the page component. Use the direct approach since these are server components:

```tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: jsonLdScript(conditionJsonLd(condition, BASE_URL)) }}
/>
```

---

## 3.3 — Inject JSON-LD into All Health Pages

### Modify every detail page template:

**`app/conditions/[slug]/page.tsx`**
- Add `conditionJsonLd()` + `medicalWebPageJsonLd()` + `breadcrumbJsonLd()`
- Breadcrumb: Home → Conditions → [Category] → [Condition Name]

**`app/symptoms/[slug]/page.tsx`**
- Add `symptomJsonLd()` + `medicalWebPageJsonLd()` + `breadcrumbJsonLd()`
- Breadcrumb: Home → Symptoms → [Symptom Name]

**`app/topics/sleep/[slug]/page.tsx`**
- Add `sleepInterventionJsonLd()` + `medicalWebPageJsonLd()` + `breadcrumbJsonLd()`
- Breadcrumb: Home → Topics → Sleep → [Intervention Name]

**`app/topics/adhd/[slug]/page.tsx`**
- Add `medicalWebPageJsonLd()` + `breadcrumbJsonLd()` (no specific ADHD Schema.org type — use Article with MedicalSpecialty)
- Breadcrumb: Home → Topics → ADHD → [System Name]

**`app/topics/movement/[slug]/page.tsx`**
- Add `medicalWebPageJsonLd()` + `breadcrumbJsonLd()`
- Breadcrumb: Home → Topics → Movement → [Program Name]

**`app/providers/page.tsx`**
- Add `medicalWebPageJsonLd()` + `breadcrumbJsonLd()`

### Also add breadcrumbs to hub/index pages:

- `app/conditions/page.tsx` — Home → Conditions
- `app/symptoms/page.tsx` — Home → Symptoms
- `app/topics/sleep/page.tsx` — Home → Topics → Sleep
- `app/topics/adhd/page.tsx` — Home → Topics → ADHD
- `app/topics/movement/page.tsx` — Home → Topics → Movement

### Constants:

Define `BASE_URL` in a config file or env variable:
```typescript
// lib/config.ts
export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://bodysignals.org';
```

---

## Session 3 Gate

- [ ] `evidence-tiers.ts` is the single source of truth — grep for hardcoded grade colours/labels returns 0 hits outside that file
- [ ] `lib/utils/structured-data.ts` exists with all helper functions
- [ ] All 148 condition detail pages have `MedicalCondition` + `MedicalWebPage` + `BreadcrumbList` JSON-LD
- [ ] All 109 symptom detail pages have `MedicalSignOrSymptom` + `MedicalWebPage` + `BreadcrumbList` JSON-LD
- [ ] All 58 sleep intervention pages have `MedicalTherapy` + `MedicalWebPage` + `BreadcrumbList` JSON-LD
- [ ] All ADHD and movement detail pages have `MedicalWebPage` + `BreadcrumbList` JSON-LD
- [ ] Hub/index pages have `BreadcrumbList` JSON-LD
- [ ] View page source on 3 sample pages — valid JSON-LD in `<script type="application/ld+json">`
- [ ] Validate with Google Rich Results Test (https://search.google.com/test/rich-results) on at least 3 URLs (condition, symptom, sleep intervention)
- [ ] `npm run typecheck && npm run lint && npm run build` all pass — same page count (no new routes)
- [ ] Evidence badges render identically to before (no visual changes)
- [ ] Update `TASKS.md` — mark JSON-LD as complete
