'use client';

import { useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import type { Character, Power, Equipment, Attributes, Specialty, SpecialtyTier } from '@/lib/types';
import {
  ORIGIN_LABELS,
  ATTRIBUTE_LABELS,
  calculateEnergy,
  calculateDetermination
} from '@/lib/types';
import { ComicCard, ComicHeading, ComicButton } from '@/components/comic';
import { AttributeCard, VitalBadge, PowerCard, SpecialtyChip, ConditionsList, ImageUpload, PointsCounter } from '@/components/character';
import {
  Shield, Zap, Star, Package, BookOpen,
  StickyNote, Plus, Save, X, Edit3, Check,
  AlertTriangle
} from 'lucide-react';
import { usePointsSystem } from '@/hooks/use-points-system';

interface CharacterSheetProps {
  character: Character;
  onSave: (character: Character) => void;
  isNew?: boolean;
}

export function CharacterSheet({ character, onSave, isNew = false }: CharacterSheetProps) {
  const [editedCharacter, setEditedCharacter] = useState<Character>(character);
  const [isEditing, setIsEditing] = useState(isNew);
  const [newSpecialty, setNewSpecialty] = useState('');
  const [newQuality, setNewQuality] = useState('');
  const [newChallenge, setNewChallenge] = useState('');
  const [newEquipment, setNewEquipment] = useState({ name: '', description: '' });

  // Sistema de pontos
  const { config, calculation, updateConfig } = usePointsSystem(editedCharacter);

  const updateCharacter = useCallback((updates: Partial<Character>) => {
    setEditedCharacter(prev => {
      const updated = { ...prev, ...updates };
      
      // Recalculate energy if attributes changed and not manual
      if (updates.attributes && !updated.energyManual) {
        updated.energy = calculateEnergy(updates.attributes);
        if (updated.energyCurrent > updated.energy) {
          updated.energyCurrent = updated.energy;
        }
      }
      
      // Recalculate determination if powers changed and not manual
      if (updates.powers && !updated.determinationManual) {
        updated.determination = calculateDetermination(updates.powers.length);
        if (updated.determinationCurrent > updated.determination) {
          updated.determinationCurrent = updated.determination;
        }
      }
      
      return updated;
    });
  }, []);

  const handleSave = () => {
    onSave(editedCharacter);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedCharacter(character);
    setIsEditing(false);
  };

  const addPower = () => {
    const newPower: Power = {
      id: crypto.randomUUID(),
      name: 'Novo Poder',
      level: 5,
      description: '',
      extras: [],
      limits: [],
    };
    updateCharacter({ powers: [...editedCharacter.powers, newPower] });
  };

  const updatePower = (index: number, power: Power) => {
    const powers = [...editedCharacter.powers];
    powers[index] = power;
    updateCharacter({ powers });
  };

  const deletePower = (index: number) => {
    const powers = editedCharacter.powers.filter((_, i) => i !== index);
    updateCharacter({ powers });
  };

  const addSpecialty = () => {
    if (newSpecialty.trim()) {
      const specialty: Specialty = {
        id: crypto.randomUUID(),
        name: newSpecialty.trim(),
        tier: 'standard',
      };
      updateCharacter({ specialties: [...editedCharacter.specialties, specialty] });
      setNewSpecialty('');
    }
  };

  const removeSpecialty = (id: string) => {
    const specialties = editedCharacter.specialties.filter(s => s.id !== id);
    updateCharacter({ specialties });
  };

  const updateSpecialtyTier = (id: string, tier: SpecialtyTier) => {
    const specialties = editedCharacter.specialties.map(s => 
      s.id === id ? { ...s, tier } : s
    );
    updateCharacter({ specialties });
  };

  const addQuality = () => {
    if (newQuality.trim()) {
      updateCharacter({ qualities: [...editedCharacter.qualities, newQuality.trim()] });
      setNewQuality('');
    }
  };

  const removeQuality = (index: number) => {
    const qualities = editedCharacter.qualities.filter((_, i) => i !== index);
    updateCharacter({ qualities });
  };

  const addChallenge = () => {
    if (newChallenge.trim()) {
      updateCharacter({ challenges: [...editedCharacter.challenges, newChallenge.trim()] });
      setNewChallenge('');
    }
  };

  const removeChallenge = (index: number) => {
    const challenges = editedCharacter.challenges.filter((_, i) => i !== index);
    updateCharacter({ challenges });
  };

  const addEquipment = () => {
    if (newEquipment.name.trim()) {
      const equipment: Equipment = {
        id: crypto.randomUUID(),
        name: newEquipment.name.trim(),
        description: newEquipment.description.trim(),
      };
      updateCharacter({ equipment: [...editedCharacter.equipment, equipment] });
      setNewEquipment({ name: '', description: '' });
    }
  };

  const removeEquipment = (id: string) => {
    const equipment = editedCharacter.equipment.filter(e => e.id !== id);
    updateCharacter({ equipment });
  };

  const toggleEnergyManual = () => {
    const newManual = !editedCharacter.energyManual;
    if (!newManual) {
      // Recalculate when switching back to auto
      const newEnergy = calculateEnergy(editedCharacter.attributes);
      updateCharacter({ 
        energyManual: false, 
        energy: newEnergy,
        energyCurrent: Math.min(editedCharacter.energyCurrent, newEnergy)
      });
    } else {
      updateCharacter({ energyManual: true });
    }
  };

  const toggleDeterminationManual = () => {
    const newManual = !editedCharacter.determinationManual;
    if (!newManual) {
      // Recalculate when switching back to auto
      const newDet = calculateDetermination(editedCharacter.powers.length);
      updateCharacter({ 
        determinationManual: false, 
        determination: newDet,
        determinationCurrent: Math.min(editedCharacter.determinationCurrent, newDet)
      });
    } else {
      updateCharacter({ determinationManual: true });
    }
  };

  return (
    <div className="space-y-6">
      {/* Points Counter - Fixed at top (only when editing) */}
      {isEditing && (
        <PointsCounter
          totalPoints={config.totalPoints}
          calculation={calculation}
          isEnabled={config.enabled}
          onUpdateSettings={({ enabled, totalPoints }) => {
            updateConfig({ enabled, totalPoints });
          }}
        />
      )}

      {/* Header with Name and Controls */}
      <ComicCard variant="primary" rotate={-1} shadowSize="lg" className="relative overflow-visible">
        <div className="flex flex-col md:flex-row md:items-start gap-4">
          {/* Avatar with Upload */}
          <ImageUpload
            imageUrl={editedCharacter.imageUrl}
            characterName={editedCharacter.name}
            editable={isEditing}
            onImageChange={(url) => updateCharacter({ imageUrl: url })}
          />

          {/* Name and Info */}
          <div className="flex-1 text-center md:text-left">
            {isEditing ? (
              <div className="space-y-3">
                <input
                  type="text"
                  value={editedCharacter.name}
                  onChange={(e) => updateCharacter({ name: e.target.value })}
                  placeholder="Nome do Heroi"
                  className={cn(
                    'w-full px-3 py-2 text-2xl font-serif font-black uppercase italic',
                    'bg-card text-foreground',
                    'border-3 border-foreground rounded-md',
                    'focus:outline-none focus:ring-2 focus:ring-secondary'
                  )}
                />
                <input
                  type="text"
                  value={editedCharacter.alias}
                  onChange={(e) => updateCharacter({ alias: e.target.value })}
                  placeholder="Codinome / Identidade Secreta"
                  className={cn(
                    'w-full px-3 py-1 text-sm',
                    'bg-card/50 text-foreground',
                    'border-2 border-foreground/50 rounded',
                    'focus:outline-none focus:ring-2 focus:ring-secondary'
                  )}
                />
                <select
                  value={editedCharacter.origin}
                  onChange={(e) => updateCharacter({ origin: e.target.value as Character['origin'] })}
                  className={cn(
                    'px-3 py-1 text-sm font-bold',
                    'bg-card text-foreground',
                    'border-2 border-foreground rounded',
                    'focus:outline-none focus:ring-2 focus:ring-secondary'
                  )}
                >
                  {Object.entries(ORIGIN_LABELS).map(([value, label]) => (
                    <option key={value} value={value}>{label}</option>
                  ))}
                </select>
              </div>
            ) : (
              <>
                <ComicHeading level={1} className="text-primary-foreground">
                  {editedCharacter.name || 'Sem Nome'}
                </ComicHeading>
                {editedCharacter.alias && (
                  <p className="text-primary-foreground/80 italic">
                    &ldquo;{editedCharacter.alias}&rdquo;
                  </p>
                )}
                <span className={cn(
                  'inline-block mt-2 px-3 py-1 text-sm font-bold uppercase',
                  'bg-tertiary text-tertiary-foreground',
                  'rounded border-2 border-foreground'
                )}>
                  {ORIGIN_LABELS[editedCharacter.origin]}
                </span>
              </>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 justify-center md:justify-end">
            {isEditing ? (
              <>
                <ComicButton variant="tertiary" size="sm" onClick={handleSave}>
                  <Save className="w-4 h-4 mr-1" />
                  Salvar
                </ComicButton>
                {!isNew && (
                  <ComicButton variant="outline" size="sm" onClick={handleCancel}>
                    <X className="w-4 h-4 mr-1" />
                    Cancelar
                  </ComicButton>
                )}
              </>
            ) : (
              <ComicButton variant="secondary" size="sm" onClick={() => setIsEditing(true)}>
                <Edit3 className="w-4 h-4 mr-1" />
                Editar
              </ComicButton>
            )}
          </div>
        </div>
      </ComicCard>

      {/* Conditions Section - NEW */}
      <ComicCard variant="surface" rotate={1}>
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle className="w-5 h-5 text-primary" />
          <ComicHeading level={3} className="text-primary">Condicoes</ComicHeading>
        </div>
        <ConditionsList
          conditions={editedCharacter.conditions}
          editable={isEditing}
          onChange={(conditions) => updateCharacter({ conditions })}
        />
      </ComicCard>

      {/* Energy and Determination Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ComicCard variant="surface" className="flex flex-col items-center py-4">
          <VitalBadge
            label="Energia"
            current={editedCharacter.energyCurrent}
            max={editedCharacter.energy}
            variant="energy"
            editable={true}
            showLifeBar={true}
            onChange={(value) => updateCharacter({ energyCurrent: value })}
            onMaxChange={(value) => updateCharacter({ energy: value, energyManual: true })}
            allowMaxEdit={isEditing}
          />
          {isEditing && (
            <label className="flex items-center gap-2 mt-3 text-xs text-muted-foreground cursor-pointer">
              <input
                type="checkbox"
                checked={editedCharacter.energyManual}
                onChange={toggleEnergyManual}
                className="rounded border-foreground"
              />
              Valor manual (desativar calculo automatico)
            </label>
          )}
          {!editedCharacter.energyManual && (
            <span className="text-xs text-muted-foreground mt-1">
              = Vigor ({editedCharacter.attributes.strength}) + Vontade ({editedCharacter.attributes.willpower})
            </span>
          )}
        </ComicCard>

        <ComicCard variant="surface" className="flex flex-col items-center py-4">
          <VitalBadge
            label="Determinacao"
            current={editedCharacter.determinationCurrent}
            max={editedCharacter.determination}
            variant="determination"
            editable={true}
            onChange={(value) => updateCharacter({ determinationCurrent: value })}
            onMaxChange={(value) => updateCharacter({ determination: value, determinationManual: true })}
            allowMaxEdit={isEditing}
          />
          {isEditing && (
            <label className="flex items-center gap-2 mt-3 text-xs text-muted-foreground cursor-pointer">
              <input
                type="checkbox"
                checked={editedCharacter.determinationManual}
                onChange={toggleDeterminationManual}
                className="rounded border-foreground"
              />
              Valor manual (desativar calculo automatico)
            </label>
          )}
          {!editedCharacter.determinationManual && (
            <span className="text-xs text-muted-foreground mt-1">
              = 6 - Poderes ({editedCharacter.powers.length})
            </span>
          )}
        </ComicCard>
      </div>

      {/* Attributes - Grid Style like the image */}
      <ComicCard variant="surface">
        <div className="flex items-center gap-2 mb-4">
          <Shield className="w-5 h-5" />
          <ComicHeading level={3}>Atributos</ComicHeading>
          <div className="h-1 flex-1 bg-secondary ml-2" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {(Object.keys(editedCharacter.attributes) as Array<keyof Attributes>).map((attr) => (
            <AttributeCard
              key={attr}
              name={ATTRIBUTE_LABELS[attr]}
              value={editedCharacter.attributes[attr]}
              editable={isEditing}
              onChange={(value) => updateCharacter({
                attributes: { ...editedCharacter.attributes, [attr]: value }
              })}
            />
          ))}
        </div>
      </ComicCard>

      
      {/* Powers */}
      <ComicCard variant="surface" rotate={-1}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-secondary" />
            <ComicHeading level={3}>Poderes</ComicHeading>
            <span className={cn(
              'px-2 py-0.5 text-xs font-bold',
              'bg-secondary text-secondary-foreground',
              'rounded border border-foreground'
            )}>
              {editedCharacter.powers.length}
            </span>
          </div>
          {isEditing && (
            <ComicButton variant="secondary" size="sm" onClick={addPower}>
              <Plus className="w-4 h-4 mr-1" />
              Adicionar
            </ComicButton>
          )}
        </div>
        <div className="space-y-3">
          {editedCharacter.powers.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">
              Nenhum poder adicionado ainda.
            </p>
          ) : (
            editedCharacter.powers.map((power, index) => (
              <PowerCard
                key={power.id}
                power={power}
                editable={isEditing}
                onUpdate={(updated) => updatePower(index, updated)}
                onDelete={() => deletePower(index)}
              />
            ))
          )}
        </div>
      </ComicCard>

      {/* Specialties */}
      <ComicCard variant="surface">
        <div className="flex items-center gap-2 mb-4">
          <Star className="w-5 h-5" />
          <ComicHeading level={3}>Especialidades</ComicHeading>
        </div>
        <p className="text-xs text-muted-foreground mb-3">
          Clique em uma especialidade para alterar seu nivel: Padrao (+1) → Perito (+2) → Mestre (+3)
        </p>
        <div className="flex flex-wrap gap-2">
          {editedCharacter.specialties.map((specialty) => (
            <SpecialtyChip
              key={specialty.id}
              specialty={specialty}
              editable={isEditing}
              onRemove={() => removeSpecialty(specialty.id)}
              onTierChange={(tier) => updateSpecialtyTier(specialty.id, tier)}
            />
          ))}
          {isEditing && (
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={newSpecialty}
                onChange={(e) => setNewSpecialty(e.target.value)}
                placeholder="Nova especialidade..."
                className={cn(
                  'px-3 py-1 text-sm w-40',
                  'bg-input border-2 border-foreground rounded-full',
                  'focus:outline-none focus:ring-2 focus:ring-secondary'
                )}
                onKeyDown={(e) => e.key === 'Enter' && addSpecialty()}
              />
              <button
                type="button"
                onClick={addSpecialty}
                className={cn(
                  'p-1 rounded-full',
                  'bg-secondary text-secondary-foreground',
                  'border-2 border-foreground',
                  'hover:bg-secondary/80 transition-colors'
                )}
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
        {editedCharacter.specialties.length === 0 && !isEditing && (
          <p className="text-muted-foreground text-center py-4">
            Nenhuma especialidade adicionada.
          </p>
        )}
      </ComicCard>

      {/* Equipment */}
      <ComicCard variant="surface" rotate={1}>
        <div className="flex items-center gap-2 mb-4">
          <Package className="w-5 h-5" />
          <ComicHeading level={3}>Equipamentos</ComicHeading>
        </div>
        <div className="space-y-2">
          {editedCharacter.equipment.map((item) => (
            <div
              key={item.id}
              className={cn(
                'flex items-start gap-3 p-3',
                'bg-muted rounded border-2 border-foreground/30'
              )}
            >
              <Package className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <span className="font-bold">{item.name}</span>
                {item.description && (
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                )}
              </div>
              {isEditing && (
                <button
                  type="button"
                  onClick={() => removeEquipment(item.id)}
                  className="text-primary hover:text-primary/70"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
          {editedCharacter.equipment.length === 0 && !isEditing && (
            <p className="text-muted-foreground text-center py-4">
              Nenhum equipamento adicionado.
            </p>
          )}
          {isEditing && (
            <div className="flex flex-col sm:flex-row gap-2 mt-3 p-3 bg-muted/50 rounded">
              <input
                type="text"
                value={newEquipment.name}
                onChange={(e) => setNewEquipment({ ...newEquipment, name: e.target.value })}
                placeholder="Nome do equipamento"
                className={cn(
                  'flex-1 px-2 py-1 text-sm',
                  'bg-input border-2 border-foreground rounded',
                  'focus:outline-none focus:ring-2 focus:ring-secondary'
                )}
              />
              <input
                type="text"
                value={newEquipment.description}
                onChange={(e) => setNewEquipment({ ...newEquipment, description: e.target.value })}
                placeholder="Descricao (opcional)"
                className={cn(
                  'flex-1 px-2 py-1 text-sm',
                  'bg-input border-2 border-foreground rounded',
                  'focus:outline-none focus:ring-2 focus:ring-secondary'
                )}
              />
              <ComicButton variant="secondary" size="sm" onClick={addEquipment}>
                <Plus className="w-4 h-4" />
              </ComicButton>
            </div>
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
          <div className="space-y-2">
            {editedCharacter.qualities.map((quality, index) => (
              <div key={index} className="flex items-center gap-2">
                <Check className="w-4 h-4 text-chart-4 flex-shrink-0" />
                <span className="flex-1">{quality}</span>
                {isEditing && (
                  <button
                    type="button"
                    onClick={() => removeQuality(index)}
                    className="text-primary hover:text-primary/70"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
            {editedCharacter.qualities.length === 0 && !isEditing && (
              <p className="text-muted-foreground text-sm italic">Nenhuma qualidade.</p>
            )}
            {isEditing && (
              <div className="flex gap-2 mt-3">
                <input
                  type="text"
                  value={newQuality}
                  onChange={(e) => setNewQuality(e.target.value)}
                  placeholder="Nova qualidade..."
                  className={cn(
                    'flex-1 px-2 py-1 text-sm',
                    'bg-input border-2 border-foreground rounded',
                    'focus:outline-none focus:ring-2 focus:ring-chart-4'
                  )}
                  onKeyDown={(e) => e.key === 'Enter' && addQuality()}
                />
                <ComicButton variant="tertiary" size="sm" onClick={addQuality}>
                  <Plus className="w-4 h-4" />
                </ComicButton>
              </div>
            )}
          </div>
        </ComicCard>

        <ComicCard variant="surface">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="w-5 h-5 text-primary" />
            <ComicHeading level={3}>Desafios</ComicHeading>
          </div>
          <div className="space-y-2">
            {editedCharacter.challenges.map((challenge, index) => (
              <div key={index} className="flex items-center gap-2">
                <X className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="flex-1">{challenge}</span>
                {isEditing && (
                  <button
                    type="button"
                    onClick={() => removeChallenge(index)}
                    className="text-primary hover:text-primary/70"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
            {editedCharacter.challenges.length === 0 && !isEditing && (
              <p className="text-muted-foreground text-sm italic">Nenhum desafio.</p>
            )}
            {isEditing && (
              <div className="flex gap-2 mt-3">
                <input
                  type="text"
                  value={newChallenge}
                  onChange={(e) => setNewChallenge(e.target.value)}
                  placeholder="Novo desafio..."
                  className={cn(
                    'flex-1 px-2 py-1 text-sm',
                    'bg-input border-2 border-foreground rounded',
                    'focus:outline-none focus:ring-2 focus:ring-primary'
                  )}
                  onKeyDown={(e) => e.key === 'Enter' && addChallenge()}
                />
                <ComicButton variant="primary" size="sm" onClick={addChallenge}>
                  <Plus className="w-4 h-4" />
                </ComicButton>
              </div>
            )}
          </div>
        </ComicCard>
      </div>

      {/* Background */}
      <ComicCard variant="surface">
        <div className="flex items-center gap-2 mb-4">
          <BookOpen className="w-5 h-5" />
          <ComicHeading level={3}>Historia</ComicHeading>
        </div>
        {isEditing ? (
          <textarea
            value={editedCharacter.background}
            onChange={(e) => updateCharacter({ background: e.target.value })}
            placeholder="Conte a historia do seu heroi..."
            rows={6}
            className={cn(
              'w-full px-3 py-2',
              'bg-input border-2 border-foreground rounded',
              'focus:outline-none focus:ring-2 focus:ring-secondary',
              'resize-y'
            )}
          />
        ) : (
          <p className="whitespace-pre-wrap">
            {editedCharacter.background || (
              <span className="text-muted-foreground italic">
                Nenhuma historia adicionada ainda.
              </span>
            )}
          </p>
        )}
      </ComicCard>

      {/* Notes */}
      <ComicCard variant="tertiary" rotate={-1}>
        <div className="flex items-center gap-2 mb-4">
          <StickyNote className="w-5 h-5" />
          <ComicHeading level={3}>Notas de Sessao</ComicHeading>
        </div>
        {isEditing ? (
          <textarea
            value={editedCharacter.notes}
            onChange={(e) => updateCharacter({ notes: e.target.value })}
            placeholder="Anote eventos importantes, NPCs, missoes..."
            rows={4}
            className={cn(
              'w-full px-3 py-2',
              'bg-card border-2 border-foreground rounded',
              'focus:outline-none focus:ring-2 focus:ring-secondary',
              'resize-y'
            )}
          />
        ) : (
          <p className="whitespace-pre-wrap">
            {editedCharacter.notes || (
              <span className="text-muted-foreground italic">
                Nenhuma nota adicionada.
              </span>
            )}
          </p>
        )}
      </ComicCard>

      {/* Bottom Save Button */}
      {isEditing && (
        <div className="flex justify-center gap-4 pt-4">
          <ComicButton variant="primary" size="lg" onClick={handleSave}>
            <Save className="w-5 h-5 mr-2" />
            Salvar Personagem
          </ComicButton>
          {!isNew && (
            <ComicButton variant="outline" size="lg" onClick={handleCancel}>
              <X className="w-5 h-5 mr-2" />
              Cancelar
            </ComicButton>
          )}
        </div>
      )}
    </div>
  );
}
