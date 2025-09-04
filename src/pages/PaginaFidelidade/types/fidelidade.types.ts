// Tipos específicos para a página de Fidelidade
export interface ProdutoResgatavel {
  id: string;
  nome: string;
  categoria: string;
  pontosNecessarios: number;
  valorOriginal: number;
  status: 'ativo' | 'inativo';
  estoque: number;
}

export interface ClientePontos {
  id: string;
  nome: string;
  telefone: string;
  pontosAcumulados: number;
  pontosUtilizados: number;
  saldoAtual: number;
  ultimaCompra: string;
  status: 'ativo' | 'inativo';
}

export type SistemaFidelidade = 'cashback' | 'pontos';
export type SecaoAtiva = 'configuracoes' | 'produtos' | 'clientes';

export interface FidelidadeData {
  sistemaAtivo: SistemaFidelidade;
  sistemaPontosAtivo: boolean;
  sistemaCashbackAtivo: boolean;
  secaoAtiva: SecaoAtiva;
  taxaCashback: number;
  validadeCashback: number;
  pontosPorReal: number;
  pontosBoasVindas: number;
  produtosResgataveis: ProdutoResgatavel[];
  clientesPontos: ClientePontos[];
  loading: boolean;
  error: string | null;
}

// Props para componentes de Fidelidade
export interface FidelidadeLayoutProps {
  data: FidelidadeData;
  onSistemaChange: (sistema: SistemaFidelidade) => void;
  onSecaoChange: (secao: SecaoAtiva) => void;
  onTaxaCashbackChange: (taxa: number) => void;
  onValidadeCashbackChange: (validade: number) => void;
  onPontosPorRealChange: (pontos: number) => void;
  onPontosBoasVindasChange: (pontos: number) => void;
  onSistemaPontosToggle: (ativo: boolean) => void;
  onSistemaCashbackToggle: (ativo: boolean) => void;
  onAdicionarProduto: () => void;
  onExportarDados: () => void;
  onMigracao: (tipo: 'cashback-para-pontos' | 'pontos-para-cashback') => void;
}

export interface FidelidadeContentProps {
  sistemaAtivo: SistemaFidelidade;
  onSistemaChange: (sistema: SistemaFidelidade) => void;
  onSecaoChange: (secao: SecaoAtiva) => void;
  onAdicionarProduto: () => void;
  onExportarDados: () => void;
  onMigracao: (tipo: 'cashback-para-pontos' | 'pontos-para-cashback') => void;
}

export interface FidelidadeStatsProps {
  sistemaAtivo: SistemaFidelidade;
  sistemaPontosAtivo: boolean;
  sistemaCashbackAtivo: boolean;
  produtosResgataveis: ProdutoResgatavel[];
  clientesPontos: ClientePontos[];
}

export interface SistemaCashbackProps {
  taxaCashback: number;
  validadeCashback: number;
  sistemaCashbackAtivo: boolean;
  onTaxaChange: (taxa: number) => void;
  onValidadeChange: (validade: number) => void;
  onToggle: (ativo: boolean) => void;
}

export interface SistemaPontosProps {
  pontosPorReal: number;
  pontosBoasVindas: number;
  sistemaPontosAtivo: boolean;
  onPontosPorRealChange: (pontos: number) => void;
  onPontosBoasVindasChange: (pontos: number) => void;
  onToggle: (ativo: boolean) => void;
}

// Hook return types
export interface UseFidelidadeReturn {
  data: FidelidadeData;
  handleSistemaChange: (sistema: SistemaFidelidade) => void;
  handleSecaoChange: (secao: SecaoAtiva) => void;
  handleTaxaCashbackChange: (taxa: number) => void;
  handleValidadeCashbackChange: (validade: number) => void;
  handlePontosPorRealChange: (pontos: number) => void;
  handlePontosBoasVindasChange: (pontos: number) => void;
  handleSistemaPontosToggle: (ativo: boolean) => void;
  handleSistemaCashbackToggle: (ativo: boolean) => void;
  handleAdicionarProduto: () => void;
  handleExportarDados: () => void;
  handleMigracao: (tipo: 'cashback-para-pontos' | 'pontos-para-cashback') => void;
}

export interface UseFidelidadeActionsReturn {
  handleSistemaChange: (sistema: SistemaFidelidade) => void;
  handleSecaoChange: (secao: SecaoAtiva) => void;
  handleTaxaCashbackChange: (taxa: number) => void;
  handleValidadeCashbackChange: (validade: number) => void;
  handlePontosPorRealChange: (pontos: number) => void;
  handlePontosBoasVindasChange: (pontos: number) => void;
  handleSistemaPontosToggle: (ativo: boolean) => void;
  handleSistemaCashbackToggle: (ativo: boolean) => void;
  handleAdicionarProduto: () => void;
  handleExportarDados: () => void;
  handleMigracao: (tipo: 'cashback-para-pontos' | 'pontos-para-cashback') => void;
}

// Tipos para configurações
export interface ConfiguracaoCashback {
  taxa: number;
  validade: number;
  ativo: boolean;
}

export interface ConfiguracaoPontos {
  pontosPorReal: number;
  pontosBoasVindas: number;
  ativo: boolean;
}

// Tipos para estatísticas
export interface EstatisticasFidelidade {
  totalClientes: number;
  totalPontos: number;
  totalProdutos: number;
  sistemaAtivo: SistemaFidelidade;
}
