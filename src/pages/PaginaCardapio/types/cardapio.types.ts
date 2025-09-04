// Types específicos para a página de Cardápio

export interface CardapioData {
  produtos: any[];
  categorias: any[];
  loading: boolean;
  error: string | null;
}

export interface CardapioLayoutProps {
  data: CardapioData;
  onRetry: () => void;
}

export interface CardapioActions {
  carregarProdutos: () => Promise<void>;
  carregarCategorias: () => Promise<void>;
  refreshDados: () => void;
  handleRetry: () => void;
}

export interface CardapioTranslation {
  t: (key: string) => string;
}

// Props para componentes específicos
export interface CardapioHeaderProps {
  // Props específicas do header se necessário
}

export interface CardapioSidebarProps {
  categorias: any[];
  loading: boolean;
}

export interface CardapioMainProps {
  produtos: any[];
  loading: boolean;
}

export interface CardapioModalsProps {
  // Props específicas dos modais se necessário
}

export interface CardapioNotificationsProps {
  // Props específicas das notificações se necessário
}

export interface CardapioErrorProps {
  error: string;
  onRetry: () => void;
}
