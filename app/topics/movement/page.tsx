import type { Metadata } from 'next';
import { Activity, AlertTriangle } from 'lucide-react';
import {
  MOVEMENT_PHYSIO_CALLOUT,
  movementPrograms,
} from '@/lib/data/movement';
import { MovementProgramCard } from '@/components/topics/MovementProgramCard';

export const metadata: Metadata = {
  title: 'Movement RX Hub',
  description:
    'Three physiotherapist-validated rehab programs: jumper\'s knee, low-back pain (McGill Big 3), and shoulder impingement. Evidence-rated with contraindications.',
  openGraph: {
    title: 'Movement RX Hub | Body Signals',
    description:
      'Three physiotherapist-validated rehabilitation programs for common musculoskeletal pain. Evidence-rated with contraindication guidance.',
  },
};

export default function MovementHubPage() {
  return (
    <div className="w-full bg-slate-900 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full text-amber-400 text-sm mb-6">
            <Activity className="w-4 h-4" />
            <span>
              {movementPrograms.length} physiotherapist-validated rehab programs
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-50 mb-4">
            Movement RX Hub
          </h1>
          <p className="text-xl text-slate-400">
            Phased rehabilitation programs for common musculoskeletal pain — jumper&rsquo;s knee, low-back pain, and shoulder impingement. Each program is evidence-rated and includes contraindications, phase-by-phase goals, and exercise protocols.
          </p>
        </div>

        {/* Global "When to see a physiotherapist" callout — ONE instance at hub level */}
        <div className="mb-10 bg-amber-500/5 border border-amber-500/30 rounded-xl p-5">
          <h3 className="text-base font-semibold text-amber-300 mb-2 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-400" />
            When to see a physiotherapist
          </h3>
          <p className="text-sm text-slate-300 leading-relaxed">
            {MOVEMENT_PHYSIO_CALLOUT}
          </p>
        </div>

        {/* 3-card grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {movementPrograms.map((program) => (
            <MovementProgramCard key={program.id} program={program} />
          ))}
        </div>
      </div>
    </div>
  );
}
