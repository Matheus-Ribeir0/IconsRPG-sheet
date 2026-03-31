'use client';

import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

interface ComicCardProps {
  children: ReactNode;
  variant?: 'default' | 'primary' | 'secondary' | 'tertiary' | 'surface';
  rotate?: -2 | -1 | 0 | 1 | 2;
  shadowSize?: 'none' | 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
}

const variantStyles = {
  default: 'bg-card text-card-foreground',
  primary: 'bg-primary text-primary-foreground',
  secondary: 'bg-secondary text-secondary-foreground',
  tertiary: 'bg-tertiary text-tertiary-foreground',
  surface: 'bg-muted text-foreground',
};

const rotateStyles = {
  '-2': '-rotate-2',
  '-1': '-rotate-1',
  '0': 'rotate-0',
  '1': 'rotate-1',
  '2': 'rotate-2',
};

const shadowStyles = {
  none: '',
  sm: 'shadow-[3px_3px_0_0_#2f2f2e]',
  md: 'shadow-[4px_4px_0_0_#2f2f2e]',
  lg: 'shadow-[6px_6px_0_0_#2f2f2e]',
};

export function ComicCard({
  children,
  variant = 'default',
  rotate = 0,
  shadowSize = 'md',
  className,
  onClick,
}: ComicCardProps) {
  const Component = onClick ? 'button' : 'div';

  return (
    <Component
      className={cn(
        'border-4 border-foreground rounded-lg p-4',
        'transition-all duration-200',
        variantStyles[variant],
        rotateStyles[String(rotate) as keyof typeof rotateStyles],
        shadowStyles[shadowSize],
        onClick && 'cursor-pointer hover:scale-[1.02] hover:shadow-[8px_8px_0_0_#2f2f2e] active:scale-[0.98] active:shadow-[2px_2px_0_0_#2f2f2e]',
        className
      )}
      onClick={onClick}
    >
      {children}
    </Component>
  );
}
