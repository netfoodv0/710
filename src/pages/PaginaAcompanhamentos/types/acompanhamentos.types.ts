// Tipos específicos para a página de Acompanhamentos
import { DataTableColumn } from '../../../components/ui';

// Interface para produto acompanhamento
export interface ProdutoAcompanhamento {
  id: number;
  nome: string;
  categoria: string;
  quantidade: number;
  quantidadeMinima: number;
  precoCusto: number;
  custoEstoque: number;
  semControleEstoque: boolean;
  fichaTecnica: string;
  status: 'em_estoque' | 'baixo_estoque' | 'sem_estoque';
  medida: string;
}

// Estados dos acompanhamentos
export interface AcompanhamentosState {
  produtos: ProdutoAcompanhamento[];
  loading: boolean;
  error: string | null;
  isModalOpen: boolean;
  isModalDetalhesOpen: boolean;
  produtoSelecionado: ProdutoAcompanhamento | null;
}

// Props para componentes de Acompanhamentos
export interface AcompanhamentosLayoutProps {
  produtos: ProdutoAcompanhamento[];
  columns: DataTableColumn<ProdutoAcompanhamento>[];
  loading: boolean;
  error: string | null;
  isModalOpen: boolean;
  isModalDetalhesOpen: boolean;
  produtoSelecionado: ProdutoAcompanhamento | null;
  onOpenModal: (produto: ProdutoAcompanhamento) => void;
  onCloseModal: () => void;
  onOpenModalDetalhes: (produto: ProdutoAcompanhamento) => void;
  onCloseModalDetalhes: () => void;
  onAlterarEstoque: (produto: ProdutoAcompanhamento) => void;
  onSave: (produto: ProdutoAcompanhamento) => void;
}

export interface AcompanhamentosStatsProps {
  produtos: ProdutoAcompanhamento[];
}

export interface AcompanhamentosTableProps {
  produtos: ProdutoAcompanhamento[];
  columns: DataTableColumn<ProdutoAcompanhamento>[];
  onOpenModal: (produto: ProdutoAcompanhamento) => void;
  onOpenModalDetalhes: (produto: ProdutoAcompanhamento) => void;
}

export interface AcompanhamentosErrorProps {
  error: string;
  onRetry: () => void;
}

// Hook return types
export interface UseAcompanhamentosReturn {
  produtos: ProdutoAcompanhamento[];
  columns: DataTableColumn<ProdutoAcompanhamento>[];
  loading: boolean;
  error: string | null;
  isModalOpen: boolean;
  isModalDetalhesOpen: boolean;
  produtoSelecionado: ProdutoAcompanhamento | null;
  handleOpenModal: (produto: ProdutoAcompanhamento) => void;
  handleCloseModal: () => void;
  handleOpenModalDetalhes: (produto: ProdutoAcompanhamento) => void;
  handleCloseModalDetalhes: () => void;
  handleAlterarEstoque: (produto: ProdutoAcompanhamento) => void;
  handleSave: (produto: ProdutoAcompanhamento) => void;
  handleRetry: () => void;
}

export interface UseAcompanhamentosActionsReturn {
  handleOpenModal: (produto: ProdutoAcompanhamento) => void;
  handleCloseModal: () => void;
  handleOpenModalDetalhes: (produto: ProdutoAcompanhamento) => void;
  handleCloseModalDetalhes: () => void;
  handleAlterarEstoque: (produto: ProdutoAcompanhamento) => void;
  handleSave: (produto: ProdutoAcompanhamento) => void;
  handleRetry: () => void;
}

// Tipos para dados dos acompanhamentos
export interface AcompanhamentosData {
  produtos: ProdutoAcompanhamento[];
  loading: boolean;
  error: string | null;
}

// Tipos para traduções
export interface AcompanhamentosTranslations {
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
