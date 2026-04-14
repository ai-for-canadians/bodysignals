import type { Metadata } from 'next';
import Link from 'next/link';
import { FlaskConical, Phone, Mail, AlertTriangle } from 'lucide-react';
import { EVIDENCE_TIERS } from '@/lib/data/evidence-tiers';

export const metadata: Metadata = {
  title: 'Methodology',
  description:
    'How Body Signals assigns evidence ratings. Our A\u2013F scale, source hierarchy, editorial process, limitations, and commitment to transparency.',
};

const sourceHierarchy = [
  {
    rank: 1,
    type: 'Meta-analyses and systematic reviews',
    description:
      'Quantitative syntheses of multiple studies on the same question. These carry the most weight because they aggregate findings across research teams, populations, and study designs, reducing the influence of any single flawed or biased study.',
  },
  {
    rank: 2,
    type: 'Randomised controlled trials (RCTs)',
    description:
      'Experimental studies where participants are randomly assigned to intervention or control groups. Well-designed RCTs are the gold standard for establishing cause-and-effect relationships. We consider sample size, blinding, follow-up duration, and attrition rates.',
  },
  {
    rank: 3,
    type: 'Cohort and longitudinal studies',
    description:
      'Observational studies that follow groups over time. These are valuable for identifying associations and long-term patterns but cannot establish causation as definitively as RCTs. Large, well-controlled cohort studies are weighted more heavily.',
  },
  {
    rank: 4,
    type: 'Clinical practice guidelines',
    description:
      'Evidence-based recommendations from professional medical bodies (e.g., American Heart Association, Canadian Psychiatric Association, NICE). Guidelines synthesise evidence and clinical experience into actionable recommendations.',
  },
  {
    rank: 5,
    type: 'Case-control and cross-sectional studies',
    description:
      'Observational designs that compare groups at a single point in time or look backward from outcomes. Useful for generating hypotheses and studying rare conditions but susceptible to confounding and recall bias.',
  },
  {
    rank: 6,
    type: 'Case series and case reports',
    description:
      'Descriptions of outcomes in small groups or individual patients. Valuable for identifying novel phenomena and generating hypotheses, but cannot establish efficacy or generalise findings.',
  },
  {
    rank: 7,
    type: 'Expert opinion and consensus statements',
    description:
      'Formal consensus from recognised experts, used when empirical evidence is lacking. These reflect collective clinical judgement but may be influenced by tradition, personal experience, and groupthink.',
  },
  {
    rank: 8,
    type: 'Mechanistic reasoning and preclinical research',
    description:
      'Animal studies, in vitro research, and theoretical arguments based on biological mechanisms. These can explain why an intervention might work but cannot confirm that it does work in humans.',
  },
];

const revisionHistory = [
  {
    date: '2026-04-13',
    change: 'Initial publication of methodology page.',
  },
];

export default function MethodologyPage() {
  return (
    <div className="w-full py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-2">
          <FlaskConical className="w-10 h-10 text-amber-500" />
          <h1 className="text-4xl md:text-5xl font-bold text-slate-50">
            Methodology
          </h1>
        </div>
        <p className="text-slate-400 mb-10">Last reviewed: 2026-04-13</p>

        <div className="space-y-10">
          {/* 1. Our Approach */}
          <section>
            <h2 className="text-2xl font-bold mb-3 text-slate-50">
              <span className="text-amber-500 mr-2">1.</span>
              Our Approach
            </h2>
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 space-y-4">
              <p className="text-slate-300 leading-relaxed">
                Body Signals summarises published, peer-reviewed health research
                in plain language. Our readers are Canadian and US adults who
                want to understand the current state of research on a health
                topic without needing a scientific background to parse the
                primary literature.
              </p>
              <p className="text-slate-300 leading-relaxed">
                We are not a healthcare provider. We do not diagnose, prescribe,
                or offer personalised advice. We are a research digest: a
                publisher that identifies, evaluates, and communicates the
                strength of evidence behind health claims so that readers can
                make more informed decisions in consultation with their own
                healthcare providers.
              </p>
              <p className="text-slate-300 leading-relaxed">
                Every claim on this site carries an A\u2013F evidence rating. These
                ratings represent our editorial judgement about the quality,
                consistency, and volume of published research supporting a given
                claim. They are assigned through a structured editorial process,
                not by algorithm, and they are subject to revision as new
                research emerges.
              </p>
            </div>
          </section>

          {/* 2. Evidence Rating Scale */}
          <section>
            <h2 className="text-2xl font-bold mb-3 text-slate-50">
              <span className="text-amber-500 mr-2">2.</span>
              Evidence Rating Scale
            </h2>
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
              <p className="text-slate-300 leading-relaxed mb-6">
                The following table describes each grade in our A\u2013F evidence
                rating system. Colour coding matches the evidence badges used
                throughout the site.
              </p>
              <div className="space-y-4">
                {EVIDENCE_TIERS.map((tier) => (
                  <div
                    key={tier.grade}
                    className={`${tier.bgColour} border border-slate-700 rounded-lg p-5`}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <span
                        className={`${tier.colour} text-2xl font-bold`}
                      >
                        {tier.grade}
                      </span>
                      <span className={`${tier.colour} text-lg font-semibold`}>
                        {tier.label}
                      </span>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-slate-500 uppercase tracking-wide mb-1">
                          Criteria
                        </p>
                        <p className="text-slate-300 text-sm">
                          {tier.criteria}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-500 uppercase tracking-wide mb-1">
                          What This Means
                        </p>
                        <p className="text-slate-300 text-sm">
                          {tier.description}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-500 uppercase tracking-wide mb-1">
                          Example
                        </p>
                        <p className="text-slate-400 text-sm italic">
                          {tier.example}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 3. Source Hierarchy */}
          <section>
            <h2 className="text-2xl font-bold mb-3 text-slate-50">
              <span className="text-amber-500 mr-2">3.</span>
              Source Hierarchy
            </h2>
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
              <p className="text-slate-300 leading-relaxed mb-6">
                Not all research is created equal. The type of study design
                significantly affects how much confidence we can place in its
                findings. We rank source types in the following hierarchy, from
                strongest to weakest. Higher-ranked sources carry more weight
                when we assign evidence ratings.
              </p>
              <div className="space-y-4">
                {sourceHierarchy.map((source) => (
                  <div key={source.rank} className="flex gap-4 items-start">
                    <span className="bg-amber-500/20 text-amber-400 px-3 py-1 rounded text-sm font-bold shrink-0 min-w-[2rem] text-center">
                      {source.rank}
                    </span>
                    <div>
                      <strong className="text-slate-100">{source.type}</strong>
                      <p className="text-slate-400 text-sm mt-1">
                        {source.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 4. How Ratings Are Assigned */}
          <section>
            <h2 className="text-2xl font-bold mb-3 text-slate-50">
              <span className="text-amber-500 mr-2">4.</span>
              How Ratings Are Assigned
            </h2>
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 space-y-4">
              <p className="text-slate-300 leading-relaxed">
                Evidence ratings are assigned through editorial judgement, not by
                algorithm. There is no formula that mechanically translates a
                set of studies into a letter grade. Instead, our editors
                consider several factors:
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-300">
                <li>
                  <strong className="text-slate-100">Volume of evidence:</strong>{' '}
                  How many studies exist? Are there meta-analyses or systematic
                  reviews?
                </li>
                <li>
                  <strong className="text-slate-100">Quality of study designs:</strong>{' '}
                  Where do the supporting studies fall in our source hierarchy?
                </li>
                <li>
                  <strong className="text-slate-100">Consistency of findings:</strong>{' '}
                  Do studies converge on similar conclusions, or are results
                  mixed and contradictory?
                </li>
                <li>
                  <strong className="text-slate-100">Effect size and clinical significance:</strong>{' '}
                  Is the observed effect meaningful in practical terms, or is it
                  statistically significant but clinically trivial?
                </li>
                <li>
                  <strong className="text-slate-100">Generalisability:</strong>{' '}
                  Were studies conducted in diverse populations, or only in
                  narrow demographic groups?
                </li>
                <li>
                  <strong className="text-slate-100">Recency:</strong>{' '}
                  Has the evidence been updated recently, or is it based on
                  older studies that may not reflect current understanding?
                </li>
                <li>
                  <strong className="text-slate-100">Risk of bias:</strong>{' '}
                  Are there concerns about funding sources, conflicts of
                  interest, methodological weaknesses, or selective reporting?
                </li>
              </ul>
              <p className="text-slate-300 leading-relaxed">
                The final grade represents a holistic editorial judgement that
                weighs all of these factors. Borderline cases are noted in the
                research summary, and we err on the side of the more
                conservative rating when evidence is ambiguous.
              </p>
            </div>
          </section>

          {/* 5. What Ratings Are NOT */}
          <section>
            <h2 className="text-2xl font-bold mb-3 text-slate-50">
              <span className="text-amber-500 mr-2">5.</span>
              What Ratings Are NOT
            </h2>
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-6 space-y-4">
              <p className="text-amber-200 leading-relaxed">
                Our evidence ratings are <strong>not</strong>:
              </p>
              <ul className="list-disc list-inside space-y-2 text-amber-200">
                <li>
                  <strong>Clinical endorsements.</strong> A high rating does not
                  mean Body Signals endorses an intervention. It means the
                  published research is strong.
                </li>
                <li>
                  <strong>Treatment recommendations.</strong> We do not prescribe
                  or suggest treatments. Discuss options with your healthcare
                  provider.
                </li>
                <li>
                  <strong>Personalised advice.</strong> Ratings reflect
                  population-level evidence. Individual responses vary based on
                  genetics, medications, co-morbidities, and many other factors.
                </li>
                <li>
                  <strong>Guarantees of safety or efficacy.</strong> Even
                  &quot;A&quot;-rated interventions carry risks and may not work for
                  every individual.
                </li>
                <li>
                  <strong>Permanent.</strong> Ratings are subject to revision as
                  new research emerges. A &quot;C&quot; today may become a &quot;B&quot; or an
                  &quot;F&quot; as the evidence base evolves.
                </li>
              </ul>
            </div>
          </section>

          {/* 6. Limitations */}
          <section>
            <h2 className="text-2xl font-bold mb-3 text-slate-50">
              <span className="text-amber-500 mr-2">6.</span>
              Limitations
            </h2>
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 space-y-4">
              <p className="text-slate-300 leading-relaxed">
                We believe in being transparent about the inherent limitations
                of our rating system and our editorial process:
              </p>
              <ul className="list-disc list-inside space-y-3 text-slate-300">
                <li>
                  <strong className="text-slate-100">Single-grade simplification.</strong>{' '}
                  A single letter grade cannot capture the full nuance of a body
                  of research. Some interventions may have strong evidence for
                  one outcome but weak evidence for another. We address this in
                  the narrative text of each research summary, but the letter
                  grade is necessarily reductive.
                </li>
                <li>
                  <strong className="text-slate-100">Research evolves.</strong>{' '}
                  What we know today may be revised or overturned by future
                  research. We update summaries on a rolling basis but cannot
                  guarantee that every page reflects the absolute latest findings
                  at the moment you read it.
                </li>
                <li>
                  <strong className="text-slate-100">Publication bias.</strong>{' '}
                  Published research skews toward positive findings. Studies
                  showing null or negative results are less likely to be
                  published. This means the evidence base may be systematically
                  more optimistic than reality for some interventions.
                </li>
                <li>
                  <strong className="text-slate-100">Generalisability limits.</strong>{' '}
                  Many studies are conducted in narrow populations (e.g., young,
                  healthy university students in Western countries). Findings may
                  not apply equally across all ages, sexes, ethnicities, or
                  health conditions.
                </li>
                <li>
                  <strong className="text-slate-100">Editorial subjectivity.</strong>{' '}
                  Despite our structured process, evidence rating involves
                  judgement. Reasonable editors could disagree on borderline
                  cases. We mitigate this through our review process and
                  corrections policy, but we do not claim perfect objectivity.
                </li>
                <li>
                  <strong className="text-slate-100">Scope constraints.</strong>{' '}
                  We cannot cover every study on every topic. Our summaries focus
                  on the most impactful and relevant research, which means some
                  nuances and edge cases may not be represented.
                </li>
              </ul>
            </div>
          </section>

          {/* 7. Canadian and US Context */}
          <section>
            <h2 className="text-2xl font-bold mb-3 text-slate-50">
              <span className="text-amber-500 mr-2">7.</span>
              Canadian and US Context
            </h2>
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 space-y-4">
              <p className="text-slate-300 leading-relaxed">
                Body Signals serves readers in both Canada and the United
                States. We cover both jurisdictions because health research is
                international, but healthcare systems, regulatory approvals,
                and clinical guidelines often differ between the two countries.
              </p>
              <p className="text-slate-300 leading-relaxed">
                Where relevant, we note jurisdiction-specific differences \u2014 for
                example, when a supplement is regulated differently by Health
                Canada versus the FDA, or when clinical guidelines from the
                Canadian Medical Association differ from those of American
                specialty organisations.
              </p>
              <p className="text-slate-300 leading-relaxed">
                Our evidence ratings are based on the global research literature
                and are not specific to either jurisdiction. However, the
                practical applicability of a given intervention may differ based
                on local availability, insurance coverage, and regulatory status.
              </p>
            </div>
          </section>

          {/* 8. Conflict of Interest */}
          <section>
            <h2 className="text-2xl font-bold mb-3 text-slate-50">
              <span className="text-amber-500 mr-2">8.</span>
              Conflict of Interest
            </h2>
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 space-y-4">
              <p className="text-slate-300 leading-relaxed">
                At present, Body Signals has no financial conflicts of interest.
                We do not accept payment from pharmaceutical companies,
                supplement manufacturers, device makers, or any other commercial
                entity in exchange for coverage or ratings. We have no affiliate
                relationships, sponsorships, or advertising arrangements that
                could influence our editorial content.
              </p>
              <p className="text-slate-300 leading-relaxed">
                We are committed to disclosing any conflicts of interest that
                may arise in the future \u2014 both at the organisational level and
                at the level of individual editors or contributors. Disclosure
                will appear on this page and on any affected content.
              </p>
            </div>
          </section>

          {/* 9. How to Report Errors */}
          <section>
            <h2 className="text-2xl font-bold mb-3 text-slate-50">
              <span className="text-amber-500 mr-2">9.</span>
              How to Report Errors
            </h2>
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 space-y-4">
              <p className="text-slate-300 leading-relaxed">
                If you believe you have found a factual error, outdated
                information, or misrepresentation of published research on Body
                Signals, we want to hear from you. Accurate information depends
                on community vigilance as well as editorial diligence.
              </p>
              <p className="text-slate-300 leading-relaxed">
                To report an error:
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-300">
                <li>
                  Use the feedback widget on the affected page (preferred for
                  minor issues)
                </li>
                <li>
                  Email{' '}
                  <a
                    href="mailto:editorial@bodysignals.org"
                    className="text-amber-500 hover:text-amber-400 underline"
                  >
                    editorial@bodysignals.org
                  </a>{' '}
                  with the page URL, the specific error, and (if possible) a
                  link to the source that supports the correction
                </li>
                <li>
                  Visit our{' '}
                  <Link
                    href="/contact"
                    className="text-amber-500 hover:text-amber-400 underline"
                  >
                    contact page
                  </Link>
                </li>
              </ul>
              <p className="text-slate-300 leading-relaxed">
                All confirmed corrections are documented publicly in our{' '}
                <Link
                  href="/corrections"
                  className="text-amber-500 hover:text-amber-400 underline"
                >
                  Corrections Log
                </Link>
                .
              </p>
            </div>
          </section>

          {/* 10. Revision History */}
          <section>
            <h2 className="text-2xl font-bold mb-3 text-slate-50">
              <span className="text-amber-500 mr-2">10.</span>
              Revision History
            </h2>
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
              <p className="text-slate-300 leading-relaxed mb-4">
                The following table documents changes to this methodology page
                over time.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-700">
                      <th className="text-left py-2 pr-4 text-slate-400 font-semibold">
                        Date
                      </th>
                      <th className="text-left py-2 text-slate-400 font-semibold">
                        Change
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {revisionHistory.map((revision) => (
                      <tr
                        key={revision.date}
                        className="border-b border-slate-700/50"
                      >
                        <td className="py-2 pr-4 text-slate-400 whitespace-nowrap">
                          {revision.date}
                        </td>
                        <td className="py-2 text-slate-300">
                          {revision.change}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Crisis Resources */}
          <section>
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="w-6 h-6 text-red-400" />
                <h2 className="text-xl font-bold text-red-200">
                  Crisis Resources
                </h2>
              </div>
              <p className="text-red-200 leading-relaxed mb-4">
                If you or someone you know is in crisis, please reach out
                immediately. No website \u2014 including this one \u2014 is a substitute
                for emergency care.
              </p>
              <div className="grid gap-2">
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-red-400 shrink-0" />
                  <span className="text-red-200 text-sm">
                    <strong>988 Suicide &amp; Crisis Lifeline</strong> \u2014 Call or
                    text 988 (Canada &amp; US)
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-red-400 shrink-0" />
                  <span className="text-red-200 text-sm">
                    <strong>Crisis Text Line (US)</strong> \u2014 Text HOME to 741741
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-red-400 shrink-0" />
                  <span className="text-red-200 text-sm">
                    <strong>Crisis Text Line (Canada)</strong> \u2014 Text CONNECT to
                    686868
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-red-400 shrink-0" />
                  <span className="text-red-200 text-sm">
                    <strong>Kids Help Phone (Canada)</strong> \u2014 1-800-668-6868
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-red-400 shrink-0" />
                  <span className="text-red-200 text-sm">
                    <strong>LGBT Youth Line (Canada)</strong> \u2014 1-800-268-9688
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-red-400 shrink-0" />
                  <span className="text-red-200 text-sm">
                    <strong>Trans Lifeline (Canada)</strong> \u2014 1-877-330-6366
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-red-400 shrink-0" />
                  <span className="text-red-200 text-sm">
                    <strong>Trevor Project (US)</strong> \u2014 1-866-488-7386
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-red-400 shrink-0" />
                  <span className="text-red-200 text-sm">
                    <strong>Emergency Services</strong> \u2014 911
                  </span>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="mt-12 bg-slate-800 border border-slate-700 rounded-lg p-6">
          <p className="text-slate-400 text-sm flex items-center gap-2">
            <Mail className="w-4 h-4 text-amber-500" />
            Methodology questions? Contact us at{' '}
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
