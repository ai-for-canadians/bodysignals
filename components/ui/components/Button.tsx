import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils/cn';

const buttonVariants = cva(
  'inline-flex items-center justify-center font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        primary:
          'bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-slate-900 focus:ring-amber-500',
        secondary:
          'border border-slate-600 hover:border-slate-500 hover:bg-slate-800 text-slate-50 focus:ring-slate-500',
        ghost:
          'text-slate-400 hover:text-slate-50 hover:bg-slate-800 focus:ring-slate-500',
        danger:
          'bg-red-600 hover:bg-red-500 text-white focus:ring-red-500',
      },
      size: {
        sm: 'text-sm px-4 py-2 rounded-md',
        md: 'text-base px-6 py-3 rounded-lg',
        lg: 'text-lg px-8 py-4 rounded-lg',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';
