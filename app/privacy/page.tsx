import type { Metadata } from 'next';
import Link from 'next/link';
import { Shield, Mail } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'Privacy policy for Body Signals. PIPEDA-compliant. We collect nothing by default \u2014 no accounts, no login, no tracking cookies.',
};

export default function PrivacyPage() {
  return (
    <div className="w-full py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-2">
          <Shield className="w-10 h-10 text-amber-500" />
          <h1 className="text-4xl md:text-5xl font-bold text-slate-50">
            Privacy Policy
          </h1>
        </div>
        <p className="text-slate-400 mb-10">Last reviewed: 2026-04-13</p>

        <div className="space-y-8">
          {/* 1. Introduction */}
          <section>
            <h2 className="text-2xl font-bold mb-3 text-slate-50">
              <span className="text-amber-500 mr-2">1.</span>
              Introduction
            </h2>
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
              <p className="text-slate-300 leading-relaxed">
                Body Signals is an independent research digest and publisher
                based in Ontario, Canada. We summarise published, peer-reviewed
                health research in plain language for Canadian and US readers. We
                are not a healthcare provider and do not provide medical advice.
                This Privacy Policy explains how we handle information when you
                visit our website. Our guiding principle is simple:{' '}
                <strong className="text-slate-100">
                  we collect nothing by default
                </strong>
                .
              </p>
            </div>
          </section>

          {/* 2. Information We Collect */}
          <section>
            <h2 className="text-2xl font-bold mb-3 text-slate-50">
              <span className="text-amber-500 mr-2">2.</span>
              Information We Collect
            </h2>
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
              <p className="text-slate-300 leading-relaxed mb-4">
                Body Signals does not collect personal information by default.
                There is no account creation, no login, no registration, and no
                cookies beyond functional necessities. We do not require you to
                provide any personal data to read our research summaries.
              </p>
              <p className="text-slate-300 leading-relaxed">
                We do not sell, rent, trade, or otherwise share personal
                information with third parties for commercial purposes. We do
                not use advertising networks or data brokers.
              </p>
            </div>
          </section>

          {/* 3. Feedback Widget */}
          <section>
            <h2 className="text-2xl font-bold mb-3 text-slate-50">
              <span className="text-amber-500 mr-2">3.</span>
              Feedback Widget
            </h2>
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
              <p className="text-slate-300 leading-relaxed mb-4">
                Our site includes an optional feedback widget that allows you to
                submit comments, suggestions, or correction reports. If you
                choose to use this widget, you may voluntarily provide:
              </p>
              <ul className="list-disc list-inside text-slate-300 space-y-2 mb-4">
                <li>Your feedback text</li>
                <li>The page you were viewing when you submitted feedback</li>
                <li>
                  A contact email address (optional \u2014 only if you choose to
                  provide one)
                </li>
              </ul>
              <p className="text-slate-300 leading-relaxed">
                This information is used solely to improve the accuracy and
                quality of our research summaries. We do not use feedback data
                for marketing purposes.
              </p>
            </div>
          </section>

          {/* 4. Analytics */}
          <section>
            <h2 className="text-2xl font-bold mb-3 text-slate-50">
              <span className="text-amber-500 mr-2">4.</span>
              Analytics
            </h2>
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
              <p className="text-slate-300 leading-relaxed mb-4">
                We use{' '}
                <a
                  href="https://plausible.io/data-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-500 hover:text-amber-400 underline"
                >
                  Plausible Analytics
                </a>
                , a privacy-respecting analytics service that does not use
                cookies, does not track individual users, and is compliant with
                GDPR, PIPEDA, and CCPA by default.
              </p>
              <p className="text-slate-300 leading-relaxed mb-4">
                Plausible collects only aggregate, anonymised data such as page
                view counts, referring domains, and general geographic regions
                (country level). No personal identifiers, IP addresses, or
                device fingerprints are stored. All analytics data is
                aggregated — we cannot identify individual visitors.
              </p>
              <p className="text-slate-300 leading-relaxed">
                Analytics data is used solely to understand which research
                topics are most useful to readers and to improve the Site. For
                full details on how Plausible handles data, see their{' '}
                <a
                  href="https://plausible.io/data-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-500 hover:text-amber-400 underline"
                >
                  data policy
                </a>
                .
              </p>
            </div>
          </section>

          {/* 5. Cookies */}
          <section>
            <h2 className="text-2xl font-bold mb-3 text-slate-50">
              <span className="text-amber-500 mr-2">5.</span>
              Cookies
            </h2>
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
              <p className="text-slate-300 leading-relaxed mb-4">
                Body Signals uses only functional cookies that are strictly
                necessary for the Site to operate. These may include:
              </p>
              <ul className="list-disc list-inside text-slate-300 space-y-2 mb-4">
                <li>
                  Theme or display preference cookies (if applicable)
                </li>
                <li>
                  Session cookies required for basic site functionality
                </li>
              </ul>
              <p className="text-slate-300 leading-relaxed">
                We do not use tracking cookies, advertising cookies, or
                third-party cookies for behavioural profiling. We do not
                participate in cross-site tracking.
              </p>
            </div>
          </section>

          {/* 6. Third-Party Services */}
          <section>
            <h2 className="text-2xl font-bold mb-3 text-slate-50">
              <span className="text-amber-500 mr-2">6.</span>
              Third-Party Services
            </h2>
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
              <p className="text-slate-300 leading-relaxed mb-4">
                The Site is hosted on Vercel. Vercel may process limited
                technical data (such as IP addresses) as part of content delivery.
                Please refer to{' '}
                <a
                  href="https://vercel.com/legal/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-500 hover:text-amber-400 underline"
                >
                  Vercel&apos;s Privacy Policy
                </a>{' '}
                for details on their data handling practices.
              </p>
              <p className="text-slate-300 leading-relaxed">
                We do not use advertising networks, social media tracking
                pixels, or third-party data collection services.
              </p>
            </div>
          </section>

          {/* 7. Children's Privacy */}
          <section>
            <h2 className="text-2xl font-bold mb-3 text-slate-50">
              <span className="text-amber-500 mr-2">7.</span>
              Children&apos;s Privacy
            </h2>
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
              <p className="text-slate-300 leading-relaxed">
                Body Signals is not directed at children under the age of 13. We
                do not knowingly collect personal information from children under
                13. If we become aware that we have inadvertently collected
                information from a child under 13, we will take steps to delete
                that information promptly. If you believe a child under 13 has
                provided us with personal information, please contact us at{' '}
                <a
                  href="mailto:editorial@bodysignals.org"
                  className="text-amber-500 hover:text-amber-400 underline"
                >
                  editorial@bodysignals.org
                </a>
                .
              </p>
            </div>
          </section>

          {/* 8. Data Retention */}
          <section>
            <h2 className="text-2xl font-bold mb-3 text-slate-50">
              <span className="text-amber-500 mr-2">8.</span>
              Data Retention
            </h2>
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
              <p className="text-slate-300 leading-relaxed">
                Because we collect minimal data, our retention obligations are
                limited. Feedback submissions are retained for as long as
                necessary to process and act upon them, after which they are
                deleted. Aggregate analytics data (which contains no personal
                identifiers) may be retained indefinitely for trend analysis. If
                you have provided an email address through the feedback widget
                and wish to have it deleted, contact us at{' '}
                <a
                  href="mailto:editorial@bodysignals.org"
                  className="text-amber-500 hover:text-amber-400 underline"
                >
                  editorial@bodysignals.org
                </a>
                .
              </p>
            </div>
          </section>

          {/* 9. Your Rights */}
          <section>
            <h2 className="text-2xl font-bold mb-3 text-slate-50">
              <span className="text-amber-500 mr-2">9.</span>
              Your Rights Under PIPEDA and Applicable US State Privacy Laws
            </h2>
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-amber-500 mb-2">
                  Canadian Readers (PIPEDA)
                </h3>
                <p className="text-slate-300 leading-relaxed">
                  Under Canada&apos;s Personal Information Protection and Electronic
                  Documents Act (PIPEDA), you have the right to access any
                  personal information we hold about you, request corrections to
                  inaccurate information, and withdraw consent for its
                  collection, use, or disclosure. Because we collect virtually no
                  personal information, these rights are unlikely to be engaged
                  in practice. If you believe we hold personal information about
                  you and wish to exercise these rights, contact us at{' '}
                  <a
                    href="mailto:editorial@bodysignals.org"
                    className="text-amber-500 hover:text-amber-400 underline"
                  >
                    editorial@bodysignals.org
                  </a>
                  .
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-amber-500 mb-2">
                  US Readers
                </h3>
                <p className="text-slate-300 leading-relaxed">
                  Readers in states with comprehensive privacy legislation (such
                  as California&apos;s CCPA/CPRA, Virginia&apos;s CDPA, Colorado&apos;s CPA, and
                  similar laws) may have additional rights, including the right
                  to know what personal information is collected, the right to
                  deletion, and the right to opt out of the sale of personal
                  information. We do not sell personal information. Because we
                  collect virtually no personal data, these rights are unlikely
                  to be engaged. If you have questions, please contact us.
                </p>
              </div>
            </div>
          </section>

          {/* 10. Changes */}
          <section>
            <h2 className="text-2xl font-bold mb-3 text-slate-50">
              <span className="text-amber-500 mr-2">10.</span>
              Changes to This Policy
            </h2>
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
              <p className="text-slate-300 leading-relaxed">
                We may update this Privacy Policy from time to time. Changes
                will be posted on this page with an updated &quot;Last reviewed&quot;
                date. We encourage you to review this policy periodically. Your
                continued use of the Site after changes are posted constitutes
                your acceptance of the revised policy.
              </p>
            </div>
          </section>
        </div>

        <div className="mt-12 bg-slate-800 border border-slate-700 rounded-lg p-6">
          <p className="text-slate-400 text-sm flex items-center gap-2">
            <Mail className="w-4 h-4 text-amber-500" />
            Privacy questions? Contact us at{' '}
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
