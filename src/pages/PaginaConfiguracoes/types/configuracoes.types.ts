// Types específicos para a página de Configurações
export interface ConfiguracoesData {
  config: any;
  loading: boolean;
  error: string | null;
  abaAtiva: string;
  setAbaAtiva: (aba: string) => void;
  salvarConfiguracao: (config: any) => Promise<void>;
  resetarConfiguracao: () => void;
}

export interface ConfiguracoesLayoutProps {
  config: any;
  loading: boolean;
  error: string | null;
  onSave: () => void;
  onReset: () => void;
  hasChanges: boolean;
  abaAtiva: string;
  onAbaChange: (aba: string) => void;
}

export interface ConfiguracoesActions {
  salvarConfiguracao: (config: any) => Promise<void>;
  resetarConfiguracao: () => void;
  setAbaAtiva: (aba: string) => void;
}

export interface ConfiguracoesTranslation {
  t: (key: string) => string;
}

// Props para componentes específicos
export interface ConfiguracoesGeraisProps {
  config: any;
  onConfigChange: (updates: any) => void;
  loading: boolean;
}

export interface InformacoesLojaProps {
  config: any;
  onConfigChange: (updates: any) => void;
  loading: boolean;
}

export interface EnderecoLojaProps {
  config: any;
  onConfigChange: (updates: any) => void;
  loading: boolean;
}

export interface ConfiguracoesEntregaProps {
  config: any;
  onConfigChange: (updates: any) => void;
  loading: boolean;
}

export interface ModosPedidosProps {
  config: any;
  onConfigChange: (updates: any) => void;
  loading: boolean;
}

export interface ConfiguracoesAgendamentoProps {
  config: any;
  onConfigChange: (updates: any) => void;
  loading: boolean;
}

export interface ConfiguracaoNotinhaProps {
  config: any;
  onConfigChange: (updates: any) => void;
  loading: boolean;
}

export interface ConfiguracoesPagamentoProps {
  config: any;
  onConfigChange: (updates: any) => void;
  loading: boolean;
}

export interface ConfiguracoesNotificacoesProps {
  config: any;
  onConfigChange: (updates: any) => void;
  loading: boolean;
}

export interface ConfiguracoesAparenciaProps {
  config: any;
  onConfigChange: (updates: any) => void;
  loading: boolean;
}

export interface FusoHorarioProps {
  config: any;
  onConfigChange: (updates: any) => void;
  loading: boolean;
}

// Re-export dos types principais
export type { ConfiguracaoLoja, HorarioPausa, HorarioEspecial, HorarioDia } from '../../../types';