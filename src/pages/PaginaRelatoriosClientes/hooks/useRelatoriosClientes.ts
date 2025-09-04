import { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotificationContext } from '../../../context/notificationContextUtils';
import { useEstatisticasPadrao } from '../../../components/shared';
import { PeriodType } from '../../../components/filters/FiltroPeriodo';
import { DataTableColumn } from '../../../components/ui';
import { UseRelatoriosClientesReturn, Cliente } from '../types';

// Dados fictícios de clientes para a tabela
const clientesFicticios: Cliente[] = [
  {
    id: 1,
    nome: 'João Silva',
    telefone: '(11) 99999-1111',
    endereco: 'Rua das Flores, 123 - Centro, São Paulo - SP',
    totalPedidos: 15,
    valorTotal: 450.80,
    primeiroPedido: '2023-06-15',
    ultimoPedido: '2024-01-20',
    categoria: 'super_clientes',
    status: 'ativo'
  },
  {
    id: 2,
    nome: 'Maria Santos',
    telefone: '(11) 88888-2222',
    endereco: 'Av. Paulista, 456 - Bela Vista, São Paulo - SP',
    totalPedidos: 8,
    valorTotal: 280.50,
    primeiroPedido: '2023-09-10',
    ultimoPedido: '2024-01-18',
    categoria: 'fieis',
    status: 'ativo'
  },
  {
    id: 3,
    nome: 'Pedro Oliveira',
    telefone: '(11) 77777-3333',
    endereco: 'Rua Augusta, 789 - Consolação, São Paulo - SP',
    totalPedidos: 3,
    valorTotal: 95.20,
    primeiroPedido: '2023-12-05',
    ultimoPedido: '2024-01-15',
    categoria: 'fieis',
    status: 'ativo'
  },
  {
    id: 4,
    nome: 'Ana Costa',
    telefone: '(11) 66666-4444',
    endereco: 'Rua Oscar Freire, 321 - Jardins, São Paulo - SP',
    totalPedidos: 1,
    valorTotal: 32.50,
    primeiroPedido: '2024-01-10',
    ultimoPedido: '2024-01-10',
    categoria: 'novatos',
    status: 'ativo'
  },
  {
    id: 5,
    nome: 'Carlos Ferreira',
    telefone: '(11) 55555-5555',
    endereco: 'Rua Haddock Lobo, 654 - Cerqueira César, São Paulo - SP',
    totalPedidos: 0,
    valorTotal: 0,
    primeiroPedido: null,
    ultimoPedido: null,
    categoria: 'curiosos',
    status: 'inativo'
  },
  {
    id: 6,
    nome: 'Lucia Mendes',
    telefone: '(11) 44444-6666',
    endereco: 'Rua Pamplona, 987 - Jardins, São Paulo - SP',
    totalPedidos: 22,
    valorTotal: 680.90,
    primeiroPedido: '2023-03-20',
    ultimoPedido: '2024-01-22',
    categoria: 'super_clientes',
    status: 'ativo'
  },
  {
    id: 7,
    nome: 'Roberto Alves',
    telefone: '(11) 33333-7777',
    endereco: 'Rua Bela Cintra, 147 - Consolação, São Paulo - SP',
    totalPedidos: 2,
    valorTotal: 67.80,
    primeiroPedido: '2023-11-28',
    ultimoPedido: '2024-01-12',
    categoria: 'fieis',
    status: 'ativo'
  },
  {
    id: 8,
    nome: 'Fernanda Lima',
    telefone: '(11) 22222-8888',
    endereco: 'Rua Estados Unidos, 258 - Jardim América, São Paulo - SP',
    totalPedidos: 1,
    valorTotal: 45.90,
    primeiroPedido: '2024-01-16',
    ultimoPedido: '2024-01-16',
    categoria: 'novatos',
    status: 'ativo'
  }
];

export function useRelatoriosClientes(): UseRelatoriosClientesReturn {
  const navigate = useNavigate();
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodType>('weekly');
  const [selectedReportType, setSelectedReportType] = useState<string>('clientes');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Usar estatísticas padronizadas
  const { estatisticasClientes } = useEstatisticasPadrao();
  
  // Dados das estatísticas de clientes
  const estatisticasClientesData = {
    totalClientes: 456,
    novosClientes: 28,
    clientesAtivos: 342,
    taxaRetencao: 75.2
  };

  // Estado para os valores absolutos dos cards (números reais)
  const [cardValues, setCardValues] = useState([0, 0, 0, 0]);
  
  // Estado para os percentuais calculados
  const [cardPercentages, setCardPercentages] = useState([0, 0, 0, 0]);

  // Estado para controlar o efeito de água
  const [mostrarAnimacoes, setMostrarAnimacoes] = useState(true);
  
  // Estado para controlar a animação de carregamento
  const [carregamentoCompleto, setCarregamentoCompleto] = useState(false);
  const [alturasAnimadas, setAlturasAnimadas] = useState([0, 0, 0, 0]);

  const {
    showSuccess,
    showError
  } = useNotificationContext();

  // Opções do dropdown de período
  const periodOptions = useMemo(() => [
    { value: 'weekly' as PeriodType, label: 'Semanal' },
    { value: 'monthly' as PeriodType, label: 'Mensal' },
    { value: 'quarterly' as PeriodType, label: 'Trimestral' },
    { value: 'yearly' as PeriodType, label: 'Anual' }
  ], []);

  // Opções para o componente Radio (tipos de relatório)
  const reportTypeOptions = useMemo(() => [
    { id: 'geral', label: 'Geral' },
    { id: 'clientes', label: 'Clientes' },
    { id: 'produtos', label: 'Produtos' }
  ], []);

  // Funções auxiliares para a tabela de clientes
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Nunca';
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const getStatusBadgeConfig = (status: string) => {
    const isActive = status === 'ativo';
    return {
      label: isActive ? 'Ativo' : 'Inativo',
      className: `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
        isActive 
          ? 'bg-green-100 text-green-800' 
          : 'bg-red-100 text-red-800'
      }`
    };
  };

  const getCategoriaBadgeConfig = (categoria: string) => {
    const categoriaConfig = {
      curiosos: { label: 'Curiosos', color: 'bg-gray-100 text-gray-800' },
      novatos: { label: 'Novatos', color: 'bg-blue-100 text-blue-800' },
      fieis: { label: 'Fiéis', color: 'bg-green-100 text-green-800' },
      super_clientes: { label: 'Super Clientes', color: 'bg-purple-100 text-purple-800' }
    };
    
    const config = categoriaConfig[categoria as keyof typeof categoriaConfig] || categoriaConfig.curiosos;
    
    return {
      label: config.label,
      className: `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`
    };
  };

  // Definir colunas da tabela de clientes
  const columns: DataTableColumn<Cliente>[] = useMemo(() => [
    {
      key: 'nome',
      label: 'Cliente',
      sortable: true,
      render: (cliente) => cliente.nome
    },
    {
      key: 'telefone',
      label: 'Telefone',
      sortable: true,
      render: (cliente) => cliente.telefone
    },
    {
      key: 'endereco',
      label: 'Endereço',
      sortable: false,
      render: (cliente) => cliente.endereco
    },
    {
      key: 'totalPedidos',
      label: 'Total Pedidos',
      sortable: true,
      render: (cliente) => cliente.totalPedidos.toString()
    },
    {
      key: 'valorTotal',
      label: 'Valor Total',
      sortable: true,
      render: (cliente) => formatCurrency(cliente.valorTotal)
    },
    {
      key: 'categoria',
      label: 'Categoria',
      sortable: true,
      render: (cliente) => getCategoriaBadgeConfig(cliente.categoria).label
    },
    {
      key: 'ultimoPedido',
      label: 'Último Pedido',
      sortable: true,
      render: (cliente) => formatDate(cliente.ultimoPedido)
    },
    {
      key: 'actions',
      label: 'Ações',
      sortable: false,
      render: () => 'Ver detalhes'
    }
  ], []);

  // Categorias únicas para filtros
  const categorias = useMemo(() => {
    const cats = [...new Set(clientesFicticios.map(c => c.categoria))];
    return cats.map(cat => ({ 
      value: cat, 
      label: getCategoriaBadgeConfig(cat).label 
    }));
  }, []);

  // Status únicos para filtros
  const statusOptions = useMemo(() => {
    const status = [...new Set(clientesFicticios.map(c => c.status))];
    return status.map(st => ({ value: st, label: st === 'ativo' ? 'Ativo' : 'Inativo' }));
  }, []);

  const handlePeriodChange = useCallback((period: PeriodType) => {
    setSelectedPeriod(period);
  }, []);

  const handleExport = useCallback(async () => {
    try {
      // Implementar exportação específica para clientes
      showSuccess('Relatório de clientes exportado com sucesso!');
    } catch (err) {
      showError('Erro ao exportar relatório de clientes');
    }
  }, [showSuccess, showError]);

  const handleReportTypeChange = useCallback((reportType: string) => {
    setSelectedReportType(reportType);
    
    // Navegar para a página correspondente
    switch (reportType) {
      case 'geral':
        navigate('/relatorios/geral');
        break;
      case 'clientes':
        navigate('/relatorios/clientes');
        break;
      case 'produtos':
        navigate('/relatorios/produtos');
        break;
      default:
        navigate('/relatorios/geral');
    }
  }, [navigate]);

  // Função para animar o carregamento dos cards
  const animarCarregamento = useCallback(() => {
    setCarregamentoCompleto(false);
    setAlturasAnimadas([0, 0, 0, 0]);
    
    // Usar os valores atuais dos percentuais
    const percentuaisAtuais = cardPercentages;
    
    // Animar cada card com incrementos graduais
    percentuaisAtuais.forEach((percentualFinal, index) => {
      const delayInicial = index * 500; // Delay inicial entre cards
      const duracaoAnimacao = 2000; // 2 segundos para cada animação
      const intervalos = 40; // 40 passos para suavidade
      const incrementoPorPasso = percentualFinal / intervalos;
      
      // Iniciar animação após o delay inicial
      setTimeout(() => {
        let passoAtual = 0;
        
        const animarPasso = () => {
          if (passoAtual < intervalos) {
            setAlturasAnimadas(prev => {
              const novas = [...prev];
              novas[index] = Math.min(incrementoPorPasso * passoAtual, percentualFinal);
              return novas;
            });
            
            passoAtual++;
            setTimeout(animarPasso, duracaoAnimacao / intervalos);
          }
        };
        
        animarPasso();
      }, delayInicial);
    });
    
    // Marcar carregamento como completo após todas as animações
    setTimeout(() => {
      setCarregamentoCompleto(true);
    }, percentuaisAtuais.length * 500 + 2000);
  }, [cardPercentages]);

  // Função para calcular percentuais do funil (cada etapa é uma parte do todo)
  const calcularPercentuaisFunil = useCallback((valores: number[]) => {
    // Calcular o total geral
    const total = valores.reduce((a, b) => a + b, 0);
    
    const percentuais = valores.map((valor) => {
      if (total === 0) {
        return 0;
      }
      // Cada etapa representa uma parte do todo (soma sempre 100%)
      return Math.round((valor / total) * 100);
    });
    
    return percentuais;
  }, []);

  // Função para atualizar valor de um card
  const handleCardValueChange = useCallback((index: number, value: number) => {
    const newValues = [...cardValues];
    
    // Permitir qualquer valor absoluto (milhares de dados)
    newValues[index] = Math.max(0, value);
    
    // Calcular percentuais do funil
    const newPercentages = calcularPercentuaisFunil(newValues);
    
    setCardValues(newValues);
    setCardPercentages(newPercentages);
  }, [cardValues, calcularPercentuaisFunil]);

  // Função para incrementar/decrementar valor
  const handleCardValueIncrement = useCallback((index: number, increment: boolean) => {
    const currentValue = cardValues[index];
    const newValue = increment ? currentValue + 1 : currentValue - 1;
    
    if (newValue >= 0) {
      const newValues = [...cardValues];
      
      // Permitir qualquer valor absoluto
      newValues[index] = newValue;
      
      // Calcular percentuais do funil
      const newPercentages = calcularPercentuaisFunil(newValues);
      
      setCardValues(newValues);
      setCardPercentages(newPercentages);
    }
  }, [cardValues, calcularPercentuaisFunil]);

  // Carregar dados dos clientes
  const carregarDadosClientes = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Dados de exemplo para os cards
      const dados = {
        curiosos: 25,
        novatos: 20,
        fieis: 15,
        super_clientes: 10
      };
      
      // Atualizar os valores dos cards com dados de exemplo
      const valoresReais = [
        dados.curiosos,        // Card 1: Clientes que nunca pediram
        dados.novatos,         // Card 2: Clientes com 1+ pedidos
        dados.fieis,           // Card 3: Clientes com 2+ pedidos
        dados.super_clientes   // Card 4: Clientes com 3+ pedidos
      ];
      
      setCardValues(valoresReais);
      
      // Calcular percentuais baseados nos dados reais
      const percentuaisReais = calcularPercentuaisFunil(valoresReais);
      setCardPercentages(percentuaisReais);
      
      showSuccess('Dados dos clientes carregados com sucesso!');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao carregar dados dos clientes';
      setError(errorMessage);
      showError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [showSuccess, showError, calcularPercentuaisFunil]);

  const handleRetry = useCallback(() => {
    setError(null);
    carregarDadosClientes();
  }, [carregarDadosClientes]);

  // Efeito para carregar dados dos clientes ao montar o componente
  useEffect(() => {
    carregarDadosClientes();
  }, [carregarDadosClientes]);

  // Efeito para dados de exemplo e animação inicial
  useEffect(() => {
    // Dados de exemplo para teste
    const dadosExemplo = [25, 20, 15, 10];
    setCardValues(dadosExemplo);
    const percentuaisExemplo = calcularPercentuaisFunil(dadosExemplo);
    setCardPercentages(percentuaisExemplo);
  }, [calcularPercentuaisFunil]);

  // Efeito para iniciar animação sempre que os percentuais mudarem
  useEffect(() => {
    if (cardPercentages.some(p => p > 0)) {
      // Iniciar animação após um delay reduzido
      const timer = setTimeout(() => {
        animarCarregamento();
      }, 300); // Delay reduzido para 300ms

      return () => clearTimeout(timer);
    }
  }, [cardPercentages, animarCarregamento]);

  // Simular carregamento inicial para exibir os cards enquanto animam
  useEffect(() => {
    const timer = setTimeout(() => {
      setCarregamentoCompleto(true);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  return {
    selectedPeriod,
    selectedReportType,
    loading,
    error,
    clientes: clientesFicticios,
    columns,
    categorias,
    statusOptions,
    estatisticasClientes: estatisticasClientesData,
    cardValues,
    cardPercentages,
    mostrarAnimacoes,
    carregamentoCompleto,
    alturasAnimadas,
    periodOptions,
    reportTypeOptions,
    handlePeriodChange,
    handleReportTypeChange,
    handleExport,
    handleRetry,
    handleCardValueChange,
    handleCardValueIncrement
  };
}
