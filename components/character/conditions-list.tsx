'use client';

import { cn } from '@/lib/utils';
import { X, Plus, Triangle } from 'lucide-react';
import { useState } from 'react';

interface ConditionsListProps {
  conditions: string[];
  editable?: boolean;
  onChange?: (conditions: string[]) => void;
}

export function ConditionsList({
  conditions,
  editable = false,
  onChange,
}: ConditionsListProps) {
  const [newCondition, setNewCondition] = useState('');

  const addCondition = () => {
    if (newCondition.trim() && onChange) {
      onChange([...conditions, newCondition.trim()]);
      setNewCondition('');
    }
  };

  const removeCondition = (index: number) => {
    if (onChange) {
      onChange(conditions.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="space-y-2">
      {conditions.map((condition, index) => (
        <div
          key={index}
          className={cn(
            'flex items-start gap-2 p-2',
            'bg-card rounded',
            'border-l-4 border-primary',
            '-skew-x-1'
          )}
        >
          <Triangle className="w-4 h-4 text-primary fill-primary flex-shrink-0 mt-0.5" />
          <span className="flex-1 font-bold italic text-sm uppercase tracking-tight skew-x-1">
            {condition}
          </span>
          {editable && (
            <button
              type="button"
              onClick={() => removeCondition(index)}
              className="text-primary hover:text-primary/70 skew-x-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      ))}
      
      {conditions.length === 0 && !editable && (
        <p className="text-muted-foreground text-sm italic text-center py-2">
          Nenhuma condição definida.
        </p>
      )}

      {editable && (
        <div className="flex gap-2 mt-3">
          <input
            type="text"
            value={newCondition}
            onChange={(e) => setNewCondition(e.target.value)}
            placeholder="Nova condição..."
            className={cn(
              'flex-1 px-3 py-2 text-sm',
              'bg-input border-2 border-foreground rounded',
              'focus:outline-none focus:ring-2 focus:ring-primary'
            )}
            onKeyDown={(e) => e.key === 'Enter' && addCondition()}
          />
          <button
            type="button"
            onClick={addCondition}
            className={cn(
              'px-3 py-2 rounded',
              'bg-primary text-primary-foreground',
              'border-2 border-foreground',
              'shadow-[2px_2px_0_0_#2f2f2e]',
              'hover:bg-primary/90 transition-colors',
              'active:shadow-none active:translate-x-[2px] active:translate-y-[2px]'
            )}
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
