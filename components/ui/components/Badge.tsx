import { type HTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils/cn';
import { EVIDENCE_TIERS_MAP } from '@/lib/data/evidence-tiers';
import type { EvidenceRating } from '@/types';

export type { EvidenceRating };

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
  const tier = EVIDENCE_TIERS_MAP[rating];
  const tooltip = `${tier.label}: ${tier.criteria} (editorial judgment — not a clinical endorsement)`;

  const badge = (
    <span
      className={cn(
        'inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-full',
        tier.bgColour,
        tier.colour,
        linkToMethodology && 'cursor-pointer',
        className
      )}
      title={tooltip}
      {...props}
    >
      {rating}{showLabel && ` - ${tier.label}`}
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
