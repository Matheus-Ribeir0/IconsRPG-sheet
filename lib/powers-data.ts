import { Power } from './types';

export interface PowerDefinition {
  nome: string;
  descricao: string;
  mecanica?: string;
  exemplo?: string;
  extras?: string[];
  limitacoes?: string[];
  opcoes?: string[];
  variacoes?: { tipo: string; beneficios: string[]; detalhe?: string }[];
  niveis_de_sucesso?: Record<string, string>;
  tipos?: string[] | { nome: string; detalhe: string }[];
  efeitos_possiveis?: string[];
  beneficios?: string[];
  categoria: string;
}

export const POWER_CATEGORIES = [
  'Alteracao',
  'Controle',
  'Defensivo',
  'Mental',
  'Movimento',
  'Ofensivo',
  'Sensorial',
] as const;

export type PowerCategory = typeof POWER_CATEGORIES[number];

export const POWERS_DATABASE: PowerDefinition[] = [
  // ALTERACAO
  {
    nome: 'Melhorar Habilidade',
    descricao: 'Aumenta temporariamente um atributo ou poder.',
    mecanica: 'Melhora a habilidade ate o nivel do poder por uma duracao de paginas igual ao nivel. Apos o uso, a habilidade cai 1 nivel abaixo do normal pela mesma duracao para recuperacao.',
    exemplo: 'Supervelocidade 10 dura 10 paginas; apos isso, velocidade cai a 0 por 10 paginas.',
    categoria: 'Alteracao',
  },
  {
    nome: 'Aumentar Habilidade',
    descricao: 'Aumento permanente de habilidade.',
    mecanica: 'Aumenta permanentemente ate o nivel 6 ou em +2 (maximo 10). Se atingir 7+, conta para o nivel de Determinacao.',
    categoria: 'Alteracao',
  },
  {
    nome: 'Alter Ego',
    descricao: 'Transformacao em um personagem totalmente diferente.',
    mecanica: 'O alter ego tem um poder a menos (que e este proprio poder). Habilidades de origem e mentais costumam ser mantidas para coerencia.',
    categoria: 'Alteracao',
  },
  {
    nome: 'Forma Alternativa',
    descricao: 'Transformacao fisica completa (exige 1 pagina de preparo ou reacao via extra).',
    mecanica: 'Suporte de Vida completo enquanto transformado.',
    variacoes: [
      { tipo: 'Energia', beneficios: ['Voo', 'Imunidade fisica', 'Sem Vigor'], detalhe: 'Pode adquirir Controlar Energia como extra.' },
      { tipo: 'Explosiva', beneficios: ['Auto detonacao como Rajada (Explosao)', 'Imunidade fisica ate se reconstruir'], detalhe: 'Pode se reconstruir em alcance longo.' },
      { tipo: 'Fluida', beneficios: ['Passar por frestas', 'Resistencia a Dano', 'Elasticidade'] },
      { tipo: 'Gasosa', beneficios: ['Voo 1', 'Atravessar aberturas nao hermeticas', 'Imunidade fisica (exceto dispersao de nuvens)'] },
      { tipo: 'Sombra', beneficios: ['Sem Vigor', 'Imunidade fisica (exceto luz)', 'Escalar', 'Invisibilidade em sombras'] },
      { tipo: 'Solida', beneficios: ['Vigor = nivel ou Vigor+1', 'Resistencia a Dano'] },
    ],
    categoria: 'Alteracao',
  },
  {
    nome: 'Aquatico',
    descricao: 'Acao submersa.',
    mecanica: 'Respira debaixo d\'agua. Coordenacao e Atencao = Atributo+1 ou Nivel do Poder. Natacao = metade do nivel.',
    extras: ['Proeza e Vigor aumentados enquanto submerso'],
    categoria: 'Alteracao',
  },
  {
    nome: 'Densidade',
    descricao: 'Controle de densidade corporal.',
    mecanica: 'Vigor = Nivel do poder ou Vigor+1. Ganha Resistencia a Dano igual ao nivel.',
    limitacoes: ['Coordenacao reduzida (10 menos nivel de densidade, minimo 1)'],
    extras: ['Intangibilidade ao diminuir densidade'],
    categoria: 'Alteracao',
  },
  {
    nome: 'Duplicacao',
    descricao: 'Criar copias de si mesmo.',
    mecanica: 'Cria duplicatas que agem independentemente. Numero maximo de copias igual ao nivel do poder.',
    categoria: 'Alteracao',
  },
  {
    nome: 'Partes Corporais Extras',
    descricao: 'Membros adicionais (bracos, tentaculos, etc).',
    mecanica: 'Cada membro extra permite uma acao adicional ou bonus em certas situacoes.',
    categoria: 'Alteracao',
  },
  {
    nome: 'Crescimento',
    descricao: 'Aumento de tamanho.',
    mecanica: 'Vigor aumenta com o tamanho. Pode causar dificuldade em ambientes apertados.',
    categoria: 'Alteracao',
  },
  {
    nome: 'Invisibilidade',
    descricao: 'Tornar-se invisivel.',
    mecanica: 'Nao pode ser visto normalmente. Deteccao requer sentidos especiais ou teste de Atencao dificil.',
    categoria: 'Alteracao',
  },
  {
    nome: 'Intangibilidade',
    descricao: 'Tornar-se insubstancial.',
    mecanica: 'Imune a ataques fisicos; atravessa objetos solidos. Campos de energia exigem teste de Intangibilidade vs Nivel do Campo.',
    limitacoes: ['Poderes mentais contra fisicos tem +2 de dificuldade'],
    extras: ['Suporte Vital Absoluto enquanto intangivel'],
    categoria: 'Alteracao',
  },
  {
    nome: 'Encolher',
    descricao: 'Reducao de tamanho.',
    mecanica: 'Ganha condicao "Pequeno". Bonus de ataque/defesa (+1 a +3). Niveis 9-10 atingem escala atomica/microscopica.',
    beneficios: ['Passar por frestas moleculares em tamanhos microscopicos'],
    categoria: 'Alteracao',
  },
  {
    nome: 'Mimetismo Animal',
    descricao: 'Copiar habilidades de animais.',
    mecanica: 'Pode usar habilidades de um animal especifico ate o nivel do poder.',
    categoria: 'Alteracao',
  },
  {
    nome: 'Mimetismo Material',
    descricao: 'Copiar propriedades de materiais.',
    mecanica: 'Corpo assume as propriedades do material tocado.',
    categoria: 'Alteracao',
  },
  {
    nome: 'Mimetismo Vegetal',
    descricao: 'Copiar caracteristicas de plantas.',
    mecanica: 'Pode usar habilidades de plantas ate o nivel do poder.',
    categoria: 'Alteracao',
  },
  {
    nome: 'Imitar Power',
    descricao: 'Copiar poderes de outros.',
    mecanica: 'Pode usar um poder de outro personagem ate o nivel do poder.',
    categoria: 'Alteracao',
  },
  {
    nome: 'Elasticidade',
    descricao: 'Alongamento de membros.',
    mecanica: 'Alcanca longo alcance. Atributos superiores ao nivel do poder sao limitados por ele na distancia longa. Ajuda a escapar.',
    categoria: 'Alteracao',
  },
  {
    nome: 'Transformacao',
    descricao: 'Mudar para outras formas.',
    opcoes: [
      'Animais - Habilidades fisicas = Nivel do Poder ou do Animal (o que for menor)',
      'Humanoides - Copia exata (voz, DNA, digitais). Sem poderes do alvo',
      'Objetos - Propriedades fisicas do objeto ate o nivel do poder',
    ],
    categoria: 'Alteracao',
  },
  
  // CONTROLE
  {
    nome: 'Raio Alterador',
    descricao: 'Projeta um poder de alteracao a longo alcance.',
    mecanica: 'Teste de Coordenacao vs Coordenacao. Alvos afetados por: Densidade, Crescimento, Invisibilidade, Intangibilidade, Encolher ou Transformacao.',
    categoria: 'Controle',
  },
  {
    nome: 'Controlar Elementos',
    descricao: 'Controle sobre elementos naturais (fogo, agua, terra, ar).',
    mecanica: 'Manipula o elemento escolhido ate o nivel do poder.',
    categoria: 'Controle',
  },
  {
    nome: 'Controlar Probabilidade',
    descricao: 'Influencia sobre o azar e sorte.',
    mecanica: 'Ganha PDs extras iguais ao nivel (renovam como PDs regulares) apenas para a condicao "sorte".',
    tipos: ['Boa Sorte (esforco/retcons)', 'Ma Sorte (desafios para outros)'],
    extras: ['Usar ambos (Boa e Ma)'],
    categoria: 'Controle',
  },
  {
    nome: 'Controle do Tempo',
    descricao: 'Manipulacao temporal.',
    efeitos_possiveis: ['Duplicacao', 'Ataque Rapido', 'Visao Futuro/Passado', 'Atordoar', 'Supervelocidade', 'Viagem no Tempo'],
    mecanica: 'Inicia com um efeito; outros comprados como extras.',
    categoria: 'Controle',
  },
  {
    nome: 'Controlar Energia',
    descricao: 'Manipulacao de tipos de energia.',
    mecanica: 'Controla um tipo especifico de energia ate o nivel do poder.',
    categoria: 'Controle',
  },
  {
    nome: 'Cura',
    descricao: 'Restaurar Energia de outros.',
    mecanica: 'Restaura Energia igual ao nivel do poder por uso.',
    categoria: 'Controle',
  },
  {
    nome: 'Telecinese',
    descricao: 'Mover objetos com a mente.',
    mecanica: 'Nivel do poder = Vigor. Vontade = Coordenacao.',
    categoria: 'Controle',
  },
  {
    nome: 'Transmutacao',
    descricao: 'Transformar materia inanimada ao toque.',
    mecanica: 'Quantidade de massa limitada pelo nivel (Tabela de Peso).',
    extras: ['Transmuta a longo alcance'],
    categoria: 'Controle',
  },
  {
    nome: 'Poder Cosmico',
    descricao: 'Duplicacao de forcas primordiais.',
    mecanica: 'Escolha um efeito de poder para duplicar. Funciona como um "coringa" de poderes energeticos.',
    categoria: 'Controle',
  },
  {
    nome: 'Dispositivos',
    descricao: 'Equipamentos tecnologicos ou magicos.',
    mecanica: 'Poderes derivados de equipamentos que podem ser perdidos ou danificados.',
    categoria: 'Controle',
  },
  {
    nome: 'Magia',
    descricao: 'Poderes derivados de forca arcana.',
    mecanica: 'Funciona como Poder Cosmico, mas com limitacoes tematicas.',
    categoria: 'Controle',
  },
  {
    nome: 'Anulacao',
    descricao: 'Cancelar poderes de outros.',
    mecanica: 'Teste contra o nivel do poder alvo para anular temporariamente.',
    categoria: 'Controle',
  },
  {
    nome: 'Servo',
    descricao: 'Convocar ou criar um lacaio.',
    mecanica: '1 pagina de preparo. Reserva de pontos = 4x nivel do poder para comprar Proeza, Vigor, Coordenacao e Poderes.',
    limitacoes: ['Sem habilidades mentais ou Determinacao', 'Exige concentracao'],
    categoria: 'Controle',
  },
  
  // DEFENSIVO
  {
    nome: 'Absorcao',
    descricao: 'Absorve tipos especificos de ataques (impactos ou energia).',
    mecanica: 'Subtrai o nivel de Absorcao do nivel do ataque. Se chegar a 0, nao ha efeito. O restante aplica-se a Resistencia normal.',
    extras: [
      'Melhorar Habilidade (usar energia absorvida como bonus)',
      'Rajada (liberar energia no proximo quadro)',
      'Cura (recuperar Energia)',
      'Amplo (protege contra todos os danos fisicos ou energeticos)',
    ],
    categoria: 'Defensivo',
  },
  {
    nome: 'Adaptacao',
    descricao: 'Transformacao para sobreviver em ambientes hostis.',
    mecanica: 'Exige 1 pagina de preparacao. Concede beneficios (Vigor, Suporte de Vida, etc.) iguais ao nivel do poder enquanto durar a exposicao.',
    extras: ['Adaptacao instantanea como reacao'],
    categoria: 'Defensivo',
  },
  {
    nome: 'Campo de Forca',
    descricao: 'Barreira de energia protetora.',
    mecanica: 'Cria uma barreira com resistencia igual ao nivel do poder.',
    categoria: 'Defensivo',
  },
  {
    nome: 'Imortalidade',
    descricao: 'Nao pode morrer permanentemente.',
    mecanica: 'Retorna a vida apos um periodo determinado pelo nivel do poder.',
    categoria: 'Defensivo',
  },
  {
    nome: 'Suporte de Vida',
    descricao: 'Sobreviver em ambientes hostis.',
    mecanica: 'Imunidade a condicoes ambientais (vacuo, pressao, temperatura extrema).',
    categoria: 'Defensivo',
  },
  {
    nome: 'Reflexao',
    descricao: 'Enviar ataque de volta ao oponente.',
    mecanica: 'Teste como reacao (Dificuldade = Nivel do Ataque).',
    niveis_de_sucesso: {
      'Falha': 'Sofre efeitos normais.',
      'Sucesso Menor': 'Ambos sofrem metade (arredondado para cima para o atacante).',
      'Sucesso Moderado': 'Voce nao e afetado; teste de ataque normal como reacao.',
      'Sucesso Maior ou Decisivo': 'Ataque refletido e acerta automaticamente.',
    },
    categoria: 'Defensivo',
  },
  {
    nome: 'Regeneracao',
    descricao: 'Recuperacao automatica de energia e vigor.',
    mecanica: 'Energia recuperada igual ao nivel a cada 10 paginas. Vigor recuperado igual ao nivel por semana.',
    beneficios: ['Ao usar Vantagem para recuperar, usa o maior entre Vigor, Vontade ou Regeneracao'],
    categoria: 'Defensivo',
  },
  {
    nome: 'Resistencia',
    descricao: 'Protecao contra efeitos especificos (Dano, Mental, etc).',
    mecanica: 'Subtrai nivel de resistencia do nivel do efeito. Nivel 10 concede imunidade essencial.',
    opcoes: ['Impactos', 'Frio', 'Eletricidade', 'Radiacao', 'Ilusoes'],
    categoria: 'Defensivo',
  },
  
  // MENTAL
  {
    nome: 'Projecao Astral',
    descricao: 'Separacao do espirito do corpo fisico.',
    mecanica: 'Forma astral possui Voo e Intangibilidade. Pode observar o mundo fisico. Corpo fica em coma.',
    limitacoes: ['Poderes mentais contra fisicos tem +2 de dificuldade'],
    categoria: 'Mental',
  },
  {
    nome: 'Controlar Emocoes',
    descricao: 'Influenciar os sentimentos de outros.',
    mecanica: 'Teste contra Vontade do alvo para induzir emocoes.',
    categoria: 'Mental',
  },
  {
    nome: 'Ilusionismo',
    descricao: 'Criar ilusoes na mente de outros.',
    mecanica: 'Alvo acredita na ilusao ate passar em teste de Vontade.',
    categoria: 'Mental',
  },
  {
    nome: 'Imagens',
    descricao: 'Criar ilusoes visuais reais.',
    mecanica: 'Cria imagens que podem ser vistas por todos, mas nao sao solidas.',
    categoria: 'Mental',
  },
  {
    nome: 'Rajada Mental',
    descricao: 'Ataque psiquico.',
    mecanica: 'Dano mental igual ao nivel. Ignora armaduras fisicas.',
    categoria: 'Mental',
  },
  {
    nome: 'Controlar Mentes',
    descricao: 'Dominar a vontade de outros.',
    mecanica: 'Teste contra Vontade para controlar acoes do alvo.',
    categoria: 'Mental',
  },
  {
    nome: 'Escudo Mental',
    descricao: 'Protecao contra ataques psiquicos.',
    mecanica: 'Adiciona nivel a Vontade para resistir ataques mentais.',
    categoria: 'Mental',
  },
  {
    nome: 'Telepatia',
    descricao: 'Comunicacao e leitura mental.',
    mecanica: 'Teste Telepatia vs Vontade. Pode criar conferencia mental (limite = nivel do poder).',
    beneficios: ['Usa maior entre Telepatia ou Vontade para resistir a intrusao'],
    categoria: 'Mental',
  },
  
  // MOVIMENTO
  {
    nome: 'Escavar',
    descricao: 'Cavar atraves do chao.',
    mecanica: 'Velocidade normal atraves de material com resistencia igual ou menor ao nivel. Materiais mais duros reduzem a velocidade.',
    opcoes: ['Deixar tunel aberto', 'Bloquear tunel'],
    categoria: 'Movimento',
  },
  {
    nome: 'Viagem Dimensional',
    descricao: 'Mover-se entre dimensoes.',
    mecanica: 'Teste de dificuldade 3 para novas dimensoes. Nivel 8+ e automatico.',
    extras: ['Ignorar teste independente do nivel'],
    categoria: 'Movimento',
  },
  {
    nome: 'Voo',
    descricao: 'Capacidade de voar.',
    mecanica: 'Velocidade de voo igual ao nivel do poder.',
    categoria: 'Movimento',
  },
  {
    nome: 'Saltar',
    descricao: 'Pulos sobre-humanos.',
    mecanica: 'Distancia de salto baseada no nivel do poder.',
    categoria: 'Movimento',
  },
  {
    nome: 'Rodopiar',
    descricao: 'Giro em velocidade sobre-humana.',
    beneficios: [
      'Resistencia a Imobilizacao/Luta Livre',
      'Barreira de vento (Coordenacao = Nivel do Poder para defesa)',
      'Usa Nivel do Poder para Dano e Agarrar',
    ],
    categoria: 'Movimento',
  },
  {
    nome: 'Supervelocidade',
    descricao: 'Movimento rapido e tarefas aceleradas.',
    extras: ['Ataque Rapido', 'Intangibilidade', 'Regeneracao', 'Rodopiar', 'Correr em paredes/agua', 'Controle de Vibracao'],
    categoria: 'Movimento',
  },
  {
    nome: 'Balancar',
    descricao: 'Uso de cabos, teias ou ganchos.',
    mecanica: 'Resistencia do cabo = Nivel. Usa maior entre Balancar ou Coordenacao para manobras.',
    beneficios: ['Puxar objetos (Coordenacao) ou pessoas (Vigor vs Vigor)'],
    categoria: 'Movimento',
  },
  {
    nome: 'Teletransporte',
    descricao: 'Deslocamento instantaneo.',
    mecanica: 'Teste de dificuldade 2 (falha causa atordoamento). Nivel 7+ automatico.',
    extras: ['Portal de mao dupla'],
    categoria: 'Movimento',
  },
  {
    nome: 'Escalar',
    descricao: 'Movimento em paredes e tetos.',
    mecanica: 'Velocidade normal. Superficies lisas/escorregadias exigem teste de poder.',
    categoria: 'Movimento',
  },
  
  // OFENSIVO
  {
    nome: 'Aflicao',
    descricao: 'Funciona como doenca ou toxina via toque.',
    mecanica: 'Teste de Proeza para tocar + Teste de Aflicao vs Vigor/Regeneracao do alvo.',
    niveis_de_sucesso: {
      'Falha Critica ou Maior': 'Fim dos efeitos.',
      'Falha Moderada': 'Sem efeito na pagina, mas exige novo teste na proxima.',
      'Sucesso Menor': 'Dano de Energia (metade do nivel) ignorando Resistencia a Dano. Continua na proxima pagina.',
      'Sucesso Moderado ou Acima': 'Dano de Energia (nivel total) ignorando Resistencia a Dano. Continua na proxima pagina.',
    },
    opcoes: ['Inconsciencia (atordoamento maior)', 'Perda de Vigor (morte maior)'],
    categoria: 'Ofensivo',
  },
  {
    nome: 'Imobilizar',
    descricao: 'Ataque de longo alcance (teias, gelo, lama).',
    mecanica: 'Resistencia Material do prendedor = nivel do poder. Teste de Coordenacao vs Coordenacao.',
    niveis_de_sucesso: {
      'Falha': 'Sem efeito.',
      'Sucesso Menor': 'Preso parcialmente; Material cai pela metade.',
      'Sucesso Moderado': 'Preso parcialmente; Penalidade de -2 em acoes; sem movimento.',
      'Sucesso Maior ou Decisivo': 'Prisao total; Apenas acao de escapar e permitida.',
    },
    categoria: 'Ofensivo',
  },
  {
    nome: 'Rajada',
    descricao: 'Ataque agressivo a longo alcance.',
    mecanica: 'Dano igual ao nivel. Escolha entre Impacto ou Disparo.',
    extras: ['Capacidade de alternar entre Impacto e Disparo'],
    categoria: 'Ofensivo',
  },
  {
    nome: 'Golpe',
    descricao: 'Ataque corpo a corpo (garras, armas).',
    mecanica: 'Usa Proeza. Dano = Nivel. Minimo Vigor+1 para contusao.',
    extras: ['Pode ser Contusao e Corte simultaneamente'],
    categoria: 'Ofensivo',
  },
  {
    nome: 'Aura',
    descricao: 'Efeito nocivo (fogo, acido, espinhos) ao redor do corpo.',
    mecanica: 'Dano igual ao nivel em qualquer um que toque ou seja tocado deliberadamente. Funciona como Efeito Secundario em ataques de Vigor.',
    categoria: 'Ofensivo',
  },
  {
    nome: 'Embotar (Dazzle)',
    descricao: 'Sobrepujar um sentido (luz ofuscante, som, etc).',
    mecanica: 'Teste Coordenacao vs Coordenacao a longo alcance.',
    niveis_de_sucesso: {
      'Falha ou Menor': 'Sem efeito.',
      'Sucesso Moderado': 'Perda do sentido por 1 pagina.',
      'Sucesso Maior': 'Perda do sentido por 1 pagina por nivel do poder.',
      'Sucesso Decisivo': 'Perda do sentido pelo resto do capitulo.',
    },
    beneficios: ['+2 na dificuldade de acoes que dependem do sentido'],
    categoria: 'Ofensivo',
  },
  {
    nome: 'Drenar Energia',
    descricao: 'Roubar energia vital de outros.',
    mecanica: 'Drena Energia do alvo igual ao nivel do poder.',
    categoria: 'Ofensivo',
  },
  {
    nome: 'Ataque Rapido',
    descricao: 'Multiplos ataques em sequencia.',
    mecanica: 'Permite atacar multiplos alvos ou o mesmo alvo varias vezes.',
    categoria: 'Ofensivo',
  },
  {
    nome: 'Atordoar',
    descricao: 'Incapacitar o adversario.',
    mecanica: 'Teste Coordenacao vs Coordenacao + Teste Nivel Poder vs Vigor ou Vontade.',
    niveis_de_sucesso: {
      'Falha ou Menor': 'Sem efeito.',
      'Sucesso Moderado': 'Alvo parado por 1 pagina.',
      'Sucesso Maior': 'Alvo parado por paginas igual ao nivel do poder.',
      'Sucesso Decisivo': 'Alvo parado pelo resto do capitulo.',
    },
    categoria: 'Ofensivo',
  },
  
  // SENSORIAL
  {
    nome: 'Deteccao',
    descricao: 'Detectar energia, presenca ou magia.',
    mecanica: 'Usa Atencao igual ao nivel do poder para tipos especificos (Cosmica, Magia, etc).',
    extras: ['Detectar multiplos tipos', 'Alcance infinito/rastreio'],
    categoria: 'Sensorial',
  },
  {
    nome: 'P.E.S.',
    descricao: 'Percepcao Extra-Sensorial.',
    mecanica: 'Sentidos que vao alem dos normais, como clarividencia ou clariaudiencia.',
    categoria: 'Sensorial',
  },
  {
    nome: 'Supersentidos',
    descricao: 'Sentidos expandidos.',
    tipos: [
      { nome: 'Adicional', detalhe: 'Infravermelho, radar, raios X, etc.' },
      { nome: 'Melhorado', detalhe: '+1 em testes de Atencao por nivel.' },
      { nome: 'Expandido', detalhe: 'Diminui penalidade de alcance por nivel.' },
    ],
    categoria: 'Sensorial',
  },
  {
    nome: 'Sensor de Perigo',
    descricao: 'Sexto sentido para ameacas.',
    mecanica: 'Usa nivel do poder para reacoes de defesa e testes de Atencao. Se nivel for menor que o atributo, ganha +1 de bonus.',
    categoria: 'Sensorial',
  },
  {
    nome: 'Interligar',
    descricao: 'Conexao sensorial com outros.',
    mecanica: 'Compartilha sentidos com alvos conectados.',
    categoria: 'Sensorial',
  },
  {
    nome: 'Visao do Passado',
    descricao: 'Percepcao de eventos no passado.',
    mecanica: 'Teste de poder contra dificuldade baseada na distancia temporal.',
    niveis_de_sucesso: {
      'Falha Maior ou Pior': 'Informacoes falsas ou visoes erroneas.',
      'Falha': 'Sem informacao; exige Esforco Determinado para repetir.',
      'Sucesso Menor': 'Sem informacao, mas permite nova tentativa.',
      'Sucesso Moderado': 'Pistas confusas e abertas a interpretacao.',
      'Sucesso Decisivo': 'Visao clara e detalhada.',
    },
    categoria: 'Sensorial',
  },
  {
    nome: 'Visao do Futuro',
    descricao: 'Percepcao de eventos no futuro.',
    mecanica: 'Teste de poder contra dificuldade baseada na distancia temporal.',
    niveis_de_sucesso: {
      'Falha Maior ou Pior': 'Informacoes falsas ou visoes erroneas.',
      'Falha': 'Sem informacao; exige Esforco Determinado para repetir.',
      'Sucesso Menor': 'Sem informacao, mas permite nova tentativa.',
      'Sucesso Moderado': 'Pistas confusas e abertas a interpretacao.',
      'Sucesso Decisivo': 'Visao clara e detalhada.',
    },
    extras: ['Sensor de Perigo'],
    categoria: 'Sensorial',
  },
];

export function getPowersByCategory(category: PowerCategory): PowerDefinition[] {
  return POWERS_DATABASE.filter(p => p.categoria === category);
}

export function searchPowers(query: string): PowerDefinition[] {
  const lowerQuery = query.toLowerCase();
  return POWERS_DATABASE.filter(p =>
    p.nome.toLowerCase().includes(lowerQuery) ||
    p.descricao.toLowerCase().includes(lowerQuery)
  );
}

export function createPowerFromDefinition(definition: PowerDefinition, level: number = 1): Power {
  return {
    id: crypto.randomUUID(),
    name: definition.nome,
    level,
    type: definition.categoria as Power['type'],
    description: definition.descricao,
    extras: [],
    limits: [],
  };
}
