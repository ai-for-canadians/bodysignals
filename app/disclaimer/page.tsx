import type { Metadata } from 'next';
import Link from 'next/link';
import { AlertTriangle, Phone, Mail } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Disclaimer',
  description:
    'Full disclaimer for Body Signals. We are an independent research digest \u2014 not a healthcare provider. This site does not offer medical advice.',
};

export default function DisclaimerPage() {
  return (
    <div className="w-full py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-2">
          <AlertTriangle className="w-10 h-10 text-amber-500" />
          <h1 className="text-4xl md:text-5xl font-bold text-slate-50">
            Disclaimer
          </h1>
        </div>
        <p className="text-slate-400 mb-10">Last reviewed: 2026-04-13</p>

        <div className="space-y-8">
          {/* 1. General Statement */}
          <section>
            <h2 className="text-2xl font-bold mb-3 text-slate-50">
              <span className="text-amber-500 mr-2">1.</span>
              General Statement
            </h2>
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
              <p className="text-slate-300 leading-relaxed">
                Body Signals is an independent research digest and publisher. We
                summarise published, peer-reviewed health research for
                informational purposes. We do not offer medical advice,
                diagnosis, or treatment. The information on this website is
                intended to help readers understand the current state of health
                research \u2014 it is not a substitute for the judgement of a
                qualified healthcare professional.
              </p>
            </div>
          </section>

          {/* 2. Not Medical Advice */}
          <section>
            <h2 className="text-2xl font-bold mb-3 text-slate-50">
              <span className="text-amber-500 mr-2">2.</span>
              Not Medical Advice
            </h2>
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-6">
              <p className="text-amber-200 leading-relaxed mb-4">
                <strong>
                  The content on Body Signals does not constitute medical advice.
                </strong>{' '}
                Our research summaries describe what published studies and
                clinical guidelines have found at a population level. They are
                not recommendations for any individual to take or avoid any
                particular action.
              </p>
              <p className="text-amber-200 leading-relaxed mb-4">
                Do not start, stop, or change any medication, supplement,
                exercise programme, or therapeutic intervention based solely on
                information found on this website. Always consult a qualified
                healthcare provider before making decisions about your health.
              </p>
              <p className="text-amber-200 leading-relaxed">
                If the information on this site conflicts with advice from your
                healthcare provider, follow your provider&apos;s guidance. Your
                provider knows your medical history, current medications, and
                individual circumstances \u2014 we do not.
              </p>
            </div>
          </section>

          {/* 3. No Practitioner-Patient Relationship */}
          <section>
            <h2 className="text-2xl font-bold mb-3 text-slate-50">
              <span className="text-amber-500 mr-2">3.</span>
              No Practitioner\u2013Patient Relationship
            </h2>
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
              <p className="text-slate-300 leading-relaxed">
                Using this website, reading our research summaries, submitting
                feedback, or contacting us does not create a doctor-patient,
                therapist-client, pharmacist-patient, or any other
                practitioner\u2013patient relationship between you and Body Signals,
                its editors, contributors, or affiliates. We are publishers, not
                clinicians.
              </p>
            </div>
          </section>

          {/* 4. Emergency Information */}
          <section>
            <h2 className="text-2xl font-bold mb-3 text-slate-50">
              <span className="text-amber-500 mr-2">4.</span>
              Emergency Information
            </h2>
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-6">
              <p className="text-red-200 leading-relaxed mb-4">
                <strong>
                  If you are experiencing a medical emergency, call 911 (or your
                  local emergency number) immediately.
                </strong>{' '}
                Do not rely on any website \u2014 including this one \u2014 for emergency
                medical guidance.
              </p>
              <p className="text-red-200 leading-relaxed mb-4">
                If you or someone you know is in crisis or experiencing thoughts
                of suicide, please reach out to one of the following resources:
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
                  <div className="text-red-200">
                    <strong>988 Suicide &amp; Crisis Lifeline</strong> \u2014 Call or
                    text <strong>988</strong> (Canada &amp; US)
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
                  <div className="text-red-200">
                    <strong>Crisis Text Line (US)</strong> \u2014 Text{' '}
                    <strong>HOME</strong> to <strong>741741</strong>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
                  <div className="text-red-200">
                    <strong>Crisis Text Line (Canada)</strong> \u2014 Text{' '}
                    <strong>CONNECT</strong> to <strong>686868</strong>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
                  <div className="text-red-200">
                    <strong>Kids Help Phone (Canada)</strong> \u2014{' '}
                    <strong>1-800-668-6868</strong>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
                  <div className="text-red-200">
                    <strong>LGBT Youth Line (Canada)</strong> \u2014{' '}
                    <strong>1-800-268-9688</strong>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
                  <div className="text-red-200">
                    <strong>Trans Lifeline (Canada)</strong> \u2014{' '}
                    <strong>1-877-330-6366</strong>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
                  <div className="text-red-200">
                    <strong>Trevor Project (US)</strong> \u2014{' '}
                    <strong>1-866-488-7386</strong>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
                  <div className="text-red-200">
                    <strong>Emergency Services</strong> \u2014{' '}
                    <strong>911</strong>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 5. Evidence Ratings */}
          <section>
            <h2 className="text-2xl font-bold mb-3 text-slate-50">
              <span className="text-amber-500 mr-2">5.</span>
              Evidence Ratings
            </h2>
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
              <p className="text-slate-300 leading-relaxed mb-4">
                Our A\u2013F evidence ratings are editorial judgements about the
                quality and consistency of the published research behind a given
                claim. They are <strong className="text-slate-100">not</strong>{' '}
                clinical endorsements, treatment recommendations, or guarantees
                of efficacy for any individual.
              </p>
              <p className="text-slate-300 leading-relaxed">
                A high evidence rating (e.g., &quot;A&quot;) means that the claim is well
                supported by multiple rigorous studies \u2014 it does not mean the
                intervention is right for you. A low rating (e.g., &quot;D&quot; or &quot;F&quot;)
                means the research is weak or negative \u2014 it does not necessarily
                mean the intervention is harmful in all cases. For full details
                on how ratings are assigned, see our{' '}
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

          {/* 6. Limitation of Liability */}
          <section>
            <h2 className="text-2xl font-bold mb-3 text-slate-50">
              <span className="text-amber-500 mr-2">6.</span>
              Limitation of Liability
            </h2>
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
              <p className="text-slate-300 leading-relaxed">
                To the fullest extent permitted by applicable law, Body Signals
                and its editors, contributors, and affiliates shall not be
                liable for any damages \u2014 direct, indirect, incidental,
                consequential, or punitive \u2014 arising from your use of, reliance
                on, or inability to use the information on this website. This
                includes, without limitation, any injury, illness, financial
                loss, or other harm that may result from actions taken or not
                taken based on the content of this site.
              </p>
            </div>
          </section>

          {/* 7. Accuracy and Currency */}
          <section>
            <h2 className="text-2xl font-bold mb-3 text-slate-50">
              <span className="text-amber-500 mr-2">7.</span>
              Accuracy and Currency
            </h2>
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
              <p className="text-slate-300 leading-relaxed mb-4">
                We strive to summarise research accurately and to keep our
                content current. However, health research evolves continuously.
                Information that was accurate at the time of publication may be
                superseded by newer studies, updated guidelines, or revised
                clinical consensus.
              </p>
              <p className="text-slate-300 leading-relaxed">
                We make no guarantee that all information on the Site is current
                at the time you read it. Each research summary includes a &quot;last
                updated&quot; date to help you assess currency. If you believe you
                have found an error, please report it through our{' '}
                <Link
                  href="/corrections"
                  className="text-amber-500 hover:text-amber-400 underline"
                >
                  corrections process
                </Link>
                .
              </p>
            </div>
          </section>

          {/* 8. Individual Variation */}
          <section>
            <h2 className="text-2xl font-bold mb-3 text-slate-50">
              <span className="text-amber-500 mr-2">8.</span>
              Individual Variation
            </h2>
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
              <p className="text-slate-300 leading-relaxed">
                The research summaries on Body Signals reflect population-level
                findings. Individual responses to any intervention, supplement,
                medication, or lifestyle change may vary significantly based on
                genetics, existing health conditions, medications, age, sex,
                ethnicity, and many other factors. What works for a study
                population on average may not work for you, and what does not
                work on average may work in specific cases. Discuss individual
                applicability with your healthcare provider.
              </p>
            </div>
          </section>

          {/* 9. Supplements and Interactions */}
          <section>
            <h2 className="text-2xl font-bold mb-3 text-slate-50">
              <span className="text-amber-500 mr-2">9.</span>
              Supplements and Interactions
            </h2>
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
              <p className="text-slate-300 leading-relaxed">
                Where we discuss supplements, vitamins, or natural health
                products, we are reporting on published research \u2014 not
                recommending that you take them. Supplements can interact with
                prescription medications, other supplements, and underlying
                health conditions. Some supplements are contraindicated for
                specific populations (e.g., pregnant individuals, children,
                people with liver or kidney conditions). Always check with your
                pharmacist or doctor before starting any supplement.
              </p>
            </div>
          </section>

          {/* 10. Exercise and Movement */}
          <section>
            <h2 className="text-2xl font-bold mb-3 text-slate-50">
              <span className="text-amber-500 mr-2">10.</span>
              Exercise and Movement
            </h2>
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
              <p className="text-slate-300 leading-relaxed">
                Where we describe exercise programmes, movement protocols, or
                physical rehabilitation approaches, we are summarising published
                research \u2014 not prescribing a programme for you. Exercise carries
                inherent risks, including injury, aggravation of existing
                conditions, and cardiovascular events. Consult a qualified
                healthcare provider before starting any new exercise programme,
                particularly if you have existing injuries, chronic conditions,
                or have been sedentary.
              </p>
            </div>
          </section>

          {/* 11. Mental Health */}
          <section>
            <h2 className="text-2xl font-bold mb-3 text-slate-50">
              <span className="text-amber-500 mr-2">11.</span>
              Mental Health
            </h2>
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
              <p className="text-slate-300 leading-relaxed mb-4">
                Our mental health content summarises research on psychological
                conditions, therapies, and interventions. This content is
                emphatically not a substitute for professional mental health
                support. If you are experiencing a mental health crisis, please
                contact the crisis resources listed in Section 4 above or reach
                out to a qualified mental health professional.
              </p>
              <p className="text-slate-300 leading-relaxed">
                For information about types of mental health providers and what
                they can help with, see our{' '}
                <Link
                  href="/providers"
                  className="text-amber-500 hover:text-amber-400 underline"
                >
                  Providers
                </Link>{' '}
                page. For corrections or concerns about our mental health
                content, please visit our{' '}
                <Link
                  href="/corrections"
                  className="text-amber-500 hover:text-amber-400 underline"
                >
                  Corrections
                </Link>{' '}
                page.
              </p>
            </div>
          </section>

          {/* 12. Commercial Relationships */}
          <section>
            <h2 className="text-2xl font-bold mb-3 text-slate-50">
              <span className="text-amber-500 mr-2">12.</span>
              Commercial Relationships
            </h2>
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
              <p className="text-slate-300 leading-relaxed mb-4">
                Body Signals may include links to external health services. Where
                a commercial relationship exists between Body Signals and a
                linked service (e.g., an affiliate or referral arrangement), this
                is disclosed at the point of the link and on our dedicated{' '}
                <Link
                  href="/disclosures"
                  className="text-amber-500 hover:text-amber-400 underline"
                >
                  Disclosures
                </Link>{' '}
                page.
              </p>
              <p className="text-slate-300 leading-relaxed">
                No commercial relationship influences our evidence ratings,
                editorial content, or research summaries. For full details on
                our current commercial relationships (if any), editorial
                firewall policies, and how to report concerns, see our{' '}
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
        </div>

        <div className="mt-12 bg-slate-800 border border-slate-700 rounded-lg p-6">
          <p className="text-slate-400 text-sm flex items-center gap-2">
            <Mail className="w-4 h-4 text-amber-500" />
            Questions about this disclaimer? Contact us at{' '}
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
