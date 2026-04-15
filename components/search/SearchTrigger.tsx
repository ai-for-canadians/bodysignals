'use client';

import { Search } from 'lucide-react';
import { useSearchDialog } from './useSearchDialog';
import { SearchDialog } from './SearchDialog';

export function SearchTrigger() {
  const { isOpen, openSearch, closeSearch } = useSearchDialog();

  return (
    <>
      <button
        onClick={openSearch}
        className="flex items-center w-full max-w-xl pl-4 pr-3 py-3 border border-slate-700 rounded-lg bg-slate-800 text-slate-500 text-sm hover:border-amber-500/50 transition-colors text-left mb-12"
        aria-label="Search symptoms, conditions, and more"
      >
        <Search className="h-5 w-5 text-slate-500 mr-3 shrink-0" aria-hidden="true" />
        Search symptoms, conditions, and more…
        <kbd className="ml-auto hidden sm:inline-flex items-center gap-0.5 rounded border border-slate-600 bg-slate-700 px-1.5 py-0.5 text-xs text-slate-400">
          <span className="text-xs">&#8984;</span>K
        </kbd>
      </button>
      <SearchDialog isOpen={isOpen} onClose={closeSearch} />
    </>
  );
}
