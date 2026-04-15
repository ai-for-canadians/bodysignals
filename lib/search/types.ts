import type { EvidenceRating } from '@/types';

export type SearchEntryType =
  | 'condition'
  | 'symptom'
  | 'sleep'
  | 'movement'
  | 'adhd-system'
  | 'adhd-tool';

export interface SearchEntry {
  id: string;
  title: string;
  type: SearchEntryType;
  category: string;
  slug: string;
  route: string;
  description: string;
  evidenceRating?: EvidenceRating;
  tags: string[];
}
