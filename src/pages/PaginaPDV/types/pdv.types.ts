// Types específicos para a página de PDV

export interface PDVData {
  produtos: any[];
  categorias: any[];
  pedidoAtual: any;
  clientes: any[];
  loading: boolean;
  error: string | null;
}

export interface PDVLayoutProps {
  data: PDVData;
  onRetry: () => void;
}

export interface PDVActions {
  carregarProdutos: () => Promise<void>;
  carregarCategorias: () => Promise<void>;
  carregarClientes: () => Promise<void>;
  refreshDados: () => void;
  handleRetry: () => void;
  adicionarProduto: (produto: any) => void;
  removerProduto: (produtoId: string) => void;
  finalizarPedido: () => void;
  cancelarPedido: () => void;
}

export interface PDVTranslation {
  t: (key: string) => string;
}

// Props para componentes específicos
export interface PDVHeaderProps {
  // Props específicas do header se necessário
}

export interface PDVProductGridProps {
  produtos: any[];
  categorias: any[];
  loading: boolean;
  onAdicionarProduto: (produto: any) => void;
}

export interface PDVOrderSummaryProps {
  pedido: any;
  onRemoverProduto: (produtoId: string) => void;
  onFinalizarPedido: () => void;
  onCancelarPedido: () => void;
}

export interface PDVCustomerInfoProps {
  clientes: any[];
  loading: boolean;
}

export interface PDVPaymentProps {
  pedido: any;
  onFinalizarPagamento: () => void;
}
