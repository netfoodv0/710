import { Categoria, CategoriaAdicional } from './index';

// Tipos principais de produtos
export interface Produto {
  id: string;
  nome: string;
  descricao: string;
  preco: number;
  precoPromocional?: number;
  categoriaId: string;
  lojaId: string; // ✅ NOVO: Campo para isolamento por loja
  imagem?: string;
  status: 'ativo' | 'inativo' | 'em_falta';
  destacado: boolean;
  vendasTotais: number;
  avaliacaoMedia: number;
  numeroAvaliacoes: number;
  tempoPreparo: number;
  calorias?: number;
  alergenos: string[];
  tags: string[];
  slug: string;
  dataCriacao: Date;
  dataAtualizacao: Date;
}

export interface Categoria {
  id?: string; // ✅ NOVO: Campo opcional
  nome?: string; // ✅ NOVO: Campo opcional
  descricao?: string; // ✅ NOVO: Campo opcional
  lojaId?: string; // ✅ NOVO: Campo opcional para isolamento por loja
  ordem?: number; // ✅ NOVO: Campo opcional
  ativa?: boolean; // ✅ NOVO: Campo opcional
  status?: 'ativo' | 'inativo'; // ✅ NOVO: Campo opcional para consistência
  tipo?: 'padrao' | 'pizza' | 'obrigatorio'; // ✅ NOVO: Campo opcional
  tipoSelecao?: 'unica' | 'multipla' | 'somavel'; // ✅ NOVO: Campo opcional
  quantidadeMinima?: number; // ✅ NOVO: Campo opcional
  quantidadeMaxima?: number; // ✅ NOVO: Campo opcional
  imagem?: string; // ✅ NOVO: Campo opcional
  disponibilidade?: DisponibilidadeCategoria; // ✅ NOVO: Campo opcional para categorias
  dataCriacao?: Date; // ✅ NOVO: Campo opcional
  dataAtualizacao?: Date; // ✅ NOVO: Campo opcional
}

export interface CategoriaAdicional {
  id?: string; // ✅ NOVO: Campo opcional
  nome?: string; // ✅ NOVO: Campo opcional
  descricao?: string; // ✅ NOVO: Campo opcional
  lojaId?: string; // ✅ NOVO: Campo opcional para isolamento por loja
  status?: 'ativo' | 'inativo'; // ✅ NOVO: Campo opcional
  ativa?: boolean; // ✅ NOVO: Campo opcional para consistência
  ordem?: number; // ✅ NOVO: Campo opcional para consistência
  tipo?: 'padrao' | 'pizza' | 'obrigatorio'; // ✅ NOVO: Campo opcional
  tipoSelecao?: 'unica' | 'multipla' | 'somavel'; // ✅ NOVO: Campo opcional
  quantidadeMinima?: number; // ✅ NOVO: Campo opcional
  quantidadeMaxima?: number; // ✅ NOVO: Campo opcional
  imagem?: string; // ✅ NOVO: Campo opcional para consistência
  disponibilidade?: DisponibilidadeCategoria; // ✅ NOVO: Campo opcional
  dataCriacao?: Date; // ✅ NOVO: Campo opcional
  dataAtualizacao?: Date; // ✅ NOVO: Campo opcional
}

export interface DisponibilidadeCategoria {
  segunda?: boolean; // ✅ NOVO: Campo opcional
  terca?: boolean; // ✅ NOVO: Campo opcional
  quarta?: boolean; // ✅ NOVO: Campo opcional
  quinta?: boolean; // ✅ NOVO: Campo opcional
  sexta?: boolean; // ✅ NOVO: Campo opcional
  sabado?: boolean; // ✅ NOVO: Campo opcional
  domingo?: boolean; // ✅ NOVO: Campo opcional
  horarioInicio?: string; // ✅ NOVO: Campo opcional - HH:mm
  horarioFim?: string; // ✅ NOVO: Campo opcional - HH:mm
}

// Re-export do tipo Extra que está em pedidos.ts
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

export interface ClientePedido {
  nome: string;
  telefone: string;
  endereco?: string;
}

export interface ItemPedido {
  nome: string;
  quantidade: number;
  preco: number;
  observacoes?: string;
}

export interface PagamentoPedido {
  valorPago: number;
  statusPagamento: 'pendente' | 'pago' | 'parcial' | 'cancelado';
  dataPagamento?: Date;
}

export interface EnderecoEntrega {
  rua: string;
  numero: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
  complemento?: string;
}

export type StatusPedido = 'novo' | 'confirmado' | 'preparando' | 'saiu_entrega' | 'entregue' | 'cancelado'; 