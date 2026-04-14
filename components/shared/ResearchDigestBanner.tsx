import Link from 'next/link';
import { BookOpen } from 'lucide-react';

/**
 * Persistent, non-dismissible banner that appears on all health content pages.
 * This is the single highest-leverage legal protection — users see it in context
 * on every condition, symptom, and topic page.
 */
export function ResearchDigestBanner() {
  return (
    <div className="bg-slate-800/50 border-b border-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <p className="text-xs text-slate-400 flex items-center gap-2">
          <BookOpen className="w-3.5 h-3.5 text-amber-500 shrink-0" />
          <span>
            Research digest — not medical advice.{' '}
            <Link
              href="/disclaimer"
              className="text-amber-400/70 hover:text-amber-400 underline underline-offset-2"
            >
              Full disclaimer
            </Link>
            {' · '}
            <Link
              href="/methodology"
              className="text-amber-400/70 hover:text-amber-400 underline underline-offset-2"
            >
              How we rate evidence
            </Link>
          </span>
        </p>
      </div>
    </div>
  );
}
