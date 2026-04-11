import Link from 'next/link';
import type { Metadata } from 'next';
import {
  Moon,
  Activity,
  Brain,
  ArrowRight,
  type LucideIcon,
} from 'lucide-react';
import {
  getFeaturedSleepInterventions,
  sleepInterventions,
} from '@/lib/data/sleep';
import { adhdSystems, adhdTools, getFeaturedADHDSystems } from '@/lib/data/adhd';
import {
  getFeaturedMovementPrograms,
  movementPrograms,
} from '@/lib/data/movement';

export const metadata: Metadata = {
  title: 'Topic Hubs',
  description:
    'Deep guides on the topics that matter most: evidence-rated sleep interventions, physiotherapist-validated movement programs, and tactical ADHD systems — all rated on the A–F scale with Canadian context.',
  openGraph: {
    title: 'Topic Hubs | Body Signals',
    description:
      'Evidence-rated sleep interventions, physiotherapist-validated movement programs, and tactical ADHD systems.',
  },
};

interface TopicTeaser {
  slug: string;
  name: string;
}

interface TopicHub {
  name: string;
  icon: LucideIcon;
  href: string;
  countLabel: string;
  description: string;
  teaserHeading: string;
  teasers: TopicTeaser[];
}

function buildTopics(): TopicHub[] {
  const sleepFeatured = getFeaturedSleepInterventions();
  const adhdFeatured = getFeaturedADHDSystems();
  const movementFeatured = getFeaturedMovementPrograms();

  return [
    {
      name: 'Sleep',
      icon: Moon,
      href: '/topics/sleep',
      countLabel: `${sleepInterventions.length} interventions`,
      description:
        'Evidence-rated interventions for falling asleep, staying asleep, and sleeping deeper. Hygiene, environment, supplements, tools, and behavioural protocols — each with a full safety profile.',
      teaserHeading: 'Featured interventions',
      teasers: sleepFeatured.map((i) => ({
        slug: `/topics/sleep/${i.slug}`,
        name: i.name,
      })),
    },
    {
      name: 'ADHD Systems',
      icon: Brain,
      href: '/topics/adhd',
      countLabel: `${adhdSystems.length} systems · ${adhdTools.length} tools`,
      description:
        'Tactical systems and recommended tools for ADHD brains — productivity, home, finances, health, and relationships. Rated by difficulty and impact, with hand-authored evidence grades.',
      teaserHeading: 'Featured systems',
      teasers: adhdFeatured.map((s) => ({
        slug: `/topics/adhd/${s.slug}`,
        name: s.name,
      })),
    },
    {
      name: 'Movement',
      icon: Activity,
      href: '/topics/movement',
      countLabel: `${movementPrograms.length} programs`,
      description:
        'Phased rehabilitation programs for common musculoskeletal pain — knee, back, and shoulder. Physiotherapist-validated protocols with week-by-week exercises, contraindications, and progression goals.',
      teaserHeading: 'Featured programs',
      teasers: movementFeatured.map((p) => ({
        slug: `/topics/movement/${p.slug}`,
        name: p.name,
      })),
    },
  ];
}

export default function TopicsPage() {
  const topics = buildTopics();

  return (
    <div className="w-full bg-slate-900 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-50 mb-4">
            Topic Hubs
          </h1>
          <p className="text-xl text-slate-400">
            Deep guides on the topics that matter most: sleep, movement, and ADHD systems. Each hub is built around evidence-rated interventions with safety profiles and Canadian context.
          </p>
        </div>

        {/* Rich hub cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {topics.map((topic) => {
            const Icon = topic.icon;
            return (
              <div
                key={topic.name}
                className="flex flex-col bg-slate-800 border border-slate-700 rounded-xl p-6 hover:border-slate-600 transition-all"
              >
                {/* Header row: icon + name + count */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-amber-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-50">
                      {topic.name}
                    </h2>
                  </div>
                </div>

                {/* Count badge */}
                <div className="mb-4">
                  <span className="inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 uppercase tracking-wide">
                    {topic.countLabel}
                  </span>
                </div>

                {/* Description */}
                <p className="text-slate-300 text-sm leading-relaxed mb-5 flex-grow">
                  {topic.description}
                </p>

                {/* Featured items */}
                {topic.teasers.length > 0 && (
                  <div className="mb-5">
                    <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
                      {topic.teaserHeading}
                    </h3>
                    <ul className="space-y-1.5">
                      {topic.teasers.map((teaser) => (
                        <li key={teaser.slug}>
                          <Link
                            href={teaser.slug}
                            className="text-sm text-slate-300 hover:text-amber-400 transition-colors inline-flex items-center gap-1.5"
                          >
                            <span className="text-slate-600">→</span>
                            {teaser.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Browse all CTA */}
                <Link
                  href={topic.href}
                  className="group inline-flex items-center justify-between gap-2 px-4 py-2.5 bg-slate-700 hover:bg-amber-500 text-slate-100 hover:text-slate-900 font-semibold rounded-lg transition-colors"
                >
                  Browse all
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            );
          })}
        </div>

        {/* Footer note */}
        <div className="border-t border-slate-800 pt-8">
          <p className="text-sm text-slate-500">
            All hubs are built around evidence-rated interventions with safety
            profiles and Canadian context.
          </p>
        </div>
      </div>
    </div>
  );
}
