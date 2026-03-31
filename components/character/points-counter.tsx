'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Settings, Minus, Plus, AlertTriangle, Coins, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { PointsCalculation } from '@/hooks/use-points-system';

interface PointsCounterProps {
  totalPoints: number;
  calculation: PointsCalculation;
  isEnabled: boolean;
  onUpdateSettings?: (settings: { enabled: boolean; totalPoints: number }) => void;
}

export function PointsCounter({
  totalPoints,
  calculation,
  isEnabled,
  onUpdateSettings,
}: PointsCounterProps) {
  const [showSettings, setShowSettings] = useState(false);
  const [localTotal, setLocalTotal] = useState(totalPoints);
  const [localEnabled, setLocalEnabled] = useState(isEnabled);

  const { remaining, attributesSpent, powersSpent, specialtiesSpent } = calculation;
  const isNegative = remaining < 0;
  const isZero = remaining === 0;

  const handleSaveSettings = () => {
    onUpdateSettings?.({
      enabled: localEnabled,
      totalPoints: localTotal,
    });
    setShowSettings(false);
  };

  const handleCancelSettings = () => {
    setLocalTotal(totalPoints);
    setLocalEnabled(isEnabled);
    setShowSettings(false);
  };

  // Se o sistema estiver desativado e o usuário não estiver vendo configurações, mostra botão para ativar
  if (!isEnabled && !showSettings) {
    return (
      <div className="fixed top-20 right-4 z-50">
        <button
          onClick={() => setShowSettings(true)}
          className={cn(
            'flex items-center gap-2 px-3 py-2',
            'bg-muted text-muted-foreground',
            'border-2 border-foreground rounded-lg',
            'shadow-[2px_2px_0_0_#2f2f2e]',
            'hover:bg-muted/80 transition-colors'
          )}
        >
          <EyeOff className="w-4 h-4" />
          <span className="text-sm font-semibold">Pontos Desativados</span>
          <Settings className="w-4 h-4 ml-1" />
        </button>
      </div>
    );
  }

  return (
   <div className="fixed top-20 right-4 z-50">
      {/* Main Counter */}
      <div
        className={cn(
          'relative border-4 border-foreground rounded-lg p-4',
          'shadow-[4px_4px_0_0_#2f2f2e]',
          'transition-colors duration-200',
          isNegative
            ? 'bg-red-500 text-white'
            : isZero
              ? 'bg-yellow-500 text-white'
              : 'bg-primary text-primary-foreground'
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-4 mb-2">
          <div className="flex items-center gap-2">
            <Coins className="w-5 h-5" />
            <span className="font-bold uppercase tracking-wide text-sm">Pontos</span>
          </div>
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-1 hover:bg-white/20 rounded transition-colors"
            title="Configurar sistema de pontos"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>

        {/* Counter Display */}
        <div className="flex items-baseline gap-1">
          <span className={cn('text-4xl font-black font-serif', isNegative && 'text-white')}>
            {remaining}
          </span>
          <span className="text-sm font-medium opacity-80">/ {totalPoints}</span>
        </div>

        {/* Warning Indicator */}
        {isNegative && (
          <div className="flex items-center gap-1 mt-2 text-xs font-semibold">
            <AlertTriangle className="w-4 h-4" />
            <span>Excedeu o limite!</span>
          </div>
        )}

        {/* Breakdown Tooltip (hover) */}
        <div className="absolute top-full left-0 right-0 mt-2 p-3 bg-card border-2 border-foreground rounded-lg shadow-[4px_4px_0_0_#2f2f2e] opacity-0 hover:opacity-100 transition-opacity pointer-events-none group-hover:pointer-events-auto z-50">
          <p className="font-semibold text-sm mb-2 text-foreground">Detalhamento:</p>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between gap-4">
              <span className="text-muted-foreground">Atributos:</span>
              <span className="font-mono font-semibold">{attributesSpent}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-muted-foreground">Poderes:</span>
              <span className="font-mono font-semibold">{powersSpent}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-muted-foreground">Especialidades:</span>
              <span className="font-mono font-semibold">{specialtiesSpent}</span>
            </div>
            <div className="border-t border-foreground/20 pt-1 mt-1">
              <div className="flex justify-between gap-4">
                <span className="font-semibold">Total gasto:</span>
                <span className="font-mono font-bold">{calculation.totalSpent}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <div
          className={cn(
            'absolute top-full right-0 mt-2 w-64',
            'bg-card border-4 border-foreground rounded-lg',
            'shadow-[4px_4px_0_0_#2f2f2e]',
            'p-4 space-y-4'
          )}
        >
          <div className="flex items-center justify-between">
            <span className="font-semibold">Sistema Ativo</span>
            <button
              onClick={() => setLocalEnabled(!localEnabled)}
              className={cn(
                'w-12 h-6 rounded-full transition-colors relative',
                localEnabled ? 'bg-primary' : 'bg-muted'
              )}
            >
              <span
                className={cn(
                  'absolute top-1 w-4 h-4 rounded-full bg-white transition-all',
                  localEnabled ? 'left-7' : 'left-1'
                )}
              />
            </button>
          </div>

          {localEnabled && (
            <div className="space-y-2">
              <label className="text-sm font-semibold">Pontos Iniciais</label>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 border-2 border-foreground"
                  onClick={() => setLocalTotal(Math.max(0, localTotal - 5))}
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <input
                  type="number"
                  value={localTotal}
                  onChange={(e) => setLocalTotal(Math.max(0, parseInt(e.target.value) || 0))}
                  className="flex-1 h-8 text-center font-mono font-bold border-2 border-foreground rounded"
                />
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 border-2 border-foreground"
                  onClick={() => setLocalTotal(localTotal + 5)}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex gap-2">
                {[20, 40, 60, 80].map((preset) => (
                  <button
                    key={preset}
                    onClick={() => setLocalTotal(preset)}
                    className={cn(
                      'flex-1 py-1 text-xs font-semibold rounded border-2 transition-colors',
                      localTotal === preset
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'bg-muted border-foreground hover:bg-muted/80'
                    )}
                  >
                    {preset}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-2 pt-2 border-t-2 border-foreground/20">
            <button
              onClick={handleCancelSettings}
              className="flex-1 py-2 text-sm font-semibold rounded border-2 border-foreground hover:bg-muted transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={handleSaveSettings}
              className="flex-1 py-2 text-sm font-semibold rounded bg-primary text-primary-foreground border-2 border-foreground hover:bg-primary/90 transition-colors"
            >
              Salvar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
