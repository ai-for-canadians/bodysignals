import { notFound } from 'next/navigation';
import { symptoms } from '@/lib/data/symptoms';
import { bodyAreas } from '@/lib/data/categories';
import { AlertTriangle, Clock, Stethoscope, Home, Activity, CheckCircle, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export function generateStaticParams() {
    return symptoms.map((symptom) => ({
        slug: symptom.slug,
    }));
}

export default function SymptomPage({ params }: { params: { slug: string } }) {
    const symptom = symptoms.find((s) => s.slug === params.slug);

    if (!symptom) {
        notFound();
    }

    const area = bodyAreas.find((a) => a.id === symptom.bodyArea);

    return (
        <div className="min-h-screen pb-20">
            {/* Header */}
            <div className="bg-slate-900 border-b border-slate-800 py-12 px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
                        <Link href="/symptoms" className="hover:text-amber-500 transition-colors">Symptoms</Link>
                        <span>/</span>
                        <Link href={`/body/${area?.slug}`} className="hover:text-amber-500 transition-colors">{area?.name}</Link>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                        <h1 className="text-4xl md:text-5xl font-bold text-slate-50">{symptom.name}</h1>
                        {symptom.urgency === 'emergency' && (
                            <div className="flex items-center gap-2 bg-red-500/20 text-red-400 px-4 py-2 rounded-lg border border-red-500/30">
                                <AlertTriangle className="w-6 h-6" />
                                <span className="font-bold">SEEK IMMEDIATE CARE</span>
                            </div>
                        )}
                        {symptom.urgency === 'urgent' && (
                            <div className="flex items-center gap-2 bg-amber-500/20 text-amber-400 px-4 py-2 rounded-lg border border-amber-500/30">
                                <Clock className="w-6 h-6" />
                                <span className="font-bold">SEE DOCTOR SOON</span>
                            </div>
                        )}
                        {symptom.urgency === 'self_care' && (
                            <div className="flex items-center gap-2 bg-emerald-500/20 text-emerald-400 px-4 py-2 rounded-lg border border-emerald-500/30">
                                <CheckCircle className="w-6 h-6" />
                                <span className="font-bold">USUALLY SELF-CARE</span>
                            </div>
                        )}
                        {symptom.urgency === 'routine' && (
                            <div className="flex items-center gap-2 bg-blue-500/20 text-blue-400 px-4 py-2 rounded-lg border border-blue-500/30">
                                <Stethoscope className="w-6 h-6" />
                                <span className="font-bold">ROUTINE CHECK</span>
                            </div>
                        )}
                    </div>

                    <p className="text-xl text-slate-300 leading-relaxed max-w-3xl">
                        {symptom.summary}
                    </p>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 py-12">
                <div className="grid md:grid-cols-3 gap-8">

                    {/* Main Content */}
                    <div className="md:col-span-2 space-y-12">

                        {/* Red Flags - Critical Typography */}
                        {symptom.redFlags.length > 0 && (
                            <section className="bg-red-950/30 border border-red-900/50 rounded-xl p-6">
                                <h2 className="text-2xl font-bold text-red-400 mb-4 flex items-center gap-2">
                                    <AlertTriangle className="w-6 h-6" />
                                    Red Flags
                                </h2>
                                <p className="text-slate-300 mb-4 text-sm">If you experience these, seek immediate medical attention.</p>
                                <ul className="space-y-3">
                                    {symptom.redFlags.map((flag, idx) => (
                                        <li key={idx} className="flex gap-3 text-slate-50 font-medium">
                                            <span className="text-red-500">•</span>
                                            {flag}
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        )}

                        {/* Overview */}
                        <section>
                            <h2 className="text-2xl font-bold text-slate-50 mb-4">Overview</h2>
                            <p className="text-slate-300 leading-relaxed whitespace-pre-line">
                                {symptom.description}
                            </p>
                        </section>

                        {/* Related Conditions */}
                        <section>
                            <h2 className="text-2xl font-bold text-slate-50 mb-6">Possible Causes</h2>
                            <div className="space-y-4">
                                {symptom.relatedConditions.map((cond, idx) => (
                                    <div key={idx} className="bg-slate-800 border border-slate-700 rounded-lg p-5">
                                        <div className="flex items-start justify-between mb-2">
                                            <h3 className="text-lg font-semibold text-slate-50">{cond.name}</h3>
                                            <div className="flex gap-2">
                                                <span className={`px-2 py-0.5 rounded text-xs font-medium uppercase
                                            ${cond.likelihood === 'common' ? 'bg-slate-700 text-slate-300' : ''}
                                            ${cond.likelihood === 'uncommon' ? 'bg-slate-700 text-slate-400' : ''}
                                            ${cond.likelihood === 'rare' ? 'bg-slate-700 text-slate-500' : ''}
                                         `}>
                                                    {cond.likelihood}
                                                </span>
                                                <span className={`px-2 py-0.5 rounded text-xs font-medium uppercase
                                            ${cond.urgency === 'emergency' ? 'bg-red-500/20 text-red-400' : ''}
                                            ${cond.urgency === 'urgent' ? 'bg-amber-500/20 text-amber-400' : ''}
                                            ${cond.urgency === 'routine' ? 'bg-blue-500/20 text-blue-400' : ''}
                                            ${cond.urgency === 'self_care' ? 'bg-emerald-500/20 text-emerald-400' : ''}
                                         `}>
                                                    {cond.urgency.replace('_', ' ')}
                                                </span>
                                            </div>
                                        </div>
                                        <p className="text-slate-400 text-sm">
                                            {cond.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Home Care */}
                        {symptom.homeCare.length > 0 && (
                            <section>
                                <h2 className="text-2xl font-bold text-slate-50 mb-4 flex items-center gap-2">
                                    <Home className="w-6 h-6 text-amber-500" />
                                    Home Care
                                </h2>
                                <ul className="list-disc list-inside space-y-2 text-slate-300 leading-relaxed">
                                    {symptom.homeCare.map((item, idx) => (
                                        <li key={idx} className="marker:text-amber-500">{item}</li>
                                    ))}
                                </ul>
                            </section>
                        )}

                    </div>

                    {/* Sidebar */}
                    <div className="space-y-8">
                        {/* Yellow Flags / When to see doctor */}
                        <div className="bg-slate-800 border-l-4 border-amber-500 rounded-r-xl p-6">
                            <h3 className="text-lg font-bold text-slate-50 mb-4 flex items-center gap-2">
                                <Stethoscope className="w-5 h-5 text-amber-500" />
                                When to see a doctor
                            </h3>
                            <ul className="space-y-3">
                                {symptom.whenToSeeDoctor.map((item, idx) => (
                                    <li key={idx} className="text-slate-300 text-sm flex gap-2">
                                        <span className="text-amber-500">•</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                            <h3 className="text-lg font-bold text-slate-50 mb-4">Quick Facts</h3>
                            <div className="space-y-4">
                                <div>
                                    <div className="text-xs text-slate-500 uppercase font-semibold mb-1">Body Area</div>
                                    <div className="text-slate-300 flex items-center gap-2">
                                        <Activity className="w-4 h-4 text-amber-500" />
                                        {area?.name}
                                    </div>
                                </div>
                                <div>
                                    <div className="text-xs text-slate-500 uppercase font-semibold mb-1">Evidence Rating</div>
                                    <div className="flex items-center gap-2">
                                        <span className={`text-xl font-bold
                                    ${symptom.evidenceRating === 'A' ? 'text-emerald-400' : ''}
                                    ${symptom.evidenceRating === 'B' ? 'text-green-400' : ''}
                                    ${symptom.evidenceRating === 'C' ? 'text-amber-400' : ''}
                                 `}>{symptom.evidenceRating}</span>
                                        <span className="text-xs text-slate-500">
                                            (Based on clinical guidelines)
                                        </span>
                                    </div>
                                </div>
                                <div>
                                    <div className="text-xs text-slate-500 uppercase font-semibold mb-1">Last Updated</div>
                                    <div className="text-slate-300 text-sm">
                                        {symptom.lastUpdated}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
