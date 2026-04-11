import Link from 'next/link';
import { Activity, ArrowRight, ShieldCheck } from 'lucide-react';

export function Hero() {
    return (
        <section className="relative py-24 px-4 overflow-hidden bg-slate-900">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-slate-900 to-slate-900" />
            <div className="max-w-7xl mx-auto relative z-10">
                <div className="max-w-3xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-full text-amber-400 text-sm mb-6">
                        <ShieldCheck className="w-4 h-4" />
                        <span>Evidence-based. Doctor-reviewed guidelines.</span>
                    </div>

                    <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight text-slate-50">
                        Your body,
                        <span className="text-amber-500"> explained</span>
                    </h1>

                    <p className="text-xl text-slate-400 mb-8">
                        Symptoms, conditions, and what actually works. Evidence-based, built for Canadian and US readers, with transparent methodology.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                        <Link
                            href="/symptoms"
                            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-amber-500 hover:bg-amber-400 text-slate-900 font-semibold rounded-lg transition-colors"
                        >
                            Browse Symptoms
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                        <Link
                            href="/about"
                            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-slate-800 hover:bg-slate-700 text-slate-50 font-semibold rounded-lg border border-slate-700 transition-colors"
                        >
                            How it Works
                        </Link>
                    </div>

                    <div className="flex items-center justify-center gap-8 text-sm text-slate-500">
                        <div className="flex items-center gap-2">
                            <Activity className="w-4 h-4 text-amber-500" />
                            <span>Medical Guidelines</span>
                        </div>
                        <div>•</div>
                        <div>No Affiliate Bias</div>
                    </div>
                </div>
            </div>
        </section>
    );
}
