import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowRight, Brain, Info, UserCheck } from 'lucide-react';
import {
  ADHD_RATING_NOTE,
  adhdSystems,
  adhdTools,
} from '@/lib/data/adhd';
import { ADHDLibrary } from '@/components/topics/ADHDLibrary';
import { ADHDToolCard } from '@/components/topics/ADHDToolCard';

export const metadata: Metadata = {
  title: 'ADHD Systems Hub',
  description:
    '18 tactical systems and 6 tools for ADHD brains — rated by difficulty and impact, with hand-authored evidence grades and Canadian + US crisis context.',
  openGraph: {
    title: 'ADHD Systems Hub | Body Signals',
    description:
      '18 tactical systems and 6 recommended tools for ADHD brains — rated by difficulty and impact, with hand-authored evidence grades.',
  },
};

export default function ADHDHubPage() {
  return (
    <div className="w-full bg-slate-900 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full text-amber-400 text-sm mb-6">
            <Brain className="w-4 h-4" />
            <span>
              {adhdSystems.length} tactical systems + {adhdTools.length} tools
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-50 mb-4">
            ADHD Systems Hub
          </h1>
          <p className="text-xl text-slate-400">
            Tactical systems and tools for ADHD brains — rated by difficulty (how much effort to adopt) and impact (how much it helps). Evidence ratings are hand-authored per system and shown as a secondary signal.
          </p>
        </div>

        {/* Bidirectional cross-link to the condition page — ABOVE the library grid */}
        <Link
          href="/conditions/adhd"
          className="group block mb-8 bg-gradient-to-br from-amber-500/10 to-amber-500/5 border border-amber-500/30 rounded-xl p-6 hover:border-amber-500/60 hover:from-amber-500/15 transition-all"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-4 flex-1">
              <div className="shrink-0 w-12 h-12 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center">
                <Info className="w-6 h-6 text-amber-400" />
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-bold text-slate-50 mb-1 group-hover:text-amber-300 transition-colors">
                  Looking for clinical info on ADHD?
                </h2>
                <p className="text-sm text-slate-300 leading-relaxed">
                  See the Condition page for diagnosis criteria, medication options, comorbidities, and professional treatment pathways.
                </p>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-amber-400 shrink-0 mt-3 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        {/* ADHD rating note callout — explains why difficulty/impact are primary */}
        <div className="mb-10 bg-slate-800/50 border border-slate-700 rounded-xl p-5">
          <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wide mb-2 flex items-center gap-2">
            <Info className="w-4 h-4 text-slate-400" />
            How we rate these systems
          </h3>
          <p className="text-sm text-slate-400 leading-relaxed">
            {ADHD_RATING_NOTE}
          </p>
        </div>

        {/* Library — systems grid with filters */}
        <ADHDLibrary systems={adhdSystems} />

        {/* Recommended Tools section */}
        <section className="mt-16">
          <div className="mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-50 mb-2">
              Recommended Tools
            </h2>
            <p className="text-slate-400">
              Apps and products that pair well with the systems above. These are opinionated recommendations, not sponsored listings.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {adhdTools.map((tool) => (
              <ADHDToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </section>

        {/* Find an ADHD-informed therapist CTA */}
        <section className="mt-16">
          <Link
            href="/providers?specialty=adhd"
            className="group block bg-slate-800 border border-slate-700 rounded-xl p-6 hover:border-slate-600 transition-all"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-4 flex-1">
                <div className="shrink-0 w-12 h-12 rounded-lg bg-slate-700 flex items-center justify-center">
                  <UserCheck className="w-6 h-6 text-amber-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-slate-50 mb-1 group-hover:text-amber-400 transition-colors">
                    Find an ADHD-informed therapist
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    Tactical systems help with day-to-day function, but they are not a substitute for professional support — especially if ADHD is untreated or comorbid with anxiety or depression.
                  </p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-slate-500 shrink-0 mt-3 group-hover:translate-x-1 group-hover:text-amber-400 transition-all" />
            </div>
          </Link>
        </section>
      </div>
    </div>
  );
}
