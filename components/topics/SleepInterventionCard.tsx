import Link from 'next/link';
import { Shield } from 'lucide-react';
import type { SleepIntervention } from '@/types';
import { EvidenceBadge } from '@/components/ui';
import { SLEEP_CATEGORY_LABELS } from '@/lib/data/sleep';

interface SleepInterventionCardProps {
  intervention: SleepIntervention;
}

const RISK_LEVEL_STYLES: Record<
  SleepIntervention['safetyProfile']['riskLevel'],
  string
> = {
  'very low': 'bg-emerald-500/10 text-emerald-400',
  low: 'bg-emerald-500/10 text-emerald-400',
  moderate: 'bg-amber-500/20 text-amber-400',
  high: 'bg-red-500/20 text-red-400',
};

export function SleepInterventionCard({
  intervention,
}: SleepInterventionCardProps) {
  return (
    <Link
      href={`/topics/sleep/${intervention.slug}`}
      className="group flex flex-col bg-slate-800 border border-slate-700 rounded-xl p-6 hover:border-slate-600 transition-all hover:bg-slate-750"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <h3 className="text-xl font-semibold text-slate-50 group-hover:text-amber-400 transition-colors">
          {intervention.name}
        </h3>
        <EvidenceBadge rating={intervention.evidenceRating} showLabel={false} />
      </div>

      <div className="mb-3">
        <span className="inline-flex items-center text-xs font-medium px-2 py-0.5 rounded bg-slate-700 text-slate-300">
          {SLEEP_CATEGORY_LABELS[intervention.category]}
        </span>
      </div>

      <p className="text-slate-300 text-sm line-clamp-1 mb-2">
        {intervention.tagline}
      </p>

      <p className="text-slate-400 text-sm line-clamp-2 mb-4 flex-grow">
        {intervention.description}
      </p>

      <div className="flex items-center gap-4 text-xs text-slate-500 pt-3 border-t border-slate-700/60">
        <span className="inline-flex items-center gap-1">
          <Shield className="w-4 h-4" />
          <span className={`px-2 py-0.5 rounded ${RISK_LEVEL_STYLES[intervention.safetyProfile.riskLevel]}`}>
            {intervention.safetyProfile.riskLevel} risk
          </span>
        </span>
      </div>
    </Link>
  );
}
