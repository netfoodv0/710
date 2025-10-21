// Tipos base compartilhados para módulos de estoque
import { DataTableColumn } from '../../../components/ui';

// Tipo base para produtos de estoque
export interface ProdutoEstoqueBase {
  id: string;
  nome: string;
  categoria: string;
  quantidade: number;
  quantidadeMinima: number;
  precoCusto: number;
  custoEstoque: number;
  semControleEstoque: boolean;
  fichaTecnica: string;
  status: 'em_estoque' | 'baixo_estoque' | 'sem_estoque' | 'sem_controle';
  medida: string;
}

// Estados base para módulos de estoque
export interface EstoqueStateBase<T extends ProdutoEstoqueBase> {
  produtos: T[];
  loading: boolean;
  error: string | null;
  isModalOpen: boolean;
  isModalDetalhesOpen: boolean;
  produtoSelecionado: T | null;
}

// Props base para layouts de estoque
export interface EstoqueLayoutPropsBase<T extends ProdutoEstoqueBase> {
  produtos: T[];
  columns: DataTableColumn<T>[];
  loading: boolean;
  error: string | null;
  isModalOpen: boolean;
  isModalDetalhesOpen: boolean;
  produtoSelecionado: T | null;
  onOpenModal: (produto: T) => void;
  onCloseModal: () => void;
  onOpenModalDetalhes: (produto: T) => void;
  onCloseModalDetalhes: () => void;
  onAlterarEstoque: (produto: T) => void;
  onSave: (produto: T) => void;
}

// Props base para tabelas de estoque
export interface EstoqueTablePropsBase<T extends ProdutoEstoqueBase> {
  produtos: T[];
  columns: DataTableColumn<T>[];
  onOpenModal: (produto: T) => void;
  onOpenModalDetalhes: (produto: T) => void;
}

// Props base para estatísticas de estoque
export interface EstoqueStatsPropsBase<T extends ProdutoEstoqueBase> {
  produtos: T[];
}

// Props base para componentes de erro
export interface EstoqueErrorPropsBase {
  error: string;
  onRetry: () => void;
}

// Hook return types base
export interface UseEstoqueReturnBase<T extends ProdutoEstoqueBase> {
  produtos: T[];
  columns: DataTableColumn<T>[];
  loading: boolean;
  error: string | null;
  isModalOpen: boolean;
  isModalDetalhesOpen: boolean;
  produtoSelecionado: T | null;
  handleOpenModal: (produto: T) => void;
  handleCloseModal: () => void;
  handleOpenModalDetalhes: (produto: T) => void;
  handleCloseModalDetalhes: () => void;
  handleAlterarEstoque: (produto: T) => void;
  handleSave: (produto: T) => void;
  handleRetry: () => void;
}

// Tipos para dados de estoque
export interface EstoqueDataBase<T extends ProdutoEstoqueBase> {
  produtos: T[];
  loading: boolean;
  error: string | null;
}

// Tipos para traduções base
export interface EstoqueTranslationsBase {
  title: string;
  subtitle: string;
  stats: {
    totalProdutos: string;
    baixoEstoque: string;
    semEstoque: string;
    valorTotal: string;
  };
  table: {
    nome: string;
    categoria: string;
    quantidade: string;
    quantidadeMinima: string;
    precoCusto: string;
    custoEstoque: string;
    status: string;
    acoes: string;
  };
  modals: {
    editarEstoque: string;
    detalhesProduto: string;
    alterarEstoque: string;
    salvar: string;
    cancelar: string;
  };
  error: {
    title: string;
    message: string;
    retry: string;
  };
}
