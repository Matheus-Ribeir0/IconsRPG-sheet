'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/layout/header';
import { ComicCard, ComicHeading, ComicButton } from '@/components/comic';
import { DoubleDiceRoller } from '@/components/generator/dice-roller';
import { AttributeCard, VitalBadge, PowerCard, SpecialtyChip, ConditionsList } from '@/components/character';
import { generateRandomCharacter } from '@/lib/generator-tables';
import { saveCharacter } from '@/lib/storage';
import { ORIGIN_LABELS, ATTRIBUTE_LABELS, type Character, type Attributes } from '@/lib/types';
import { cn } from '@/lib/utils';
import {
  Sparkles,
  Dices,
  RefreshCw,
  Save,
  Edit3,
  Zap,
  Shield,
  Star,
  AlertCircle,
  AlertTriangle,
} from 'lucide-react';
import Link from 'next/link';

export default function GeneratorPage() {
  const router = useRouter();
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCharacter, setGeneratedCharacter] = useState<Character | null>(null);
  const [diceValues, setDiceValues] = useState<[number, number] | undefined>();

  const handleGenerate = async () => {
    setIsGenerating(true);
    setDiceValues(undefined);

    // Animate dice rolling
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Generate character
    const character = generateRandomCharacter();
    setGeneratedCharacter(character);
    
    // Show final dice values (just for visual effect)
    setDiceValues([Math.floor(Math.random() * 6) + 1, Math.floor(Math.random() * 6) + 1]);
    setIsGenerating(false);
  };

  const handleSave = () => {
    if (generatedCharacter) {
      saveCharacter(generatedCharacter);
      router.push(`/character/${generatedCharacter.id}`);
    }
  };

  const handleEditAndSave = () => {
    if (generatedCharacter) {
      saveCharacter(generatedCharacter);
      router.push(`/character/${generatedCharacter.id}`);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Background pattern */}
      <div className="fixed inset-0 comic-halftone pointer-events-none" />

      <Header />

      <main className="relative container mx-auto px-4 py-8 max-w-4xl">
        {/* Hero Section */}
        <section className="text-center mb-8">
          <div className="relative inline-block">
            <ComicHeading level={1} variant="shadow" className="mb-4">
              Gerador de Herois
            </ComicHeading>
            <div className="absolute -right-6 -top-6 w-14 h-14 bg-tertiary rounded-full border-4 border-foreground flex items-center justify-center rotate-12 shadow-[4px_4px_0_0_#2f2f2e]">
              <Dices className="w-7 h-7" />
            </div>
          </div>
          <p className="text-lg text-muted-foreground max-w-md mx-auto">
            Gere um personagem aleatorio usando as tabelas do sistema Icons
          </p>
        </section>

        {/* Warning about placeholder tables */}
        <ComicCard variant="tertiary" className="mb-8">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">Tabelas Placeholder</p>
              <p className="text-sm">
                O gerador esta usando tabelas de exemplo. Forneca as tabelas oficiais do livro Icons 
                para resultados mais precisos.
              </p>
            </div>
          </div>
        </ComicCard>

        {/* Dice Roller Section */}
        <ComicCard variant="surface" shadowSize="lg" className="mb-8">
          <div className="flex flex-col items-center gap-6 py-4">
            <DoubleDiceRoller isRolling={isGenerating} values={diceValues} />

            <ComicButton
              variant="primary"
              size="lg"
              onClick={handleGenerate}
              disabled={isGenerating}
              className="min-w-[200px]"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                  Gerando...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 mr-2" />
                  {generatedCharacter ? 'Gerar Outro' : 'Gerar Heroi'}
                </>
              )}
            </ComicButton>
          </div>
        </ComicCard>

        {/* Generated Character Preview */}
        {generatedCharacter && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Character Header */}
            <ComicCard variant="primary" rotate={-1} shadowSize="lg">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <span className="text-primary-foreground/70 text-sm font-mono uppercase">
                    Heroi Gerado
                  </span>
                  <ComicHeading level={2} className="text-primary-foreground">
                    {generatedCharacter.name || 'Novo Heroi'}
                  </ComicHeading>
                  <span
                    className={cn(
                      'inline-block mt-2 px-3 py-1 text-sm font-bold uppercase',
                      'bg-tertiary text-tertiary-foreground',
                      'rounded border-2 border-foreground'
                    )}
                  >
                    {ORIGIN_LABELS[generatedCharacter.origin]}
                  </span>
                </div>

                <div className="flex gap-3">
                  <ComicButton variant="secondary" onClick={handleEditAndSave}>
                    <Edit3 className="w-4 h-4 mr-2" />
                    Editar e Salvar
                  </ComicButton>
                  <ComicButton variant="tertiary" onClick={handleSave}>
                    <Save className="w-4 h-4 mr-2" />
                    Salvar
                  </ComicButton>
                </div>
              </div>
            </ComicCard>

            {/* Conditions */}
            {generatedCharacter.conditions.length > 0 && (
              <ComicCard variant="surface" rotate={1}>
                <div className="flex items-center gap-2 mb-4">
                  <AlertTriangle className="w-5 h-5 text-primary" />
                  <ComicHeading level={3} className="text-primary">Condicoes</ComicHeading>
                </div>
                <ConditionsList conditions={generatedCharacter.conditions} />
              </ComicCard>
            )}

            {/* Vitals */}
            <div className="grid grid-cols-2 gap-4">
              <ComicCard variant="surface" className="flex justify-center py-4">
                <VitalBadge
                  label="Energia"
                  current={generatedCharacter.energyCurrent}
                  max={generatedCharacter.energy}
                  variant="energy"
                  showLifeBar={true}
                />
              </ComicCard>
              <ComicCard variant="surface" className="flex justify-center py-4">
                <VitalBadge
                  label="Determinacao"
                  current={generatedCharacter.determinationCurrent}
                  max={generatedCharacter.determination}
                  variant="determination"
                />
              </ComicCard>
            </div>

            {/* Attributes */}
            <ComicCard variant="surface">
              <div className="flex items-center gap-2 mb-4">
                <Shield className="w-5 h-5" />
                <ComicHeading level={3}>Atributos</ComicHeading>
                <div className="h-1 flex-1 bg-secondary ml-2" />
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {(Object.keys(generatedCharacter.attributes) as Array<keyof Attributes>).map(
                  (attr) => (
                    <AttributeCard
                      key={attr}
                      name={ATTRIBUTE_LABELS[attr]}
                      value={generatedCharacter.attributes[attr]}
                    />
                  )
                )}
              </div>
            </ComicCard>

            {/* Qualities and Challenges */}
            <div className="grid gap-6 md:grid-cols-2">
              <ComicCard variant="surface">
                <div className="flex items-center gap-2 mb-4">
                  <Star className="w-5 h-5 text-tertiary" />
                  <ComicHeading level={3}>Qualidades</ComicHeading>
                </div>
                <ul className="space-y-2">
                  {generatedCharacter.qualities.map((quality, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-chart-4 rounded-full" />
                      {quality}
                    </li>
                  ))}
                </ul>
              </ComicCard>

              <ComicCard variant="surface">
                <div className="flex items-center gap-2 mb-4">
                  <Zap className="w-5 h-5 text-primary" />
                  <ComicHeading level={3}>Desafios</ComicHeading>
                </div>
                <ul className="space-y-2">
                  {generatedCharacter.challenges.map((challenge, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-primary rounded-full" />
                      {challenge}
                    </li>
                  ))}
                </ul>
              </ComicCard>
            </div>

            {/* Powers */}
            <ComicCard variant="surface" rotate={-1}>
              <div className="flex items-center gap-2 mb-4">
                <Zap className="w-5 h-5 text-secondary" />
                <ComicHeading level={3}>Poderes</ComicHeading>
                <span
                  className={cn(
                    'px-2 py-0.5 text-xs font-bold',
                    'bg-secondary text-secondary-foreground',
                    'rounded border border-foreground'
                  )}
                >
                  {generatedCharacter.powers.length}
                </span>
              </div>
              <div className="space-y-3">
                {generatedCharacter.powers.map((power) => (
                  <PowerCard key={power.id} power={power} />
                ))}
              </div>
            </ComicCard>

            {/* Specialties */}
            <ComicCard variant="surface">
              <div className="flex items-center gap-2 mb-4">
                <Star className="w-5 h-5" />
                <ComicHeading level={3}>Especialidades</ComicHeading>
              </div>
              <div className="flex flex-wrap gap-2">
                {generatedCharacter.specialties.map((specialty) => (
                  <SpecialtyChip key={specialty.id} specialty={specialty} />
                ))}
              </div>
            </ComicCard>

            {/* Action Buttons */}
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <ComicButton variant="primary" size="lg" onClick={handleSave}>
                <Save className="w-5 h-5 mr-2" />
                Salvar Heroi
              </ComicButton>
              <ComicButton variant="secondary" size="lg" onClick={handleGenerate}>
                <RefreshCw className="w-5 h-5 mr-2" />
                Gerar Outro
              </ComicButton>
              <Link href="/">
                <ComicButton variant="outline" size="lg">
                  Voltar ao Inicio
                </ComicButton>
              </Link>
            </div>
          </div>
        )}
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
