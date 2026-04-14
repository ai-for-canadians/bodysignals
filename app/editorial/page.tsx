import type { Metadata } from 'next';
import Link from 'next/link';
import { BookOpen, Mail, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Editorial Policy',
  description:
    'Editorial policy for Body Signals. Our source hierarchy, editorial independence, evidence rating methodology, and corrections process.',
};

export default function EditorialPage() {
  return (
    <div className="w-full py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-2">
          <BookOpen className="w-10 h-10 text-amber-500" />
          <h1 className="text-4xl md:text-5xl font-bold text-slate-50">
            Editorial Policy
          </h1>
        </div>
        <p className="text-slate-400 mb-10">Last reviewed: 2026-04-13</p>

        <div className="space-y-8">
          {/* 1. What We Are */}
          <section>
            <h2 className="text-2xl font-bold mb-3 text-slate-50">
              <span className="text-amber-500 mr-2">1.</span>
              What We Are
            </h2>
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
              <p className="text-slate-300 leading-relaxed">
                Body Signals is an independent research digest and publisher. We
                summarise published, peer-reviewed health research in plain
                language for Canadian and US readers. Our goal is to make the
                current state of health research accessible to a general
                audience \u2014 without sensationalism, without commercial bias, and
                without overstating what the evidence supports.
              </p>
            </div>
          </section>

          {/* 2. What We Are Not */}
          <section>
            <h2 className="text-2xl font-bold mb-3 text-slate-50">
              <span className="text-amber-500 mr-2">2.</span>
              What We Are Not
            </h2>
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-6">
              <p className="text-amber-200 leading-relaxed mb-4">
                Body Signals is <strong>not</strong> a healthcare provider. We
                are <strong>not</strong> a telehealth service. We are{' '}
                <strong>not</strong> a medical education institution. We are{' '}
                <strong>not</strong> a pharmacy, a supplement retailer, or a
                wellness brand.
              </p>
              <p className="text-amber-200 leading-relaxed">
                We do not diagnose conditions, prescribe treatments, or offer
                personalised health guidance. We are a publisher that reports on
                what published research has found. For full details on this
                distinction, see our{' '}
                <Link
                  href="/disclaimer"
                  className="text-amber-400 hover:text-amber-300 underline"
                >
                  Disclaimer
                </Link>
                .
              </p>
            </div>
          </section>

          {/* 3. Source Hierarchy */}
          <section>
            <h2 className="text-2xl font-bold mb-3 text-slate-50">
              <span className="text-amber-500 mr-2">3.</span>
              Source Hierarchy
            </h2>
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
              <p className="text-slate-300 leading-relaxed mb-4">
                We prioritise sources in the following order when summarising
                research. Higher-ranked sources carry more weight in our
                editorial judgements and evidence ratings:
              </p>
              <ol className="space-y-3">
                {[
                  {
                    rank: 1,
                    source: 'Peer-reviewed journals',
                    detail:
                      'Published meta-analyses, systematic reviews, and randomised controlled trials in indexed journals.',
                  },
                  {
                    rank: 2,
                    source: 'Clinical practice guidelines',
                    detail:
                      'Evidence-based guidelines from professional medical bodies (e.g., AHA, CPA, NICE).',
                  },
                  {
                    rank: 3,
                    source: 'Recognised medical organisations',
                    detail:
                      'Position statements and consensus documents from established specialty organisations.',
                  },
                  {
                    rank: 4,
                    source: 'Government health agencies',
                    detail:
                      'Health Canada, NIH, CDC, FDA, and equivalent bodies in other jurisdictions.',
                  },
                  {
                    rank: 5,
                    source: 'Expert consensus',
                    detail:
                      'Where rigorous trial data is lacking, documented expert consensus may be cited with appropriate caveats.',
                  },
                ].map((item) => (
                  <li key={item.rank} className="flex gap-4 items-start">
                    <span className="bg-amber-500/20 text-amber-400 px-3 py-1 rounded text-sm font-bold shrink-0">
                      {item.rank}
                    </span>
                    <div>
                      <strong className="text-slate-100">{item.source}</strong>
                      <p className="text-slate-400 text-sm mt-1">
                        {item.detail}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          {/* 4. Evidence Rating Methodology */}
          <section>
            <h2 className="text-2xl font-bold mb-3 text-slate-50">
              <span className="text-amber-500 mr-2">4.</span>
              Evidence Rating Methodology
            </h2>
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
              <p className="text-slate-300 leading-relaxed mb-4">
                Every health claim on Body Signals carries an A\u2013F evidence
                rating. These ratings reflect our editorial judgement about the
                quality, consistency, and volume of published research supporting
                a given claim. They are not clinical endorsements or treatment
                recommendations.
              </p>
              <p className="text-slate-300 leading-relaxed">
                For a detailed breakdown of each grade, criteria, examples, and
                limitations, see our{' '}
                <Link
                  href="/methodology"
                  className="text-amber-500 hover:text-amber-400 underline"
                >
                  Methodology
                </Link>{' '}
                page.
              </p>
            </div>
          </section>

          {/* 5. Editorial Independence */}
          <section>
            <h2 className="text-2xl font-bold mb-3 text-slate-50">
              <span className="text-amber-500 mr-2">5.</span>
              Editorial Independence
            </h2>
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-6 h-6 text-amber-500 mt-1 shrink-0" />
                <div>
                  <p className="text-slate-300 leading-relaxed mb-4">
                    No commercial relationship influences our research summaries
                    or evidence ratings. Body Signals does not accept payment
                    from pharmaceutical companies, supplement manufacturers,
                    device makers, or any other commercial entity in exchange for
                    favourable coverage or ratings.
                  </p>
                  <p className="text-slate-300 leading-relaxed">
                    Our revenue model does not depend on promoting specific
                    products or services. If this ever changes, we will disclose
                    any commercial relationships transparently on this page and
                    on affected content.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 6. Corrections Policy */}
          <section>
            <h2 className="text-2xl font-bold mb-3 text-slate-50">
              <span className="text-amber-500 mr-2">6.</span>
              Corrections Policy
            </h2>
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
              <p className="text-slate-300 leading-relaxed mb-4">
                We take accuracy seriously. When we identify errors in our
                research summaries \u2014 whether factual inaccuracies, outdated
                information, or misrepresentations of published research \u2014 we
                correct them promptly and document the correction in our public{' '}
                <Link
                  href="/corrections"
                  className="text-amber-500 hover:text-amber-400 underline"
                >
                  Corrections Log
                </Link>
                .
              </p>
              <p className="text-slate-300 leading-relaxed mb-4">
                Corrections are categorised by severity:
              </p>
              <ul className="space-y-2 text-slate-300">
                <li>
                  <strong className="text-slate-100">Minor:</strong>{' '}
                  Typographical errors, formatting issues, or clarifications
                  that do not change the substance of a research summary.
                </li>
                <li>
                  <strong className="text-slate-100">Moderate:</strong>{' '}
                  Factual errors or omissions that affect the completeness of a
                  research summary but do not change the overall evidence
                  rating.
                </li>
                <li>
                  <strong className="text-slate-100">Significant:</strong>{' '}
                  Errors that result in a change to an evidence rating or
                  materially alter the interpretation of a research summary.
                </li>
              </ul>
            </div>
          </section>

          {/* 7. Author and Review Process */}
          <section>
            <h2 className="text-2xl font-bold mb-3 text-slate-50">
              <span className="text-amber-500 mr-2">7.</span>
              Author and Review Process
            </h2>
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
              <p className="text-slate-300 leading-relaxed mb-4">
                All research summaries on Body Signals follow a structured
                editorial process:
              </p>
              <ol className="list-decimal list-inside space-y-2 text-slate-300">
                <li>
                  <strong className="text-slate-100">Source identification:</strong>{' '}
                  Primary research sources are identified and evaluated against
                  our source hierarchy.
                </li>
                <li>
                  <strong className="text-slate-100">Drafting:</strong>{' '}
                  Research is summarised in plain language with careful attention
                  to avoiding overstatement or understatement of findings.
                </li>
                <li>
                  <strong className="text-slate-100">Evidence rating:</strong>{' '}
                  An A\u2013F rating is assigned based on the criteria described in
                  our Methodology page.
                </li>
                <li>
                  <strong className="text-slate-100">Editorial review:</strong>{' '}
                  Summaries are reviewed for accuracy, balance, clarity, and
                  appropriate caveats before publication.
                </li>
                <li>
                  <strong className="text-slate-100">Ongoing monitoring:</strong>{' '}
                  Published summaries are periodically reviewed and updated as
                  new research emerges.
                </li>
              </ol>
            </div>
          </section>

          {/* 8. Conflicts of Interest */}
          <section>
            <h2 className="text-2xl font-bold mb-3 text-slate-50">
              <span className="text-amber-500 mr-2">8.</span>
              Conflicts of Interest
            </h2>
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
              <p className="text-slate-300 leading-relaxed mb-4">
                At present, Body Signals has no commercial relationships,
                sponsorships, or financial conflicts of interest that could
                influence our editorial content or evidence ratings.
              </p>
              <p className="text-slate-300 leading-relaxed">
                We are committed to disclosing any conflicts of interest that
                may arise in the future. If any editor or contributor has a
                relevant conflict, it will be disclosed on the affected content
                and documented here. For a full accounting of our current
                commercial relationships (if any), see our{' '}
                <Link
                  href="/disclosures"
                  className="text-amber-500 hover:text-amber-400 underline"
                >
                  Disclosures
                </Link>{' '}
                page.
              </p>
            </div>
          </section>

          {/* 9. Content Updates */}
          <section>
            <h2 className="text-2xl font-bold mb-3 text-slate-50">
              <span className="text-amber-500 mr-2">9.</span>
              Content Updates
            </h2>
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
              <p className="text-slate-300 leading-relaxed mb-4">
                Research summaries are reviewed and updated on a rolling basis.
                Each summary displays a &quot;last updated&quot; date so readers can
                assess currency. Updates are triggered by:
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-300">
                <li>
                  Publication of significant new research (e.g., large RCTs,
                  updated meta-analyses, revised clinical guidelines)
                </li>
                <li>
                  Identification of errors through our corrections process
                </li>
                <li>
                  Reader feedback that highlights gaps or inaccuracies
                </li>
                <li>
                  Periodic scheduled reviews of high-traffic or high-impact
                  content
                </li>
              </ul>
            </div>
          </section>

          {/* 10. Canadian and US Context */}
          <section>
            <h2 className="text-2xl font-bold mb-3 text-slate-50">
              <span className="text-amber-500 mr-2">10.</span>
              Canadian and US Context
            </h2>
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
              <p className="text-slate-300 leading-relaxed mb-4">
                Body Signals serves readers in both Canada and the United
                States. These are treated as co-equal jurisdictions throughout
                our content. Where clinical guidelines, regulatory approvals,
                or healthcare system structures differ between the two
                countries, we note the differences.
              </p>
              <p className="text-slate-300 leading-relaxed">
                We use Canadian English spelling conventions (e.g., colour,
                behaviour, centre) throughout the site, consistent with our
                Canadian editorial base, while ensuring content is accessible
                and relevant to US readers.
              </p>
            </div>
          </section>

          {/* 11. Contact */}
          <section>
            <h2 className="text-2xl font-bold mb-3 text-slate-50">
              <span className="text-amber-500 mr-2">11.</span>
              Contact
            </h2>
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
              <p className="text-slate-300 leading-relaxed">
                For editorial inquiries, correction reports, or questions about
                our editorial process, please contact us at{' '}
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
          </section>

          {/* 12. Advertising and Sponsorship */}
          <section>
            <h2 className="text-2xl font-bold mb-3 text-slate-50">
              <span className="text-amber-500 mr-2">12.</span>
              Advertising and Sponsorship
            </h2>
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
              <p className="text-slate-300 leading-relaxed mb-4">
                Body Signals does not accept sponsored content, native
                advertising, pharmaceutical advertising, or supplement brand
                partnerships. We will never publish content that is written,
                reviewed, or influenced by a commercial partner.
              </p>
              <p className="text-slate-300 leading-relaxed mb-4">
                Where Body Signals links to external health services (e.g.,
                telehealth platforms, booking tools, or laboratory providers),
                these links may carry affiliate or referral relationships. All
                such relationships are disclosed at the point of the link and
                on our{' '}
                <Link
                  href="/disclosures"
                  className="text-amber-500 hover:text-amber-400 underline"
                >
                  Disclosures
                </Link>{' '}
                page. Commercial relationships are maintained under a strict
                editorial firewall:
              </p>
              <ul className="space-y-2 text-slate-300 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 mt-0.5">&bull;</span>
                  <span>
                    Partners cannot influence evidence ratings, content
                    placement, or editorial conclusions.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 mt-0.5">&bull;</span>
                  <span>
                    If a partner&apos;s evidence quality drops or a conflict of
                    interest is identified, the relationship is terminated and
                    the event is logged.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 mt-0.5">&bull;</span>
                  <span>
                    At least one published correction must go against a
                    would-be commercial interest before any paid partnership
                    is activated.
                  </span>
                </li>
              </ul>
            </div>
          </section>
        </div>

        <div className="mt-12 bg-slate-800 border border-slate-700 rounded-lg p-6">
          <p className="text-slate-400 text-sm flex items-center gap-2">
            <Mail className="w-4 h-4 text-amber-500" />
            Editorial inquiries:{' '}
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
