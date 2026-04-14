import type { Source } from '@/types';
import { BookOpen } from 'lucide-react';

interface SourceListProps {
  sources: Source[];
  /** Heading text. Defaults to "Research cited" */
  heading?: string;
  /** Show a "Sources pending" placeholder when the array is empty */
  showPendingState?: boolean;
}

export function SourceList({
  sources,
  heading = 'Research cited',
  showPendingState = true,
}: SourceListProps) {
  if (sources.length === 0 && !showPendingState) return null;

  return (
    <section className="mt-8">
      <h2 className="text-xl font-bold text-slate-50 mb-4 flex items-center gap-2">
        <BookOpen className="w-5 h-5 text-amber-500" />
        {heading}
      </h2>

      {sources.length === 0 ? (
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
          <p className="text-sm text-slate-400 italic">
            Sources for this page are being compiled. Each research summary on
            Body Signals is backed by peer-reviewed literature — source links
            will be added as part of our ongoing editorial review.
          </p>
        </div>
      ) : (
        <ul className="space-y-3">
          {sources.map((src, idx) => (
            <li
              key={idx}
              className="bg-slate-800/50 border border-slate-700 rounded-lg p-4"
            >
              <div className="flex items-start gap-2">
                <span className="text-amber-500 text-sm font-mono mt-0.5">
                  [{idx + 1}]
                </span>
                <div className="flex-1 min-w-0">
                  {src.url ? (
                    <a
                      href={src.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-amber-400 hover:text-amber-300 transition-colors text-sm font-medium"
                    >
                      {src.title}
                    </a>
                  ) : (
                    <span className="text-slate-200 text-sm font-medium">
                      {src.title}
                    </span>
                  )}
                  <div className="flex flex-wrap items-center gap-2 mt-1">
                    {src.authors && (
                      <span className="text-xs text-slate-400">
                        {src.authors}
                      </span>
                    )}
                    {src.year && (
                      <span className="text-xs text-slate-500">
                        ({src.year})
                      </span>
                    )}
                    {src.type && (
                      <span className="text-xs bg-slate-700 text-slate-400 px-2 py-0.5 rounded">
                        {src.type.replace(/_/g, ' ')}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
