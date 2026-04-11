import type { Metadata } from 'next';
import { sleepInterventions } from '@/lib/data/sleep';
import { SleepLibrary } from '@/components/topics/SleepLibrary';

export const metadata: Metadata = {
  title: 'Sleep Hub',
  description:
    'Evidence-rated sleep interventions: hygiene, environment, supplements, tools, and clinical protocols. A–F scale with Canadian + US safety context.',
  openGraph: {
    title: 'Sleep Hub | Body Signals',
    description:
      'Evidence-rated sleep interventions: hygiene, environment, supplements, tools, and clinical protocols. A–F scale with Canadian + US safety context.',
  },
};

export default function SleepHubPage() {
  return <SleepLibrary interventions={sleepInterventions} />;
}
