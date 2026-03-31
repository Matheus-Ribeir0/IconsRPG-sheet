'use client';

import { useState, useMemo } from 'react';
import { X, Search, Plus, Zap, Shield, Brain, Wind, Sword, Eye, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';
import { Power } from '@/lib/types';
import {
  POWERS_DATABASE,
  POWER_CATEGORIES,
  PowerCategory,
  PowerDefinition,
  getPowersByCategory,
  searchPowers,
  createPowerFromDefinition,
} from '@/lib/powers-data';

interface PowerSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPower: (power: Power) => void;
}

const CATEGORY_ICONS: Record<PowerCategory, React.ReactNode> = {
  Alteracao: <Sparkles className="w-5 h-5" />,
  Controle: <Zap className="w-5 h-5" />,
  Defensivo: <Shield className="w-5 h-5" />,
  Mental: <Brain className="w-5 h-5" />,
  Movimento: <Wind className="w-5 h-5" />,
  Ofensivo: <Sword className="w-5 h-5" />,
  Sensorial: <Eye className="w-5 h-5" />,
};

const CATEGORY_COLORS: Record<PowerCategory, string> = {
  Alteracao: 'bg-purple-500',
  Controle: 'bg-yellow-500',
  Defensivo: 'bg-blue-500',
  Mental: 'bg-pink-500',
  Movimento: 'bg-green-500',
  Ofensivo: 'bg-red-500',
  Sensorial: 'bg-cyan-500',
};

const CATEGORY_BORDER_COLORS: Record<PowerCategory, string> = {
  Alteracao: 'border-purple-500',
  Controle: 'border-yellow-500',
  Defensivo: 'border-blue-500',
  Mental: 'border-pink-500',
  Movimento: 'border-green-500',
  Ofensivo: 'border-red-500',
  Sensorial: 'border-cyan-500',
};

export function PowerSelector({ isOpen, onClose, onSelectPower }: PowerSelectorProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<PowerCategory | null>(null);
  const [expandedPower, setExpandedPower] = useState<string | null>(null);
  const [selectedLevel, setSelectedLevel] = useState(1);
  const [isCreatingCustom, setIsCreatingCustom] = useState(false);
  const [customPower, setCustomPower] = useState({
    name: '',
    description: '',
    type: 'Controle' as PowerCategory,
  });

  const filteredPowers = useMemo(() => {
    if (searchQuery.trim()) {
      return searchPowers(searchQuery);
    }
    if (selectedCategory) {
      return getPowersByCategory(selectedCategory);
    }
    return POWERS_DATABASE;
  }, [searchQuery, selectedCategory]);

  const handleSelectPower = (definition: PowerDefinition) => {
    const power = createPowerFromDefinition(definition, selectedLevel);
    onSelectPower(power);
    onClose();
    resetState();
  };

  const handleCreateCustomPower = () => {
    if (!customPower.name.trim()) return;

    const power: Power = {
      id: crypto.randomUUID(),
      name: customPower.name,
      level: selectedLevel,
      type: customPower.type,
      description: customPower.description,
      extras: [],
      limits: [],
    };
    onSelectPower(power);
    onClose();
    resetState();
  };

  const resetState = () => {
    setSearchQuery('');
    setSelectedCategory(null);
    setExpandedPower(null);
    setSelectedLevel(1);
    setIsCreatingCustom(false);
    setCustomPower({ name: '', description: '', type: 'Controle' });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => {
          onClose();
          resetState();
        }}
      />

      {/* Modal */}
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-card border-4 border-foreground comic-shadow-lg rounded-lg overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-primary text-primary-foreground p-4 border-b-4 border-foreground">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-2xl font-bold uppercase tracking-wide">
              Adicionar Poder
            </h2>
            <button
              onClick={() => {
                onClose();
                resetState();
              }}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Search Bar */}
          <div className="mt-4 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-foreground/60" />
            <input
              type="text"
              placeholder="Buscar poderes..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setSelectedCategory(null);
              }}
              className="w-full pl-10 pr-4 py-3 bg-white/20 border-2 border-white/30 rounded-lg text-primary-foreground placeholder:text-primary-foreground/60 focus:outline-none focus:border-white/60"
            />
          </div>
        </div>

        {/* Level Selector */}
        <div className="bg-muted p-3 border-b-2 border-foreground flex items-center gap-4">
          <span className="font-mono text-sm font-semibold">Nivel do Poder:</span>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((level) => (
              <button
                key={level}
                onClick={() => setSelectedLevel(level)}
                className={`w-8 h-8 rounded border-2 border-foreground font-bold text-sm transition-all ${
                  selectedLevel === level
                    ? 'bg-secondary text-secondary-foreground comic-shadow-sm'
                    : 'bg-card hover:bg-muted'
                }`}
              >
                {level}
              </button>
            ))}
          </div>
          <button
            onClick={() => setIsCreatingCustom(!isCreatingCustom)}
            className={`ml-auto px-4 py-2 rounded border-2 border-foreground font-semibold text-sm transition-all flex items-center gap-2 ${
              isCreatingCustom
                ? 'bg-tertiary text-tertiary-foreground comic-shadow-sm'
                : 'bg-card hover:bg-muted'
            }`}
          >
            <Plus className="w-4 h-4" />
            Criar Personalizado
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden flex">
          {/* Category Sidebar */}
          <div className="w-48 bg-muted/50 border-r-2 border-foreground overflow-y-auto">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`w-full p-3 text-left font-semibold border-b border-foreground/20 transition-colors ${
                !selectedCategory && !searchQuery ? 'bg-secondary text-secondary-foreground' : 'hover:bg-muted'
              }`}
            >
              Todos os Poderes
            </button>
            {POWER_CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setSelectedCategory(category);
                  setSearchQuery('');
                }}
                className={`w-full p-3 text-left flex items-center gap-2 border-b border-foreground/20 transition-colors ${
                  selectedCategory === category ? 'bg-secondary text-secondary-foreground' : 'hover:bg-muted'
                }`}
              >
                <span className={`p-1 rounded ${CATEGORY_COLORS[category]} text-white`}>
                  {CATEGORY_ICONS[category]}
                </span>
                <span className="font-medium">{category}</span>
              </button>
            ))}
          </div>

          {/* Powers List / Custom Form */}
          <div className="flex-1 overflow-y-auto p-4">
            {isCreatingCustom ? (
              <div className="space-y-4">
                <h3 className="font-serif text-xl font-bold">Criar Poder Personalizado</h3>

                <div>
                  <label className="block font-mono text-sm font-semibold mb-1">Nome do Poder</label>
                  <input
                    type="text"
                    value={customPower.name}
                    onChange={(e) => setCustomPower({ ...customPower, name: e.target.value })}
                    placeholder="Ex: Super Forca Cosmica"
                    className="w-full p-3 border-2 border-foreground rounded bg-card focus:outline-none focus:ring-2 focus:ring-secondary"
                  />
                </div>

                <div>
                  <label className="block font-mono text-sm font-semibold mb-1">Categoria</label>
                  <select
                    value={customPower.type}
                    onChange={(e) => setCustomPower({ ...customPower, type: e.target.value as PowerCategory })}
                    className="w-full p-3 border-2 border-foreground rounded bg-card focus:outline-none focus:ring-2 focus:ring-secondary"
                  >
                    {POWER_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-mono text-sm font-semibold mb-1">Descricao</label>
                  <textarea
                    value={customPower.description}
                    onChange={(e) => setCustomPower({ ...customPower, description: e.target.value })}
                    placeholder="Descreva o funcionamento do poder..."
                    rows={4}
                    className="w-full p-3 border-2 border-foreground rounded bg-card focus:outline-none focus:ring-2 focus:ring-secondary resize-none"
                  />
                </div>

                <button
                  onClick={handleCreateCustomPower}
                  disabled={!customPower.name.trim()}
                  className="w-full p-4 bg-primary text-primary-foreground font-bold text-lg rounded border-2 border-foreground comic-shadow transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Criar Poder (Nivel {selectedLevel})
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredPowers.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p className="text-lg">Nenhum poder encontrado</p>
                    <p className="text-sm mt-2">Tente outra busca ou crie um poder personalizado</p>
                  </div>
                ) : (
                  filteredPowers.map((power) => (
                    <div
                      key={power.nome}
                      className={`border-3 border-foreground rounded-lg overflow-hidden transition-all ${CATEGORY_BORDER_COLORS[power.categoria as PowerCategory]}`}
                    >
                      <div
                        className="p-4 bg-card cursor-pointer hover:bg-muted/50 transition-colors"
                        onClick={() => setExpandedPower(expandedPower === power.nome ? null : power.nome)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className={`p-2 rounded ${CATEGORY_COLORS[power.categoria as PowerCategory]} text-white`}>
                              {CATEGORY_ICONS[power.categoria as PowerCategory]}
                            </span>
                            <div>
                              <h4 className="font-bold text-lg">{power.nome}</h4>
                              <p className="text-sm text-muted-foreground">{power.descricao}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`px-2 py-1 rounded text-xs font-mono ${CATEGORY_COLORS[power.categoria as PowerCategory]} text-white`}>
                              {power.categoria}
                            </span>
                            {expandedPower === power.nome ? (
                              <ChevronUp className="w-5 h-5" />
                            ) : (
                              <ChevronDown className="w-5 h-5" />
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Expanded Details */}
                      {expandedPower === power.nome && (
                        <div className="p-4 bg-muted/30 border-t-2 border-foreground/20 space-y-3">
                          {power.mecanica && (
                            <div>
                              <span className="font-mono text-xs font-bold text-muted-foreground uppercase">Mecanica:</span>
                              <p className="text-sm mt-1">{power.mecanica}</p>
                            </div>
                          )}

                          {power.exemplo && (
                            <div>
                              <span className="font-mono text-xs font-bold text-muted-foreground uppercase">Exemplo:</span>
                              <p className="text-sm mt-1 italic">{power.exemplo}</p>
                            </div>
                          )}

                          {power.extras && power.extras.length > 0 && (
                            <div>
                              <span className="font-mono text-xs font-bold text-green-600 uppercase">Extras Possiveis:</span>
                              <ul className="text-sm mt-1 list-disc list-inside">
                                {power.extras.map((extra, i) => (
                                  <li key={i}>{extra}</li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {power.limitacoes && power.limitacoes.length > 0 && (
                            <div>
                              <span className="font-mono text-xs font-bold text-red-600 uppercase">Limitacoes:</span>
                              <ul className="text-sm mt-1 list-disc list-inside">
                                {power.limitacoes.map((lim, i) => (
                                  <li key={i}>{lim}</li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {power.variacoes && power.variacoes.length > 0 && (
                            <div>
                              <span className="font-mono text-xs font-bold text-purple-600 uppercase">Variacoes:</span>
                              <div className="mt-1 space-y-2">
                                {power.variacoes.map((v, i) => (
                                  <div key={i} className="text-sm bg-card p-2 rounded border border-foreground/20">
                                    <strong>{v.tipo}:</strong> {v.beneficios.join(', ')}
                                    {v.detalhe && <span className="text-muted-foreground"> - {v.detalhe}</span>}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {power.niveis_de_sucesso && (
                            <div>
                              <span className="font-mono text-xs font-bold text-blue-600 uppercase">Niveis de Sucesso:</span>
                              <div className="mt-1 space-y-1">
                                {Object.entries(power.niveis_de_sucesso).map(([key, value]) => (
                                  <div key={key} className="text-sm">
                                    <strong>{key}:</strong> {value}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          <button
                            onClick={() => handleSelectPower(power)}
                            className="w-full mt-4 p-3 bg-secondary text-secondary-foreground font-bold rounded border-2 border-foreground comic-shadow-sm transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none flex items-center justify-center gap-2"
                          >
                            <Plus className="w-5 h-5" />
                            Adicionar {power.nome} (Nivel {selectedLevel})
                          </button>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
