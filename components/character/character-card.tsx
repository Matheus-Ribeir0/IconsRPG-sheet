'use client';

import { cn } from '@/lib/utils';
import type { Character } from '@/lib/types';
import { ORIGIN_LABELS } from '@/lib/types';
import { ComicCard } from '@/components/comic/comic-card';
import { Edit3, Trash2, Copy, User } from 'lucide-react';
import Link from 'next/link';

interface CharacterCardProps {
  character: Character;
  onDelete?: () => void;
  onDuplicate?: () => void;
}

const rotations: Array<-2 | -1 | 0 | 1 | 2> = [-1, 0, 1, -1, 1];

export function CharacterCard({
  character,
  onDelete,
  onDuplicate,
}: CharacterCardProps) {
  const rotation = rotations[Math.abs(character.id.charCodeAt(0)) % rotations.length];
  
  return (
    <ComicCard
      variant="surface"
      rotate={rotation}
      shadowSize="lg"
      className="group relative overflow-visible"
    >
      {/* Action buttons */}
      <div className={cn(
        'absolute -top-2 -right-2 z-10',
        'flex items-center gap-1',
        'opacity-0 group-hover:opacity-100',
        'transition-opacity duration-200'
      )}>
        {onDuplicate && (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onDuplicate();
            }}
            className={cn(
              'p-2 rounded-full',
              'bg-secondary text-secondary-foreground',
              'border-2 border-foreground',
              'shadow-[2px_2px_0_0_#2f2f2e]',
              'hover:shadow-[3px_3px_0_0_#2f2f2e] hover:-translate-y-0.5',
              'transition-all duration-150'
            )}
            title="Duplicar"
          >
            <Copy className="w-4 h-4" />
          </button>
        )}
        {onDelete && (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onDelete();
            }}
            className={cn(
              'p-2 rounded-full',
              'bg-primary text-primary-foreground',
              'border-2 border-foreground',
              'shadow-[2px_2px_0_0_#2f2f2e]',
              'hover:shadow-[3px_3px_0_0_#2f2f2e] hover:-translate-y-0.5',
              'transition-all duration-150'
            )}
            title="Excluir"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>

      <Link href={`/character/${character.id}`} className="block">
        <div className="flex gap-4">
          {/* Avatar */}
          <div className={cn(
            'w-20 h-20 flex-shrink-0',
            'bg-tertiary rounded-lg',
            'border-3 border-foreground',
            'shadow-[3px_3px_0_0_#2f2f2e]',
            'flex items-center justify-center',
            'overflow-hidden'
          )}>
            {character.imageUrl ? (
              <img
                src={character.imageUrl}
                alt={character.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <User className="w-10 h-10 text-foreground/50" />
            )}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <h3 className="font-serif font-black text-xl uppercase italic truncate">
              {character.name || 'Sem Nome'}
            </h3>
            {character.alias && (
              <p className="text-sm text-muted-foreground truncate">
                &ldquo;{character.alias}&rdquo;
              </p>
            )}
            <div className="mt-2 flex flex-wrap gap-2">
              <span className={cn(
                'px-2 py-0.5 text-xs font-bold uppercase',
                'bg-primary text-primary-foreground',
                'rounded border border-foreground'
              )}>
                {ORIGIN_LABELS[character.origin]}
              </span>
              <span className={cn(
                'px-2 py-0.5 text-xs font-bold',
                'bg-secondary text-secondary-foreground',
                'rounded border border-foreground'
              )}>
                {character.powers.length} Poderes
              </span>
            </div>
          </div>

          {/* Edit icon */}
          <div className="flex items-center">
            <Edit3 className="w-5 h-5 text-muted-foreground group-hover:text-secondary transition-colors" />
          </div>
        </div>

        {/* Stats preview */}
        <div className="mt-4 grid grid-cols-2 gap-2 text-center">
          <div className="p-2 bg-primary/10 rounded border border-primary/30">
            <span className="block text-xs font-mono uppercase text-muted-foreground">Energia</span>
            <span className="font-bold text-lg">{character.energyCurrent}/{character.energy}</span>
          </div>
          <div className="p-2 bg-secondary/10 rounded border border-secondary/30">
            <span className="block text-xs font-mono uppercase text-muted-foreground">Determinacao</span>
            <span className="font-bold text-lg">{character.determinationCurrent}/{character.determination}</span>
          </div>
        </div>
      </Link>
    </ComicCard>
  );
}
