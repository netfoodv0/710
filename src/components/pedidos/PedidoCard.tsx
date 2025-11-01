import React, { useState, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CalendarIcon } from './CalendarIcon';
import { BorderLine } from './BorderLine';
import { PrinterIcon } from './PrinterIcon';
import { DollarIcon } from './DollarIcon';
import { PixIcon } from './PixIcon';
import { CreditCardIcon } from './CreditCardIcon';
import { Adicional, ItemPedido } from '../../types/global/pedidos';

interface PedidoCardProps {
  numero: string;
  horario: string;
  cliente: string;
  endereco?: string;
  itens: string;
  itensDetalhados?: ItemPedido[];
  valor: string;
  status: 'analise' | 'preparo' | 'entrega';
  tipoPagamento: 'dinheiro' | 'pix' | 'cartao';
  onAceitar?: () => void;
  onAvançar?: () => void;
  onFinalizar?: () => void;
  onRecusar?: () => void;
}

export const PedidoCard = memo(({ 
  numero, 
  horario, 
  cliente, 
  endereco,
  itens, 
  itensDetalhados,
  valor, 
  status,
  tipoPagamento,
  onAceitar,
  onAvançar,
  onFinalizar,
  onRecusar
}: PedidoCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    console.log('Toggle clicked! Current state:', isExpanded);
    setIsExpanded(!isExpanded);
  };

  const formatarPreco = (preco: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(preco);
  };

  const renderBotoes = () => {
    switch (status) {
      case 'analise':
        return (
          <div className="flex gap-2">
            <button 
              onClick={onRecusar}
              className="px-3 py-1 text-xs font-medium text-red-600 bg-transparent rounded-full hover:bg-red-50 transition-colors border" 
              style={{ borderColor: 'rgb(207 209 211)' }}
            >
              Recusar
            </button>
            <button 
              onClick={onAceitar}
              className="px-3 py-1 text-xs font-medium text-white bg-green-600 rounded-full hover:bg-green-700 transition-colors border" 
              style={{ borderColor: 'rgb(207 209 211)' }}
            >
              Aceitar
            </button>
          </div>
        );
      
      case 'preparo':
        return (
          <div className="flex gap-2">
            <button 
              onClick={onRecusar}
              className="px-3 py-1 text-xs font-medium text-red-600 bg-transparent rounded-full hover:bg-red-50 transition-colors border" 
              style={{ borderColor: 'rgb(207 209 211)' }}
            >
              Recusar
            </button>
            <button 
              onClick={() => {
                console.log('🔄 Botão Avançar clicado para pedido:', numero);
                onAvançar?.();
              }}
              className="px-3 py-1 text-xs font-medium text-white bg-green-600 rounded-full hover:bg-green-700 transition-colors border" 
              style={{ borderColor: 'rgb(207 209 211)' }}
            >
              Avançar
            </button>
          </div>
        );
      
      case 'entrega':
        return (
          <div className="flex gap-2">
            <button 
              onClick={onRecusar}
              className="px-3 py-1 text-xs font-medium text-red-600 bg-transparent rounded-full hover:bg-red-50 transition-colors border" 
              style={{ borderColor: 'rgb(207 209 211)' }}
            >
              Recusar
            </button>
            <button 
              onClick={onFinalizar}
              className="px-3 py-1 text-xs font-medium text-white bg-green-600 rounded-full hover:bg-green-700 transition-colors border" 
              style={{ borderColor: 'rgb(207 209 211)' }}
            >
              Finalizar
            </button>
          </div>
        );
      
      default:
        return null;
    }
  };

  const renderIconePagamento = () => {
    switch (tipoPagamento) {
      case 'dinheiro':
        return <DollarIcon size={16} />;
      case 'pix':
        return <PixIcon size={16} />;
      case 'cartao':
        return <CreditCardIcon size={16} />;
      default:
        return <DollarIcon size={16} />;
    }
  };

  return (
    <motion.div 
      className="bg-white rounded-lg border relative z-10 overflow-hidden" 
      style={{ borderColor: '#cfd1d3' }}
      layout
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{
        type: "spring",
        damping: 20,
        stiffness: 300,
        duration: 0.3
      }}
    >
      {/* Conteúdo principal do card */}
      <motion.div 
        className="p-3"
        layout
      >
        <div className="flex justify-between items-start mb-2">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-900">{numero}</span>
            <span className="text-[11px] text-gray-600">{horario}</span>
          </div>
          <div className="flex items-center gap-2">
            {/* Ícone clicável para expandir */}
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="cursor-pointer group"
              onClick={toggleExpanded}
              title="Clique para ver detalhes do pedido"
            >
              <BorderLine 
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
                  isExpanded 
                    ? 'bg-blue-100 border-blue-400' 
                    : 'bg-white group-hover:bg-blue-50 group-hover:border-blue-300'
                }`}
              >
                <CalendarIcon size={20} />
              </BorderLine>
            </motion.div>
            
            <BorderLine className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <PrinterIcon size={20} />
            </BorderLine>
            
          </div>
        </div>
        <div className="text-sm text-gray-700 mb-2">{cliente}</div>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            {renderIconePagamento()}
            <span className="text-sm text-gray-900">{valor}</span>
          </div>
          {renderBotoes()}
        </div>
      </motion.div>

      {/* Seção expandida com detalhes */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              type: "spring",
              damping: 25,
              stiffness: 300,
              duration: 0.4
            }}
            className="border-t"
            style={{ borderColor: '#cfd1d3' }}
          >
            <div className="p-3 bg-gray-50">
              <div className="space-y-4">
                {/* Cabeçalho da nota fiscal */}
                <div className="text-center border-b pb-2" style={{ borderColor: '#cfd1d3' }}>
                  <h4 className="text-xs font-bold text-gray-800 uppercase tracking-wide">Detalhes do Pedido</h4>
                </div>

                {/* Endereço do usuário */}
                {endereco && (
                  <div className="space-y-2">
                    <span className="text-xs font-medium text-gray-700 block">Endereço de Entrega:</span>
                    <span className="text-xs text-gray-900 block">{endereco}</span>
                  </div>
                )}

                {/* Itens do pedido com valores individuais e adicionais */}
                <div className="space-y-2">
                  <span className="text-xs font-medium text-gray-700 block">Itens do Pedido:</span>
                  {itensDetalhados ? (
                    <div className="space-y-2">
                      {itensDetalhados.map((item, index) => (
                        <div key={index} className="border-b border-gray-100 pb-2 last:border-b-0">
                          <div className="flex justify-between items-start text-xs">
                            <div className="flex-1">
                              <span className="text-gray-900 font-medium">
                                {item.quantidade}x {item.nome}
                              </span>
                              {item.adicionais && item.adicionais.length > 0 && (
                                <div className="mt-1 ml-3">
                                  {item.adicionais.map((adicional, idx) => (
                                    <div key={idx} className="flex justify-between items-center text-xs">
                                      <span className="text-gray-600">
                                        {adicional.quantidade}x {adicional.nome}
                                      </span>
                                      <span className="text-gray-500 font-medium">
                                        {formatarPreco(adicional.preco * adicional.quantidade)}
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                            <span className="text-gray-700 font-medium ml-2">
                              {formatarPreco(item.preco * item.quantidade)}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <span className="text-xs text-gray-900 block">{itens}</span>
                  )}
                </div>

                {/* Observações */}
                <div className="space-y-2">
                  <span className="text-xs font-medium text-gray-700 block">Observações:</span>
                  <span className="text-xs text-gray-600 italic block">Nenhuma observação</span>
                </div>

                {/* Informações de pagamento e status */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-gray-700">Método de Pagamento:</span>
                    <div className="flex items-center gap-2">
                      {renderIconePagamento()}
                      <span className="text-xs text-gray-900 capitalize">
                        {tipoPagamento === 'cartao' ? 'Cartão' : tipoPagamento === 'pix' ? 'PIX' : 'Dinheiro'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-gray-700">Valor Total:</span>
                    <span className="text-xs text-gray-900">{valor}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-gray-700">Status Atual:</span>
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                      status === 'analise' ? 'bg-red-100 text-red-800' :
                      status === 'preparo' ? 'bg-orange-100 text-orange-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {status === 'analise' ? 'Em Análise' :
                       status === 'preparo' ? 'Em Preparo' :
                       'Em Entrega'}
                    </span>
                  </div>
                </div>

                {/* Rodapé da nota fiscal */}
                <div className="text-center border-t pt-2" style={{ borderColor: '#cfd1d3' }}>
                  <span className="text-xs text-gray-500">Pedido processado automaticamente</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
});
