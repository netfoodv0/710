import React from 'react';
import { Truck, Utensils, ShoppingBag } from 'lucide-react';

interface FormaPedida {
  nome: string;
  valor: number;
  icone: React.ReactNode;
}

interface FormasPedidasProps {
  formas: FormaPedida[];
}

export const FormasPedidas: React.FC<FormasPedidasProps> = ({ formas }) => {
  const formasDefault: FormaPedida[] = [
    {
      nome: 'Delivery',
      valor: 0,
      icone: <Truck className="w-5 h-5" />
    },
    {
      nome: 'Mesas',
      valor: 0,
      icone: <Utensils className="w-5 h-5" />
    },
    {
      nome: 'Retirada',
      valor: 0,
      icone: <ShoppingBag className="w-5 h-5" />
    }
  ];

  const formasExibir = formas.length > 0 ? formas : formasDefault;

  return (
    <div className="space-y-2">
      {formasExibir.map((forma, index) => (
        <div key={index} className="flex items-center justify-between p-2 bg-white rounded-lg border" style={{ borderColor: '#cfd1d3' }}>
          <div className="flex items-center space-x-3">
            <div className="w-[40px] h-[40px] bg-gray-100 rounded-full flex items-center justify-center">
              <div className="text-gray-600">
                {forma.icone}
              </div>
            </div>
            <div>
              <p className="font-medium text-gray-700 text-xs">{forma.nome}</p>
              <p className="text-xs text-gray-500">Forma de pedido</p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-lg font-bold text-gray-900">{forma.valor}</span>
            <p className="text-xs text-gray-500">pedidos</p>
          </div>
        </div>
      ))}
    </div>
  );
};
