'use client';

import { cn } from '@/lib/utils';
import { ChevronDown, ChevronUp, Trash2, Plus, X, Minus } from 'lucide-react';
import { useState } from 'react';
import type { Power } from '@/lib/types';
import { ATTRIBUTE_LEVEL_NAMES, getAttributeColor } from '@/lib/types';

interface PowerCardProps {
  power: Power;
  editable?: boolean;
  onDelete?: () => void;
  onUpdate?: (power: Power) => void;
}

export function PowerCard({
  power,
  editable = false,
  onDelete,
  onUpdate,
}: PowerCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [newExtra, setNewExtra] = useState('');
  const [newLimit, setNewLimit] = useState('');
  
  const levelName = ATTRIBUTE_LEVEL_NAMES[power.level] || 'Desconhecido';
  const colorType = getAttributeColor(power.level);

  const colorStyles = {
    red: 'text-[#ba001e] bg-red-50',
    yellow: 'text-[#b8860b] bg-yellow-50',
    blue: 'text-[#0057be] bg-blue-50',
    purple: 'text-[#7c3aed] bg-purple-50',
    shiny: 'text-[#d4af37] bg-gradient-to-r from-yellow-100 to-amber-100',
  };

  const handleLevelChange = (newLevel: number) => {
    if (onUpdate && newLevel >= 1 && newLevel <= 10) {
      onUpdate({ ...power, level: newLevel });
    }
  };

  const addExtra = () => {
    if (newExtra.trim() && onUpdate) {
      onUpdate({ ...power, extras: [...power.extras, newExtra.trim()] });
      setNewExtra('');
    }
  };

  const removeExtra = (index: number) => {
    if (onUpdate) {
      const extras = power.extras.filter((_, i) => i !== index);
      onUpdate({ ...power, extras });
    }
  };

  const addLimit = () => {
    if (newLimit.trim() && onUpdate) {
      onUpdate({ ...power, limits: [...power.limits, newLimit.trim()] });
      setNewLimit('');
    }
  };

  const removeLimit = (index: number) => {
    if (onUpdate) {
      const limits = power.limits.filter((_, i) => i !== index);
      onUpdate({ ...power, limits });
    }
  };

  return (
    <div
      className={cn(
        'border-3 border-foreground rounded-lg overflow-hidden',
        'bg-card shadow-[3px_3px_0_0_#2f2f2e]',
        'transition-all duration-200'
      )}
    >
      {/* Header */}
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className={cn(
          'w-full flex items-center justify-between p-3',
          'bg-secondary text-secondary-foreground',
          'hover:bg-secondary/90 transition-colors'
        )}
      >
        <div className="flex items-center gap-3">
          {editable ? (
            <input
              type="text"
              value={power.name}
              onChange={(e) => onUpdate?.({ ...power, name: e.target.value })}
              onClick={(e) => e.stopPropagation()}
              className={cn(
                'bg-transparent font-bold text-lg',
                'border-b-2 border-secondary-foreground/30',
                'focus:outline-none focus:border-secondary-foreground',
                'max-w-[200px]'
              )}
            />
          ) : (
            <span className="font-bold text-lg">{power.name}</span>
          )}
          
          <span className={cn(
            'px-2 py-0.5 text-xs font-bold rounded border-2 border-foreground',
            colorStyles[colorType]
          )}>
            {power.level} - {levelName}
          </span>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5" />
        ) : (
          <ChevronDown className="w-5 h-5" />
        )}
      </button>

      {/* Content */}
      {isExpanded && (
        <div className="p-4 space-y-4">
          {/* Level Controls */}
          {editable && (
            <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
              <span className="font-mono text-xs font-bold uppercase">Nível:</span>
              <button
                type="button"
                onClick={() => handleLevelChange(power.level - 1)}
                disabled={power.level <= 1}
                className="p-1 rounded border-2 border-foreground bg-card hover:bg-muted disabled:opacity-30"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className={cn('text-2xl font-black w-8 text-center', colorStyles[colorType].split(' ')[0])}>
                {power.level}
              </span>
              <button
                type="button"
                onClick={() => handleLevelChange(power.level + 1)}
                disabled={power.level >= 10}
                className="p-1 rounded border-2 border-foreground bg-card hover:bg-muted disabled:opacity-30"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Description */}
          {editable ? (
            <textarea
              value={power.description}
              onChange={(e) => onUpdate?.({ ...power, description: e.target.value })}
              className={cn(
                'w-full p-2 rounded border-2 border-foreground',
                'bg-input text-foreground',
                'focus:outline-none focus:ring-2 focus:ring-primary',
                'resize-none'
              )}
              rows={3}
              placeholder="Descrição do poder..."
            />
          ) : (
            power.description && <p className="text-sm">{power.description}</p>
          )}

          {/* Extras */}
          <div>
            <span className="font-mono text-xs font-bold uppercase text-chart-4 flex items-center gap-1">
              <Plus className="w-3 h-3" />
              Extras:
            </span>
            <div className="flex flex-wrap gap-1 mt-2">
              {power.extras.map((extra, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1 px-2 py-0.5 text-xs bg-chart-4 text-white rounded border border-foreground"
                >
                  {extra}
                  {editable && (
                    <button
                      type="button"
                      onClick={() => removeExtra(i)}
                      className="hover:text-red-200"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </span>
              ))}
              {power.extras.length === 0 && !editable && (
                <span className="text-xs text-muted-foreground italic">Nenhum extra</span>
              )}
            </div>
            {editable && (
              <div className="flex gap-2 mt-2">
                <input
                  type="text"
                  value={newExtra}
                  onChange={(e) => setNewExtra(e.target.value)}
                  placeholder="Adicionar extra..."
                  className="flex-1 px-2 py-1 text-xs bg-input border border-foreground rounded"
                  onKeyDown={(e) => e.key === 'Enter' && addExtra()}
                />
                <button
                  type="button"
                  onClick={addExtra}
                  className="px-2 py-1 bg-chart-4 text-white text-xs rounded border border-foreground hover:bg-chart-4/80"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>

          {/* Limits */}
          <div>
            <span className="font-mono text-xs font-bold uppercase text-primary flex items-center gap-1">
              <Minus className="w-3 h-3" />
              Limites:
            </span>
            <div className="flex flex-wrap gap-1 mt-2">
              {power.limits.map((limit, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1 px-2 py-0.5 text-xs bg-primary text-primary-foreground rounded border border-foreground"
                >
                  {limit}
                  {editable && (
                    <button
                      type="button"
                      onClick={() => removeLimit(i)}
                      className="hover:text-red-200"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </span>
              ))}
              {power.limits.length === 0 && !editable && (
                <span className="text-xs text-muted-foreground italic">Nenhum limite</span>
              )}
            </div>
            {editable && (
              <div className="flex gap-2 mt-2">
                <input
                  type="text"
                  value={newLimit}
                  onChange={(e) => setNewLimit(e.target.value)}
                  placeholder="Adicionar limite..."
                  className="flex-1 px-2 py-1 text-xs bg-input border border-foreground rounded"
                  onKeyDown={(e) => e.key === 'Enter' && addLimit()}
                />
                <button
                  type="button"
                  onClick={addLimit}
                  className="px-2 py-1 bg-primary text-primary-foreground text-xs rounded border border-foreground hover:bg-primary/80"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>

          {/* Delete button */}
          {editable && onDelete && (
            <button
              type="button"
              onClick={onDelete}
              className={cn(
                'flex items-center gap-2 px-3 py-1.5',
                'text-sm font-bold text-primary',
                'border-2 border-primary rounded',
                'hover:bg-primary hover:text-primary-foreground',
                'transition-colors'
              )}
            >
              <Trash2 className="w-4 h-4" />
              Remover Poder
            </button>
          )}
        </div>
      )}
    </div>
  );
}
