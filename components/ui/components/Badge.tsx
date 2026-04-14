import { type HTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils/cn';
import { EVIDENCE_TIERS } from '@/lib/data/evidence-tiers';

const badgeVariants = cva(
  'inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-full',
  {
    variants: {
      variant: {
        default: 'bg-slate-700 text-slate-300',
        success: 'bg-emerald-500/20 text-emerald-400',
        warning: 'bg-amber-500/20 text-amber-400',
        danger: 'bg-red-500/20 text-red-400',
        info: 'bg-blue-500/20 text-blue-400',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant, className }))} {...props} />
  );
}

// Evidence Rating Types
export type EvidenceRating = 'A' | 'B' | 'C' | 'D' | 'F';

const evidenceConfig: Record<EvidenceRating, { label: string; className: string }> = {
  A: { label: 'Strong Evidence', className: 'bg-emerald-500/20 text-emerald-400' },
  B: { label: 'Good Evidence', className: 'bg-green-500/20 text-green-400' },
  C: { label: 'Moderate Evidence', className: 'bg-amber-500/20 text-amber-400' },
  D: { label: 'Weak Evidence', className: 'bg-orange-500/20 text-orange-400' },
  F: { label: 'No Evidence', className: 'bg-red-500/20 text-red-400' },
};

interface EvidenceBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  rating: EvidenceRating;
  showLabel?: boolean;
  /** When true, wraps the badge in a link to /methodology. Defaults to true. */
  linkToMethodology?: boolean;
}

export function EvidenceBadge({
  rating,
  showLabel = true,
  linkToMethodology = true,
  className,
  ...props
}: EvidenceBadgeProps) {
  const config = evidenceConfig[rating];
  const tier = EVIDENCE_TIERS.find((t) => t.grade === rating);
  const tooltip = tier
    ? `${tier.label}: ${tier.criteria} (editorial judgment — not a clinical endorsement)`
    : config.label;

  const badge = (
    <span
      className={cn(
        'inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-full',
        config.className,
        linkToMethodology && 'cursor-pointer',
        className
      )}
      title={tooltip}
      {...props}
    >
      {rating}{showLabel && ` - ${config.label}`}
    </span>
  );

  if (linkToMethodology) {
    return (
      <a href="/methodology" className="no-underline">
        {badge}
      </a>
    );
  }

  return badge;
}
