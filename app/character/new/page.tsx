'use client';

import { useRouter } from 'next/navigation';
import { Header } from '@/components/layout/header';
import { CharacterSheet } from '@/components/character/character-sheet';
import { createEmptyCharacter } from '@/lib/types';
import { saveCharacter } from '@/lib/storage';
import type { Character } from '@/lib/types';

export default function NewCharacterPage() {
  const router = useRouter();
  const newCharacter = createEmptyCharacter();

  const handleSave = (character: Character) => {
    saveCharacter(character);
    router.push(`/character/${character.id}`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Background pattern */}
      <div className="fixed inset-0 comic-halftone pointer-events-none" />
      
      <Header />

      <main className="relative container mx-auto px-4 py-8 max-w-4xl">
        <CharacterSheet
          character={newCharacter}
          onSave={handleSave}
          isNew={true}
        />
      </main>
    </div>
  );
}
