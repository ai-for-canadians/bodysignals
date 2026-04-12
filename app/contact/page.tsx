import type { Metadata } from 'next';
import { Mail, AlertTriangle, Clock, FileText } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Report a content error, suggest an improvement, or ask a question about Body Signals.',
  openGraph: {
    title: 'Contact | Body Signals',
    description:
      'Report a content error, suggest an improvement, or ask a question about Body Signals.',
  },
};

export default function ContactPage() {
  return (
    <div className="w-full py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-slate-50">
          Contact
        </h1>

        <div className="space-y-8">
          {/* Content corrections — primary CTA */}
          <section className="bg-slate-800 border border-slate-700 rounded-xl p-6">
            <div className="flex items-start gap-4">
              <div className="shrink-0 w-12 h-12 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center">
                <FileText className="w-6 h-6 text-amber-400" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-slate-50 mb-2">
                  Report a content error
                </h2>
                <p className="text-slate-300 leading-relaxed mb-4">
                  Found an inaccuracy, outdated statistic, or broken link? We take medical-content corrections seriously.
                </p>
                <a
                  href="mailto:corrections@bodysignals.org?subject=Content%20correction%20—%20Body%20Signals"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-900 font-semibold rounded-lg transition-colors"
                >
                  <Mail className="w-5 h-5" />
                  corrections@bodysignals.org
                </a>
              </div>
            </div>
          </section>

          {/* How-to block */}
          <section className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
            <h2 className="text-lg font-bold text-slate-50 mb-4">
              How to report a content error
            </h2>
            <ol className="space-y-3 text-slate-300 text-sm leading-relaxed">
              <li className="flex gap-3">
                <span className="shrink-0 w-7 h-7 rounded-full bg-amber-500/20 text-amber-400 font-bold flex items-center justify-center text-xs">1</span>
                <span>Include the <strong className="text-slate-50">page URL</strong> where you found the issue.</span>
              </li>
              <li className="flex gap-3">
                <span className="shrink-0 w-7 h-7 rounded-full bg-amber-500/20 text-amber-400 font-bold flex items-center justify-center text-xs">2</span>
                <span>Describe <strong className="text-slate-50">what you believe is incorrect</strong> and, if possible, cite a source.</span>
              </li>
              <li className="flex gap-3">
                <span className="shrink-0 w-7 h-7 rounded-full bg-amber-500/20 text-amber-400 font-bold flex items-center justify-center text-xs">3</span>
                <span>We will review and respond within <strong className="text-slate-50">48 hours</strong>.</span>
              </li>
            </ol>
          </section>

          {/* Response time */}
          <section className="flex items-start gap-3 text-sm text-slate-400">
            <Clock className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" />
            <p>
              We respond to medical-content corrections within 48 hours per our{' '}
              <span className="text-slate-300">operational runbook</span>. General feedback and suggestions are reviewed weekly.
            </p>
          </section>

          {/* Emergency disclaimer */}
          <section className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-amber-400 shrink-0 mt-0.5" />
              <div className="text-amber-200 text-sm leading-relaxed">
                <p className="font-semibold mb-1">This is not a medical advice line.</p>
                <p>
                  If you are experiencing a medical emergency, call <strong>911</strong>. If you are in crisis, call or text <strong>988</strong> (Suicide &amp; Crisis Lifeline, Canada and US).
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
