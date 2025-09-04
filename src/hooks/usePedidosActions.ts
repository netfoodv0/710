import { useCallback, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { firebasePedidoService } from '../services/firebasePedidoService';
import { gerarPedidoFicticio } from '../utils/pedidoUtils';
import { useNotifications } from './useNotifications';
import { Pedido, PedidosState, PedidosActions } from '../types/global/pedidos';
import { pedidosMock } from '../data/pedidosMock';

export const usePedidosActions = (): [PedidosState, PedidosActions] => {
  const [pedidos, setPedidos] = useState<Pedido[]>(pedidosMock);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  
  const navigate = useNavigate();
  const { showSuccess, showError } = useNotifications();

  // Simular carregamento dos pedidos com delay otimizado
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, []);

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

  // Função para criar pedido fictício
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

  const state: PedidosState = {
    pedidos,
    loading,
    searchTerm,
    isCreating
  };

  const actions: PedidosActions = {
    moverPedido,
    handleAceitar,
    handleAvançar,
    handleFinalizar,
    handleRecusar,
    handleSearchChange,
    handleClearSearch,
    handleSearchSubmit,
    handleCriarPedidoFicticio
  };

  return [state, actions];
};
