import React from 'react';
import { Clock, OrderIcon } from 'lucide-react';

interface PedidosAndamentoProps {
  pedidosEmAndamento?: number;
  pedidos?: Array<{
    id: string;
    numero: string;
    cliente: string;
    status: string;
    total: number;
  }>;
}

// Função para gerar iniciais do nome do cliente
const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

// Função para gerar cor sutil baseada no nome
const getAvatarColor = (name: string): string => {
  const colors = [
    'bg-gray-100 text-gray-700',
    'bg-blue-50 text-blue-700',
    'bg-green-50 text-green-700',
    'bg-purple-50 text-purple-700',
    'bg-orange-50 text-orange-700',
    'bg-teal-50 text-teal-700'
  ];
  
  const index = name.charCodeAt(0) % colors.length;
  return colors[index];
};

export const PedidosAndamento: React.FC<PedidosAndamentoProps> = ({ 
  pedidosEmAndamento = 0, 
  pedidos = [] 
}) => {
  const pedidosDefault = [
    {
      id: '1',
      numero: '001',
      cliente: 'João Silva',
      status: 'Em preparo',
      total: 45.90
    },
    {
      id: '2',
      numero: '002',
      cliente: 'Maria Santos',
      status: 'Aguardando',
      total: 32.50
    },
    {
      id: '3',
      numero: '003',
      cliente: 'Pedro Costa',
      status: 'Pronto',
      total: 28.80
    },
    {
      id: '4',
      numero: '004',
      cliente: 'Ana Oliveira',
      status: 'Em preparo',
      total: 52.30
    },
    {
      id: '5',
      numero: '005',
      cliente: 'Carlos Lima',
      status: 'Aguardando',
      total: 38.90
    },
    {
      id: '6',
      numero: '006',
      cliente: 'Fernanda Costa',
      status: 'Pronto',
      total: 41.20
    },
    {
      id: '7',
      numero: '007',
      cliente: 'Roberto Alves',
      status: 'Em preparo',
      total: 67.80
    },
    {
      id: '8',
      numero: '008',
      cliente: 'Patrícia Santos',
      status: 'Aguardando',
      total: 29.50
    },
    {
      id: '9',
      numero: '009',
      cliente: 'Lucas Mendes',
      status: 'Pronto',
      total: 44.20
    },
    {
      id: '10',
      numero: '010',
      cliente: 'Juliana Costa',
      status: 'Em preparo',
      total: 58.90
    },
    {
      id: '11',
      numero: '011',
      cliente: 'Marcelo Silva',
      status: 'Aguardando',
      total: 35.60
    },
    {
      id: '12',
      numero: '012',
      cliente: 'Camila Lima',
      status: 'Pronto',
      total: 49.30
    }
  ];

  const pedidosExibir = pedidos && pedidos.length > 0 ? pedidos : pedidosDefault;

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 space-y-2 overflow-y-auto max-h-[400px] hide-scrollbar">
        {pedidosExibir.map((pedido) => (
          <div key={pedido.id} className="flex items-center justify-between p-2 bg-white rounded-lg border" style={{ borderColor: '#cfd1d3' }}>
            <div className="flex items-center space-x-3">
              <div className={`w-[40px] h-[40px] rounded-full flex items-center justify-center text-sm font-semibold ${getAvatarColor(pedido.cliente)}`}>
                {getInitials(pedido.cliente)}
              </div>
              <div>
                <p className="font-medium text-gray-700 text-xs">{pedido.cliente}</p>
                <p className="text-xs text-gray-500">{pedido.status}</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-lg font-bold text-gray-900">
                R$ {pedido.total.toFixed(2).replace('.', ',')}
              </span>
              <p className="text-xs text-gray-500">total</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-auto pt-2">
        <a 
          href="/pedidos" 
          className="inline-flex items-center justify-center space-x-2 w-full px-3 py-2 bg-purple-600 text-white text-sm font-medium rounded-[100px] hover:bg-purple-700 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF">
            <path d="m670-140 160-100-160-100v200ZM240-600h480v-80H240v80ZM720-40q-83 0-141.5-58.5T520-240q0-83 58.5-141.5T720-440q83 0 141.5 58.5T920-240q0 83-58.5 141.5T720-40ZM120-80v-680q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v267q-19-9-39-15t-41-9v-243H200v562h243q5 31 15.5 59T486-86l-6 6-60-60-60 60-60-60-60 60-60-60-60 60Zm120-200h203q3-21 9-41t15-39H240v80Zm0-160h284q38-37 88.5-58.5T720-520H240v80Zm-40 242v-562 562Z"/>
          </svg>
          <span>Acessar painel</span>
        </a>
      </div>
    </div>
  );
};
