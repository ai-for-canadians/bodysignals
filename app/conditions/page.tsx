import type { Metadata } from 'next';
import { conditions } from '@/lib/data/conditions';
import { ConditionsLibrary } from '@/components/conditions/ConditionsLibrary';

export const metadata: Metadata = {
  title: 'Condition Library',
  description:
    'Evidence-rated guides for 27 conditions across digestive, mental health, metabolic, cardiovascular, and pain. Every intervention graded on the A–F scale with Canadian provider context.',
  openGraph: {
    title: 'Condition Library | Body Signals',
    description:
      'Evidence-rated guides for 27 conditions across digestive, mental health, metabolic, cardiovascular, and pain. Every intervention graded on the A–F scale with Canadian provider context.',
  },
};

export default function ConditionsPage() {
  return <ConditionsLibrary conditions={conditions} />;
}
