import type { Metadata } from 'next';
import Link from 'next/link';
import { ClipboardList, Mail, AlertCircle } from 'lucide-react';
import { corrections } from '@/lib/data/corrections';

export const metadata: Metadata = {
  title: 'Corrections',
  description:
    'Corrections log for Body Signals. When we identify errors in our research summaries, we correct them promptly and document the correction here.',
};

const severityColours: Record<string, { text: string; bg: string }> = {
  minor: { text: 'text-green-400', bg: 'bg-green-500/20' },
  moderate: { text: 'text-amber-400', bg: 'bg-amber-500/20' },
  significant: { text: 'text-red-400', bg: 'bg-red-500/20' },
};

export default function CorrectionsPage() {
  return (
    <div className="w-full py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-2">
          <ClipboardList className="w-10 h-10 text-amber-500" />
          <h1 className="text-4xl md:text-5xl font-bold text-slate-50">
            Corrections
          </h1>
        </div>
        <p className="text-slate-400 mb-10">Last reviewed: 2026-04-13</p>

        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 mb-8">
          <p className="text-slate-300 leading-relaxed">
            Body Signals is committed to accuracy. When we identify errors in
            our research summaries, we correct them promptly and document the
            correction here. Transparency about errors is central to our
            editorial integrity. For details on how we categorise and handle
            corrections, see our{' '}
            <Link
              href="/editorial"
              className="text-amber-500 hover:text-amber-400 underline"
            >
              Editorial Policy
            </Link>
            .
          </p>
        </div>

        {corrections.length === 0 ? (
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-8 text-centre">
            <div className="flex flex-col items-center gap-4">
              <AlertCircle className="w-12 h-12 text-slate-500" />
              <p className="text-slate-400 text-centre max-w-lg">
                No corrections have been issued since launch. If you believe
                you have found an error, please contact us at{' '}
                <a
                  href="mailto:editorial@bodysignals.org"
                  className="text-amber-500 hover:text-amber-400 underline"
                >
                  editorial@bodysignals.org
                </a>{' '}
                or via our{' '}
                <Link
                  href="/contact"
                  className="text-amber-500 hover:text-amber-400 underline"
                >
                  contact page
                </Link>
                .
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {corrections.map((correction) => {
              const severity =
                severityColours[correction.severity] ?? severityColours.minor;
              return (
                <div
                  key={correction.id}
                  className="bg-slate-800 border border-slate-700 rounded-lg p-6"
                >
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <time className="text-slate-400 text-sm">
                      {correction.date}
                    </time>
                    <span
                      className={`${severity.bg} ${severity.text} px-2 py-0.5 rounded text-xs font-bold uppercase`}
                    >
                      {correction.severity}
                    </span>
                    <span className="text-slate-300 text-sm">
                      Page:{' '}
                      <Link
                        href={`/${correction.pageSlug}`}
                        className="text-amber-500 hover:text-amber-400 underline"
                      >
                        {correction.pageTitle}
                      </Link>
                    </span>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-slate-500 uppercase tracking-wide mb-1">
                        Original
                      </p>
                      <p className="text-slate-400 line-through text-sm">
                        {correction.originalText}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500 uppercase tracking-wide mb-1">
                        Corrected
                      </p>
                      <p className="text-slate-300 text-sm">
                        {correction.correctedText}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500 uppercase tracking-wide mb-1">
                        Reason
                      </p>
                      <p className="text-slate-400 text-sm">
                        {correction.reason}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="mt-12 bg-slate-800 border border-slate-700 rounded-lg p-6">
          <p className="text-slate-400 text-sm flex items-center gap-2">
            <Mail className="w-4 h-4 text-amber-500" />
            Found an error? Contact us at{' '}
            <a
              href="mailto:editorial@bodysignals.org"
              className="text-amber-500 hover:text-amber-400 underline"
            >
              editorial@bodysignals.org
            </a>{' '}
            or visit our{' '}
            <Link
              href="/contact"
              className="text-amber-500 hover:text-amber-400 underline"
            >
              contact page
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
