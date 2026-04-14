export interface CorrectionEntry {
  id: string;
  date: string;
  pageSlug: string;
  pageTitle: string;
  originalText: string;
  correctedText: string;
  reason: string;
  severity: 'minor' | 'moderate' | 'significant';
}

export interface FirewallEvent {
  id: string;
  date: string;
  description: string;
  outcome: string;
}

export const corrections: CorrectionEntry[] = [];
export const firewallEvents: FirewallEvent[] = [];
