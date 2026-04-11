# Health & Body Consolidation Strategy

## Master Site: Body Signals → "Body Signals" (keeping the name)
**Tagline:** "Your body, explained — symptoms, conditions, and what actually works"

---

## What's Being Merged

| Source Site | Content | Entries | Key Data |
|---|---|---|---|
| **Body Signals** (anchor) | Symptoms by body area | 23 symptoms | Red/yellow flags, urgency levels, related conditions |
| **Condition Control** | Chronic conditions + interventions | 9 conditions | Interventions with evidence levels, lifestyle factors |
| **Gut Health Deep Dive** | Digestive conditions | 7 conditions | Treatments with types, testing options, dietary recs |
| **Sleep Better** | Sleep interventions | 20 interventions | Safety profiles, dosage, contraindications |
| **Movement RX** | Exercise rehabilitation | 3 programs | Phased progressions, exercise prescriptions |
| **ADHD Systems** | ADHD management tools | 75 systems/tools | Difficulty/impact ratings, step-by-step implementation |
| **Mental Health** | Mental health conditions | 6 conditions + 4 providers + 3 therapies | Provider routing, therapy types, first steps |

**Total content being unified:** ~143 distinct content entries across 7 different schemas.

---

## New Information Architecture

### The Core Insight
Body Signals currently has a **symptom-first** architecture: "I have X symptom → here's what it might mean." The merged site needs to support THREE user journeys:

1. **"I have a symptom"** → Symptom lookup → Related conditions → What to do (existing Body Signals flow)
2. **"I have a condition"** → Condition detail → Evidence-based interventions → Management tools (from Condition Control, Gut Health, Mental Health)
3. **"I want to improve X"** → Topic hub → Interventions/programs/systems (from Sleep, Movement, ADHD)

### Proposed Site Map

```
/                                    # Homepage: Hero + body map + featured content
├── /symptoms                        # Symptom library (existing, expanded)
│   ├── /symptoms/[slug]             # Symptom detail (existing pattern)
│   └── /body/[area]                 # Body area filter (existing pattern)
│
├── /conditions                      # NEW: Condition library
│   ├── /conditions/[slug]           # Condition detail with interventions
│   └── /conditions/category/[cat]   # Category filter (digestive, mental-health, chronic, etc.)
│
├── /topics                          # NEW: Topic hubs (non-condition content)
│   ├── /topics/sleep                # Sleep hub: all 20 interventions
│   ├── /topics/movement             # Movement hub: rehabilitation programs
│   ├── /topics/adhd                 # ADHD hub: 75 systems + tools
│   └── /topics/[slug]               # Generic topic page pattern
│
├── /interventions                   # NEW: Cross-cutting intervention database
│   └── /interventions/[slug]        # Individual intervention detail
│
├── /providers                       # NEW: Provider guide (from Mental Health)
│   └── /providers/[slug]            # Provider type detail
│
├── /methodology                     # Evidence rating explanation
├── /about                           # About + mission
└── /disclaimer                      # Legal disclaimers
```

### Unified Type System

```typescript
// ============================================================
// CORE TYPES — The unified schema for all health content
// ============================================================

// Evidence rating (standardized A-F across all content)
type EvidenceRating = 'A' | 'B' | 'C' | 'D' | 'F';

// Urgency (from Body Signals, extended)
type UrgencyLevel = 'emergency' | 'urgent' | 'routine' | 'self_care' | 'info';

// Content categories (unified across all source sites)
type ContentCategory =
  // Body areas (from Body Signals)
  | 'head' | 'chest' | 'abdomen' | 'back' | 'limbs' | 'skin' | 'general'
  // Condition types (merged from Condition Control, Gut Health, Mental Health)
  | 'chronic' | 'digestive' | 'mental-health' | 'metabolic' | 'cardiovascular'
  | 'pain' | 'autoimmune' | 'neurological'
  // Topic types (from Sleep, Movement, ADHD)
  | 'sleep' | 'movement' | 'adhd';

// ============================================================
// SYMPTOMS (from Body Signals — kept as-is, expanded)
// ============================================================
interface Symptom {
  id: string;
  name: string;
  slug: string;
  bodyArea: BodyAreaID;
  summary: string;
  description: string;
  redFlags: string[];
  yellowFlags: string[];
  relatedConditions: RelatedCondition[];
  homeCare: string[];
  whenToSeeDoctor: string[];
  urgency: UrgencyLevel;
  evidenceRating: EvidenceRating;
  lastUpdated: string;
  sources: Source[];
}

// ============================================================
// CONDITIONS (merged from Condition Control, Gut Health, Mental Health)
// ============================================================
interface Condition {
  id: string;
  name: string;
  slug: string;
  category: ContentCategory;
  tagline: string;
  summary: string;
  description: string;

  // Symptoms of this condition (bidirectional link to Symptom)
  symptoms: ConditionSymptom[];

  // What actually works (merged from all intervention schemas)
  interventions: Intervention[];

  // Lifestyle factors (from Condition Control)
  lifestyleFactors?: {
    diet?: string;
    exercise?: string;
    sleep?: string;
    stress?: string;
  };

  // Diagnostic info (from Gut Health)
  testingOptions?: string[];
  dietaryRecommendations?: string[];

  // Mental health specifics (from Mental Health)
  professionalToSee?: string;
  firstSteps?: string[];
  therapyTypes?: string[];

  // Metadata
  evidenceRating: EvidenceRating;
  disclaimer: string;
  lastUpdated: string;
  sources: Source[];

  // Cross-links
  relatedSymptomSlugs?: string[];   // Links to /symptoms/[slug]
  relatedConditionSlugs?: string[];  // Links to other conditions
  relatedTopicSlugs?: string[];      // Links to /topics/[slug]
}

// ============================================================
// INTERVENTIONS (unified from all sources)
// ============================================================
interface Intervention {
  id: string;
  name: string;
  slug: string;
  category: 'medication' | 'supplement' | 'lifestyle' | 'therapy'
           | 'exercise' | 'diet' | 'tool' | 'protocol' | 'device';
  description: string;
  mechanism?: string;
  protocol?: string[];
  dosage?: string;

  // Evidence (standardized)
  evidenceRating: EvidenceRating;
  researchSummary?: string;

  // Safety (from Sleep Better's excellent schema)
  safetyProfile?: {
    riskLevel: 'very low' | 'low' | 'moderate' | 'high';
    sideEffects?: { name: string; severity: string; frequency: string }[];
    contraindications?: string[];
  };

  // Benefits
  benefits?: { description: string; evidenceRating: EvidenceRating }[];

  sources: Source[];
  lastUpdated: string;

  // Cross-links
  forConditions?: string[];  // Condition slugs this intervention helps
}

// ============================================================
// TOPIC HUBS (Sleep, Movement, ADHD — structured collections)
// ============================================================
interface TopicHub {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  icon: string;
  category: ContentCategory;

  // Content varies by topic type
  items: TopicItem[];
}

// ADHD Systems
interface ADHDSystem {
  id: string;
  name: string;
  slug: string;
  category: string;
  tagline: string;
  description: string;
  whyItWorks: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  impact: 'Low' | 'Medium' | 'High' | 'Critical';
  timeToImplement: string;
  steps: { order: number; text: string; tip?: string }[];
  commonPitfalls: string[];
  tools?: string[];
  lastUpdated: string;
}

// Movement Programs
interface MovementProgram {
  id: string;
  name: string;
  slug: string;
  bodyPart: string;
  tagline: string;
  description: string;
  phases: {
    name: string;
    weekRange: string;
    description: string;
    goals: string[];
    exercises: Exercise[];
  }[];
  equipmentNeeded: string[];
  contraindications: string[];
  lastUpdated: string;
}

// ============================================================
// PROVIDERS (from Mental Health)
// ============================================================
interface Provider {
  id: string;
  name: string;
  slug: string;
  qualifications: string;
  canPrescribe: boolean;
  bestFor: string[];
  averageCost: string;
  canadianContext?: string;  // Provincial coverage info
}

// ============================================================
// SHARED
// ============================================================
interface Source {
  title: string;
  url: string;
  type: 'medical_guideline' | 'study' | 'review' | 'organization' | 'journal';
  year?: number;
  authors?: string;
}

interface RelatedCondition {
  name: string;
  slug: string;
  likelihood: 'common' | 'uncommon' | 'rare' | 'possible';
  urgency: UrgencyLevel;
  description: string;
}

interface ConditionSymptom {
  name: string;
  description: string;
  frequency: 'common' | 'occasional' | 'rare';
  symptomSlug?: string;  // Cross-link to /symptoms/[slug]
}
```

---

## Data Migration Mapping

### Evidence Rating Normalization

| Source Site | Original Scale | Mapping to A-F |
|---|---|---|
| Body Signals | A/B/C/D/F | Keep as-is |
| Gut Health | A/B/C/D/F | Keep as-is |
| Sleep Better | A/B/C/D/F | Keep as-is |
| Condition Control | High/Medium/Low/Mixed | High→A, Medium→C, Low→D, Mixed→C |
| Movement RX | None | Default to C (evidence-based protocols, limited RCTs) |
| ADHD Systems | None | Default to C (established practices, limited formal research) |
| Mental Health | None | Default to B (well-established clinical guidelines) |

### Content Migration Plan

**Phase 1: Scaffold (no content changes)**
- Create new route structure (/conditions, /topics, /interventions, /providers)
- Build new page templates using existing component patterns
- Set up unified type definitions
- Create navigation that connects all sections

**Phase 2: Migrate conditions**
- Port 9 Condition Control conditions → /conditions/
- Port 7 Gut Health conditions → /conditions/ (category: digestive)
- Port 6 Mental Health conditions → /conditions/ (category: mental-health)
- Normalize evidence ratings
- Add cross-links to existing symptoms

**Phase 3: Migrate topic hubs**
- Port 20 Sleep interventions → /topics/sleep
- Port 3 Movement programs → /topics/movement
- Port 75 ADHD systems → /topics/adhd
- Preserve unique schemas (ADHD difficulty/impact, Movement phases, Sleep safety profiles)

**Phase 4: Wire cross-links**
- Link symptoms ↔ conditions (bidirectional)
- Link conditions ↔ interventions
- Link topics ↔ conditions where relevant
- Build "Related on Body Signals" component for every page

**Phase 5: Canadian context + launch prep**
- Add provincial health resources
- Add Canadian spelling throughout
- Add disclaimers to every section
- SEO meta tags for all new routes
- Sitemap generation for expanded routes

---

## Navigation Design

### Primary Nav (Header)
```
[Body Signals logo]   Symptoms   Conditions   Topics ▾   Providers   About
                                               ├── Sleep
                                               ├── Movement
                                               ├── ADHD
                                               └── All Topics
```

### Homepage Sections
1. **Hero** — "Your body, explained" + search bar
2. **Body Map** — Interactive body area picker (existing, enhanced)
3. **Featured Conditions** — 6 most-viewed conditions with A-F badges
4. **Topic Hubs** — Cards for Sleep, Movement, ADHD
5. **How We Rate** — Brief methodology explanation
6. **Cross-Site Links** — "Also on InfoBank" linking to Product Truth, Supplements, Open Inquiry

---

## Component Reuse Plan

### Keep from Body Signals (anchor)
- Layout (Header, Footer, Disclaimer) — extend nav items
- Hero component — update tagline
- BodyMap component — keep for symptom section
- Badge/EvidenceBadge — use everywhere
- Card, Button, Input, Skeleton — no changes needed
- Symptom detail page template — keep as-is

### Port from other sites (best-in-class components)
- **From Sleep Better:** SafetyProfile component (risk level, side effects, contraindications) — use for all interventions
- **From ADHD Systems:** DifficultyImpactBadge, StepByStep component — use for ADHD topic hub
- **From Movement RX:** PhaseTimeline, ExerciseCard — use for movement topic hub
- **From Mental Health:** ProviderCard, TherapyTypeCard — use for provider section
- **From Condition Control:** InterventionList, LifestyleFactors — use for condition detail pages

### Build new
- **TopicHubCard** — Card linking to /topics/[slug] with icon, description, item count
- **ConditionCard** — Card for condition listings with category badge + evidence rating
- **CrossLinkSidebar** — "Related" sidebar showing links across symptoms/conditions/topics
- **SearchBar** — Client-side search across all content (symptoms + conditions + topics)
- **BreadcrumbNav** — Show user where they are: Home > Conditions > Digestive > IBS

---

## SEO Strategy for Merged Site

### High-Value Keyword Targets
- `/symptoms/chest-pain` → "chest pain causes" (100K+ monthly searches)
- `/symptoms/headache` → "headache types" (80K+)
- `/conditions/ibs` → "IBS treatment options" (40K+)
- `/conditions/depression` → "depression treatment" (60K+)
- `/topics/adhd` → "ADHD management systems" (20K+)
- `/topics/sleep` → "how to sleep better evidence" (30K+)

### Structured Data (JSON-LD)
- MedicalCondition schema for /conditions/
- MedicalWebPage for all health pages
- FAQPage for common questions
- BreadcrumbList for all pages

### Internal Linking Strategy
Every page should link to 3-5 related pages within Body Signals:
- Symptom → Related conditions
- Condition → Related symptoms + interventions
- Topic → Related conditions
- All pages → Methodology page (builds E-E-A-T)

---

## Risk Mitigation

### Legal
- Every page needs a medical disclaimer (already have Disclaimer component)
- ADHD section needs "not a substitute for professional diagnosis" language
- Movement section needs "consult your healthcare provider before starting"
- Mental Health section needs crisis line numbers (Canadian: 988, Kids Help Phone: 1-800-668-6868)

### Content Quality
- All migrated content must have evidence ratings
- No content without at least one source citation
- Canadian context required for all provider/resource recommendations
- Review cycle: mark all migrated content with "lastUpdated" as migration date, schedule 6-month review

### Technical
- Slug collisions: prefix if needed (e.g., both symptoms and conditions might have "headache")
  - Resolution: symptoms/headache vs conditions/migraine (different slugs for different content types)
- 301 redirects from old standalone sites to new merged routes
- Test all dynamic routes generate correctly with `generateStaticParams()`

