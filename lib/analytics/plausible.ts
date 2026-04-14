// Plausible event helper — typed custom events for Body Signals
// See docs/RUNBOOK.md Section 14 for dashboard URL and monitoring cadence.

export type PlausibleEvent =
  | 'Feedback Submitted'
  | 'Referral CTA Clicked'
  | 'Source Link Clicked'
  | 'Evidence Badge Clicked'
  | 'Search Used'
  | 'External Link Clicked';

export function trackEvent(
  event: PlausibleEvent,
  props?: Record<string, string>,
): void {
  if (typeof window !== 'undefined' && (window as any).plausible) {
    (window as any).plausible(event, { props });
  }
}
