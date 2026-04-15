'use client';

import {
  useState,
  useEffect,
  useRef,
  useCallback,
  type KeyboardEvent,
} from 'react';
import { useRouter } from 'next/navigation';
import { Search, X } from 'lucide-react';
import Fuse from 'fuse.js';
import Link from 'next/link';
import { EvidenceBadge } from '@/components/ui';
import { trackEvent } from '@/lib/analytics/plausible';
import type { SearchEntry, SearchEntryType } from '@/lib/search/types';
import type { EvidenceRating } from '@/types';

const TYPE_LABELS: Record<SearchEntryType, string> = {
  condition: 'Conditions',
  symptom: 'Symptoms',
  sleep: 'Sleep',
  movement: 'Movement',
  'adhd-system': 'ADHD Systems',
  'adhd-tool': 'ADHD Tools',
};

const TYPE_ORDER: SearchEntryType[] = [
  'condition',
  'symptom',
  'sleep',
  'adhd-system',
  'adhd-tool',
  'movement',
];

interface SearchDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchDialog({ isOpen, onClose }: SearchDialogProps) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchEntry[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // Fuse instance cached across open/close cycles
  const fuseRef = useRef<Fuse<SearchEntry> | null>(null);
  const indexLoadedRef = useRef(false);

  // Load index on first open
  useEffect(() => {
    if (!isOpen || indexLoadedRef.current) return;

    setIsLoading(true);
    fetch('/search-index.json')
      .then((res) => res.json())
      .then((data: SearchEntry[]) => {
        fuseRef.current = new Fuse(data, {
          keys: [
            { name: 'title', weight: 2 },
            { name: 'tags', weight: 1.5 },
            { name: 'description', weight: 1 },
            { name: 'category', weight: 0.5 },
          ],
          threshold: 0.35,
          includeScore: true,
          minMatchCharLength: 2,
        });
        indexLoadedRef.current = true;
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, [isOpen]);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
      setResults([]);
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Set inert on body content when dialog is open
  useEffect(() => {
    const mainContent = document.getElementById('main-content');
    const header = document.querySelector('header');
    const footer = document.querySelector('footer');

    if (isOpen) {
      mainContent?.setAttribute('inert', '');
      header?.setAttribute('inert', '');
      footer?.setAttribute('inert', '');
    } else {
      mainContent?.removeAttribute('inert');
      header?.removeAttribute('inert');
      footer?.removeAttribute('inert');
    }

    return () => {
      mainContent?.removeAttribute('inert');
      header?.removeAttribute('inert');
      footer?.removeAttribute('inert');
    };
  }, [isOpen]);

  // Debounced search
  useEffect(() => {
    if (!query.trim() || !fuseRef.current) {
      setResults([]);
      setSelectedIndex(0);
      return;
    }

    const timer = setTimeout(() => {
      const fuseResults = fuseRef.current!.search(query, { limit: 20 });
      const entries = fuseResults.map((r) => r.item);
      setResults(entries);
      setSelectedIndex(0);

      // Note: trackEvent is a no-op in development (Plausible only loads in production).
      // Verify events in the Plausible dashboard after production deploy.
      trackEvent('Search Used', {
        query: query.trim(),
        resultCount: String(entries.length),
      });
    }, 150);

    return () => clearTimeout(timer);
  }, [query]);

  // Scroll selected result into view
  useEffect(() => {
    const selected = listRef.current?.querySelector('[aria-selected="true"]');
    selected?.scrollIntoView({ block: 'nearest' });
  }, [selectedIndex]);

  const flatResults = results;

  const navigate = useCallback(
    (route: string) => {
      router.push(route);
      onClose();
    },
    [router, onClose],
  );

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev < flatResults.length - 1 ? prev + 1 : 0,
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev > 0 ? prev - 1 : flatResults.length - 1,
      );
    } else if (e.key === 'Enter' && flatResults[selectedIndex]) {
      e.preventDefault();
      navigate(flatResults[selectedIndex].route);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    }
  }

  // Group results by type for display
  const grouped = TYPE_ORDER.map((type) => ({
    type,
    label: TYPE_LABELS[type],
    items: flatResults.filter((r) => r.type === type),
  })).filter((g) => g.items.length > 0);

  // Compute flat index for each item across groups
  function getFlatIndex(groupIdx: number, itemIdx: number): number {
    let count = 0;
    for (let i = 0; i < groupIdx; i++) {
      count += grouped[i].items.length;
    }
    return count + itemIdx;
  }

  if (!isOpen) return null;

  const resultCount = flatResults.length;
  const hasQuery = query.trim().length > 0;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Backdrop */}
      <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm" aria-hidden="true" />

      {/* Dialog */}
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label="Search Body Signals"
        className="relative w-full max-w-xl bg-slate-800 border border-slate-700 rounded-xl shadow-2xl flex flex-col overflow-hidden"
      >
        {/* Search input */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-700">
          <Search className="w-5 h-5 text-slate-400 shrink-0" aria-hidden="true" />
          <input
            ref={inputRef}
            type="text"
            role="combobox"
            aria-expanded={resultCount > 0}
            aria-controls="search-results-listbox"
            aria-activedescendant={
              resultCount > 0 ? `search-result-${selectedIndex}` : undefined
            }
            aria-autocomplete="list"
            aria-label="Search"
            placeholder="Search conditions, symptoms, interventions…"
            className="flex-1 bg-transparent text-slate-50 placeholder-slate-500 text-sm outline-none"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-slate-400 hover:text-slate-50"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" aria-hidden="true" />
            </button>
          )}
          <kbd className="hidden sm:inline-flex items-center gap-0.5 rounded border border-slate-600 bg-slate-700 px-1.5 py-0.5 text-xs text-slate-400">
            Esc
          </kbd>
        </div>

        {/* Live region for screen readers */}
        <div aria-live="polite" aria-atomic="true" className="sr-only">
          {hasQuery && resultCount > 0 && `${resultCount} results found`}
          {hasQuery && resultCount === 0 && !isLoading && 'No results found'}
        </div>

        {/* Results */}
        <div
          ref={listRef}
          id="search-results-listbox"
          role="listbox"
          aria-label="Search results"
          className="max-h-[70vh] overflow-y-auto"
        >
          {isLoading && (
            <div className="px-4 py-8 text-center text-slate-400 text-sm">
              Loading search index…
            </div>
          )}

          {!isLoading && hasQuery && resultCount === 0 && (
            <div className="px-4 py-8 text-center">
              <p className="text-slate-400 text-sm mb-3">
                No results for &ldquo;{query}&rdquo;
              </p>
              <p className="text-slate-500 text-xs">
                Try browsing{' '}
                <Link
                  href="/symptoms"
                  onClick={onClose}
                  className="text-amber-500 hover:text-amber-400 underline"
                >
                  by body area
                </Link>
                ,{' '}
                <Link
                  href="/topics"
                  onClick={onClose}
                  className="text-amber-500 hover:text-amber-400 underline"
                >
                  by topic
                </Link>
                , or use the feedback button to request this content.
              </p>
            </div>
          )}

          {grouped.map((group, groupIdx) => (
            <div key={group.type}>
              <div className="px-4 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider bg-slate-800/50 sticky top-0">
                {group.label}
              </div>
              {group.items.map((item, itemIdx) => {
                const flatIdx = getFlatIndex(groupIdx, itemIdx);
                const isSelected = flatIdx === selectedIndex;
                return (
                  <div
                    key={item.id}
                    id={`search-result-${flatIdx}`}
                    role="option"
                    aria-selected={isSelected}
                    className={`px-4 py-3 cursor-pointer transition-colors ${
                      isSelected
                        ? 'bg-slate-700/50 border-l-2 border-amber-500'
                        : 'border-l-2 border-transparent hover:bg-slate-700/30'
                    }`}
                    onClick={() => navigate(item.route)}
                    onMouseEnter={() => setSelectedIndex(flatIdx)}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium text-slate-50">
                        {item.title}
                      </span>
                      <span className="text-xs text-slate-400 bg-slate-700 rounded px-1.5 py-0.5">
                        {item.category}
                      </span>
                      {item.evidenceRating && (
                        <EvidenceBadge
                          rating={item.evidenceRating as EvidenceRating}
                          showLabel={false}
                          linkToMethodology={false}
                        />
                      )}
                    </div>
                    <p className="text-xs text-slate-400 line-clamp-1">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* Footer hint */}
        {!hasQuery && !isLoading && (
          <div className="px-4 py-3 border-t border-slate-700 text-xs text-slate-500">
            Type to search conditions, symptoms, and interventions
          </div>
        )}
      </div>
    </div>
  );
}
