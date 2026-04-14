'use client';

import { useMemo, useState } from 'react';
import { Search, Stethoscope, X } from 'lucide-react';
import type { Condition, ConditionCategory } from '@/types';
import { ConditionCard } from './ConditionCard';
import { EvidenceScaleLegend } from '@/components/shared/EvidenceScaleLegend';
import { CATEGORY_DISPLAY_ORDER, CATEGORY_LABELS } from '@/lib/data/conditions';

interface ConditionsLibraryProps {
  conditions: Condition[];
}

type FilterCategory = 'all' | ConditionCategory;

// Order used when rendering with the "All" pill active (body-system mental model).
const ALL_SORT_ORDER: ConditionCategory[] = [...CATEGORY_DISPLAY_ORDER];

function sortConditions(
  conditions: Condition[],
  category: FilterCategory
): Condition[] {
  const sorted = [...conditions];
  if (category !== 'all') {
    sorted.sort((a, b) => a.name.localeCompare(b.name));
    return sorted;
  }
  sorted.sort((a, b) => {
    const aIdx = ALL_SORT_ORDER.indexOf(a.category);
    const bIdx = ALL_SORT_ORDER.indexOf(b.category);
    const aRank = aIdx === -1 ? ALL_SORT_ORDER.length : aIdx;
    const bRank = bIdx === -1 ? ALL_SORT_ORDER.length : bIdx;
    if (aRank !== bRank) return aRank - bRank;
    return a.name.localeCompare(b.name);
  });
  return sorted;
}

export function ConditionsLibrary({ conditions }: ConditionsLibraryProps) {
  const [activeCategory, setActiveCategory] = useState<FilterCategory>('all');
  const [query, setQuery] = useState('');

  // Category pill definitions with live counts (derived, not magic numbers)
  const categoryPills = useMemo(() => {
    const pills: Array<{ key: FilterCategory; label: string; count: number }> = [
      { key: 'all', label: 'All', count: conditions.length },
    ];
    for (const cat of ALL_SORT_ORDER) {
      const count = conditions.filter((c) => c.category === cat).length;
      if (count > 0) {
        pills.push({ key: cat, label: CATEGORY_LABELS[cat], count });
      }
    }
    return pills;
  }, [conditions]);

  const filtered = useMemo(() => {
    let result = conditions;

    if (activeCategory !== 'all') {
      result = result.filter((c) => c.category === activeCategory);
    }

    const q = query.trim().toLowerCase();
    if (q) {
      result = result.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.tagline.toLowerCase().includes(q)
      );
    }

    return sortConditions(result, activeCategory);
  }, [conditions, activeCategory, query]);

  const clearFilters = () => {
    setActiveCategory('all');
    setQuery('');
  };

  const hasActiveFilters = activeCategory !== 'all' || query.length > 0;

  return (
    <div className="w-full bg-slate-900 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full text-amber-400 text-sm mb-6">
            <Stethoscope className="w-4 h-4" />
            <span>{conditions.length} conditions — evidence-rated</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-50 mb-4">
            Condition Library
          </h1>
          <p className="text-xl text-slate-400">
            Comprehensive guides for chronic, digestive, mental health, and other conditions — each with evidence-rated treatments, lifestyle factors, and Canadian and US provider context. Every intervention is graded on the A–F evidence scale.
          </p>
        </div>

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
            placeholder="Search conditions by name..."
            aria-label="Search conditions by name"
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
        <div className="flex flex-wrap gap-2 mb-10">
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
          Showing {filtered.length} of {conditions.length} conditions
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
            {filtered.map((condition) => (
              <ConditionCard key={condition.id} condition={condition} />
            ))}
          </div>
        ) : (
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-12 text-center">
            <p className="text-slate-300 text-lg mb-4">
              No conditions match your search
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
    </div>
  );
}
