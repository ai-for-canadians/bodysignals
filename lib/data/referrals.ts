import type { ReferralPartner } from '@/types/referrals';

/**
 * Referral partner registry.
 *
 * Partners are data, not code. Activating a partner is a one-line edit:
 * set `active: true` and update the `/disclosures` page in the same commit.
 *
 * All partners launch with:
 *   - active: false
 *   - commercialRelationship: 'no_commercial_relationship'
 *
 * No partner URL appears on any page until both fields are updated.
 */
export const REFERRAL_PARTNERS: ReferralPartner[] = [
  // ─── Canadian Telehealth ───────────────────────────────────────
  {
    id: 'maple',
    name: 'Maple',
    slug: 'maple',
    type: 'telehealth',
    jurisdiction: 'canada',
    category: 'telehealth_general',
    description:
      'Canadian virtual care platform connecting patients with licensed physicians and specialists.',
    url: 'https://www.getmaple.ca',
    commercialRelationship: 'no_commercial_relationship',
    active: false,
    lastReviewed: '2026-04-13',
  },
  {
    id: 'rocket-doctor',
    name: 'Rocket Doctor',
    slug: 'rocket-doctor',
    type: 'telehealth',
    jurisdiction: 'canada',
    category: 'telehealth_general',
    description:
      'Canadian telehealth service offering virtual consultations with family physicians and specialists.',
    url: 'https://www.rocketdoctor.ca',
    commercialRelationship: 'no_commercial_relationship',
    active: false,
    lastReviewed: '2026-04-13',
  },
  {
    id: 'tia-health',
    name: 'Tia Health',
    slug: 'tia-health',
    type: 'telehealth',
    jurisdiction: 'canada',
    category: 'telehealth_general',
    description:
      'Canadian virtual healthcare provider offering same-day appointments with licensed physicians.',
    url: 'https://www.tiahealth.com',
    commercialRelationship: 'no_commercial_relationship',
    active: false,
    lastReviewed: '2026-04-13',
  },

  // ─── Canadian Pharmacy ─────────────────────────────────────────
  {
    id: 'felix-health',
    name: 'Felix',
    slug: 'felix-health',
    type: 'pharmacy',
    jurisdiction: 'canada',
    category: 'pharmacy',
    description:
      'Canadian online pharmacy and prescription service with licensed healthcare practitioners.',
    url: 'https://www.felixforyou.ca',
    commercialRelationship: 'no_commercial_relationship',
    active: false,
    lastReviewed: '2026-04-13',
  },

  // ─── Canadian Lab Testing ──────────────────────────────────────
  {
    id: 'lifelabs',
    name: 'LifeLabs',
    slug: 'lifelabs',
    type: 'laboratory',
    jurisdiction: 'canada',
    category: 'lab_testing',
    description:
      'Canada\u2019s largest community laboratory services provider, offering diagnostic testing across multiple provinces.',
    url: 'https://www.lifelabs.com',
    commercialRelationship: 'no_commercial_relationship',
    active: false,
    lastReviewed: '2026-04-13',
  },
  {
    id: 'dynacare',
    name: 'Dynacare',
    slug: 'dynacare',
    type: 'laboratory',
    jurisdiction: 'canada',
    category: 'lab_testing',
    description:
      'Canadian health solutions company providing laboratory testing and health management programmes.',
    url: 'https://www.dynacare.ca',
    commercialRelationship: 'no_commercial_relationship',
    active: false,
    lastReviewed: '2026-04-13',
  },

  // ─── Cross-Border Therapy ──────────────────────────────────────
  {
    id: 'jane-app',
    name: 'Jane App',
    slug: 'jane-app',
    type: 'therapy_platform',
    jurisdiction: 'both',
    category: 'mental_health_provider',
    description:
      'Practice management and online booking platform used by physiotherapists, psychologists, and allied health practitioners in Canada and the US.',
    url: 'https://jane.app',
    commercialRelationship: 'no_commercial_relationship',
    active: false,
    lastReviewed: '2026-04-13',
  },

  // ─── US Therapy (FLAGGED) ──────────────────────────────────────
  // FTC $7.8M settlement (2023) for sharing health data with advertisers.
  // Requires editorial review before activation. Do not activate without
  // documenting the review outcome in a firewall event (see RUNBOOK.md §9).
  {
    id: 'betterhelp',
    name: 'BetterHelp',
    slug: 'betterhelp',
    type: 'therapy_platform',
    jurisdiction: 'us',
    category: 'mental_health_provider',
    description:
      'US-based online therapy platform connecting users with licensed therapists via text, phone, and video.',
    url: 'https://www.betterhelp.com',
    commercialRelationship: 'no_commercial_relationship',
    disclosureText:
      'BetterHelp settled with the US Federal Trade Commission in 2023 over data-sharing practices. Body Signals has reviewed this history as part of our partner evaluation process.',
    active: false,
    lastReviewed: '2026-04-13',
  },

  // ─── US Telehealth ─────────────────────────────────────────────
  {
    id: 'sesame-care',
    name: 'Sesame Care',
    slug: 'sesame-care',
    type: 'telehealth',
    jurisdiction: 'us',
    category: 'telehealth_general',
    description:
      'US telehealth marketplace offering direct-pay video visits with physicians and specialists.',
    url: 'https://www.sesamecare.com',
    commercialRelationship: 'no_commercial_relationship',
    active: false,
    lastReviewed: '2026-04-13',
  },
];

/** Look up a partner by ID. Returns undefined if not found. */
export function getPartnerById(
  id: string
): ReferralPartner | undefined {
  return REFERRAL_PARTNERS.find((p) => p.id === id);
}

/** Return all partners with an active commercial relationship (for /disclosures). */
export function getCommercialPartners(): ReferralPartner[] {
  return REFERRAL_PARTNERS.filter(
    (p) => p.commercialRelationship !== 'no_commercial_relationship'
  );
}

/** Return all partners with no commercial relationship (for /disclosures). */
export function getEditorialPartners(): ReferralPartner[] {
  return REFERRAL_PARTNERS.filter(
    (p) => p.commercialRelationship === 'no_commercial_relationship'
  );
}
