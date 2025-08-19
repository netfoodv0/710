import React, { useState, useCallback, useEffect } from 'react';
import { Plus, Loader2, Search, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { PageHeader } from '../components/ui';
import { ColunaHeader, PedidoCard } from '../components/pedidos';
import { firebasePedidoService } from '../services/firebasePedidoService';
import { gerarPedidoFicticio } from '../utils/pedidoUtils';
import { useNotifications } from '../hooks/useNotifications';
import './Pedidos.css';

interface Adicional {
  nome: string;
  quantidade: number;
  preco: number;
}

interface ItemPedido {
  nome: string;
  quantidade: number;
  preco: number;
  adicionais?: Adicional[];
}

interface Pedido {
  id: string;
  numero: string;
  horario: string;
  cliente: string;
  endereco: string;
  itens: string;
  itensDetalhados: ItemPedido[];
  valor: string;
  status: 'analise' | 'preparo' | 'entrega';
  tipoPagamento: 'dinheiro' | 'pix' | 'cartao';
  timestampAceito?: number;
}

export function Pedidos() {
  const [isCreating, setIsCreating] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [pedidos, setPedidos] = useState<Pedido[]>([
    {
      id: '1',
      numero: '#PED123456',
      horario: '14:30',
      cliente: 'João Silva',
      endereco: 'Rua A, 123',
      itens: 'X-Burger + Batata + Refri',
      itensDetalhados: [
        { nome: 'X-Burger', quantidade: 1, preco: 12.90, adicionais: [
          { nome: 'Queijo Extra', quantidade: 2, preco: 1.50 },
          { nome: 'Bacon', quantidade: 1, preco: 2.00 }
        ]},
        { nome: 'Batata Frita', quantidade: 1, preco: 8.50 },
        { nome: 'Refrigerante', quantidade: 1, preco: 2.00 }
      ],
      valor: 'R$ 23,40',
      status: 'analise',
      tipoPagamento: 'pix'
    },
    {
      id: '2',
      numero: '#PED123457',
      horario: '14:45',
      cliente: 'Maria Santos',
      endereco: 'Av. B, 456',
      itens: 'X-Salada + Suco',
      itensDetalhados: [
        { nome: 'X-Salada', quantidade: 1, preco: 15.90, adicionais: [
          { nome: 'Sem cebola', quantidade: 1, preco: 0.00 },
          { nome: 'Molho extra', quantidade: 2, preco: 1.00 }
        ]},
        { nome: 'Suco Natural', quantidade: 1, preco: 6.50 }
      ],
      valor: 'R$ 22,40',
      status: 'analise',
      tipoPagamento: 'cartao'
    },
    {
      id: '3',
      numero: '#PED123455',
      horario: '14:15',
      cliente: 'Pedro Oliveira',
      endereco: 'Rua C, 789',
      itens: 'X-Tudo + Batata + Refri',
      itensDetalhados: [
        { nome: 'X-Tudo', quantidade: 1, preco: 18.90, adicionais: [
          { nome: 'Queijo Extra', quantidade: 3, preco: 1.50 },
          { nome: 'Bacon Extra', quantidade: 2, preco: 2.00 },
          { nome: 'Molho especial', quantidade: 1, preco: 1.50 }
        ]},
        { nome: 'Batata Frita', quantidade: 1, preco: 8.50, adicionais: [
          { nome: 'Queijo ralado', quantidade: 2, preco: 1.00 }
        ]},
        { nome: 'Refrigerante', quantidade: 1, preco: 2.00 }
      ],
      valor: 'R$ 28,90',
      status: 'preparo',
      tipoPagamento: 'pix'
    },
    {
      id: '4',
      numero: '#PED123454',
      horario: '13:45',
      cliente: 'Ana Costa',
      endereco: 'Av. D, 101',
      itens: 'X-Bacon + Batata + Refri',
      itensDetalhados: [
        { nome: 'X-Bacon', quantidade: 1, preco: 22.90, adicionais: [
          { nome: 'Queijo Extra', quantidade: 1, preco: 1.50 },
          { nome: 'Bacon Extra', quantidade: 3, preco: 2.00 }
        ]},
        { nome: 'Batata Frita', quantidade: 1, preco: 8.50 },
        { nome: 'Refrigerante', quantidade: 1, preco: 2.00 }
      ],
      valor: 'R$ 31,40',
      status: 'entrega',
      tipoPagamento: 'cartao'
    },
    {
      id: '5',
      numero: '#PED123458',
      horario: '15:00',
      cliente: 'Carlos Ferreira',
      endereco: 'Rua E, 202',
      itens: 'X-Frango + Batata + Refri',
      itensDetalhados: [
        { nome: 'X-Frango', quantidade: 1, preco: 16.90, adicionais: [
          { nome: 'Catupiry', quantidade: 2, preco: 1.50 }
        ]},
        { nome: 'Batata Frita', quantidade: 1, preco: 8.50 },
        { nome: 'Refrigerante', quantidade: 1, preco: 2.00 }
      ],
      valor: 'R$ 25,90',
      status: 'analise',
      tipoPagamento: 'dinheiro'
    }
  ]);
  
  const navigate = useNavigate();
  const { showSuccess, showError } = useNotifications();

  // Função para mover pedido entre colunas
  const moverPedido = useCallback((pedidoId: string, novoStatus: Pedido['status']) => {
    setPedidos(prev => 
      prev.map(pedido => 
        pedido.id === pedidoId 
          ? { ...pedido, status: novoStatus }
          : pedido
      )
    );
  }, []);

  // Função para aceitar pedido (mover para preparo)
  const handleAceitar = useCallback((pedidoId: string) => {
    setPedidos(prev => 
      prev.map(pedido => 
        pedido.id === pedidoId 
          ? { ...pedido, status: 'preparo', timestampAceito: Date.now() }
          : pedido
      )
    );
    showSuccess('Pedido aceito e movido para preparo!');
  }, [showSuccess]);

  // Função para avançar pedido (mover para entrega)
  const handleAvançar = useCallback((pedidoId: string) => {
    setPedidos(prev => 
      prev.map(pedido => 
        pedido.id === pedidoId 
          ? { ...pedido, status: 'entrega', timestampAceito: Date.now() }
          : pedido
      )
    );
    showSuccess('Pedido movido para entrega!');
  }, [showSuccess]);

  // Função para finalizar pedido
  const handleFinalizar = useCallback((pedidoId: string) => {
    setPedidos(prev => prev.filter(pedido => pedido.id !== pedidoId));
    showSuccess('Pedido finalizado com sucesso!');
  }, [showSuccess]);

  // Função para recusar pedido
  const handleRecusar = useCallback((pedidoId: string) => {
    setPedidos(prev => prev.filter(pedido => pedido.id !== pedidoId));
    showSuccess('Pedido recusado e removido!');
  }, [showSuccess]);

  // Função para limpar a pesquisa
  const handleClearSearch = useCallback(() => {
    setSearchTerm('');
  }, []);

  // Função para lidar com a mudança na pesquisa
  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, []);

  // Função para lidar com a submissão da pesquisa
  const handleSearchSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    // Aqui você pode implementar a lógica de pesquisa
    console.log('Pesquisando por:', searchTerm);
  }, [searchTerm]);

  // Componente da barra de pesquisa
  const SearchBar = () => (
    <div className="flex items-center gap-4">
      <div className="space-y-1 min-w-0">
        <h1 className="text-lg font-bold text-gray-800 leading-tight drop-shadow-sm">Pedidos</h1>
      </div>
      
      {/* Barra de pesquisa */}
      <form onSubmit={handleSearchSubmit} className="search-bar-container">
        <div className="relative">
          <Search className="search-icon w-4 h-4" />
          <input
            type="text"
            placeholder="Buscar (nome, telefone ou id do pedido)"
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={handleClearSearch}
              className="clear-button"
              title="Limpar pesquisa"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </form>
    </div>
  );

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

  // Filtrar pedidos por status
  const pedidosAnalise = pedidos.filter(p => p.status === 'analise');
  const pedidosPreparo = pedidos.filter(p => p.status === 'preparo')
    .sort((a, b) => (b.timestampAceito || 0) - (a.timestampAceito || 0));
  const pedidosEntrega = pedidos.filter(p => p.status === 'entrega')
    .sort((a, b) => (b.timestampAceito || 0) - (a.timestampAceito || 0));

  // Calcular valores totais
  const valorTotalAnalise = pedidosAnalise.reduce((total, p) => total + parseFloat(p.valor.replace('R$ ', '').replace(',', '.')), 0);
  const valorTotalPreparo = pedidosPreparo.reduce((total, p) => total + parseFloat(p.valor.replace('R$ ', '').replace(',', '.')), 0);
  const valorTotalEntrega = pedidosEntrega.reduce((total, p) => total + parseFloat(p.valor.replace('R$ ', '').replace(',', '.')), 0);

  return (
    <ErrorBoundary>
      <div className="min-h-screen" style={{ backgroundColor: '#eeebeb' }}>
        {/* Cabeçalho da página */}
        <PageHeader
          title="Pedidos"
          leftContent={<SearchBar />}
          rightContent={
            <div className="flex items-center gap-4">
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
        {/* Conteúdo da página */}
        <div className="pt-4">
          {/* Cards de Seção - Sistema Kanban */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6">
            
            <ColunaHeader 
              titulo="Em Análise"
              quantidade={pedidosAnalise.length}
              valorTotal={`R$ ${valorTotalAnalise.toFixed(2).replace('.', ',')}`}
              cor="red"
            />

            <ColunaHeader 
              titulo="Em Preparo"
              quantidade={pedidosPreparo.length}
              valorTotal={`R$ ${valorTotalPreparo.toFixed(2).replace('.', ',')}`}
              cor="orange"
            />

            <ColunaHeader 
              titulo="Em Entrega"
              quantidade={pedidosEntrega.length}
              valorTotal={`R$ ${valorTotalEntrega.toFixed(2).replace('.', ',')}`}
              cor="green"
            />

          </div>

          {/* Cards de Pedidos - Posicionados abaixo das colunas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6">
            
            {/* Coluna: Em Análise - Cards de Pedidos */}
            <motion.div className="space-y-3" layout>
              <AnimatePresence mode="popLayout">
                {pedidosAnalise.map(pedido => (
                  <PedidoCard
                    key={pedido.id}
                    numero={pedido.numero}
                    horario={pedido.horario}
                    cliente={pedido.cliente}
                    endereco={pedido.endereco}
                    itens={pedido.itens}
                    itensDetalhados={pedido.itensDetalhados}
                    valor={pedido.valor}
                    status="analise"
                    tipoPagamento={pedido.tipoPagamento}
                    onAceitar={() => handleAceitar(pedido.id)}
                    onRecusar={() => handleRecusar(pedido.id)}
                  />
                ))}
              </AnimatePresence>
            </motion.div>

            {/* Coluna: Em Preparo - Cards de Pedidos */}
            <motion.div className="space-y-3" layout>
              <AnimatePresence mode="popLayout">
                {pedidosPreparo.map(pedido => (
                  <PedidoCard
                    key={pedido.id}
                    numero={pedido.numero}
                    horario={pedido.horario}
                    cliente={pedido.cliente}
                    endereco={pedido.endereco}
                    itens={pedido.itens}
                    itensDetalhados={pedido.itensDetalhados}
                    valor={pedido.valor}
                    status="preparo"
                    tipoPagamento={pedido.tipoPagamento}
                    onAvançar={() => handleAvançar(pedido.id)}
                    onRecusar={() => handleRecusar(pedido.id)}
                  />
                ))}
              </AnimatePresence>
            </motion.div>

            {/* Coluna: Em Entrega - Cards de Pedidos */}
            <motion.div className="space-y-3" layout>
              <AnimatePresence mode="popLayout">
                {pedidosEntrega.map(pedido => (
                  <PedidoCard
                    key={pedido.id}
                    numero={pedido.numero}
                    horario={pedido.horario}
                    cliente={pedido.cliente}
                    endereco={pedido.endereco}
                    itens={pedido.itens}
                    itensDetalhados={pedido.itensDetalhados}
                    valor={pedido.valor}
                    status="entrega"
                    tipoPagamento={pedido.tipoPagamento}
                    onFinalizar={() => handleFinalizar(pedido.id)}
                    onRecusar={() => handleRecusar(pedido.id)}
                  />
                ))}
              </AnimatePresence>
            </motion.div>

          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
}