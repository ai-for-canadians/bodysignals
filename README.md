# Body Signals

An independent health research digest built on Next.js 14. Body Signals summarises peer-reviewed research on symptoms, conditions, and interventions in plain language for Canadian and US readers. It consolidates seven source sites into a single static destination with A–F evidence ratings, transparent sourcing, and Canadian spelling throughout. Body Signals is a publisher, not a healthcare provider — it does not practise medicine or provide medical advice.

**Live:** _deploy URL goes here once Vercel is connected_

---

## What's in it

| Section | Count | What it is |
|---|---|---|
| **Symptoms** (`/symptoms`) | 24 | Body-area-indexed symptom guides with red-flag triage, home-care advice, and when-to-see-a-doctor criteria |
| **Body map** (`/body/[area]`) | 7 | Head, chest, abdomen, back, limbs, skin, general — each links to the symptoms localised to that area |
| **Conditions** (`/conditions`) | 27 | Chronic, digestive, mental health, metabolic, cardiovascular, pain, autoimmune, and neurological conditions with interventions, symptoms, and first-steps guidance |
| **Providers** (`/providers`) | — | Psychiatrist / psychologist / social worker / counsellor breakdown with Canadian coverage notes |
| **Sleep Hub** (`/topics/sleep`) | 20 interventions | Hygiene, environment, supplements, tools, and protocols — evidence-rated with full safety profiles (side effects, contraindications, risk level) |
| **ADHD Hub** (`/topics/adhd`) | 18 systems + 6 tools | Tactical systems rated by difficulty and impact, with hand-authored per-system evidence grades and recommended tools |
| **Movement Hub** (`/topics/movement`) | 3 programs | Physiotherapist-validated rehab protocols for patellar tendinopathy, low-back pain (McGill Big 3), and rotator cuff |

**Total:** 112 statically-generated pages, zero runtime data fetching.

## Content standards

Every health claim on this site is held to the following rules:

- **A–F evidence ratings** are required on all interventions and claims. The scale is: `A` emerald (strong RCT evidence), `B` green (good evidence), `C` amber (mixed or practitioner consensus), `D` orange (weak evidence), `F` red (disproven or harmful).
- **No "studies show"** without a specific citation. Every source is either a named study, a medical guideline, a peer-reviewed review, or a recognised organisation.
- **Medical disclaimer** on every health page, with supplement, drug-interaction, and underlying-condition warnings tuned per topic.
- **Crisis numbers** on every mental health and ADHD page, jurisdiction-correct: 988 (Suicide & Crisis Lifeline, Canada and US), text HOME to 741741 (Crisis Text Line, US) or CONNECT to 686868 (Kids Help Phone, Canada), LGBT Youth Line 1-800-268-9688 (Canada), Trans Lifeline 1-877-330-6366 (Canada), and Trevor Project 1-866-488-7386 (US).
- **Canadian spelling** throughout (colour, behaviour, centre, practise, stabilise, minimise). `program` stays as-is (Canadian computing/rehab convention).
- **Unicode ×** (U+00D7) is locked in for exercise set formatting — never lowercase `x`.

Full rules in [`docs/CONTENT_STANDARDS.md`](docs/CONTENT_STANDARDS.md).

## Design system

- **Background** `slate-900` · **Surface** `slate-800` · **Accent** `amber-500`
- **Font** Inter · **Container** `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
- **Evidence palette** A emerald / B green / C amber / D orange / F red
- **Topic metric palettes** — ADHD difficulty is slate-scale (avoids collision with evidence colours); ADHD impact is amber intensity scale

Full spec in [`docs/DESIGN_SYSTEM.md`](docs/DESIGN_SYSTEM.md).

## Tech stack

- **Framework** Next.js 14 (App Router, static generation via `generateStaticParams`)
- **Language** TypeScript 5 (strict mode, enum-tightened domain types)
- **Styling** Tailwind CSS 3 with a dark theme
- **Animations** Framer Motion
- **Icons** Lucide React
- **UI components** inlined in `components/ui/` — zero external component-library dependencies

## Project structure

```
body-signals-standalone/
├── app/                          Next.js App Router pages
│   ├── body/[area]/              Body-area landing pages
│   ├── conditions/[slug]/        27 condition detail pages
│   ├── symptoms/[slug]/          24 symptom detail pages
│   └── topics/
│       ├── sleep/[slug]/         20 sleep intervention detail pages
│       ├── adhd/[slug]/          18 ADHD system detail pages
│       └── movement/[slug]/      3 movement program detail pages
├── components/
│   ├── conditions/               ConditionCard + ConditionsLibrary (filters)
│   ├── topics/                   SleepLibrary, ADHDLibrary, and card components
│   ├── layout/                   Header, Footer, Disclaimer
│   └── ui/                       EvidenceBadge, Card, Button, Input, etc.
├── lib/data/                     Hand-authored, read-only content modules
│   ├── symptoms.ts               24 symptoms
│   ├── conditions.ts             27 conditions
│   ├── sleep.ts                  20 sleep interventions + SLEEP_DISCLAIMER
│   ├── adhd.ts                   18 systems + 6 tools + ADHD_DISCLAIMER
│   └── movement.ts               3 rehab programs + MOVEMENT_DISCLAIMER
├── types/index.ts                Unified domain types (EvidenceRating, Condition, ADHDSystem, etc.)
└── docs/                         Design system, content standards, merge strategy
```

## Commands

```bash
npm install          # Install dependencies
npm run dev          # Start dev server on :3000
npm run typecheck    # tsc --noEmit (zero-error policy)
npm run lint         # ESLint
npm run build        # Production build (should ship 112 static pages)
npm run start        # Run production build locally
```

The build pipeline enforces the zero-error TypeScript policy — any `typecheck` failure will block a deployment.

## Deployment

The site is set up for Vercel deployment out of the box:

```bash
vercel --prod
```

`vercel.json` is committed at the root. No environment variables are required — all content is compiled in at build time.

## Contributing content

All content lives in `lib/data/*.ts` as hand-authored TypeScript literals. This is deliberate: it's auditable, diffable, type-checked at build time, and avoids any runtime data transformation that would obscure sourcing.

To add a new condition, sleep intervention, ADHD system, or movement program:

1. Add the entry to the corresponding file in `lib/data/`
2. Ensure it carries a valid `EvidenceRating` and `lastUpdated` date
3. Cite primary sources in the `sources[]` array where applicable
4. Run `npm run typecheck && npm run build` — the new route will appear in the build output
5. Verify the Canadian spelling and medical disclaimer conventions in `docs/CONTENT_STANDARDS.md`

## Disclaimer

Body Signals is an independent research digest. It summarises published, peer-reviewed health research for informational purposes. Body Signals is not a healthcare provider, does not practise medicine, and does not provide medical advice, diagnosis, or treatment. If you are in crisis, call or text **988** (Suicide & Crisis Lifeline, Canada and US). For text-only crisis support, text **HOME to 741741** (Crisis Text Line, US) or **CONNECT to 686868** (Kids Help Phone, Canada). In an emergency, call **911**.

## License

_License goes here._
