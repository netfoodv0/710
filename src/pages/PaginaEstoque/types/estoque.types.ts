// Tipos específicos para a página de Estoque
import { DataTableColumn } from '../../../components/ui';
import { ProdutoEstoqueBase, EstoqueStateBase, EstoqueLayoutPropsBase, EstoqueTablePropsBase, EstoqueStatsPropsBase, EstoqueErrorPropsBase, UseEstoqueReturnBase, EstoqueDataBase, EstoqueTranslationsBase } from '../../shared/types/estoque-base.types';

// Interface para produto em estoque
export interface ProdutoEstoque extends ProdutoEstoqueBase {
  precoUnitario: number;
}

// Estados do estoque
export interface EstoqueState extends EstoqueStateBase<ProdutoEstoque> {}

// Props para componentes de Estoque
export interface EstoqueLayoutProps extends EstoqueLayoutPropsBase<ProdutoEstoque> {}

export interface EstoqueStatsProps extends EstoqueStatsPropsBase<ProdutoEstoque> {}

export interface EstoqueTableProps extends EstoqueTablePropsBase<ProdutoEstoque> {}

export interface EstoqueErrorProps extends EstoqueErrorPropsBase {}

// Hook return types
export interface UseEstoqueReturn extends UseEstoqueReturnBase<ProdutoEstoque> {}

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
export interface EstoqueData extends EstoqueDataBase<ProdutoEstoque> {}

// Tipos para traduções
export interface EstoqueTranslations extends EstoqueTranslationsBase {}


