// Tipos específicos para a página de Acompanhamentos
import { DataTableColumn } from '../../../components/ui';
import { ProdutoEstoqueBase, EstoqueStateBase, EstoqueLayoutPropsBase, EstoqueTablePropsBase, EstoqueStatsPropsBase, EstoqueErrorPropsBase, UseEstoqueReturnBase, EstoqueDataBase, EstoqueTranslationsBase } from '../../shared/types/estoque-base.types';

// Interface para produto acompanhamento
export interface ProdutoAcompanhamento extends ProdutoEstoqueBase {}

// Estados dos acompanhamentos
export interface AcompanhamentosState extends EstoqueStateBase<ProdutoAcompanhamento> {}

// Props para componentes de Acompanhamentos
export interface AcompanhamentosLayoutProps extends EstoqueLayoutPropsBase<ProdutoAcompanhamento> {}

export interface AcompanhamentosStatsProps extends EstoqueStatsPropsBase<ProdutoAcompanhamento> {}

export interface AcompanhamentosTableProps extends EstoqueTablePropsBase<ProdutoAcompanhamento> {}

export interface AcompanhamentosErrorProps extends EstoqueErrorPropsBase {}

// Hook return types
export interface UseAcompanhamentosReturn extends UseEstoqueReturnBase<ProdutoAcompanhamento> {}

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
export interface AcompanhamentosData extends EstoqueDataBase<ProdutoAcompanhamento> {}

// Tipos para traduções
export interface AcompanhamentosTranslations extends EstoqueTranslationsBase {}


