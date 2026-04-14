import { Activity, Target, BookOpen, ShieldCheck, Users, AlertTriangle } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="w-full py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-slate-50">About BodySignals</h1>

        <div className="prose prose-invert max-w-none">
          {/* Mission */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4 flex items-center gap-2 text-slate-50">
              <Target className="w-8 h-8 text-amber-500" />
              What Body Signals Is
            </h2>
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
              <p className="text-slate-300 leading-relaxed mb-4">
                Body Signals is an independent research digest and publisher. We summarise published health research — peer-reviewed studies, clinical guidelines, and recognised medical-organisation reports — in plain language for Canadian and US readers.
              </p>
              <p className="text-slate-300 leading-relaxed mb-4">
                Body Signals is not a healthcare provider, does not practise medicine, and does not provide medical advice, diagnosis, or treatment. We are a publisher, not a clinical service.
              </p>
              <p className="text-slate-300 leading-relaxed">
                Every claim on this site carries an A–F evidence rating so readers can see the strength of the underlying research before making their own decisions. Where the evidence is weak or mixed, we say so. Where there is no evidence, we say that too.
              </p>
            </div>
          </section>

          {/* Methodology */}
          <section id="methodology" className="mb-12">
            <h2 className="text-3xl font-bold mb-4 flex items-center gap-2 text-slate-50">
              <Activity className="w-8 h-8 text-amber-500" />
              Methodology
            </h2>
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3 text-amber-500">
                  Urgency Classification
                </h3>
                <p className="text-slate-300 mb-3">
                  We categorize symptoms based on standard medical triage protocols:
                </p>
                <div className="space-y-3">
                  <div className="flex gap-4 items-start">
                    <span className="bg-red-500/20 text-red-400 px-2 py-1 rounded text-xs font-bold uppercase w-24 text-center shrink-0">Emergency</span>
                    <p className="text-slate-300 text-sm">Symptoms that typically require immediate medical attention (ER/Ambulance).</p>
                  </div>
                  <div className="flex gap-4 items-start">
                    <span className="bg-amber-500/20 text-amber-400 px-2 py-1 rounded text-xs font-bold uppercase w-24 text-center shrink-0">Urgent</span>
                    <p className="text-slate-300 text-sm">Symptoms that should be evaluated by a professional within 24-48 hours.</p>
                  </div>
                  <div className="flex gap-4 items-start">
                    <span className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded text-xs font-bold uppercase w-24 text-center shrink-0">Routine</span>
                    <p className="text-slate-300 text-sm">Issues that can wait for a standard appointment.</p>
                  </div>
                  <div className="flex gap-4 items-start">
                    <span className="bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded text-xs font-bold uppercase w-24 text-center shrink-0">Self Care</span>
                    <p className="text-slate-300 text-sm">Conditions typically managed safely at home.</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-amber-500">
                  Evidence Standards
                </h3>
                <p className="text-slate-300">
                  Content is derived from clinical practice guidelines and peer-reviewed literature. We use a grading system (A–F) to indicate the strength of evidence behind each research summary. These grades reflect editorial judgment about research quality — they are not clinical endorsements.
                </p>
              </div>
            </div>
          </section>

          {/* Sources */}
          <section id="sources" className="mb-12">
            <h2 className="text-3xl font-bold mb-4 flex items-center gap-2 text-slate-50">
              <BookOpen className="w-8 h-8 text-amber-500" />
              Data Sources
            </h2>
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
              <ul className="space-y-4 text-slate-300">
                <li>
                  <strong className="text-amber-500">Clinical Guidelines:</strong>{' '}
                  American Heart Association, American College of Physicians, etc.
                </li>
                <li>
                  <strong className="text-amber-500">Government Health Agencies:</strong>{' '}
                  NIH, CDC, Health Canada, NHS.
                </li>
                <li>
                  <strong className="text-amber-500">Peer-Reviewed Journals:</strong>{' '}
                  The Lancet, JAMA, NEJM.
                </li>
              </ul>
            </div>
          </section>

          {/* Disclaimer */}
          <section id="disclaimer" className="mb-12">
            <h2 className="text-3xl font-bold mb-4 text-slate-50 flex items-center gap-2">
              <AlertTriangle className="w-8 h-8 text-amber-500" />
              Medical Disclaimer
            </h2>
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-6">
              <div className="text-amber-200 space-y-4">
                <p>
                  <strong>Research Digest — Not Medical Advice:</strong> Body Signals is an independent research publisher. It summarises published research for informational purposes and is not a substitute for professional medical advice, diagnosis, or treatment.
                </p>
                <p>
                  <strong>Emergencies:</strong> If you think you may have a medical emergency, call your doctor, go to the emergency department, or call emergency services immediately.
                </p>
                <p>
                  <strong>No Practitioner–Patient Relationship:</strong> Using this website does not establish a doctor-patient or practitioner-patient relationship.
                </p>
                <p>
                  <strong>Individual Variation:</strong> Symptoms can manifest differently in different people. The research summarised here reflects population-level findings and may not apply to any individual case.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
