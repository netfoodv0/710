import React, { createContext, useContext, useState, ReactNode } from 'react';

// Tipos
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

interface FidelidadeContextType {
  // Estado do sistema
  sistemaAtivo: SistemaFidelidade;
  setSistemaAtivo: (sistema: SistemaFidelidade) => void;
  
  // Estados dos sistemas
  sistemaPontosAtivo: boolean;
  setSistemaPontosAtivo: (ativo: boolean) => void;
  sistemaCashbackAtivo: boolean;
  setSistemaCashbackAtivo: (ativo: boolean) => void;
  
  // Seção ativa
  secaoAtiva: SecaoAtiva;
  setSecaoAtiva: (secao: SecaoAtiva) => void;
  
  // Configurações do cashback
  taxaCashback: number;
  setTaxaCashback: (taxa: number) => void;
  validadeCashback: number;
  setValidadeCashback: (validade: number) => void;
  
  // Configurações dos pontos
  pontosPorReal: number;
  setPontosPorReal: (pontos: number) => void;
  pontosBoasVindas: number;
  setPontosBoasVindas: (pontos: number) => void;
  
  // Dados
  produtosResgataveis: ProdutoResgatavel[];
  clientesPontos: ClientePontos[];
  
  // Ações
  handleAdicionarProduto: () => void;
  handleExportarDados: () => void;
  handleMigracao: (tipo: 'cashback-para-pontos' | 'pontos-para-cashback') => void;
}

const FidelidadeContext = createContext<FidelidadeContextType | undefined>(undefined);

// Dados mock
const produtosResgataveisMock: ProdutoResgatavel[] = [
  {
    id: '1',
    nome: 'Hambúrguer Clássico',
    categoria: 'Lanches',
    pontosNecessarios: 500,
    valorOriginal: 25.90,
    status: 'ativo',
    estoque: 15
  },
  {
    id: '2',
    nome: 'Refrigerante 350ml',
    categoria: 'Bebidas',
    pontosNecessarios: 200,
    valorOriginal: 8.50,
    status: 'ativo',
    estoque: 30
  },
  {
    id: '3',
    nome: 'Batata Frita Grande',
    categoria: 'Acompanhamentos',
    pontosNecessarios: 300,
    valorOriginal: 18.90,
    status: 'ativo',
    estoque: 20
  }
];

const clientesPontosMock: ClientePontos[] = [
  {
    id: '1',
    nome: 'João Silva',
    telefone: '(11) 99999-1111',
    pontosAcumulados: 2500,
    pontosUtilizados: 800,
    saldoAtual: 1700,
    ultimaCompra: '15/12/2024',
    status: 'ativo'
  },
  {
    id: '2',
    nome: 'Maria Santos',
    telefone: '(11) 99999-2222',
    pontosAcumulados: 1800,
    pontosUtilizados: 1200,
    saldoAtual: 600,
    ultimaCompra: '12/12/2024',
    status: 'ativo'
  },
  {
    id: '3',
    nome: 'Pedro Costa',
    telefone: '(11) 99999-3333',
    pontosAcumulados: 3200,
    pontosUtilizados: 0,
    saldoAtual: 3200,
    ultimaCompra: '10/12/2024',
    status: 'ativo'
  }
];

export function FidelidadeProvider({ children }: { children: ReactNode }) {
  const [sistemaAtivo, setSistemaAtivo] = useState<SistemaFidelidade>('pontos');
  const [sistemaPontosAtivo, setSistemaPontosAtivo] = useState(true);
  const [sistemaCashbackAtivo, setSistemaCashbackAtivo] = useState(false);
  const [secaoAtiva, setSecaoAtiva] = useState<SecaoAtiva>('configuracoes');
  
  // Estados para inputs do Sistema de Cashback
  const [taxaCashback, setTaxaCashback] = useState(2);
  const [validadeCashback, setValidadeCashback] = useState(45);
  
  // Estados para inputs do Sistema de Pontos
  const [pontosPorReal, setPontosPorReal] = useState(1);
  const [pontosBoasVindas, setPontosBoasVindas] = useState(100);
  
  // Handlers para ações
  const handleAdicionarProduto = () => {
    console.log('Adicionando novo produto');
    // Aqui você implementaria a lógica para abrir modal de adição
  };
  
  const handleExportarDados = () => {
    console.log('Exportando dados dos clientes');
    // Aqui você implementaria a lógica para exportar dados
  };
  
  const handleMigracao = (tipo: 'cashback-para-pontos' | 'pontos-para-cashback') => {
    console.log('Iniciando migração:', tipo);
    // Aqui você implementaria a lógica para migração
  };

  const value: FidelidadeContextType = {
    sistemaAtivo,
    setSistemaAtivo,
    sistemaPontosAtivo,
    setSistemaPontosAtivo,
    sistemaCashbackAtivo,
    setSistemaCashbackAtivo,
    secaoAtiva,
    setSecaoAtiva,
    taxaCashback,
    setTaxaCashback,
    validadeCashback,
    setValidadeCashback,
    pontosPorReal,
    setPontosPorReal,
    pontosBoasVindas,
    setPontosBoasVindas,
    produtosResgataveis: produtosResgataveisMock,
    clientesPontos: clientesPontosMock,
    handleAdicionarProduto,
    handleExportarDados,
    handleMigracao,
  };

  return (
    <FidelidadeContext.Provider value={value}>
      {children}
    </FidelidadeContext.Provider>
  );
}

export function useFidelidade() {
  const context = useContext(FidelidadeContext);
  if (context === undefined) {
    throw new Error('useFidelidade deve ser usado dentro de um FidelidadeProvider');
  }
  return context;
}
