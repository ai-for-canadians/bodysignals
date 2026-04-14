import type { Metadata } from 'next';
import { conditions } from '@/lib/data/conditions';
import { ConditionsLibrary } from '@/components/conditions/ConditionsLibrary';
import { BASE_URL } from '@/lib/config';
import { jsonLdScript, breadcrumbJsonLd } from '@/lib/utils/structured-data';

export const metadata: Metadata = {
  title: 'Condition Library',
  description:
    'Evidence-rated guides for 27 conditions — digestive, mental health, metabolic, cardiovascular, pain. A–F grades with Canadian and US provider context.',
  openGraph: {
    title: 'Condition Library | Body Signals',
    description:
      'Evidence-rated guides for 27 conditions — digestive, mental health, metabolic, cardiovascular, pain. A–F grades with Canadian and US provider context.',
  },
};

export default function ConditionsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdScript(
            breadcrumbJsonLd([
              { name: 'Home', url: BASE_URL },
              { name: 'Conditions', url: `${BASE_URL}/conditions` },
            ]),
          ),
        }}
      />
      <ConditionsLibrary conditions={conditions} />
    </>
  );
}
