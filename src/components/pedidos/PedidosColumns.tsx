import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ColunaHeader, PedidoCard } from './';
import { Pedido } from '../../types/pedidos';

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
    <>
      {/* Cards de Sessão - Posicionados abaixo do cabeçalho */}
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
