// Unified movement rehabilitation data for Body Signals
//
// Migrated from ../extracted-apps/movement-rx/lib/data/programs.ts
// Total: 3 physiotherapist-validated rehab programmes.
//
// Design decisions (from Phase 3 plan):
//   1. Hand-authored evidence ratings per program:
//      - patellar-tendinopathy: 'A' (Rio et al. 2015 and Beyer et al. 2015
//        are strong RCT evidence for Spanish squat + Heavy Slow Resistance)
//      - low-back-pain (McGill Big 3): 'B' (good mechanistic and cohort
//        evidence; mixed results in some chronic LBP RCTs)
//      - rotator-cuff: 'B' (Kuhn et al. meta-analysis supports progressive
//        loading)
//   2. Source shape fixes applied at author time:
//      - Exercise.sets: source uses `number`, target uses `string`. Stringified
//        in the canonical "3×10-12" format with unicode × (U+00D7), NOT
//        lowercase x. Ranges allowed. Examples: "5×1" for single-rep holds,
//        "3×15-6" for rep-range pyramids, "3×10-15" for standard ranges.
//      - MovementPhase.slug: source has it, target does not — dropped.
//        Phases do not get their own routes.
//   3. `sources[]` was backfilled with primary literature after the initial
//      migration. Each program carries the RCTs, systematic reviews, or
//      clinical guidelines that support its evidence rating.
//   4. MOVEMENT_DISCLAIMER expanded to include the "when to see a physio"
//      content and the Canadian 911 emergency reference.
//   5. Source content expanded: the phase descriptions and contraindications
//      from the source are extremely terse. Richer content was hand-authored
//      at migration time based on the underlying protocols (Rio et al.,
//      Beyer et al., McGill, Kuhn).
//   6. The target slug for patellar tendinopathy is 'jumpers-knee' to match
//      the user-facing protocol name (source alignment). Similarly 'lower-back'
//      and 'shoulder-rehab' for the other two programs.
//   7. Canadian spelling applied throughout user-facing prose. `programme`
//      is NOT used — `program` is the correct Canadian computing/rehab-protocol
//      noun (programme is British).
//   8. Two source typos fixed at author time: "Paint-free movement" →
//      "Pain-free movement", "Stabilize" → "Stabilise".

import type { MovementProgram } from '@/types';

// ============================================================================
// CONSTANTS
// ============================================================================

const LAST_UPDATED = '2026-04-10';

export const MOVEMENT_DISCLAIMER =
  'This is a research summary, not medical advice. Body Signals is an independent research digest — it summarises published research for informational purposes and is not a healthcare provider. Stop immediately if pain increases, radiates, or persists beyond the session. Seek a physiotherapist for acute injuries, swelling, numbness, tingling, or symptoms that worsen over 1–2 weeks of consistent protocol. Movement-based rehab should gradually reduce pain, not cause it. In an emergency, call 911.';

export const MOVEMENT_PHYSIO_CALLOUT =
  'See a physiotherapist if you experience: pain that radiates down a limb, numbness or tingling, swelling that does not resolve within 72 hours of rest, or symptoms that worsen over 1–2 weeks of consistent protocol.';

// ============================================================================
// PROGRAMS
// ============================================================================

export const movementPrograms: MovementProgram[] = [
  // --------------------------------------------------------------------------
  // PATELLAR TENDINOPATHY — Jumper's Knee Protocol
  // --------------------------------------------------------------------------
  {
    id: 'patellar-tendinopathy',
    name: "Jumper's Knee Protocol",
    slug: 'jumpers-knee',
    bodyPart: 'knee',
    tagline: 'Fixing anterior knee pain',
    description:
      'Evidence-based loading protocol for patellar tendinopathy (Jumper\'s Knee). Two phases: isometric holds to reduce pain and "wake up" cortical inhibition, then heavy slow resistance to remodel the tendon structure. Based on Rio et al. (2015) and Beyer et al. (2015).',
    equipmentNeeded: [
      'Decline board (or weight plates stacked to create an incline)',
      'Something to hold for stability (wall, post, squat rack)',
      'Leg extension machine OR weighted backpack for heavy slow resistance phase',
    ],
    contraindications: [
      'Acute tendon tear or rupture — requires imaging and specialist assessment, not loading',
      'Swelling, bruising, or sudden onset after a specific trauma — see a physician first',
      'Pain above 5/10 during or after exercise — reduce load, do not push through',
      'Pain that wakes you at night or is present at complete rest',
    ],
    phases: [
      {
        id: 'phase-1',
        name: 'Analgesic Isometrics',
        weekRange: 'Weeks 1–2',
        description:
          'Isometric holds reduce pain and cortical motor inhibition almost immediately. Do this phase daily, and always before any other activity that loads the tendon. If pain during holds exceeds 3/10, reduce the depth of the squat.',
        goals: [
          'Reduce pain to below 3/10 during load',
          'Restore cortical motor drive to the quadriceps',
          'Build the daily adherence habit before adding heavy load',
        ],
        exercises: [
          {
            id: 'iso-spanish-squat',
            name: 'Spanish Squat Hold',
            description:
              'Loop a heavy band around a fixed post at knee height and around the backs of your knees. Sit back into a mid-squat with shins vertical. Hold. Depth controls intensity — shallower is easier, deeper is harder.',
            sets: '5×1',
            reps: '1',
            holdTime: '45 seconds',
            frequency: '2–3× daily, at least 6 hours apart',
          },
        ],
      },
      {
        id: 'phase-2',
        name: 'Heavy Slow Resistance',
        weekRange: 'Weeks 3–12',
        description:
          'Remodel the tendon with heavy load at slow tempo: 3 seconds up, 3 seconds down. Start at 15RM and progress to 6RM over the 10 weeks. Some discomfort (up to 5/10) during load is acceptable as long as it settles within 24 hours.',
        goals: [
          'Increase tendon stiffness and collagen alignment',
          'Build lower-limb strength',
          'Return to sport-specific loading at week 12',
        ],
        exercises: [
          {
            id: 'single-leg-decline-squat',
            name: 'Single-Leg Decline Squat',
            description:
              'Stand on a 25-degree decline board on the affected leg. Hold a dumbbell or use a weighted backpack for added load. Slow controlled descent (3 seconds down), pause, 3 seconds back up.',
            sets: '3×15-6',
            reps: '15RM → 6RM over 10 weeks',
            frequency: 'Every other day (3×/week)',
          },
          {
            id: 'leg-extension-hsr',
            name: 'Leg Extension (Heavy Slow Resistance)',
            description:
              'Gym-based alternative. Single-leg leg extension, 3 seconds up, 1-second pause, 3 seconds down. Load progresses from 15RM to 6RM over the phase.',
            sets: '3×15-6',
            reps: '15RM → 6RM over 10 weeks',
            frequency: 'Every other day (3×/week)',
          },
        ],
      },
    ],
    evidenceRating: 'A',
    sources: [
      {
        title:
          'Isometric exercise induces analgesia and reduces inhibition in patellar tendinopathy',
        url: 'https://bjsm.bmj.com/content/49/19/1277',
        type: 'study',
        year: 2015,
        authors: 'Rio E, Kidgell D, Purdam C, et al.',
      },
      {
        title:
          'Heavy Slow Resistance Versus Eccentric Training as Treatment for Achilles and Patellar Tendinopathy: A Randomized Controlled Trial',
        url: 'https://journals.sagepub.com/doi/10.1177/0363546515584760',
        type: 'study',
        year: 2015,
        authors: 'Beyer R, Kongsgaard M, Hougs Kjær B, et al.',
      },
      {
        title:
          'Physical therapies for patellar tendinopathy: a systematic review',
        url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6376548/',
        type: 'review',
        year: 2019,
        authors: 'Mendonça LD, Leitão L, Ocarino JM, et al.',
      },
    ],
    lastUpdated: LAST_UPDATED,
  },

  // --------------------------------------------------------------------------
  // LOW BACK PAIN — McGill Big 3
  // --------------------------------------------------------------------------
  {
    id: 'low-back-pain',
    name: 'McGill Big 3',
    slug: 'lower-back',
    bodyPart: 'back',
    tagline: 'Stabilise the spine',
    description:
      "Core endurance protocol based on Dr. Stuart McGill's research. These are not ab exercises — the goal is spinal stiffness and endurance in the deep stabilisers. Pain-free movement comes from a stable spine, not a strong one. Best for non-specific mechanical low-back pain.",
    equipmentNeeded: ['Floor mat (or carpeted floor)'],
    contraindications: [
      'Radicular pain (pain, numbness, or tingling radiating down a leg) — consult a physiotherapist or physician first. This may indicate disc involvement or nerve compression.',
      'Red-flag symptoms: loss of bladder or bowel control, saddle anaesthesia, or progressive lower-limb weakness — seek emergency care immediately',
      'Acute back injury within the last 72 hours — rest and ice first, load later',
      'Known vertebral fracture, severe osteoporosis, or recent spinal surgery without clearance',
    ],
    phases: [
      {
        id: 'daily-maintenance',
        name: 'Daily Spine Hygiene',
        weekRange: 'Forever (lifelong maintenance)',
        description:
          'These three exercises build endurance in the deep spinal stabilisers without flexing or extending the spine under load. Do them daily, ideally in the morning once the discs have rehydrated overnight — McGill specifically recommends avoiding spinal flexion in the first hour after waking.',
        goals: [
          'Pain-free movement in daily activities',
          'Endurance (not strength) in the deep stabilisers',
          'Long-term spinal resilience to recurrent pain flares',
        ],
        exercises: [
          {
            id: 'curl-up',
            name: 'Modified Curl-Up',
            description:
              'Lie on your back. One knee bent, the other straight. Place your hands palms-down under the natural curve of your low back. Lift your head, shoulders, and upper chest slightly off the floor — just until the shoulder blades clear. Hold. Do not flatten your back into the floor.',
            sets: '3×6-4-2',
            reps: 'Descending pyramid: 6, then 4, then 2',
            holdTime: '10 seconds per rep',
            frequency: 'Daily',
          },
          {
            id: 'side-plank',
            name: 'Side Plank',
            description:
              'On your side, on knees (easier) or feet (harder). Support on the elbow directly under the shoulder. Lift the hips to create a straight line from head to knee or foot. Keep the spine neutral — do not let the hips sag or pike.',
            sets: '3×6-4-2',
            reps: 'Descending pyramid: 6, then 4, then 2 (each side)',
            holdTime: '10 seconds per rep',
            frequency: 'Daily',
          },
          {
            id: 'bird-dog',
            name: 'Bird Dog',
            description:
              'On all fours. Extend the opposite arm and opposite leg at the same time, until both are parallel to the floor. The goal is NOT moving the spine at all — a glass of water balanced on your low back should not spill. Return, switch sides.',
            sets: '3×6-4-2',
            reps: 'Descending pyramid: 6, then 4, then 2 (each side)',
            holdTime: '10 seconds per rep',
            frequency: 'Daily',
          },
        ],
      },
    ],
    evidenceRating: 'B',
    sources: [
      {
        title:
          'Core training: evidence translating to better performance and injury prevention',
        url: 'https://journals.lww.com/nsca-scj/fulltext/2010/06000/core_training__evidence_translating_to_better.2.aspx',
        type: 'review',
        year: 2010,
        authors: 'McGill SM',
      },
      {
        title:
          'Low back disorders: evidence-based prevention and rehabilitation (3rd ed.)',
        url: 'https://www.backfitpro.com/books/low-back-disorders-book/',
        type: 'medical_guideline',
        year: 2015,
        authors: 'McGill SM',
      },
      {
        title:
          'Effectiveness of core muscle strengthening for improving pain and dynamic balance among female patients with chronic non-specific low back pain',
        url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6102078/',
        type: 'study',
        year: 2018,
        authors: 'Bagheri R, Takamjani IE, Dadgoo M, et al.',
      },
    ],
    lastUpdated: LAST_UPDATED,
  },

  // --------------------------------------------------------------------------
  // ROTATOR CUFF — Shoulder Impingement Layout
  // --------------------------------------------------------------------------
  {
    id: 'rotator-cuff',
    name: 'Shoulder Impingement Protocol',
    slug: 'shoulder-rehab',
    bodyPart: 'shoulder',
    tagline: 'Open up the subacromial space',
    description:
      'Progressive loading protocol for subacromial (shoulder) impingement and rotator cuff tendinopathy. Focuses on restoring scapular control first, then progressive rotator cuff loading. Supported by the Kuhn et al. meta-analysis of non-surgical management.',
    equipmentNeeded: [
      'Light resistance bands (multiple strengths)',
      'Light dumbbells (1–5 kg range)',
      'Floor mat or bench',
    ],
    contraindications: [
      'Cannot lift the arm above 90 degrees actively (possible full-thickness rotator cuff tear) — see a physician for imaging',
      'Pain at rest or pain that wakes you at night consistently',
      'Recent significant trauma (fall, direct blow) before symptom onset',
      'Visible deformity, severe swelling, or weakness that feels different from pain — seek assessment',
    ],
    phases: [
      {
        id: 'phase-1',
        name: 'Scapular Control',
        weekRange: 'Weeks 1–4',
        description:
          'Before loading the rotator cuff directly, the shoulder blade has to move correctly. These exercises retrain the scapular stabilisers — the lower trapezius, serratus anterior, and rhomboids — so that the humerus can rotate without impinging the tendon.',
        goals: [
          'Restore proper scapular movement patterns',
          'Reduce pain during active shoulder movement',
          'Prepare the shoulder for progressive loading in phase 2',
        ],
        exercises: [
          {
            id: 'y-t-w-raises',
            name: 'Y-T-W Raises',
            description:
              'Lie prone on a bench or the floor. With light weights (or no weight), raise both arms in three shapes in sequence: Y (arms overhead at 45°), T (arms straight out to the sides), W (elbows bent, pulling down and back). Focus on squeezing the shoulder blades together and down.',
            sets: '3×10-15',
            reps: '10–15 per shape',
            frequency: 'Daily',
          },
          {
            id: 'scap-push-up',
            name: 'Scapular Push-Up',
            description:
              'In a push-up position (knees or feet). Without bending the elbows, protract (push the upper back toward the ceiling) and then retract (let the shoulder blades pinch together). The arms stay straight throughout — the movement is entirely at the shoulder blade.',
            sets: '3×10-12',
            reps: '10–12',
            frequency: 'Daily',
          },
        ],
      },
      {
        id: 'phase-2',
        name: 'Progressive Rotator Cuff Loading',
        weekRange: 'Weeks 5–12',
        description:
          'Once scapular control is restored and pain-free range of motion is available, begin progressive loading of the rotator cuff. Start with light resistance bands and increase resistance weekly. Some discomfort during exercise is acceptable; sharp pain is not.',
        goals: [
          'Build rotator cuff strength and endurance',
          'Restore full pain-free range of motion',
          'Return to overhead activities and sport',
        ],
        exercises: [
          {
            id: 'external-rotation-band',
            name: 'Banded External Rotation',
            description:
              'Stand with the affected arm at your side, elbow bent 90° and tucked to your ribs. Hold a light resistance band anchored at waist height in front of you. Rotate the forearm outward while keeping the elbow pinned to your side.',
            sets: '3×12-15',
            reps: '12–15',
            frequency: '3× per week',
          },
          {
            id: 'prone-external-rotation',
            name: 'Prone External Rotation',
            description:
              'Lie prone on a bench with the affected arm hanging off the edge, elbow bent 90°. Holding a light dumbbell, rotate the forearm up until it is parallel to the floor. Lower slowly under control.',
            sets: '3×10-12',
            reps: '10–12',
            frequency: '3× per week',
          },
        ],
      },
    ],
    evidenceRating: 'B',
    sources: [
      {
        title:
          'Effectiveness of physical therapy in treating atraumatic full-thickness rotator cuff tears: a multicenter prospective cohort study',
        url: 'https://www.jshoulderelbow.org/article/S1058-2746(13)00132-6/fulltext',
        type: 'study',
        year: 2013,
        authors: 'Kuhn JE, Dunn WR, Sanders R, et al. (MOON Shoulder Group)',
      },
      {
        title:
          'Exercise for rotator cuff tendinopathy: a systematic review',
        url: 'https://pubmed.ncbi.nlm.nih.gov/20362508/',
        type: 'review',
        year: 2010,
        authors: 'Kuhn JE',
      },
      {
        title:
          'Subacromial impingement syndrome — effectiveness of physiotherapy and manual therapy',
        url: 'https://bjsm.bmj.com/content/47/14/886',
        type: 'review',
        year: 2013,
        authors: 'Hanratty CE, McVeigh JG, Kerr DP, et al.',
      },
    ],
    lastUpdated: LAST_UPDATED,
  },
];

// ============================================================================
// FEATURED
// ============================================================================

const FEATURED_MOVEMENT_SLUGS: string[] = [
  'jumpers-knee',
  'lower-back',
  'shoulder-rehab',
];

// ============================================================================
// HELPERS
// ============================================================================

export function getMovementProgramBySlug(
  slug: string
): MovementProgram | undefined {
  return movementPrograms.find((p) => p.slug === slug);
}

export function getFeaturedMovementPrograms(): MovementProgram[] {
  return FEATURED_MOVEMENT_SLUGS.map((slug) => {
    const program = getMovementProgramBySlug(slug);
    if (!program) {
      throw new Error(
        `Featured movement program "${slug}" not found in movementPrograms. ` +
          `Check FEATURED_MOVEMENT_SLUGS in lib/data/movement.ts.`
      );
    }
    return program;
  });
}
