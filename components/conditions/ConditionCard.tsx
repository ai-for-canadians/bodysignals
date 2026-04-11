import Link from 'next/link';
import { Stethoscope, Activity } from 'lucide-react';
import type { Condition } from '@/types';
import { EvidenceBadge } from '@/components/ui';
import { CATEGORY_LABELS } from '@/lib/data/conditions';

interface ConditionCardProps {
  condition: Condition;
}

export function ConditionCard({ condition }: ConditionCardProps) {
  const interventionCount = condition.interventions.length;
  const symptomCount = condition.symptoms.length;

  return (
    <Link
      href={`/conditions/${condition.slug}`}
      className="group flex flex-col bg-slate-800 border border-slate-700 rounded-xl p-6 hover:border-slate-600 transition-all hover:bg-slate-750"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <h3 className="text-xl font-semibold text-slate-50 group-hover:text-amber-400 transition-colors">
          {condition.name}
        </h3>
        <EvidenceBadge rating={condition.evidenceRating} showLabel={false} />
      </div>

      <div className="mb-3">
        <span className="inline-flex items-center text-xs font-medium px-2 py-0.5 rounded bg-slate-700 text-slate-300">
          {CATEGORY_LABELS[condition.category]}
        </span>
      </div>

      <p className="text-slate-300 text-sm line-clamp-1 mb-2">
        {condition.tagline}
      </p>

      <p className="text-slate-400 text-sm line-clamp-2 mb-4 flex-grow">
        {condition.summary}
      </p>

      <div className="flex items-center gap-4 text-xs text-slate-500 pt-3 border-t border-slate-700/60">
        <span className="flex items-center gap-1">
          <Stethoscope className="w-4 h-4" />
          {interventionCount} {interventionCount === 1 ? 'intervention' : 'interventions'}
        </span>
        {symptomCount > 0 && (
          <span className="flex items-center gap-1">
            <Activity className="w-4 h-4" />
            {symptomCount} {symptomCount === 1 ? 'symptom' : 'symptoms'}
          </span>
        )}
      </div>
    </Link>
  );
}
