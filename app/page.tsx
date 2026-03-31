'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/header';
import { ComicCard, ComicHeading, ComicButton } from '@/components/comic';
import { CharacterCard } from '@/components/character/character-card';
import { getCharacters, deleteCharacter, duplicateCharacter } from '@/lib/storage';
import type { Character } from '@/lib/types';
import { Plus, Sparkles, Users, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function HomePage() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setCharacters(getCharacters());
    setIsLoading(false);
  }, []);

  const handleDelete = (id: string) => {
    if (confirm('Tem certeza que deseja excluir este personagem?')) {
      deleteCharacter(id);
      setCharacters(getCharacters());
    }
  };

  const handleDuplicate = (id: string) => {
    duplicateCharacter(id);
    setCharacters(getCharacters());
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Background pattern */}
      <div className="fixed inset-0 comic-halftone pointer-events-none" />
      
      <Header />

      <main className="relative container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="mb-12 text-center">
          <div className="relative inline-block">
            <ComicHeading level={1} variant="shadow" className="mb-4">
              Icons: Assembled
            </ComicHeading>
            <div className="absolute -right-4 -top-4 w-16 h-16 bg-tertiary rounded-full border-4 border-foreground flex items-center justify-center -rotate-12 shadow-[4px_4px_0_0_#2f2f2e]">
              <Zap className="w-8 h-8" />
            </div>
          </div>
          <p className="text-lg text-muted-foreground max-w-md mx-auto">
            Crie e gerencie suas fichas de personagem para o sistema de RPG de super-heróis
          </p>
        </section>

        {/* Action Buttons */}
        <section className="flex flex-wrap justify-center gap-4 mb-12">
          <Link href="/character/new">
            <ComicButton variant="primary" size="lg" className="flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Novo Personagem
            </ComicButton>
          </Link>
          <Link href="/generator">
            <ComicButton variant="secondary" size="lg" className="flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              Gerador Aleatório
            </ComicButton>
          </Link>
        </section>

        {/* Characters List */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <Users className="w-6 h-6" />
            <ComicHeading level={2}>
              Seus Heróis
            </ComicHeading>
            {characters.length > 0 && (
              <span className={cn(
                'px-3 py-1 text-sm font-bold',
                'bg-tertiary text-tertiary-foreground',
                'rounded-full border-2 border-foreground',
                'shadow-[2px_2px_0_0_#2f2f2e]'
              )}>
                {characters.length}
              </span>
            )}
          </div>

          {isLoading ? (
            <div className="text-center py-12">
              <div className="inline-block w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
              <p className="mt-4 text-muted-foreground">Carregando...</p>
            </div>
          ) : characters.length === 0 ? (
            <ComicCard
              variant="surface"
              className="text-center py-12 max-w-md mx-auto"
            >
              <div className="w-20 h-20 mx-auto mb-4 bg-tertiary rounded-full border-4 border-foreground flex items-center justify-center shadow-[4px_4px_0_0_#2f2f2e]">
                <Users className="w-10 h-10 text-foreground/50" />
              </div>
              <ComicHeading level={3} className="mb-2">
                Nenhum Herói Ainda
              </ComicHeading>
              <p className="text-muted-foreground mb-6">
                Comece criando seu primeiro personagem ou use o gerador aleatório!
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link href="/character/new">
                  <ComicButton variant="primary">
                    <Plus className="w-4 h-4 mr-2" />
                    Criar
                  </ComicButton>
                </Link>
                <Link href="/generator">
                  <ComicButton variant="secondary">
                    <Sparkles className="w-4 h-4 mr-2" />
                    Gerar
                  </ComicButton>
                </Link>
              </div>
            </ComicCard>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {characters.map((character) => (
                <CharacterCard
                  key={character.id}
                  character={character}
                  onDelete={() => handleDelete(character.id)}
                  onDuplicate={() => handleDuplicate(character.id)}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="relative border-t-4 border-foreground bg-card mt-12">
        <div className="container mx-auto px-4 py-6 text-center">
          <p className="text-sm text-muted-foreground">
            Criado para o sistema <strong>Icons: Assembled Edition</strong>
          </p>
        </div>
      </footer>
    </div>
  );
}
