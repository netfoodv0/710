import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ColunaHeader, PedidoCard } from './';
import { Pedido } from '../../types/global/pedidos';

interface PedidosColumnsProps {
  pedidos: Pedido[];
  onAceitar: (pedidoId: string) => void;
  onAvançar: (pedidoId: string) => void;
  onFinalizar: (pedidoId: string) => void;
  onRecusar: (pedidoId: string) => void;
}

export const PedidosColumns: React.FC<PedidosColumnsProps> = ({
  pedidos,
  onAceitar,
  onAvançar,
  onFinalizar,
  onRecusar
}) => {
  // Mapear status do Firebase para status da interface
  const mapearStatusParaInterface = (status: string) => {
    switch (status) {
      case 'pendente':
        return 'analise';
      case 'confirmado':
        return 'preparo';
      case 'preparando':
        return 'preparo'; // Mantém em preparo
      case 'pronto':
        return 'entrega';
      case 'saiu_entrega':
        return 'entrega';
      case 'entregue':
        return 'entregue';
      case 'cancelado':
        return 'cancelado';
      default:
        return 'analise';
    }
  };

  // Mapear dados do Firebase para formato do PedidoCard
  const mapearPedidoParaCard = (pedido: Pedido) => {
    console.log('🔍 Mapeando pedido:', pedido.id, 'dataHora:', pedido.dataHora);
    
    // Formatar data/hora
    const dataHora = new Date(pedido.dataHora);
    const horario = dataHora.toLocaleTimeString('pt-BR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
    
    // Formatar endereço
    const endereco = pedido.enderecoEntrega ? 
      `${pedido.enderecoEntrega.rua}, ${pedido.enderecoEntrega.numero}` : 
      'Retirada no balcão';
    
    // Formatar itens
    const itens = pedido.itens.map(item => 
      `${item.nome} x${item.quantidade}`
    ).join(', ');
    
    // Formatar valor
    const valor = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(pedido.total);
    
    // Mapear tipo de pagamento
    const tipoPagamento = pedido.pagamento.metodo === 'dinheiro' ? 'dinheiro' :
                         pedido.pagamento.metodo === 'pix' ? 'pix' : 'cartao';
    
    return {
      ...pedido,
      horario,
      cliente: pedido.cliente.nome,
      endereco,
      itens,
      valor,
      tipoPagamento
    };
  };

  // Debug: verificar pedidos recebidos
  console.log('🔍 PedidosColumns - Pedidos recebidos:', pedidos.length);
  console.log('🔍 PedidosColumns - Dados dos pedidos:', pedidos);

  // Filtrar pedidos por status (usando mapeamento)
  const pedidosAnalise = pedidos
    .filter(p => {
      const statusMapeado = mapearStatusParaInterface(p.status);
      console.log(`🔍 Pedido ${p.id} - Status original: ${p.status}, Mapeado: ${statusMapeado}`);
      return statusMapeado === 'analise';
    })
    .map(mapearPedidoParaCard);
  const pedidosPreparo = pedidos
    .filter(p => mapearStatusParaInterface(p.status) === 'preparo')
    .map(mapearPedidoParaCard);
  const pedidosEntrega = pedidos
    .filter(p => mapearStatusParaInterface(p.status) === 'entrega')
    .map(mapearPedidoParaCard);

  console.log('🔍 PedidosColumns - Pedidos em análise:', pedidosAnalise.length);
  console.log('🔍 PedidosColumns - Pedidos em preparo:', pedidosPreparo.length);
  console.log('🔍 PedidosColumns - Pedidos em entrega:', pedidosEntrega.length);

  // Calcular valores totais
  const valorTotalAnalise = pedidosAnalise.reduce((total, p) => total + p.total, 0);
  const valorTotalPreparo = pedidosPreparo.reduce((total, p) => total + p.total, 0);
  const valorTotalEntrega = pedidosEntrega.reduce((total, p) => total + p.total, 0);

  return (
    <>
      {/* Cards de Sessão - Posicionados abaixo do cabeçalho */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6 mt-4">
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
        <div className="space-y-3">
          {pedidosAnalise.map(pedido => (
            <motion.div key={pedido.id} layout>
              <PedidoCard
                numero={pedido.numero}
                horario={pedido.horario}
                cliente={pedido.cliente}
                endereco={pedido.endereco}
                itens={pedido.itens}
                itensDetalhados={pedido.itensDetalhados}
                valor={pedido.valor}
                status="analise"
                tipoPagamento={pedido.tipoPagamento}
                onAceitar={() => onAceitar(pedido.id)}
                onRecusar={() => onRecusar(pedido.id)}
              />
            </motion.div>
          ))}
        </div>

        {/* Coluna: Em Preparo - Cards de Pedidos */}
        <div className="space-y-3">
          {pedidosPreparo.map(pedido => (
            <motion.div key={pedido.id} layout>
              <PedidoCard
                numero={pedido.numero}
                horario={pedido.horario}
                cliente={pedido.cliente}
                endereco={pedido.endereco}
                itens={pedido.itens}
                itensDetalhados={pedido.itensDetalhados}
                valor={pedido.valor}
                status="preparo"
                tipoPagamento={pedido.tipoPagamento}
                onAvançar={() => onAvançar(pedido.id)}
                onRecusar={() => onRecusar(pedido.id)}
              />
            </motion.div>
          ))}
        </div>

        {/* Coluna: Em Entrega - Cards de Pedidos */}
        <div className="space-y-3">
          {pedidosEntrega.map(pedido => (
            <motion.div key={pedido.id} layout>
              <PedidoCard
                numero={pedido.numero}
                horario={pedido.horario}
                cliente={pedido.cliente}
                endereco={pedido.endereco}
                itens={pedido.itens}
                itensDetalhados={pedido.itensDetalhados}
                valor={pedido.valor}
                status="entrega"
                tipoPagamento={pedido.tipoPagamento}
                onFinalizar={() => onFinalizar(pedido.id)}
                onRecusar={() => onRecusar(pedido.id)}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
};
