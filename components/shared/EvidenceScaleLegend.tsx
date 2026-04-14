'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, Info } from 'lucide-react';
import Link from 'next/link';
import { EVIDENCE_TIERS } from '@/lib/data/evidence-tiers';

export function EvidenceScaleLegend() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-lg overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-slate-800/80 transition-colors"
      >
        <span className="flex items-center gap-2 text-sm text-slate-300">
          <Info className="w-4 h-4 text-amber-500" />
          How we rate evidence (A–F scale)
        </span>
        {expanded ? (
          <ChevronUp className="w-4 h-4 text-slate-400" />
        ) : (
          <ChevronDown className="w-4 h-4 text-slate-400" />
        )}
      </button>

      {expanded && (
        <div className="px-4 pb-4 space-y-2">
          <p className="text-xs text-slate-400 mb-3">
            These grades are editorial judgments about research quality — not
            clinical endorsements.{' '}
            <Link
              href="/methodology"
              className="text-amber-400 hover:text-amber-300 underline"
            >
              Full methodology
            </Link>
          </p>
          {EVIDENCE_TIERS.map((tier) => (
            <div key={tier.grade} className="flex items-start gap-3">
              <span
                className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold shrink-0 ${tier.bgColour} ${tier.colour}`}
              >
                {tier.grade}
              </span>
              <div>
                <span className={`text-sm font-medium ${tier.colour}`}>
                  {tier.label}
                </span>
                <p className="text-xs text-slate-400">{tier.criteria}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
