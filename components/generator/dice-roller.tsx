'use client';

import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

interface DiceRollerProps {
  isRolling: boolean;
  value?: number;
  size?: 'sm' | 'md' | 'lg';
}

const sizeStyles = {
  sm: 'w-10 h-10 text-lg',
  md: 'w-16 h-16 text-2xl',
  lg: 'w-20 h-20 text-3xl',
};

export function DiceRoller({ isRolling, value, size = 'md' }: DiceRollerProps) {
  const [displayValue, setDisplayValue] = useState(value || 1);

  useEffect(() => {
    if (isRolling) {
      const interval = setInterval(() => {
        setDisplayValue(Math.floor(Math.random() * 6) + 1);
      }, 50);

      return () => clearInterval(interval);
    } else if (value !== undefined) {
      setDisplayValue(value);
    }
  }, [isRolling, value]);

  return (
    <div
      className={cn(
        'relative flex items-center justify-center',
        'bg-card border-4 border-foreground rounded-lg',
        'shadow-[4px_4px_0_0_#2f2f2e]',
        'font-black',
        sizeStyles[size],
        isRolling && 'animate-bounce'
      )}
    >
      {/* Dice dots pattern */}
      <div className="absolute inset-1 opacity-10">
        <div className="grid grid-cols-3 gap-0.5 h-full">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
            <div key={i} className="bg-foreground rounded-full" />
          ))}
        </div>
      </div>

      {/* Value */}
      <span className={cn(
        'relative z-10',
        isRolling && 'text-primary'
      )}>
        {displayValue}
      </span>
    </div>
  );
}

export function DoubleDiceRoller({ isRolling, values }: { isRolling: boolean; values?: [number, number] }) {
  return (
    <div className="flex items-center gap-4">
      <DiceRoller
        isRolling={isRolling}
        value={values?.[0]}
        size="lg"
      />
      <span className="text-2xl font-black">+</span>
      <DiceRoller
        isRolling={isRolling}
        value={values?.[1]}
        size="lg"
      />
      {values && (
        <>
          <span className="text-2xl font-black">=</span>
          <div className={cn(
            'w-16 h-16 flex items-center justify-center',
            'bg-primary text-primary-foreground',
            'border-4 border-foreground rounded-lg',
            'shadow-[4px_4px_0_0_#2f2f2e]',
            'text-3xl font-black'
          )}>
            {values[0] + values[1]}
          </div>
        </>
      )}
    </div>
  );
}
