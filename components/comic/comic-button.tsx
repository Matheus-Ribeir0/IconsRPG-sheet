'use client';

import { cn } from '@/lib/utils';
import type { ReactNode, ButtonHTMLAttributes } from 'react';

interface ComicButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'tertiary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

const variantStyles = {
  primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
  secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/90',
  tertiary: 'bg-tertiary text-tertiary-foreground hover:bg-tertiary/90',
  outline: 'bg-transparent text-foreground border-foreground hover:bg-foreground/5',
};

const sizeStyles = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
};

export function ComicButton({
  children,
  variant = 'primary',
  size = 'md',
  className,
  disabled,
  ...props
}: ComicButtonProps) {
  return (
    <button
      className={cn(
        'font-bold uppercase tracking-wide',
        'border-3 border-foreground rounded-md',
        'shadow-[4px_4px_0_0_#2f2f2e]',
        'transition-all duration-150',
        'hover:shadow-[6px_6px_0_0_#2f2f2e] hover:-translate-y-0.5',
        'active:shadow-[2px_2px_0_0_#2f2f2e] active:translate-y-0.5',
        'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-[4px_4px_0_0_#2f2f2e] disabled:hover:translate-y-0',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
