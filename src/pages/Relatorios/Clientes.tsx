import React, { useState, useEffect, useCallback } from 'react';
import { useNotificationContext } from '../../context/notificationContextUtils';
import { NotificationToast } from '../../components/NotificationToast';
import { ErrorBoundary } from '../../components/ErrorBoundary';
import { useNavigate } from 'react-router-dom';
import { PeriodType } from '../../components/filters/FiltroPeriodo';
import { PageHeader, CustomDropdown, DropdownOption } from '../../components/ui';
import { EstatisticasContainer } from '../../components';
import { DataTable, DataTableColumn } from '../../components/ui';
import { ReportNavigation } from '../../components/ui/ReportNavigation';
import { ReportSkeleton } from '../../components/ui/ReportSkeleton';

import { firebaseClientesService, EstatisticasClientes } from '../../services/firebaseClientesService';

// Dados fictícios de clientes para a tabela
const clientesFicticios = [
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

export function RelatoriosClientes() {
  const navigate = useNavigate();
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodType>('weekly');
  
  // Opções do dropdown de período
  const periodOptions: DropdownOption[] = [
    { value: 'weekly', label: 'Semanal' },
    { value: 'monthly', label: 'Mensal' },
    { value: 'quarterly', label: 'Trimestral' },
    { value: 'yearly', label: 'Anual' }
  ];
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [estatisticasClientes, setEstatisticasClientes] = useState<EstatisticasClientes | null>(null);
  
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
    notifications,
    showSuccess,
    showError,
    removeNotification
  } = useNotificationContext();

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

  const getStatusBadge = (status: string) => {
    const isActive = status === 'ativo';
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
        isActive 
          ? 'bg-green-100 text-green-800' 
          : 'bg-red-100 text-red-800'
      }`}>
        {isActive ? 'Ativo' : 'Inativo'}
      </span>
    );
  };

  const getCategoriaBadge = (categoria: string) => {
    const categoriaConfig = {
      curiosos: { label: 'Curiosos', color: 'bg-gray-100 text-gray-800' },
      novatos: { label: 'Novatos', color: 'bg-blue-100 text-blue-800' },
      fieis: { label: 'Fiéis', color: 'bg-green-100 text-green-800' },
      super_clientes: { label: 'Super Clientes', color: 'bg-purple-100 text-purple-800' }
    };
    
    const config = categoriaConfig[categoria as keyof typeof categoriaConfig] || categoriaConfig.curiosos;
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
    );
  };

  // Definir colunas da tabela de clientes
  const columns: DataTableColumn<typeof clientesFicticios[0]>[] = [
    {
      key: 'nome',
      label: 'Cliente',
      sortable: true,
      render: (cliente) => (
        <div className="flex items-center">
          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mr-2">
            <span className="text-xs font-medium text-gray-600">
              {cliente.nome.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <div className="text-sm font-medium text-gray-900">{cliente.nome}</div>
            <div className="text-xs text-gray-500">{cliente.telefone}</div>
          </div>
        </div>
      )
    },
    {
      key: 'endereco',
      label: 'Endereço',
      sortable: false,
      render: (cliente) => (
        <div className="max-w-xs">
          <div className="text-sm text-gray-900 truncate">{cliente.endereco}</div>
        </div>
      )
    },
    {
      key: 'totalPedidos',
      label: 'Total Pedidos',
      sortable: true,
      render: (cliente) => (
        <div className="text-center">
          <div className="text-sm font-medium text-gray-900">{cliente.totalPedidos}</div>
        </div>
      )
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
      render: (cliente) => getCategoriaBadge(cliente.categoria)
    },
    {
      key: 'ultimoPedido',
      label: 'Último Pedido',
      sortable: true,
      render: (cliente) => (
        <div>
          <div className="text-sm">{formatDate(cliente.ultimoPedido)}</div>
        </div>
      )
    },
    {
      key: 'actions',
      label: 'Ações',
      sortable: false
    }
  ];

  // Categorias únicas para filtros
  const categorias = React.useMemo(() => {
    const cats = [...new Set(clientesFicticios.map(c => c.categoria))];
    return cats.map(cat => ({ value: cat, label: getCategoriaBadge(cat).props.children }));
  }, []);

  // Status únicos para filtros
  const statusOptions = React.useMemo(() => {
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



  // Função para animar o carregamento dos cards
  const animarCarregamento = useCallback(() => {
    setCarregamentoCompleto(false);
    setAlturasAnimadas([0, 0, 0, 0]);
    
    // Usar os valores atuais dos percentuais
    const percentuaisAtuais = cardPercentages;
    
    // Animar cada card com incrementos graduais
    percentuaisAtuais.forEach((percentualFinal, index) => {
      const delayInicial = index * 500; // Delay inicial entre cards (mesma config dos produtos)
      const duracaoAnimacao = 2000; // 2 segundos para cada animação (mesma config dos produtos)
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
  }, [cardPercentages]); // Adicionada dependência para funcionar com recarregamentos

  // Simular carregamento inicial para exibir os cards enquanto animam (mesma lógica dos produtos)
  useEffect(() => {
    const timer = setTimeout(() => {
      setCarregamentoCompleto(true);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

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
              const dados = await firebaseClientesService.calcularEstatisticas();
      setEstatisticasClientes(dados);
      
      // Atualizar os valores dos cards com dados reais do Firebase
      const valoresReais = [
        dados.curiosos || 0,        // Card 1: Clientes que nunca pediram
        dados.novatos || 0,         // Card 2: Clientes com 1+ pedidos
        dados.fieis || 0,           // Card 3: Clientes com 2+ pedidos
        dados.super_clientes || 0   // Card 4: Clientes com 3+ pedidos
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

  // Efeito para carregar dados dos clientes ao montar o componente
  useEffect(() => {
    carregarDadosClientes();
  }, [carregarDadosClientes]);

  // Efeito para dados de exemplo e animação inicial
  useEffect(() => {
    // Dados de exemplo para teste (remover quando conectar com Firebase)
    const dadosExemplo = [25, 20, 15, 10];
    setCardValues(dadosExemplo);
    const percentuaisExemplo = calcularPercentuaisFunil(dadosExemplo);
    setCardPercentages(percentuaisExemplo);
  }, []); // Executar apenas uma vez ao montar

  // Efeito para iniciar animação sempre que os percentuais mudarem
  useEffect(() => {
    if (cardPercentages.some(p => p > 0)) {
      // Iniciar animação após um delay reduzido
      const timer = setTimeout(() => {
        animarCarregamento();
      }, 300); // Delay reduzido para 300ms

      return () => clearTimeout(timer);
    }
  }, [cardPercentages]); // Executar sempre que percentuais mudarem

  // Listener para recarregamento da página
  useEffect(() => {
    const handlePageShow = (event: PageTransitionEvent) => {
      // Se a página foi carregada do cache ou recarregada
      if (event.persisted || performance.navigation.type === 1) {
        // Resetar estado
        setCarregamentoCompleto(false);
        setAlturasAnimadas([0, 0, 0, 0]);
        
        // Iniciar animação após um delay reduzido
        setTimeout(() => {
          animarCarregamento();
        }, 300);
      }
    };

    window.addEventListener('pageshow', handlePageShow);

    return () => {
      window.removeEventListener('pageshow', handlePageShow);
    };
  }, [animarCarregamento]);

  // Efeito para atualizar alturas animadas quando percentuais mudarem
  useEffect(() => {
    // Só atualizar se não estiver no meio de uma animação
    if (cardPercentages.some(p => p > 0) && !carregamentoCompleto) {
      // Não atualizar automaticamente - deixar a animação controlar
      // setAlturasAnimadas(cardPercentages);
    }
  }, [cardPercentages, carregamentoCompleto]);

  

  const handleRetry = useCallback(() => {
    setError(null);
    carregarDadosClientes();
  }, [carregarDadosClientes]);

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#eeebeb' }}>
        <div className="text-center">
          <div className="text-red-600 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Erro ao carregar dados</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={handleRetry}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Tentar novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen" style={{ backgroundColor: '#eeebeb' }}>
        {/* CSS para animações de água */}
        <style>
          {`
            @keyframes ondulacaoSuperficie {
              0%, 100% {
                clip-path: polygon(0 0, 5% 0px, 10% 1px, 15% 0px, 20% 1.5px, 25% 1px, 30% 0px, 35% 1px, 40% 0px, 45% 1.5px, 50% 1px, 55% 0px, 60% 1px, 65% 0px, 70% 1.5px, 75% 1px, 80% 0px, 85% 1px, 90% 0px, 95% 1px, 100% 0px, 100% 100%, 0% 100%);
              }
              25% {
                clip-path: polygon(0 0, 5% 2px, 10% 1px, 15% 2.5px, 20% 1px, 25% 2px, 30% 1px, 35% 2.5px, 40% 1px, 45% 2px, 50% 1px, 55% 2.5px, 60% 1px, 65% 2px, 70% 1px, 75% 2.5px, 80% 1px, 85% 2px, 90% 1px, 95% 2.5px, 100% 1px, 100% 100%, 0% 100%);
              }
              50% {
                clip-path: polygon(0 0, 5% -1px, 10% 0px, 15% -1.5px, 20% 0px, 25% -1px, 30% 0px, 35% -1.5px, 40% 0px, 45% -1px, 50% 0px, 55% -1.5px, 60% 0px, 65% -1px, 70% 0px, 75% -1.5px, 80% 0px, 85% -1px, 90% 0px, 95% -1.5px, 100% 0px, 100% 100%, 0% 100%);
              }
              75% {
                clip-path: polygon(0 0, 5% 1px, 10% 2px, 15% 1px, 20% 2.5px, 25% 1px, 30% 2px, 35% 1px, 40% 2.5px, 45% 1px, 50% 2px, 55% 1px, 60% 2.5px, 65% 1px, 70% 2px, 75% 1px, 80% 2.5px, 85% 1px, 90% 2px, 95% 1px, 100% 1.5px, 100% 100%, 0% 100%);
              }
            }
            
            @keyframes bolhaSubindo1 {
              0% {
                transform: translateY(100%) scale(0.3);
                opacity: 0;
              }
              10% {
                opacity: 0.8;
              }
              90% {
                opacity: 0.8;
              }
              100% {
                transform: translateY(-20px) scale(0.1);
                opacity: 0;
              }
            }
            
            @keyframes bolhaSubindo2 {
              0% {
                transform: translateY(100%) scale(0.4);
                opacity: 0;
              }
              15% {
                opacity: 0.8;
              }
              90% {
                opacity: 0.8;
              }
              100% {
                transform: translateY(-25px) scale(0.1);
                opacity: 0;
              }
            }
            
            @keyframes bolhaSubindo3 {
              0% {
                transform: translateY(100%) scale(0.5);
                opacity: 0;
              }
              20% {
                opacity: 0.8;
              }
              90% {
                opacity: 0.8;
              }
              100% {
                transform: translateY(-30px) scale(0.1);
                opacity: 0;
              }
            }
            
            @keyframes bolhaSubindo4 {
              0% {
                transform: translateY(100%) scale(0.35);
                opacity: 0;
              }
              12% {
                opacity: 0.8;
              }
              90% {
                opacity: 0.8;
              }
              100% {
                transform: translateY(-22px) scale(0.1);
                opacity: 0;
              }
            }
            
            @keyframes bolhaSubindo5 {
              0% {
                transform: translateY(100%) scale(0.4);
                opacity: 0;
              }
              18% {
                opacity: 0.8;
              }
              90% {
                opacity: 0.8;
              }
              100% {
                transform: translateY(-28px) scale(0.1);
                opacity: 0;
              }
            }
            
            @keyframes bolhaSubindo6 {
              0% {
                transform: translateY(100%) scale(0.3);
                opacity: 0;
              }
              14% {
                opacity: 0.8;
              }
              90% {
                opacity: 0.8;
              }
              100% {
                transform: translateY(-24px) scale(0.1);
                opacity: 0;
              }
            }
          `}
        </style>

        {/* Notificações */}
        {notifications.map((notification) => (
          <NotificationToast
            key={notification.id}
            id={notification.id}
            message={notification.message}
            type={notification.type}
            duration={notification.duration}
            onClose={() => removeNotification(notification.id)}
          />
        ))}

        {/* Cabeçalho da página */}
        <PageHeader
          title="Relatório de Clientes por Frequência"
          subtitle="Análise da distribuição de clientes baseada no número de pedidos realizados"
          leftContent={
            <ReportNavigation currentPage="clientes" />
          }
          rightContent={
            <div className="flex items-center gap-4">
              {/* Filtro de período */}
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-700">Período:</label>
                <CustomDropdown
                  options={periodOptions}
                  selectedValue={selectedPeriod}
                  onValueChange={handlePeriodChange}
                  size="sm"
                  className="min-w-[140px]"
                />
              </div>
              
              {/* Botões de exportação */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleExport}
                  disabled={loading}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Excel
                </button>
                <button
                  onClick={handleExport}
                  disabled={loading}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  PDF
                </button>
              </div>
            </div>
          }
        />
        
        {/* Espaço para não sobrepor o conteúdo */}
        <div className="h-0" />

        {/* Content */}
        <div className="px-6 pt-2 pb-12" style={{ padding: '24px 24px 50px 24px' }}>


          {/* Conteúdo principal com skeleton loading contextual */}
          {!carregamentoCompleto ? (
            <ReportSkeleton type="clientes" />
          ) : (
            <>
              <div className="space-y-6">
                {/* Resumo estatístico */}
                {estatisticasClientes && (
                  <EstatisticasContainer estatisticasClientes={estatisticasClientes} />
                )}

                {/* Card pai dos cards de distribuição */}
                <div className="bg-white rounded-lg p-4" style={{ border: '1px solid #cfd1d3' }}>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-900" style={{ fontSize: '12px' }}>Funil de Fidelidade</h3>
                  </div>
                  
                  {/* Cards internos com dimensões específicas */}
                  <div className="mt-6 flex justify-between gap-6 flex-wrap w-full">
                     {/* Card 1 */}
                     <div 
                       className="bg-white rounded-lg relative flex-1 overflow-hidden"
                       style={{ minWidth: '160px', height: '200px', border: '1px solid #cfd1d3' }}
                     >
                       {/* Linha verde dinâmica baseada no percentual com efeito de água */}
                       <div 
                         className="absolute bottom-0 left-0 right-0 bg-green-500 rounded-b-lg transition-all duration-2000 ease-out"
                         style={{ 
                           height: `${Math.max(alturasAnimadas[0], 5)}%`,
                           minHeight: '10px',
                           animation: mostrarAnimacoes && alturasAnimadas[0] > 0
                             ? `ondulacaoSuperficie ${3 + 0 * 0.3}s ease-in-out infinite`
                             : 'none',
                           transform: `translateY(${alturasAnimadas[0] > 0 ? 0 : 100}%)`,
                           transition: 'transform 0.8s ease-out'
                         }}
                       >
                         {/* Bolhas flutuando na água */}
                         {mostrarAnimacoes && alturasAnimadas[0] > 0 && (
                           <>
                             <div 
                               className="absolute rounded-full border-2 border-white"
                               style={{
                                 width: '18px',
                                 height: '18px',
                                 left: '20%',
                                 bottom: '30%',
                                 zIndex: 8,
                                 animation: 'bolhaSubindo1 4s ease-in-out infinite'
                               }}
                             />
                             <div 
                               className="absolute rounded-full border-2 border-white"
                               style={{
                                 width: '16px',
                                 height: '16px',
                                 left: '60%',
                                 bottom: '20%',
                                 zIndex: 8,
                                 animation: 'bolhaSubindo2 5s ease-in-out infinite'
                               }}
                             />
                             <div 
                               className="absolute rounded-full border-2 border-white"
                               style={{
                                 width: '14px',
                                 height: '14px',
                                 left: '80%',
                                 bottom: '40%',
                                 zIndex: 8,
                                 animation: 'bolhaSubindo3 6s ease-in-out infinite'
                               }}
                             />
                             <div 
                               className="absolute rounded-full border-2 border-white"
                               style={{
                                 width: '12px',
                                 height: '12px',
                                 left: '40%',
                                 bottom: '60%',
                                 zIndex: 8,
                                 animation: 'bolhaSubindo4 7s ease-in-out infinite'
                               }}
                             />
                             <div 
                               className="absolute rounded-full border-2 border-white"
                               style={{
                                 width: '10px',
                                 height: '10px',
                                 left: '70%',
                                 bottom: '70%',
                                 zIndex: 8,
                                 animation: 'bolhaSubindo5 8s ease-in-out infinite'
                               }}
                             />
                             <div 
                               className="absolute rounded-full border-2 border-white"
                               style={{
                                 width: '8px',
                                 height: '8px',
                                 left: '30%',
                                 bottom: '80%',
                                 zIndex: 8,
                                 animation: 'bolhaSubindo6 9s ease-in-out infinite'
                               }}
                             />
                           </>
                         )}
                       </div>
                                                
                       {/* Número 1 */}
                       <div className="absolute top-2 left-4 text-xs text-gray-600 font-medium">Curiosos</div>
                         
                       {/* Percentual */}
                       <div className="absolute bottom-2 left-2 text-xs font-bold">
                         <div className="text-black">{Math.round(alturasAnimadas[0])}%</div>
                       </div>
                     </div>

                     {/* Card 2 */}
                     <div 
                       className="bg-white rounded-lg relative flex-1 overflow-hidden"
                       style={{ minWidth: '160px', height: '200px', border: '1px solid #cfd1d3' }}
                     >
                       {/* Linha verde dinâmica baseada no percentual com efeito de água */}
                       <div 
                         className="absolute bottom-0 left-0 right-0 bg-green-500 rounded-b-lg transition-all duration-2000 ease-out"
                         style={{ 
                           height: `${Math.max(alturasAnimadas[1], 5)}%`,
                           minHeight: '10px',
                           animation: mostrarAnimacoes && alturasAnimadas[1] > 0
                             ? `ondulacaoSuperficie ${3 + 1 * 0.3}s ease-in-out infinite`
                             : 'none',
                           transform: `translateY(${alturasAnimadas[1] > 0 ? 0 : 100}%)`,
                           transition: 'transform 0.8s ease-out'
                         }}
                       >
                         {/* Bolhas flutuando na água */}
                         {mostrarAnimacoes && alturasAnimadas[1] > 0 && (
                           <>
                             <div 
                               className="absolute rounded-full border-2 border-white"
                               style={{
                                 width: '18px',
                                 height: '18px',
                                 left: '20%',
                                 bottom: '30%',
                                 zIndex: 8,
                                 animation: 'bolhaSubindo1 4s ease-in-out infinite'
                               }}
                             />
                             <div 
                               className="absolute rounded-full border-2 border-white"
                               style={{
                                 width: '16px',
                                 height: '16px',
                                 left: '60%',
                                 bottom: '20%',
                                 zIndex: 8,
                                 animation: 'bolhaSubindo2 5s ease-in-out infinite'
                               }}
                             />
                             <div 
                               className="absolute rounded-full border-2 border-white"
                               style={{
                                 width: '14px',
                                 height: '14px',
                                 left: '80%',
                                 bottom: '40%',
                                 zIndex: 8,
                                 animation: 'bolhaSubindo3 6s ease-in-out infinite'
                               }}
                             />
                             <div 
                               className="absolute rounded-full border-2 border-white"
                               style={{
                                 width: '12px',
                                 height: '12px',
                                 left: '40%',
                                 bottom: '60%',
                                 zIndex: 8,
                                 animation: 'bolhaSubindo4 7s ease-in-out infinite'
                               }}
                             />
                             <div 
                               className="absolute rounded-full border-2 border-white"
                               style={{
                                 width: '10px',
                                 height: '10px',
                                 left: '70%',
                                 bottom: '70%',
                                 zIndex: 8,
                                 animation: 'bolhaSubindo5 8s ease-in-out infinite'
                               }}
                             />
                             <div 
                               className="absolute rounded-full border-2 border-white"
                               style={{
                                 width: '8px',
                                 height: '8px',
                                 left: '30%',
                                 bottom: '80%',
                                 zIndex: 8,
                                 animation: 'bolhaSubindo6 9s ease-in-out infinite'
                               }}
                             />
                           </>
                         )}
                       </div>
                                                
                       {/* Número 2 */}
                       <div className="absolute top-2 left-4 text-xs text-gray-600 font-medium">Novatos</div>
                         
                       {/* Percentual */}
                       <div className="absolute bottom-2 left-2 text-xs font-bold">
                         <div className="text-black">{Math.round(alturasAnimadas[1])}%</div>
                       </div>
                     </div>

                     {/* Card 3 */}
                     <div 
                       className="bg-white rounded-lg relative flex-1 overflow-hidden"
                       style={{ minWidth: '160px', height: '200px', border: '1px solid #cfd1d3' }}
                     >
                       {/* Linha verde dinâmica baseada no percentual com efeito de água */}
                       <div 
                         className="absolute bottom-0 left-0 right-0 bg-green-500 rounded-b-lg transition-all duration-2000 ease-out"
                         style={{ 
                           height: `${Math.max(alturasAnimadas[2], 5)}%`,
                           minHeight: '10px',
                           animation: mostrarAnimacoes && alturasAnimadas[2] > 0
                             ? `ondulacaoSuperficie ${3 + 2 * 0.3}s ease-in-out infinite`
                             : 'none',
                           transform: `translateY(${alturasAnimadas[2] > 0 ? 0 : 100}%)`,
                           transition: 'transform 0.8s ease-out'
                         }}
                       >
                         {/* Bolhas flutuando na água */}
                         {mostrarAnimacoes && alturasAnimadas[2] > 0 && (
                           <>
                             <div 
                               className="absolute rounded-full border-2 border-white"
                               style={{
                                 width: '18px',
                                 height: '18px',
                                 left: '20%',
                                 bottom: '20%',
                                 zIndex: 8,
                                 animation: 'bolhaSubindo1 4s ease-in-out infinite'
                               }}
                             />
                             <div 
                               className="absolute rounded-full border-2 border-white"
                               style={{
                                 width: '16px',
                                 height: '16px',
                                 left: '60%',
                                 bottom: '30%',
                                 zIndex: 8,
                                 animation: 'bolhaSubindo2 5s ease-in-out infinite'
                               }}
                             />
                             <div 
                               className="absolute rounded-full border-2 border-white"
                               style={{
                                 width: '14px',
                                 height: '14px',
                                 left: '80%',
                                 bottom: '40%',
                                 zIndex: 8,
                                 animation: 'bolhaSubindo3 6s ease-in-out infinite'
                               }}
                             />
                             <div 
                               className="absolute rounded-full border-2 border-white"
                               style={{
                                 width: '12px',
                                 height: '12px',
                                 left: '40%',
                                 bottom: '50%',
                                 zIndex: 8,
                                 animation: 'bolhaSubindo4 7s ease-in-out infinite'
                               }}
                             />
                             <div 
                               className="absolute rounded-full border-2 border-white"
                               style={{
                                 width: '10px',
                                 height: '10px',
                                 left: '70%',
                                 bottom: '60%',
                                 zIndex: 8,
                                 animation: 'bolhaSubindo5 8s ease-in-out infinite'
                               }}
                             />
                             <div 
                               className="absolute rounded-full border-2 border-white"
                               style={{
                                 width: '8px',
                                 height: '8px',
                                 left: '30%',
                                 bottom: '70%',
                                 zIndex: 8,
                                 animation: 'bolhaSubindo6 9s ease-in-out infinite'
                               }}
                             />
                           </>
                         )}
                       </div>
                                                
                       {/* Número 3 */}
                       <div className="absolute top-2 left-4 text-xs text-gray-600 font-medium">Fiéis</div>
                         
                       {/* Percentual */}
                       <div className="absolute bottom-2 left-2 text-xs font-bold">
                         <div className="text-black">{Math.round(alturasAnimadas[2])}%</div>
                       </div>
                     </div>

                     {/* Card 4 */}
                     <div 
                       className="bg-white rounded-lg relative flex-1 overflow-hidden"
                       style={{ minWidth: '160px', height: '200px', border: '1px solid #cfd1d3' }}
                     >
                       {/* Linha verde dinâmica baseada no percentual com efeito de água */}
                       <div 
                         className="absolute bottom-0 left-0 right-0 bg-green-500 rounded-b-lg transition-all duration-2000 ease-out"
                         style={{ 
                           height: `${Math.max(alturasAnimadas[3], 5)}%`,
                           minHeight: '10px',
                           animation: mostrarAnimacoes && alturasAnimadas[3] > 0
                             ? `ondulacaoSuperficie ${3 + 3 * 0.3}s ease-in-out infinite`
                             : 'none',
                           transform: `translateY(${alturasAnimadas[3] > 0 ? 0 : 100}%)`,
                           transition: 'transform 0.8s ease-out'
                         }}
                       >
                         {/* Bolhas flutuando na água */}
                         {mostrarAnimacoes && alturasAnimadas[3] > 0 && (
                           <>
                             <div 
                               className="absolute rounded-full border-2 border-white"
                               style={{
                                 width: '18px',
                                 height: '18px',
                                 left: '20%',
                                 bottom: '30%',
                                 zIndex: 8,
                                 animation: 'bolhaSubindo1 4s ease-in-out infinite'
                               }}
                             />
                             <div 
                               className="absolute rounded-full border-2 border-white"
                               style={{
                                 width: '16px',
                                 height: '16px',
                                 left: '60%',
                                 bottom: '20%',
                                 zIndex: 8,
                                 animation: 'bolhaSubindo2 5s ease-in-out infinite'
                               }}
                             />
                             <div 
                               className="absolute rounded-full border-2 border-white"
                               style={{
                                 width: '14px',
                                 height: '14px',
                                 left: '80%',
                                 bottom: '40%',
                                 zIndex: 8,
                                 animation: 'bolhaSubindo3 6s ease-in-out infinite'
                               }}
                             />
                             <div 
                               className="absolute rounded-full border-2 border-white"
                               style={{
                                 width: '12px',
                                 height: '12px',
                                 left: '40%',
                                 bottom: '60%',
                                 zIndex: 8,
                                 animation: 'bolhaSubindo4 7s ease-in-out infinite'
                               }}
                             />
                             <div 
                               className="absolute rounded-full border-2 border-white"
                               style={{
                                 width: '10px',
                                 height: '10px',
                                 left: '70%',
                                 bottom: '70%',
                                 zIndex: 8,
                                 animation: 'bolhaSubindo5 8s ease-in-out infinite'
                               }}
                             />
                             <div 
                               className="absolute rounded-full border-2 border-white"
                               style={{
                                 width: '8px',
                                 height: '8px',
                                 left: '30%',
                                 bottom: '80%',
                                 zIndex: 8,
                                 animation: 'bolhaSubindo6 9s ease-in-out infinite'
                               }}
                             />
                           </>
                         )}
                       </div>
                                                
                       {/* Número 4 */}
                       <div className="absolute top-2 left-4 text-xs text-gray-600 font-medium">Super Clientes</div>
                         
                       {/* Percentual */}
                       <div className="absolute bottom-2 left-2 text-xs font-bold">
                         <div className="text-black">{Math.round(alturasAnimadas[3])}%</div>
                       </div>
                     </div>
                  </div>
                </div>
              </div>

                {/* Tabela de Clientes */}
                <DataTable
                  data={clientesFicticios}
                  columns={columns}
                  searchPlaceholder="Buscar clientes..."
                  searchFields={['nome', 'telefone', 'endereco']}
                  filters={{
                    categories: categorias,
                    statuses: statusOptions,
                    showDateRange: true
                  }}
                  actions={{
                    onView: (cliente) => console.log('Visualizar:', cliente)
                  }}
                  pagination={{
                    itemsPerPageOptions: [5, 8, 10, 15, 20],
                    defaultItemsPerPage: 8
                  }}
                  onAdd={() => console.log('Adicionar novo cliente')}
                  addButtonText="Novo Cliente"
                />
            </>
          )}
          
          {/* Margem inferior da página */}
          <div className="h-25"></div>
        </div>
      </div>
    </ErrorBoundary>
  );
}