import React, { useState } from 'react';
import { Search, Eye, Grid, List, Plus, ShoppingBag } from 'lucide-react';
import { Card, StatusBadge } from '../components';
import { FiltrosStatus, StatusActions, ModalDetalhesPedido, CardPedido } from '../components/pedidos';
import { pedidosMock } from '../data';
import { Pedido } from '../types';

export function Pedidos() {
  const [pedidos, setPedidos] = useState(pedidosMock);
  const loading = false;
  const error = null;
  const [filtroStatus, setFiltroStatus] = useState('todos');
  const [busca, setBusca] = useState('');
  const [pedidoSelecionado, setPedidoSelecionado] = useState<Pedido | null>(null);
  const [viewMode, setViewMode] = useState<'cards' | 'list'>('cards');

  const handleStatusChange = (pedidoId: string, novoStatus: string) => {
    // TODO: Implementar atualização de status via hook usePedidos
    console.log(`Atualizando pedido ${pedidoId} para status ${novoStatus}`);
  };

  const pedidosFiltrados = pedidos.filter(pedido => {
    const matchStatus = filtroStatus === 'todos' || pedido.status === filtroStatus;
    const matchBusca = busca === '' || 
      pedido.numero.includes(busca) ||
      pedido.cliente.nome.toLowerCase().includes(busca.toLowerCase());
    
    return matchStatus && matchBusca;
  });

  // Mostrar loading enquanto carrega
  if (loading) {
    return (
      <div className="p-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Carregando pedidos...</p>
          </div>
        </div>
      </div>
    );
  }

  // Mostrar erro se houver
  if (error) {
    return (
      <div className="p-8">
        <Card className="mb-8">
          <div className="text-center py-8">
            <p className="text-red-600 mb-4">Erro ao carregar pedidos: {error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="btn btn-primary"
            >
              Tentar novamente
            </button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Cabeçalho */}
      <Card className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Gestão de Pedidos</h1>
            <p className="text-gray-600 mt-1">
              Acompanhe e gerencie todos os pedidos em tempo real
            </p>
          </div>
          <button className="btn btn-primary">
            <Plus className="w-4 h-4 mr-2" />
            Novo Pedido
          </button>
        </div>
      </Card>

      {/* Filtros por Status */}
      <div className="mb-6">
        <FiltrosStatus
          pedidos={pedidos}
          statusSelecionado={filtroStatus}
          onStatusChange={setFiltroStatus}
        />
      </div>

      {/* Barra de busca e controles */}
      <Card className="mb-8">
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por número do pedido ou nome do cliente..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          {/* Controles de visualização */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('cards')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'cards' 
                  ? 'bg-blue-100 text-blue-600' 
                  : 'text-gray-400 hover:text-gray-600'
              }`}
              title="Visualização em cards"
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'list' 
                  ? 'bg-blue-100 text-blue-600' 
                  : 'text-gray-400 hover:text-gray-600'
              }`}
              title="Visualização em lista"
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>
      </Card>

      {/* Conteúdo dos pedidos */}
      {viewMode === 'cards' ? (
        // Visualização em cards
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {pedidosFiltrados.map((pedido) => {
            console.log('Renderizando pedido:', pedido);
            return (
              <CardPedido
                key={pedido.id}
                pedido={pedido}
                onPedidoClick={setPedidoSelecionado}
                onEditarPedido={(pedido) => console.log('Editar pedido:', pedido)}
                onImprimirPedido={(pedido) => console.log('Imprimir pedido:', pedido)}
              />
            );
          })}
        </div>
      ) : (
        // Visualização em lista (tabela)
        <div className="space-y-4">
          {pedidosFiltrados.map((pedido) => (
            <CardPedido
              key={pedido.id}
              pedido={pedido}
              variant="compact"
              onPedidoClick={setPedidoSelecionado}
              onEditarPedido={(pedido) => console.log('Editar pedido:', pedido)}
              onImprimirPedido={(pedido) => console.log('Imprimir pedido:', pedido)}
            />
          ))}
        </div>
      )}

      {/* Mensagem quando não há pedidos */}
      {pedidosFiltrados.length === 0 && (
        <Card className="text-center py-12">
          <div className="text-gray-500">
            <ShoppingBag className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Nenhum pedido encontrado
            </h3>
            <p className="text-gray-600">
              {busca ? 'Tente ajustar os filtros de busca.' : 'Não há pedidos para exibir.'}
            </p>
          </div>
        </Card>
      )}

      {/* Modal de detalhes */}
      {pedidoSelecionado && (
        <ModalDetalhesPedido
          isOpen={!!pedidoSelecionado}
          pedido={pedidoSelecionado}
          onClose={() => setPedidoSelecionado(null)}
          onStatusChange={(novoStatus) => {
            handleStatusChange(pedidoSelecionado.id, novoStatus);
            setPedidoSelecionado(null);
          }}
        />
      )}
    </div>
  );
}