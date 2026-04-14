/**
 * Builds a referral URL with UTM tracking parameters.
 *
 * All partner URLs are constructed through this single function so that
 * tracking changes are a one-line update, not a grep-and-replace.
 */
export function buildReferralUrl(
  baseUrl: string,
  context: {
    source?: string;
    medium?: string;
    campaign: string; // e.g., 'condition-depression' or 'topic-sleep'
    content?: string; // e.g., 'sidebar-cta' or 'inline-cta'
  }
): string {
  const url = new URL(baseUrl);

  url.searchParams.set('utm_source', context.source ?? 'bodysignals');
  url.searchParams.set('utm_medium', context.medium ?? 'referral');
  url.searchParams.set('utm_campaign', context.campaign);

  if (context.content) {
    url.searchParams.set('utm_content', context.content);
  }

  return url.toString();
}
