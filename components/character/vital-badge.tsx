'use client';

import { cn } from '@/lib/utils';
import { Minus, Plus, Heart, Flame } from 'lucide-react';

interface VitalBadgeProps {
  label: string;
  current: number;
  max: number;
  variant?: 'energy' | 'determination';
  editable?: boolean;
  showLifeBar?: boolean;
  onChange?: (value: number) => void;
  onMaxChange?: (value: number) => void;
  allowMaxEdit?: boolean;
}

const variantStyles = {
  energy: {
    bg: 'bg-primary',
    text: 'text-primary-foreground',
    ring: 'ring-primary/50',
    icon: Heart,
    barColor: 'bg-primary',
  },
  determination: {
    bg: 'bg-secondary',
    text: 'text-secondary-foreground',
    ring: 'ring-secondary/50',
    icon: Flame,
    barColor: 'bg-secondary',
  },
};

export function VitalBadge({
  label,
  current,
  max,
  variant = 'energy',
  editable = false,
  showLifeBar = false,
  onChange,
  onMaxChange,
  allowMaxEdit = false,
}: VitalBadgeProps) {
  const styles = variantStyles[variant];
  const Icon = styles.icon;
  const percentage = max > 0 ? (current / max) * 100 : 0;
  
  // Determina a cor da barra baseada na porcentagem
  const getBarColor = () => {
    if (percentage <= 25) return 'bg-red-500';
    if (percentage <= 50) return 'bg-yellow-500';
    return styles.barColor;
  };
  
  const handleIncrement = () => {
    if (onChange && current < max) {
      onChange(current + 1);
    }
  };
  
  const handleDecrement = () => {
    if (onChange && current > 0) {
      onChange(current - 1);
    }
  };

  const handleMaxIncrement = () => {
    if (onMaxChange) {
      onMaxChange(max + 1);
    }
  };

  const handleMaxDecrement = () => {
    if (onMaxChange && max > 1) {
      onMaxChange(max - 1);
    }
  };

  return (
    <div className="flex flex-col items-center gap-2 w-full">
      <span className="font-mono font-bold text-xs uppercase tracking-wider flex items-center gap-1">
        <Icon className="w-4 h-4" />
        {label}
      </span>
      
      {/* Life Bar Style for Energy */}
      {showLifeBar && variant === 'energy' && (
        <div className="w-full space-y-2">
          {/* Health Bar */}
          <div className="relative h-8 w-full bg-muted border-3 border-foreground rounded-lg overflow-hidden shadow-[3px_3px_0_0_#2f2f2e]">
            <div
              className={cn(
                'absolute inset-y-0 left-0 transition-all duration-300',
                getBarColor()
              )}
              style={{ width: `${percentage}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent" />
            </div>
            
            {/* Segments */}
            <div className="absolute inset-0 flex">
              {Array.from({ length: max }).map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    'flex-1 border-r border-foreground/20 last:border-r-0',
                    editable && 'cursor-pointer hover:bg-white/20 transition-colors'
                  )}
                  onClick={() => editable && onChange?.(i + 1)}
                />
              ))}
            </div>

            {/* Value Text */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-black text-lg text-foreground drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]">
                {current} / {max}
              </span>
            </div>
          </div>

          {/* Quick +/- Buttons */}
          {editable && (
            <div className="flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={handleDecrement}
                disabled={current <= 0}
                className={cn(
                  'p-2 rounded-lg border-3 border-foreground',
                  'bg-primary text-primary-foreground',
                  'shadow-[2px_2px_0_0_#2f2f2e] active:shadow-none active:translate-x-[2px] active:translate-y-[2px]',
                  'hover:bg-primary/90 transition-all',
                  'disabled:opacity-50 disabled:cursor-not-allowed'
                )}
                aria-label={`Diminuir ${label}`}
              >
                <Minus className="w-5 h-5" />
              </button>
              
              <span className="text-sm font-bold text-muted-foreground px-2">
                Energia
              </span>
              
              <button
                type="button"
                onClick={handleIncrement}
                disabled={current >= max}
                className={cn(
                  'p-2 rounded-lg border-3 border-foreground',
                  'bg-chart-4 text-white',
                  'shadow-[2px_2px_0_0_#2f2f2e] active:shadow-none active:translate-x-[2px] active:translate-y-[2px]',
                  'hover:bg-chart-4/90 transition-all',
                  'disabled:opacity-50 disabled:cursor-not-allowed'
                )}
                aria-label={`Aumentar ${label}`}
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* Max Edit (when in full edit mode) */}
          {allowMaxEdit && (
            <div className="flex items-center justify-center gap-2 pt-1">
              <span className="text-xs font-mono text-muted-foreground">Máximo:</span>
              <button
                type="button"
                onClick={handleMaxDecrement}
                disabled={max <= 1}
                className="p-1 rounded border border-foreground/50 hover:bg-muted disabled:opacity-30"
              >
                <Minus className="w-3 h-3" />
              </button>
              <span className="text-sm font-bold w-6 text-center">{max}</span>
              <button
                type="button"
                onClick={handleMaxIncrement}
                className="p-1 rounded border border-foreground/50 hover:bg-muted"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* Badge Style for Determination or non-life-bar */}
      {(!showLifeBar || variant === 'determination') && (
        <div className="flex items-center gap-3">
          {editable && (
            <button
              type="button"
              onClick={handleDecrement}
              disabled={current <= 0}
              className={cn(
                'p-2 rounded-lg border-3 border-foreground',
                'bg-card hover:bg-muted transition-colors',
                'shadow-[2px_2px_0_0_#2f2f2e] active:shadow-none active:translate-x-[2px] active:translate-y-[2px]',
                'disabled:opacity-50 disabled:cursor-not-allowed'
              )}
              aria-label={`Diminuir ${label}`}
            >
              <Minus className="w-5 h-5" />
            </button>
          )}
          
          <div
            className={cn(
              'relative w-20 h-20 rounded-full',
              'border-4 border-foreground',
              'shadow-[4px_4px_0_0_#2f2f2e]',
              'flex items-center justify-center',
              styles.bg,
              styles.text
            )}
          >
            <div className="text-center">
              <span className="text-3xl font-black">{current}</span>
              <span className="text-sm font-bold">/{max}</span>
            </div>
            
            {/* Shine effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/30 via-transparent to-transparent" />
          </div>
          
          {editable && (
            <button
              type="button"
              onClick={handleIncrement}
              disabled={current >= max}
              className={cn(
                'p-2 rounded-lg border-3 border-foreground',
                'bg-card hover:bg-muted transition-colors',
                'shadow-[2px_2px_0_0_#2f2f2e] active:shadow-none active:translate-x-[2px] active:translate-y-[2px]',
                'disabled:opacity-50 disabled:cursor-not-allowed'
              )}
              aria-label={`Aumentar ${label}`}
            >
              <Plus className="w-5 h-5" />
            </button>
          )}
        </div>
      )}

      {/* Max Edit for Determination */}
      {allowMaxEdit && variant === 'determination' && (
        <div className="flex items-center justify-center gap-2 pt-1">
          <span className="text-xs font-mono text-muted-foreground">Máximo:</span>
          <button
            type="button"
            onClick={handleMaxDecrement}
            disabled={max <= 1}
            className="p-1 rounded border border-foreground/50 hover:bg-muted disabled:opacity-30"
          >
            <Minus className="w-3 h-3" />
          </button>
          <span className="text-sm font-bold w-6 text-center">{max}</span>
          <button
            type="button"
            onClick={handleMaxIncrement}
            className="p-1 rounded border border-foreground/50 hover:bg-muted"
          >
            <Plus className="w-3 h-3" />
          </button>
        </div>
      )}
    </div>
  );
}
