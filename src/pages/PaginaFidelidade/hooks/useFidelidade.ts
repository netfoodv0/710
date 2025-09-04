import { useState, useCallback, useMemo } from 'react';
import { 
  FidelidadeData, 
  SistemaFidelidade, 
  SecaoAtiva, 
  UseFidelidadeReturn,
  ProdutoResgatavel,
  ClientePontos
} from '../types';

// Dados mock (mesmos do contexto original)
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

export function useFidelidade(): UseFidelidadeReturn {
  // Estados principais
  const [sistemaAtivo, setSistemaAtivo] = useState<SistemaFidelidade>('pontos');
  const [sistemaPontosAtivo, setSistemaPontosAtivo] = useState(true);
  const [sistemaCashbackAtivo, setSistemaCashbackAtivo] = useState(false);
  const [secaoAtiva, setSecaoAtiva] = useState<SecaoAtiva>('configuracoes');
  
  // Estados para configurações
  const [taxaCashback, setTaxaCashback] = useState(2);
  const [validadeCashback, setValidadeCashback] = useState(45);
  const [pontosPorReal, setPontosPorReal] = useState(1);
  const [pontosBoasVindas, setPontosBoasVindas] = useState(100);
  
  // Estados de controle
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Handlers para mudanças de sistema
  const handleSistemaChange = useCallback((sistema: SistemaFidelidade) => {
    setSistemaAtivo(sistema);
    setError(null);
  }, []);

  const handleSecaoChange = useCallback((secao: SecaoAtiva) => {
    setSecaoAtiva(secao);
    setError(null);
  }, []);

  // Handlers para configurações de cashback
  const handleTaxaCashbackChange = useCallback((taxa: number) => {
    setTaxaCashback(taxa);
  }, []);

  const handleValidadeCashbackChange = useCallback((validade: number) => {
    setValidadeCashback(validade);
  }, []);

  // Handlers para configurações de pontos
  const handlePontosPorRealChange = useCallback((pontos: number) => {
    setPontosPorReal(pontos);
  }, []);

  const handlePontosBoasVindasChange = useCallback((pontos: number) => {
    setPontosBoasVindas(pontos);
  }, []);

  // Handlers para toggle dos sistemas
  const handleSistemaPontosToggle = useCallback((ativo: boolean) => {
    setSistemaPontosAtivo(ativo);
    if (ativo && sistemaAtivo === 'cashback') {
      setSistemaAtivo('pontos');
    }
  }, [sistemaAtivo]);

  const handleSistemaCashbackToggle = useCallback((ativo: boolean) => {
    setSistemaCashbackAtivo(ativo);
    if (ativo && sistemaAtivo === 'pontos') {
      setSistemaAtivo('cashback');
    }
  }, [sistemaAtivo]);

  // Handlers para ações
  const handleAdicionarProduto = useCallback(() => {
    console.log('Adicionando novo produto');
    // Aqui você implementaria a lógica para abrir modal de adição
  }, []);

  const handleExportarDados = useCallback(() => {
    console.log('Exportando dados dos clientes');
    // Aqui você implementaria a lógica para exportar dados
  }, []);

  const handleMigracao = useCallback((tipo: 'cashback-para-pontos' | 'pontos-para-cashback') => {
    console.log('Iniciando migração:', tipo);
    // Aqui você implementaria a lógica para migração
  }, []);

  // Dados computados
  const data: FidelidadeData = useMemo(() => ({
    sistemaAtivo,
    sistemaPontosAtivo,
    sistemaCashbackAtivo,
    secaoAtiva,
    taxaCashback,
    validadeCashback,
    pontosPorReal,
    pontosBoasVindas,
    produtosResgataveis: produtosResgataveisMock,
    clientesPontos: clientesPontosMock,
    loading,
    error
  }), [
    sistemaAtivo,
    sistemaPontosAtivo,
    sistemaCashbackAtivo,
    secaoAtiva,
    taxaCashback,
    validadeCashback,
    pontosPorReal,
    pontosBoasVindas,
    loading,
    error
  ]);

  return {
    data,
    handleSistemaChange,
    handleSecaoChange,
    handleTaxaCashbackChange,
    handleValidadeCashbackChange,
    handlePontosPorRealChange,
    handlePontosBoasVindasChange,
    handleSistemaPontosToggle,
    handleSistemaCashbackToggle,
    handleAdicionarProduto,
    handleExportarDados,
    handleMigracao
  };
}
