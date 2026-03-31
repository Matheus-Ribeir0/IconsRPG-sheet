'use client';

import { cn } from '@/lib/utils';
import { X } from 'lucide-react';
import type { Specialty, SpecialtyTier } from '@/lib/types';
import { SPECIALTY_TIER_LABELS, SPECIALTY_TIER_BONUS } from '@/lib/types';

interface SpecialtyChipProps {
  specialty: Specialty;
  editable?: boolean;
  onRemove?: () => void;
  onTierChange?: (tier: SpecialtyTier) => void;
}

const tierStyles: Record<SpecialtyTier, string> = {
  standard: 'bg-muted text-foreground border-foreground',
  expert: 'bg-secondary/20 text-secondary border-secondary',
  master: 'bg-chart-5/20 text-chart-5 border-chart-5',
};

const tierBadgeStyles: Record<SpecialtyTier, string> = {
  standard: 'bg-muted-foreground text-card',
  expert: 'bg-secondary text-secondary-foreground',
  master: 'bg-chart-5 text-white',
};

export function SpecialtyChip({
  specialty,
  editable = false,
  onRemove,
  onTierChange,
}: SpecialtyChipProps) {
  const bonus = SPECIALTY_TIER_BONUS[specialty.tier];
  
  const cycleTier = () => {
    if (!editable || !onTierChange) return;
    
    const tiers: SpecialtyTier[] = ['standard', 'expert', 'master'];
    const currentIndex = tiers.indexOf(specialty.tier);
    const nextIndex = (currentIndex + 1) % tiers.length;
    onTierChange(tiers[nextIndex]);
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 px-3 py-1.5',
        'text-sm font-bold rounded-full',
        'border-2',
        'shadow-[2px_2px_0_0_#2f2f2e]',
        tierStyles[specialty.tier],
        editable && 'cursor-pointer'
      )}
      onClick={cycleTier}
      title={editable ? `Clique para mudar: ${SPECIALTY_TIER_LABELS[specialty.tier]}` : undefined}
    >
      <span>{specialty.name}</span>
      
      {/* Tier Badge */}
      <span
        className={cn(
          'inline-flex items-center justify-center',
          'w-5 h-5 rounded-full text-xs font-black',
          tierBadgeStyles[specialty.tier]
        )}
      >
        +{bonus}
      </span>
      
      {editable && onRemove && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="ml-1 hover:text-primary transition-colors"
          aria-label={`Remover ${specialty.name}`}
        >
          <X className="w-3 h-3" />
        </button>
      )}
    </span>
  );
}
