// LocalStorage functions for Icons Character Management

import type { Character } from './types';

const STORAGE_KEY = 'icons-characters';

// Get all characters from localStorage
export function getCharacters(): Character[] {
  if (typeof window === 'undefined') return [];
  
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];
    return JSON.parse(data) as Character[];
  } catch {
    console.error('Error reading characters from localStorage');
    return [];
  }
}

// Get a single character by ID
export function getCharacterById(id: string): Character | null {
  const characters = getCharacters();
  return characters.find(c => c.id === id) || null;
}

// Save a new character
export function saveCharacter(character: Character): void {
  const characters = getCharacters();
  const existingIndex = characters.findIndex(c => c.id === character.id);
  
  const updatedCharacter = {
    ...character,
    updatedAt: new Date().toISOString(),
  };
  
  if (existingIndex >= 0) {
    characters[existingIndex] = updatedCharacter;
  } else {
    characters.push(updatedCharacter);
  }
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(characters));
}

// Update an existing character
export function updateCharacter(id: string, updates: Partial<Character>): Character | null {
  const characters = getCharacters();
  const index = characters.findIndex(c => c.id === id);
  
  if (index === -1) return null;
  
  const updatedCharacter = {
    ...characters[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  
  characters[index] = updatedCharacter;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(characters));
  
  return updatedCharacter;
}

// Delete a character
export function deleteCharacter(id: string): boolean {
  const characters = getCharacters();
  const filtered = characters.filter(c => c.id !== id);
  
  if (filtered.length === characters.length) return false;
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  return true;
}

// Duplicate a character
export function duplicateCharacter(id: string): Character | null {
  const character = getCharacterById(id);
  if (!character) return null;
  
  const duplicate: Character = {
    ...character,
    id: crypto.randomUUID(),
    name: `${character.name} (Cópia)`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  
  saveCharacter(duplicate);
  return duplicate;
}
