import React, { useState, useCallback, useEffect } from 'react';
import { Plus, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { RelatorioHeader } from '../features/relatorios/components/RelatorioHeader';
import { firebasePedidoService } from '../services/firebasePedidoService';
import { gerarPedidoFicticio } from '../utils/pedidoUtils';
import { useNotifications } from '../hooks/useNotifications';
import { usePeriodFilter } from '../hooks/usePeriodFilter';


export function Pedidos() {
  const [isCreating, setIsCreating] = useState(false);
  const navigate = useNavigate();
  const { showSuccess, showError } = useNotifications();
  const { selectedPeriod, handlePeriodChange } = usePeriodFilter();




  const handleCriarPedidoFicticio = useCallback(async () => {
    setIsCreating(true);
    
    try {
      // Gerar pedido fictício
      const pedidoFicticio = gerarPedidoFicticio();
      
      // Criar pedido no Firebase
      const pedidoId = await firebasePedidoService.criarPedido(pedidoFicticio);
      
      // Mostrar sucesso
      showSuccess('Pedido fictício criado com sucesso! Redirecionando para o histórico...', 3000);
      
      // Aguardar um pouco para o usuário ver a mensagem
      setTimeout(() => {
        // Navegar para o histórico de pedidos
        navigate('/historico');
      }, 1500);
      
    } catch (error) {
      console.error('Erro ao criar pedido fictício:', error);
      showError('Erro ao criar pedido fictício. Tente novamente.');
    } finally {
      setIsCreating(false);
    }
  }, [navigate, showSuccess, showError]);

  const handleExportExcel = useCallback(async () => {
    await handleCriarPedidoFicticio();
  }, [handleCriarPedidoFicticio]);

  const handleExportPDF = useCallback(async () => {
    await handleCriarPedidoFicticio();
  }, [handleCriarPedidoFicticio]);

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-slate-50">
        {/* Cabeçalho fixo reutilizável */}
        <RelatorioHeader
          title=""
          subtitle="Acompanhe e gerencie todos os pedidos em tempo real"
          selectedPeriod={selectedPeriod}
          onPeriodChange={handlePeriodChange}
          onExportExcel={handleExportExcel}
          onExportPDF={handleExportPDF}
          loading={isCreating}
          showNewOrderButton={true}
          onNewOrder={handleCriarPedidoFicticio}
        />
        {/* Espaço para não sobrepor o conteúdo */}
        <div className="h-[80px] md:h-[88px]" />
        {/* Conteúdo da página */}
        <div className="pb-4 px-4">
          <div className="bg-white border border-slate-200 rounded-lg p-0">
            <div className="text-center">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                Sistema de Pedidos
              </h2>
              <p className="text-gray-600 mb-6">
                Clique no botão "Novo Pedido" no cabeçalho para criar um pedido fictício que será salvo no histórico.
              </p>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-md mx-auto">
                <h3 className="text-sm font-medium text-blue-900 mb-2">
                  💡 Como funciona:
                </h3>
                <ul className="text-xs text-blue-800 space-y-1">
                  <li>• Gera dados realistas de cliente e produtos</li>
                  <li>• Salva automaticamente no Firebase</li>
                  <li>• Redireciona para o histórico de pedidos</li>
                  <li>• Útil para testes e demonstrações</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
}