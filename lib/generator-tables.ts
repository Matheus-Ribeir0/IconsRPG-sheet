// Generator Tables for Icons: Assembled Edition
// Placeholder structure - will be filled with actual tables from the book

import type { Origin, Character, Power, Attributes, Specialty } from './types';
import { createEmptyCharacter, calculateEnergy, calculateDetermination } from './types';

// Roll dice helper
export function rollDice(sides: number): number {
  return Math.floor(Math.random() * sides) + 1;
}

// Roll 2d6
export function roll2d6(): number {
  return rollDice(6) + rollDice(6);
}

// Origin Table (2d6)
// TODO: Replace with actual table from the book
export const ORIGIN_TABLE: Record<number, Origin> = {
  2: 'unearthly',
  3: 'unearthly',
  4: 'birthright',
  5: 'birthright',
  6: 'transformed',
  7: 'transformed',
  8: 'gimmick',
  9: 'gimmick',
  10: 'trained',
  11: 'artificial',
  12: 'artificial',
};

// Attribute Level Table (2d6)
// TODO: Replace with actual table from the book
export const ATTRIBUTE_TABLE: Record<number, number> = {
  2: 1,
  3: 2,
  4: 3,
  5: 3,
  6: 4,
  7: 4,
  8: 5,
  9: 5,
  10: 6,
  11: 7,
  12: 8,
};

// Power Categories
// TODO: Replace with actual powers from the book
export const POWER_CATEGORIES = [
  'Alteracao',
  'Controle',
  'Defesa',
  'Mental',
  'Movimento',
  'Ofensiva',
  'Sensorial',
];

// Sample Powers (placeholder)
// TODO: Replace with actual powers from the book
export const SAMPLE_POWERS: Array<{ name: string; category: string }> = [
  { name: 'Super-Forca', category: 'Ofensiva' },
  { name: 'Voo', category: 'Movimento' },
  { name: 'Invulnerabilidade', category: 'Defesa' },
  { name: 'Telepatia', category: 'Mental' },
  { name: 'Super-Velocidade', category: 'Movimento' },
  { name: 'Rajada de Energia', category: 'Ofensiva' },
  { name: 'Controle de Fogo', category: 'Controle' },
  { name: 'Controle de Gelo', category: 'Controle' },
  { name: 'Invisibilidade', category: 'Alteracao' },
  { name: 'Visao de Raio-X', category: 'Sensorial' },
  { name: 'Campo de Forca', category: 'Defesa' },
  { name: 'Teletransporte', category: 'Movimento' },
  { name: 'Regeneracao', category: 'Defesa' },
  { name: 'Metamorfose', category: 'Alteracao' },
  { name: 'Controle Mental', category: 'Mental' },
];

// Sample Specialties
// TODO: Replace with actual specialties from the book
export const SAMPLE_SPECIALTIES = [
  'Artes Marciais',
  'Ciencia',
  'Crime',
  'Direito',
  'Esporte',
  'Investigacao',
  'Lideranca',
  'Medicina',
  'Militar',
  'Ocultismo',
  'Performance',
  'Pilotar',
  'Psicologia',
  'Tecnologia',
  'Armas',
];

// Sample Qualities
// TODO: Replace with actual qualities from the book
export const SAMPLE_QUALITIES = [
  'Proteger os Inocentes',
  'Busca pela Justica',
  'Honra Acima de Tudo',
  'Sempre Ajuda Quem Precisa',
  'Defensor da Verdade',
  'Guardiao da Cidade',
  'Campeao do Povo',
  'Mentor de Herois',
];

// Sample Challenges
// TODO: Replace with actual challenges from the book
export const SAMPLE_CHALLENGES = [
  'Identidade Secreta',
  'Inimigo Jurado',
  'Dependencia de Poderes',
  'Responsabilidade Familiar',
  'Passado Sombrio',
  'Fraqueza Especifica',
  'Divida de Honra',
  'Sede de Vinganca',
];

// Sample Conditions
export const SAMPLE_CONDITIONS = [
  'Mudado pelo Homem, Escolhido pelos Espiritos',
  'Plantas do Deserto Sao Sobreviventes',
  'Afiado! Manuseie com Cuidado',
  'A Mente e a Arma mais Poderosa',
  'Com Grandes Poderes, Grandes Responsabilidades',
  'O Ultimo da Minha Especie',
  'Forjado no Fogo da Batalha',
];

// Generate random attributes
export function generateRandomAttributes(): Attributes {
  return {
    prowess: ATTRIBUTE_TABLE[roll2d6()],
    coordination: ATTRIBUTE_TABLE[roll2d6()],
    strength: ATTRIBUTE_TABLE[roll2d6()],
    intellect: ATTRIBUTE_TABLE[roll2d6()],
    awareness: ATTRIBUTE_TABLE[roll2d6()],
    willpower: ATTRIBUTE_TABLE[roll2d6()],
  };
}

// Generate random origin
export function generateRandomOrigin(): Origin {
  return ORIGIN_TABLE[roll2d6()];
}

// Generate random powers
export function generateRandomPowers(count: number = 3): Power[] {
  const shuffled = [...SAMPLE_POWERS].sort(() => Math.random() - 0.5);
  const selected = shuffled.slice(0, count);
  
  return selected.map(power => ({
    id: crypto.randomUUID(),
    name: power.name,
    level: ATTRIBUTE_TABLE[roll2d6()],
    description: `Poder de ${power.category}`,
    extras: [],
    limits: [],
  }));
}

// Generate random specialties with tiers
export function generateRandomSpecialties(count: number = 3): Specialty[] {
  const shuffled = [...SAMPLE_SPECIALTIES].sort(() => Math.random() - 0.5);
  const selected = shuffled.slice(0, count);
  
  return selected.map(name => ({
    id: crypto.randomUUID(),
    name,
    tier: 'standard' as const,
  }));
}

// Generate random qualities
export function generateRandomQualities(count: number = 2): string[] {
  const shuffled = [...SAMPLE_QUALITIES].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

// Generate random challenges
export function generateRandomChallenges(count: number = 2): string[] {
  const shuffled = [...SAMPLE_CHALLENGES].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

// Generate random conditions
export function generateRandomConditions(count: number = 2): string[] {
  const shuffled = [...SAMPLE_CONDITIONS].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

// Generate a complete random character
export function generateRandomCharacter(): Character {
  const character = createEmptyCharacter();
  
  const attributes = generateRandomAttributes();
  const powers = generateRandomPowers(rollDice(3) + 2); // 3-5 powers
  
  character.origin = generateRandomOrigin();
  character.attributes = attributes;
  character.powers = powers;
  character.specialties = generateRandomSpecialties(rollDice(3) + 1);
  character.qualities = generateRandomQualities(2);
  character.challenges = generateRandomChallenges(2);
  character.conditions = generateRandomConditions(rollDice(2));
  character.energy = calculateEnergy(attributes);
  character.energyCurrent = character.energy;
  character.determination = calculateDetermination(powers.length);
  character.determinationCurrent = character.determination;
  
  return character;
}
