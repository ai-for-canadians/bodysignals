// Unified type system for Body Signals
//
// This file consolidates types for:
// - Symptoms (existing — Body Signals anchor)
// - Conditions (Phase 2 — Condition Control + Gut Health + Mental Health)
// - Sleep Interventions (Phase 3 — Sleep Better)
// - Movement Programs (Phase 3 — Movement RX)
// - ADHD Systems & Tools (Phase 3 — ADHD Systems)
// - Providers & Therapy Types (Phase 2 — Mental Health)
//
// All existing exports (UrgencyLevel, BodyAreaID, EvidenceRating, Source,
// RelatedCondition, Symptom, BodyArea) are preserved verbatim — they are
// imported by lib/data/categories.ts and lib/data/symptoms.ts.

// === Evidence & Urgency ===

export type UrgencyLevel = 'emergency' | 'urgent' | 'routine' | 'self_care' | 'info';

export type EvidenceRating = 'A' | 'B' | 'C' | 'D' | 'F';

// === Body Areas (existing) ===

export type BodyAreaID = 'head' | 'chest' | 'abdomen' | 'back' | 'limbs' | 'skin' | 'general';

export interface BodyArea {
  id: BodyAreaID;
  name: string;
  slug: string;
  description: string;
  icon: string;
}

// === Condition Categories (Phase 2) ===

export type ConditionCategory =
  | 'chronic'
  | 'digestive'
  | 'mental-health'
  | 'metabolic'
  | 'cardiovascular'
  | 'pain'
  | 'autoimmune'
  | 'neurological';

// === Topic Categories (Phase 3) ===

export type TopicCategory = 'sleep' | 'movement' | 'adhd';

// === Sources ===

export interface Source {
  title: string;
  url: string;
  type: 'medical_guideline' | 'study' | 'review' | 'organization' | 'journal';
  year?: number;
  authors?: string;
}

// === SYMPTOMS (existing — Body Signals anchor) ===

export interface RelatedCondition {
  name: string;
  slug?: string;
  likelihood: 'common' | 'uncommon' | 'rare' | 'possible';
  urgency: UrgencyLevel;
  description: string;
}

export interface Symptom {
  id: string;
  name: string;
  slug: string;
  bodyArea: BodyAreaID;
  summary: string;
  description: string;

  // Key actionable info
  redFlags: string[]; // Immediate attention needed
  yellowFlags: string[]; // See doctor soon

  relatedConditions: RelatedCondition[];

  homeCare: string[]; // Self-care advice

  whenToSeeDoctor: string[]; // Specific triggers to go in

  urgency: UrgencyLevel; // Default urgency for this symptom
  evidenceRating: EvidenceRating;
  lastUpdated: string;
  sources: Source[];
}

// === CONDITIONS (Phase 2 — Condition Control + Gut Health + Mental Health) ===

export interface ConditionSymptom {
  name: string;
  description: string;
  frequency: 'common' | 'occasional' | 'rare';
  symptomSlug?: string;
}

export interface Intervention {
  id: string;
  name: string;
  slug: string;
  category:
    | 'medication'
    | 'supplement'
    | 'lifestyle'
    | 'therapy'
    | 'exercise'
    | 'diet'
    | 'tool'
    | 'protocol'
    | 'device';
  description: string;
  mechanism?: string;
  protocol?: string[];
  dosage?: string;
  evidenceRating: EvidenceRating;
  researchSummary?: string;
  safetyProfile?: {
    riskLevel: 'very low' | 'low' | 'moderate' | 'high';
    sideEffects?: { name: string; severity: string; frequency: string }[];
    contraindications?: string[];
  };
  benefits?: { description: string; evidenceRating: EvidenceRating }[];
  sources: Source[];
  lastUpdated: string;
  forConditions?: string[];
}

export interface Condition {
  id: string;
  name: string;
  slug: string;
  category: ConditionCategory;
  tagline: string;
  summary: string;
  description: string;
  symptoms: ConditionSymptom[];
  interventions: Intervention[];
  lifestyleFactors?: {
    diet?: string;
    exercise?: string;
    sleep?: string;
    stress?: string;
  };
  testingOptions?: string[];
  dietaryRecommendations?: string[];
  professionalToSee?: string;
  firstSteps?: string[];
  therapyTypes?: string[];
  evidenceRating: EvidenceRating;
  disclaimer: string;
  lastUpdated: string;
  sources: Source[];
  relatedSymptomSlugs?: string[];
  relatedConditionSlugs?: string[];
  relatedTopicSlugs?: string[];
}

// === TOPIC HUBS ===

// --- ADHD Systems (Phase 3) ---

export interface ADHDSystem {
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
  evidenceRating: EvidenceRating;
  /**
   * Optional per-system explanatory tooltip shown next to the evidence rating.
   * Present on 'C'-rated tactical systems; omitted on 'B'-rated systems that
   * map to studied interventions.
   */
  ratingNote?: string;
  lastUpdated: string;
}

export interface ADHDTool {
  id: string;
  name: string;
  description: string;
  url: string;
  price: string;
  icon: string;
}

// --- Movement Programs (Phase 3) ---

export interface Exercise {
  id: string;
  name: string;
  description: string;
  /**
   * Canonical format: "${sets}×${reps}" using unicode × (U+00D7), not lowercase x.
   * Ranges allowed with hyphens. Examples: "3×10", "3×10-12", "5×1", "3×AMRAP".
   */
  sets: string;
  reps: string;
  holdTime?: string;
  frequency: string;
  videoUrl?: string;
}

export interface MovementPhase {
  id: string;
  name: string;
  weekRange: string;
  description: string;
  goals: string[];
  exercises: Exercise[];
}

export interface MovementProgram {
  id: string;
  name: string;
  slug: string;
  bodyPart: string;
  tagline: string;
  description: string;
  phases: MovementPhase[];
  equipmentNeeded: string[];
  contraindications: string[];
  evidenceRating: EvidenceRating;
  lastUpdated: string;
}

// --- Sleep Interventions (Phase 3) ---

export interface SleepIntervention {
  id: string;
  name: string;
  slug: string;
  category: 'hygiene' | 'environment' | 'supplements' | 'tools' | 'protocols';
  tagline: string;
  description: string;
  benefits: { description: string; evidenceRating: EvidenceRating }[];
  howItWorks: string;
  protocol?: string[];
  dosage?: string;
  safetyProfile: {
    riskLevel: 'very low' | 'low' | 'moderate' | 'high';
    sideEffects: {
      name: string;
      severity: 'minor' | 'moderate' | 'severe';
      frequency: 'common' | 'uncommon' | 'rare';
    }[];
    contraindications: string[];
  };
  evidenceRating: EvidenceRating;
  researchSummary: string;
  sources: Source[];
  lastUpdated: string;
}

// === PROVIDERS (Phase 2 — Mental Health) ===

export interface Provider {
  id: string;
  name: string;
  slug: string;
  qualifications: string;
  canPrescribe: boolean;
  bestFor: string[];
  averageCost: string;
  canadianContext?: string;
}

export interface TherapyType {
  id: string;
  name: string;
  acronym: string;
  summary: string;
  bestFor: string[];
  whatToExpect: string;
}
