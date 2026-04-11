import Link from 'next/link';
import type { Metadata } from 'next';
import { Users, ArrowRight } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Find the Right Provider',
  description:
    'Confused about whether you need a psychiatrist, psychologist, social worker, or counsellor? A practical guide with Canadian and US context. Launching Q2 2026.',
  openGraph: {
    title: 'Find the Right Provider | Body Signals',
    description:
      'Confused about whether you need a psychiatrist, psychologist, social worker, or counsellor? A practical guide with Canadian and US context. Launching Q2 2026.',
  },
};

const providerTypes = [
  {
    name: 'Psychiatrist',
    qualifications: 'Medical doctor (MD)',
    canPrescribe: 'Yes',
    bestFor:
      'Complex mental health conditions requiring medication management, psychotic disorders, severe depression, bipolar.',
    coverageCA:
      'Covered by provincial health plans (OHIP, MSP, etc.) with a referral.',
    coverageUS:
      'Medicare Part B covers outpatient psychiatric care (80% after deductible) for 65+/disabled nationwide; Medicaid coverage varies by state; community mental health centers offer sliding-scale access.',
  },
  {
    name: 'Psychologist',
    qualifications: 'PhD or PsyD',
    canPrescribe:
      'No (in most jurisdictions; some US states allow prescribing psychologists)',
    bestFor:
      'Psychotherapy, formal assessment and diagnosis, evidence-based therapy modalities (CBT, ACT, DBT).',
    coverageCA:
      'Coverage varies by province; often covered by employer benefits.',
    coverageUS:
      'Commonly covered by insurance for diagnosed conditions (in-network vs out-of-network affects cost); Medicare Part B covers clinical psychologists; Medicaid varies by state; sliding-scale and community clinics available.',
  },
  {
    name: 'Licensed Clinical Social Worker (LCSW / MSW)',
    qualifications: "Master's in social work",
    canPrescribe: 'No',
    bestFor:
      'Therapy for life transitions, grief, family systems, case management, navigating community resources.',
    coverageCA:
      'Typically not covered by provincial plans; often covered by employer benefits.',
    coverageUS:
      'Commonly covered by private insurance and Medicaid; widely available through community mental health centers and federally qualified health centers (FQHCs); Medicare covers LCSWs for mental health.',
  },
  {
    name: 'Counsellor / Therapist',
    qualifications: "Master's-level (MA, MEd, MACP)",
    canPrescribe: 'No',
    bestFor:
      'Talk therapy, life transitions, relationship work, stress management, mild-to-moderate concerns.',
    coverageCA:
      'Typically not covered by provincial plans; check employer benefits.',
    coverageUS:
      'Variable insurance coverage depending on licensure (LPC, LMFT, etc.); not covered by Medicare; Medicaid varies; sliding-scale widely available.',
  },
];

export default function ProvidersPage() {
  return (
    <div className="w-full bg-slate-900 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full text-amber-400 text-sm mb-6">
            <Users className="w-4 h-4" />
            <span>In active development — launching Q2 2026</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-50 mb-4">
            Find the Right Provider
          </h1>
          <p className="text-xl text-slate-400">
            Confused about whether you need a psychiatrist, psychologist, social worker, or counsellor? Here&apos;s a quick comparison of the four most common provider types in Canada and the US.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 mb-10">
          {providerTypes.map((provider) => (
            <Card key={provider.name}>
              <CardHeader>
                <CardTitle>{provider.name}</CardTitle>
                <p className="text-sm text-slate-400 mt-1">{provider.qualifications}</p>
              </CardHeader>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="text-amber-400 font-medium">Can prescribe: </span>
                  <span className="text-slate-300">{provider.canPrescribe}</span>
                </div>
                <div>
                  <span className="text-amber-400 font-medium">Best for: </span>
                  <span className="text-slate-300">{provider.bestFor}</span>
                </div>
                <div>
                  <span className="text-amber-400 font-medium">Coverage (Canada): </span>
                  <span className="text-slate-300">{provider.coverageCA}</span>
                </div>
                <div>
                  <span className="text-amber-400 font-medium">Coverage (US): </span>
                  <span className="text-slate-300">{provider.coverageUS}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="border-t border-slate-800 pt-8">
          <p className="text-slate-400 mb-4">
            The full provider directory will include a decision tree, sample questions to ask on a first call, and Canadian and US crisis resources.
          </p>
          <Link
            href="/about"
            className="inline-flex items-center gap-2 text-amber-500 hover:text-amber-400 font-semibold transition-colors"
          >
            Read our methodology
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
