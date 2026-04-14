import Link from 'next/link';
import { Activity } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-900 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Activity className="w-8 h-8 text-amber-500" />
              <span className="text-xl font-bold text-slate-50">
                Body<span className="text-amber-500">Signals</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm mb-4">
              Independent research digest summarising peer-reviewed health
              research for Canadian and US readers.
            </p>
            <p className="text-slate-500 text-xs mb-2">
              For informational purposes only. Not medical advice.
            </p>
            <p className="text-slate-500 text-xs">
              Body Signals is independently funded.{' '}
              <Link
                href="/disclosures"
                className="text-amber-500/70 hover:text-amber-400 underline"
              >
                See our commercial disclosures
              </Link>
              .
            </p>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-slate-50 font-semibold mb-4">Explore</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/symptoms"
                  className="text-slate-400 hover:text-amber-500 text-sm transition-colors"
                >
                  Symptoms
                </Link>
              </li>
              <li>
                <Link
                  href="/conditions"
                  className="text-slate-400 hover:text-amber-500 text-sm transition-colors"
                >
                  Conditions
                </Link>
              </li>
              <li>
                <Link
                  href="/topics"
                  className="text-slate-400 hover:text-amber-500 text-sm transition-colors"
                >
                  Topics
                </Link>
              </li>
              <li>
                <Link
                  href="/providers"
                  className="text-slate-400 hover:text-amber-500 text-sm transition-colors"
                >
                  Providers
                </Link>
              </li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="text-slate-50 font-semibold mb-4">About</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-slate-400 hover:text-amber-500 text-sm transition-colors"
                >
                  About Body Signals
                </Link>
              </li>
              <li>
                <Link
                  href="/methodology"
                  className="text-slate-400 hover:text-amber-500 text-sm transition-colors"
                >
                  Methodology
                </Link>
              </li>
              <li>
                <Link
                  href="/editorial"
                  className="text-slate-400 hover:text-amber-500 text-sm transition-colors"
                >
                  Editorial Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-slate-400 hover:text-amber-500 text-sm transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/corrections"
                  className="text-slate-400 hover:text-amber-500 text-sm transition-colors"
                >
                  Corrections
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-slate-50 font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/disclaimer"
                  className="text-slate-400 hover:text-amber-500 text-sm transition-colors"
                >
                  Disclaimer
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-slate-400 hover:text-amber-500 text-sm transition-colors"
                >
                  Terms of Use
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-slate-400 hover:text-amber-500 text-sm transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/disclosures"
                  className="text-slate-400 hover:text-amber-500 text-sm transition-colors"
                >
                  Disclosures
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Research-digest statement + copyright */}
        <div className="border-t border-slate-800 mt-8 pt-8">
          <p className="text-slate-500 text-xs mb-4 max-w-3xl">
            Body Signals is an independent research digest. It summarises
            published, peer-reviewed health research for informational purposes.
            Body Signals is not a healthcare provider, does not practise
            medicine, and does not provide medical advice, diagnosis, or
            treatment. Always consult a qualified healthcare provider.
          </p>
          <p className="text-slate-600 text-xs">
            © {new Date().getFullYear()} BodySignals. For informational purposes
            only. Not medical advice.
          </p>
        </div>
      </div>
    </footer>
  );
}
