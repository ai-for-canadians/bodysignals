'use client';

import { useMemo, useState } from 'react';
import { Moon, Search, X } from 'lucide-react';
import type { EvidenceRating, SleepIntervention } from '@/types';
import { EvidenceScaleLegend } from '@/components/shared/EvidenceScaleLegend';
import { SleepInterventionCard } from './SleepInterventionCard';
import {
  SLEEP_CATEGORY_DISPLAY_ORDER,
  SLEEP_CATEGORY_LABELS,
} from '@/lib/data/sleep';

interface SleepLibraryProps {
  interventions: SleepIntervention[];
}

type FilterCategory = 'all' | SleepIntervention['category'];
type EvidenceFilter = 'any' | 'A' | 'B' | 'C+D';

const EVIDENCE_ORDER: EvidenceRating[] = ['A', 'B', 'C', 'D', 'F'];

function sortInterventions(
  interventions: SleepIntervention[]
): SleepIntervention[] {
  // Default sort: evidence rating DESC, then alphabetical by name.
  return [...interventions].sort((a, b) => {
    const aIdx = EVIDENCE_ORDER.indexOf(a.evidenceRating);
    const bIdx = EVIDENCE_ORDER.indexOf(b.evidenceRating);
    if (aIdx !== bIdx) return aIdx - bIdx;
    return a.name.localeCompare(b.name);
  });
}

function matchesEvidence(
  rating: EvidenceRating,
  filter: EvidenceFilter
): boolean {
  if (filter === 'any') return true;
  if (filter === 'A') return rating === 'A';
  if (filter === 'B') return rating === 'B';
  if (filter === 'C+D') return rating === 'C' || rating === 'D';
  return true;
}

function hasSSRIContraindication(intervention: SleepIntervention): boolean {
  return intervention.safetyProfile.contraindications.some((c) =>
    /SSRI|antidepressant|serotonin/i.test(c)
  );
}

function hasPregnancyContraindication(
  intervention: SleepIntervention
): boolean {
  return intervention.safetyProfile.contraindications.some((c) =>
    /pregnanc/i.test(c)
  );
}

export function SleepLibrary({ interventions }: SleepLibraryProps) {
  const [activeCategory, setActiveCategory] = useState<FilterCategory>('all');
  const [evidenceFilter, setEvidenceFilter] = useState<EvidenceFilter>('any');
  const [query, setQuery] = useState('');
  const [safeWithSSRIs, setSafeWithSSRIs] = useState(false);
  const [safeInPregnancy, setSafeInPregnancy] = useState(false);

  // Only render safety toggles if at least one intervention in the library
  // has the corresponding contraindication data.
  const anyHasSSRIContra = useMemo(
    () => interventions.some(hasSSRIContraindication),
    [interventions]
  );
  const anyHasPregnancyContra = useMemo(
    () => interventions.some(hasPregnancyContraindication),
    [interventions]
  );

  // Category pill definitions with live counts.
  const categoryPills = useMemo(() => {
    const pills: Array<{ key: FilterCategory; label: string; count: number }> =
      [{ key: 'all', label: 'All', count: interventions.length }];
    for (const cat of SLEEP_CATEGORY_DISPLAY_ORDER) {
      const count = interventions.filter((i) => i.category === cat).length;
      if (count > 0) {
        pills.push({ key: cat, label: SLEEP_CATEGORY_LABELS[cat], count });
      }
    }
    return pills;
  }, [interventions]);

  // Evidence pills — mutually exclusive, AND-combinable with category.
  const evidencePills: Array<{ key: EvidenceFilter; label: string }> = [
    { key: 'any', label: 'Any evidence' },
    { key: 'A', label: 'A — Strong' },
    { key: 'B', label: 'B — Good' },
    { key: 'C+D', label: 'C / D — Moderate or weaker' },
  ];

  const filtered = useMemo(() => {
    let result = interventions;

    if (activeCategory !== 'all') {
      result = result.filter((i) => i.category === activeCategory);
    }

    result = result.filter((i) =>
      matchesEvidence(i.evidenceRating, evidenceFilter)
    );

    if (safeWithSSRIs) {
      result = result.filter((i) => !hasSSRIContraindication(i));
    }

    if (safeInPregnancy) {
      result = result.filter((i) => !hasPregnancyContraindication(i));
    }

    const q = query.trim().toLowerCase();
    if (q) {
      result = result.filter(
        (i) =>
          i.name.toLowerCase().includes(q) ||
          i.tagline.toLowerCase().includes(q)
      );
    }

    return sortInterventions(result);
  }, [
    interventions,
    activeCategory,
    evidenceFilter,
    query,
    safeWithSSRIs,
    safeInPregnancy,
  ]);

  const clearFilters = () => {
    setActiveCategory('all');
    setEvidenceFilter('any');
    setQuery('');
    setSafeWithSSRIs(false);
    setSafeInPregnancy(false);
  };

  const hasActiveFilters =
    activeCategory !== 'all' ||
    evidenceFilter !== 'any' ||
    query.length > 0 ||
    safeWithSSRIs ||
    safeInPregnancy;

  return (
    <div className="w-full bg-slate-900 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full text-amber-400 text-sm mb-6">
            <Moon className="w-4 h-4" />
            <span>
              {interventions.length} evidence-rated sleep interventions
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-50 mb-4">
            Sleep Hub
          </h1>
          <p className="text-xl text-slate-400">
            Evidence-rated interventions for falling asleep, staying asleep, and sleeping deeper — from free behavioural habits to supplements and clinical protocols. Every entry is graded on the A–F evidence scale.
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
            placeholder="Search by name or tagline..."
            aria-label="Search sleep interventions by name"
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
        <div className="flex flex-wrap gap-2 mb-4">
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

        {/* Evidence pills */}
        <div className="flex flex-wrap gap-2 mb-4">
          {evidencePills.map((pill) => {
            const active = evidenceFilter === pill.key;
            return (
              <button
                key={pill.key}
                type="button"
                onClick={() => setEvidenceFilter(pill.key)}
                aria-pressed={active}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors border ${
                  active
                    ? 'bg-amber-500/20 border-amber-500/60 text-amber-300'
                    : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-600'
                }`}
              >
                {pill.label}
              </button>
            );
          })}
        </div>

        {/* Safety toggles */}
        {(anyHasSSRIContra || anyHasPregnancyContra) && (
          <div className="flex flex-wrap gap-3 mb-10">
            {anyHasSSRIContra && (
              <label className="inline-flex items-center gap-2 text-sm text-slate-300 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={safeWithSSRIs}
                  onChange={(e) => setSafeWithSSRIs(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-600 bg-slate-800 text-amber-500 focus:ring-amber-500 focus:ring-offset-slate-900"
                />
                Safe with SSRIs
              </label>
            )}
            {anyHasPregnancyContra && (
              <label className="inline-flex items-center gap-2 text-sm text-slate-300 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={safeInPregnancy}
                  onChange={(e) => setSafeInPregnancy(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-600 bg-slate-800 text-amber-500 focus:ring-amber-500 focus:ring-offset-slate-900"
                />
                Safe in pregnancy
              </label>
            )}
          </div>
        )}

        {/* Result count */}
        <div className="mb-6 text-sm text-slate-500">
          Showing {filtered.length} of {interventions.length} interventions
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
            {filtered.map((intervention) => (
              <SleepInterventionCard
                key={intervention.id}
                intervention={intervention}
              />
            ))}
          </div>
        ) : (
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-12 text-center">
            <p className="text-slate-300 text-lg mb-4">
              No interventions match your filters
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
