'use client';

import { useMemo, useState } from 'react';
import { Search, Sparkles, X } from 'lucide-react';
import type { ADHDSystem } from '@/types';
import { ADHDSystemCard } from './ADHDSystemCard';
import { EvidenceScaleLegend } from '@/components/shared/EvidenceScaleLegend';
import {
  ADHD_CATEGORY_DISPLAY_ORDER,
  ADHD_CATEGORY_LABELS,
} from '@/lib/data/adhd';

interface ADHDLibraryProps {
  systems: ADHDSystem[];
}

type FilterCategory = 'all' | string;

// Impact and difficulty ordering for the default sort.
// Impact DESC first (Critical → High → Medium → Low), then Easy difficulty wins tiebreakers.
const IMPACT_ORDER: ADHDSystem['impact'][] = [
  'Critical',
  'High',
  'Medium',
  'Low',
];
const DIFFICULTY_ORDER: ADHDSystem['difficulty'][] = ['Easy', 'Medium', 'Hard'];

function sortSystems(systems: ADHDSystem[]): ADHDSystem[] {
  return [...systems].sort((a, b) => {
    const aImpact = IMPACT_ORDER.indexOf(a.impact);
    const bImpact = IMPACT_ORDER.indexOf(b.impact);
    if (aImpact !== bImpact) return aImpact - bImpact;
    const aDiff = DIFFICULTY_ORDER.indexOf(a.difficulty);
    const bDiff = DIFFICULTY_ORDER.indexOf(b.difficulty);
    if (aDiff !== bDiff) return aDiff - bDiff;
    return a.name.localeCompare(b.name);
  });
}

export function ADHDLibrary({ systems }: ADHDLibraryProps) {
  const [activeCategory, setActiveCategory] = useState<FilterCategory>('all');
  const [query, setQuery] = useState('');

  const categoryPills = useMemo(() => {
    const pills: Array<{ key: FilterCategory; label: string; count: number }> =
      [{ key: 'all', label: 'All', count: systems.length }];
    for (const cat of ADHD_CATEGORY_DISPLAY_ORDER) {
      const count = systems.filter((s) => s.category === cat).length;
      if (count > 0) {
        pills.push({
          key: cat,
          label: ADHD_CATEGORY_LABELS[cat] ?? cat,
          count,
        });
      }
    }
    return pills;
  }, [systems]);

  const filtered = useMemo(() => {
    let result = systems;

    if (activeCategory !== 'all') {
      result = result.filter((s) => s.category === activeCategory);
    }

    const q = query.trim().toLowerCase();
    if (q) {
      result = result.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.tagline.toLowerCase().includes(q)
      );
    }

    return sortSystems(result);
  }, [systems, activeCategory, query]);

  const clearFilters = () => {
    setActiveCategory('all');
    setQuery('');
  };

  const hasActiveFilters = activeCategory !== 'all' || query.length > 0;

  return (
    <div>
      {/* Evidence scale legend */}
      <div className="mb-6 max-w-xl">
        <EvidenceScaleLegend />
      </div>

      {/* Search input */}
      <div className="relative mb-6 max-w-xl">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 pointer-events-none" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search systems by name or tagline..."
          aria-label="Search ADHD systems by name"
          className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-11 pr-10 py-3 text-slate-50 placeholder-slate-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery('')}
            aria-label="Clear search"
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded text-slate-500 hover:text-slate-300 hover:bg-slate-700 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Category pills */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categoryPills.map((pill) => {
          const active = activeCategory === pill.key;
          return (
            <button
              key={pill.key}
              type="button"
              onClick={() => setActiveCategory(pill.key)}
              aria-pressed={active}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                active
                  ? 'bg-amber-500 text-slate-900'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {pill.label} ({pill.count})
            </button>
          );
        })}
      </div>

      {/* Result count */}
      <div className="mb-6 text-sm text-slate-500">
        Showing {filtered.length} of {systems.length} systems
        {hasActiveFilters && (
          <button
            type="button"
            onClick={clearFilters}
            className="ml-3 text-amber-400 hover:text-amber-300 font-medium transition-colors"
          >
            Clear filters
          </button>
        )}
      </div>

      {/* Grid or empty state */}
      {filtered.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((system) => (
            <ADHDSystemCard key={system.id} system={system} />
          ))}
        </div>
      ) : (
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-12 text-center">
          <Sparkles className="w-10 h-10 text-slate-600 mx-auto mb-4" />
          <p className="text-slate-300 text-lg mb-4">
            No systems match your filters
          </p>
          <button
            type="button"
            onClick={clearFilters}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-900 font-semibold rounded-lg transition-colors"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
