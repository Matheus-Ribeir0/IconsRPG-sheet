'use client';

import { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/layout/header';
import { CharacterSheet } from '@/components/character/character-sheet';
import { ComicCard, ComicHeading, ComicButton } from '@/components/comic';
import { getCharacterById, saveCharacter } from '@/lib/storage';
import type { Character } from '@/lib/types';
import { ArrowLeft, AlertTriangle } from 'lucide-react';
import Link from 'next/link';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function CharacterPage({ params }: PageProps) {
  const { id } = use(params);
  const router = useRouter();
  const [character, setCharacter] = useState<Character | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const loadedCharacter = getCharacterById(id);
    if (loadedCharacter) {
      setCharacter(loadedCharacter);
    } else {
      setNotFound(true);
    }
    setIsLoading(false);
  }, [id]);

  const handleSave = (updatedCharacter: Character) => {
    saveCharacter(updatedCharacter);
    setCharacter(updatedCharacter);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="fixed inset-0 comic-halftone pointer-events-none" />
        <Header />
        <main className="relative container mx-auto px-4 py-8 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            <p className="mt-4 text-muted-foreground">Carregando personagem...</p>
          </div>
        </main>
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="min-h-screen bg-background">
        <div className="fixed inset-0 comic-halftone pointer-events-none" />
        <Header />
        <main className="relative container mx-auto px-4 py-8 flex items-center justify-center">
          <ComicCard variant="surface" className="text-center max-w-md">
            <div className="w-20 h-20 mx-auto mb-4 bg-primary rounded-full border-4 border-foreground flex items-center justify-center shadow-[4px_4px_0_0_#2f2f2e]">
              <AlertTriangle className="w-10 h-10 text-primary-foreground" />
            </div>
            <ComicHeading level={2} className="mb-2">
              Personagem Não Encontrado
            </ComicHeading>
            <p className="text-muted-foreground mb-6">
              O personagem que você está procurando não existe ou foi removido.
            </p>
            <Link href="/">
              <ComicButton variant="secondary">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar ao Início
              </ComicButton>
            </Link>
          </ComicCard>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Background pattern */}
      <div className="fixed inset-0 comic-halftone pointer-events-none" />
      
      <Header />

      <main className="relative container mx-auto px-4 py-8 max-w-4xl">
        {/* Back button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 mb-6 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar para lista
        </Link>

        {character && (
          <CharacterSheet
            character={character}
            onSave={handleSave}
          />
        )}
      </main>
       <footer className="relative border-t-4 border-foreground bg-card mt-12">
        <div className="container mx-auto px-4 py-6 text-center">
          <p className="text-sm text-muted-foreground">
            Criado para o sistema <strong>Icons: Assembled Edition</strong> por <a href="https://github.com/Matheus-Ribeir0" className="text-primary hover:underline"><i>Matheus Ribeiro</i></a>
          </p>
        </div>
      </footer>
    </div>
  );
}
