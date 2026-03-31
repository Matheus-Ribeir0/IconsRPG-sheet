'use client';

import { cn } from '@/lib/utils';
import { ATTRIBUTE_LEVEL_NAMES, getAttributeColor } from '@/lib/types';
import { Minus, Plus } from 'lucide-react';

interface AttributeCardProps {
  name: string;
  value: number;
  editable?: boolean;
  onChange?: (value: number) => void;
}

export function AttributeCard({
  name,
  value,
  editable = false,
  onChange,
}: AttributeCardProps) {
  const levelName = ATTRIBUTE_LEVEL_NAMES[value] || 'Desconhecido';
  const colorType = getAttributeColor(value);

  const colorStyles = {
    red: {
      value: 'text-[#ba001e]',
      label: 'text-[#ba001e]',
      bg: 'bg-red-50',
    },
    yellow: {
      value: 'text-[#b8860b]',
      label: 'text-[#b8860b]',
      bg: 'bg-yellow-50',
    },
    blue: {
      value: 'text-[#0057be]',
      label: 'text-[#0057be]',
      bg: 'bg-blue-50',
    },
    purple: {
      value: 'text-[#7c3aed]',
      label: 'text-[#7c3aed]',
      bg: 'bg-purple-50',
    },
    shiny: {
      value: 'text-[#d4af37]',
      label: 'text-[#d4af37]',
      bg: 'bg-gradient-to-br from-yellow-100 via-amber-50 to-yellow-200',
    },
  };

  const styles = colorStyles[colorType];

  const handleIncrement = () => {
    if (onChange && value < 10) {
      onChange(value + 1);
    }
  };

  const handleDecrement = () => {
    if (onChange && value > 1) {
      onChange(value - 1);
    }
  };

  return (
    <div
      className={cn(
        'relative p-4 rounded-lg',
        'border-4 border-foreground',
        'shadow-[4px_4px_0_0_#2f2f2e]',
        'bg-card transition-all duration-200',
        styles.bg,
        colorType === 'shiny' && 'animate-pulse'
      )}
    >
      {/* Shiny effect for level 10 */}
      {colorType === 'shiny' && (
        <div className="absolute inset-0 rounded-lg overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" />
        </div>
      )}

      {/* Attribute Name */}
      <div className={cn('text-center font-mono text-xs font-bold uppercase tracking-wider mb-2', styles.label)}>
        {name}
      </div>

      {/* Value Display */}
      <div className="flex items-center justify-center gap-2">
        {editable && (
          <button
            type="button"
            onClick={handleDecrement}
            disabled={value <= 1}
            className={cn(
              'p-1 rounded border-2 border-foreground',
              'bg-card hover:bg-muted transition-colors',
              'disabled:opacity-30 disabled:cursor-not-allowed'
            )}
            aria-label={`Diminuir ${name}`}
          >
            <Minus className="w-4 h-4" />
          </button>
        )}

        <span className={cn('text-6xl font-black font-serif italic', styles.value)}>
          {value}
        </span>

        {editable && (
          <button
            type="button"
            onClick={handleIncrement}
            disabled={value >= 10}
            className={cn(
              'p-1 rounded border-2 border-foreground',
              'bg-card hover:bg-muted transition-colors',
              'disabled:opacity-30 disabled:cursor-not-allowed'
            )}
            aria-label={`Aumentar ${name}`}
          >
            <Plus className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Level Name */}
      <div className={cn('text-center font-bold text-sm uppercase mt-2', styles.label)}>
        {levelName}
      </div>
    </div>
  );
}
