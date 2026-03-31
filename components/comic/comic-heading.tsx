'use client';

import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

interface ComicHeadingProps {
  children: ReactNode;
  level?: 1 | 2 | 3 | 4;
  variant?: 'default' | 'primary' | 'secondary' | 'shadow';
  className?: string;
}

const levelStyles = {
  1: 'text-4xl md:text-5xl lg:text-6xl',
  2: 'text-3xl md:text-4xl',
  3: 'text-2xl md:text-3xl',
  4: 'text-xl md:text-2xl',
};

const variantStyles = {
  default: 'text-foreground',
  primary: 'text-primary',
  secondary: 'text-secondary',
  shadow: 'text-foreground [text-shadow:3px_3px_0_#ba001e,-1px_-1px_0_#0057be]',
};

export function ComicHeading({
  children,
  level = 1,
  variant = 'default',
  className,
}: ComicHeadingProps) {
  const Tag = `h${level}` as const;

  return (
    <Tag
      className={cn(
        'font-serif font-black uppercase italic tracking-tight',
        levelStyles[level],
        variantStyles[variant],
        className
      )}
    >
      {children}
    </Tag>
  );
}
