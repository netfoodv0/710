// Tipos específicos para a página de Estoque
import { DataTableColumn } from '../../../components/ui';

// Interface para produto em estoque
export interface ProdutoEstoque {
  id: number;
  nome: string;
  categoria: string;
  quantidade: number;
  quantidadeMinima: number;
  precoCusto: number;
  custoEstoque: number;
  precoUnitario: number;
  status: 'em_estoque' | 'baixo_estoque' | 'sem_estoque';
  semControleEstoque: boolean;
  fichaTecnica: string;
  medida: string;
}

// Estados do estoque
export interface EstoqueState {
  produtos: ProdutoEstoque[];
  loading: boolean;
  error: string | null;
  isModalOpen: boolean;
  isModalDetalhesOpen: boolean;
  produtoSelecionado: ProdutoEstoque | null;
}

// Props para componentes de Estoque
export interface EstoqueLayoutProps {
  produtos: ProdutoEstoque[];
  columns: DataTableColumn<ProdutoEstoque>[];
  loading: boolean;
  error: string | null;
  isModalOpen: boolean;
  isModalDetalhesOpen: boolean;
  produtoSelecionado: ProdutoEstoque | null;
  onOpenModal: (produto: ProdutoEstoque) => void;
  onCloseModal: () => void;
  onOpenModalDetalhes: (produto: ProdutoEstoque) => void;
  onCloseModalDetalhes: () => void;
  onAlterarEstoque: (produto: ProdutoEstoque) => void;
  onSave: (produto: ProdutoEstoque) => void;
}

export interface EstoqueStatsProps {
  produtos: ProdutoEstoque[];
}

export interface EstoqueTableProps {
  produtos: ProdutoEstoque[];
  columns: DataTableColumn<ProdutoEstoque>[];
  onOpenModal: (produto: ProdutoEstoque) => void;
  onOpenModalDetalhes: (produto: ProdutoEstoque) => void;
}

export interface EstoqueErrorProps {
  error: string;
  onRetry: () => void;
}

// Hook return types
export interface UseEstoqueReturn {
  produtos: ProdutoEstoque[];
  columns: DataTableColumn<ProdutoEstoque>[];
  loading: boolean;
  error: string | null;
  isModalOpen: boolean;
  isModalDetalhesOpen: boolean;
  produtoSelecionado: ProdutoEstoque | null;
  handleOpenModal: (produto: ProdutoEstoque) => void;
  handleCloseModal: () => void;
  handleOpenModalDetalhes: (produto: ProdutoEstoque) => void;
  handleCloseModalDetalhes: () => void;
  handleAlterarEstoque: (produto: ProdutoEstoque) => void;
  handleSave: (produto: ProdutoEstoque) => void;
  handleRetry: () => void;
}

export interface UseEstoqueActionsReturn {
  handleOpenModal: (produto: ProdutoEstoque) => void;
  handleCloseModal: () => void;
  handleOpenModalDetalhes: (produto: ProdutoEstoque) => void;
  handleCloseModalDetalhes: () => void;
  handleAlterarEstoque: (produto: ProdutoEstoque) => void;
  handleSave: (produto: ProdutoEstoque) => void;
  handleRetry: () => void;
}

// Tipos para dados do estoque
export interface EstoqueData {
  produtos: ProdutoEstoque[];
  loading: boolean;
  error: string | null;
}

// Tipos para traduções
export interface EstoqueTranslations {
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
