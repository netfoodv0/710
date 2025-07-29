import { Categoria, CategoriaAdicional } from './index';

// Tipos principais de produtos
export interface Produto {
  id: string;
  nome: string;
  descricao: string;
  preco: number;
  categoria: string;
  categoriaId: string;
  imagem?: string;
  ativo: boolean;
  status: 'ativo' | 'inativo' | 'em_falta';
  tempoPreparoMinutos: number;
  ingredientes: string[];
  extras: Extra[];
  
  // Novos campos básicos
  tamanhoPorcao?: number; // Serve até X pessoas
  desconto?: DescontoProduto;
  agendamentoObrigatorio: boolean;
  destacado: boolean;
  
  // Mídia
  galeriaFotos?: string[];
  
  // Complementos
  complementos?: string[]; // IDs das categorias de complementos
  
  // Classificações
  classificacoes?: ClassificacaoProduto;
  
  // Disponibilidade
  disponibilidade?: DisponibilidadeProduto;
  
  // SEO e Marketing
  slug: string;
  tags: string[];
  metaDescription?: string;
  
  // Vendas e Analytics
  vendasTotais: number;
  avaliacaoMedia: number;
  numeroAvaliacoes: number;
  
  // Controle de Estoque
  estoque?: EstoqueProduto;
  
  // Personalização
  variacoes?: VariacaoProduto[];
  ingredientesObrigatorios?: string[];
  ingredientesOpcionais?: string[];
  
  // Integração
  codigoExterno?: string;
  sincronizadoComIfood: boolean;
  
  // Metadados
  dataCriacao: Date;
  dataAtualizacao: Date;
}

export interface Extra {
  id: string;
  nome: string;
  preco: number;
}

export interface DescontoProduto {
  id: string;
  tipo: 'percentual' | 'valor_fixo';
  valor: number;
  ativo: boolean;
  dataInicio?: Date;
  dataFim?: Date;
}

export interface ClassificacaoProduto {
  // Restrições alimentares
  semIngredientesOrigemAnimal: boolean;
  semCarne: boolean;
  semLactose: boolean;
  semAcucar: boolean;
  cultivadoSemAgrotoxicos: boolean;
  
  // Para bebidas
  servidoGelado: boolean;
  teorAlcoolico?: number; // 0.5% a 54%
  preparadoComFrutasFrescas: boolean;
}

export interface DisponibilidadeProduto {
  id: string;
  produtoId: string;
  diasSemana: DiaSemana[];
  horarioInicio: string; // HH:mm
  horarioFim: string; // HH:mm
  ativo: boolean;
}

export interface DiaSemana {
  id: number; // 0-6 (domingo a sábado)
  nome: string;
  ativo: boolean;
}

export interface EstoqueProduto {
  quantidade: number;
  minimo: number;
  maximo: number;
  alertaEstoque: boolean;
}

export interface VariacaoProduto {
  id: string;
  nome: string; // Ex: "Pequeno", "Médio", "Grande"
  preco: number;
  ativo: boolean;
}

// Templates de produtos
export interface TemplateProduto {
  id: string;
  nome: string;
  categoria: string;
  camposPredefinidos: Partial<Produto>;
  classificacoes: ClassificacaoProduto;
}

// Score de qualidade
export interface ScoreQualidade {
  total: number; // 0-100
  categorias: {
    informacoes: number;
    midia: number;
    classificacoes: number;
    disponibilidade: number;
  };
  sugestoes: string[];
}

// Validação
export interface ValidacaoProduto {
  camposObrigatorios: string[];
  precoMinimo: number;
  tamanhoImagem: { width: number; height: number };
  tamanhoMaximoArquivo: number;
  sugestoes: {
    adicionarFoto: boolean;
    melhorarDescricao: boolean;
    adicionarClassificacoes: boolean;
  };
}

// Versões de produtos
export interface VersaoProduto {
  id: string;
  produtoId: string;
  dados: Produto;
  dataCriacao: Date;
  autor: string;
  comentario?: string;
  aprovado: boolean;
}

// Métricas
export interface MetricasProduto {
  visualizacoes: number;
  cliques: number;
  conversoes: number;
  tempoMedioVisualizacao: number;
  taxaEngajamento: number;
}

// Templates de layout
export interface TemplateLayout {
  id: string;
  nome: string;
  categoria: string;
  layout: {
    posicaoFoto: 'top' | 'left' | 'right';
    tamanhoFoto: 'small' | 'medium' | 'large';
    estiloPreco: 'destaque' | 'discreto';
    corDestaque: string;
  };
}

// Integrações externas
export interface IntegracaoExterna {
  ifood: {
    sincronizar: boolean;
    codigoProduto?: string;
  };
  rappi: {
    sincronizar: boolean;
    codigoProduto?: string;
  };
  uberEats: {
    sincronizar: boolean;
    codigoProduto?: string;
  };
}

// Wizard de criação
export type StepWizard = 
  | 'informacoes-basicas'
  | 'selecionar-categoria'
  | 'upload-fotos'
  | 'configurar-preco'
  | 'adicionar-complementos'
  | 'classificacoes'
  | 'disponibilidade'
  | 'revisao-final';

// Props para componentes
export interface ModalProdutoProps {
  isOpen: boolean;
  onClose: () => void;
  produto?: Produto;
  onSave: (produto: Omit<Produto, 'id' | 'dataCriacao' | 'dataAtualizacao'>) => Promise<void>;
  onEdit?: (id: string, produto: Partial<Produto>) => Promise<void>;
  onDelete?: (id: string) => Promise<void>;
  onDuplicate?: (id: string) => Promise<void>;
  loading?: boolean;
}

export interface FormularioProdutoProps {
  produto?: Produto;
  categorias: Categoria[];
  categoriasAdicionais: CategoriaAdicional[];
  onSubmit: (data: Partial<Produto>) => void;
  onCancel: () => void;
  loading?: boolean;
  modo?: 'rapido' | 'avancado';
  formRef?: React.RefObject<HTMLFormElement>;
}

export interface UploadImagemProps {
  onUpload: (file: File) => Promise<string>;
  onRemove: (url: string) => void;
  imagens: string[];
  maxImagens?: number;
  loading?: boolean;
}

export interface ClassificacoesProdutoProps {
  classificacoes: ClassificacaoProduto;
  onChange: (classificacoes: ClassificacaoProduto) => void;
  tipoProduto?: 'comida' | 'bebida';
}

export interface DisponibilidadeProdutoProps {
  disponibilidade?: DisponibilidadeProduto;
  onChange: (disponibilidade: DisponibilidadeProduto) => void;
  produtoId: string;
}

export interface DescontoProdutoProps {
  desconto?: DescontoProduto;
  onChange: (desconto: DescontoProduto) => void;
}

export interface ComplementosProdutoProps {
  complementos: string[];
  categoriasAdicionais: CategoriaAdicional[];
  onChange: (complementos: string[]) => void;
}

export interface ListaProdutosProps {
  produtos: Produto[];
  categorias: Categoria[];
  loading: boolean;
  onCreate: (produto: Omit<Produto, 'id' | 'dataCriacao' | 'dataAtualizacao'>) => Promise<void>;
  onEdit: (id: string, produto: Partial<Produto>) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  onDuplicate: (id: string) => Promise<void>;
  onToggleStatus: (id: string, status: Produto['status']) => Promise<void>;
}

// Hooks
export interface UseProdutosReturn {
  produtos: Produto[];
  loading: boolean;
  error: string | null;
  criarProduto: (produto: Omit<Produto, 'id' | 'dataCriacao' | 'dataAtualizacao'>) => Promise<void>;
  editarProduto: (id: string, produto: Partial<Produto>) => Promise<void>;
  excluirProduto: (id: string) => Promise<void>;
  duplicarProduto: (id: string) => Promise<void>;
  buscarProduto: (id: string) => Produto | undefined;
  calcularScoreQualidade: (produto: Produto) => ScoreQualidade;
  validarProduto: (produto: Partial<Produto>) => ValidacaoProduto;
}

export interface UseUploadImagemReturn {
  uploadImagem: (file: File) => Promise<string>;
  uploadMultiplasImagens: (files: File[]) => Promise<string[]>;
  removerImagem: (url: string) => Promise<void>;
  loading: boolean;
  error: string | null;
} 