import Link from 'next/link';
import { bodyAreas } from '@/lib/data/categories';
import { Brain, Heart, Apple, Bone, PersonStanding, Sun, Activity, HelpCircle } from 'lucide-react';

const IconMap: Record<string, any> = {
    Brain: Brain,
    Heart: Heart,
    Apple: Apple,
    Bone: Bone,
    Accessibility: PersonStanding, // Changed to PersonStanding for limbs/body
    Sun: Sun,
    Activity: Activity,
};

export function BodyMap() {
    return (
        <section className="py-16 px-4 bg-slate-900">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-2 text-slate-50">Explore by Body Area</h2>
                    <p className="text-slate-400">Select an area to see related symptoms</p>
                </div>

                <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {bodyAreas.map((area) => {
                        const Icon = IconMap[area.icon] || HelpCircle;
                        return (
                            <Link
                                key={area.id}
                                href={`/body/${area.slug}`}
                                className="group bg-slate-800 border border-slate-700 rounded-xl p-6 hover:border-amber-500 transition-all hover:shadow-lg hover:shadow-amber-500/10"
                            >
                                <div className="inline-flex items-center justify-center w-12 h-12 bg-amber-500/10 rounded-lg mb-4 text-amber-500 group-hover:scale-110 transition-transform">
                                    <Icon className="w-6 h-6" />
                                </div>
                                <h3 className="text-lg font-semibold mb-2 text-slate-50 group-hover:text-amber-400 transition-colors">
                                    {area.name}
                                </h3>
                                <p className="text-sm text-slate-400">
                                    {area.description}
                                </p>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
