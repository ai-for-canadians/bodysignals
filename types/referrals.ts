export type ReferralPartnerType =
  | 'telehealth'
  | 'laboratory'
  | 'pharmacy'
  | 'app'
  | 'device'
  | 'therapy_platform'
  | 'sister_brand'; // Supports future Path 4 (sister brand)

export type ReferralJurisdiction = 'canada' | 'us' | 'both';

export type CommercialRelationship =
  | 'affiliate'
  | 'sponsored'
  | 'no_commercial_relationship'; // For editorial links to services we mention but don't profit from

export type ReferralCategory =
  | 'mental_health_provider'
  | 'telehealth_general'
  | 'lab_testing'
  | 'sleep_study'
  | 'adhd_assessment'
  | 'physiotherapy'
  | 'pharmacy'
  | 'wellness_app';

export interface ReferralPartner {
  id: string;
  name: string;
  slug: string;
  type: ReferralPartnerType;
  jurisdiction: ReferralJurisdiction;
  category: ReferralCategory;
  description: string; // One-line editorial description
  url: string; // Base URL (UTM params added by utility)
  commercialRelationship: CommercialRelationship;
  disclosureText?: string; // Custom disclosure if needed
  active: boolean; // Gate rendering — inactive partners don't render
  lastReviewed: string; // ISO date — for quarterly partner review
}

export interface ReferralCTAConfig {
  partnerId: string;
  heading: string; // e.g., "Looking for professional support?"
  body: string; // e.g., "Connect with a licensed therapist online"
  ctaLabel: string; // e.g., "Visit Maple"
  fallbackUrl: string; // Generic resource URL if partner goes inactive
  fallbackLabel: string; // e.g., "Find a provider near you"
}
