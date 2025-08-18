import React, { useState, useEffect, useCallback } from 'react';
import { Cupom } from '../types/cupons';
import { useNotificationContext } from '../context/notificationContextUtils';
import { NotificationToast } from '../components/NotificationToast';
import { ErrorBoundary } from '../components/ErrorBoundary';

import { ModalCupom } from '../components/modals/ModalCriarEditarCupom';
import { PageHeader } from '../components/ui';
import {
  CupomStats,
  CupomList,
  CupomErrorState,
  CupomLoadingState
} from '../components/cupons';

const CUPONS_MOCK: Cupom[] = [
  {
    id: '1',
    codigo: 'DESCONTO10',
    descricao: 'Desconto de 10% em pedidos acima de R$ 30',
    tipo: 'desconto_percentual',
    valor: 10,
    valorMinimoPedido: 30,
    dataInicio: new Date('2024-01-01'),
    dataFim: new Date('2024-12-31'),
    limiteUsos: 100,
    usosAtuais: 25,
    ativo: true,
    criadoEm: new Date('2024-01-01'),
    atualizadoEm: new Date('2024-01-01')
  },
  {
    id: '2',
    codigo: 'FRETE5',
    descricao: 'R$ 5 de desconto fixo em qualquer pedido',
    tipo: 'desconto_fixo',
    valor: 5,
    dataInicio: new Date('2024-01-01'),
    dataFim: new Date('2024-06-30'),
    usosAtuais: 150,
    ativo: true,
    criadoEm: new Date('2024-01-01'),
    atualizadoEm: new Date('2024-01-01')
  },
  {
    id: '3',
    codigo: 'FRETEGRATIS',
    descricao: 'Frete grátis para pedidos acima de R$ 50',
    tipo: 'frete_gratis',
    valor: 0,
    valorMinimoPedido: 50,
    dataInicio: new Date('2024-01-01'),
    dataFim: new Date('2024-12-31'),
    limiteUsos: 200,
    usosAtuais: 45,
    ativo: true,
    criadoEm: new Date('2024-01-01'),
    atualizadoEm: new Date('2024-01-01')
  },
  {
    id: '4',
    codigo: 'BRINDE20',
    descricao: 'Brinde especial em pedidos acima de R$ 80',
    tipo: 'brinde',
    valor: 15,
    valorMinimoPedido: 80,
    dataInicio: new Date('2024-01-01'),
    dataFim: new Date('2024-03-31'),
    limiteUsos: 50,
    usosAtuais: 12,
    ativo: false,
    criadoEm: new Date('2024-01-01'),
    atualizadoEm: new Date('2024-01-01')
  }
];

export function Cupons() {
  const [cupons, setCupons] = useState<Cupom[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modalAberto, setModalAberto] = useState(false);
  const [cupomEditando, setCupomEditando] = useState<Cupom | undefined>(undefined);
  
  const {
    notifications,
    showSuccess,
    showError,
    removeNotification
  } = useNotificationContext();




  // Função para carregar dados (simulando API)
  const carregarDados = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      // Simulando delay de API
      await new Promise(resolve => setTimeout(resolve, 1000));
      setCupons(CUPONS_MOCK);
    } catch (err) {
      setError('Erro ao carregar cupons');
    } finally {
      setLoading(false);
    }
  }, []);

  const limparErro = useCallback(() => {
    setError(null);
  }, []);

  const handleRetry = useCallback(() => {
    limparErro();
    carregarDados();
  }, [limparErro, carregarDados]);

  useEffect(() => {
    carregarDados();
  }, [carregarDados]);

  const handleSaveCupom = async (cupomData: Omit<Cupom, 'id' | 'dataCriacao' | 'dataAtualizacao'>) => {
    const novoCupom: Cupom = {
      id: Date.now().toString(),
      ...cupomData,
      criadoEm: new Date(),
      atualizadoEm: new Date()
    };

    setCupons(prev => [...prev, novoCupom]);
  };

  const handleEditCupom = async (id: string, cupomData: Partial<Cupom>) => {
    setCupons(prev => prev.map(cupom => 
      cupom.id === id 
        ? { ...cupom, ...cupomData, atualizadoEm: new Date() }
        : cupom
    ));
  };

  const handleDeleteCupom = async (id: string) => {
    setCupons(prev => prev.filter(cupom => cupom.id !== id));
  };

  const abrirModalCriacao = () => {
    setCupomEditando(undefined);
    setModalAberto(true);
  };

  const abrirModalEdicao = (cupom: Cupom) => {
    setCupomEditando(cupom);
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
    setCupomEditando(undefined);
  };

  const toggleCupomStatus = (id: string) => {
    setCupons(prev => prev.map(cupom => 
      cupom.id === id ? { ...cupom, ativo: !cupom.ativo, atualizadoEm: new Date() } : cupom
    ));
  };

  // Error state
  if (error) {
    return <CupomErrorState error={error} onRetry={handleRetry} onClearError={limparErro} />;
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen" style={{ backgroundColor: '#f7f5f3' }}>
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
          title="Cupons de Desconto"
          subtitle="Gerencie os cupons de desconto do seu estabelecimento"
          actionButton={{
            label: "Novo Cupom",
            onClick: abrirModalCriacao,
            variant: "primary",
            size: "md"
          }}
        />
        
        {/* Espaço para não sobrepor o conteúdo */}
        <div className="h-0" />

        {/* Conteúdo Principal */}
        <div className="px-6 pt-6">
          {loading ? (
            <CupomLoadingState />
          ) : (
            <>
              {/* Estatísticas */}
              <div className="mb-6">
                <CupomStats cupons={cupons} />
              </div>

              {/* Lista de Cupons */}
              <div className="mb-6">
                <CupomList
                  cupons={cupons}
                  onEdit={abrirModalEdicao}
                  onToggleStatus={toggleCupomStatus}
                />
              </div>
            </>
          )}
        </div>

        {/* Modal de Criação/Edição */}
        <ModalCupom
          isOpen={modalAberto}
          onClose={fecharModal}
          cupom={cupomEditando}
          onSave={handleSaveCupom}
          onEdit={handleEditCupom}
          onDelete={handleDeleteCupom}
        />
      </div>
    </ErrorBoundary>
  );
}