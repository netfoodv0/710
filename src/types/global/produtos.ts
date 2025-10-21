// Tipos relacionados a produtos

export interface Produto {
  id: string;
  nome: string;
  descricao?: string;
  preco: number;
  categoriaId: string;
  categoriaNome?: string;
  ativo: boolean;
  destacado: boolean;
  posicao: number;
  lojaId: string;
  imagem?: string;
  imagens?: string[];
  tempoPreparo?: number;
  disponibilidade?: PeriodoDisponibilidade[];
  adicionais?: CategoriaAdicional[];
  observacoes?: string;
  dataCriacao: Date;
  dataAtualizacao: Date;
  scoreQualidade?: ScoreQualidade;
  validacao?: ValidacaoProduto;
}

export interface CategoriaAdicional {
  id: string;
  nome: string;
  obrigatorio: boolean;
  limite?: number;
  itens: AdicionalItem[];
}

export interface AdicionalItem {
  id: string;
  nome: string;
  preco: number;
  ativo: boolean;
}

export interface DiaSemana {
  id: number;
  nome: string;
  abreviacao: string;
}

export interface PeriodoDisponibilidade {
  diaSemana: DiaSemana;
  horarioInicio: string;
  horarioFim: string;
  ativo: boolean;
}

export interface ScoreQualidade {
  pontuacao: number;
  maximo: number;
  detalhes: {
    nome: number;
    descricao: number;
    preco: number;
    imagem: number;
    categoria: number;
  };
}

export interface ValidacaoProduto {
  isValid: boolean;
  erros: string[];
  avisos: string[];
}

export interface Extra {
  id: string;
  nome: string;
  preco: number;
  quantidade: number;
}

// Props para componentes
export interface ListaProdutosProps {
  produtos: Produto[];
  categorias?: string[];
  loading?: boolean;
  onCreate?: () => void;
  onEdit?: (produto: Produto) => void;
  onDelete?: (produtoId: string) => void;
  onDuplicate?: (produtoId: string) => void;
  onToggleStatus?: (produtoId: string) => void;
  categoriaSelecionada?: string;
  onShowCategoryToast?: () => void;
  onReorderProdutos?: (produtos: Produto[]) => void;
  onProdutoClick?: (produto: Produto) => void;
  onEditarProduto?: (produto: Produto) => void;
  onRemoverProduto?: (produto: Produto) => void;
}

export interface FormularioProdutoProps {
  produto?: Produto;
  onSubmit: (produto: Omit<Produto, 'id' | 'dataCriacao' | 'dataAtualizacao'>) => void;
  onCancel: () => void;
  loading?: boolean;
}

export interface ModalProdutoProps {
  produto?: Produto;
  isOpen: boolean;
  onClose: () => void;
  onSave: (produto: Omit<Produto, 'id' | 'dataCriacao' | 'dataAtualizacao'>) => void;
  loading?: boolean;
}

export interface UploadImagemProps {
  onUpload: (url: string) => void;
  currentImage?: string;
  multiple?: boolean;
  maxImages?: number;
}

export interface DisponibilidadeProduto {
  diaSemana: DiaSemana;
  horarioInicio: string;
  horarioFim: string;
  ativo: boolean;
}

export interface DisponibilidadeProdutoProps {
  disponibilidade: DisponibilidadeProduto[];
  onChange: (disponibilidade: DisponibilidadeProduto[]) => void;
}

export interface DescontoProduto {
  tipo: 'percentual' | 'valor_fixo';
  valor: number;
  ativo: boolean;
  dataInicio?: Date;
  dataFim?: Date;
}

export interface DescontoProdutoProps {
  desconto: DescontoProduto;
  onChange: (desconto: DescontoProduto) => void;
}

export interface ComplementosProdutoProps {
  adicionais: CategoriaAdicional[];
  onChange: (adicionais: CategoriaAdicional[]) => void;
}

export interface ClassificacaoProduto {
  id: string;
  nome: string;
  cor: string;
  icone?: string;
}

export interface ClassificacoesProdutoProps {
  classificacoes: ClassificacaoProduto[];
  onChange: (classificacoes: ClassificacaoProduto[]) => void;
}