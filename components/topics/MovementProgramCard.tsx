import Link from 'next/link';
import { Activity, Layers, Wrench } from 'lucide-react';
import type { MovementProgram } from '@/types';
import { EvidenceBadge } from '@/components/ui';

interface MovementProgramCardProps {
  program: MovementProgram;
}

export function MovementProgramCard({ program }: MovementProgramCardProps) {
  const exerciseCount = program.phases.reduce(
    (sum, phase) => sum + phase.exercises.length,
    0
  );

  return (
    <Link
      href={`/topics/movement/${program.slug}`}
      className="group flex flex-col bg-slate-800 border border-slate-700 rounded-xl p-6 hover:border-slate-600 transition-all hover:bg-slate-750"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <h3 className="text-xl font-semibold text-slate-50 group-hover:text-amber-400 transition-colors">
          {program.name}
        </h3>
        <EvidenceBadge rating={program.evidenceRating} showLabel={false} />
      </div>

      <div className="mb-3">
        <span className="inline-flex items-center gap-1.5 text-xs font-medium px-2 py-0.5 rounded bg-slate-700 text-slate-300 uppercase tracking-wide">
          <Activity className="w-3 h-3" />
          {program.bodyPart}
        </span>
      </div>

      <p className="text-slate-300 text-sm line-clamp-1 mb-2">
        {program.tagline}
      </p>

      <p className="text-slate-400 text-sm line-clamp-2 mb-4 flex-grow">
        {program.description}
      </p>

      <div className="flex items-center justify-between gap-4 text-xs text-slate-500 pt-3 border-t border-slate-700/60">
        <span className="inline-flex items-center gap-1">
          <Layers className="w-3.5 h-3.5" />
          {program.phases.length} phase{program.phases.length === 1 ? '' : 's'}
        </span>
        <span className="inline-flex items-center gap-1">
          <Wrench className="w-3.5 h-3.5" />
          {program.equipmentNeeded.length} item
          {program.equipmentNeeded.length === 1 ? '' : 's'}
        </span>
      </div>
    </Link>
  );
}
