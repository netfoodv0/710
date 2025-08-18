import React, { useState, useCallback, useEffect } from 'react';
import { Plus, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { PageHeader } from '../components/ui';
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
        {/* Cabeçalho da página */}
        <PageHeader
          title="Pedidos"
          subtitle="Acompanhe e gerencie todos os pedidos em tempo real"
          rightContent={
            <div className="flex items-center gap-4">
              {/* Filtro de período */}
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-700">Período:</label>
                <select
                  value={selectedPeriod}
                  onChange={(e) => handlePeriodChange(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="today">Hoje</option>
                  <option value="week">Esta Semana</option>
                  <option value="month">Este Mês</option>
                  <option value="year">Este Ano</option>
                </select>
              </div>
              
              {/* Botão Novo Pedido */}
              <button
                onClick={handleCriarPedidoFicticio}
                disabled={isCreating}
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isCreating ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Plus className="w-4 h-4" />
                )}
                Novo Pedido
              </button>
            </div>
          }
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