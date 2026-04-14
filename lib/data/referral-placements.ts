import type {
  ReferralCategory,
  ReferralCTAConfig,
  ReferralJurisdiction,
} from '@/types/referrals';
import { REFERRAL_PARTNERS, getPartnerById } from './referrals';

// JURISDICTION NOTE: Static site — no user detection. When jurisdictionOverride
// is set, only partners matching that jurisdiction are eligible. If no match,
// the fallback renders. Future: if we add client-side geo, revisit this to
// render jurisdiction-specific partner CTAs.

export interface ReferralPlacement {
  category: ReferralCategory;
  anchor: 'after_professional' | 'after_urgency' | 'below_intervention' | 'sidebar';
  heading: string;
  body: string;
  ctaLabel: string;
  fallbackUrl: string;
  fallbackLabel: string;
  jurisdictionOverride?: ReferralJurisdiction;
}

/**
 * Maps page types + slugs to referral placement configurations.
 *
 * Page files never import partner IDs. They call `getPlacementForSlug()`
 * and render whatever comes back — this file is the sole bridge between
 * editorial content and commercial infrastructure.
 */
const PLACEMENT_DEFAULTS: Record<string, ReferralPlacement> = {
  // ─── Conditions ────────────────────────────────────────────────
  'condition:default': {
    category: 'telehealth_general',
    anchor: 'after_professional',
    heading: 'Looking for professional support?',
    body: 'If this condition is affecting your daily life, connecting with a healthcare provider can help you explore your options.',
    ctaLabel: 'Find a provider',
    fallbackUrl: 'https://www.psychologytoday.com/ca/therapists',
    fallbackLabel: 'Find a provider near you',
  },
  'condition:mental_health': {
    category: 'mental_health_provider',
    anchor: 'after_professional',
    heading: 'Looking for mental health support?',
    body: 'Connecting with a licensed therapist or counsellor is often the most effective first step for managing mental health conditions.',
    ctaLabel: 'Find a therapist',
    fallbackUrl: 'https://www.psychologytoday.com/ca/therapists',
    fallbackLabel: 'Find a therapist near you',
  },

  // ─── Symptoms ───────────────────────────────────────────��──────
  'symptom:default': {
    category: 'telehealth_general',
    anchor: 'after_urgency',
    heading: 'Want to discuss this symptom?',
    body: 'If this symptom is persistent or worsening, a virtual consultation can help you determine next steps without a long wait.',
    ctaLabel: 'Book a virtual visit',
    fallbackUrl: 'https://www.healthlinkbc.ca/health-topics/finding-doctor',
    fallbackLabel: 'Find a healthcare provider',
  },

  // ─── Sleep ─────────────────────────────────────────────────────
  'sleep:default': {
    category: 'sleep_study',
    anchor: 'below_intervention',
    heading: 'Need professional guidance?',
    body: 'If sleep issues persist despite lifestyle changes, a sleep specialist or your family doctor can help rule out underlying conditions.',
    ctaLabel: 'Find a sleep specialist',
    fallbackUrl: 'https://www.sleepfoundation.org/sleep-doctor',
    fallbackLabel: 'Learn about sleep specialists',
  },

  // ─── ADHD ──────────────────────────────────────��───────────────
  'adhd:default': {
    category: 'adhd_assessment',
    anchor: 'sidebar',
    heading: 'Considering an ADHD assessment?',
    body: 'Tactical systems help, but a formal assessment can open doors to additional support — including medication, workplace accommodations, and specialised therapy.',
    ctaLabel: 'Find an ADHD specialist',
    fallbackUrl: 'https://www.psychologytoday.com/ca/therapists/adhd',
    fallbackLabel: 'Find an ADHD-informed provider',
  },

  // ─── Movement ─────────��────────────────────────────────────────
  'movement:default': {
    category: 'physiotherapy',
    anchor: 'below_intervention',
    heading: 'Need hands-on guidance?',
    body: 'A physiotherapist can tailor this programme to your injury severity, mobility level, and recovery goals.',
    ctaLabel: 'Find a physiotherapist',
    fallbackUrl: 'https://physiotherapy.ca/find-a-physiotherapist',
    fallbackLabel: 'Find a physiotherapist near you',
  },
};

/**
 * Mental health condition slugs — these get the mental_health placement
 * instead of the default condition placement.
 */
const MENTAL_HEALTH_SLUGS = new Set([
  'depression',
  'anxiety',
  'bipolar-disorder',
  'ocd',
  'ptsd',
  'adhd',
  'eating-disorders',
  'schizophrenia',
  'borderline-personality-disorder',
]);

/**
 * Returns the ReferralCTAConfig for a given page, or null if no placement
 * is configured.
 *
 * Page files call this function and render `<ReferralCTA {...config} />`
 * without ever knowing which partner is behind it.
 */
export function getPlacementForSlug(
  slug: string,
  pageType: 'condition' | 'symptom' | 'sleep' | 'adhd' | 'movement'
): (ReferralCTAConfig & { campaign: string }) | null {
  let placementKey: string;

  switch (pageType) {
    case 'condition':
      placementKey = MENTAL_HEALTH_SLUGS.has(slug)
        ? 'condition:mental_health'
        : 'condition:default';
      break;
    case 'symptom':
      placementKey = 'symptom:default';
      break;
    case 'sleep':
      placementKey = 'sleep:default';
      break;
    case 'adhd':
      placementKey = 'adhd:default';
      break;
    case 'movement':
      placementKey = 'movement:default';
      break;
    default:
      return null;
  }

  const placement = PLACEMENT_DEFAULTS[placementKey];
  if (!placement) return null;

  // Find the first active partner matching this placement's category
  // and jurisdiction (if overridden). If none, the fallback still renders.
  const eligiblePartner = REFERRAL_PARTNERS.find(
    (p) =>
      p.active &&
      p.category === placement.category &&
      (!placement.jurisdictionOverride ||
        p.jurisdiction === placement.jurisdictionOverride ||
        p.jurisdiction === 'both')
  );

  return {
    partnerId: eligiblePartner?.id ?? '',
    heading: placement.heading,
    body: placement.body,
    ctaLabel: eligiblePartner
      ? `Visit ${eligiblePartner.name}`
      : placement.ctaLabel,
    fallbackUrl: placement.fallbackUrl,
    fallbackLabel: placement.fallbackLabel,
    campaign: `${pageType}-${slug}`,
  };
}
