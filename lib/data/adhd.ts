// Unified ADHD systems & tools data for Body Signals
//
// Migrated from ../extracted-apps/adhd-systems/lib/data/systems.ts
// Total: 18 tactical systems + 6 recommended tools.
//
// Design decisions (from Phase 3 plan):
//   1. Evidence ratings are HAND-AUTHORED per system, not blanket-defaulted.
//      A uniform 'C' across 18 tactical systems would feel lazy and erode
//      trust. Ratings follow this rubric:
//        - 'B' — tactic maps to a studied intervention (body doubling,
//          time-boxing/Pomodoro, externalising working memory/capture,
//          habit stacking/medication station, circadian anchoring/reverse
//          alarm)
//        - 'C' — tactical consensus, minimal direct RCT evidence
//          (everything else — doom boxes, launch pad, impulse waitlist,
//          text batching, etc.). Every 'C'-rated system gets the
//          ADHD_TACTICAL_TOOLTIP as its ratingNote.
//   2. The ADHD hub deliberately surfaces DIFFICULTY and IMPACT as the
//      primary visual metrics — evidence ratings are present but visually
//      de-emphasised (muted inline chip, not the full EvidenceBadge).
//      ADHD_RATING_NOTE is displayed once at the hub level to explain why.
//   3. Source shape fix applied at author time: `steps[]` drops the extra
//      `id` field (source has {id, order, text, tip?}, target has
//      {order, text, tip?}).
//   4. Category display order is hand-picked (productivity → home →
//      finances → health → relationships) to lead with broad applicability.
//   5. Canadian spelling applied throughout user-facing prose. `organize`
//      and `organize`-derived words become `organise`/`organising`. Two
//      source typos were fixed at author time: "Relationship savor" →
//      "Relationship saver", "you wont get them" → "you won't get them",
//      "safetly" → "safely".
//   6. ADHD_DISCLAIMER includes jurisdiction-correct crisis contacts
//      (988 Canada/US, 741741 US Crisis Text Line, 686868 Canada via
//      Kids Help Phone) per the Phase 2 MH_DISCLAIMER pattern — ADHD
//      commonly co-occurs with depression/anxiety.

import type { ADHDSystem, ADHDTool } from '@/types';

// ============================================================================
// CONSTANTS
// ============================================================================

const LAST_UPDATED = '2026-04-10';

export const ADHD_DISCLAIMER =
  'This is a research summary, not medical advice. Body Signals is an independent research digest — it summarises published research for informational purposes and is not a healthcare provider. ADHD management is highly individual — what works for one person may not work for another. These are tactical systems, not medical treatment. If you suspect untreated ADHD, speak with a physician or psychologist. ADHD commonly co-occurs with depression and anxiety; if you are in crisis, call or text 988 (Suicide & Crisis Lifeline, Canada and US), text HOME to 741741 (Crisis Text Line, US) or CONNECT to 686868 (Kids Help Phone, Canada).';

export const ADHD_RATING_NOTE =
  "Evidence ratings on this hub are hand-authored per system. 'B' where the tactic maps to well-studied research (body doubling, implementation intentions, externalising working memory, time-boxing). 'C' where evidence is practitioner consensus without direct RCT support. The primary metrics on this hub are difficulty (ease of adoption) and impact (reported life effect) — evidence ratings are a secondary signal. See individual system tooltips for per-system rating context.";

export const ADHD_TACTICAL_TOOLTIP =
  'Tactical system — minimal direct RCT evidence, rated on practitioner consensus.';

export const ADHD_CATEGORY_LABELS: Record<string, string> = {
  productivity: 'Productivity',
  home: 'Home',
  finances: 'Finances',
  health: 'Health',
  relationships: 'Relationships',
};

export const ADHD_CATEGORY_DISPLAY_ORDER: string[] = [
  'productivity',
  'home',
  'finances',
  'health',
  'relationships',
];

// ============================================================================
// TOOLS
// ============================================================================

export const adhdTools: ADHDTool[] = [
  {
    id: 'todoist',
    name: 'Todoist',
    description: 'Natural-language task manager with a strong capture inbox — good fit for universal capture workflows.',
    url: 'https://todoist.com',
    price: 'Freemium',
    icon: 'ListChecks',
  },
  {
    id: 'google-calendar',
    name: 'Google Calendar',
    description: 'The external brain for time blindness. Free, shared between partners, syncs everywhere.',
    url: 'https://calendar.google.com',
    price: 'Free',
    icon: 'Calendar',
  },
  {
    id: 'ynab',
    name: 'YNAB (You Need A Budget)',
    description: 'Zero-based budgeting app that forces money to be assigned a job. Works well with the Separate Accounts system.',
    url: 'https://ynab.com',
    price: 'Paid',
    icon: 'Wallet',
  },
  {
    id: 'goblin-tools',
    name: 'Goblin Tools',
    description: 'AI task breaker-downer. Paste a vague task, get a concrete step list — removes the "where do I start" paralysis.',
    url: 'https://goblin.tools',
    price: 'Free',
    icon: 'Wand2',
  },
  {
    id: 'tile',
    name: 'Tile / AirTag',
    description: 'Bluetooth trackers for keys, wallet, bag. Pairs with the Launch Pad system as a fallback when the pad fails.',
    url: 'https://www.tile.com',
    price: 'Paid',
    icon: 'Tag',
  },
  {
    id: 'one-sec',
    name: 'One Sec',
    description: 'Adds friction before opening distracting apps — a breathing screen interrupts impulsive scrolling loops.',
    url: 'https://one-sec.app',
    price: 'Freemium',
    icon: 'Smartphone',
  },
];

// ============================================================================
// SYSTEMS
// ============================================================================

export const adhdSystems: ADHDSystem[] = [
  // --------------------------------------------------------------------------
  // PRODUCTIVITY
  // --------------------------------------------------------------------------
  {
    id: 'body-doubling',
    name: 'Body Doubling',
    slug: 'body-doubling',
    category: 'productivity',
    tagline: 'Working alongside someone else',
    description:
      "Performing a task in the presence of another person. The other person doesn't need to help — they just need to be there, working on their own thing.",
    whyItWorks:
      'Social facilitation (Zajonc, 1965, and modern ADHD co-working research) shows that passive presence anchors attention and reduces the "pain" of starting. Mirror neurons and mild social accountability do the work that willpower cannot.',
    difficulty: 'Easy',
    impact: 'High',
    timeToImplement: 'Immediate',
    steps: [
      {
        order: 1,
        text: 'Find a partner — a friend, roommate, video-call buddy, or paid service like Focusmate.',
        tip: 'Focusmate pairs you with strangers for 25- or 50-minute silent work sessions. Surprisingly effective.',
      },
      {
        order: 2,
        text: 'State your goal specifically out loud before starting: "I am going to draft the first paragraph of this email."',
      },
      {
        order: 3,
        text: 'Work silently for a set period. Resist the urge to chat.',
      },
    ],
    commonPitfalls: [
      'Chatting instead of working — body doubling is not a hangout.',
      'Waiting for the "perfect" partner instead of starting with whoever is available.',
    ],
    tools: ['todoist'],
    evidenceRating: 'B',
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'pomodoro',
    name: 'Modified Pomodoro',
    slug: 'pomodoro',
    category: 'productivity',
    tagline: 'Time-boxed working sprints',
    description:
      'Working for short bursts with guaranteed breaks — 15 or 25 minutes on, 5 minutes off.',
    whyItWorks:
      'Time-boxing shortens the perceived time horizon, which is central to the ADHD time-perception deficit. "Work on this for 25 minutes" is tractable; "work on this project" is not. Barkley\'s executive function model and time-horizon research both support short, bounded work intervals.',
    difficulty: 'Easy',
    impact: 'Medium',
    timeToImplement: 'Immediate',
    steps: [
      {
        order: 1,
        text: 'Set a timer for 25 minutes (or 15 if 25 feels too long).',
        tip: 'Visual timers beat digital ones — see the Visual Timers system.',
      },
      {
        order: 2,
        text: 'Work on ONE thing until the timer rings. Park every other thought in your capture inbox.',
      },
      {
        order: 3,
        text: 'Take a 5-minute dopamine break: move, snack, stretch. Not scroll.',
      },
    ],
    commonPitfalls: [
      'Ignoring the break and burning out.',
      'Ignoring the timer when hyperfocus kicks in — sometimes fine, often not.',
      'Setting intervals too long. 25 is the ceiling, not the floor.',
    ],
    tools: ['google-calendar'],
    evidenceRating: 'B',
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'task-batching',
    name: 'Task Batching',
    slug: 'task-batching',
    category: 'productivity',
    tagline: 'Grouping similar tasks',
    description:
      'Doing all similar tasks (emails, phone calls, errands) in one dedicated block instead of scattering them across the day.',
    whyItWorks:
      'Reduces context-switching cost. ADHD brains burn disproportionate energy switching between task types — each switch is a fresh activation cost.',
    difficulty: 'Medium',
    impact: 'Medium',
    timeToImplement: '1 week',
    steps: [
      {
        order: 1,
        text: 'List all recurring small tasks you do in a week.',
      },
      {
        order: 2,
        text: 'Group them by context: computer tasks, phone tasks, car/errand tasks.',
      },
      {
        order: 3,
        text: 'Schedule a specific block in your week for each batch. Protect those blocks.',
      },
    ],
    commonPitfalls: [
      'Batching too much into one block and getting overwhelmed.',
      'Not actually putting the batch on the calendar.',
    ],
    evidenceRating: 'C',
    ratingNote: ADHD_TACTICAL_TOOLTIP,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'capture-system',
    name: 'Universal Capture',
    slug: 'capture-system',
    category: 'productivity',
    tagline: 'Stop trusting your brain',
    description:
      'A single, reliable place to write things down the instant they occur to you — tasks, ideas, random thoughts.',
    whyItWorks:
      "Offloads working memory — a well-studied ADHD deficit. Barkley's executive function model identifies externalising working memory as one of the highest-leverage interventions. Stops the background anxiety of \"I need to remember this\" and frees attention for the current task.",
    difficulty: 'Medium',
    impact: 'High',
    timeToImplement: '1 day',
    steps: [
      {
        order: 1,
        text: 'Choose ONE digital inbox and ONE physical inbox. Not two of each.',
        tip: 'A note-taking app on your phone + a notebook on your desk is plenty.',
      },
      {
        order: 2,
        text: 'Write everything down the instant it occurs. No filtering, no deciding if it matters.',
      },
      {
        order: 3,
        text: 'Process the inbox once a day (or once a week). Move items to where they belong: calendar, task list, reference, or bin.',
      },
    ],
    commonPitfalls: [
      'Having too many inboxes — you end up searching three places for one note.',
      'Never processing the list, so it becomes a graveyard you stop trusting.',
    ],
    tools: ['todoist', 'goblin-tools'],
    evidenceRating: 'B',
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'five-minute-rule',
    name: 'The 5-Minute Rule',
    slug: 'five-minute-rule',
    category: 'productivity',
    tagline: 'Trick yourself into starting',
    description:
      'Commit to doing a task for only 5 minutes. Give yourself genuine permission to stop after.',
    whyItWorks:
      'Lowers the activation energy of starting, which is the hardest part of any task for an ADHD brain. Usually, once started, momentum or hyperfocus takes over and you keep going.',
    difficulty: 'Easy',
    impact: 'Medium',
    timeToImplement: 'Immediate',
    steps: [
      {
        order: 1,
        text: 'Pick a task you have been avoiding.',
      },
      {
        order: 2,
        text: 'Set a timer for 5 minutes.',
      },
      {
        order: 3,
        text: 'Start. The permission to stop after 5 minutes is genuine — honouring it is what keeps the technique effective long-term.',
      },
    ],
    commonPitfalls: [
      'Not actually allowing yourself to stop — the rule stops working if it becomes a bait-and-switch.',
      'Picking a huge task that feels unstartable even in 5-minute chunks.',
    ],
    evidenceRating: 'C',
    ratingNote: ADHD_TACTICAL_TOOLTIP,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'gamification',
    name: 'Gamification',
    slug: 'gamification',
    category: 'productivity',
    tagline: 'Points for tasks',
    description:
      'Turning chores and routines into an RPG with XP, levels, and rewards.',
    whyItWorks:
      'Short-term dopamine feedback loops give boring tasks the immediate reward signal the ADHD brain craves. Useful as a bridge until the task itself becomes habitual.',
    difficulty: 'Medium',
    impact: 'Medium',
    timeToImplement: 'Varies',
    steps: [
      {
        order: 1,
        text: 'Use a dedicated app (Habitica is the classic) or invent your own point system.',
      },
      {
        order: 2,
        text: 'Assign XP to the chores you keep avoiding.',
      },
      {
        order: 3,
        text: 'Set real rewards for level-ups — a small treat, a break, whatever works.',
      },
    ],
    commonPitfalls: [
      'Getting bored of the game itself after a few weeks.',
      'Cheating the system and losing trust in the points.',
    ],
    evidenceRating: 'C',
    ratingNote: ADHD_TACTICAL_TOOLTIP,
    lastUpdated: LAST_UPDATED,
  },

  // --------------------------------------------------------------------------
  // HOME
  // --------------------------------------------------------------------------
  {
    id: 'launch-pad',
    name: 'The Launch Pad',
    slug: 'launch-pad',
    category: 'home',
    tagline: 'Never lose your keys again',
    description:
      'A dedicated station right by the door for everything needed to leave the house — keys, wallet, bag, charger, headphones.',
    whyItWorks:
      'Removes the "hunt" variable from leaving the house. Visual cues trigger memory retrieval better than internal recall. One designated spot reduces decision load at a moment when executive function is already low.',
    difficulty: 'Easy',
    impact: 'High',
    timeToImplement: '1 hour',
    steps: [
      {
        order: 1,
        text: 'Clear a small surface near the door — a shelf, a tray, a hook wall.',
      },
      {
        order: 2,
        text: 'Add a bowl for keys and wallet, a charger for phone and headphones, and a hook for the bag.',
      },
      {
        order: 3,
        text: 'Put everything there EVERY time you walk in. Non-negotiable — this is the only rule.',
      },
    ],
    commonPitfalls: [
      'Letting it become a junk pile where real items get buried.',
      'Not putting items back immediately — the habit dies fast without it.',
    ],
    tools: ['tile'],
    evidenceRating: 'C',
    ratingNote: ADHD_TACTICAL_TOOLTIP,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'doom-box',
    name: 'Doom Boxes (Managed)',
    slug: 'doom-box',
    category: 'home',
    tagline: "Didn't Organise, Only Moved",
    description:
      'Using baskets to sweep-clear visible clutter in a hurry, paired with a scheduled processing block so the boxes do not become permanent graveyards.',
    whyItWorks:
      'Allows for fast visual tidying without the decision fatigue of organising each item in real time. The key is the scheduled processing block — unmanaged doom boxes are how clutter compounds.',
    difficulty: 'Medium',
    impact: 'Medium',
    timeToImplement: 'Immediate',
    steps: [
      {
        order: 1,
        text: 'Get one basket per room that tends to accumulate clutter.',
      },
      {
        order: 2,
        text: 'When overwhelmed, sweep surface clutter into the basket. Surfaces are now clear.',
      },
      {
        order: 3,
        text: 'Schedule a weekly "doom box processing" block on the calendar. Process to empty every time.',
      },
    ],
    commonPitfalls: [
      'Never processing the box — it becomes a permanent clutter graveyard.',
      'Having too many boxes and losing track of what is where.',
    ],
    evidenceRating: 'C',
    ratingNote: ADHD_TACTICAL_TOOLTIP,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'point-of-performance',
    name: 'Point of Performance Storage',
    slug: 'point-of-performance',
    category: 'home',
    tagline: 'Store it where you use it',
    description:
      'Keeping items exactly where they will be used, even if it means buying duplicates. Scissors in every room that needs scissors.',
    whyItWorks:
      "Eliminates friction. If the scissors are in the kitchen but you need them in the office, you won't get them — you'll give up. Duplicating cheap items is a rounding error compared to the cost of chronic avoidance.",
    difficulty: 'Easy',
    impact: 'High',
    timeToImplement: 'Ongoing',
    steps: [
      {
        order: 1,
        text: 'Identify items you constantly hunt for: scissors, chargers, pens, cleaning spray, tape.',
      },
      {
        order: 2,
        text: 'Buy one for every room that needs it. Cheap duplicates, not premium ones.',
      },
      {
        order: 3,
        text: 'Store them visibly, not in drawers. The point is reducing friction to zero.',
      },
    ],
    commonPitfalls: [
      'Clutter creep from too many visible items.',
      'Cost of duplicates — use cheap versions, not premium ones.',
    ],
    evidenceRating: 'C',
    ratingNote: ADHD_TACTICAL_TOOLTIP,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'visual-timers',
    name: 'Visual Timers',
    slug: 'visual-timers',
    category: 'home',
    tagline: 'See time passing',
    description:
      'Using analog clocks or Time Timers that show time as a shrinking coloured disk instead of abstract digital numbers.',
    whyItWorks:
      'ADHD brains have measurable time blindness — the gap between "a minute" and "ten minutes" is harder to feel. A visual disk makes time passing physically observable in a way digital numbers cannot.',
    difficulty: 'Easy',
    impact: 'Medium',
    timeToImplement: 'Immediate',
    steps: [
      {
        order: 1,
        text: 'Buy a Time Timer or similar visual analog timer.',
      },
      {
        order: 2,
        text: 'Set it for routines: shower, getting dressed, cooking, focused work blocks.',
      },
      {
        order: 3,
        text: 'Glance at it periodically. The shrinking disk is doing the work.',
      },
    ],
    commonPitfalls: [
      'Ignoring it over time as it fades into the background.',
      'Batteries dying — keep spares.',
    ],
    evidenceRating: 'C',
    ratingNote: ADHD_TACTICAL_TOOLTIP,
    lastUpdated: LAST_UPDATED,
  },

  // --------------------------------------------------------------------------
  // FINANCES
  // --------------------------------------------------------------------------
  {
    id: 'auto-pay',
    name: 'Automation Zero',
    slug: 'auto-pay',
    category: 'finances',
    tagline: 'Eliminate the option to forget',
    description:
      'Setting every single recurring bill to autopay so basic survival stops depending on executive function.',
    whyItWorks:
      'Removes the executive function requirement from basic survival. Bill-paying is one of the highest-stakes, lowest-reward tasks an ADHD brain can face — late fees compound invisibly and tank credit.',
    difficulty: 'Medium',
    impact: 'Critical',
    timeToImplement: '2 hours',
    steps: [
      {
        order: 1,
        text: 'List every recurring bill: utilities, rent, subscriptions, insurance, credit cards.',
      },
      {
        order: 2,
        text: 'Log in to each and enable autopay. At minimum, autopay the minimum balance to avoid late fees.',
      },
      {
        order: 3,
        text: 'Keep a buffer in the checking account so autopays never overdraft.',
        tip: 'Two months of fixed expenses is a good buffer target.',
      },
    ],
    commonPitfalls: [
      'Overdrafting because the buffer is too thin.',
      'Ignoring subscription creep — autopay makes forgotten subscriptions worse.',
    ],
    evidenceRating: 'C',
    ratingNote: ADHD_TACTICAL_TOOLTIP,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'separate-accounts',
    name: 'Separate Accounts',
    slug: 'separate-accounts',
    category: 'finances',
    tagline: 'Bills vs spending',
    description:
      'Two chequing accounts: one for bills (untouchable, autopay-only) and one for day-to-day spending.',
    whyItWorks:
      'Visual clarity beats mental arithmetic. You can safely spend whatever is in the spending account because the bills account is already covered. No running totals in your head.',
    difficulty: 'Medium',
    impact: 'High',
    timeToImplement: '1 week',
    steps: [
      {
        order: 1,
        text: 'Open a second chequing account at the same bank for easy transfers.',
      },
      {
        order: 2,
        text: 'Direct deposit your fixed bills amount into Account A. Set all bills to autopay from Account A.',
      },
      {
        order: 3,
        text: 'Direct deposit the remainder (spending money) into Account B. This is what you live on.',
      },
    ],
    commonPitfalls: [
      'Transferring money back and forth between accounts and losing the boundary.',
      'Math errors when setting the fixed amount — recalculate quarterly.',
    ],
    tools: ['ynab'],
    evidenceRating: 'C',
    ratingNote: ADHD_TACTICAL_TOOLTIP,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'impulse-wait',
    name: 'Impulse Waitlist',
    slug: 'impulse-wait',
    category: 'finances',
    tagline: 'Cooling-off period',
    description:
      'A mandatory 24- or 48-hour wait for any non-essential purchase. The dopamine from the "hunt" fades and reveals whether you actually want the item.',
    whyItWorks:
      'Dopamine from discovery and anticipation fades on a predictable curve. Waiting 24 hours lets the novelty-seeking part of the ADHD brain cool off, leaving the "do I actually want this" signal visible.',
    difficulty: 'Hard',
    impact: 'Medium',
    timeToImplement: 'Immediate',
    steps: [
      {
        order: 1,
        text: 'Add the item to a list instead of the cart. Any list — a note, a doc, a bookmark.',
      },
      {
        order: 2,
        text: 'Wait 24 hours (or 48 for bigger items).',
      },
      {
        order: 3,
        text: 'If you still want it and can afford it, buy it. Most items never get bought.',
      },
    ],
    commonPitfalls: [
      '"But it\'s on sale!" — sale urgency is the exact impulse this system is designed to break.',
      'Forgetting the list exists, which defeats the point.',
    ],
    evidenceRating: 'C',
    ratingNote: ADHD_TACTICAL_TOOLTIP,
    lastUpdated: LAST_UPDATED,
  },

  // --------------------------------------------------------------------------
  // HEALTH
  // --------------------------------------------------------------------------
  {
    id: 'med-station',
    name: 'Medication Station',
    slug: 'med-station',
    category: 'health',
    tagline: 'Visual adherence',
    description:
      'Keeping medication visible and near water, tied to an existing daily habit (toothbrushing, coffee) via habit stacking.',
    whyItWorks:
      "Habit stacking (BJ Fogg, James Clear) anchors new routines to existing ones. Visual cue + habit stack is among the most robust behaviour-change techniques in the literature. ADHD object permanence is real — if you can't see it, you won't take it.",
    difficulty: 'Easy',
    impact: 'Critical',
    timeToImplement: 'Immediate',
    steps: [
      {
        order: 1,
        text: 'Get a weekly pill organiser so you can see at a glance whether today is done.',
      },
      {
        order: 2,
        text: 'Place it next to an existing daily cue: coffee maker, toothbrush, kettle.',
      },
      {
        order: 3,
        text: 'Flip it over or close the compartment when taken — the visual change is the confirmation signal.',
      },
    ],
    commonPitfalls: [
      'Forgetting to refill the organiser on Sunday — set a reverse alarm.',
      'Moving the station "temporarily" and losing the anchor.',
    ],
    evidenceRating: 'B',
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'sleep-alarm',
    name: 'Reverse Alarm',
    slug: 'sleep-alarm',
    category: 'health',
    tagline: 'Go-to-bed alarm',
    description:
      'An alarm that tells you when to START getting ready for bed, not just when to wake up.',
    whyItWorks:
      'Counteracts Revenge Bedtime Procrastination and time blindness — two of the most common ADHD sleep failure modes. Shares the same evidence base as the sleep-consistency interventions on the Sleep Hub: regular sleep/wake times are the single most impactful sleep behaviour.',
    difficulty: 'Medium',
    impact: 'High',
    timeToImplement: 'Immediate',
    steps: [
      {
        order: 1,
        text: 'Set an alarm for 1 hour before your target sleep time.',
      },
      {
        order: 2,
        text: 'Label it "Stop Doing Things" — the literal name matters for the psychological break.',
      },
      {
        order: 3,
        text: 'When it goes off, start the wind-down: lights down, screens off, teeth, bed.',
      },
    ],
    commonPitfalls: [
      'Snoozing the bed alarm, which defeats the entire mechanism.',
      'Ignoring it because "just five more minutes" of whatever you are doing.',
    ],
    tools: ['one-sec'],
    evidenceRating: 'B',
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'protein-breakfast',
    name: 'Protein Breakfast',
    slug: 'protein-breakfast',
    category: 'health',
    tagline: 'Fuel for dopamine',
    description:
      'Eating 30g of protein within an hour of waking — before or alongside coffee.',
    whyItWorks:
      'Protein provides tyrosine, an amino acid precursor to dopamine synthesis. Stabilises blood sugar across the morning, which matters more for ADHD brains already running on unstable dopamine signalling.',
    difficulty: 'Medium',
    impact: 'Medium',
    timeToImplement: '1 week',
    steps: [
      {
        order: 1,
        text: 'Stock easy-to-grab protein sources: protein shakes, eggs, Greek yogurt, cottage cheese.',
      },
      {
        order: 2,
        text: 'Eat before or with your first coffee, not after.',
      },
      {
        order: 3,
        text: 'Aim for 30g. Most "healthy breakfasts" are under 15g.',
      },
    ],
    commonPitfalls: [
      'Skipping breakfast entirely on busy mornings.',
      'Carb-heavy breakfasts that spike and crash blood sugar.',
    ],
    evidenceRating: 'C',
    ratingNote: ADHD_TACTICAL_TOOLTIP,
    lastUpdated: LAST_UPDATED,
  },

  // --------------------------------------------------------------------------
  // RELATIONSHIPS
  // --------------------------------------------------------------------------
  {
    id: 'text-batching',
    name: 'Text Batching',
    slug: 'text-batching',
    category: 'relationships',
    tagline: 'Guilt-free replying',
    description:
      'Replying to all personal messages in one specific window each day instead of context-switching every time a notification arrives.',
    whyItWorks:
      'Relieves the constant low-grade anxiety of "I need to reply" — a uniquely ADHD tax on relationships. Tells your brain there is a designated reply window, so unreplied messages stop feeling urgent between windows.',
    difficulty: 'Medium',
    impact: 'Medium',
    timeToImplement: 'Immediate',
    steps: [
      {
        order: 1,
        text: 'Pick a time (e.g., 5pm) that becomes your daily reply window.',
      },
      {
        order: 2,
        text: 'Reply to everyone during that window, in one go.',
      },
      {
        order: 3,
        text: 'Ignore messaging apps outside the window. Turn off notifications if you can.',
      },
    ],
    commonPitfalls: [
      'Getting distracted by social media during the reply window.',
      'Forgetting the window — set a recurring alarm.',
    ],
    evidenceRating: 'C',
    ratingNote: ADHD_TACTICAL_TOOLTIP,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'calendar-sharing',
    name: 'Shared Calendar',
    slug: 'calendar-sharing',
    category: 'relationships',
    tagline: 'Relationship saver',
    description:
      'A joint digital calendar shared with a partner, family member, or housemate — the external brain that both parties can see.',
    whyItWorks:
      'Externalises memory (Barkley). Reduces the "you never told me about that" arguments that grind down ADHD relationships. Both people can see what is coming without one having to remember for both.',
    difficulty: 'Easy',
    impact: 'High',
    timeToImplement: '1 hour',
    steps: [
      {
        order: 1,
        text: 'Create a shared calendar on whatever platform you both use (Google Calendar is the common default).',
      },
      {
        order: 2,
        text: 'Invite your partner and confirm they have it on their phone.',
      },
      {
        order: 3,
        text: 'Add everything immediately — appointments, events, commitments, even tentative plans.',
      },
    ],
    commonPitfalls: [
      'Not checking it and then being surprised.',
      'Assuming the other person checked it without asking.',
    ],
    tools: ['google-calendar'],
    evidenceRating: 'C',
    ratingNote: ADHD_TACTICAL_TOOLTIP,
    lastUpdated: LAST_UPDATED,
  },
];

// ============================================================================
// FEATURED
// ============================================================================

const FEATURED_ADHD_SLUGS: string[] = [
  'body-doubling',
  'pomodoro',
  'launch-pad',
];

// ============================================================================
// HELPERS
// ============================================================================

export function getADHDSystemBySlug(slug: string): ADHDSystem | undefined {
  return adhdSystems.find((s) => s.slug === slug);
}

export function getADHDToolById(id: string): ADHDTool | undefined {
  return adhdTools.find((t) => t.id === id);
}

export function getADHDSystemsByCategory(category: string): ADHDSystem[] {
  return adhdSystems.filter((s) => s.category === category);
}

export function getFeaturedADHDSystems(): ADHDSystem[] {
  return FEATURED_ADHD_SLUGS.map((slug) => {
    const system = getADHDSystemBySlug(slug);
    if (!system) {
      throw new Error(
        `Featured ADHD system "${slug}" not found in adhdSystems. ` +
          `Check FEATURED_ADHD_SLUGS in lib/data/adhd.ts.`
      );
    }
    return system;
  });
}
