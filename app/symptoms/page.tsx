import Link from 'next/link';
import { symptoms } from '@/lib/data/symptoms';
import { bodyAreas } from '@/lib/data/categories';
import { Search, AlertTriangle, ChevronRight } from 'lucide-react';

export default function SymptomsPage() {
    // Simple grouping or just list all? 
    // Let's list all for now, sorted alphabetically.
    const sortedSymptoms = [...symptoms].sort((a, b) => a.name.localeCompare(b.name));

    return (
        <div className="min-h-screen py-12 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="mb-12">
                    <h1 className="text-4xl font-bold mb-4 text-slate-50">Symptom Library</h1>
                    <p className="text-slate-400 text-lg max-w-2xl">
                        Complete index of common symptoms, their potential causes, and urgency levels.
                    </p>
                </div>

                {/* Search placeholder (visual only for now) */}
                <div className="relative max-w-xl mb-12">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-slate-500" />
                    </div>
                    <input
                        type="text"
                        className="block w-full pl-10 pr-3 py-3 border border-slate-700 rounded-lg leading-5 bg-slate-800 text-slate-300 placeholder-slate-500 focus:outline-none focus:bg-slate-900 focus:ring-1 focus:ring-amber-500 focus:border-amber-500 sm:text-sm transition duration-150 ease-in-out"
                        placeholder="Search symptoms (e.g., headache, chest pain)..."
                    />
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {sortedSymptoms.map((symptom) => {
                        const areaName = bodyAreas.find(a => a.id === symptom.bodyArea)?.name;

                        return (
                            <Link
                                key={symptom.id}
                                href={`/symptoms/${symptom.slug}`}
                                className="group bg-slate-800 border border-slate-700 rounded-xl p-6 hover:border-amber-500/50 transition-all hover:shadow-lg hover:shadow-amber-500/10"
                            >
                                <div className="flex items-start justify-between mb-2">
                                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                        {areaName}
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

                                <div className="flex items-center text-amber-500 text-sm font-medium animate-pulse-0 group-hover:translate-x-1 transition-transform">
                                    View Details
                                    <ChevronRight className="w-4 h-4 ml-1" />
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
