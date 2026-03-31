'use client';

import { cn } from '@/lib/utils';
import { ATTRIBUTE_LEVEL_NAMES } from '@/lib/types';

interface AttributeBarProps {
  name: string;
  value: number;
  maxValue?: number;
  colorVariant?: 'primary' | 'secondary' | 'tertiary';
  editable?: boolean;
  onChange?: (value: number) => void;
}

const colorStyles = {
  primary: 'bg-primary',
  secondary: 'bg-secondary',
  tertiary: 'bg-tertiary',
};

export function AttributeBar({
  name,
  value,
  maxValue = 10,
  colorVariant = 'primary',
  editable = false,
  onChange,
}: AttributeBarProps) {
  const percentage = (value / maxValue) * 100;
  const levelName = ATTRIBUTE_LEVEL_NAMES[value] || 'Desconhecido';

  const handleClick = (newValue: number) => {
    if (editable && onChange) {
      onChange(newValue);
    }
  };

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <span className="font-mono font-bold text-sm uppercase tracking-wide">
          {name}
        </span>
        <span className="font-sans text-sm font-semibold">
          {value} - {levelName}
        </span>
      </div>
      
      <div className="relative h-6 bg-muted border-3 border-foreground rounded overflow-hidden">
        {/* Background segments */}
        <div className="absolute inset-0 flex">
          {Array.from({ length: maxValue }).map((_, i) => (
            <button
              key={i}
              type="button"
              className={cn(
                'flex-1 border-r border-foreground/20 last:border-r-0',
                'transition-colors duration-150',
                editable && 'cursor-pointer hover:bg-foreground/10'
              )}
              onClick={() => handleClick(i + 1)}
              disabled={!editable}
              aria-label={`Definir ${name} como ${i + 1}`}
            />
          ))}
        </div>
        
        {/* Filled portion */}
        <div
          className={cn(
            'absolute inset-y-0 left-0 transition-all duration-300',
            colorStyles[colorVariant]
          )}
          style={{ width: `${percentage}%` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent" />
        </div>
        
        {/* Value indicator */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-bold text-sm text-foreground mix-blend-difference">
            {value}
          </span>
        </div>
      </div>
    </div>
  );
}
