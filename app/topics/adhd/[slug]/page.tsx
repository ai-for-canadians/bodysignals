import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import {
  AlertTriangle,
  ArrowRight,
  Brain,
  CheckCircle,
  Clock,
  Info,
  ListOrdered,
  Sparkles,
  UserCheck,
  Wrench,
} from 'lucide-react';
import { ResearchDigestBanner } from '@/components/shared/ResearchDigestBanner';
import {
  ADHD_CATEGORY_LABELS,
  ADHD_DISCLAIMER,
  adhdSystems,
  getADHDSystemBySlug,
  getADHDToolById,
} from '@/lib/data/adhd';
import { ADHDToolCard } from '@/components/topics/ADHDToolCard';
import { ReferralCTA } from '@/components/referrals/ReferralCTA';
import { getPlacementForSlug } from '@/lib/data/referral-placements';
import { BASE_URL } from '@/lib/config';
import {
  jsonLdScript,
  medicalWebPageJsonLd,
  adhdSystemJsonLd,
  breadcrumbJsonLd,
} from '@/lib/utils/structured-data';
import type { ADHDSystem } from '@/types';

// === Static params ===
export function generateStaticParams() {
  return adhdSystems.map((s) => ({ slug: s.slug }));
}

// === Metadata ===
export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const system = getADHDSystemBySlug(params.slug);
  if (!system) {
    return { title: 'ADHD System Not Found' };
  }
  return {
    title: system.name,
    description: system.tagline,
    openGraph: {
      title: `${system.name} | Body Signals`,
      description: system.tagline,
    },
  };
}

// === Helpers ===
const DIFFICULTY_STYLES: Record<ADHDSystem['difficulty'], string> = {
  Easy: 'bg-slate-700 text-slate-200',
  Medium: 'bg-slate-600 text-slate-100',
  Hard: 'bg-slate-500 text-slate-50',
};

const IMPACT_STYLES: Record<ADHDSystem['impact'], string> = {
  Low: 'bg-amber-500/10 text-amber-400/70',
  Medium: 'bg-amber-500/20 text-amber-400',
  High: 'bg-amber-500/30 text-amber-300',
  Critical: 'bg-amber-500 text-slate-900',
};

export default function ADHDSystemPage({
  params,
}: {
  params: { slug: string };
}) {
  const system = getADHDSystemBySlug(params.slug);
  if (!system) {
    notFound();
  }

  const resolvedTools = (system.tools ?? [])
    .map((id) => getADHDToolById(id))
    .filter((t): t is NonNullable<typeof t> => Boolean(t));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdScript(
            medicalWebPageJsonLd({
              title: system.name,
              description: system.tagline,
              url: `${BASE_URL}/topics/adhd/${system.slug}`,
              dateModified: system.lastUpdated,
            }),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdScript(adhdSystemJsonLd(system)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdScript(
            breadcrumbJsonLd([
              { name: 'Home', url: BASE_URL },
              { name: 'Topics', url: `${BASE_URL}/topics` },
              { name: 'ADHD', url: `${BASE_URL}/topics/adhd` },
              { name: system.name, url: `${BASE_URL}/topics/adhd/${system.slug}` },
            ]),
          ),
        }}
      />
      <div className="min-h-screen pb-20">
        <ResearchDigestBanner />
      {/* Header */}
      <div className="bg-slate-900 border-b border-slate-800 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
            <Link
              href="/topics/adhd"
              className="hover:text-amber-500 transition-colors"
            >
              ADHD Hub
            </Link>
            <span>/</span>
            <span className="text-slate-400">
              {ADHD_CATEGORY_LABELS[system.category] ?? system.category}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-slate-50 mb-3">
            {system.name}
          </h1>
          <p className="text-xl text-slate-300 leading-relaxed max-w-3xl">
            {system.tagline}
          </p>

          {/* Difficulty + Impact + time hero badges */}
          <div className="flex flex-wrap items-center gap-3 mt-6">
            <span
              className={`inline-flex items-center text-sm font-semibold px-3 py-1.5 rounded-full uppercase tracking-wide ${DIFFICULTY_STYLES[system.difficulty]}`}
            >
              {system.difficulty}
            </span>
            <span
              className={`inline-flex items-center text-sm font-semibold px-3 py-1.5 rounded-full uppercase tracking-wide ${IMPACT_STYLES[system.impact]}`}
            >
              {system.impact} impact
            </span>
            <span className="inline-flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-slate-300">
              <Clock className="w-4 h-4" />
              {system.timeToImplement}
            </span>
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
                {system.description}
              </p>
            </section>

            {/* Why it works */}
            <section className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-6">
              <h2 className="text-2xl font-bold text-slate-50 mb-3 flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-amber-500" />
                Why it works
              </h2>
              <p className="text-slate-300 leading-relaxed">
                {system.whyItWorks}
              </p>
            </section>

            {/* Steps */}
            {system.steps.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-slate-50 mb-4 flex items-center gap-2">
                  <ListOrdered className="w-6 h-6 text-amber-500" />
                  Steps
                </h2>
                <ol className="space-y-4">
                  {system.steps.map((step) => (
                    <li key={step.order} className="flex gap-4">
                      <span className="shrink-0 w-8 h-8 rounded-full bg-amber-500/20 text-amber-400 font-bold flex items-center justify-center">
                        {step.order}
                      </span>
                      <div className="flex-1 pt-1">
                        <p className="text-slate-300 leading-relaxed">
                          {step.text}
                        </p>
                        {step.tip && (
                          <div className="mt-2 bg-amber-500/5 border border-amber-500/20 rounded-lg p-3 text-sm text-amber-200 flex gap-2">
                            <Info className="w-4 h-4 shrink-0 mt-0.5 text-amber-400" />
                            <span>{step.tip}</span>
                          </div>
                        )}
                      </div>
                    </li>
                  ))}
                </ol>
              </section>
            )}

            {/* Common pitfalls */}
            {system.commonPitfalls.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-slate-50 mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-6 h-6 text-red-400" />
                  Common Pitfalls
                </h2>
                <ul className="space-y-2">
                  {system.commonPitfalls.map((pitfall, idx) => (
                    <li
                      key={idx}
                      className="flex gap-3 text-slate-300 bg-red-950/20 border border-red-900/40 rounded-lg p-3"
                    >
                      <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                      <span>{pitfall}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Recommended tools (resolved from IDs) */}
            {resolvedTools.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-slate-50 mb-4 flex items-center gap-2">
                  <Wrench className="w-6 h-6 text-amber-500" />
                  Recommended Tools
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {resolvedTools.map((tool) => (
                    <ADHDToolCard key={tool.id} tool={tool} />
                  ))}
                </div>
              </section>
            )}

            {/* Find an ADHD-informed therapist CTA */}
            <Link
              href="/providers?specialty=adhd"
              className="group flex items-start gap-4 bg-slate-800 border border-slate-700 rounded-xl p-5 hover:border-slate-600 transition-all"
            >
              <span className="shrink-0 w-10 h-10 rounded-lg bg-slate-700 flex items-center justify-center">
                <UserCheck className="w-5 h-5 text-amber-400" />
              </span>
              <span className="flex-1">
                <h3 className="text-base font-bold text-slate-50 mb-1 group-hover:text-amber-400 transition-colors">
                  Find an ADHD-informed therapist
                </h3>
                <p className="text-sm text-slate-400">
                  Tactical systems are not a substitute for professional support. If ADHD is untreated or comorbid, talk to someone qualified.
                </p>
              </span>
              <ArrowRight className="w-5 h-5 text-slate-500 shrink-0 mt-2 group-hover:translate-x-1 group-hover:text-amber-400 transition-all" />
            </Link>

            {/* Referral CTA */}
            {(() => {
              const placement = getPlacementForSlug(params.slug, 'adhd');
              return placement ? <ReferralCTA {...placement} /> : null;
            })()}

            {/* Cross-link back to clinical condition page */}
            <Link
              href="/conditions/adhd"
              className="group flex items-start gap-4 bg-gradient-to-br from-amber-500/10 to-slate-800 border border-amber-500/30 rounded-xl p-5 hover:border-amber-500/60 transition-all"
            >
              <span className="shrink-0 w-10 h-10 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center">
                <Brain className="w-5 h-5 text-amber-400" />
              </span>
              <span className="flex-1">
                <h3 className="text-base font-bold text-slate-50 mb-1 group-hover:text-amber-300 transition-colors">
                  Looking for clinical ADHD information?
                </h3>
                <p className="text-sm text-slate-300">
                  See the condition page for diagnosis, medication, and professional treatment context.
                </p>
              </span>
              <ArrowRight className="w-5 h-5 text-amber-400 shrink-0 mt-2 group-hover:translate-x-1 transition-transform" />
            </Link>

            {/* Last updated footer */}
            <p className="text-xs text-slate-500 pt-6 border-t border-slate-800">
              Last updated: {system.lastUpdated}
            </p>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Medical Disclaimer */}
            <div className="bg-slate-800 border-l-4 border-amber-500 rounded-r-xl p-5">
              <h3 className="text-base font-bold text-slate-50 mb-3 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-500" />
                Disclaimer
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                {ADHD_DISCLAIMER}
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
                    Difficulty
                  </div>
                  <span
                    className={`inline-flex items-center text-xs font-semibold px-2 py-1 rounded uppercase ${DIFFICULTY_STYLES[system.difficulty]}`}
                  >
                    {system.difficulty}
                  </span>
                </div>
                <div>
                  <div className="text-xs text-slate-500 uppercase font-semibold mb-1">
                    Impact
                  </div>
                  <span
                    className={`inline-flex items-center text-xs font-semibold px-2 py-1 rounded uppercase ${IMPACT_STYLES[system.impact]}`}
                  >
                    {system.impact}
                  </span>
                </div>
                <div>
                  <div className="text-xs text-slate-500 uppercase font-semibold mb-1">
                    Time to Implement
                  </div>
                  <div className="text-slate-300 inline-flex items-center gap-2">
                    <Clock className="w-4 h-4 text-amber-500" />
                    {system.timeToImplement}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-slate-500 uppercase font-semibold mb-1">
                    Category
                  </div>
                  <div className="text-slate-300">
                    {ADHD_CATEGORY_LABELS[system.category] ?? system.category}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-slate-500 uppercase font-semibold mb-1">
                    Evidence Rating
                  </div>
                  <div className="flex items-start gap-2">
                    <span
                      title={system.ratingNote ?? 'Evidence rating'}
                      className="inline-flex items-center justify-center w-6 h-6 rounded border border-slate-600 bg-slate-900/50 text-xs font-semibold text-slate-300"
                    >
                      {system.evidenceRating}
                    </span>
                    {system.ratingNote && (
                      <span className="text-xs text-slate-500 leading-relaxed flex-1">
                        {system.ratingNote}
                      </span>
                    )}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-slate-500 uppercase font-semibold mb-1">
                    Last Updated
                  </div>
                  <div className="text-slate-300 inline-flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-slate-500" />
                    {system.lastUpdated}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  );
}
