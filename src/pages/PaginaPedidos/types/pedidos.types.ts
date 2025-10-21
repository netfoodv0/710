// Types específicos para a página de Pedidos

export interface PedidosData {
  pedidos: any[];
  loading: boolean;
  searchTerm: string;
  error: string | null;
}

export interface PedidosLayoutProps {
  data: PedidosData;
  onAceitar: (id: string) => void;
  onAvançar: (id: string) => void;
  onFinalizar: (id: string) => void;
  onRecusar: (id: string) => void;
  onSearchChange: (term: string) => void;
  onClearSearch: () => void;
  onSearchSubmit: (term: string) => void;
  onOpenPDV: () => void;
}

export interface PedidosActions {
  carregarPedidos: () => Promise<void>;
  refreshDados: () => void;
  handleAceitar: (id: string) => void;
  handleAvançar: (id: string) => void;
  handleFinalizar: (id: string) => void;
  handleRecusar: (id: string) => void;
  handleSearchChange: (term: string) => void;
  handleClearSearch: () => void;
  handleSearchSubmit: (term: string) => void;
  handleOpenPDV: () => void;
}

export interface PedidosTranslation {
  t: (key: string) => string;
}

// Props para componentes específicos
export interface PedidosContentProps {
  pedidos: any[];
  loading: boolean;
  onAceitar: (id: string) => void;
  onAvançar: (id: string) => void;
  onFinalizar: (id: string) => void;
  onRecusar: (id: string) => void;
}

export interface PedidosHeaderProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onClearSearch: () => void;
  onSearchSubmit: (term: string) => void;
  onOpenPDV: () => void;
}


