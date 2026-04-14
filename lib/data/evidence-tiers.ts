import type { EvidenceRating } from '@/types';

export interface EvidenceTier {
  grade: EvidenceRating;
  label: string;
  criteria: string;
  description: string;
  colour: string;
  bgColour: string;
  example: string;
}

export const EVIDENCE_TIERS: EvidenceTier[] = [
  {
    grade: 'A',
    label: 'Strong Evidence',
    criteria:
      'Multiple RCTs, meta-analyses, or clinical practice guidelines from major medical organisations',
    description:
      'Strong, replicated evidence from high-quality studies. Findings are consistent across populations and study designs.',
    colour: 'text-emerald-400',
    bgColour: 'bg-emerald-500/20',
    example:
      'Low-FODMAP diet for IBS symptom reduction (supported by multiple RCTs and gastroenterology guidelines)',
  },
  {
    grade: 'B',
    label: 'Good Evidence',
    criteria:
      'Some RCTs, strong observational studies, or established clinical consensus',
    description:
      'Good evidence from well-designed studies, though replication may be limited or study populations narrow.',
    colour: 'text-green-400',
    bgColour: 'bg-green-500/20',
    example:
      'CBT for depression (extensive evidence base, endorsed by clinical guidelines worldwide)',
  },
  {
    grade: 'C',
    label: 'Moderate Evidence',
    criteria:
      'Limited studies, mechanistic plausibility, or practitioner consensus without strong RCT support',
    description:
      'Moderate evidence — often promising but not yet replicated in large, rigorous trials. May rely on mechanistic reasoning or expert opinion.',
    colour: 'text-amber-400',
    bgColour: 'bg-amber-500/20',
    example:
      'Mouth taping for mild sleep apnoea (limited small trials, mechanistic plausibility)',
  },
  {
    grade: 'D',
    label: 'Weak Evidence',
    criteria:
      'Preliminary research, case reports, or conflicting findings',
    description:
      'Weak evidence — research is early-stage, contradictory, or based on very small samples. Included for completeness but should not drive decisions.',
    colour: 'text-orange-400',
    bgColour: 'bg-orange-500/20',
    example:
      'Grounding/earthing for inflammation (mostly pilot studies with small samples)',
  },
  {
    grade: 'F',
    label: 'No/Negative Evidence',
    criteria:
      'No supporting research, or evidence that the intervention is ineffective or harmful',
    description:
      'No credible evidence of benefit, or evidence that the intervention is harmful. Included to counter misinformation.',
    colour: 'text-red-400',
    bgColour: 'bg-red-500/20',
    example:
      'Homeopathy for any condition (extensive research shows no effect beyond placebo)',
  },
];

/** O(1) lookup by grade letter. Derived from the EVIDENCE_TIERS array. */
export const EVIDENCE_TIERS_MAP: Record<EvidenceRating, EvidenceTier> =
  Object.fromEntries(
    EVIDENCE_TIERS.map((t) => [t.grade, t]),
  ) as Record<EvidenceRating, EvidenceTier>;
