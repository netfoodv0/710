import React from 'react';
import { Calendar, DollarSign, Percent, Truck, Gift } from 'lucide-react';
import { Cupom } from '../../types/cupons';
import { Badge } from '../ui/badge';

interface CupomCardProps {
  cupom: Cupom;
  onEdit: (cupom: Cupom) => void;
  onToggleStatus: (id: string) => void;
}

export function CupomCard({ cupom, onEdit, onToggleStatus }: CupomCardProps) {
  const formatarData = (data: Date): string => {
    return data.toLocaleDateString('pt-BR');
  };

  const formatarValor = (tipo: string, valor: number): string => {
    switch (tipo) {
      case 'desconto_percentual':
        return `${valor}%`;
      case 'desconto_fixo':
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor);
      case 'frete_gratis':
        return 'Grátis';
      case 'brinde':
        return `Valor: ${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor)}`;
      default:
        return valor.toString();
    }
  };

  const getTipoLabel = (tipo: string): string => {
    switch (tipo) {
      case 'desconto_percentual':
        return 'Desconto Percentual';
      case 'desconto_fixo':
        return 'Desconto Fixo';
      case 'frete_gratis':
        return 'Frete Grátis';
      case 'brinde':
        return 'Brinde';
      default:
        return tipo;
    }
  };

  const getTipoIcon = (tipo: string) => {
    switch (tipo) {
      case 'desconto_percentual':
        return <Percent className="w-4 h-4" />;
      case 'desconto_fixo':
        return <DollarSign className="w-4 h-4" />;
      case 'frete_gratis':
        return <Truck className="w-4 h-4" />;
      case 'brinde':
        return <Gift className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="font-semibold text-lg">{cupom.codigo}</h3>
            <Badge variant={cupom.ativo ? "default" : "secondary"}>
              {cupom.ativo ? 'Ativo' : 'Inativo'}
            </Badge>
            <div className="flex items-center gap-1 text-sm text-gray-600">
              {getTipoIcon(cupom.tipo)}
              {formatarValor(cupom.tipo, cupom.valor)}
            </div>
          </div>
          
          <p className="text-gray-700 mb-2">{cupom.descricao}</p>
          
          <div className="mb-2">
            <span className="text-sm text-gray-600">
              Tipo: {getTipoLabel(cupom.tipo)}
            </span>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {formatarData(cupom.dataInicio)} - {formatarData(cupom.dataFim)}
            </div>
            {cupom.valorMinimoPedido && (
              <span>
                Pedido mín: {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(cupom.valorMinimoPedido)}
              </span>
            )}
            <span>
              Usos: {cupom.usosAtuais}{cupom.limiteUsos ? `/${cupom.limiteUsos}` : ''}
            </span>
          </div>
        </div>
        
        <div className="flex gap-2">
          <button
            className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            onClick={() => onEdit(cupom)}
          >
            Editar
          </button>
          <button
            className={`inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors ${
              cupom.ativo 
                ? 'text-white bg-red-600 hover:bg-red-700 focus:ring-red-500' 
                : 'text-white bg-green-600 hover:bg-green-700 focus:ring-green-500'
            }`}
            onClick={() => onToggleStatus(cupom.id)}
          >
            {cupom.ativo ? 'Desativar' : 'Ativar'}
          </button>
        </div>
      </div>
    </div>
  );
}