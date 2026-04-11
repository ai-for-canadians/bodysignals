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

const STANDARD_DISCLAIMER =
  'This is educational information, not medical advice. Consult a qualified healthcare provider before making changes to diet, exercise, supplements, or medication — especially if you have existing conditions or take prescription drugs.';

const MH_DISCLAIMER =
  'This is educational information, not medical advice. Mental health care works best with a qualified provider. If you are in crisis, call or text 988 (Suicide & Crisis Lifeline, Canada/US) or Kids Help Phone 1-800-668-6868. In an emergency, call 911. Evidence ratings for mental health interventions default to B (standard clinical treatments with established research); individual response varies.';

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
        sources: [],
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
        sources: [],
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
        sources: [],
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
      'Consult your doctor before changing diet if you are on medication (insulin or metformin), as hypoglycaemia can occur.',
    lastUpdated: LAST_UPDATED,
    sources: [],
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
        sources: [],
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
        sources: [],
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
        sources: [],
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
    sources: [],
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
        sources: [],
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
        sources: [],
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
    sources: [],
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
        sources: [],
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
        sources: [],
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
        sources: [],
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
    sources: [],
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
        sources: [],
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
        sources: [],
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
    sources: [],
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
        sources: [],
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
        sources: [],
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
        sources: [],
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
    sources: [],
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
        sources: [],
        lastUpdated: '2025-01-26',
      },
      {
        id: 'peppermint-oil',
        name: 'Peppermint Oil',
        slug: 'peppermint-oil',
        category: 'supplement',
        description: 'Enteric-coated antispasmodic supplement.',
        evidenceRating: 'A',
        sources: [],
        lastUpdated: '2025-01-26',
      },
      {
        id: 'soluble-fiber-ibs',
        name: 'Soluble Fibre',
        slug: 'soluble-fibre-ibs',
        category: 'supplement',
        description: 'Psyllium husk for IBS-C.',
        evidenceRating: 'B',
        sources: [],
        lastUpdated: '2025-01-26',
      },
      {
        id: 'rifaximin-ibs',
        name: 'Rifaximin',
        slug: 'rifaximin-ibs',
        category: 'medication',
        description: 'Non-absorbable antibiotic for IBS-D.',
        evidenceRating: 'A',
        sources: [],
        lastUpdated: '2025-01-26',
      },
    ],
    dietaryRecommendations: ['Low FODMAP', 'Gluten-free trial', 'Low lactose'],
    testingOptions: ['Rome IV Criteria (clinical diagnosis)', 'Stool tests to rule out inflammation', 'SIBO breath test'],
    evidenceRating: 'A', // median([A, A, B, A]) sorted [A,A,A,B] idx 2 = A
    disclaimer:
      'IBS is a diagnosis of exclusion. Rule out coeliac disease and inflammatory bowel disease with your doctor before starting restrictive diets.',
    lastUpdated: LAST_UPDATED,
    sources: [],
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
        sources: [],
        lastUpdated: '2025-01-26',
      },
      {
        id: 'low-fermentation',
        name: 'Low Fermentation Diet',
        slug: 'low-fermentation-diet',
        category: 'diet',
        description: 'Reduces bacterial fuel.',
        evidenceRating: 'C',
        sources: [],
        lastUpdated: '2025-01-26',
      },
      {
        id: 'prokinetics',
        name: 'Prokinetics',
        slug: 'prokinetics',
        category: 'medication',
        description: 'Improves gut motility.',
        evidenceRating: 'B',
        sources: [],
        lastUpdated: '2025-01-26',
      },
    ],
    dietaryRecommendations: ['Low FODMAP', 'Bi-phasic diet', 'Specific Carbohydrate Diet (SCD)'],
    testingOptions: ['Lactulose Breath Test', 'Glucose Breath Test', 'Jejunal aspirate'],
    evidenceRating: 'B', // median([A, C, B]) sorted [A,B,C] idx 1 = B
    disclaimer: STANDARD_DISCLAIMER + ' Underlying causes must be addressed to prevent relapse.',
    lastUpdated: LAST_UPDATED,
    sources: [],
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
        sources: [],
        lastUpdated: '2025-01-26',
      },
      {
        id: 'weight-loss-gerd',
        name: 'Weight Loss',
        slug: 'weight-loss-gerd',
        category: 'lifestyle',
        description: 'Reduces abdominal pressure.',
        evidenceRating: 'A',
        sources: [],
        lastUpdated: '2025-01-26',
      },
      {
        id: 'head-elevation',
        name: 'Head Elevation',
        slug: 'head-elevation',
        category: 'lifestyle',
        description: 'Sleeping on an incline.',
        evidenceRating: 'B',
        sources: [],
        lastUpdated: '2025-01-26',
      },
    ],
    dietaryRecommendations: ['Avoid triggers (spicy, acidic, caffeine, alcohol)', 'Smaller meals'],
    testingOptions: ['Endoscopy', 'pH monitoring'],
    evidenceRating: 'A', // median([A, A, B]) sorted [A,A,B] idx 1 = A
    disclaimer:
      "Chronic GERD can lead to Barrett's oesophagus. See a GI specialist if symptoms persist.",
    lastUpdated: LAST_UPDATED,
    sources: [],
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
        sources: [],
        lastUpdated: '2025-01-26',
      },
      {
        id: 'corticosteroids-crohns',
        name: 'Corticosteroids',
        slug: 'corticosteroids-crohns',
        category: 'medication',
        description: 'Reduce inflammation acutely.',
        evidenceRating: 'A',
        sources: [],
        lastUpdated: '2025-01-26',
      },
      {
        id: 'enteral-nutrition',
        name: 'Enteral Nutrition',
        slug: 'enteral-nutrition',
        category: 'diet',
        description: 'Liquid diet therapy.',
        evidenceRating: 'B',
        sources: [],
        lastUpdated: '2025-01-26',
      },
    ],
    dietaryRecommendations: ['Low residue during flares', 'High protein', 'Correct deficiencies'],
    testingOptions: ['Colonoscopy', 'MRI/CT enterography', 'Calprotectin (stool)'],
    evidenceRating: 'A', // median([A, A, B]) idx 1 = A
    disclaimer:
      'Complex autoimmune condition requiring lifelong management. Smoking cessation is critical. Work with a gastroenterologist.',
    lastUpdated: LAST_UPDATED,
    sources: [],
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
        sources: [],
        lastUpdated: '2025-01-26',
      },
      {
        id: 'biologics-uc',
        name: 'Biologics',
        slug: 'biologics-uc',
        category: 'medication',
        description: 'Targeted immune therapies.',
        evidenceRating: 'A',
        sources: [],
        lastUpdated: '2025-01-26',
      },
      {
        id: 'curcumin',
        name: 'Curcumin',
        slug: 'curcumin',
        category: 'supplement',
        description: 'Adjunctive anti-inflammatory therapy.',
        evidenceRating: 'B',
        sources: [],
        lastUpdated: '2025-01-26',
      },
    ],
    dietaryRecommendations: ['Low residue during flares', 'Avoid triggers'],
    testingOptions: ['Colonoscopy', 'Calprotectin'],
    evidenceRating: 'A', // median([A, A, B]) idx 1 = A
    disclaimer:
      "Similar to Crohn's but limited to the colon. Lifelong management with a gastroenterologist.",
    lastUpdated: LAST_UPDATED,
    sources: [],
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
        sources: [],
        lastUpdated: '2025-01-26',
      },
      {
        id: 'lactose-avoidance',
        name: 'Avoidance',
        slug: 'lactose-avoidance',
        category: 'diet',
        description: 'Removing lactose from diet.',
        evidenceRating: 'A',
        sources: [],
        lastUpdated: '2025-01-26',
      },
      {
        id: 'lactose-free-dairy',
        name: 'Lactose-free Dairy',
        slug: 'lactose-free-dairy',
        category: 'diet',
        description: 'Pre-treated dairy products.',
        evidenceRating: 'A',
        sources: [],
        lastUpdated: '2025-01-26',
      },
    ],
    dietaryRecommendations: ['Lactose-free milk', 'Hard cheeses (low lactose)', 'Yoghurt (often tolerated)'],
    testingOptions: ['Hydrogen Breath Test', 'Elimination and reintroduction'],
    evidenceRating: 'A', // median([A, A, A]) = A
    disclaimer: STANDARD_DISCLAIMER,
    lastUpdated: LAST_UPDATED,
    sources: [],
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
        sources: [],
        lastUpdated: '2025-01-26',
      },
    ],
    dietaryRecommendations: ['Strict avoidance of wheat, barley, rye', 'Watch for cross-contamination'],
    testingOptions: ['tTG-IgA Antibody Test', 'Endoscopy with biopsy (gold standard)'],
    evidenceRating: 'A',
    disclaimer:
      STANDARD_DISCLAIMER + ' Diagnosis must be confirmed BEFORE starting a gluten-free diet, otherwise testing becomes unreliable.',
    lastUpdated: LAST_UPDATED,
    sources: [],
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
        sources: [],
        lastUpdated: '2025-01-26',
      },
      {
        id: 'low-fodmap-ncgs',
        name: 'Low FODMAP',
        slug: 'low-fodmap-ncgs',
        category: 'diet',
        description: 'Many respond to fructan reduction.',
        evidenceRating: 'B',
        sources: [],
        lastUpdated: '2025-01-26',
      },
    ],
    dietaryRecommendations: ['Gluten reduction or elimination'],
    testingOptions: ['Diagnosis of exclusion'],
    evidenceRating: 'B',
    disclaimer:
      STANDARD_DISCLAIMER + ' Rule out coeliac disease before starting a gluten-free diet.',
    lastUpdated: LAST_UPDATED,
    sources: [],
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
        sources: [],
        lastUpdated: '2025-01-26',
      },
      {
        id: 'dao-enzyme',
        name: 'DAO Enzyme',
        slug: 'dao-enzyme',
        category: 'supplement',
        description: 'Supplement to aid histamine breakdown.',
        evidenceRating: 'C',
        sources: [],
        lastUpdated: '2025-01-26',
      },
    ],
    dietaryRecommendations: ['Avoid aged cheese, wine, fermented foods, cured meats'],
    testingOptions: ['Serum DAO activity', 'Elimination diet'],
    evidenceRating: 'C', // median([B, C]) idx 1 = C
    disclaimer: STANDARD_DISCLAIMER + ' Clinical recognition is growing but high-quality trials are limited.',
    lastUpdated: LAST_UPDATED,
    sources: [],
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
        sources: [],
        lastUpdated: '2025-01-26',
      },
      {
        id: 'prebiotics',
        name: 'Prebiotics',
        slug: 'prebiotics',
        category: 'diet',
        description: 'Fibres that feed beneficial bacteria.',
        evidenceRating: 'B',
        sources: [],
        lastUpdated: '2025-01-26',
      },
      {
        id: 'fermented-foods',
        name: 'Fermented Foods',
        slug: 'fermented-foods',
        category: 'diet',
        description: 'Yoghurt, kefir, kimchi, sauerkraut.',
        evidenceRating: 'B',
        sources: [],
        lastUpdated: '2025-01-26',
      },
    ],
    dietaryRecommendations: ['High fibre', 'Diverse plant foods (30+ per week)', 'Polyphenols'],
    testingOptions: ['Stool microbiome analysis (commercial tests have limitations)'],
    evidenceRating: 'B',
    disclaimer: STANDARD_DISCLAIMER,
    lastUpdated: LAST_UPDATED,
    sources: [],
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
        sources: [],
        lastUpdated: '2025-01-26',
      },
      {
        id: 'zinc-carnosine',
        name: 'Zinc Carnosine',
        slug: 'zinc-carnosine',
        category: 'supplement',
        description: 'Supports mucosal integrity.',
        evidenceRating: 'C',
        sources: [],
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
    sources: [],
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
        sources: [],
        lastUpdated: '2025-01-26',
      },
      {
        id: 'acid-suppression',
        name: 'Acid Suppression',
        slug: 'acid-suppression',
        category: 'medication',
        description: 'Allow the stomach lining to heal.',
        evidenceRating: 'A',
        sources: [],
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
    sources: [],
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
        sources: [],
        lastUpdated: '2025-01-26',
      },
      {
        id: 'liquid-diet',
        name: 'Liquid Diet',
        slug: 'liquid-diet',
        category: 'diet',
        description: 'Bowel rest during acute phase.',
        evidenceRating: 'B',
        sources: [],
        lastUpdated: '2025-01-26',
      },
    ],
    dietaryRecommendations: ['High fibre (prevention)', 'Low fibre (acute flare)'],
    testingOptions: ['CT Scan'],
    evidenceRating: 'B', // median([A, B]) idx 1 = B
    disclaimer:
      STANDARD_DISCLAIMER + ' Old advice to avoid nuts and seeds has been debunked.',
    lastUpdated: LAST_UPDATED,
    sources: [],
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
        sources: [],
        lastUpdated: '2025-01-26',
      },
      {
        id: 'low-sugar-diet',
        name: 'Low Sugar Diet',
        slug: 'low-sugar-diet',
        category: 'diet',
        description: 'Starving the yeast.',
        evidenceRating: 'C',
        sources: [],
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
    sources: [],
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
        sources: [],
        lastUpdated: '2025-01-26',
      },
      {
        id: 'osmotic-laxatives',
        name: 'Osmotic Laxatives',
        slug: 'osmotic-laxatives',
        category: 'medication',
        description: 'PEG typically.',
        evidenceRating: 'A',
        sources: [],
        lastUpdated: '2025-01-26',
      },
      {
        id: 'magnesium-constipation',
        name: 'Magnesium',
        slug: 'magnesium-constipation',
        category: 'supplement',
        description: 'Osmotic effect.',
        evidenceRating: 'B',
        sources: [],
        lastUpdated: '2025-01-26',
      },
    ],
    dietaryRecommendations: ['Prunes', 'Kiwi fruit', 'Hydration'],
    testingOptions: ['Transit time study'],
    evidenceRating: 'A', // median([A, A, B]) idx 1 = A
    disclaimer: STANDARD_DISCLAIMER,
    lastUpdated: LAST_UPDATED,
    sources: [],
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
        sources: [],
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
        sources: [],
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
        sources: [],
        lastUpdated: LAST_UPDATED,
      },
    ],
    professionalToSee: 'Therapist',
    firstSteps: [
      'Schedule an appointment with your primary care provider to rule out physical causes (thyroid, B12, anaemia).',
      'Reach out to a trusted friend or family member — isolation worsens depression.',
      'Call or text 988 (Canada/US) if you are experiencing a crisis or having thoughts of self-harm.',
    ],
    evidenceRating: 'B',
    disclaimer: MH_DISCLAIMER,
    lastUpdated: LAST_UPDATED,
    sources: [],
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
        sources: [],
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
        sources: [],
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
        sources: [],
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
    sources: [],
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
        sources: [],
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
        sources: [],
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
        sources: [],
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
    sources: [],
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
        sources: [],
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
        sources: [],
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
        sources: [],
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
    sources: [],
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
        sources: [],
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
        sources: [],
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
        sources: [],
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
    sources: [],
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
        sources: [],
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
        sources: [],
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
    sources: [],
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
