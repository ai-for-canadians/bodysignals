import type { Metadata } from 'next';
import Link from 'next/link';
import { Eye, Mail, ShieldCheck } from 'lucide-react';
import {
  getCommercialPartners,
  getEditorialPartners,
} from '@/lib/data/referrals';

export const metadata: Metadata = {
  title: 'Disclosures',
  description:
    'Commercial relationship disclosures for Body Signals. Full transparency about our funding, partnerships, and editorial independence.',
};

export default function DisclosuresPage() {
  const commercialPartners = getCommercialPartners();
  const editorialPartners = getEditorialPartners();

  return (
    <div className="w-full py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-2">
          <Eye className="w-10 h-10 text-amber-500" />
          <h1 className="text-4xl md:text-5xl font-bold text-slate-50">
            Disclosures
          </h1>
        </div>
        <p className="text-slate-400 mb-10">Last reviewed: 2026-04-13</p>

        <div className="space-y-8">
          {/* 1. What This Page Covers */}
          <section>
            <h2 className="text-2xl font-bold mb-3 text-slate-50">
              <span className="text-amber-500 mr-2">1.</span>
              What This Page Covers
            </h2>
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
              <p className="text-slate-300 leading-relaxed">
                This page provides full transparency about Body Signals&apos;
                commercial relationships, funding sources, and editorial
                independence. We believe readers deserve to know whether any
                financial relationship exists between this site and the services
                we mention. This page is updated whenever a commercial
                relationship is established, modified, or terminated.
              </p>
            </div>
          </section>

          {/* 2. Active Commercial Relationships */}
          <section>
            <h2 className="text-2xl font-bold mb-3 text-slate-50">
              <span className="text-amber-500 mr-2">2.</span>
              Active Commercial Relationships
            </h2>
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
              {commercialPartners.length === 0 ? (
                <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-6 text-centre">
                  <p className="text-slate-300 leading-relaxed">
                    Body Signals currently has{' '}
                    <strong className="text-slate-100">
                      no commercial relationships
                    </strong>
                    . We do not receive compensation from any healthcare
                    provider, pharmaceutical company, supplement manufacturer,
                    device maker, or other commercial entity.
                  </p>
                  <p className="text-slate-400 text-sm mt-3">
                    When commercial relationships are established in the future,
                    they will be listed here with the partner name, relationship
                    type, and effective date.
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-slate-700">
                        <th className="text-left text-slate-400 py-2 pr-4">
                          Partner
                        </th>
                        <th className="text-left text-slate-400 py-2 pr-4">
                          Relationship
                        </th>
                        <th className="text-left text-slate-400 py-2 pr-4">
                          Category
                        </th>
                        <th className="text-left text-slate-400 py-2">
                          Last Reviewed
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {commercialPartners.map((partner) => (
                        <tr
                          key={partner.id}
                          className="border-b border-slate-700/50"
                        >
                          <td className="py-3 pr-4 text-slate-100">
                            {partner.name}
                          </td>
                          <td className="py-3 pr-4 text-slate-300 capitalize">
                            {partner.commercialRelationship.replace(/_/g, ' ')}
                          </td>
                          <td className="py-3 pr-4 text-slate-300 capitalize">
                            {partner.category.replace(/_/g, ' ')}
                          </td>
                          <td className="py-3 text-slate-400">
                            {partner.lastReviewed}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </section>

          {/* 3. Non-Commercial Links */}
          <section>
            <h2 className="text-2xl font-bold mb-3 text-slate-50">
              <span className="text-amber-500 mr-2">3.</span>
              Non-Commercial Links
            </h2>
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
              <p className="text-slate-300 leading-relaxed mb-4">
                Body Signals occasionally links to external health services as
                editorial resources for readers. These links are included based
                on editorial judgement about their relevance and quality \u2014 not
                because of any financial arrangement. We receive no compensation
                for these links.
              </p>
              {editorialPartners.length > 0 && (
                <div className="mt-4 space-y-2">
                  <p className="text-slate-400 text-sm font-semibold uppercase tracking-wider">
                    Current editorial mentions
                  </p>
                  <ul className="space-y-1">
                    {editorialPartners.map((partner) => (
                      <li
                        key={partner.id}
                        className="text-slate-300 text-sm flex items-start gap-2"
                      >
                        <span className="text-amber-500 mt-1">\u2022</span>
                        <span>
                          <strong className="text-slate-100">
                            {partner.name}
                          </strong>{' '}
                          \u2014 {partner.description}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </section>

          {/* 4. Editorial Firewall */}
          <section>
            <h2 className="text-2xl font-bold mb-3 text-slate-50">
              <span className="text-amber-500 mr-2">4.</span>
              Editorial Firewall
            </h2>
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-6 h-6 text-amber-500 mt-1 shrink-0" />
                <div>
                  <p className="text-slate-300 leading-relaxed mb-4">
                    Editorial decisions at Body Signals are never influenced by
                    commercial relationships. Our evidence ratings, research
                    summaries, and editorial judgements are made independently of
                    any financial consideration. Specifically:
                  </p>
                  <ul className="space-y-2 text-slate-300 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-amber-500 mt-0.5">\u2022</span>
                      <span>
                        Evidence ratings are assigned based on published research
                        quality, not commercial relationships.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-500 mt-0.5">\u2022</span>
                      <span>
                        No partner has editorial input into our research
                        summaries or content.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-500 mt-0.5">\u2022</span>
                      <span>
                        Commercial partners cannot request changes to evidence
                        ratings, content placement, or editorial conclusions.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-500 mt-0.5">\u2022</span>
                      <span>
                        If a commercial relationship ever conflicts with our
                        editorial standards, we will terminate the relationship.
                        These events are documented in our{' '}
                        <Link
                          href="/corrections"
                          className="text-amber-500 hover:text-amber-400 underline"
                        >
                          Corrections Log
                        </Link>
                        .
                      </span>
                    </li>
                  </ul>
                  <p className="text-slate-300 leading-relaxed mt-4">
                    For more details on our editorial standards, see our{' '}
                    <Link
                      href="/editorial"
                      className="text-amber-500 hover:text-amber-400 underline"
                    >
                      Editorial Policy
                    </Link>
                    .
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 5. How to Report Concerns */}
          <section>
            <h2 className="text-2xl font-bold mb-3 text-slate-50">
              <span className="text-amber-500 mr-2">5.</span>
              How to Report Concerns
            </h2>
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
              <p className="text-slate-300 leading-relaxed mb-4">
                If you believe a commercial relationship has influenced our
                editorial content, or if you have concerns about any
                relationship listed on this page, please contact us. We take
                editorial integrity seriously and will investigate all reports.
              </p>
              <p className="text-slate-300 leading-relaxed">
                You can report concerns through our{' '}
                <Link
                  href="/corrections"
                  className="text-amber-500 hover:text-amber-400 underline"
                >
                  Corrections page
                </Link>{' '}
                or by emailing{' '}
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
        </div>

        <div className="mt-12 bg-slate-800 border border-slate-700 rounded-lg p-6">
          <p className="text-slate-400 text-sm flex items-center gap-2">
            <Mail className="w-4 h-4 text-amber-500" />
            Questions about our disclosures?{' '}
            <a
              href="mailto:editorial@bodysignals.org"
              className="text-amber-500 hover:text-amber-400 underline"
            >
              editorial@bodysignals.org
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
