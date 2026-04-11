import { ExternalLink, Calendar, ListChecks, Wallet, Wand2, Tag, Smartphone, LayoutGrid } from 'lucide-react';
import type { ComponentType } from 'react';
import type { ADHDTool } from '@/types';

interface ADHDToolCardProps {
  tool: ADHDTool;
}

// Lookup map for the lucide icons we reference from adhd data.
// Using a map keeps this file tree-shake friendly and avoids dynamic requires.
const ICON_MAP: Record<string, ComponentType<{ className?: string }>> = {
  ListChecks,
  Calendar,
  Wallet,
  Wand2,
  Tag,
  Smartphone,
};

export function ADHDToolCard({ tool }: ADHDToolCardProps) {
  const Icon = ICON_MAP[tool.icon] ?? LayoutGrid;
  const isExternal = tool.url && tool.url !== '#' && tool.url.startsWith('http');

  const content = (
    <>
      <div className="flex items-start gap-4">
        <div className="shrink-0 w-12 h-12 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
          <Icon className="w-6 h-6 text-amber-400" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h4 className="text-base font-semibold text-slate-50 truncate">
              {tool.name}
            </h4>
            <span className="shrink-0 inline-flex items-center text-xs font-medium px-2 py-0.5 rounded bg-slate-700 text-slate-300">
              {tool.price}
            </span>
          </div>
          <p className="text-sm text-slate-400 leading-relaxed">
            {tool.description}
          </p>
          {isExternal && (
            <span className="inline-flex items-center gap-1 text-xs text-amber-400 mt-2 group-hover:text-amber-300 transition-colors">
              Visit site
              <ExternalLink className="w-3 h-3" />
            </span>
          )}
        </div>
      </div>
    </>
  );

  if (isExternal) {
    return (
      <a
        href={tool.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group block bg-slate-800 border border-slate-700 rounded-xl p-5 hover:border-slate-600 transition-all hover:bg-slate-750"
      >
        {content}
      </a>
    );
  }

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-5">
      {content}
    </div>
  );
}
