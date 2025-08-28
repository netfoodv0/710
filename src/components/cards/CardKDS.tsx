import React from 'react';
import { Pedido } from '../../types';
import { CheckIcon, RefreshIcon } from '../icons';
import { useDraggable } from '@dnd-kit/core';

interface CardKDSProps {
  pedido: Pedido;
  variant?: 'default' | 'compact';
}

export function CardKDS({ 
  pedido,
  variant = 'default'
}: CardKDSProps) {
  const [itemStatus, setItemStatus] = React.useState<{[key: string]: 'pendente' | 'preparando' | 'pronto'}>({});
  const [currentTime, setCurrentTime] = React.useState(Date.now());

  // Atualiza o tempo a cada minuto
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 60000); // 60000ms = 1 minuto

    return () => clearInterval(interval);
  }, []);

  // Configuração do drag and drop
  const {attributes, listeners, setNodeRef, transform, isDragging} = useDraggable({
    id: `pedido-${pedido.id}`,
    data: {
      pedido,
      itemStatus
    }
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    zIndex: isDragging ? 1000 : 'auto'
  } : undefined;

  return (
    <div 
      ref={setNodeRef}
      className={`bg-white rounded-b-lg border border-gray-200 w-[240px] ${
        variant === 'compact' ? 'p-3' : 'p-5'
      } ${isDragging ? 'shadow-2xl' : ''}`}
      style={{
        '--a': '90deg',
        '--s': '12px',
        mask: 'conic-gradient(from calc(var(--a)/-2) at bottom, #0000, #000 1deg var(--a), #0000 calc(var(--a) + 1deg)) 50%/var(--s)',
        WebkitMask: 'conic-gradient(from calc(var(--a)/-2) at bottom, #0000, #000 1deg var(--a), #0000 calc(var(--a) + 1deg)) 50%/var(--s)',
        borderRadius: '4px 4px 8px 8px',
        ...style
      } as React.CSSProperties}
    >
      {/* Cabeçalho do Card - Área arrastável */}
      <div 
        {...listeners}
        {...attributes}
        className="flex justify-between items-start mb-2 cursor-grab hover:cursor-grabbing"
      >
        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium text-gray-900">#{pedido.numero}</span>
          <span className="text-sm text-gray-700">{pedido.cliente}</span>
        </div>
        <span className="text-[11px] text-gray-600">
          {pedido.timestampAceito 
            ? `${Math.floor((currentTime - pedido.timestampAceito) / 60000)}min`
            : 'Agora'
          }
        </span>
      </div>
      
      {/* Linha divisória */}
      <div className="border-b border-gray-200 mb-2 -mx-3"></div>

      {/* Botões de Ação em Massa */}
      <div className="flex gap-2 mb-3 justify-center">
        <button 
          onClick={() => {
            const newStatus = {} as {[key: string]: 'pendente' | 'preparando' | 'pronto'};
            pedido.itensDetalhados?.forEach(item => {
              newStatus[item.nome] = 'preparando';
            });
            setItemStatus(newStatus);
          }}
          disabled={!pedido.itensDetalhados?.some(item => itemStatus[item.nome] === 'pendente')}
          className={`px-2 h-8 rounded-[100px] text-xs font-medium transition-colors whitespace-nowrap ring-1 ring-[#cfd1d3] ${
            pedido.itensDetalhados?.some(item => itemStatus[item.nome] === 'pendente')
              ? 'bg-white text-blue-600 hover:bg-blue-50 cursor-pointer'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          Preparar Todos
        </button>
        <button 
          onClick={() => {
            const newStatus = {} as {[key: string]: 'pendente' | 'preparando' | 'pronto'};
            pedido.itensDetalhados?.forEach(item => {
              newStatus[item.nome] = 'pronto';
            });
            setItemStatus(newStatus);
          }}
          className="px-2 h-8 bg-white text-green-600 rounded-[100px] text-xs font-medium hover:bg-green-50 transition-colors cursor-pointer whitespace-nowrap ring-1 ring-[#cfd1d3]"
        >
          Finalizar Todos
        </button>
      </div>

      {/* Itens do Pedido */}
      <div className="space-y-1.5">
        {pedido.itensDetalhados?.map((item, index) => (
                      <div key={index} className={`group relative rounded-lg p-2.5 border border-gray-200 hover:border-gray-300 transition-colors cursor-pointer min-h-[60px] ${
            itemStatus[item.nome] === 'preparando' 
              ? 'bg-yellow-100 hover:bg-yellow-200' 
              : itemStatus[item.nome] === 'pronto'
              ? 'bg-green-100 hover:bg-green-200'
              : 'bg-gray-50 hover:bg-gray-100'
          }`}>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <span className="text-gray-900 font-medium">
                  {item.quantidade}x {item.nome}
                </span>
                {/* Adicionais do item */}
                {item.adicionais && item.adicionais.length > 0 && (
                  <div className="mt-0.5 ml-2.5">
                    {item.adicionais.map((adicional, idx) => (
                      <div key={idx} className="text-xs text-gray-600">
                        {adicional.quantidade}x {adicional.nome}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2">
                {/* Ícone de refresh visível apenas quando estiver preparando */}
                {itemStatus[item.nome] === 'preparando' && (
                  <button
                    onClick={() => setItemStatus(prev => ({
                      ...prev, 
                      [item.nome]: 'pendente'
                    }))}
                    className="opacity-0 group-hover:opacity-100 transition-all cursor-pointer group"
                  >
                    <RefreshIcon />
                  </button>
                )}
                                  <button 
                    onClick={() => setItemStatus(prev => {
                      const currentStatus = prev[item.nome] || 'pendente';
                      const nextStatus = currentStatus === 'pendente' ? 'preparando' : 
                                       currentStatus === 'preparando' ? 'pronto' : 'preparando';
                      return {...prev, [item.nome]: nextStatus};
                    })}
                    className="px-4 h-8 bg-green-600 text-white rounded-[100px] text-xs font-medium hover:bg-green-700 transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
                  >
                    {itemStatus[item.nome] === 'preparando' ? 'Finalizar' : 
                     itemStatus[item.nome] === 'pronto' ? 'Voltar' : 'Preparar'}
                  </button>
              </div>
            </div>
            
            {/* Status do item */}
            <div className="absolute bottom-1.5 right-1.5">
              <span className={`text-xs font-medium italic ${
                itemStatus[item.nome] === 'preparando' 
                  ? 'text-yellow-700' 
                  : itemStatus[item.nome] === 'pronto'
                  ? 'text-green-700'
                  : 'text-gray-600'
              }`}>
                {itemStatus[item.nome] === 'preparando' ? 'Preparando' : 
                 itemStatus[item.nome] === 'pronto' ? 'Pronto' : 'Pendente'}
              </span>
            </div>
            

          </div>
        ))}
      </div>


    </div>
  );
}
