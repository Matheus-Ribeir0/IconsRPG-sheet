'use client';

import { useState, useMemo, useCallback } from 'react';
import type { Character, SpecialtyTier } from '@/lib/types';

interface PointsSystemConfig {
  enabled: boolean;
  totalPoints: number;
}

interface PointsCalculation {
  attributesSpent: number;
  powersSpent: number;
  specialtiesSpent: number;
  totalSpent: number;
  remaining: number;
}

interface UsePointsSystemReturn {
  config: PointsSystemConfig;
  calculation: PointsCalculation;
  updateConfig: (updates: Partial<PointsSystemConfig>) => void;
  canSpend: (amount: number) => boolean;
  hasEnoughPoints: boolean;
  isEnabled: boolean;
}

const DEFAULT_CONFIG: PointsSystemConfig = {
  enabled: true,
  totalPoints: 35,
};

// Custo base dos atributos (cada ponto acima de 0)
function calculateAttributesSpent(attributes: { prowess: number; coordination: number; strength: number; intellect: number; awareness: number; willpower: number }): number {
  return Object.values(attributes).reduce((sum, value) => sum + value, 0);
}

// Custo dos poderes (soma dos níveis de cada poder)
function calculatePowersSpent(powers: { level: number }[]): number {
  return powers.reduce((sum, power) => sum + power.level, 0);
}

// Custo das especialidades baseado no tier
const SPECIALTY_TIER_COSTS: Record<SpecialtyTier, number> = {
  standard: 1,
  expert: 2,
  master: 3,
};

function calculateSpecialtiesSpent(specialties: { tier: SpecialtyTier }[]): number {
  return specialties.reduce((sum, specialty) => sum + SPECIALTY_TIER_COSTS[specialty.tier], 0);
}

export function usePointsSystem(character: Character): UsePointsSystemReturn {
  const [config, setConfig] = useState<PointsSystemConfig>(DEFAULT_CONFIG);

  const calculation = useMemo((): PointsCalculation => {
    const attributesSpent = calculateAttributesSpent(character.attributes);
    const powersSpent = calculatePowersSpent(character.powers);
    const specialtiesSpent = calculateSpecialtiesSpent(character.specialties);
    const totalSpent = attributesSpent + powersSpent + specialtiesSpent;

    return {
      attributesSpent,
      powersSpent,
      specialtiesSpent,
      totalSpent,
      remaining: config.totalPoints - totalSpent,
    };
  }, [character.attributes, character.powers, character.specialties, config.totalPoints]);

  const updateConfig = useCallback((updates: Partial<PointsSystemConfig>) => {
    setConfig((prev) => ({ ...prev, ...updates }));
  }, []);

  const canSpend = useCallback((amount: number = 1): boolean => {
    if (!config.enabled) return true;
    return calculation.remaining >= amount;
  }, [config.enabled, calculation.remaining]);

  const hasEnoughPoints = calculation.remaining >= 0;
  const isEnabled = config.enabled;

  return {
    config,
    calculation,
    updateConfig,
    canSpend,
    hasEnoughPoints,
    isEnabled,
  };
}

export type { PointsSystemConfig, PointsCalculation };
