import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import {
  Activity,
  AlertTriangle,
  CheckCircle,
  Layers,
  Target,
  Wrench,
} from 'lucide-react';
import { ResearchDigestBanner } from '@/components/shared/ResearchDigestBanner';
import { ReferralCTA } from '@/components/referrals/ReferralCTA';
import { getPlacementForSlug } from '@/lib/data/referral-placements';
import {
  MOVEMENT_DISCLAIMER,
  MOVEMENT_PHYSIO_CALLOUT,
  getMovementProgramBySlug,
  movementPrograms,
} from '@/lib/data/movement';
import { EvidenceBadge } from '@/components/ui';
import { BASE_URL } from '@/lib/config';
import {
  jsonLdScript,
  medicalWebPageJsonLd,
  movementProgramJsonLd,
  breadcrumbJsonLd,
} from '@/lib/utils/structured-data';

// === Static params ===
export function generateStaticParams() {
  return movementPrograms.map((p) => ({ slug: p.slug }));
}

// === Metadata ===
export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const program = getMovementProgramBySlug(params.slug);
  if (!program) {
    return { title: 'Movement Program Not Found' };
  }
  return {
    title: program.name,
    description: program.tagline,
    openGraph: {
      title: `${program.name} | Body Signals`,
      description: program.tagline,
      url: `/topics/movement/${program.slug}`,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${program.name} | Body Signals`,
      description: program.tagline,
    },
    alternates: {
      canonical: `/topics/movement/${program.slug}`,
    },
  };
}

export default function MovementProgramPage({
  params,
}: {
  params: { slug: string };
}) {
  const program = getMovementProgramBySlug(params.slug);
  if (!program) {
    notFound();
  }

  const totalExercises = program.phases.reduce(
    (sum, phase) => sum + phase.exercises.length,
    0
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdScript(
            medicalWebPageJsonLd({
              title: program.name,
              description: program.tagline,
              url: `${BASE_URL}/topics/movement/${program.slug}`,
              dateModified: program.lastUpdated,
            }),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdScript(movementProgramJsonLd(program)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdScript(
            breadcrumbJsonLd([
              { name: 'Home', url: BASE_URL },
              { name: 'Topics', url: `${BASE_URL}/topics` },
              { name: 'Movement RX', url: `${BASE_URL}/topics/movement` },
              { name: program.name, url: `${BASE_URL}/topics/movement/${program.slug}` },
            ]),
          ),
        }}
      />
      <article className="min-h-screen pb-20">
        <ResearchDigestBanner />
        {/* Header */}
        <div className="bg-slate-900 border-b border-slate-800 py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
            <Link
              href="/topics/movement"
              className="hover:text-amber-500 transition-colors"
            >
              Movement Hub
            </Link>
            <span>/</span>
            <span className="text-slate-400 uppercase tracking-wide">
              {program.bodyPart}
            </span>
          </div>

          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl font-bold text-slate-50 mb-3">
                {program.name}
              </h1>
              <p className="text-xl text-slate-300 leading-relaxed max-w-3xl">
                {program.tagline}
              </p>
            </div>
            <div className="flex flex-col items-start md:items-end gap-2 shrink-0">
              <EvidenceBadge
                rating={program.evidenceRating}
                showLabel={true}
              />
              <span className="text-xs text-slate-500 md:text-right md:max-w-[220px]">
                Overall evidence rating for the protocol.
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="md:col-span-2 space-y-12">
            {/* CONTRAINDICATIONS — critical red-flag block ABOVE the fold */}
            {program.contraindications.length > 0 && (
              <section className="bg-red-950/30 border border-red-900/50 rounded-xl p-6">
                <h2 className="text-2xl font-bold text-red-400 mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-6 h-6" aria-hidden="true" />
                  Do NOT start this protocol if:
                </h2>
                <p className="text-slate-300 mb-4 text-sm">
                  Loading an injured tissue without assessment can make things
                  significantly worse. If any of these apply, see a
                  physiotherapist or physician before starting.
                </p>
                <ul className="space-y-3">
                  {program.contraindications.map((contra, idx) => (
                    <li
                      key={idx}
                      className="flex gap-3 text-slate-50 font-medium"
                    >
                      <span className="text-red-500">•</span>
                      <span>{contra}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* "When to see a physiotherapist" — amber, still above the fold */}
            <section className="bg-amber-500/5 border border-amber-500/30 rounded-xl p-6">
              <h2 className="text-xl font-bold text-amber-300 mb-3 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-400" aria-hidden="true" />
                When to see a physiotherapist
              </h2>
              <p className="text-slate-300 leading-relaxed">
                {MOVEMENT_PHYSIO_CALLOUT}
              </p>
            </section>

            {/* Overview */}
            <section>
              <h2 className="text-2xl font-bold text-slate-50 mb-4">
                Overview
              </h2>
              <p className="text-slate-300 leading-relaxed whitespace-pre-line">
                {program.description}
              </p>
            </section>

            {/* Equipment needed */}
            {program.equipmentNeeded.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-slate-50 mb-4 flex items-center gap-2">
                  <Wrench className="w-6 h-6 text-amber-500" aria-hidden="true" />
                  Equipment Needed
                </h2>
                <ul className="space-y-2">
                  {program.equipmentNeeded.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 text-slate-300"
                    >
                      <span className="text-amber-500 mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Phases */}
            {program.phases.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-slate-50 mb-6 flex items-center gap-2">
                  <Layers className="w-6 h-6 text-amber-500" aria-hidden="true" />
                  Phases
                </h2>
                <div className="space-y-10">
                  {program.phases.map((phase, phaseIdx) => (
                    <div
                      key={phase.id}
                      className="bg-slate-800/50 border border-slate-700 rounded-xl p-6"
                    >
                      {/* Phase header */}
                      <div className="flex items-start gap-4 mb-4">
                        <span className="shrink-0 w-10 h-10 rounded-full bg-amber-500/20 text-amber-400 font-bold flex items-center justify-center">
                          {phaseIdx + 1}
                        </span>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-slate-50 mb-1">
                            {phase.name}
                          </h3>
                          <span className="text-sm text-amber-400 font-medium">
                            {phase.weekRange}
                          </span>
                        </div>
                      </div>

                      {/* Phase description */}
                      <p className="text-slate-300 leading-relaxed mb-4">
                        {phase.description}
                      </p>

                      {/* Goals */}
                      {phase.goals.length > 0 && (
                        <div className="mb-5">
                          <h4 className="text-sm font-semibold text-slate-400 mb-2 uppercase flex items-center gap-1.5">
                            <Target className="w-4 h-4" aria-hidden="true" />
                            Goals
                          </h4>
                          <ul className="space-y-1">
                            {phase.goals.map((goal, gIdx) => (
                              <li
                                key={gIdx}
                                className="flex items-start gap-2 text-slate-300 text-sm"
                              >
                                <span className="text-amber-500">→</span>
                                <span>{goal}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Exercises table */}
                      {phase.exercises.length > 0 && (
                        <div className="overflow-x-auto border border-slate-700 rounded-lg">
                          <table className="w-full text-sm">
                            <thead className="bg-slate-800 text-slate-400">
                              <tr>
                                <th className="text-left px-4 py-2 font-semibold">
                                  Exercise
                                </th>
                                <th className="text-left px-4 py-2 font-semibold whitespace-nowrap">
                                  Sets
                                </th>
                                <th className="text-left px-4 py-2 font-semibold whitespace-nowrap">
                                  Reps
                                </th>
                                <th className="text-left px-4 py-2 font-semibold whitespace-nowrap">
                                  Hold
                                </th>
                                <th className="text-left px-4 py-2 font-semibold whitespace-nowrap">
                                  Frequency
                                </th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-700">
                              {phase.exercises.map((ex) => (
                                <tr
                                  key={ex.id}
                                  className="bg-slate-800/30 align-top"
                                >
                                  <td className="px-4 py-3">
                                    <div className="text-slate-50 font-medium mb-1">
                                      {ex.name}
                                    </div>
                                    <div className="text-slate-400 text-xs leading-relaxed">
                                      {ex.description}
                                    </div>
                                  </td>
                                  <td className="px-4 py-3 text-slate-300 whitespace-nowrap font-mono">
                                    {ex.sets}
                                  </td>
                                  <td className="px-4 py-3 text-slate-300">
                                    {ex.reps}
                                  </td>
                                  <td className="px-4 py-3 text-slate-300 whitespace-nowrap">
                                    {ex.holdTime ?? '—'}
                                  </td>
                                  <td className="px-4 py-3 text-slate-300">
                                    {ex.frequency}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Sources */}
            {program.sources && program.sources.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-slate-50 mb-4">
                  Sources
                </h2>
                <ul className="space-y-2">
                  {program.sources.map((src, idx) => (
                    <li key={idx}>
                      <a
                        href={src.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-amber-400 hover:text-amber-300 transition-colors inline-flex items-start gap-2"
                      >
                        <span className="text-slate-500 mt-1">•</span>
                        <span>
                          {src.title}
                          {src.authors && (
                            <span className="text-slate-500">
                              {' '}
                              — {src.authors}
                            </span>
                          )}
                          {src.year && (
                            <span className="text-slate-500"> ({src.year})</span>
                          )}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Last updated footer */}
            <p className="text-xs text-slate-500 pt-6 border-t border-slate-800">
              Last updated: {program.lastUpdated}
            </p>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <h2 className="sr-only">Sidebar</h2>
            {/* Medical Disclaimer */}
            <div className="bg-slate-800 border-l-4 border-amber-500 rounded-r-xl p-5">
              <h3 className="text-base font-bold text-slate-50 mb-3 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-500" aria-hidden="true" />
                Medical Disclaimer
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                {MOVEMENT_DISCLAIMER}
              </p>
            </div>

            {/* Referral CTA */}
            {(() => {
              const placement = getPlacementForSlug(params.slug, 'movement');
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
                    Body Part
                  </div>
                  <div className="text-slate-300 inline-flex items-center gap-2 capitalize">
                    <Activity className="w-4 h-4 text-amber-500" aria-hidden="true" />
                    {program.bodyPart}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-slate-500 uppercase font-semibold mb-1">
                    Phases
                  </div>
                  <div className="text-slate-300 inline-flex items-center gap-2">
                    <Layers className="w-4 h-4 text-amber-500" aria-hidden="true" />
                    {program.phases.length}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-slate-500 uppercase font-semibold mb-1">
                    Total Exercises
                  </div>
                  <div className="text-slate-300">{totalExercises}</div>
                </div>
                <div>
                  <div className="text-xs text-slate-500 uppercase font-semibold mb-1">
                    Evidence Rating
                  </div>
                  <div className="flex items-center gap-2">
                    <EvidenceBadge
                      rating={program.evidenceRating}
                      showLabel={false}
                    />
                  </div>
                </div>
                <div>
                  <div className="text-xs text-slate-500 uppercase font-semibold mb-1">
                    Last Updated
                  </div>
                  <div className="text-slate-300 inline-flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-slate-500" aria-hidden="true" />
                    {program.lastUpdated}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </article>
    </>
  );
}
