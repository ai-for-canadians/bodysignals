import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import {
  AlertTriangle,
  BookOpen,
  CheckCircle,
  ClipboardList,
  Leaf,
  Moon,
  Shield,
  Sparkles,
} from 'lucide-react';
import {
  SLEEP_CATEGORY_LABELS,
  SLEEP_DISCLAIMER,
  getSleepInterventionBySlug,
  sleepInterventions,
} from '@/lib/data/sleep';
import { EvidenceBadge } from '@/components/ui';
import type { SleepIntervention } from '@/types';

// === Static params ===
export function generateStaticParams() {
  return sleepInterventions.map((s) => ({ slug: s.slug }));
}

// === Metadata ===
export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const intervention = getSleepInterventionBySlug(params.slug);
  if (!intervention) {
    return { title: 'Sleep Intervention Not Found' };
  }
  return {
    title: intervention.name,
    description: intervention.tagline,
    openGraph: {
      title: `${intervention.name} | Body Signals`,
      description: intervention.tagline,
    },
  };
}

// === Helpers ===
const RISK_LEVEL_STYLES: Record<
  SleepIntervention['safetyProfile']['riskLevel'],
  string
> = {
  'very low': 'bg-emerald-500/20 text-emerald-400',
  low: 'bg-emerald-500/20 text-emerald-400',
  moderate: 'bg-amber-500/20 text-amber-400',
  high: 'bg-red-500/20 text-red-400',
};

const SEVERITY_STYLES: Record<'minor' | 'moderate' | 'severe', string> = {
  minor: 'bg-slate-700 text-slate-300',
  moderate: 'bg-amber-500/20 text-amber-400',
  severe: 'bg-red-500/20 text-red-400',
};

const FREQUENCY_STYLES: Record<'common' | 'uncommon' | 'rare', string> = {
  common: 'bg-amber-500/20 text-amber-400',
  uncommon: 'bg-slate-700 text-slate-300',
  rare: 'bg-slate-700 text-slate-400',
};

export default function SleepInterventionPage({
  params,
}: {
  params: { slug: string };
}) {
  const intervention = getSleepInterventionBySlug(params.slug);
  if (!intervention) {
    notFound();
  }

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <div className="bg-slate-900 border-b border-slate-800 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
            <Link
              href="/topics/sleep"
              className="hover:text-amber-500 transition-colors"
            >
              Sleep Hub
            </Link>
            <span>/</span>
            <span className="text-slate-400">
              {SLEEP_CATEGORY_LABELS[intervention.category]}
            </span>
          </div>

          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl font-bold text-slate-50 mb-3">
                {intervention.name}
              </h1>
              <p className="text-xl text-slate-300 leading-relaxed max-w-3xl">
                {intervention.tagline}
              </p>
            </div>
            <div className="flex flex-col items-start md:items-end gap-2 shrink-0">
              <EvidenceBadge
                rating={intervention.evidenceRating}
                showLabel={true}
              />
              <span className="text-xs text-slate-500 md:text-right md:max-w-[220px]">
                Overall rating for this intervention. See the benefits list below for per-claim ratings.
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="md:col-span-2 space-y-12">
            {/* Overview */}
            <section>
              <h2 className="text-2xl font-bold text-slate-50 mb-4">
                Overview
              </h2>
              <p className="text-slate-300 leading-relaxed whitespace-pre-line">
                {intervention.description}
              </p>
            </section>

            {/* How it works */}
            <section className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-6">
              <h2 className="text-2xl font-bold text-slate-50 mb-3 flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-amber-500" />
                How it works
              </h2>
              <p className="text-slate-300 leading-relaxed">
                {intervention.howItWorks}
              </p>
            </section>

            {/* Benefits */}
            {intervention.benefits.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-slate-50 mb-4 flex items-center gap-2">
                  <Leaf className="w-6 h-6 text-amber-500" />
                  Benefits
                </h2>
                <ul className="space-y-3">
                  {intervention.benefits.map((benefit, idx) => (
                    <li
                      key={idx}
                      className="flex items-start justify-between gap-4 bg-slate-800 border border-slate-700 rounded-lg p-4"
                    >
                      <p className="text-slate-300 leading-relaxed flex-1">
                        {benefit.description}
                      </p>
                      <EvidenceBadge
                        rating={benefit.evidenceRating}
                        showLabel={false}
                      />
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Protocol */}
            {intervention.protocol && intervention.protocol.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-slate-50 mb-4 flex items-center gap-2">
                  <ClipboardList className="w-6 h-6 text-amber-500" />
                  Protocol
                </h2>
                <ol className="space-y-3">
                  {intervention.protocol.map((step, idx) => (
                    <li key={idx} className="flex gap-4">
                      <span className="shrink-0 w-8 h-8 rounded-full bg-amber-500/20 text-amber-400 font-bold flex items-center justify-center">
                        {idx + 1}
                      </span>
                      <span className="text-slate-300 leading-relaxed pt-1">
                        {step}
                      </span>
                    </li>
                  ))}
                </ol>
              </section>
            )}

            {/* Dosage */}
            {intervention.dosage && (
              <section className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-6">
                <h2 className="text-lg font-bold text-amber-400 mb-2 uppercase tracking-wide">
                  Dosage
                </h2>
                <p className="text-slate-200 text-lg leading-relaxed">
                  {intervention.dosage}
                </p>
              </section>
            )}

            {/* Safety profile */}
            <section>
              <h2 className="text-2xl font-bold text-slate-50 mb-4 flex items-center gap-2">
                <Shield className="w-6 h-6 text-amber-500" />
                Safety Profile
              </h2>

              <div className="mb-5">
                <div className="text-xs text-slate-500 uppercase font-semibold mb-2">
                  Risk Level
                </div>
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold uppercase ${RISK_LEVEL_STYLES[intervention.safetyProfile.riskLevel]}`}
                >
                  {intervention.safetyProfile.riskLevel}
                </span>
              </div>

              {intervention.safetyProfile.sideEffects.length > 0 && (
                <div className="mb-5">
                  <h3 className="text-sm font-semibold text-slate-400 mb-3 uppercase">
                    Side Effects
                  </h3>
                  <div className="overflow-hidden border border-slate-700 rounded-lg">
                    <table className="w-full text-sm">
                      <thead className="bg-slate-800/70 text-slate-400">
                        <tr>
                          <th className="text-left px-4 py-2 font-semibold">
                            Effect
                          </th>
                          <th className="text-left px-4 py-2 font-semibold">
                            Severity
                          </th>
                          <th className="text-left px-4 py-2 font-semibold">
                            Frequency
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-700">
                        {intervention.safetyProfile.sideEffects.map(
                          (se, idx) => (
                            <tr key={idx} className="bg-slate-800/40">
                              <td className="px-4 py-3 text-slate-300">
                                {se.name}
                              </td>
                              <td className="px-4 py-3">
                                <span
                                  className={`inline-flex items-center text-xs font-medium px-2 py-0.5 rounded uppercase ${SEVERITY_STYLES[se.severity]}`}
                                >
                                  {se.severity}
                                </span>
                              </td>
                              <td className="px-4 py-3">
                                <span
                                  className={`inline-flex items-center text-xs font-medium px-2 py-0.5 rounded uppercase ${FREQUENCY_STYLES[se.frequency]}`}
                                >
                                  {se.frequency}
                                </span>
                              </td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {intervention.safetyProfile.contraindications.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-slate-400 mb-3 uppercase">
                    Contraindications
                  </h3>
                  <ul className="space-y-2">
                    {intervention.safetyProfile.contraindications.map(
                      (contra, idx) => (
                        <li
                          key={idx}
                          className="flex gap-3 text-slate-300 bg-red-950/20 border border-red-900/40 rounded-lg p-3"
                        >
                          <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                          <span>{contra}</span>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              )}
            </section>

            {/* Research summary */}
            {intervention.researchSummary && (
              <section>
                <h2 className="text-2xl font-bold text-slate-50 mb-4 flex items-center gap-2">
                  <BookOpen className="w-6 h-6 text-amber-500" />
                  Research Summary
                </h2>
                <p className="text-slate-300 leading-relaxed">
                  {intervention.researchSummary}
                </p>
              </section>
            )}

            {/* Sources */}
            {intervention.sources.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-slate-50 mb-4">
                  Sources
                </h2>
                <ul className="space-y-2">
                  {intervention.sources.map((src, idx) => (
                    <li key={idx}>
                      <a
                        href={src.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-amber-400 hover:text-amber-300 transition-colors inline-flex items-center gap-2"
                      >
                        <span className="text-slate-500">•</span>
                        {src.title}
                        {src.year && (
                          <span className="text-slate-500">({src.year})</span>
                        )}
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Last updated footer */}
            <p className="text-xs text-slate-500 pt-6 border-t border-slate-800">
              Last updated: {intervention.lastUpdated}
            </p>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Medical Disclaimer */}
            <div className="bg-slate-800 border-l-4 border-amber-500 rounded-r-xl p-5">
              <h3 className="text-base font-bold text-slate-50 mb-3 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-500" />
                Medical Disclaimer
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                {SLEEP_DISCLAIMER}
              </p>
            </div>

            {/* Quick Facts */}
            <div className="bg-slate-800 rounded-xl p-5 border border-slate-700">
              <h3 className="text-base font-bold text-slate-50 mb-4">
                Quick Facts
              </h3>
              <div className="space-y-4 text-sm">
                <div>
                  <div className="text-xs text-slate-500 uppercase font-semibold mb-1">
                    Category
                  </div>
                  <div className="text-slate-300 inline-flex items-center gap-2">
                    <Moon className="w-4 h-4 text-amber-500" />
                    {SLEEP_CATEGORY_LABELS[intervention.category]}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-slate-500 uppercase font-semibold mb-1">
                    Evidence Rating
                  </div>
                  <div className="flex items-center gap-2">
                    <EvidenceBadge
                      rating={intervention.evidenceRating}
                      showLabel={false}
                    />
                  </div>
                </div>
                <div>
                  <div className="text-xs text-slate-500 uppercase font-semibold mb-1">
                    Risk Level
                  </div>
                  <span
                    className={`inline-flex items-center text-xs font-medium px-2 py-1 rounded-full uppercase ${RISK_LEVEL_STYLES[intervention.safetyProfile.riskLevel]}`}
                  >
                    <CheckCircle className="w-3 h-3 mr-1" />
                    {intervention.safetyProfile.riskLevel}
                  </span>
                </div>
                <div>
                  <div className="text-xs text-slate-500 uppercase font-semibold mb-1">
                    Last Updated
                  </div>
                  <div className="text-slate-300">
                    {intervention.lastUpdated}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
