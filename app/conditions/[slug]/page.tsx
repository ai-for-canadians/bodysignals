import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import {
  AlertTriangle,
  ArrowRight,
  Brain,
  Stethoscope,
  Activity,
  Utensils,
  Moon,
  Heart,
  Sparkles,
  ListChecks,
  FlaskConical,
  Users,
} from 'lucide-react';
import {
  conditions,
  getConditionBySlug,
  CATEGORY_LABELS,
} from '@/lib/data/conditions';
import { symptoms } from '@/lib/data/symptoms';
import { EvidenceBadge } from '@/components/ui';
import { SourceList } from '@/components/shared/SourceList';
import { ResearchDigestBanner } from '@/components/shared/ResearchDigestBanner';
import { ReferralCTA } from '@/components/referrals/ReferralCTA';
import { getPlacementForSlug } from '@/lib/data/referral-placements';
import { BASE_URL } from '@/lib/config';
import {
  jsonLdScript,
  medicalWebPageJsonLd,
  conditionJsonLd,
  breadcrumbJsonLd,
} from '@/lib/utils/structured-data';
import type { EvidenceRating, Intervention } from '@/types';

// === Static params ===
export function generateStaticParams() {
  return conditions.map((c) => ({ slug: c.slug }));
}

// === Metadata ===
export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const condition = getConditionBySlug(params.slug);
  if (!condition) {
    return { title: 'Condition Not Found' };
  }
  return {
    title: condition.name,
    description: condition.summary,
    openGraph: {
      title: `${condition.name} | Body Signals`,
      description: condition.summary,
    },
  };
}

// === Helpers ===
const EVIDENCE_ORDER: EvidenceRating[] = ['A', 'B', 'C', 'D', 'F'];

function bestInterventionIndex(interventions: Intervention[]): number {
  if (interventions.length === 0) return -1;
  return Math.min(
    ...interventions.map((i) => EVIDENCE_ORDER.indexOf(i.evidenceRating))
  );
}

const INTERVENTION_CATEGORY_LABEL: Record<Intervention['category'], string> = {
  medication: 'Medication',
  supplement: 'Supplement',
  lifestyle: 'Lifestyle',
  therapy: 'Therapy',
  exercise: 'Exercise',
  diet: 'Diet',
  tool: 'Tool',
  protocol: 'Protocol',
  device: 'Device',
};

const FREQUENCY_STYLES: Record<'common' | 'occasional' | 'rare', string> = {
  common: 'bg-amber-500/20 text-amber-400',
  occasional: 'bg-slate-700 text-slate-300',
  rare: 'bg-slate-700 text-slate-400',
};

// Set of symptom slugs that actually exist — used to filter cross-links.
const EXISTING_SYMPTOM_SLUGS = new Set(symptoms.map((s) => s.slug));

export default function ConditionPage({
  params,
}: {
  params: { slug: string };
}) {
  const condition = getConditionBySlug(params.slug);
  if (!condition) {
    notFound();
  }

  const isMentalHealth = condition.category === 'mental-health';
  const bestIdx = bestInterventionIndex(condition.interventions);
  const hasMultipleInterventions = condition.interventions.length > 1;

  const relatedSymptoms =
    condition.relatedSymptomSlugs
      ?.filter((slug) => EXISTING_SYMPTOM_SLUGS.has(slug))
      .map((slug) => symptoms.find((s) => s.slug === slug)!)
      .filter(Boolean) ?? [];

  const categoryLabel = CATEGORY_LABELS[condition.category];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdScript(
            medicalWebPageJsonLd({
              title: condition.name,
              description: condition.summary,
              url: `${BASE_URL}/conditions/${condition.slug}`,
              dateModified: condition.lastUpdated,
            }),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdScript(conditionJsonLd(condition)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdScript(
            breadcrumbJsonLd([
              { name: 'Home', url: BASE_URL },
              { name: 'Conditions', url: `${BASE_URL}/conditions` },
              { name: categoryLabel, url: `${BASE_URL}/conditions` },
              { name: condition.name, url: `${BASE_URL}/conditions/${condition.slug}` },
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
              href="/conditions"
              className="hover:text-amber-500 transition-colors"
            >
              Conditions
            </Link>
            <span>/</span>
            <span className="text-slate-400">
              {CATEGORY_LABELS[condition.category]}
            </span>
          </div>

          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl font-bold text-slate-50 mb-3">
                {condition.name}
              </h1>
              <p className="text-xl text-slate-300 leading-relaxed max-w-3xl">
                {condition.tagline}
              </p>
            </div>
            <div className="flex flex-col items-start md:items-end gap-2 shrink-0">
              <EvidenceBadge
                rating={condition.evidenceRating}
                showLabel={true}
              />
              <span className="text-xs text-slate-500 md:text-right md:max-w-[220px]">
                Median rating across interventions. See individual treatments
                below for specifics.
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-12">
            {/* Overview */}
            <section>
              <h2 className="text-2xl font-bold text-slate-50 mb-4">
                Overview
              </h2>
              <p className="text-slate-300 leading-relaxed whitespace-pre-line">
                {condition.description}
              </p>
            </section>

            {/* ADHD → Topics cross-link (highest-value cross-link in site) */}
            {condition.slug === 'adhd' && (
              <Link
                href="/topics/adhd"
                className="block bg-gradient-to-br from-amber-500/10 to-slate-800 border border-amber-500/30 rounded-xl p-6 hover:border-amber-500/60 transition-all"
              >
                <div className="flex items-center gap-3 mb-2">
                  <Brain className="w-6 h-6 text-amber-500" />
                  <h3 className="text-lg font-bold text-slate-50">
                    Already diagnosed?
                  </h3>
                </div>
                <p className="text-slate-300 mb-3">
                  Tactical systems for day-to-day life — productivity, home, finances, health, and relationships. Rated by difficulty and impact.
                </p>
                <span className="text-amber-400 font-medium inline-flex items-center gap-1">
                  Explore 18 tactical ADHD systems{' '}
                  <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            )}

            {/* First Steps — MH conditions see this BEFORE Interventions */}
            {isMentalHealth &&
              condition.firstSteps &&
              condition.firstSteps.length > 0 && (
                <section className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-6">
                  <h2 className="text-2xl font-bold text-slate-50 mb-4 flex items-center gap-2">
                    <Sparkles className="w-6 h-6 text-amber-500" />
                    First Steps
                  </h2>
                  <ol className="space-y-4">
                    {condition.firstSteps.map((step, idx) => (
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

            {/* Symptoms */}
            {condition.symptoms.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-slate-50 mb-4">
                  Symptoms
                </h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {condition.symptoms.map((symptom, idx) => (
                    <div
                      key={idx}
                      className="bg-slate-800 border border-slate-700 rounded-lg p-4"
                    >
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 className="font-semibold text-slate-50">
                          {symptom.name}
                        </h3>
                        <span
                          className={`text-xs px-2 py-0.5 rounded uppercase font-medium ${FREQUENCY_STYLES[symptom.frequency]}`}
                        >
                          {symptom.frequency}
                        </span>
                      </div>
                      <p className="text-sm text-slate-400">
                        {symptom.description}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Interventions */}
            {condition.interventions.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-slate-50 mb-4">
                  Interventions &amp; Treatments
                </h2>
                <div className="space-y-5">
                  {condition.interventions.map((intervention, idx) => {
                    const isBest =
                      hasMultipleInterventions &&
                      EVIDENCE_ORDER.indexOf(intervention.evidenceRating) ===
                        bestIdx;
                    return (
                      <div
                        key={intervention.id}
                        className="bg-slate-800 border border-slate-700 rounded-xl p-6"
                      >
                        <div className="flex items-start justify-between gap-3 mb-3 flex-wrap">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap mb-1">
                              <h3 className="text-lg font-semibold text-slate-50">
                                {intervention.name}
                              </h3>
                              {isBest && (
                                <span className="bg-amber-500/20 text-amber-400 text-xs px-2 py-1 rounded font-medium">
                                  Most evidence-backed option
                                </span>
                              )}
                            </div>
                            <span className="inline-flex items-center text-xs font-medium px-2 py-0.5 rounded bg-slate-700 text-slate-300">
                              {
                                INTERVENTION_CATEGORY_LABEL[
                                  intervention.category
                                ]
                              }
                            </span>
                          </div>
                          <EvidenceBadge
                            rating={intervention.evidenceRating}
                            showLabel={false}
                          />
                        </div>

                        <p className="text-slate-300 mb-4 leading-relaxed">
                          {intervention.description}
                        </p>

                        {intervention.mechanism && (
                          <div className="mb-4">
                            <h4 className="text-sm font-semibold text-amber-400 mb-1">
                              How it works
                            </h4>
                            <p className="text-sm text-slate-400 leading-relaxed">
                              {intervention.mechanism}
                            </p>
                          </div>
                        )}

                        {intervention.protocol &&
                          intervention.protocol.length > 0 && (
                            <div className="mb-4">
                              <h4 className="text-sm font-semibold text-amber-400 mb-1">
                                Protocol
                              </h4>
                              <ul className="list-disc list-outside pl-5 space-y-1 text-sm text-slate-400">
                                {intervention.protocol.map((item, pIdx) => (
                                  <li key={pIdx} className="marker:text-amber-500">
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                        {intervention.dosage && (
                          <div className="text-sm">
                            <span className="text-amber-400 font-semibold">
                              Dosage:{' '}
                            </span>
                            <span className="text-slate-400">
                              {intervention.dosage}
                            </span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {/* First Steps — non-MH conditions still show it (if present), but below interventions */}
            {!isMentalHealth &&
              condition.firstSteps &&
              condition.firstSteps.length > 0 && (
                <section>
                  <h2 className="text-2xl font-bold text-slate-50 mb-4 flex items-center gap-2">
                    <Sparkles className="w-6 h-6 text-amber-500" />
                    First Steps
                  </h2>
                  <ol className="space-y-3">
                    {condition.firstSteps.map((step, idx) => (
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

            {/* Testing Options */}
            {condition.testingOptions && condition.testingOptions.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-slate-50 mb-4 flex items-center gap-2">
                  <FlaskConical className="w-6 h-6 text-amber-500" />
                  Testing Options
                </h2>
                <ul className="space-y-2">
                  {condition.testingOptions.map((test, idx) => (
                    <li
                      key={idx}
                      className="flex gap-3 text-slate-300 bg-slate-800/50 border border-slate-700 rounded-lg p-3"
                    >
                      <Stethoscope className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                      <span>{test}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Lifestyle Factors */}
            {condition.lifestyleFactors &&
              (condition.lifestyleFactors.diet ||
                condition.lifestyleFactors.exercise ||
                condition.lifestyleFactors.sleep ||
                condition.lifestyleFactors.stress) && (
                <section>
                  <h2 className="text-2xl font-bold text-slate-50 mb-4">
                    Lifestyle Factors
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {condition.lifestyleFactors.diet && (
                      <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Utensils className="w-5 h-5 text-amber-500" />
                          <h3 className="font-semibold text-slate-50">Diet</h3>
                        </div>
                        <p className="text-sm text-slate-400 leading-relaxed">
                          {condition.lifestyleFactors.diet}
                        </p>
                      </div>
                    )}
                    {condition.lifestyleFactors.exercise && (
                      <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Activity className="w-5 h-5 text-amber-500" />
                          <h3 className="font-semibold text-slate-50">
                            Exercise
                          </h3>
                        </div>
                        <p className="text-sm text-slate-400 leading-relaxed">
                          {condition.lifestyleFactors.exercise}
                        </p>
                      </div>
                    )}
                    {condition.lifestyleFactors.sleep && (
                      <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Moon className="w-5 h-5 text-amber-500" />
                          <h3 className="font-semibold text-slate-50">Sleep</h3>
                        </div>
                        <p className="text-sm text-slate-400 leading-relaxed">
                          {condition.lifestyleFactors.sleep}
                        </p>
                      </div>
                    )}
                    {condition.lifestyleFactors.stress && (
                      <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Heart className="w-5 h-5 text-amber-500" />
                          <h3 className="font-semibold text-slate-50">
                            Stress
                          </h3>
                        </div>
                        <p className="text-sm text-slate-400 leading-relaxed">
                          {condition.lifestyleFactors.stress}
                        </p>
                      </div>
                    )}
                  </div>
                </section>
              )}

            {/* Dietary Recommendations */}
            {condition.dietaryRecommendations &&
              condition.dietaryRecommendations.length > 0 && (
                <section>
                  <h2 className="text-2xl font-bold text-slate-50 mb-4 flex items-center gap-2">
                    <ListChecks className="w-6 h-6 text-amber-500" />
                    Dietary Recommendations
                  </h2>
                  <ul className="list-disc list-outside pl-6 space-y-2 text-slate-300">
                    {condition.dietaryRecommendations.map((rec, idx) => (
                      <li key={idx} className="marker:text-amber-500">
                        {rec}
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Sources */}
              <SourceList sources={condition.sources} />
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
                {condition.disclaimer}
              </p>
            </div>

            {/* See a provider */}
            {condition.professionalToSee && (
              <Link
                href="/providers"
                className="block bg-slate-800 border border-slate-700 rounded-xl p-5 hover:border-amber-500/50 transition-colors group"
              >
                <h3 className="text-base font-bold text-slate-50 mb-2 flex items-center gap-2">
                  <Users className="w-5 h-5 text-amber-500" />
                  See a provider
                </h3>
                <p className="text-sm text-slate-300 mb-3">
                  {condition.professionalToSee}
                </p>
                <span className="text-xs text-amber-400 font-medium inline-flex items-center gap-1 group-hover:text-amber-300">
                  Compare provider types
                  <ArrowRight className="w-3 h-3" />
                </span>
              </Link>
            )}

            {/* Referral CTA */}
            {(() => {
              const placement = getPlacementForSlug(params.slug, 'condition');
              return placement ? <ReferralCTA {...placement} /> : null;
            })()}

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
                  <div className="text-slate-300">
                    {CATEGORY_LABELS[condition.category]}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-slate-500 uppercase font-semibold mb-1">
                    Evidence Rating
                  </div>
                  <div className="flex items-center gap-2">
                    <EvidenceBadge
                      rating={condition.evidenceRating}
                      showLabel={false}
                    />
                    <span className="text-xs text-slate-500">
                      {condition.interventions.length} intervention
                      {condition.interventions.length === 1 ? '' : 's'}
                    </span>
                  </div>
                </div>
                <div>
                  <div className="text-xs text-slate-500 uppercase font-semibold mb-1">
                    Last Updated
                  </div>
                  <div className="text-slate-300">{condition.lastUpdated}</div>
                </div>
              </div>
            </div>

            {/* Related Symptoms */}
            {relatedSymptoms.length > 0 && (
              <div className="bg-slate-800 rounded-xl p-5 border border-slate-700">
                <h3 className="text-base font-bold text-slate-50 mb-3">
                  Related Symptoms
                </h3>
                <ul className="space-y-2">
                  {relatedSymptoms.map((symptom) => (
                    <li key={symptom.slug}>
                      <Link
                        href={`/symptoms/${symptom.slug}`}
                        className="text-sm text-slate-300 hover:text-amber-400 transition-colors inline-flex items-center gap-1"
                      >
                        <span className="text-amber-500">•</span>
                        {symptom.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
      </div>
    </>
  );
}
