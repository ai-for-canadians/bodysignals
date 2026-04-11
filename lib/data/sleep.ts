// Unified sleep intervention data for Body Signals
//
// Migrated from ../extracted-apps/sleep-better/lib/data/interventions.ts
// Total: 20 evidence-rated interventions across 5 categories.
//
// Design decisions (from Phase 3 plan):
//   1. Source shape fixes applied at author time (no runtime transforms):
//      - benefits[]: source has {name, description, evidenceRating}, target has
//        {description, evidenceRating}. The source `name` is prepended into
//        `description` so the semantic information is preserved.
//      - safetyProfile.sideEffects[]: source uses
//        {name, description, likelihood}; target uses
//        {name, severity, frequency} with enum-constrained severity/frequency.
//        The source `description` is folded into `name` where it carries
//        useful info. `likelihood` is mapped to `frequency`
//        ('common'|'uncommon'|'rare'). `severity` is assigned by judgement.
//   2. Evidence ratings are A/B throughout the source and carried through
//      unchanged. Apigenin, valerian, and mouth-tape retain 'C' ratings.
//   3. SLEEP_DISCLAIMER extends the STANDARD_DISCLAIMER pattern with
//      supplement-specific warnings about melatonin dosing, valerian liver
//      interactions, and underlying sleep disorders that warrant a medical
//      evaluation (chronic insomnia, sleep apnoea).
//   4. Category display order is hand-picked (hygiene → environment →
//      supplements → tools → protocols) to surface free behavioural
//      interventions first, bought tools second, and behavioural programmes
//      last — matches the Phase 2 CATEGORY_DISPLAY_ORDER pattern.
//   5. Canadian spelling applied throughout user-facing prose.

import type { SleepIntervention } from '@/types';

// ============================================================================
// CONSTANTS
// ============================================================================

const LAST_UPDATED = '2026-04-10';

export const SLEEP_DISCLAIMER =
  'This is educational information, not medical advice. Supplements like melatonin, valerian, and magnesium can interact with prescription medications — always check with your doctor or pharmacist before starting. Chronic insomnia may indicate an underlying condition (sleep apnoea, thyroid dysfunction, depression) and warrants a medical evaluation.';

export const SLEEP_CATEGORY_LABELS: Record<
  SleepIntervention['category'],
  string
> = {
  hygiene: 'Sleep Hygiene',
  environment: 'Environment',
  supplements: 'Supplements',
  tools: 'Tools',
  protocols: 'Protocols',
};

// Sort order when "All" pill is active (free → bought → behavioural programmes).
export const SLEEP_CATEGORY_DISPLAY_ORDER: SleepIntervention['category'][] = [
  'hygiene',
  'environment',
  'supplements',
  'tools',
  'protocols',
];

// ============================================================================
// INTERVENTIONS (20 total)
// ============================================================================

export const sleepInterventions: SleepIntervention[] = [
  // --------------------------------------------------------------------------
  // HYGIENE (5)
  // --------------------------------------------------------------------------
  {
    id: 'consistency',
    name: 'Sleep Consistency',
    slug: 'consistency',
    category: 'hygiene',
    tagline: 'The most important habit',
    description:
      'Going to bed and waking up at the same time every day, including weekends. Regular timing is a stronger predictor of sleep quality and long-term health outcomes than total sleep duration in several recent studies.',
    benefits: [
      {
        description:
          'Circadian entrainment: stabilises the internal clock and hormone release patterns.',
        evidenceRating: 'A',
      },
      {
        description:
          'Sleep quality: improves deep-sleep and REM consistency night to night.',
        evidenceRating: 'A',
      },
    ],
    howItWorks:
      'Regularises cortisol and melatonin release so the body anticipates sleep and wake times. The suprachiasmatic nucleus locks onto the schedule within days.',
    protocol: [
      'Set a wake-up time and stick to it within ±30 minutes, weekends included.',
      'Go to bed only when tired, but aim for a consistent sleep window.',
      'If you must sleep in, cap it at 60 minutes beyond your usual wake time.',
    ],
    safetyProfile: {
      riskLevel: 'very low',
      sideEffects: [],
      contraindications: [],
    },
    evidenceRating: 'A',
    researchSummary:
      'Consistent sleep timing is a stronger predictor of health outcomes than sleep duration in several recent cohort studies. Free, universally recommended by sleep clinicians.',
    sources: [],
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'morning-sunlight',
    name: 'Morning Sunlight',
    slug: 'morning-sunlight',
    category: 'hygiene',
    tagline: 'Reset your master clock',
    description:
      'Getting bright outdoor light exposure within the first 30–60 minutes after waking up. This single habit anchors the circadian phase and drives melatonin release 14–16 hours later at bedtime.',
    benefits: [
      {
        description:
          'Wakefulness: raises cortisol and dopamine for alertness and mood.',
        evidenceRating: 'A',
      },
      {
        description:
          'Sleep onset: anchors melatonin release roughly 14–16 hours later.',
        evidenceRating: 'A',
      },
    ],
    howItWorks:
      'Melanopsin-containing retinal ganglion cells detect short-wavelength light and signal the suprachiasmatic nucleus to end melatonin production and start the circadian day.',
    protocol: [
      'Go outside within 30–60 minutes of waking.',
      'Get 5–10 minutes on a sunny day or 15–30 minutes on a cloudy one.',
      'Do not wear sunglasses. Prescription glasses and contact lenses are fine.',
    ],
    safetyProfile: {
      riskLevel: 'very low',
      sideEffects: [],
      contraindications: ['Eye sensitivity conditions (consult an ophthalmologist)'],
    },
    evidenceRating: 'A',
    researchSummary:
      'A fundamental mechanism of circadian biology. Huberman and other sleep researchers consistently rank this as the single highest-yield free intervention.',
    sources: [],
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'caffeine-timing',
    name: 'Caffeine Timing',
    slug: 'caffeine-timing',
    category: 'hygiene',
    tagline: 'Avoiding the trap',
    description:
      'Stopping caffeine intake 8–10 hours before bed. Caffeine has a half-life of 5–7 hours, so an afternoon coffee can still block adenosine receptors at 10pm — even if you feel like you can "fall asleep fine."',
    benefits: [
      {
        description:
          'Sleep architecture: preserves deep (slow-wave) sleep.',
        evidenceRating: 'A',
      },
      {
        description: 'Sleep latency: faster time to fall asleep.',
        evidenceRating: 'A',
      },
    ],
    howItWorks:
      'Caffeine is an adenosine-receptor antagonist. Adenosine is the neurotransmitter that drives sleep pressure, so blocking it disrupts both sleep onset and sleep depth.',
    protocol: [
      'No coffee after noon if you go to bed at 10pm.',
      'No coffee after 2pm if you go to bed at midnight.',
      'Decaf still contains small amounts of caffeine — treat it the same if you are sensitive.',
    ],
    safetyProfile: {
      riskLevel: 'low',
      sideEffects: [
        {
          name: 'Withdrawal headaches if cutting back too fast',
          severity: 'minor',
          frequency: 'common',
        },
      ],
      contraindications: [],
    },
    evidenceRating: 'A',
    researchSummary:
      'Even when caffeine does not delay sleep onset, it reduces slow-wave sleep quality and total deep sleep time in lab-verified polysomnography studies.',
    sources: [],
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'evening-darkness',
    name: 'Evening Darkness',
    slug: 'evening-darkness',
    category: 'hygiene',
    tagline: 'Dimming the lights',
    description:
      'Reducing light intensity and blue-light exposure in the 2 hours before bed. The brain uses light as the single strongest signal for whether it is day or night.',
    benefits: [
      {
        description:
          'Melatonin: allows the natural evening rise instead of suppressing it.',
        evidenceRating: 'A',
      },
    ],
    howItWorks:
      'Lack of blue light signals the suprachiasmatic nucleus that it is night. Evening melatonin release is the biological "lights out" cue.',
    protocol: [
      'Dim overhead lights 2 hours before bed.',
      'Switch devices to night mode or use amber-tinted glasses.',
      'Use low, warm bedside lamps instead of ceiling lights.',
    ],
    safetyProfile: {
      riskLevel: 'very low',
      sideEffects: [],
      contraindications: [],
    },
    evidenceRating: 'A',
    researchSummary:
      'Blue light (460–480 nm) suppresses melatonin significantly more than other wavelengths. Brainard et al. and others have mapped the action spectrum.',
    sources: [],
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'exercise-timing',
    name: 'Exercise Timing',
    slug: 'exercise-timing',
    category: 'hygiene',
    tagline: 'Move early, sleep early',
    description:
      'Avoiding vigorous exercise within 3 hours of bedtime. Exercise raises core body temperature and sympathetic tone — both need to come down for sleep onset.',
    benefits: [
      {
        description:
          'Body temperature: allows core temp to drop in the hours before bed.',
        evidenceRating: 'B',
      },
    ],
    howItWorks:
      'Exercise raises cortisol and core body temperature. Core temperature must drop by roughly 1°C to initiate sleep.',
    protocol: [
      'Aim to finish vigorous workouts by 6–7pm if you sleep at 10pm.',
      'Light walking, yoga, or stretching is fine closer to bed.',
      'If evenings are your only window, keep the workout moderate and finish with a cooldown.',
    ],
    safetyProfile: {
      riskLevel: 'very low',
      sideEffects: [],
      contraindications: [],
    },
    evidenceRating: 'B',
    researchSummary:
      'Mixed evidence — some people tolerate late exercise well, but the general direction of the literature favours earlier sessions.',
    sources: [],
    lastUpdated: LAST_UPDATED,
  },

  // --------------------------------------------------------------------------
  // ENVIRONMENT (4)
  // --------------------------------------------------------------------------
  {
    id: 'cold-room',
    name: 'Cold Room',
    slug: 'cold-room',
    category: 'environment',
    tagline: 'Thermal regulation',
    description:
      'Keeping the bedroom cool (18–20°C / 65–68°F). Core body temperature must drop to initiate sleep, and a cool room passively helps that along.',
    benefits: [
      {
        description: 'Sleep onset: faster time to fall asleep.',
        evidenceRating: 'A',
      },
      {
        description: 'Deep sleep: better slow-wave sleep quality.',
        evidenceRating: 'B',
      },
    ],
    howItWorks:
      'Core body temperature must drop by roughly 1°C to initiate sleep. A cool ambient temperature passively extracts heat so the body does not have to work against a warm environment.',
    protocol: [
      'Target 18–20°C in the bedroom.',
      'Use a fan or open window if your thermostat runs warm.',
      'Lighter bedding in summer, breathable natural fibres year-round.',
    ],
    safetyProfile: {
      riskLevel: 'very low',
      sideEffects: [],
      contraindications: [],
    },
    evidenceRating: 'A',
    researchSummary:
      'Thermal environment is a key determinant of sleep quality in lab studies and field research. Cheap and universally applicable.',
    sources: [],
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'blackout',
    name: 'Total Blackout',
    slug: 'blackout',
    category: 'environment',
    tagline: 'Pitch black',
    description:
      'Ensuring the bedroom is completely dark. Even dim light through closed eyelids can suppress melatonin and fragment sleep.',
    benefits: [
      {
        description:
          'Sleep maintenance: prevents middle-of-the-night wake-ups from light intrusion.',
        evidenceRating: 'B',
      },
    ],
    howItWorks:
      'Even dim light reaching the retina through closed eyelids can partially suppress melatonin and trigger cortisol release.',
    protocol: [
      'Install blackout curtains or heavy drapes.',
      'Cover or remove LED indicators on electronics.',
      'Use a sleep mask as a portable backup.',
    ],
    safetyProfile: {
      riskLevel: 'very low',
      sideEffects: [],
      contraindications: [],
    },
    evidenceRating: 'B',
    researchSummary:
      'A 2022 Northwestern study (Mason et al, PNAS) in 20 healthy adults found that a single night of dim ambient light during sleep was associated with measurable increases in nighttime heart rate and next-morning insulin resistance compared with sleeping in darkness.',
    sources: [
      {
        title:
          'Light exposure during sleep impairs cardiometabolic function',
        url: 'https://www.pnas.org/doi/10.1073/pnas.2113290119',
        type: 'study',
        year: 2022,
        authors: 'Mason IC, Grimaldi D, Reid KJ, et al.',
      },
    ],
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'weighted-blanket',
    name: 'Weighted Blanket',
    slug: 'weighted-blanket',
    category: 'environment',
    tagline: 'Deep pressure stimulation',
    description:
      'Using a heavy blanket (10–15% of body weight). Best evidence is for anxiety-related and autism-related sleep difficulties.',
    benefits: [
      {
        description: 'Anxiety: reduces subjective anxiety at bedtime.',
        evidenceRating: 'B',
      },
      {
        description:
          'Insomnia: improves sleep in anxiety and autism populations.',
        evidenceRating: 'B',
      },
    ],
    howItWorks:
      'Deep pressure touch increases parasympathetic nervous system activity and reduces cortisol. The sensation mimics being held.',
    protocol: [
      'Choose a blanket ~10–15% of your body weight.',
      'Start with naps if the weight feels unfamiliar.',
      'Avoid for children under 2 or anyone with respiratory compromise.',
    ],
    safetyProfile: {
      riskLevel: 'low',
      sideEffects: [
        {
          name: 'Overheating — can trap body heat on warm nights',
          severity: 'minor',
          frequency: 'common',
        },
      ],
      contraindications: ['Severe sleep apnoea', 'Severe asthma', 'Children under 2'],
    },
    evidenceRating: 'B',
    researchSummary:
      'Good evidence for anxiety-related and autism-related sleep issues. Generalised insomnia benefit is smaller but consistent in small trials.',
    sources: [],
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'mattress',
    name: 'Mattress Quality',
    slug: 'mattress',
    category: 'environment',
    tagline: 'Support and comfort',
    description:
      'Using a mattress that supports spinal alignment and matches your sleeping position. Old, sagging mattresses increase micro-arousals throughout the night.',
    benefits: [
      {
        description:
          'Pain: reduces back and hip pain that fragments sleep.',
        evidenceRating: 'A',
      },
    ],
    howItWorks:
      'Physical comfort reduces micro-wakeups caused by discomfort-driven position changes. Proper support keeps the spine in neutral alignment.',
    safetyProfile: {
      riskLevel: 'very low',
      sideEffects: [],
      contraindications: [],
    },
    evidenceRating: 'B',
    researchSummary:
      'Subjective but important. Replacing a mattress older than 8–10 years consistently improves sleep quality scores in trials.',
    sources: [],
    lastUpdated: LAST_UPDATED,
  },

  // --------------------------------------------------------------------------
  // SUPPLEMENTS (6)
  // --------------------------------------------------------------------------
  {
    id: 'magnesium-bisglycinate',
    name: 'Magnesium Bisglycinate',
    slug: 'magnesium',
    category: 'supplements',
    tagline: 'Relaxation mineral',
    description:
      'A chelated form of magnesium bonded to glycine. Bisglycinate absorbs well and avoids the laxative effect of magnesium citrate or oxide.',
    benefits: [
      {
        description: 'Relaxation: reduces muscle tension before bed.',
        evidenceRating: 'B',
      },
      {
        description:
          'Sleep quality: modest improvement in subjective and objective sleep quality in RCTs.',
        evidenceRating: 'B',
      },
    ],
    howItWorks:
      'Magnesium is a co-factor for GABA receptor activity. Glycine independently acts as an inhibitory neurotransmitter and helps lower core body temperature.',
    dosage: '200–400 mg elemental magnesium, taken 1 hour before bed',
    safetyProfile: {
      riskLevel: 'low',
      sideEffects: [],
      contraindications: ['Kidney failure', 'Severe cardiac conduction disorders'],
    },
    evidenceRating: 'A',
    researchSummary:
      'One of the safest sleep aids. Effect size is modest in healthy sleepers but can be meaningful in older adults and in people with subclinical magnesium deficiency.',
    sources: [],
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'melatonin',
    name: 'Melatonin',
    slug: 'melatonin',
    category: 'supplements',
    tagline: 'Circadian signal',
    description:
      'An over-the-counter hormone supplement. Most people take far too much — the physiological dose is roughly 0.3 mg, while common retail doses are 3–10 mg.',
    benefits: [
      {
        description: 'Sleep onset: reduces time to fall asleep.',
        evidenceRating: 'A',
      },
      {
        description: 'Jet lag: resets the circadian clock faster.',
        evidenceRating: 'A',
      },
    ],
    howItWorks:
      'Melatonin signals "darkness" to the body and shifts the circadian phase. It is most useful for phase-shifting (jet lag, shift work) and less reliable for chronic insomnia.',
    dosage: '0.3 mg to 3 mg, 30–60 minutes before bed. Less is more — higher doses increase side effects without increasing efficacy.',
    safetyProfile: {
      riskLevel: 'low',
      sideEffects: [
        {
          name: 'Grogginess the next morning',
          severity: 'minor',
          frequency: 'common',
        },
        {
          name: 'Vivid dreams or nightmares',
          severity: 'minor',
          frequency: 'common',
        },
      ],
      contraindications: ['Pregnancy (insufficient safety data)', 'Autoimmune conditions (theoretical concern)'],
    },
    evidenceRating: 'A',
    researchSummary:
      'Well-studied for jet lag and circadian phase shifts. Less effective for chronic primary insomnia than CBT-I. Low doses (0.3–0.5 mg) match physiological levels better than retail 3–10 mg formulations.',
    sources: [],
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'apigenin',
    name: 'Apigenin',
    slug: 'apigenin',
    category: 'supplements',
    tagline: 'Chamomile extract',
    description:
      'A bioflavonoid found in chamomile. Popularised by Andrew Huberman but backed by limited direct human trials as a standalone supplement.',
    benefits: [
      {
        description: 'Sedation: mild sedative effect via benzodiazepine receptors.',
        evidenceRating: 'C',
      },
    ],
    howItWorks:
      'Binds weakly and selectively to benzodiazepine receptors in the brain, producing a mild anxiolytic and sedative effect without the dependence profile of benzodiazepines.',
    dosage: '50 mg before bed',
    safetyProfile: {
      riskLevel: 'low',
      sideEffects: [],
      contraindications: ['Pregnancy', 'Blood thinner medications (theoretical interaction)'],
    },
    evidenceRating: 'C',
    researchSummary:
      'Popularised by Huberman. Limited human trials of the isolated compound. Chamomile tea itself has better (though still modest) evidence.',
    sources: [],
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'theanine',
    name: 'L-Theanine',
    slug: 'theanine',
    category: 'supplements',
    tagline: 'Calm focus',
    description:
      'An amino acid found in green tea. Helps with anxiety-related sleep difficulty without causing sedation.',
    benefits: [
      {
        description: 'Relaxation: reduces racing thoughts and bedtime anxiety.',
        evidenceRating: 'B',
      },
    ],
    howItWorks:
      'Increases alpha brain wave activity and modulates glutamate and GABA, producing a relaxed-but-alert state.',
    dosage: '100–200 mg before bed',
    safetyProfile: {
      riskLevel: 'very low',
      sideEffects: [],
      contraindications: [],
    },
    evidenceRating: 'B',
    researchSummary:
      'Good safety profile and a small but consistent effect size in anxiety-related sleep trials. Often stacked with magnesium for an additive effect.',
    sources: [],
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'glycine',
    name: 'Glycine',
    slug: 'glycine',
    category: 'supplements',
    tagline: 'Thermoregulation aid',
    description:
      'A simple amino acid that promotes peripheral vasodilation, helping lower core body temperature for sleep onset.',
    benefits: [
      {
        description:
          'Sleep quality: subjective improvement in multiple small trials.',
        evidenceRating: 'B',
      },
    ],
    howItWorks:
      'Glycine is an inhibitory neurotransmitter in its own right. It also promotes peripheral blood flow, which shunts heat to the skin and lowers core temperature.',
    dosage: '3 g before bed',
    safetyProfile: {
      riskLevel: 'very low',
      sideEffects: [],
      contraindications: [],
    },
    evidenceRating: 'B',
    researchSummary:
      'Safe, cheap, and backed by several small Japanese trials showing improved subjective sleep quality and next-day alertness.',
    sources: [],
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'valerian',
    name: 'Valerian Root',
    slug: 'valerian',
    category: 'supplements',
    tagline: 'Traditional sedative',
    description:
      'A herbal supplement with a long history of folk use. Modern meta-analyses show inconsistent results and rare cases of liver toxicity.',
    benefits: [
      {
        description:
          'Sleep: mixed results across studies — some positive, some null.',
        evidenceRating: 'C',
      },
    ],
    howItWorks:
      'GABA receptor modulation via valerenic acid. Mechanism is similar to benzodiazepines but much weaker.',
    safetyProfile: {
      riskLevel: 'low',
      sideEffects: [
        {
          name: 'Liver toxicity — rare but documented',
          severity: 'severe',
          frequency: 'rare',
        },
      ],
      contraindications: [
        'Liver disease',
        'Pregnancy',
        'SSRIs and other serotonergic antidepressants (serotonin syndrome risk)',
      ],
    },
    evidenceRating: 'C',
    researchSummary:
      'Inconsistent results in meta-analyses. Some individual trials show benefit; others show nothing. Choose magnesium or glycine first if you want a low-risk option.',
    sources: [],
    lastUpdated: LAST_UPDATED,
  },

  // --------------------------------------------------------------------------
  // TOOLS (3)
  // --------------------------------------------------------------------------
  {
    id: 'mouth-tape',
    name: 'Mouth Taping',
    slug: 'mouth-tape',
    category: 'tools',
    tagline: 'Nasal breathing enforcement',
    description:
      'Using specialised tape across the lips to enforce nasal breathing during sleep. Best evidence is for mild snoring and dry-mouth complaints.',
    benefits: [
      {
        description: 'Snoring: reduces snoring intensity and frequency.',
        evidenceRating: 'B',
      },
      {
        description: 'Airway: prevents dry mouth and morning throat irritation.',
        evidenceRating: 'B',
      },
    ],
    howItWorks:
      'Forces nasal breathing, which increases nitric oxide production, filters air, and maintains upper airway muscle tone.',
    protocol: [
      'Use purpose-made mouth tape (gentle hypoallergenic adhesive).',
      'Start with nap practice to build comfort.',
      'Stop immediately if you feel any breathing difficulty.',
    ],
    safetyProfile: {
      riskLevel: 'moderate',
      sideEffects: [
        {
          name: 'Anxiety — feeling of suffocation if nose becomes blocked',
          severity: 'moderate',
          frequency: 'uncommon',
        },
      ],
      contraindications: [
        'Untreated obstructive sleep apnoea (OSA) — mouth taping without diagnosis can be fatal',
        'Do not use without first screening for sleep apnoea — contact a physician for a home sleep study if you snore loudly, wake gasping, or experience daytime sleepiness',
        'Nasal congestion or obstruction',
        'High vomiting risk (alcohol, medications, illness, pregnancy)',
        'Any cardiopulmonary condition that affects breathing',
      ],
    },
    evidenceRating: 'C',
    researchSummary:
      'A 2022 single-arm preliminary trial (Lee et al, Healthcare) in 20 patients with mild obstructive sleep apnoea reported reduced AHI and snoring with mouth taping, but the evidence is preliminary and the sample is small. Mouth taping is not a substitute for CPAP in diagnosed moderate-to-severe sleep apnoea — and it can be actively dangerous if OSA has not been ruled out.',
    sources: [
      {
        title:
          'The Impact of Mouth-Taping in Mouth-Breathers with Mild Obstructive Sleep Apnea: A Preliminary Study',
        url: 'https://doi.org/10.3390/healthcare10091755',
        type: 'study',
        year: 2022,
        authors: 'Lee Y-C, Lu C-T, Cheng W-N, Li H-Y.',
      },
    ],
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'blue-blockers',
    name: 'Blue Light Blocking Glasses',
    slug: 'blue-blockers',
    category: 'tools',
    tagline: 'Evening light protection',
    description:
      'Amber- or red-lensed glasses worn in the 2 hours before bed. Effective only if they actually block the melanopsin action spectrum — clear "blue-light filtering" glasses do not qualify.',
    benefits: [
      {
        description:
          'Melatonin: preserves natural evening release by filtering short-wavelength light.',
        evidenceRating: 'B',
      },
    ],
    howItWorks:
      'Filters out 460–480 nm wavelengths that activate the melanopsin photoreceptors responsible for circadian signalling.',
    protocol: [
      'Wear them for the 2 hours before your target bedtime.',
      'Choose amber or red lenses, not clear "blue-light computer" lenses.',
      'Combine with dim overhead lighting for maximum effect.',
    ],
    safetyProfile: {
      riskLevel: 'very low',
      sideEffects: [],
      contraindications: [],
    },
    evidenceRating: 'B',
    researchSummary:
      'Effective if they actually block the relevant wavelengths. The marketing is ahead of the product quality on this one — look for amber/red, not clear lenses.',
    sources: [],
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'sleep-mask',
    name: 'Sleep Mask',
    slug: 'sleep-mask',
    category: 'tools',
    tagline: 'Portable blackout',
    description:
      'A simple eye mask worn during sleep. The cheapest and most portable way to achieve the benefits of a blackout bedroom.',
    benefits: [
      {
        description:
          'Darkness: ensures complete darkness regardless of bedroom conditions.',
        evidenceRating: 'A',
      },
    ],
    howItWorks:
      'Physically blocks all light from reaching the eyes, preventing melatonin suppression and light-driven arousal.',
    protocol: [
      'Choose a contoured mask that does not press on the eyes.',
      'Use on flights, in hotels, and when a partner has a different schedule.',
    ],
    safetyProfile: {
      riskLevel: 'very low',
      sideEffects: [],
      contraindications: [],
    },
    evidenceRating: 'A',
    researchSummary:
      'A cheap, portable way to replicate the benefits of a blackout bedroom. Recent trials show measurable next-day cognitive improvement from wearing a mask.',
    sources: [],
    lastUpdated: LAST_UPDATED,
  },

  // --------------------------------------------------------------------------
  // PROTOCOLS (2)
  // --------------------------------------------------------------------------
  {
    id: 'cbt-i',
    name: 'CBT-I',
    slug: 'cbt-i',
    category: 'protocols',
    tagline: 'Gold standard for insomnia',
    description:
      'Cognitive Behavioural Therapy for Insomnia. First-line treatment for chronic insomnia in every major clinical guideline, and more effective than sleep medication long-term.',
    benefits: [
      {
        description:
          'Insomnia remission: long-term resolution of chronic insomnia in roughly 70% of completers.',
        evidenceRating: 'A',
      },
    ],
    howItWorks:
      'Combines sleep restriction (temporarily limiting time in bed to build sleep drive), stimulus control (breaking the bed-is-for-wakefulness association), and cognitive restructuring of sleep-related anxiety.',
    protocol: [
      'Sleep restriction: limit time in bed to match actual sleep time, then gradually expand.',
      'Stimulus control: get out of bed if you are not asleep within 20 minutes.',
      'Cognitive restructuring: identify and challenge catastrophic thinking about sleep loss.',
      'Best delivered by a trained therapist or via a validated app (Sleepio, SHUTi, Somryst).',
    ],
    safetyProfile: {
      riskLevel: 'very low',
      sideEffects: [
        {
          name: 'Initial fatigue during the sleep restriction phase',
          severity: 'minor',
          frequency: 'common',
        },
      ],
      contraindications: ['Bipolar mania (caution — can trigger an episode)', 'Untreated severe sleep apnoea'],
    },
    evidenceRating: 'A',
    researchSummary:
      'First-line treatment for chronic insomnia in every major clinical guideline. More effective than sleep medication long-term. Not widely available in Canada outside major cities, but app-based versions are NICE- and FDA-recognised.',
    sources: [],
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'nsdr',
    name: 'NSDR / Yoga Nidra',
    slug: 'nsdr',
    category: 'protocols',
    tagline: 'Non-Sleep Deep Rest',
    description:
      'Guided relaxation protocols that produce deep rest without actual sleep. Useful as a nap replacement, post-lunch reset, or bedtime wind-down.',
    benefits: [
      {
        description: 'Stress: reduces sympathetic tone and subjective stress.',
        evidenceRating: 'B',
      },
      {
        description:
          'Recovery: early evidence for replenishing dopamine and restoring cognitive function.',
        evidenceRating: 'C',
      },
    ],
    howItWorks:
      'Guided body-scan and breath-awareness protocols shift the nervous system into a parasympathetic-dominant state similar to early-stage sleep, without actual sleep onset.',
    protocol: [
      'Use a 10–30 minute guided recording (free on YouTube or Spotify).',
      'Lie down in a quiet, dim room.',
      'Do not aim to sleep — aim to stay just awake and aware.',
    ],
    safetyProfile: {
      riskLevel: 'very low',
      sideEffects: [],
      contraindications: [],
    },
    evidenceRating: 'B',
    researchSummary:
      'Emerging evidence for NSDR as a partial replacement for lost sleep. Strong evidence for reducing subjective stress and improving focus.',
    sources: [],
    lastUpdated: LAST_UPDATED,
  },
];

// ============================================================================
// HELPERS
// ============================================================================

export function getSleepInterventionBySlug(
  slug: string
): SleepIntervention | undefined {
  return sleepInterventions.find((s) => s.slug === slug);
}

export function getSleepInterventionsByCategory(
  category: SleepIntervention['category']
): SleepIntervention[] {
  return sleepInterventions.filter((s) => s.category === category);
}

// Featured interventions for the /topics hub teaser and the sleep hub header.
// Hand-picked: highest-evidence examples across different categories.
const FEATURED_SLEEP_SLUGS = ['consistency', 'magnesium', 'cbt-i'] as const;

export function getFeaturedSleepInterventions(): SleepIntervention[] {
  return FEATURED_SLEEP_SLUGS.map((slug) => {
    const s = getSleepInterventionBySlug(slug);
    if (!s) {
      throw new Error(
        `getFeaturedSleepInterventions: featured slug "${slug}" not found in sleepInterventions. Fix FEATURED_SLEEP_SLUGS in lib/data/sleep.ts.`
      );
    }
    return s;
  });
}
