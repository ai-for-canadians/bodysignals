# Session 5: Content Manifest + Launch Hardening

## Why This Is Last (Pre-Launch)

Sessions 1-4 fixed the foundations: analytics, citations, SEO, search, accessibility. This session builds the content manifest that catalogues everything you've built (prerequisite for B2B licensing conversations), adds the `/licensing` landing page, and runs a final launch hardening pass. After this session, the site is ready to deploy.

**Estimated scope:** ~3 new files, ~5 modified files, 1 new page.

## Context

By this point, Body Signals should have:
- 450+ pages with Plausible analytics (Session 1)
- 40+ real PubMed/DOI citations backfilled (Session 2)
- JSON-LD structured data on all health pages (Session 3)
- Functional search and WCAG 2.1 AA accessibility (Session 4)
- Phase B referral infrastructure (already done)

What's still missing for Phase C: the content manifest and licensing page.

---

## 5.1 — Content Manifest

### Create:

**`lib/data/content-manifest.ts`**

```typescript
import { conditions } from '@/lib/data/conditions';
import { symptoms } from '@/lib/data/symptoms';
import { sleepInterventions } from '@/lib/data/sleep';
import { adhdSystems } from '@/lib/data/adhd';
import { movementPrograms } from '@/lib/data/movement';
import { providers } from '@/lib/data/providers';
import { EvidenceRating } from '@/types';

export interface ContentEntry {
  id: string;
  type: 'condition' | 'symptom' | 'sleep_intervention' | 'adhd_system' | 'movement_program' | 'provider';
  slug: string;
  route: string;
  title: string;
  category: string;
  evidenceRating?: EvidenceRating;
  sourceCount: number;
  lastUpdated: string;
  tags: string[];
}

export interface ContentManifest {
  version: string;
  generated: string;
  publisher: string;
  totalEntries: number;
  breakdown: {
    conditions: number;
    symptoms: number;
    sleepInterventions: number;
    adhdSystems: number;
    movementPrograms: number;
    providers: number;
  };
  sourceCoverage: {
    totalSourceArrays: number;
    populated: number;
    empty: number;
    percentPopulated: number;
  };
  jurisdictions: string[];
  evidenceDistribution: Record<EvidenceRating, number>;
  entries: ContentEntry[];
}

export function generateManifest(): ContentManifest {
  const entries: ContentEntry[] = [];

  // Build entries from each data source
  conditions.forEach(c => {
    entries.push({
      id: c.id,
      type: 'condition',
      slug: c.slug,
      route: `/conditions/${c.slug}`,
      title: c.name,
      category: c.category,
      evidenceRating: c.evidenceRating,
      sourceCount: c.sources.length,
      lastUpdated: c.lastUpdated,
      tags: [c.category, ...c.symptoms.map(s => s.name.toLowerCase())],
    });
  });

  // ... repeat for symptoms, sleepInterventions, adhdSystems, movementPrograms, providers
  // providers don't have evidenceRating — omit that field

  // Calculate aggregate stats
  const allSourceCounts = entries.map(e => e.sourceCount);
  const populated = allSourceCounts.filter(c => c > 0).length;

  const evidenceDistribution: Record<string, number> = { A: 0, B: 0, C: 0, D: 0, F: 0 };
  entries.forEach(e => {
    if (e.evidenceRating) evidenceDistribution[e.evidenceRating]++;
  });

  return {
    version: '1.0',
    generated: new Date().toISOString(),
    publisher: 'Body Signals',
    totalEntries: entries.length,
    breakdown: {
      conditions: conditions.length,
      symptoms: symptoms.length,
      sleepInterventions: sleepInterventions.length,
      adhdSystems: adhdSystems.length,
      movementPrograms: movementPrograms.length,
      providers: providers.length,
    },
    sourceCoverage: {
      totalSourceArrays: allSourceCounts.length,
      populated,
      empty: allSourceCounts.length - populated,
      percentPopulated: Math.round((populated / allSourceCounts.length) * 100),
    },
    jurisdictions: ['canada', 'us'],
    evidenceDistribution: evidenceDistribution as Record<EvidenceRating, number>,
    entries,
  };
}
```

### Generate at build time:

Add to `package.json` scripts (extend the existing prebuild if Session 4 added one):
```json
"prebuild": "tsx lib/search/build-index.ts > public/search-index.json && tsx -e \"import{generateManifest}from'./lib/data/content-manifest';console.log(JSON.stringify(generateManifest(),null,2))\" > public/content-manifest.json"
```

Or create a simple script file:

**`scripts/generate-static.ts`**
```typescript
import { buildSearchEntries } from '../lib/search/build-index';
import { generateManifest } from '../lib/data/content-manifest';
import { writeFileSync } from 'fs';

writeFileSync('public/search-index.json', JSON.stringify(buildSearchEntries()));
writeFileSync('public/content-manifest.json', JSON.stringify(generateManifest(), null, 2));

console.log(`Generated search index (${buildSearchEntries().length} entries)`);
console.log(`Generated content manifest (${generateManifest().totalEntries} entries)`);
```

```json
"prebuild": "tsx scripts/generate-static.ts"
```

### Verification:
- `public/content-manifest.json` exists after build
- JSON is valid and `totalEntries` matches expected count
- `sourceCoverage.percentPopulated` is ≥ 30% (reflects Session 2 backfill)
- Evidence distribution matches actual data

---

## 5.2 — Licensing Landing Page

### Create:

**`app/licensing/page.tsx`**

A clean, professional page aimed at B2B prospects (benefits platforms, insurers, telehealth companies). This is NOT a consumer-facing page — it's a lead-gen surface for enterprise conversations.

**Sections:**

1. **Hero/Header:** "License Evidence-Graded Health Content"
   - Subtext: "Structured, source-cited, Canadian and US jurisdiction coverage. Built for integration into patient portals, benefits platforms, and telehealth applications."

2. **What We Offer:**
   - 148 conditions with interventions, evidence ratings, and source citations
   - 109 symptom guides with triage-level urgency classification
   - 58 sleep interventions with full safety profiles
   - 78 ADHD management systems with difficulty/impact ratings
   - 27 movement rehabilitation programs with phased progressions
   - (Pull actual numbers from the content manifest at build time)

3. **Content Quality:**
   - A-F evidence rating on every claim (link to /methodology)
   - Real PubMed/DOI citations (link to sample condition page)
   - Canadian and US jurisdiction parity (Health Canada + FDA, provincial + state)
   - No affiliate bias — content decisions are independent of commercial relationships
   - Updated quarterly with review dates on every entry

4. **Data Format:**
   - Structured TypeScript/JSON — not PDFs, not unstructured text
   - Every entry has: title, slug, category, evidence rating, sources, last updated
   - Sample: link to `/content-manifest.json` so prospects can see the structure

5. **Use Cases:**
   - Patient education portals (pre-visit, post-diagnosis)
   - Employer benefits platforms (wellness resource library)
   - Insurance member portals (condition management resources)
   - Telehealth pre-visit intake (contextual health information)
   - Health app content (embedded condition/intervention data)

6. **Contact:**
   - Email for licensing enquiries (use a dedicated address, e.g., licensing@bodysignals.org)
   - "Tell us about your use case and audience. We'll respond within 48 hours."
   - Note: "Body Signals content is non-exclusive. Licensing does not grant editorial control."

**Design:** Match existing legal page pattern (numbered amber headings, slate-800 cards, consistent with design system). This page should feel authoritative, not salesy.

**Expected page count:** +1 (add to sitemap with priority 0.4)

---

## 5.3 — Launch Hardening Pass

This is a final sweep before deploy. Not new features — verification and cleanup.

### Run all existing checks:

```bash
npm run typecheck        # Zero errors
npm run lint             # Zero warnings
npm run check:crisis     # Crisis numbers present
npm run check:phrases    # No forbidden phrases
npm run build            # Succeeds with expected page count
```

### Run the deploy checklist:

Read `docs/DEPLOY_CHECKLIST.md` and verify every item. In particular:

**Legal/editorial regression checks:**
```bash
# Forbidden phrases
rg -i "medical site|health advice|health education publisher|we recommend|doctor-reviewed" app/ components/ lib/data/

# Evidence-language check
rg -i "(studies?|research|evidence|experts?) (show|suggest|indicate|agree|demonstrate)" lib/data/

# Research-digest presence
rg -c "research digest" components/home/Hero.tsx app/about/page.tsx components/layout/Footer.tsx CLAUDE.md README.md

# No console output
rg -n "console\.(log|error|warn)" components/ app/

# Partner ID isolation check
rg -l "maple|betterhelp|sesame-care|felix|lifelabs|dynacare|rocket-doctor|tia-health|jane-app" app/ --glob '!app/disclosures/'
```

All should return 0 hits (except research-digest presence which should return ≥1 per file).

### Verify all pages render:

Spot-check these specific pages on `npm run dev`:
- [ ] `/` — Hero, body map, featured content load
- [ ] `/conditions/depression` — MH disclaimer, crisis numbers, evidence badges, sources section, JSON-LD in source, referral CTA placeholder
- [ ] `/symptoms/headache` — Urgency badge, related conditions, disclaimer, JSON-LD
- [ ] `/topics/sleep/melatonin` — Safety profile, contraindications, sources, JSON-LD
- [ ] `/topics/adhd` — System cards with difficulty/impact, evidence badges
- [ ] `/topics/movement` — Program cards, phase timelines
- [ ] `/providers` — Provider type cards with Canadian context
- [ ] `/methodology` — Full evidence rubric (rendered from evidence-tiers.ts)
- [ ] `/disclosures` — Empty commercial relationships, editorial partners listed
- [ ] `/licensing` — Content summary, manifest link, contact
- [ ] `/terms`, `/privacy`, `/disclaimer`, `/editorial`, `/corrections` — all render
- [ ] Search (Cmd+K) — returns results across all content types
- [ ] Mobile nav — hamburger menu, all links accessible
- [ ] 404 page — `/nonexistent-slug` renders themed 404
- [ ] Error page — trigger runtime error, error boundary renders

### Update project docs:

**`CLAUDE.md`** — Update current state section with accurate counts and completed phases
**`TASKS.md`** — Move Sessions 1-5 items to Completed, update Active with remaining items
**`README.md`** — Update page count and any outdated information

---

## 5.4 — Sitemap Final Update

### Modify:

**`app/sitemap.ts`**
Add any routes not yet included:
- `/licensing` (priority: 0.4, changeFrequency: monthly)
- Verify `/disclosures` is present (added in Phase B)
- Verify all condition category pages are present
- Verify total URL count is accurate

---

## Session 5 Gate (Final Pre-Launch Gate)

- [ ] `public/content-manifest.json` generates with accurate entry count and source coverage stats
- [ ] `/licensing` page renders with real content numbers (not hardcoded — pulled from manifest or data)
- [ ] All deploy checklist items pass
- [ ] All forbidden-phrase greps return 0
- [ ] Partner ID isolation grep returns 0
- [ ] Research-digest grep returns ≥1 hit in 5 target files
- [ ] 15 spot-check pages render correctly (list above)
- [ ] Search returns results for "melatonin", "depression", "ADHD", "back pain"
- [ ] JSON-LD present on 3 sampled detail pages
- [ ] CLAUDE.md and TASKS.md are up to date
- [ ] `npm run typecheck && npm run lint && npm run build` all pass
- [ ] Final page count documented in CLAUDE.md

## Post-Session 5: Ready to Deploy

After Session 5 passes, the site is launch-ready:
- Legal infrastructure: complete
- Referral infrastructure: complete (activation pending 50K MAU)
- Analytics: ready for production
- SEO: JSON-LD + comprehensive sitemap
- Accessibility: WCAG 2.1 AA compliant
- Content quality: 40+ real citations, no forbidden phrases, evidence-rated
- B2B readiness: content manifest + licensing page
- Project docs: CLAUDE.md, TASKS.md, RUNBOOK, DEPLOY_CHECKLIST all current

Next steps (post-launch):
- Phase C.P: Provider directory (at ~80K MAU approach)
- Phase D: AI architecture document
- Ongoing: source backfill to reach 80%+ coverage
- Ongoing: quarterly content review per runbook
