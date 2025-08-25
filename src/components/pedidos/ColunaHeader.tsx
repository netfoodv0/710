import React from 'react';

interface ColunaHeaderProps {
  titulo: string;
  quantidade: number;
  valorTotal: string;
  cor: 'red' | 'orange' | 'green';
}

export function ColunaHeader({ titulo, quantidade, valorTotal, cor }: ColunaHeaderProps) {
  const getCorClasses = () => {
    switch (cor) {
      case 'red':
        return {
          badge: 'bg-[#fb6d2c]',
          titulo: 'text-gray-800',
          valor: 'text-gray-700'
        };
      case 'orange':
        return {
          badge: 'bg-[#fc9e2e]',
          titulo: 'text-gray-800',
          valor: 'text-gray-700'
        };
      case 'green':
        return {
          badge: 'bg-[#279348]',
          titulo: 'text-gray-800',
          valor: 'text-gray-700'
        };
      default:
        return {
          badge: 'bg-gray-500',
          titulo: 'text-gray-800',
          valor: 'text-gray-700'
        };
    }
  };

  const cores = getCorClasses();

  return (
    <div className="bg-white border h-[62px] rounded-t-lg mb-3" style={{ borderColor: 'hsl(210deg 4.35% 81.96%)' }}>
      <div className="bg-white px-3 py-2 h-full relative rounded-t-lg">
        <div className={`${cores.badge} text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold absolute top-2 right-2`}>
          {quantidade}
        </div>
        <h3 className={`text-base font-semibold ${cores.titulo} mb-1`}>{titulo}</h3>
        <div className="flex items-center gap-2">
          <span className={`text-sm font-medium ${cores.valor}`}>{valorTotal}</span>
        </div>
      </div>
    </div>
  );
}

