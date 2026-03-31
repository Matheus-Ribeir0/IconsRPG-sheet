// Icons: Assembled Edition - Character Types

export type Origin = 
  | 'trained' 
  | 'transformed' 
  | 'birthright' 
  | 'gimmick' 
  | 'artificial' 
  | 'unearthly';

export const ORIGIN_LABELS: Record<Origin, string> = {
  trained: 'Treinado',
  transformed: 'Transformado',
  birthright: 'Hereditário',
  gimmick: 'Artifício',
  artificial: 'Artificial',
  unearthly: 'Sobrenatural',
};

export interface Attributes {
  prowess: number;      // Proeza em combate
  coordination: number; // Coordenação motora
  strength: number;     // Vigor físico (ALTERADO de Força)
  intellect: number;    // Intelecto
  awareness: number;    // Percepção
  willpower: number;    // Força de vontade
}

export const ATTRIBUTE_LABELS: Record<keyof Attributes, string> = {
  prowess: 'Proeza',
  coordination: 'Coordenação',
  strength: 'Vigor',       // ALTERADO de 'Força'
  intellect: 'Intelecto',
  awareness: 'Percepção',
  willpower: 'Vontade',
};

export const ATTRIBUTE_LEVEL_NAMES: Record<number, string> = {
  1: 'Fraco',
  2: 'Pobre',
  3: 'Médio',
  4: 'Razoável',
  5: 'Bom',
  6: 'Ótimo',
  7: 'Incrível',
  8: 'Fantástico',
  9: 'Lendário',
  10: 'Supremo',
};

// Retorna a cor baseada no valor do atributo
export function getAttributeColor(value: number): string {
  if (value <= 2) return 'red';      // 1-2: Vermelho
  if (value === 3) return 'yellow';  // 3: Amarelo
  if (value <= 7) return 'blue';     // 4-7: Azul
  if (value <= 9) return 'purple';   // 8-9: Roxo
  return 'shiny';                    // 10: Shiny/Dourado
}

// Tipos de especialidade
export type SpecialtyTier = 'standard' | 'expert' | 'master';

export const SPECIALTY_TIER_LABELS: Record<SpecialtyTier, string> = {
  standard: 'Padrão',
  expert: 'Perito (+2)',
  master: 'Mestre (+3)',
};

export const SPECIALTY_TIER_BONUS: Record<SpecialtyTier, number> = {
  standard: 1,
  expert: 2,
  master: 3,
};

export interface Specialty {
  id: string;
  name: string;
  tier: SpecialtyTier;
}

export interface Power {
  id: string;
  name: string;
  level: number;
  description: string;
  type: string;
  extras: string[];
  limits: string[];
}

export interface Equipment {
  id: string;
  name: string;
  description: string;
}

export interface Character {
  id: string;
  name: string;
  alias: string;
  origin: Origin;
  
  // Condições (antigo "level" - conceitos do personagem)
  conditions: string[];
  
  // Qualidades e Desafios
  qualities: string[];
  challenges: string[];
  
  // Atributos (1-10)
  attributes: Attributes;
  
  // Derivados
  // Energia = Vigor (strength) + Vontade (willpower) ou manual
  energy: number;
  energyCurrent: number;
  energyManual: boolean; // Se true, não calcula automaticamente
  
  // Determinação = 6 - quantidade de poderes ou manual
  determination: number;
  determinationCurrent: number;
  determinationManual: boolean;
  
  // Poderes e Especialidades
  powers: Power[];
  specialties: Specialty[];
  
  // Novas seções
  equipment: Equipment[];
  background: string;
  notes: string;
  
  // Imagem do personagem (URL ou base64)
  imageUrl?: string;
  
  // Meta
  createdAt: string;
  updatedAt: string;
}

// Função auxiliar para criar um personagem vazio
export function createEmptyCharacter(): Character {
  return {
    id: crypto.randomUUID(),
    name: '',
    alias: '',
    origin: 'trained',
    conditions: [],
    qualities: [],
    challenges: [],
    attributes: {
      prowess: 3,
      coordination: 3,
      strength: 3,
      intellect: 3,
      awareness: 3,
      willpower: 3,
    },
    energy: 6,
    energyCurrent: 6,
    energyManual: false,
    determination: 6,
    determinationCurrent: 6,
    determinationManual: false,
    powers: [],
    specialties: [],
    equipment: [],
    background: '',
    notes: '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

// Calcular Energia (Vigor + Vontade)
export function calculateEnergy(attributes: Attributes): number {
  return attributes.strength + attributes.willpower;
}

// Calcular Determinação base (6 - quantidade de poderes)
export function calculateDetermination(powerCount: number): number {
  return Math.max(1, 6 - powerCount);
}
