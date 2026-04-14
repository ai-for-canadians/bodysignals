// Unified condition data for Body Signals
//
// Migrated from 3 source apps in ../extracted-apps/:
//   - condition-control/lib/data/conditions.ts  (6 kept; ibs & gerd dropped — duplicates)
//   - gut-health-deep-dive/lib/data/conditions.ts  (all 15)
//   - mental-health/lib/data/conditions.ts  (all 6)
//
// Total: 27 unique conditions.
//
// Design decisions (from Phase 2 plan):
//   1. Source schemas differ significantly. Rather than runtime transform pipelines,
//      conditions are authored as literal Condition objects. Category mappings,
//      intervention-category assignments, and mental-health mechanisms are all
//      baked in at author time and easy to audit.
//   2. Top-level `evidenceRating` is the MEDIAN of each condition's intervention
//      ratings (not the best) — avoids overstating a condition that has one A-grade
//      standout among many weaker options. The detail page then visually tags the
//      single best-rated intervention with a "Most evidence-backed option" chip.
//   3. Mental-health conditions have no source evidence ratings. Each synthesized
//      intervention is assigned 'B' (standard clinical treatments with established
//      research) and its mechanism is hand-authored. This keeps mental-health pages
//      from feeling thinner than gut-health ones.
//   4. Condition-control evidence scale normalized: High→A, Medium→C, Low→D, Mixed→C.
//   5. All gut-health conditions map to the `digestive` target category regardless of
//      source sub-category (digestive-disorder, autoimmune, food-intolerance,
//      microbiome-imbalance) — users navigate by body system, not autoimmunology.
//   6. `relatedSymptomSlugs` links are ONLY populated with slugs that actually exist
//      in lib/data/symptoms.ts (verified against the 23 slugs present there).

import type { Condition, EvidenceRating } from '@/types';

// ============================================================================
// CONSTANTS
// ============================================================================

const LAST_UPDATED = '2026-04-10';

export const STANDARD_DISCLAIMER =
  'This is a research summary, not medical advice. Body Signals is an independent research digest — it summarises published research for informational purposes and is not a healthcare provider. Consult a qualified healthcare provider before making changes to diet, exercise, supplements, or medication — especially if you have existing conditions or take prescription drugs.';

const MH_DISCLAIMER =
  'This is a research summary, not medical advice. Body Signals is an independent research digest — it summarises published research for informational purposes and is not a healthcare provider. Mental health care works best with a qualified provider. If you are in crisis, call or text 988 (Suicide & Crisis Lifeline, Canada and US). For text-only crisis support: text HOME to 741741 (Crisis Text Line, US) or CONNECT to 686868 (Kids Help Phone, Canada). Canadian LGBTQ+ youth can reach LGBT Youth Line 1-800-268-9688 or Trans Lifeline 1-877-330-6366; US LGBTQ+ youth can reach the Trevor Project 1-866-488-7386. In an emergency, call 911. Evidence ratings for mental health interventions default to B (standard clinical treatments with established research); individual response varies.';

// Canadian category display labels (used by UI layers)
export const CATEGORY_LABELS: Record<
  'digestive' | 'mental-health' | 'metabolic' | 'cardiovascular' | 'pain' | 'chronic' | 'autoimmune' | 'neurological',
  string
> = {
  digestive: 'Digestive',
  'mental-health': 'Mental Health',
  metabolic: 'Metabolic',
  cardiovascular: 'Cardiovascular',
  pain: 'Pain',
  chronic: 'Chronic',
  autoimmune: 'Autoimmune',
  neurological: 'Neurological',
};

// Sort order when "All" pill is active on the library page (body-system mental model).
export const CATEGORY_DISPLAY_ORDER: Array<
  'digestive' | 'mental-health' | 'metabolic' | 'cardiovascular' | 'pain'
> = ['digestive', 'mental-health', 'metabolic', 'cardiovascular', 'pain'];

// ============================================================================
// EXPLICIT INTERVENTION-CATEGORY REFERENCE (condition-control)
// ============================================================================
//
// This constant is the source of truth for every condition-control intervention's
// Intervention.category value. It is NOT called at runtime — the values are baked
// into each Condition literal below. The map lives here as a single auditable
// reference so future resyncs from the source can diff against it directly.
//
// If you add a new CC intervention, add it here AND update the corresponding
// condition's interventions array below.
//
export const CC_INTERVENTION_CATEGORY_REFERENCE = {
  // type-2-diabetes
  'low-carb': 'diet',
  'intermittent-fasting': 'protocol',
  'resistance-training': 'exercise',
  // hypertension
  potassium: 'diet',
  breathing: 'protocol',
  // migraine
  magnesium: 'supplement',
  'elimination-diet': 'diet',
  // pcos
  'low-glycemic-diet': 'diet',
  inositol: 'supplement',
  'strength-training-pcos': 'exercise',
  // fibromyalgia
  'sleep-hygiene': 'lifestyle',
  'graded-exercise': 'exercise',
  'mindfulness-meditation': 'therapy',
  // high-cholesterol
  'fiber-intake': 'diet',
  'plant-sterols': 'supplement',
  'aerobic-exercise': 'exercise',
} as const;

// ============================================================================
// CONDITIONS (27 total)
// ============================================================================

export const conditions: Condition[] = [
  // --------------------------------------------------------------------------
  // METABOLIC (2) — from condition-control
  // --------------------------------------------------------------------------
  {
    id: 'type-2-diabetes',
    name: 'Type 2 Diabetes',
    slug: 'type-2-diabetes',
    category: 'metabolic',
    tagline: 'Reversing insulin resistance',
    summary:
      'A condition where cells stop responding to insulin, leading to high blood sugar. Often reversible with lifestyle changes.',
    description:
      'A condition where cells stop responding to insulin, leading to high blood sugar. Often reversible with lifestyle changes.',
    symptoms: [],
    interventions: [
      {
        id: 'low-carb',
        name: 'Carbohydrate Restriction',
        slug: 'carbohydrate-restriction',
        category: 'diet',
        description: 'Reducing dietary glucose load to lower insulin demands.',
        mechanism: 'Lowers blood glucose directly; reduces hepatic fat.',
        protocol: ['<50g net carbs/day for remission; <100g for management.'],
        evidenceRating: 'A',
        sources: [
          {
            title: 'Efficacy and safety of low and very low carbohydrate diets for type 2 diabetes remission: systematic review and meta-analysis of published and unpublished randomized trial data',
            url: 'https://pubmed.ncbi.nlm.nih.gov/33441384/',
            type: 'review',
            year: 2021,
            authors: 'Goldenberg JZ, Day A, Brinkworth GD, et al.',
          },
        ],
        lastUpdated: '2025-01-26',
      },
      {
        id: 'intermittent-fasting',
        name: 'Time Restricted Eating',
        slug: 'time-restricted-eating',
        category: 'protocol',
        description: 'Compressing eating window to 8-10 hours.',
        mechanism: 'Allows prolonged periods of low insulin, enabling fat oxidation.',
        protocol: ['16:8 schedule (fast 16h, eat 8h).'],
        evidenceRating: 'C',
        sources: [
          {
            title: 'Time-Restricted Eating Improves Glycemic Control in Patients with Type 2 Diabetes: A Meta-Analysis and Systematic Review',
            url: 'https://pubmed.ncbi.nlm.nih.gov/40806442/',
            type: 'review',
            year: 2025,
            authors: 'Nam T, Oh H, Kim A, et al.',
          },
        ],
        lastUpdated: '2025-01-26',
      },
      {
        id: 'resistance-training',
        name: 'Resistance Training',
        slug: 'resistance-training',
        category: 'exercise',
        description: 'Building muscle mass.',
        mechanism: 'Muscle tissue acts as a "glucose sink" independent of insulin.',
        protocol: ['Full body resistance training 2-3x/week.'],
        evidenceRating: 'A',
        sources: [
          {
            title: 'The Impact of Resistance Exercise Training on Glycemic Control Among Adults with Type 2 Diabetes: A Systematic Review and Meta-Analysis of Randomized Controlled Trials',
            url: 'https://pubmed.ncbi.nlm.nih.gov/38623887/',
            type: 'review',
            year: 2024,
            authors: 'Wan Y, Su Z',
          },
        ],
        lastUpdated: '2025-01-26',
      },
    ],
    lifestyleFactors: {
      diet: 'Focus on protein and healthy fats. Minimize sugar and starches.',
      exercise: 'Walk 10-15 min after meals to blunt glucose spikes.',
      sleep: 'Poor sleep induces acute insulin resistance.',
      stress: 'Cortisol releases stored glucose; manage stress.',
    },
    evidenceRating: 'A', // median([A, C, A]) = A
    disclaimer:
      STANDARD_DISCLAIMER + ' Dietary changes while on medication (insulin or metformin) may affect blood sugar levels — a healthcare provider can advise on adjustments.',
    lastUpdated: LAST_UPDATED,
    sources: [
      {
        title: 'Standards of Care in Diabetes — 2024',
        url: 'https://diabetesjournals.org/care/issue/47/Supplement_1',
        type: 'medical_guideline',
        year: 2024,
        authors: 'American Diabetes Association',
      },
      {
        title: 'Diabetes Canada 2018 Clinical Practice Guidelines for the Prevention and Management of Diabetes in Canada',
        url: 'https://pubmed.ncbi.nlm.nih.gov/29650080/',
        type: 'medical_guideline',
        year: 2018,
        authors: 'Diabetes Canada Clinical Practice Guidelines Expert Committee',
      },
      {
        title: 'Dietary Carbohydrate Restriction as the First Approach in Diabetes Management: Critical Review and Evidence Base',
        url: 'https://pubmed.ncbi.nlm.nih.gov/25287761/',
        type: 'review',
        year: 2015,
        authors: 'Feinman RD et al.',
      },
    ],
    relatedSymptomSlugs: ['fatigue', 'frequent-urination', 'vision-changes'],
  },
  {
    id: 'pcos',
    name: 'PCOS (Polycystic Ovary Syndrome)',
    slug: 'pcos',
    category: 'metabolic',
    tagline: 'Hormonal balance through metabolic health',
    summary:
      'A hormonal disorder causing enlarged ovaries with cysts. Affects menstruation, fertility, and is linked to insulin resistance.',
    description:
      'A hormonal disorder causing enlarged ovaries with cysts. Affects menstruation, fertility, and is linked to insulin resistance, weight gain, and elevated androgens.',
    symptoms: [],
    interventions: [
      {
        id: 'low-glycemic-diet',
        name: 'Low Glycaemic Diet',
        slug: 'low-glycaemic-diet',
        category: 'diet',
        description: "Choosing foods that don't spike blood sugar rapidly.",
        mechanism: 'Reduces insulin spikes, which drive androgen production in the ovaries.',
        protocol: ['Prioritize whole foods, fibre, and protein. Avoid refined carbs and sugars.'],
        evidenceRating: 'A',
        sources: [
          {
            title: 'Ranking the dietary interventions by their effectiveness in the management of polycystic ovary syndrome: a systematic review and network meta-analysis',
            url: 'https://pubmed.ncbi.nlm.nih.gov/38388374/',
            type: 'review',
            year: 2024,
            authors: 'Juhász AE, Stubnya MP, Teutsch B, et al.',
          },
        ],
        lastUpdated: '2025-01-26',
      },
      {
        id: 'inositol',
        name: 'Inositol Supplementation',
        slug: 'inositol-supplementation',
        category: 'supplement',
        description: 'Myo-inositol and D-chiro-inositol combination.',
        mechanism: 'Acts as insulin sensitizer; restores ovulation in many cases.',
        protocol: ['40:1 ratio (myo:d-chiro), typically 4g myo-inositol daily.'],
        evidenceRating: 'A',
        sources: [
          {
            title: 'Inositol for Polycystic Ovary Syndrome: A Systematic Review and Meta-analysis to Inform the 2023 Update of the International Evidence-based PCOS Guidelines',
            url: 'https://pubmed.ncbi.nlm.nih.gov/38163998/',
            type: 'review',
            year: 2024,
            authors: 'Fitz V, Graca S, Mahalingaiah S, et al.',
          },
        ],
        lastUpdated: '2025-01-26',
      },
      {
        id: 'strength-training-pcos',
        name: 'Resistance Training',
        slug: 'resistance-training-pcos',
        category: 'exercise',
        description: 'Building muscle to improve metabolic health.',
        mechanism: 'Muscle mass increases insulin sensitivity independent of weight loss.',
        protocol: ['2-3 sessions per week of compound movements.'],
        evidenceRating: 'C',
        sources: [
          {
            title: 'Exercise Interventions in Polycystic Ovary Syndrome: A Systematic Review and Meta-Analysis',
            url: 'https://pubmed.ncbi.nlm.nih.gov/32733258/',
            type: 'review',
            year: 2020,
            authors: 'Patten RK, Boyle RA, Moholdt T, et al.',
          },
        ],
        lastUpdated: '2025-01-26',
      },
    ],
    lifestyleFactors: {
      diet: 'Mediterranean-style with low glycaemic focus. Adequate protein at each meal.',
      exercise: 'Mix of strength training and walking. Avoid excessive cardio which can stress hormones.',
      sleep: 'Poor sleep worsens insulin resistance and hormonal imbalance.',
      stress: 'Chronic stress elevates cortisol, worsening symptoms.',
    },
    evidenceRating: 'A', // median([A, A, C]) = A
    disclaimer: 'Work with an endocrinologist or reproductive specialist for fertility concerns.',
    lastUpdated: LAST_UPDATED,
    sources: [
      {
        title: 'International Evidence-Based Guideline for the Assessment and Management of Polycystic Ovary Syndrome 2023',
        url: 'https://pubmed.ncbi.nlm.nih.gov/37164405/',
        type: 'medical_guideline',
        year: 2023,
        authors: 'Teede HJ et al.',
      },
      {
        title: 'Effects of Inositol(s) in Women with PCOS: A Systematic Review of Randomized Controlled Trials',
        url: 'https://pubmed.ncbi.nlm.nih.gov/28012781/',
        type: 'review',
        year: 2017,
        authors: 'Unfer V et al.',
      },
      {
        title: 'NICE Guideline NG217: Fertility Problems — Assessment and Treatment',
        url: 'https://www.nice.org.uk/guidance/ng217',
        type: 'medical_guideline',
        year: 2023,
        authors: 'National Institute for Health and Care Excellence',
      },
    ],
  },

  // --------------------------------------------------------------------------
  // CARDIOVASCULAR (2) — from condition-control
  // --------------------------------------------------------------------------
  {
    id: 'hypertension',
    name: 'Hypertension',
    slug: 'hypertension',
    category: 'cardiovascular',
    tagline: 'The silent killer',
    summary:
      'Chronically high pressure in blood vessels, forcing the heart to work harder.',
    description:
      'Chronically high pressure in blood vessels, forcing the heart to work harder.',
    symptoms: [],
    interventions: [
      {
        id: 'potassium',
        name: 'Potassium Increase',
        slug: 'potassium-increase',
        category: 'diet',
        description: 'Eating more potassium-rich foods (not just cutting salt).',
        mechanism: 'Potassium relaxes blood vessel walls and helps excrete sodium.',
        protocol: ['4700mg/day target via avocados, leafy greens, and potatoes.'],
        evidenceRating: 'A',
        sources: [
          {
            title: 'Effect of increased potassium intake on cardiovascular risk factors and disease: systematic review and meta-analyses',
            url: 'https://pubmed.ncbi.nlm.nih.gov/23558164/',
            type: 'review',
            year: 2013,
            authors: 'Aburto NJ, Hanson S, Gutierrez H, et al.',
          },
        ],
        lastUpdated: '2025-01-26',
      },
      {
        id: 'breathing',
        name: 'Slow Deep Breathing',
        slug: 'slow-deep-breathing',
        category: 'protocol',
        description: 'Resonance breathing exercises.',
        mechanism: 'Increases vagal tone, shifting the nervous system to a parasympathetic state.',
        protocol: ['5-10 mins daily; 5 seconds in, 5 seconds out.'],
        evidenceRating: 'C',
        sources: [
          {
            title: 'Effect of breathing exercises on blood pressure and heart rate: A systematic review and meta-analysis',
            url: 'https://pubmed.ncbi.nlm.nih.gov/38179185/',
            type: 'review',
            year: 2023,
            authors: 'Garg P, Mendiratta A, Banga A, et al.',
          },
        ],
        lastUpdated: '2025-01-26',
      },
    ],
    lifestyleFactors: {
      diet: 'Whole foods, high potassium, adequate magnesium.',
      exercise: 'Zone 2 cardio lowers resting BP over time.',
      sleep: 'Sleep apnea is a major cause of resistant hypertension.',
      stress: 'Chronic stress keeps vasoconstriction active.',
    },
    evidenceRating: 'C', // median([A, C]) = C (index 1 of sorted [A, C])
    disclaimer: 'Monitor BP at home. Do not stop beta-blockers abruptly.',
    lastUpdated: LAST_UPDATED,
    sources: [
      {
        title: '2017 ACC/AHA/AAPA/ABC/ACPM/AGS/APhA/ASH/ASPC/NMA/PCNA Guideline for the Prevention, Detection, Evaluation, and Management of High Blood Pressure in Adults',
        url: 'https://pubmed.ncbi.nlm.nih.gov/29133356/',
        type: 'medical_guideline',
        year: 2017,
        authors: 'Whelton PK et al.',
      },
      {
        title: 'Hypertension Canada 2020 Comprehensive Guidelines for the Prevention, Diagnosis, Risk Assessment, and Treatment of Hypertension',
        url: 'https://pubmed.ncbi.nlm.nih.gov/32249063/',
        type: 'medical_guideline',
        year: 2020,
        authors: 'Rabi DM et al.',
      },
      {
        title: 'Effect of Increased Potassium Intake on Cardiovascular Risk Factors and Disease: Systematic Review and Meta-Analyses',
        url: 'https://pubmed.ncbi.nlm.nih.gov/23558164/',
        type: 'review',
        year: 2013,
        authors: 'Aburto NJ et al.',
      },
    ],
    relatedSymptomSlugs: ['headache', 'vision-changes'],
  },
  {
    id: 'high-cholesterol',
    name: 'High Cholesterol (Dyslipidaemia)',
    slug: 'high-cholesterol',
    category: 'cardiovascular',
    tagline: 'Beyond the numbers',
    summary:
      'Elevated cholesterol, particularly LDL, increases risk of atherosclerosis. Lifestyle factors have major impact.',
    description:
      'Elevated levels of cholesterol, particularly LDL, which increases risk of atherosclerosis and heart disease. Lifestyle factors have major impact.',
    symptoms: [],
    interventions: [
      {
        id: 'fiber-intake',
        name: 'Soluble Fibre Increase',
        slug: 'soluble-fibre-increase',
        category: 'diet',
        description: 'Eating oats, beans, and psyllium.',
        mechanism: 'Soluble fibre binds to cholesterol in the gut, preventing absorption.',
        protocol: ['10-25g soluble fibre daily. Oatmeal, beans, flaxseed, apples.'],
        evidenceRating: 'A',
        sources: [
          {
            title: 'The effect of oat β-glucan on LDL-cholesterol, non-HDL-cholesterol and apoB for CVD risk reduction: a systematic review and meta-analysis of randomised-controlled trials',
            url: 'https://pubmed.ncbi.nlm.nih.gov/27724985/',
            type: 'review',
            year: 2016,
            authors: 'Ho HV, Sievenpiper JL, Zurbau A, et al.',
          },
        ],
        lastUpdated: '2025-01-26',
      },
      {
        id: 'plant-sterols',
        name: 'Plant Sterols/Stanols',
        slug: 'plant-sterols-stanols',
        category: 'supplement',
        description: 'Natural compounds that block cholesterol absorption.',
        mechanism: 'Compete with cholesterol in the intestine, reducing absorption.',
        protocol: ['2g daily via fortified foods or supplements.'],
        evidenceRating: 'A',
        sources: [
          {
            title: 'LDL-cholesterol-lowering effect of plant sterols and stanols across different dose ranges: a meta-analysis of randomised controlled studies',
            url: 'https://pubmed.ncbi.nlm.nih.gov/24780090/',
            type: 'review',
            year: 2014,
            authors: 'Ras RT, Geleijnse JM, Trautwein EA',
          },
        ],
        lastUpdated: '2025-01-26',
      },
      {
        id: 'aerobic-exercise',
        name: 'Aerobic Exercise',
        slug: 'aerobic-exercise',
        category: 'exercise',
        description: 'Regular cardiovascular activity.',
        mechanism: 'Raises HDL, lowers triglycerides, improves LDL particle size.',
        protocol: ['150 mins/week moderate intensity (brisk walking, cycling).'],
        evidenceRating: 'A',
        sources: [
          {
            title: 'The Effect of Exercise Training on Blood Lipids: A Systematic Review and Meta-analysis',
            url: 'https://pubmed.ncbi.nlm.nih.gov/39331324/',
            type: 'review',
            year: 2025,
            authors: 'Smart NA, Downes D, van der Touw T, et al.',
          },
        ],
        lastUpdated: '2025-01-26',
      },
    ],
    lifestyleFactors: {
      diet: 'Limit saturated fat, eliminate trans fat. Emphasize omega-3s, nuts, olive oil.',
      exercise: 'Consistent aerobic activity; resistance training also helps.',
      sleep: 'Sleep apnea worsens lipid profiles.',
      stress: 'Chronic stress can elevate LDL and triglycerides.',
    },
    evidenceRating: 'A', // median([A, A, A]) = A
    disclaimer:
      "Family history matters greatly. Discuss statin therapy with your doctor if lifestyle isn't enough.",
    lastUpdated: LAST_UPDATED,
    sources: [
      {
        title: '2018 AHA/ACC/AACVPR/AAPA/ABC/ACPM/ADA/AGS/APhA/ASPC/NLA/PCNA Guideline on the Management of Blood Cholesterol',
        url: 'https://pubmed.ncbi.nlm.nih.gov/30586774/',
        type: 'medical_guideline',
        year: 2018,
        authors: 'Grundy SM et al.',
      },
      {
        title: 'NICE Guideline CG181: Cardiovascular Disease — Risk Assessment and Reduction, Including Lipid Modification',
        url: 'https://www.nice.org.uk/guidance/cg181',
        type: 'medical_guideline',
        year: 2014,
        authors: 'National Institute for Health and Care Excellence',
      },
      {
        title: 'Cholesterol-Lowering Effects of Plant Sterols and Stanols in Foods: A Systematic Review and Meta-Analysis',
        url: 'https://pubmed.ncbi.nlm.nih.gov/24780090/',
        type: 'review',
        year: 2014,
        authors: 'Ras RT et al.',
      },
    ],
  },

  // --------------------------------------------------------------------------
  // PAIN (2) — from condition-control
  // --------------------------------------------------------------------------
  {
    id: 'migraine',
    name: 'Migraine',
    slug: 'migraine',
    category: 'pain',
    tagline: 'More than a headache',
    summary:
      'A neurological disease causing severe throbbing pain, often with nausea and light sensitivity.',
    description:
      'A neurological disease causing severe throbbing pain, often with nausea and light sensitivity.',
    symptoms: [],
    interventions: [
      {
        id: 'magnesium',
        name: 'Magnesium Supplementation',
        slug: 'magnesium-supplementation',
        category: 'supplement',
        description: 'High dose magnesium glycinate or oxide.',
        mechanism: 'Stabilizes neuronal excitability and vascular tone.',
        protocol: ['400-600mg daily (check with doctor).'],
        evidenceRating: 'A',
        sources: [
          {
            title: 'Effects of selected dietary supplements on migraine prophylaxis: A systematic review and dose-response meta-analysis of randomized controlled trials',
            url: 'https://pubmed.ncbi.nlm.nih.gov/39404918/',
            type: 'review',
            year: 2025,
            authors: 'Talandashti MK, Shahinfar H, Delgarm P, et al.',
          },
        ],
        lastUpdated: '2025-01-26',
      },
      {
        id: 'elimination-diet',
        name: 'Trigger Elimination',
        slug: 'trigger-elimination',
        category: 'diet',
        description: 'Identifying food triggers (aged cheese, wine, MSG).',
        mechanism: 'Reduces inflammatory and excitatory load.',
        protocol: ['Keep a headache diary to spot patterns.'],
        evidenceRating: 'C',
        sources: [
          {
            title: 'The Role of Diet and Nutrition in Migraine Triggers and Treatment: A Systematic Literature Review',
            url: 'https://pubmed.ncbi.nlm.nih.gov/32449944/',
            type: 'review',
            year: 2020,
            authors: 'Hindiyeh NA, Zhang N, Farrar M, et al.',
          },
        ],
        lastUpdated: '2025-01-26',
      },
    ],
    lifestyleFactors: {
      diet: "Stable blood sugar is key; don't skip meals.",
      exercise: 'Regular low-impact cardio.',
      sleep: 'Consistent wake and sleep times are critical for the migraine brain.',
      stress: 'Let-down effect (migraine after stress drops) is common.',
    },
    evidenceRating: 'C', // median([A, C]) = C
    disclaimer: 'Sudden "thunderclap" headaches require emergency care.',
    lastUpdated: LAST_UPDATED,
    sources: [
      {
        title: 'Canadian Headache Society Guideline for Migraine Prophylaxis',
        url: 'https://pubmed.ncbi.nlm.nih.gov/22547960/',
        type: 'medical_guideline',
        year: 2012,
        authors: 'Pringsheim T et al.',
      },
      {
        title: 'NICE Guideline CG150: Headaches in Over 12s — Diagnosis and Management',
        url: 'https://www.nice.org.uk/guidance/cg150',
        type: 'medical_guideline',
        year: 2012,
        authors: 'National Institute for Health and Care Excellence',
      },
      {
        title: 'Magnesium in Migraine Prophylaxis — Is There an Evidence-Based Rationale? A Systematic Review',
        url: 'https://pubmed.ncbi.nlm.nih.gov/28132964/',
        type: 'review',
        year: 2017,
        authors: 'Chiu HY et al.',
      },
    ],
    relatedSymptomSlugs: ['headache'],
  },
  {
    id: 'fibromyalgia',
    name: 'Fibromyalgia',
    slug: 'fibromyalgia',
    category: 'pain',
    tagline: 'Calming the amplified nervous system',
    summary:
      'A chronic condition characterized by widespread musculoskeletal pain, fatigue, and cognitive issues.',
    description:
      'A chronic condition characterized by widespread musculoskeletal pain, fatigue, sleep, and cognitive issues. The brain amplifies pain signals.',
    symptoms: [],
    interventions: [
      {
        id: 'sleep-hygiene',
        name: 'Sleep Optimization',
        slug: 'sleep-optimization',
        category: 'lifestyle',
        description: 'Prioritizing restorative sleep as foundational therapy.',
        mechanism: 'Poor sleep perpetuates pain sensitization; deep sleep is restorative.',
        protocol: ['Strict sleep schedule, dark and cool room, no screens 1hr before bed.'],
        evidenceRating: 'A',
        sources: [
          {
            title: 'Cognitive behavioral therapy for insomnia (CBT-i) in patients with fibromyalgia: a systematic review and meta-analysis',
            url: 'https://pubmed.ncbi.nlm.nih.gov/34297651/',
            type: 'review',
            year: 2022,
            authors: 'Climent-Sanz C, Valenzuela-Pascual F, Martínez-Navarro O, et al.',
          },
        ],
        lastUpdated: '2025-01-26',
      },
      {
        id: 'graded-exercise',
        name: 'Graded Exercise Therapy',
        slug: 'graded-exercise-therapy',
        category: 'exercise',
        description: 'Very gradual increase in activity to avoid flares.',
        mechanism: 'Movement reduces pain sensitivity over time, but too much causes flares.',
        protocol: ['Start with 5-10 min walking, increase by 10% weekly only if tolerated.'],
        evidenceRating: 'A',
        sources: [
          {
            title: 'Effectiveness of Therapeutic Exercise in Fibromyalgia Syndrome: A Systematic Review and Meta-Analysis of Randomized Clinical Trials',
            url: 'https://pubmed.ncbi.nlm.nih.gov/29291206/',
            type: 'review',
            year: 2017,
            authors: 'Sosa-Reina MD, Nunez-Nagy S, Gallego-Izquierdo T, et al.',
          },
        ],
        lastUpdated: '2025-01-26',
      },
      {
        id: 'mindfulness-meditation',
        name: 'Mindfulness & CBT',
        slug: 'mindfulness-cbt',
        category: 'therapy',
        description: 'Cognitive behavioural therapy and mindfulness-based stress reduction.',
        mechanism:
          'Reduces central sensitization and catastrophizing; rewires pain pathways.',
        protocol: ['Daily 10-20 min meditation; structured CBT programme with a therapist.'],
        evidenceRating: 'A',
        sources: [
          {
            title: 'Mindfulness- and acceptance-based interventions for patients with fibromyalgia - A systematic review and meta-analyses',
            url: 'https://pubmed.ncbi.nlm.nih.gov/31479478/',
            type: 'review',
            year: 2019,
            authors: 'Haugmark T, Hagen KB, Smedslund G, et al.',
          },
        ],
        lastUpdated: '2025-01-26',
      },
    ],
    lifestyleFactors: {
      diet: 'Anti-inflammatory focus. Some find relief avoiding gluten or dairy.',
      exercise: 'Low impact only: swimming, walking, gentle yoga. Pacing is critical.',
      sleep: 'Non-negotiable — sleep disorders are extremely common in fibromyalgia.',
      stress: 'Stress is a major flare trigger. Daily relaxation practices are essential.',
    },
    evidenceRating: 'A', // median([A, A, A]) = A
    disclaimer:
      'Fibromyalgia is a real medical condition, not "in your head." Seek a rheumatologist.',
    lastUpdated: LAST_UPDATED,
    sources: [
      {
        title: 'EULAR Revised Recommendations for the Management of Fibromyalgia',
        url: 'https://pubmed.ncbi.nlm.nih.gov/27377815/',
        type: 'medical_guideline',
        year: 2017,
        authors: 'Macfarlane GJ et al.',
      },
      {
        title: 'Canadian Guidelines for the Diagnosis and Management of Fibromyalgia Syndrome',
        url: 'https://pubmed.ncbi.nlm.nih.gov/23070991/',
        type: 'medical_guideline',
        year: 2012,
        authors: 'Fitzcharles MA et al.',
      },
      {
        title: 'Efficacy of Exercise in Fibromyalgia: A Cochrane Systematic Review',
        url: 'https://pubmed.ncbi.nlm.nih.gov/28125080/',
        type: 'review',
        year: 2017,
        authors: 'Bidonde J et al.',
      },
    ],
    relatedSymptomSlugs: ['fatigue', 'joint-pain', 'muscle-cramps'],
  },

  // --------------------------------------------------------------------------
  // DIGESTIVE (15) — from gut-health-deep-dive
  // --------------------------------------------------------------------------
  {
    id: 'ibs',
    name: 'Irritable Bowel Syndrome (IBS)',
    slug: 'ibs',
    category: 'digestive',
    tagline: 'Functional disorder affecting the large intestine',
    summary:
      'Common condition causing cramping, abdominal pain, bloating, gas, and diarrhoea or constipation.',
    description:
      'A common condition affecting the digestive system, causing symptoms like cramping, abdominal pain, bloating, gas, and diarrhoea or constipation.',
    symptoms: [
      { name: 'Abdominal pain', description: 'Cramping or pain related to bowel movements', frequency: 'common' },
      { name: 'Bloating', description: 'Feeling of fullness or swelling', frequency: 'common' },
      { name: 'Altered bowel habits', description: 'Diarrhoea, constipation, or both', frequency: 'common' },
    ],
    interventions: [
      {
        id: 'low-fodmap',
        name: 'Low FODMAP Diet',
        slug: 'low-fodmap-diet',
        category: 'diet',
        description: 'Elimination diet reducing fermentable carbohydrates.',
        evidenceRating: 'A',
        sources: [
          {
            title: 'Efficacy of a low FODMAP diet in irritable bowel syndrome: systematic review and network meta-analysis',
            url: 'https://pubmed.ncbi.nlm.nih.gov/34376515/',
            type: 'review',
            year: 2022,
            authors: 'Black CJ, Staudacher HM, Ford AC',
          },
        ],
        lastUpdated: '2025-01-26',
      },
      {
        id: 'peppermint-oil',
        name: 'Peppermint Oil',
        slug: 'peppermint-oil',
        category: 'supplement',
        description: 'Enteric-coated antispasmodic supplement.',
        evidenceRating: 'A',
        sources: [
          {
            title: 'Systematic review and meta-analysis: efficacy of peppermint oil in irritable bowel syndrome',
            url: 'https://pubmed.ncbi.nlm.nih.gov/35942669/',
            type: 'review',
            year: 2022,
            authors: 'Ingrosso MR, Ianiro G, Nee J, et al.',
          },
        ],
        lastUpdated: '2025-01-26',
      },
      {
        id: 'soluble-fiber-ibs',
        name: 'Soluble Fibre',
        slug: 'soluble-fibre-ibs',
        category: 'supplement',
        description: 'Psyllium husk for IBS-C.',
        evidenceRating: 'B',
        sources: [
          {
            title: 'The effect of fiber supplementation on irritable bowel syndrome: a systematic review and meta-analysis',
            url: 'https://pubmed.ncbi.nlm.nih.gov/25070054/',
            type: 'review',
            year: 2014,
            authors: 'Moayyedi P, Quigley EM, Lacy BE, et al.',
          },
        ],
        lastUpdated: '2025-01-26',
      },
      {
        id: 'rifaximin-ibs',
        name: 'Rifaximin',
        slug: 'rifaximin-ibs',
        category: 'medication',
        description: 'Non-absorbable antibiotic for IBS-D.',
        evidenceRating: 'A',
        sources: [
          {
            title: 'Rifaximin therapy for patients with irritable bowel syndrome without constipation',
            url: 'https://pubmed.ncbi.nlm.nih.gov/21208106/',
            type: 'study',
            year: 2011,
            authors: 'Pimentel M, Lembo A, Chey WD, et al.',
          },
        ],
        lastUpdated: '2025-01-26',
      },
    ],
    dietaryRecommendations: ['Low FODMAP', 'Gluten-free trial', 'Low lactose'],
    testingOptions: ['Rome IV Criteria (clinical diagnosis)', 'Stool tests to rule out inflammation', 'SIBO breath test'],
    evidenceRating: 'A', // median([A, A, B, A]) sorted [A,A,A,B] idx 2 = A
    disclaimer:
      'IBS is a diagnosis of exclusion. Rule out coeliac disease and inflammatory bowel disease with your doctor before starting restrictive diets.',
    lastUpdated: LAST_UPDATED,
    sources: [
      {
        title: 'ACG Clinical Guideline: Management of Irritable Bowel Syndrome',
        url: 'https://pubmed.ncbi.nlm.nih.gov/33315591/',
        type: 'medical_guideline',
        year: 2021,
        authors: 'Lacy BE et al.',
      },
      {
        title: 'NICE Guideline CG61: Irritable Bowel Syndrome in Adults',
        url: 'https://www.nice.org.uk/guidance/cg61',
        type: 'medical_guideline',
        year: 2008,
        authors: 'National Institute for Health and Care Excellence',
      },
      {
        title: 'Diets That Differ in FODMAP Content Alter Colonic Luminal Microenvironment and Symptoms in IBS',
        url: 'https://pubmed.ncbi.nlm.nih.gov/25070051/',
        type: 'study',
        year: 2015,
        authors: 'Halmos EP et al.',
      },
    ],
    relatedSymptomSlugs: ['abdominal-pain', 'diarrhea', 'constipation'],
  },
  {
    id: 'sibo',
    name: 'Small Intestinal Bacterial Overgrowth (SIBO)',
    slug: 'sibo',
    category: 'digestive',
    tagline: "Bacteria where they shouldn't be",
    summary:
      'Excessive bacteria in the small intestine leading to fermentation, gas, and malabsorption.',
    description:
      'Excessive bacteria in the small intestine, leading to fermentation, gas, and malabsorption.',
    symptoms: [
      { name: 'Severe bloating', description: 'Especially after eating', frequency: 'common' },
      { name: 'Abdominal pain', description: 'Discomfort from gas pressure', frequency: 'common' },
      { name: 'Nutrient deficiencies', description: 'B12, iron', frequency: 'occasional' },
    ],
    interventions: [
      {
        id: 'rifaximin-sibo',
        name: 'Rifaximin',
        slug: 'rifaximin-sibo',
        category: 'medication',
        description: 'Non-absorbable antibiotic.',
        evidenceRating: 'A',
        sources: [
          {
            title: 'Systematic review with meta-analysis: rifaximin is effective and safe for the treatment of small intestine bacterial overgrowth',
            url: 'https://pubmed.ncbi.nlm.nih.gov/28078798/',
            type: 'review',
            year: 2017,
            authors: 'Gatta L, Scarpignato C',
          },
        ],
        lastUpdated: '2025-01-26',
      },
      {
        id: 'low-fermentation',
        name: 'Low Fermentation Diet',
        slug: 'low-fermentation-diet',
        category: 'diet',
        description: 'Reduces bacterial fuel.',
        evidenceRating: 'C',
        sources: [
          {
            title: 'Nutritional Approach to Small Intestinal Bacterial Overgrowth: A Narrative Review',
            url: 'https://pubmed.ncbi.nlm.nih.gov/40362719/',
            type: 'review',
            year: 2025,
            authors: 'Velasco-Aburto S, Llama-Palacios A, Sánchez MC, et al.',
          },
        ],
        lastUpdated: '2025-01-26',
      },
      {
        id: 'prokinetics',
        name: 'Prokinetics',
        slug: 'prokinetics',
        category: 'medication',
        description: 'Improves gut motility.',
        evidenceRating: 'B',
        sources: [
          {
            title: 'Small Intestinal Bacterial Overgrowth (SIBO) - Prevention and Therapeutic Role of Nutrition, Prebiotics, Probiotics, and Prokinetics',
            url: 'https://pubmed.ncbi.nlm.nih.gov/40296627/',
            type: 'review',
            year: 2025,
            authors: 'Mustafa F, Noor R, Murtaza A, et al.',
          },
        ],
        lastUpdated: '2025-01-26',
      },
    ],
    dietaryRecommendations: ['Low FODMAP', 'Bi-phasic diet', 'Specific Carbohydrate Diet (SCD)'],
    testingOptions: ['Lactulose Breath Test', 'Glucose Breath Test', 'Jejunal aspirate'],
    evidenceRating: 'B', // median([A, C, B]) sorted [A,B,C] idx 1 = B
    disclaimer: STANDARD_DISCLAIMER + ' Underlying causes must be addressed to prevent relapse.',
    lastUpdated: LAST_UPDATED,
    sources: [
      {
        title: 'ACG Clinical Guideline: Small Intestinal Bacterial Overgrowth',
        url: 'https://pubmed.ncbi.nlm.nih.gov/32023228/',
        type: 'medical_guideline',
        year: 2020,
        authors: 'Pimentel M, Saad RJ, Long MD, et al.',
      },
    ],
    relatedSymptomSlugs: ['abdominal-pain'],
  },
  {
    id: 'gerd',
    name: 'Gastroesophageal Reflux Disease (GERD)',
    slug: 'gerd',
    category: 'digestive',
    tagline: 'Chronic acid reflux',
    summary:
      'Stomach acid frequently flows back into the oesophagus, causing heartburn and potential damage.',
    description:
      'Stomach acid frequently flows back into the tube connecting your mouth and stomach (oesophagus).',
    symptoms: [
      { name: 'Heartburn', description: 'Burning sensation in chest', frequency: 'common' },
      { name: 'Regurgitation', description: 'Sour taste in mouth', frequency: 'common' },
      { name: 'Dysphagia', description: 'Difficulty swallowing', frequency: 'occasional' },
    ],
    interventions: [
      {
        id: 'ppis',
        name: 'PPIs',
        slug: 'proton-pump-inhibitors',
        category: 'medication',
        description: 'Proton Pump Inhibitors.',
        evidenceRating: 'A',
        sources: [
          {
            title: 'Comparing the efficacy of different proton pump inhibitor dosing regimens for the treatment of gastroesophageal reflux disease: a systematic review and meta-analysis',
            url: 'https://pubmed.ncbi.nlm.nih.gov/39673371/',
            type: 'review',
            year: 2025,
            authors: 'Nguyen T, Barnhill K, Zhornitskiy A, et al.',
          },
        ],
        lastUpdated: '2025-01-26',
      },
      {
        id: 'weight-loss-gerd',
        name: 'Weight Loss',
        slug: 'weight-loss-gerd',
        category: 'lifestyle',
        description: 'Reduces abdominal pressure.',
        evidenceRating: 'A',
        sources: [
          {
            title: 'Weight loss can lead to resolution of gastroesophageal reflux disease symptoms: a prospective intervention trial',
            url: 'https://pubmed.ncbi.nlm.nih.gov/23532991/',
            type: 'study',
            year: 2013,
            authors: 'Singh M, Lee J, Gupta N, et al.',
          },
        ],
        lastUpdated: '2025-01-26',
      },
      {
        id: 'head-elevation',
        name: 'Head Elevation',
        slug: 'head-elevation',
        category: 'lifestyle',
        description: 'Sleeping on an incline.',
        evidenceRating: 'B',
        sources: [
          {
            title: 'Head of bed elevation to relieve gastroesophageal reflux symptoms: a systematic review',
            url: 'https://pubmed.ncbi.nlm.nih.gov/33468060/',
            type: 'review',
            year: 2021,
            authors: 'Albarqouni L, Moynihan R, Clark J, et al.',
          },
        ],
        lastUpdated: '2025-01-26',
      },
    ],
    dietaryRecommendations: ['Avoid triggers (spicy, acidic, caffeine, alcohol)', 'Smaller meals'],
    testingOptions: ['Endoscopy', 'pH monitoring'],
    evidenceRating: 'A', // median([A, A, B]) sorted [A,A,B] idx 1 = A
    disclaimer:
      "Chronic GERD can lead to Barrett's oesophagus. See a GI specialist if symptoms persist.",
    lastUpdated: LAST_UPDATED,
    sources: [
      {
        title: 'ACG Clinical Guideline for the Diagnosis and Management of Gastroesophageal Reflux Disease',
        url: 'https://pubmed.ncbi.nlm.nih.gov/34807007/',
        type: 'medical_guideline',
        year: 2022,
        authors: 'Katz PO et al.',
      },
      {
        title: 'NICE Guideline NG12: Suspected Cancer — Recognition and Referral (oesophageal section)',
        url: 'https://www.nice.org.uk/guidance/ng12',
        type: 'medical_guideline',
        year: 2015,
        authors: 'National Institute for Health and Care Excellence',
      },
      {
        title: 'Management of Gastroesophageal Reflux Disease: Canadian Association of Gastroenterology Clinical Practice Guideline',
        url: 'https://pubmed.ncbi.nlm.nih.gov/15825745/',
        type: 'medical_guideline',
        year: 2005,
        authors: 'Armstrong D et al.',
      },
    ],
    relatedSymptomSlugs: ['chest-pain'],
  },
  {
    id: 'ibd-crohns',
    name: "Crohn's Disease",
    slug: 'crohns-disease',
    category: 'digestive',
    tagline: 'Chronic inflammation of the digestive tract',
    summary:
      'Inflammatory bowel disease causing inflammation throughout the digestive tract, with pain, diarrhoea, and weight loss.',
    description:
      'An inflammatory bowel disease (IBD) causing inflammation of your digestive tract, which can lead to abdominal pain, severe diarrhoea, fatigue, weight loss and malnutrition.',
    symptoms: [
      { name: 'Diarrhoea', description: 'Persistent and severe', frequency: 'common' },
      { name: 'Abdominal pain', description: 'Cramping and pain', frequency: 'common' },
      { name: 'Weight loss', description: 'Unintentional', frequency: 'common' },
    ],
    interventions: [
      {
        id: 'biologics-crohns',
        name: 'Biologics',
        slug: 'biologics-crohns',
        category: 'medication',
        description: 'Targeted immune therapies (e.g. infliximab).',
        evidenceRating: 'A',
        sources: [
          {
            title: 'Tumor necrosis factor-alpha antibodies (infliximab, adalimumab and certolizumab) in Crohn\'s disease: systematic review and meta-analysis',
            url: 'https://pubmed.ncbi.nlm.nih.gov/24273556/',
            type: 'review',
            year: 2013,
            authors: 'Kawalec P, Mikrut A, Wisniewska N, et al.',
          },
        ],
        lastUpdated: '2025-01-26',
      },
      {
        id: 'corticosteroids-crohns',
        name: 'Corticosteroids',
        slug: 'corticosteroids-crohns',
        category: 'medication',
        description: 'Reduce inflammation acutely.',
        evidenceRating: 'A',
        sources: [
          {
            title: 'Traditional corticosteroids for induction of remission in Crohn\'s disease',
            url: 'https://pubmed.ncbi.nlm.nih.gov/18425970/',
            type: 'review',
            year: 2008,
            authors: 'Benchimol EI, Seow CH, Steinhart AH, et al.',
          },
        ],
        lastUpdated: '2025-01-26',
      },
      {
        id: 'enteral-nutrition',
        name: 'Enteral Nutrition',
        slug: 'enteral-nutrition',
        category: 'diet',
        description: 'Liquid diet therapy.',
        evidenceRating: 'B',
        sources: [
          {
            title: 'Enteral nutritional therapy for induction of remission in Crohn\'s disease',
            url: 'https://pubmed.ncbi.nlm.nih.gov/29607496/',
            type: 'review',
            year: 2018,
            authors: 'Narula N, Dhillon A, Zhang D, et al.',
          },
        ],
        lastUpdated: '2025-01-26',
      },
    ],
    dietaryRecommendations: ['Low residue during flares', 'High protein', 'Correct deficiencies'],
    testingOptions: ['Colonoscopy', 'MRI/CT enterography', 'Calprotectin (stool)'],
    evidenceRating: 'A', // median([A, A, B]) idx 1 = A
    disclaimer:
      'Complex autoimmune condition requiring lifelong management. Smoking cessation is critical. Work with a gastroenterologist.',
    lastUpdated: LAST_UPDATED,
    sources: [
      {
        title: 'ACG Clinical Guideline: Management of Crohn\'s Disease in Adults',
        url: 'https://pubmed.ncbi.nlm.nih.gov/29610508/',
        type: 'medical_guideline',
        year: 2018,
        authors: 'Lichtenstein GR et al.',
      },
      {
        title: 'NICE Guideline NG129: Crohn\'s Disease — Management',
        url: 'https://www.nice.org.uk/guidance/ng129',
        type: 'medical_guideline',
        year: 2019,
        authors: 'National Institute for Health and Care Excellence',
      },
      {
        title: 'ECCO Guidelines on Therapeutics in Crohn\'s Disease: Medical Treatment',
        url: 'https://pubmed.ncbi.nlm.nih.gov/31711158/',
        type: 'medical_guideline',
        year: 2020,
        authors: 'Torres J et al.',
      },
    ],
    relatedSymptomSlugs: ['abdominal-pain', 'diarrhea', 'fatigue'],
  },
  {
    id: 'ibd-uc',
    name: 'Ulcerative Colitis',
    slug: 'ulcerative-colitis',
    category: 'digestive',
    tagline: 'Inflammation of the colon and rectum',
    summary:
      'Inflammatory bowel disease causing ulcers in the colon and rectum with bleeding and urgency.',
    description:
      'An inflammatory bowel disease that causes inflammation and ulcers in your digestive tract. It affects the innermost lining of your large intestine (colon) and rectum.',
    symptoms: [
      { name: 'Rectal bleeding', description: 'Blood in stool', frequency: 'common' },
      { name: 'Diarrhoea', description: 'Often with blood or pus', frequency: 'common' },
      { name: 'Urgency', description: 'Inability to hold stool', frequency: 'common' },
    ],
    interventions: [
      {
        id: '5-asas',
        name: '5-ASAs',
        slug: '5-asas',
        category: 'medication',
        description: 'Anti-inflammatory drugs (mesalamine).',
        evidenceRating: 'A',
        sources: [
          {
            title: 'Efficacy of Oral, Topical, or Combined Oral and Topical 5-Aminosalicylates, in Ulcerative Colitis: Systematic Review and Network Meta-analysis',
            url: 'https://pubmed.ncbi.nlm.nih.gov/33433562/',
            type: 'review',
            year: 2021,
            authors: 'Barberio B, Segal JP, Quraishi MN, et al.',
          },
        ],
        lastUpdated: '2025-01-26',
      },
      {
        id: 'biologics-uc',
        name: 'Biologics',
        slug: 'biologics-uc',
        category: 'medication',
        description: 'Targeted immune therapies.',
        evidenceRating: 'A',
        sources: [
          {
            title: 'Systematic Review with Network Meta-Analysis: Comparative Efficacy of Biologics in the Treatment of Moderately to Severely Active Ulcerative Colitis',
            url: 'https://pubmed.ncbi.nlm.nih.gov/27776175/',
            type: 'review',
            year: 2016,
            authors: 'Vickers AD, Ainsworth C, Mody R, et al.',
          },
        ],
        lastUpdated: '2025-01-26',
      },
      {
        id: 'curcumin',
        name: 'Curcumin',
        slug: 'curcumin',
        category: 'supplement',
        description: 'Adjunctive anti-inflammatory therapy.',
        evidenceRating: 'B',
        sources: [
          {
            title: 'Safety and efficacy of curcumin in the treatment of ulcerative colitis: An updated systematic review and meta-analysis of randomized controlled trials',
            url: 'https://pubmed.ncbi.nlm.nih.gov/39612780/',
            type: 'review',
            year: 2025,
            authors: 'Peng Z, Li D, Wu N, et al.',
          },
        ],
        lastUpdated: '2025-01-26',
      },
    ],
    dietaryRecommendations: ['Low residue during flares', 'Avoid triggers'],
    testingOptions: ['Colonoscopy', 'Calprotectin'],
    evidenceRating: 'A', // median([A, A, B]) idx 1 = A
    disclaimer:
      "Similar to Crohn's but limited to the colon. Lifelong management with a gastroenterologist.",
    lastUpdated: LAST_UPDATED,
    sources: [
      {
        title: 'ACG Clinical Guideline: Ulcerative Colitis in Adults',
        url: 'https://pubmed.ncbi.nlm.nih.gov/30840605/',
        type: 'medical_guideline',
        year: 2019,
        authors: 'Rubin DT et al.',
      },
      {
        title: 'NICE Guideline NG130: Ulcerative Colitis — Management',
        url: 'https://www.nice.org.uk/guidance/ng130',
        type: 'medical_guideline',
        year: 2019,
        authors: 'National Institute for Health and Care Excellence',
      },
      {
        title: 'ECCO Guidelines on Therapeutics in Ulcerative Colitis: Medical Treatment',
        url: 'https://pubmed.ncbi.nlm.nih.gov/35226428/',
        type: 'medical_guideline',
        year: 2022,
        authors: 'Raine T et al.',
      },
    ],
    relatedSymptomSlugs: ['abdominal-pain', 'diarrhea'],
  },
  {
    id: 'lactose-intolerance',
    name: 'Lactose Intolerance',
    slug: 'lactose-intolerance',
    category: 'digestive',
    tagline: 'Inability to digest milk sugar',
    summary:
      'Deficiency of lactase enzyme leading to digestive symptoms after consuming dairy.',
    description:
      'Deficiency of lactase enzyme leading to digestive symptoms after consuming dairy.',
    symptoms: [
      { name: 'Gas', description: 'Excessive gas', frequency: 'common' },
      { name: 'Bloating', description: 'Abdominal distension', frequency: 'common' },
      { name: 'Diarrhoea', description: 'Loose stools after dairy', frequency: 'common' },
    ],
    interventions: [
      {
        id: 'lactase-enzyme',
        name: 'Lactase Enzyme',
        slug: 'lactase-enzyme',
        category: 'supplement',
        description: 'Supplement taken with dairy.',
        evidenceRating: 'A',
        sources: [
          {
            title: 'Update on lactose malabsorption and intolerance: pathogenesis, diagnosis and clinical management',
            url: 'https://pubmed.ncbi.nlm.nih.gov/31427404/',
            type: 'review',
            year: 2019,
            authors: 'Misselwitz B, Butter M, Verbeke K, et al.',
          },
        ],
        lastUpdated: '2025-01-26',
      },
      {
        id: 'lactose-avoidance',
        name: 'Avoidance',
        slug: 'lactose-avoidance',
        category: 'diet',
        description: 'Removing lactose from diet.',
        evidenceRating: 'A',
        sources: [
          {
            title: 'Systematic review: effective management strategies for lactose intolerance',
            url: 'https://pubmed.ncbi.nlm.nih.gov/20404262/',
            type: 'review',
            year: 2010,
            authors: 'Shaukat A, Levitt MD, Taylor BC, et al.',
          },
        ],
        lastUpdated: '2025-01-26',
      },
      {
        id: 'lactose-free-dairy',
        name: 'Lactose-free Dairy',
        slug: 'lactose-free-dairy',
        category: 'diet',
        description: 'Pre-treated dairy products.',
        evidenceRating: 'A',
        sources: [
          {
            title: 'Systematic review: effective management strategies for lactose intolerance',
            url: 'https://pubmed.ncbi.nlm.nih.gov/20404262/',
            type: 'review',
            year: 2010,
            authors: 'Shaukat A, Levitt MD, Taylor BC, et al.',
          },
        ],
        lastUpdated: '2025-01-26',
      },
    ],
    dietaryRecommendations: ['Lactose-free milk', 'Hard cheeses (low lactose)', 'Yoghurt (often tolerated)'],
    testingOptions: ['Hydrogen Breath Test', 'Elimination and reintroduction'],
    evidenceRating: 'A', // median([A, A, A]) = A
    disclaimer: STANDARD_DISCLAIMER,
    lastUpdated: LAST_UPDATED,
    sources: [
      {
        title: 'NIH Consensus Development Conference Statement: Lactose Intolerance and Health',
        url: 'https://pubmed.ncbi.nlm.nih.gov/20186234/',
        type: 'medical_guideline',
        year: 2010,
        authors: 'National Institutes of Health',
      },
      {
        title: 'Systematic Review: Effective Management Strategies for Lactose Intolerance',
        url: 'https://pubmed.ncbi.nlm.nih.gov/20404262/',
        type: 'review',
        year: 2010,
        authors: 'Shaukat A et al.',
      },
    ],
    relatedSymptomSlugs: ['abdominal-pain', 'diarrhea'],
  },
  {
    id: 'celiac',
    name: 'Coeliac Disease',
    slug: 'celiac-disease',
    category: 'digestive',
    tagline: 'Autoimmune reaction to gluten',
    summary:
      'An immune reaction to eating gluten that damages the small intestine lining and prevents nutrient absorption.',
    description:
      'An immune reaction to eating gluten (a protein in wheat, barley, and rye). Over time the immune reaction damages the small intestine lining and prevents nutrient absorption.',
    symptoms: [
      { name: 'Diarrhoea', description: 'Chronic digestive issues', frequency: 'common' },
      { name: 'Fatigue', description: 'Systemic tiredness', frequency: 'common' },
      { name: 'Anaemia', description: 'Iron deficiency', frequency: 'common' },
    ],
    interventions: [
      {
        id: 'gluten-free-diet',
        name: 'Gluten-Free Diet',
        slug: 'gluten-free-diet',
        category: 'diet',
        description: 'Strict lifelong avoidance of wheat, barley, and rye.',
        evidenceRating: 'A',
        sources: [
          {
            title: 'Younger age at diagnosis predisposes to mucosal recovery in celiac disease on a gluten-free diet: A meta-analysis',
            url: 'https://pubmed.ncbi.nlm.nih.gov/29095937/',
            type: 'review',
            year: 2017,
            authors: 'Szakacs Z, Matrai P, Hegyi P, et al.',
          },
        ],
        lastUpdated: '2025-01-26',
      },
    ],
    dietaryRecommendations: ['Strict avoidance of wheat, barley, rye', 'Watch for cross-contamination'],
    testingOptions: ['tTG-IgA Antibody Test', 'Endoscopy with biopsy (gold standard)'],
    evidenceRating: 'A',
    disclaimer:
      STANDARD_DISCLAIMER + ' Diagnosis must be confirmed BEFORE starting a gluten-free diet, otherwise testing becomes unreliable.',
    lastUpdated: LAST_UPDATED,
    sources: [
      {
        title: 'ACG Clinical Guideline: Diagnosis and Management of Celiac Disease',
        url: 'https://pubmed.ncbi.nlm.nih.gov/23609613/',
        type: 'medical_guideline',
        year: 2013,
        authors: 'Rubio-Tapia A et al.',
      },
      {
        title: 'NICE Guideline NG20: Coeliac Disease — Recognition, Assessment and Management',
        url: 'https://www.nice.org.uk/guidance/ng20',
        type: 'medical_guideline',
        year: 2015,
        authors: 'National Institute for Health and Care Excellence',
      },
      {
        title: 'European Society Paediatric Gastroenterology, Hepatology and Nutrition Guidelines for Diagnosing Coeliac Disease 2020',
        url: 'https://pubmed.ncbi.nlm.nih.gov/31568141/',
        type: 'medical_guideline',
        year: 2020,
        authors: 'Husby S et al.',
      },
    ],
    relatedSymptomSlugs: ['diarrhea', 'fatigue', 'abdominal-pain'],
  },
  {
    id: 'ncgs',
    name: 'Non-Coeliac Gluten Sensitivity',
    slug: 'ncgs',
    category: 'digestive',
    tagline: 'Gluten sensitivity without coeliac disease',
    summary:
      'Coeliac-like symptoms that improve on a gluten-free diet, after coeliac and wheat allergy have been ruled out.',
    description:
      'Symptoms similar to coeliac disease that improve on a gluten-free diet, after coeliac and wheat allergy have been ruled out.',
    symptoms: [
      { name: 'Brain fog', description: 'Cognitive cloudiness', frequency: 'common' },
      { name: 'Bloating', description: 'Abdominal discomfort', frequency: 'common' },
      { name: 'Fatigue', description: 'Tiredness after eating gluten', frequency: 'common' },
    ],
    interventions: [
      {
        id: 'gluten-free-ncgs',
        name: 'Gluten-Free Diet',
        slug: 'gluten-free-ncgs',
        category: 'diet',
        description: 'Avoidance of gluten.',
        evidenceRating: 'B',
        sources: [
          {
            title: 'Suspected Nonceliac Gluten Sensitivity Confirmed in Few Patients After Gluten Challenge in Double-Blind, Placebo-Controlled Trials',
            url: 'https://pubmed.ncbi.nlm.nih.gov/27523634/',
            type: 'review',
            year: 2017,
            authors: 'Molina-Infante J, Carroccio A',
          },
        ],
        lastUpdated: '2025-01-26',
      },
      {
        id: 'low-fodmap-ncgs',
        name: 'Low FODMAP',
        slug: 'low-fodmap-ncgs',
        category: 'diet',
        description: 'Many respond to fructan reduction.',
        evidenceRating: 'B',
        sources: [
          {
            title: 'Fructan, Rather Than Gluten, Induces Symptoms in Patients With Self-Reported Non-Celiac Gluten Sensitivity',
            url: 'https://pubmed.ncbi.nlm.nih.gov/29102613/',
            type: 'study',
            year: 2018,
            authors: 'Skodje GI, Sarna VK, Minelle IH, et al.',
          },
        ],
        lastUpdated: '2025-01-26',
      },
    ],
    dietaryRecommendations: ['Gluten reduction or elimination'],
    testingOptions: ['Diagnosis of exclusion'],
    evidenceRating: 'B',
    disclaimer:
      STANDARD_DISCLAIMER + ' Rule out coeliac disease before starting a gluten-free diet.',
    lastUpdated: LAST_UPDATED,
    sources: [
      {
        title: 'Systematic review: noncoeliac gluten sensitivity',
        url: 'https://pubmed.ncbi.nlm.nih.gov/25753138/',
        type: 'review',
        year: 2015,
        authors: 'Molina-Infante J, Santolaria S, Sanders DS, et al.',
      },
    ],
    relatedSymptomSlugs: ['fatigue', 'abdominal-pain'],
  },
  {
    id: 'histamine-intolerance',
    name: 'Histamine Intolerance',
    slug: 'histamine-intolerance',
    category: 'digestive',
    tagline: 'Reaction to dietary histamine',
    summary:
      'Accumulation of histamine in the body due to impaired breakdown (DAO enzyme deficiency).',
    description:
      'Accumulation of histamine in the body due to impaired breakdown (DAO enzyme deficiency).',
    symptoms: [
      { name: 'Headaches', description: 'Often migraine-like', frequency: 'common' },
      { name: 'Flushing', description: 'Redness of skin', frequency: 'common' },
      { name: 'Digestive issues', description: 'Diarrhoea, cramps', frequency: 'common' },
    ],
    interventions: [
      {
        id: 'low-histamine-diet',
        name: 'Low Histamine Diet',
        slug: 'low-histamine-diet',
        category: 'diet',
        description: 'Avoiding aged and fermented foods.',
        evidenceRating: 'B',
        sources: [
          {
            title: 'Histamine Intolerance: The Current State of the Art',
            url: 'https://pubmed.ncbi.nlm.nih.gov/32824107/',
            type: 'review',
            year: 2020,
            authors: 'Comas-Basté O, Sánchez-Pérez S, Veciana-Nogués MT, et al.',
          },
        ],
        lastUpdated: '2025-01-26',
      },
      {
        id: 'dao-enzyme',
        name: 'DAO Enzyme',
        slug: 'dao-enzyme',
        category: 'supplement',
        description: 'Supplement to aid histamine breakdown.',
        evidenceRating: 'C',
        sources: [
          {
            title: 'Diamine oxidase deficiency implications for health, current management, and future directions in the treatment of histamine intolerance: A review',
            url: 'https://pubmed.ncbi.nlm.nih.gov/40865824/',
            type: 'review',
            year: 2025,
            authors: 'Alemany-Fornés M, Bori J, Muguerza B, et al.',
          },
        ],
        lastUpdated: '2025-01-26',
      },
    ],
    dietaryRecommendations: ['Avoid aged cheese, wine, fermented foods, cured meats'],
    testingOptions: ['Serum DAO activity', 'Elimination diet'],
    evidenceRating: 'C', // median([B, C]) idx 1 = C
    disclaimer: STANDARD_DISCLAIMER + ' Clinical recognition is growing but high-quality trials are limited.',
    lastUpdated: LAST_UPDATED,
    sources: [
      {
        title: 'Histamine intolerance: the current state of the art',
        url: 'https://pubmed.ncbi.nlm.nih.gov/32824107/',
        type: 'review',
        year: 2020,
        authors: 'Comas-Baste O, Sanchez-Perez S, Veciana-Nogues MT, et al.',
      },
    ],
    relatedSymptomSlugs: ['headache', 'diarrhea'],
  },
  {
    id: 'dysbiosis',
    name: 'Gut Dysbiosis',
    slug: 'dysbiosis',
    category: 'digestive',
    tagline: 'Imbalanced gut flora',
    summary:
      'Reduction in microbial diversity with loss of beneficial bacteria and rise in pathogenic bacteria.',
    description:
      'A reduction in microbial diversity or loss of beneficial bacteria and rise in pathogenic bacteria.',
    symptoms: [
      { name: 'Digestive irregularity', description: 'Inconsistent bowel movements', frequency: 'common' },
      { name: 'Bloating', description: 'Gas production', frequency: 'common' },
    ],
    interventions: [
      {
        id: 'probiotics',
        name: 'Probiotics',
        slug: 'probiotics',
        category: 'supplement',
        description: 'Specific strains proven for specific conditions.',
        evidenceRating: 'B',
        sources: [
          {
            title: 'Probiotics fortify intestinal barrier function: a systematic review and meta-analysis of randomized trials',
            url: 'https://pubmed.ncbi.nlm.nih.gov/37168869/',
            type: 'review',
            year: 2023,
            authors: 'Zheng Y, Zhang Z, Tang P, et al.',
          },
        ],
        lastUpdated: '2025-01-26',
      },
      {
        id: 'prebiotics',
        name: 'Prebiotics',
        slug: 'prebiotics',
        category: 'diet',
        description: 'Fibres that feed beneficial bacteria.',
        evidenceRating: 'B',
        sources: [
          {
            title: 'The effects of inulin on gut microbial composition: a systematic review of evidence from human studies',
            url: 'https://pubmed.ncbi.nlm.nih.gov/31707507/',
            type: 'review',
            year: 2020,
            authors: 'Le Bastard Q, Chapelet G, Javaudin F, et al.',
          },
        ],
        lastUpdated: '2025-01-26',
      },
      {
        id: 'fermented-foods',
        name: 'Fermented Foods',
        slug: 'fermented-foods',
        category: 'diet',
        description: 'Yoghurt, kefir, kimchi, sauerkraut.',
        evidenceRating: 'B',
        sources: [
          {
            title: 'Gut-microbiota-targeted diets modulate human immune status',
            url: 'https://pubmed.ncbi.nlm.nih.gov/34256014/',
            type: 'study',
            year: 2021,
            authors: 'Wastyk HC, Fragiadakis GK, Perelman D, et al.',
          },
        ],
        lastUpdated: '2025-01-26',
      },
    ],
    dietaryRecommendations: ['High fibre', 'Diverse plant foods (30+ per week)', 'Polyphenols'],
    testingOptions: ['Stool microbiome analysis (commercial tests have limitations)'],
    evidenceRating: 'B',
    disclaimer: STANDARD_DISCLAIMER,
    lastUpdated: LAST_UPDATED,
    sources: [
      {
        title: 'Gut microbiome health and dysbiosis: a clinical primer',
        url: 'https://pubmed.ncbi.nlm.nih.gov/36168753/',
        type: 'review',
        year: 2022,
        authors: 'Bidell MR, Hobbs ALV, Lodise TP',
      },
    ],
    relatedSymptomSlugs: ['abdominal-pain'],
  },
  {
    id: 'leaky-gut',
    name: 'Increased Intestinal Permeability',
    slug: 'leaky-gut',
    category: 'digestive',
    tagline: 'Compromised gut barrier',
    summary:
      'Gaps in the gut lining allow bacteria and toxins into the bloodstream. Medical term: increased intestinal permeability.',
    description:
      'Medical term is "increased intestinal permeability." Gaps in the gut lining allow bacteria and toxins into the bloodstream.',
    symptoms: [
      { name: 'Food sensitivities', description: 'New reactions to foods', frequency: 'common' },
      { name: 'Systemic inflammation', description: 'Joint pain, fatigue', frequency: 'common' },
    ],
    interventions: [
      {
        id: 'l-glutamine',
        name: 'L-Glutamine',
        slug: 'l-glutamine',
        category: 'supplement',
        description: 'Fuel for enterocytes.',
        evidenceRating: 'C',
        sources: [
          {
            title: 'A systematic review and meta-analysis of clinical trials on the effects of glutamine supplementation on gut permeability in adults',
            url: 'https://pubmed.ncbi.nlm.nih.gov/39397201/',
            type: 'review',
            year: 2024,
            authors: 'Abbasi F, Haghighat Lari MM, Khosravi GR, et al.',
          },
        ],
        lastUpdated: '2025-01-26',
      },
      {
        id: 'zinc-carnosine',
        name: 'Zinc Carnosine',
        slug: 'zinc-carnosine',
        category: 'supplement',
        description: 'Supports mucosal integrity.',
        evidenceRating: 'C',
        sources: [
          {
            title: 'The role of Zinc L-Carnosine in the prevention and treatment of gastrointestinal mucosal disease in humans: a review',
            url: 'https://pubmed.ncbi.nlm.nih.gov/35659631/',
            type: 'review',
            year: 2022,
            authors: 'Efthymakis K, Neri M',
          },
        ],
        lastUpdated: '2025-01-26',
      },
    ],
    dietaryRecommendations: ['Anti-inflammatory diet', 'Avoid alcohol'],
    testingOptions: ['Lactulose/mannitol test'],
    evidenceRating: 'C',
    disclaimer:
      STANDARD_DISCLAIMER +
      ' "Leaky Gut Syndrome" as a standalone cause of all illness is not medically accepted, though increased intestinal permeability is recognized in coeliac and Crohn\'s.',
    lastUpdated: LAST_UPDATED,
    sources: [
      {
        title: 'Leaky gut and autoimmune diseases',
        url: 'https://pubmed.ncbi.nlm.nih.gov/22109896/',
        type: 'review',
        year: 2012,
        authors: 'Fasano A',
      },
    ],
    relatedSymptomSlugs: ['joint-pain', 'fatigue'],
  },
  {
    id: 'gastritis',
    name: 'Gastritis',
    slug: 'gastritis',
    category: 'digestive',
    tagline: 'Stomach inflammation',
    summary: 'Inflammation of the protective lining of the stomach.',
    description: 'Inflammation of the protective lining of the stomach.',
    symptoms: [
      { name: 'Gnawing pain', description: 'Upper abdomen', frequency: 'common' },
      { name: 'Nausea', description: 'Feeling sick', frequency: 'common' },
    ],
    interventions: [
      {
        id: 'eradicate-h-pylori',
        name: 'Eradicate H. pylori',
        slug: 'eradicate-h-pylori',
        category: 'medication',
        description: 'Triple therapy antibiotics if H. pylori is present.',
        evidenceRating: 'A',
        sources: [
          {
            title: 'Empiric quadruple vs. triple therapy for primary treatment of Helicobacter pylori infection: Systematic review and meta-analysis of efficacy and tolerability',
            url: 'https://pubmed.ncbi.nlm.nih.gov/19755966/',
            type: 'review',
            year: 2010,
            authors: 'Luther J, Higgins PD, Schoenfeld PS, et al.',
          },
        ],
        lastUpdated: '2025-01-26',
      },
      {
        id: 'acid-suppression',
        name: 'Acid Suppression',
        slug: 'acid-suppression',
        category: 'medication',
        description: 'Allow the stomach lining to heal.',
        evidenceRating: 'A',
        sources: [
          {
            title: 'Comparing the Safety and Efficacy of Proton Pump Inhibitors and Histamine-2 Receptor Antagonists in the Management of Patients With Peptic Ulcer Disease: A Systematic Review',
            url: 'https://pubmed.ncbi.nlm.nih.gov/37779765/',
            type: 'review',
            year: 2023,
            authors: 'Begg M, Tarhuni M, Fotso MN, et al.',
          },
        ],
        lastUpdated: '2025-01-26',
      },
    ],
    dietaryRecommendations: ['Bland diet', 'Avoid irritants'],
    testingOptions: ['Endoscopy', 'H. pylori breath or stool test'],
    evidenceRating: 'A',
    disclaimer:
      STANDARD_DISCLAIMER +
      ' H. pylori is a major cause and treating it prevents ulcers and stomach cancer.',
    lastUpdated: LAST_UPDATED,
    sources: [
      {
        title: 'ACG Clinical Guideline: Treatment of Helicobacter pylori Infection',
        url: 'https://pubmed.ncbi.nlm.nih.gov/39626064/',
        type: 'medical_guideline',
        year: 2024,
        authors: 'Chey WD, Howden CW, Moss SF, et al.',
      },
    ],
    relatedSymptomSlugs: ['abdominal-pain', 'nausea'],
  },
  {
    id: 'diverticulitis',
    name: 'Diverticulitis',
    slug: 'diverticulitis',
    category: 'digestive',
    tagline: 'Inflamed pouches in the colon',
    summary: 'Infection or inflammation of pouches (diverticula) in the intestines.',
    description:
      'Infection or inflammation of pouches (diverticula) that can form in your intestines.',
    symptoms: [
      { name: 'Pain', description: 'Lower left side typically', frequency: 'common' },
      { name: 'Fever', description: 'Signs of infection', frequency: 'common' },
    ],
    interventions: [
      {
        id: 'antibiotics-diverticulitis',
        name: 'Antibiotics',
        slug: 'antibiotics-diverticulitis',
        category: 'medication',
        description: 'For acute infection.',
        evidenceRating: 'A',
        sources: [
          {
            title: 'Antibiotics for uncomplicated diverticulitis',
            url: 'https://pubmed.ncbi.nlm.nih.gov/35731704/',
            type: 'review',
            year: 2022,
            authors: 'Dichman ML, Rosenstock SJ, Shabanzadeh DM',
          },
        ],
        lastUpdated: '2025-01-26',
      },
      {
        id: 'liquid-diet',
        name: 'Liquid Diet',
        slug: 'liquid-diet',
        category: 'diet',
        description: 'Bowel rest during acute phase.',
        evidenceRating: 'B',
        sources: [
          {
            title: 'Acute Diverticulitis Management',
            url: 'https://pubmed.ncbi.nlm.nih.gov/29413216/',
            type: 'review',
            year: 2018,
            authors: 'Ellison DL',
          },
        ],
        lastUpdated: '2025-01-26',
      },
    ],
    dietaryRecommendations: ['High fibre (prevention)', 'Low fibre (acute flare)'],
    testingOptions: ['CT Scan'],
    evidenceRating: 'B', // median([A, B]) idx 1 = B
    disclaimer:
      STANDARD_DISCLAIMER + ' Old advice to avoid nuts and seeds has been debunked.',
    lastUpdated: LAST_UPDATED,
    sources: [
      {
        title: 'AGA Clinical Practice Update on Medical Management of Colonic Diverticulitis: Expert Review',
        url: 'https://pubmed.ncbi.nlm.nih.gov/33279517/',
        type: 'medical_guideline',
        year: 2021,
        authors: 'Peery AF, Shaukat A, Strate LL',
      },
    ],
    relatedSymptomSlugs: ['abdominal-pain', 'fever'],
  },
  {
    id: 'candida',
    name: 'Candida Overgrowth',
    slug: 'candida',
    category: 'digestive',
    tagline: 'Yeast overgrowth',
    summary: 'Overgrowth of Candida albicans yeast in the gut.',
    description: 'Overgrowth of Candida albicans yeast in the gut.',
    symptoms: [
      { name: 'Sugar cravings', description: 'Intense desire for sweets', frequency: 'common' },
      { name: 'Fatigue', description: 'Tiredness', frequency: 'common' },
    ],
    interventions: [
      {
        id: 'antifungals',
        name: 'Antifungals',
        slug: 'antifungals',
        category: 'medication',
        description: 'Fluconazole or herbal antifungals.',
        evidenceRating: 'B',
        sources: [
          {
            title: 'Small intestinal fungal overgrowth',
            url: 'https://pubmed.ncbi.nlm.nih.gov/25786900/',
            type: 'review',
            year: 2015,
            authors: 'Erdogan A, Rao SSC',
          },
        ],
        lastUpdated: '2025-01-26',
      },
      {
        id: 'low-sugar-diet',
        name: 'Low Sugar Diet',
        slug: 'low-sugar-diet',
        category: 'diet',
        description: 'Starving the yeast.',
        evidenceRating: 'C',
        sources: [
          {
            title: 'Review article: fungal alterations in inflammatory bowel diseases',
            url: 'https://pubmed.ncbi.nlm.nih.gov/31648369/',
            type: 'review',
            year: 2019,
            authors: 'Lam S, Zuo T, Ho M, et al.',
          },
        ],
        lastUpdated: '2025-01-26',
      },
    ],
    dietaryRecommendations: ['Sugar elimination', 'Limit refined carbs'],
    testingOptions: ['Stool test', 'OAT test (controversial)'],
    evidenceRating: 'C', // median([B, C]) idx 1 = C
    disclaimer:
      STANDARD_DISCLAIMER +
      ' Systemic candidiasis is rare and serious. Gut candida as a cause of vague symptoms is controversial in conventional medicine.',
    lastUpdated: LAST_UPDATED,
    sources: [
      {
        title: 'Small Intestinal Bacterial and Fungal Overgrowth: Health Implications and Management Perspectives',
        url: 'https://pubmed.ncbi.nlm.nih.gov/40284229/',
        type: 'review',
        year: 2025,
        authors: 'Soliman N, Kruithoff C, San Valentin EM, et al.',
      },
    ],
    relatedSymptomSlugs: ['fatigue'],
  },
  {
    id: 'constipation',
    name: 'Chronic Constipation',
    slug: 'constipation',
    category: 'digestive',
    tagline: 'Slow transit',
    summary: 'Infrequent bowel movements or difficult passage of stools.',
    description: 'Infrequent bowel movements or difficult passage of stools.',
    symptoms: [
      { name: 'Straining', description: 'Difficulty passing', frequency: 'common' },
      { name: 'Hard stools', description: 'Bristol type 1-2', frequency: 'common' },
    ],
    interventions: [
      {
        id: 'fiber-constipation',
        name: 'Fibre',
        slug: 'fibre-constipation',
        category: 'supplement',
        description: 'Bulk-forming fibre.',
        evidenceRating: 'A',
        sources: [
          {
            title: 'The Effect of Fiber Supplementation on Chronic Constipation in Adults: An Updated Systematic Review and Meta-Analysis of Randomized Controlled Trials',
            url: 'https://pubmed.ncbi.nlm.nih.gov/35816465/',
            type: 'review',
            year: 2022,
            authors: 'van der Schoot A, Drysdale C, Whelan K, et al.',
          },
        ],
        lastUpdated: '2025-01-26',
      },
      {
        id: 'osmotic-laxatives',
        name: 'Osmotic Laxatives',
        slug: 'osmotic-laxatives',
        category: 'medication',
        description: 'PEG typically.',
        evidenceRating: 'A',
        sources: [
          {
            title: 'Lactulose versus Polyethylene Glycol for Chronic Constipation',
            url: 'https://pubmed.ncbi.nlm.nih.gov/20614462/',
            type: 'review',
            year: 2010,
            authors: 'Lee-Robichaud H, Thomas K, Morgan J, et al.',
          },
        ],
        lastUpdated: '2025-01-26',
      },
      {
        id: 'magnesium-constipation',
        name: 'Magnesium',
        slug: 'magnesium-constipation',
        category: 'supplement',
        description: 'Osmotic effect.',
        evidenceRating: 'B',
        sources: [
          {
            title: 'Senna Versus Magnesium Oxide for the Treatment of Chronic Constipation: A Randomized, Placebo-Controlled Trial',
            url: 'https://pubmed.ncbi.nlm.nih.gov/32969946/',
            type: 'study',
            year: 2021,
            authors: 'Morishita D, Tomita T, Mori S, et al.',
          },
        ],
        lastUpdated: '2025-01-26',
      },
    ],
    dietaryRecommendations: ['Prunes', 'Kiwi fruit', 'Hydration'],
    testingOptions: ['Transit time study'],
    evidenceRating: 'A', // median([A, A, B]) idx 1 = A
    disclaimer: STANDARD_DISCLAIMER,
    lastUpdated: LAST_UPDATED,
    sources: [
      {
        title: 'American Gastroenterological Association-American College of Gastroenterology Clinical Practice Guideline: Pharmacological Management of Chronic Idiopathic Constipation',
        url: 'https://pubmed.ncbi.nlm.nih.gov/37204227/',
        type: 'medical_guideline',
        year: 2023,
        authors: 'Chang L, Chey WD, Imdad A, et al.',
      },
    ],
    relatedSymptomSlugs: ['constipation'],
  },

  // --------------------------------------------------------------------------
  // MENTAL HEALTH (6) — from mental-health
  // --------------------------------------------------------------------------
  // Evidence ratings default to 'B' (per plan). Interventions are hand-authored
  // with mechanisms to give these pages substance comparable to gut-health pages.
  {
    id: 'depression',
    name: 'Major Depressive Disorder',
    slug: 'depression',
    category: 'mental-health',
    tagline: 'Persistent low mood with loss of interest and energy',
    summary: 'Persistent feelings of sadness, loss of interest, and lack of energy.',
    description:
      'Depression is more than just feeling sad. It is a serious mental health condition that affects how you feel, think, and handle daily activities.',
    symptoms: [
      { name: 'Persistent low mood', description: 'Sad, anxious, or "empty" feeling most of the day', frequency: 'common' },
      { name: 'Loss of interest', description: 'Anhedonia — loss of interest in previously enjoyed activities', frequency: 'common' },
      { name: 'Fatigue', description: 'Decreased energy regardless of rest', frequency: 'common' },
      { name: 'Sleep disturbance', description: 'Difficulty sleeping or oversleeping', frequency: 'common' },
      { name: 'Appetite or weight change', description: 'Significant change in either direction', frequency: 'common' },
    ],
    interventions: [
      {
        id: 'ssri-snri-antidepressants',
        name: 'SSRI/SNRI Antidepressants',
        slug: 'ssri-snri-antidepressants',
        category: 'medication',
        description: 'First-line medication class for moderate-to-severe depression.',
        mechanism:
          'Increases synaptic serotonin (and noradrenaline for SNRIs), gradually rebalancing mood-regulation circuits over 4-6 weeks.',
        evidenceRating: 'B',
        sources: [
          {
            title: 'Comparative efficacy and acceptability of 21 antidepressant drugs for the acute treatment of adults with major depressive disorder: a systematic review and network meta-analysis',
            url: 'https://pubmed.ncbi.nlm.nih.gov/29477251/',
            type: 'review',
            year: 2018,
            authors: 'Cipriani A, Furukawa TA, Salanti G, et al.',
          },
        ],
        lastUpdated: LAST_UPDATED,
      },
      {
        id: 'cognitive-behavioural-therapy-depression',
        name: 'Cognitive Behavioural Therapy',
        slug: 'cognitive-behavioural-therapy-depression',
        category: 'therapy',
        description: 'Structured short-term psychotherapy targeting thought patterns and behaviours.',
        mechanism:
          'Identifies and restructures cognitive distortions that perpetuate low mood; pairs this with behavioural activation to rebuild engagement with rewarding activities.',
        evidenceRating: 'B',
        sources: [
          {
            title: 'Cognitive behavior therapy vs. control conditions, other psychotherapies, pharmacotherapies and combined treatment for depression: a comprehensive meta-analysis including 409 trials with 52,702 patients',
            url: 'https://pubmed.ncbi.nlm.nih.gov/36640411/',
            type: 'review',
            year: 2023,
            authors: 'Cuijpers P, Miguel C, Harrer M, et al.',
          },
        ],
        lastUpdated: LAST_UPDATED,
      },
      {
        id: 'interpersonal-therapy',
        name: 'Interpersonal Therapy',
        slug: 'interpersonal-therapy',
        category: 'therapy',
        description: 'Time-limited therapy focused on resolving interpersonal difficulties.',
        mechanism:
          'Targets grief, role disputes, role transitions, and interpersonal deficits that trigger and maintain depressive episodes.',
        evidenceRating: 'B',
        sources: [
          {
            title: 'Interpersonal psychotherapy for mental health problems: a comprehensive meta-analysis',
            url: 'https://pubmed.ncbi.nlm.nih.gov/27032627/',
            type: 'review',
            year: 2016,
            authors: 'Cuijpers P, Donker T, Weissman MM, et al.',
          },
        ],
        lastUpdated: LAST_UPDATED,
      },
    ],
    professionalToSee: 'Therapist',
    firstSteps: [
      'Schedule an appointment with your primary care provider to rule out physical causes (thyroid, B12, anaemia).',
      'Reach out to a trusted friend or family member — isolation worsens depression.',
      'Call or text 988 (Canada and US) for immediate crisis support, or text HOME to 741741 (US) / CONNECT to 686868 (Kids Help Phone, Canada) for text-only support if you are experiencing thoughts of self-harm.',
    ],
    evidenceRating: 'B',
    disclaimer: MH_DISCLAIMER,
    lastUpdated: LAST_UPDATED,
    sources: [
      {
        title: 'APA Clinical Practice Guideline for the Treatment of Depression Across Three Age Cohorts',
        url: 'https://www.apa.org/depression-guideline',
        type: 'medical_guideline',
        year: 2019,
        authors: 'American Psychological Association',
      },
      {
        title: 'NICE Guideline CG90: Depression in Adults — Recognition and Management',
        url: 'https://www.nice.org.uk/guidance/cg90',
        type: 'medical_guideline',
        year: 2009,
        authors: 'National Institute for Health and Care Excellence',
      },
      {
        title: 'CANMAT 2016 Clinical Guidelines for the Management of Adults with Major Depressive Disorder',
        url: 'https://pubmed.ncbi.nlm.nih.gov/27486148/',
        type: 'medical_guideline',
        year: 2016,
        authors: 'Kennedy SH et al.',
      },
    ],
    relatedSymptomSlugs: ['fatigue'],
  },
  {
    id: 'gad',
    name: 'Generalized Anxiety Disorder (GAD)',
    slug: 'anxiety',
    category: 'mental-health',
    tagline: 'Excessive, hard-to-control worry about everyday things',
    summary: 'Excessive, uncontrollable worry about everyday issues.',
    description:
      'People with GAD experience persistent and excessive anxiety about many different things — health, work, social interactions, and everyday routine circumstances.',
    symptoms: [
      { name: 'Restlessness', description: 'Feeling on edge or keyed up', frequency: 'common' },
      { name: 'Fatigue', description: 'Easily fatigued despite rest', frequency: 'common' },
      { name: 'Difficulty concentrating', description: 'Mind going blank', frequency: 'common' },
      { name: 'Irritability', description: 'Short temper, frustration', frequency: 'common' },
      { name: 'Muscle tension', description: 'Jaw clenching, shoulders, headaches', frequency: 'common' },
    ],
    interventions: [
      {
        id: 'cognitive-behavioural-therapy-gad',
        name: 'Cognitive Behavioural Therapy',
        slug: 'cognitive-behavioural-therapy-gad',
        category: 'therapy',
        description: 'CBT adapted for generalized anxiety.',
        mechanism:
          'Teaches worry postponement, cognitive restructuring, and graduated exposure to uncertainty — breaking the cycle of chronic excessive worry.',
        evidenceRating: 'B',
        sources: [
          {
            title: 'Cognitive behavioral therapy for anxiety and related disorders: a meta-analysis of randomized placebo-controlled trials',
            url: 'https://pubmed.ncbi.nlm.nih.gov/29451967/',
            type: 'review',
            year: 2018,
            authors: 'Carpenter JK, Andrews LA, Witcraft SM, et al.',
          },
        ],
        lastUpdated: LAST_UPDATED,
      },
      {
        id: 'ssri-antidepressants-gad',
        name: 'SSRI Antidepressants',
        slug: 'ssri-antidepressants-gad',
        category: 'medication',
        description: 'First-line medication class for GAD.',
        mechanism:
          'Modulates serotonin signalling to dampen baseline anxiety arousal. Takes 4-6 weeks to reach therapeutic effect.',
        evidenceRating: 'B',
        sources: [
          {
            title: 'Pharmacological treatments for generalised anxiety disorder: a systematic review and network meta-analysis',
            url: 'https://pubmed.ncbi.nlm.nih.gov/30712879/',
            type: 'review',
            year: 2019,
            authors: 'Slee A, Nazareth I, Bondaronek P, et al.',
          },
        ],
        lastUpdated: LAST_UPDATED,
      },
      {
        id: 'mindfulness-based-stress-reduction',
        name: 'Mindfulness-Based Stress Reduction',
        slug: 'mindfulness-based-stress-reduction',
        category: 'therapy',
        description: 'Structured 8-week programme developed by Jon Kabat-Zinn.',
        mechanism:
          'Teaches present-moment awareness and decentering from anxious thoughts, so worry loses its grip without needing to be argued with.',
        evidenceRating: 'B',
        sources: [
          {
            title: 'Mindfulness-based therapy: a comprehensive meta-analysis',
            url: 'https://pubmed.ncbi.nlm.nih.gov/23796855/',
            type: 'review',
            year: 2013,
            authors: 'Khoury B, Lecomte T, Fortin G, et al.',
          },
        ],
        lastUpdated: LAST_UPDATED,
      },
    ],
    professionalToSee: 'Therapist',
    firstSteps: [
      'Focus on sleep hygiene — poor sleep amplifies anxiety substantially.',
      'Reduce or eliminate caffeine for 2 weeks and notice the difference.',
      'Practise box breathing (4-4-4-4) when anxious — activates the parasympathetic system.',
    ],
    evidenceRating: 'B',
    disclaimer: MH_DISCLAIMER,
    lastUpdated: LAST_UPDATED,
    sources: [
      {
        title: 'NICE Guideline CG113: Generalised Anxiety Disorder and Panic Disorder in Adults',
        url: 'https://www.nice.org.uk/guidance/cg113',
        type: 'medical_guideline',
        year: 2011,
        authors: 'National Institute for Health and Care Excellence',
      },
      {
        title: 'CANMAT 2014 Clinical Guidelines for the Management of Anxiety, Posttraumatic Stress and Obsessive-Compulsive Disorders',
        url: 'https://pubmed.ncbi.nlm.nih.gov/25007419/',
        type: 'medical_guideline',
        year: 2014,
        authors: 'Katzman MA et al.',
      },
      {
        title: 'Cognitive Behavioural Therapy for Anxiety Disorders: An Update on the Empirical Evidence',
        url: 'https://pubmed.ncbi.nlm.nih.gov/31552067/',
        type: 'review',
        year: 2020,
        authors: 'Carpenter JK et al.',
      },
    ],
    relatedSymptomSlugs: ['palpitations', 'dizziness'],
  },
  {
    id: 'adhd',
    name: 'ADHD (Adult)',
    slug: 'adhd',
    category: 'mental-health',
    tagline: 'Executive function challenges around attention and impulse control',
    summary: 'Difficulty with attention, hyperactivity, and impulsivity.',
    description:
      'Adult ADHD can lead to unstable relationships, poor work performance, and low self-esteem. It often looks different than in children — internal restlessness instead of hyperactivity, and executive dysfunction can be the dominant feature.',
    symptoms: [
      { name: 'Impulsiveness', description: 'Acting without thinking through consequences', frequency: 'common' },
      { name: 'Disorganization', description: 'Difficulty prioritizing and managing belongings', frequency: 'common' },
      { name: 'Poor time management', description: 'Chronic lateness, time blindness', frequency: 'common' },
      { name: 'Attention difficulties', description: 'Problems focusing on non-stimulating tasks', frequency: 'common' },
      { name: 'Restlessness', description: 'Internal or external', frequency: 'common' },
    ],
    interventions: [
      {
        id: 'stimulant-medication',
        name: 'Stimulant Medication',
        slug: 'stimulant-medication',
        category: 'medication',
        description: 'Methylphenidate (Ritalin, Concerta) and amphetamines (Adderall, Vyvanse).',
        mechanism:
          'Increases dopamine and noradrenaline in the prefrontal cortex, improving attention, working memory, and impulse control typically within 30-60 minutes.',
        evidenceRating: 'B',
        sources: [
          {
            title: 'Comparative efficacy and tolerability of medications for attention-deficit hyperactivity disorder in children, adolescents, and adults: a systematic review and network meta-analysis',
            url: 'https://pubmed.ncbi.nlm.nih.gov/30097390/',
            type: 'review',
            year: 2018,
            authors: 'Cortese S, Adamo N, Del Giovane C, et al.',
          },
        ],
        lastUpdated: LAST_UPDATED,
      },
      {
        id: 'non-stimulant-medication',
        name: 'Non-Stimulant Medication',
        slug: 'non-stimulant-medication',
        category: 'medication',
        description: 'Atomoxetine, guanfacine, and bupropion.',
        mechanism:
          'Works more slowly via noradrenaline reuptake inhibition or alpha-2 adrenergic pathways. Preferred when stimulants are contraindicated or cause intolerable side effects.',
        evidenceRating: 'B',
        sources: [
          {
            title: 'Nonstimulant medications for attention-deficit/hyperactivity disorder (ADHD) in adults: systematic review and meta-analysis',
            url: 'https://pubmed.ncbi.nlm.nih.gov/37166701/',
            type: 'review',
            year: 2023,
            authors: 'Radonjic NV, Bellato A, Khoury NM, et al.',
          },
        ],
        lastUpdated: LAST_UPDATED,
      },
      {
        id: 'adhd-coaching',
        name: 'ADHD Coaching',
        slug: 'adhd-coaching',
        category: 'therapy',
        description: 'Goal-focused coaching to build executive function systems.',
        mechanism:
          'Helps build practical scaffolding (planning, prioritization, follow-through) in real-life contexts — particularly effective alongside medication.',
        evidenceRating: 'B',
        sources: [
          {
            title: 'Efficacy of ADHD coaching for adults with ADHD',
            url: 'https://pubmed.ncbi.nlm.nih.gov/19276311/',
            type: 'study',
            year: 2010,
            authors: 'Kubik JA',
          },
        ],
        lastUpdated: LAST_UPDATED,
      },
    ],
    professionalToSee: 'Psychiatrist',
    firstSteps: [
      'Take a validated self-screener (the Adult ADHD Self-Report Scale — ASRS-v1.1 is free online).',
      'Seek diagnosis from a specialist experienced with adult ADHD — general GPs often miss it.',
      'Start tracking the daily friction points (forgotten tasks, missed appointments) that are actually costing you.',
    ],
    evidenceRating: 'B',
    disclaimer: MH_DISCLAIMER,
    lastUpdated: LAST_UPDATED,
    sources: [
      {
        title: 'Attention deficit hyperactivity disorder: diagnosis and management',
        url: 'https://pubmed.ncbi.nlm.nih.gov/29634174/',
        type: 'medical_guideline',
        year: 2018,
        authors: 'National Institute for Health and Care Excellence (NICE)',
      },
      {
        title: 'Comparative efficacy and tolerability of medications for attention-deficit hyperactivity disorder in children, adolescents, and adults: a systematic review and network meta-analysis',
        url: 'https://pubmed.ncbi.nlm.nih.gov/30097390/',
        type: 'review',
        year: 2018,
        authors: 'Cortese S, Adamo N, Del Giovane C, et al.',
      },
    ],
  },
  {
    id: 'bipolar',
    name: 'Bipolar Disorder',
    slug: 'bipolar',
    category: 'mental-health',
    tagline: 'Extreme mood swings between mania and depression',
    summary: 'Extreme mood swings including emotional highs (mania) and lows (depression).',
    description:
      'Bipolar disorder causes shifts in mood, energy, activity levels, and the ability to carry out day-to-day tasks. Episodes of mania (or hypomania) alternate with depressive episodes.',
    symptoms: [
      { name: 'Manic episodes', description: 'Increased energy, euphoria, risky behaviour, little need for sleep', frequency: 'common' },
      { name: 'Depressive episodes', description: 'Hopelessness, low energy, sleep problems', frequency: 'common' },
      { name: 'Mixed episodes', description: 'Features of both mania and depression simultaneously', frequency: 'occasional' },
    ],
    interventions: [
      {
        id: 'mood-stabilizers',
        name: 'Mood Stabilizers',
        slug: 'mood-stabilizers',
        category: 'medication',
        description: 'Lithium and anticonvulsants (lamotrigine, valproate).',
        mechanism:
          'Lithium and anticonvulsants reduce the frequency and severity of both manic and depressive episodes. Lithium is also the only psychiatric medication with strong evidence for reducing suicide risk.',
        evidenceRating: 'B',
        sources: [
          {
            title: 'Lithium for prevention of mood episodes in bipolar disorders: systematic review and meta-analysis',
            url: 'https://pubmed.ncbi.nlm.nih.gov/25530932/',
            type: 'review',
            year: 2014,
            authors: 'Severus E, Taylor MJ, Sauer C, et al.',
          },
        ],
        lastUpdated: LAST_UPDATED,
      },
      {
        id: 'atypical-antipsychotics',
        name: 'Atypical Antipsychotics',
        slug: 'atypical-antipsychotics',
        category: 'medication',
        description: 'Second-generation antipsychotics (quetiapine, olanzapine, aripiprazole).',
        mechanism:
          'Treats acute mania and can prevent episode recurrence as maintenance therapy. Often combined with mood stabilizers.',
        evidenceRating: 'B',
        sources: [
          {
            title: 'Atypical antipsychotics in the treatment of mania: a meta-analysis of randomized, placebo-controlled trials',
            url: 'https://pubmed.ncbi.nlm.nih.gov/16669715/',
            type: 'review',
            year: 2006,
            authors: 'Perlis RH, Welge JA, Vornik LA, et al.',
          },
        ],
        lastUpdated: LAST_UPDATED,
      },
      {
        id: 'bipolar-psychotherapy',
        name: 'Psychotherapy',
        slug: 'bipolar-psychotherapy',
        category: 'therapy',
        description: 'Psychoeducation, family-focused therapy, and interpersonal/social rhythm therapy.',
        mechanism:
          'Helps stabilize daily routines (sleep, meals, activity), recognize early warning signs of episodes, and improve medication adherence.',
        evidenceRating: 'B',
        sources: [
          {
            title: 'Adjunctive psychotherapy for bipolar disorder: a systematic review and component network meta-analysis',
            url: 'https://pubmed.ncbi.nlm.nih.gov/33052390/',
            type: 'review',
            year: 2021,
            authors: 'Miklowitz DJ, Efthimiou O, Furukawa TA, et al.',
          },
        ],
        lastUpdated: LAST_UPDATED,
      },
    ],
    professionalToSee: 'Psychiatrist',
    firstSteps: [
      'Track moods daily in a journal or app — patterns are easier to see in hindsight.',
      'Maintain a consistent sleep schedule — sleep disruption is a major trigger for manic episodes.',
      'Seek psychiatric evaluation — bipolar disorder is commonly misdiagnosed as unipolar depression.',
    ],
    evidenceRating: 'B',
    disclaimer: MH_DISCLAIMER,
    lastUpdated: LAST_UPDATED,
    sources: [
      {
        title: 'NICE Guideline CG185: Bipolar Disorder — Assessment and Management',
        url: 'https://www.nice.org.uk/guidance/cg185',
        type: 'medical_guideline',
        year: 2014,
        authors: 'National Institute for Health and Care Excellence',
      },
      {
        title: 'CANMAT and ISBD 2018 Guidelines for the Management of Patients with Bipolar Disorder',
        url: 'https://pubmed.ncbi.nlm.nih.gov/29536616/',
        type: 'medical_guideline',
        year: 2018,
        authors: 'Yatham LN et al.',
      },
      {
        title: 'Lithium in the Prevention of Suicide in Mood Disorders: Updated Systematic Review and Meta-Analysis',
        url: 'https://pubmed.ncbi.nlm.nih.gov/23814104/',
        type: 'review',
        year: 2013,
        authors: 'Cipriani A et al.',
      },
    ],
    relatedSymptomSlugs: ['fatigue'],
  },
  {
    id: 'ptsd',
    name: 'PTSD',
    slug: 'ptsd',
    category: 'mental-health',
    tagline: 'Traumatic reaction with intrusion, avoidance, and hyperarousal',
    summary: 'Reaction to a traumatic event involving flashbacks and avoidance.',
    description:
      'PTSD can develop after experiencing or witnessing a terrifying event. Symptoms can last for months or years and significantly impair daily functioning.',
    symptoms: [
      { name: 'Intrusive memories', description: 'Flashbacks, nightmares, distressing recollections', frequency: 'common' },
      { name: 'Avoidance', description: 'Actively avoiding trauma reminders', frequency: 'common' },
      { name: 'Negative mood changes', description: 'Persistent negative beliefs, emotional numbing', frequency: 'common' },
      { name: 'Hyperarousal', description: 'Always on guard, startle easily, difficulty sleeping', frequency: 'common' },
    ],
    interventions: [
      {
        id: 'emdr',
        name: 'Eye Movement Desensitization and Reprocessing (EMDR)',
        slug: 'emdr',
        category: 'therapy',
        description: 'Evidence-based trauma therapy using bilateral stimulation.',
        mechanism:
          'Uses bilateral eye movements (or taps/sounds) while recalling traumatic memories to reduce their emotional charge over 6-12 sessions.',
        evidenceRating: 'B',
        sources: [
          {
            title: 'Efficacy of EMDR in post-traumatic stress disorder: a systematic review and meta-analysis of randomized clinical trials',
            url: 'https://pubmed.ncbi.nlm.nih.gov/37882423/',
            type: 'review',
            year: 2023,
            authors: 'Rasines-Laudes P, Serrano-Pintado I',
          },
        ],
        lastUpdated: LAST_UPDATED,
      },
      {
        id: 'trauma-focused-cbt',
        name: 'Trauma-Focused CBT',
        slug: 'trauma-focused-cbt',
        category: 'therapy',
        description: 'CBT adapted for trauma, including prolonged exposure and cognitive processing.',
        mechanism:
          'Gradually exposes the patient to trauma memories in a controlled way, pairing this with cognitive restructuring of related beliefs (safety, trust, self-worth).',
        evidenceRating: 'B',
        sources: [
          {
            title: 'Psychological treatments for post-traumatic stress disorder in adults: a network meta-analysis',
            url: 'https://pubmed.ncbi.nlm.nih.gov/32063234/',
            type: 'review',
            year: 2020,
            authors: 'Lewis C, Roberts NP, Andrew M, et al.',
          },
        ],
        lastUpdated: LAST_UPDATED,
      },
      {
        id: 'ptsd-medication',
        name: 'Medication',
        slug: 'ptsd-medication',
        category: 'medication',
        description: 'SSRIs (sertraline, paroxetine) and prazosin for nightmares.',
        mechanism:
          'SSRIs are first-line and treat the core symptoms. Prazosin, an alpha-1 blocker, specifically targets trauma-related nightmares.',
        evidenceRating: 'B',
        sources: [
          {
            title: 'Pharmacotherapy for post traumatic stress disorder (PTSD)',
            url: 'https://pubmed.ncbi.nlm.nih.gov/35234292/',
            type: 'review',
            year: 2022,
            authors: 'Williams T, Phillips NJ, Stein DJ, et al.',
          },
        ],
        lastUpdated: LAST_UPDATED,
      },
    ],
    professionalToSee: 'Therapist',
    firstSteps: [
      'Ensure immediate physical safety — leave the traumatic situation if ongoing.',
      'Find a trauma-informed therapist who explicitly lists trauma as a specialty.',
      'Learn grounding techniques (5-4-3-2-1 sensory exercise) to manage acute flashbacks.',
    ],
    evidenceRating: 'B',
    disclaimer: MH_DISCLAIMER,
    lastUpdated: LAST_UPDATED,
    sources: [
      {
        title: 'NICE Guideline NG116: Post-Traumatic Stress Disorder',
        url: 'https://www.nice.org.uk/guidance/ng116',
        type: 'medical_guideline',
        year: 2018,
        authors: 'National Institute for Health and Care Excellence',
      },
      {
        title: 'APA Clinical Practice Guideline for the Treatment of PTSD',
        url: 'https://www.apa.org/ptsd-guideline',
        type: 'medical_guideline',
        year: 2017,
        authors: 'American Psychological Association',
      },
      {
        title: 'Psychological and Pharmacological Treatments of PTSD: A Systematic Review and Network Meta-Analysis',
        url: 'https://pubmed.ncbi.nlm.nih.gov/33606933/',
        type: 'review',
        year: 2021,
        authors: 'Coventry PA et al.',
      },
    ],
    relatedSymptomSlugs: ['palpitations'],
  },
  {
    id: 'ocd',
    name: 'Obsessive-Compulsive Disorder',
    slug: 'ocd',
    category: 'mental-health',
    tagline: 'Unwanted intrusive thoughts paired with ritual behaviours',
    summary: 'Uncontrollable, recurring thoughts (obsessions) and behaviours (compulsions).',
    description:
      'OCD involves a cycle of obsessions (fears) and compulsions (rituals done to relieve the fear). It is not just "being neat" — OCD is distressing and significantly impairs daily life.',
    symptoms: [
      { name: 'Contamination fears', description: 'Fear of germs, dirt, or illness', frequency: 'common' },
      { name: 'Symmetry and ordering', description: 'Need for things to be "just right"', frequency: 'common' },
      { name: 'Intrusive thoughts', description: 'Unwanted forbidden or taboo thoughts', frequency: 'common' },
      { name: 'Compulsive rituals', description: 'Checking, washing, counting, mental rituals', frequency: 'common' },
    ],
    interventions: [
      {
        id: 'exposure-response-prevention',
        name: 'Exposure and Response Prevention (ERP)',
        slug: 'exposure-response-prevention',
        category: 'therapy',
        description: 'The gold-standard behavioural therapy for OCD.',
        mechanism:
          'Deliberately exposes the patient to feared triggers while preventing the compulsive ritual, breaking the fear-relief reinforcement loop that perpetuates OCD.',
        evidenceRating: 'B',
        sources: [
          {
            title: 'Cognitive behavioural therapy with exposure and response prevention in the treatment of obsessive-compulsive disorder: a systematic review and meta-analysis of randomised controlled trials',
            url: 'https://pubmed.ncbi.nlm.nih.gov/33618297/',
            type: 'review',
            year: 2021,
            authors: 'Reid JE, Laws KR, Drummond L, et al.',
          },
        ],
        lastUpdated: LAST_UPDATED,
      },
      {
        id: 'ssris-for-ocd',
        name: 'SSRIs (high dose)',
        slug: 'ssris-for-ocd',
        category: 'medication',
        description: 'SSRIs at higher doses than typical for depression.',
        mechanism:
          'Reduces obsessive-compulsive symptoms over 8-12 weeks. OCD typically requires higher SSRI doses than depression — often 2-3x the standard dose.',
        evidenceRating: 'B',
        sources: [
          {
            title: 'Meta-analysis of the dose-response relationship of SSRI in obsessive-compulsive disorder',
            url: 'https://pubmed.ncbi.nlm.nih.gov/19468281/',
            type: 'review',
            year: 2010,
            authors: 'Bloch MH, McGuire J, Landeros-Weisenberger A, et al.',
          },
        ],
        lastUpdated: LAST_UPDATED,
      },
    ],
    professionalToSee: 'Therapist',
    firstSteps: [
      'Do NOT rely on reassurance from others — reassurance feeds the OCD cycle.',
      'Find an OCD specialist (ideally someone trained in ERP). General talk therapy can make OCD worse.',
      'Learn the difference between obsessions (unwanted) and personal values — OCD often attacks what you care about most.',
    ],
    evidenceRating: 'B',
    disclaimer: MH_DISCLAIMER,
    lastUpdated: LAST_UPDATED,
    sources: [
      {
        title: 'NICE Guideline CG31: Obsessive-Compulsive Disorder and Body Dysmorphic Disorder',
        url: 'https://www.nice.org.uk/guidance/cg31',
        type: 'medical_guideline',
        year: 2005,
        authors: 'National Institute for Health and Care Excellence',
      },
      {
        title: 'APA Practice Guidelines for Obsessive-Compulsive Disorder',
        url: 'https://pubmed.ncbi.nlm.nih.gov/17849776/',
        type: 'medical_guideline',
        year: 2007,
        authors: 'American Psychiatric Association',
      },
      {
        title: 'Cognitive-Behavioural Therapy for Obsessive-Compulsive Disorder: A Systematic Review and Meta-Analysis',
        url: 'https://pubmed.ncbi.nlm.nih.gov/31280547/',
        type: 'review',
        year: 2019,
        authors: 'Ost LG et al.',
      },
    ],
  },
];

// ============================================================================
// HELPER EXPORTS
// ============================================================================

export function getConditionBySlug(slug: string): Condition | undefined {
  return conditions.find((c) => c.slug === slug);
}

export function getConditionsByCategory(
  category: Condition['category']
): Condition[] {
  return conditions.filter((c) => c.category === category);
}

export function getAllCategories(): Array<Condition['category']> {
  const seen = new Set<Condition['category']>();
  for (const c of conditions) seen.add(c.category);
  return Array.from(seen);
}

// Featured conditions for the homepage — one representative per category
// plus an extra digestive (largest category). Hand-picked for broadest
// coverage of the library.
const FEATURED_SLUGS = [
  'ibs',
  'depression',
  'type-2-diabetes',
  'migraine',
  'hypertension',
  'adhd',
] as const;

export function getFeaturedConditions(): Condition[] {
  return FEATURED_SLUGS.map((slug) => {
    const c = getConditionBySlug(slug);
    if (!c) {
      throw new Error(
        `getFeaturedConditions: featured slug "${slug}" not found in conditions array. Fix the FEATURED_SLUGS list in lib/data/conditions.ts.`
      );
    }
    return c;
  });
}
