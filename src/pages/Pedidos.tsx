import React, { useState, useCallback } from 'react';
import { Plus, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { firebasePedidoService } from '../services/firebasePedidoService';
import { gerarPedidoFicticio } from '../utils/pedidoUtils';
import { useNotifications } from '../hooks/useNotifications';

export function Pedidos() {
  const [isCreating, setIsCreating] = useState(false);
  const navigate = useNavigate();
  const { showSuccess, showError } = useNotifications();

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

  return (
    <ErrorBoundary>
      <div className="h-full flex flex-col">
        {/* Cabeçalho Fixo */}
        <div className="flex-shrink-0 p-4">
          <div className="bg-white border border-slate-200 rounded" style={{ height: '72px' }}>
            <div className="p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4" style={{ height: '100%' }}>
              {/* Esquerda: Título e subtítulo */}
              <div>
                <h1 className="text-sm font-bold text-gray-900">Gestão de Pedidos</h1>
                <p className="text-gray-600 mt-1 text-xs">Acompanhe e gerencie todos os pedidos em tempo real</p>
              </div>
              
              {/* Direita: Ações */}
              <div className="flex items-center gap-3">
                <button 
                  onClick={handleCriarPedidoFicticio}
                  disabled={isCreating}
                  className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isCreating ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Plus className="w-4 h-4" />
                  )}
                  {isCreating ? 'Criando...' : 'Novo Pedido'}
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Conteúdo da página */}
        <div className="flex-1 p-4">
          <div className="bg-white border border-slate-200 rounded-lg p-6">
            <div className="text-center">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                Sistema de Pedidos
              </h2>
              <p className="text-gray-600 mb-6">
                Clique no botão "Novo Pedido" para criar um pedido fictício que será salvo no histórico.
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