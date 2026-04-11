import { notFound } from 'next/navigation';
import { symptoms } from '@/lib/data/symptoms';
import { bodyAreas } from '@/lib/data/categories';
import { AlertTriangle, ChevronRight, Activity, Brain, Heart, Apple, Bone, PersonStanding, Sun } from 'lucide-react';
import Link from 'next/link';

const IconMap: Record<string, any> = {
    Brain: Brain,
    Heart: Heart,
    Apple: Apple,
    Bone: Bone,
    Accessibility: PersonStanding,
    Sun: Sun,
    Activity: Activity,
};

export function generateStaticParams() {
    return bodyAreas.map((area) => ({
        area: area.slug,
    }));
}

export default function BodyAreaPage({ params }: { params: { area: string } }) {
    const area = bodyAreas.find((a) => a.slug === params.area);

    if (!area) {
        notFound();
    }

    const areaSymptoms = symptoms.filter((s) => s.bodyArea === area.id);
    const Icon = IconMap[area.icon] || Activity;

    return (
        <div className="min-h-screen py-12 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="mb-12">
                    <Link href="/symptoms" className="text-sm text-slate-500 mb-4 inline-flex items-center hover:text-amber-500 transition-colors">
                        <ChevronRight className="w-4 h-4 rotate-180" />
                        Back to All Symptoms
                    </Link>
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-16 h-16 bg-amber-500/10 rounded-xl flex items-center justify-center text-amber-500">
                            <Icon className="w-8 h-8" />
                        </div>
                        <div>
                            <h1 className="text-4xl font-bold text-slate-50">{area.name}</h1>
                            <p className="text-slate-400 text-lg">{area.description}</p>
                        </div>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {areaSymptoms.length > 0 ? (
                        areaSymptoms.map((symptom) => (
                            <Link
                                key={symptom.id}
                                href={`/symptoms/${symptom.slug}`}
                                className="group bg-slate-800 border border-slate-700 rounded-xl p-6 hover:border-amber-500/50 transition-all hover:shadow-lg hover:shadow-amber-500/10"
                            >
                                <div className="flex items-start justify-between mb-2">
                                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                        {area.name}
                                    </span>
                                    {symptom.urgency === 'emergency' && (
                                        <span className="text-red-400">
                                            <AlertTriangle className="w-5 h-5" />
                                        </span>
                                    )}
                                </div>

                                <h2 className="text-xl font-bold text-slate-50 mb-3 group-hover:text-amber-400 transition-colors">
                                    {symptom.name}
                                </h2>

                                <p className="text-slate-400 text-sm mb-4 line-clamp-2">
                                    {symptom.summary}
                                </p>

                                <div className="flex items-center text-amber-500 text-sm font-medium">
                                    View Details
                                    <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </Link>
                        ))
                    ) : (
                        <div className="col-span-full py-12 text-center text-slate-500 bg-slate-800/50 rounded-xl border border-dashed border-slate-700">
                            <p>No symptoms currently listed for this area.</p>
                            <Link href="/symptoms" className="text-amber-500 hover:underline mt-2 inline-block">View all symptoms</Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
