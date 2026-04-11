import Link from 'next/link';
import { Clock, ListOrdered } from 'lucide-react';
import type { ADHDSystem } from '@/types';
import { ADHD_CATEGORY_LABELS } from '@/lib/data/adhd';

interface ADHDSystemCardProps {
  system: ADHDSystem;
}

// Slate scale for difficulty — reads as "how much effort will this cost me".
// Deliberately avoids green/red to prevent collision with the EvidenceBadge palette.
const DIFFICULTY_STYLES: Record<ADHDSystem['difficulty'], string> = {
  Easy: 'bg-slate-700 text-slate-200',
  Medium: 'bg-slate-600 text-slate-100',
  Hard: 'bg-slate-500 text-slate-50',
};

// Amber intensity scale for impact — reads as "how much will this help".
const IMPACT_STYLES: Record<ADHDSystem['impact'], string> = {
  Low: 'bg-amber-500/10 text-amber-400/70',
  Medium: 'bg-amber-500/20 text-amber-400',
  High: 'bg-amber-500/30 text-amber-300',
  Critical: 'bg-amber-500 text-slate-900',
};

export function ADHDSystemCard({ system }: ADHDSystemCardProps) {
  return (
    <Link
      href={`/topics/adhd/${system.slug}`}
      className="group flex flex-col bg-slate-800 border border-slate-700 rounded-xl p-6 hover:border-slate-600 transition-all hover:bg-slate-750"
    >
      {/* Header: name + muted evidence chip */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <h3 className="text-xl font-semibold text-slate-50 group-hover:text-amber-400 transition-colors">
          {system.name}
        </h3>
        <span
          title={system.ratingNote ?? 'Evidence rating'}
          className="shrink-0 inline-flex items-center justify-center w-6 h-6 rounded border border-slate-600 bg-slate-900/50 text-xs font-semibold text-slate-400"
          aria-label={`Evidence rating ${system.evidenceRating}`}
        >
          {system.evidenceRating}
        </span>
      </div>

      {/* Category pill */}
      <div className="mb-3">
        <span className="inline-flex items-center text-xs font-medium px-2 py-0.5 rounded bg-slate-700 text-slate-300">
          {ADHD_CATEGORY_LABELS[system.category] ?? system.category}
        </span>
      </div>

      {/* Tagline */}
      <p className="text-slate-300 text-sm line-clamp-1 mb-2">
        {system.tagline}
      </p>

      {/* Description */}
      <p className="text-slate-400 text-sm line-clamp-2 mb-4 flex-grow">
        {system.description}
      </p>

      {/* Difficulty + Impact badges — the primary visual metrics */}
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <span
          className={`inline-flex items-center text-xs font-semibold px-2 py-1 rounded uppercase tracking-wide ${DIFFICULTY_STYLES[system.difficulty]}`}
        >
          {system.difficulty}
        </span>
        <span
          className={`inline-flex items-center text-xs font-semibold px-2 py-1 rounded uppercase tracking-wide ${IMPACT_STYLES[system.impact]}`}
        >
          {system.impact} impact
        </span>
      </div>

      {/* Footer: time-to-implement + step count */}
      <div className="flex items-center justify-between gap-4 text-xs text-slate-500 pt-3 border-t border-slate-700/60">
        <span className="inline-flex items-center gap-1">
          <Clock className="w-3.5 h-3.5" />
          {system.timeToImplement}
        </span>
        <span className="inline-flex items-center gap-1">
          <ListOrdered className="w-3.5 h-3.5" />
          {system.steps.length} step{system.steps.length === 1 ? '' : 's'}
        </span>
      </div>
    </Link>
  );
}
