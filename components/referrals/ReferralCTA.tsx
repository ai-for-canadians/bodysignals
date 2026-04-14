import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import { getPartnerById } from '@/lib/data/referrals';
import { buildReferralUrl } from '@/lib/utils/referral-url';
import type { ReferralCTAConfig } from '@/types/referrals';

interface ReferralCTAProps extends ReferralCTAConfig {
  /** Used for UTM campaign parameter, e.g. 'condition-depression' */
  campaign: string;
}

/**
 * Referral call-to-action block.
 *
 * Two rendering modes — never renders nothing:
 *   1. Active partner found → partner-specific CTA with disclosure line
 *   2. Partner inactive / not found → fallback with generic resource link
 *
 * The placement spot was chosen for a reason; a generic resource link is
 * still valuable to the reader even without an affiliate deal.
 */
export function ReferralCTA({
  partnerId,
  heading,
  body,
  ctaLabel,
  fallbackUrl,
  fallbackLabel,
  campaign,
}: ReferralCTAProps) {
  const partner = getPartnerById(partnerId);
  const isActive = partner?.active === true;

  // ── Active partner mode ────────────────────────────────────────
  if (partner && isActive) {
    const href = buildReferralUrl(partner.url, {
      campaign,
      content: 'sidebar-cta',
    });

    const isCommercial =
      partner.commercialRelationship !== 'no_commercial_relationship';

    const rel = isCommercial
      ? 'noopener noreferrer sponsored'
      : 'noopener noreferrer';

    const relationshipLabel =
      partner.commercialRelationship === 'affiliate'
        ? 'an affiliate relationship with'
        : partner.commercialRelationship === 'sponsored'
          ? 'a sponsored relationship with'
          : 'no commercial relationship with';

    return (
      <div className="bg-slate-800 border-l-4 border-amber-500 rounded-lg p-5 mt-6">
        <h3 className="text-lg font-semibold text-slate-50 mb-2">
          {heading}
        </h3>
        <p className="text-slate-300 text-sm mb-4">{body}</p>
        <a
          href={href}
          target="_blank"
          rel={rel}
          className="inline-flex items-center gap-2 bg-amber-500 text-slate-900 font-semibold text-sm px-4 py-2.5 rounded-lg hover:bg-amber-400 transition-colors"
        >
          {ctaLabel}
          <ExternalLink className="w-4 h-4" />
        </a>
        <p className="text-slate-500 text-xs mt-3">
          Body Signals has {relationshipLabel} {partner.name}.{' '}
          <Link
            href="/disclosures"
            className="text-amber-500/70 hover:text-amber-400 underline"
          >
            See our disclosures
          </Link>
          .
        </p>
      </div>
    );
  }

  // ── Fallback mode ──────────────────────────────────────────────
  return (
    <div className="bg-slate-800 border-l-4 border-amber-500 rounded-lg p-5 mt-6">
      <h3 className="text-lg font-semibold text-slate-50 mb-2">
        {heading}
      </h3>
      <p className="text-slate-300 text-sm mb-4">{body}</p>
      <a
        href={fallbackUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 bg-amber-500 text-slate-900 font-semibold text-sm px-4 py-2.5 rounded-lg hover:bg-amber-400 transition-colors"
      >
        {fallbackLabel}
        <ExternalLink className="w-4 h-4" />
      </a>
    </div>
  );
}
