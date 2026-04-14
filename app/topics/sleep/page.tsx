import type { Metadata } from 'next';
import { sleepInterventions } from '@/lib/data/sleep';
import { SleepLibrary } from '@/components/topics/SleepLibrary';
import { BASE_URL } from '@/lib/config';
import { jsonLdScript, breadcrumbJsonLd } from '@/lib/utils/structured-data';

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
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdScript(
            breadcrumbJsonLd([
              { name: 'Home', url: BASE_URL },
              { name: 'Topics', url: `${BASE_URL}/topics` },
              { name: 'Sleep', url: `${BASE_URL}/topics/sleep` },
            ]),
          ),
        }}
      />
      <SleepLibrary interventions={sleepInterventions} />
    </>
  );
}
