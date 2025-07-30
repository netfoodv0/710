import React from 'react';
import { Check, ArrowRight, CheckCircle, X } from 'lucide-react';
import { Button } from '../ui/Button';
import { StatusPedido } from '../../../types/pedidos';

interface AcoesStatusPedidoProps {
  status: StatusPedido;
  onAceitar?: () => void;
  onAvançar?: () => void;
  onFinalizar?: () => void;
  onCancelar?: () => void;
  loading?: boolean;
  disabled?: boolean;
}

export function AcoesStatusPedido({ 
  status, 
  onAceitar, 
  onAvançar, 
  onFinalizar, 
  onCancelar,
  loading = false,
  disabled = false 
}: AcoesStatusPedidoProps) {
  const getAcoesDisponiveis = () => {
    switch (status) {
      case 'novo':
        return [
          {
            label: 'Aceitar',
            variant: 'primary' as const,
            icon: <Check className="w-4 h-4" />,
            onClick: onAceitar,
            color: 'bg-green-600 hover:bg-green-700'
          },
          {
            label: 'Cancelar',
            variant: 'danger' as const,
            icon: <X className="w-4 h-4" />,
            onClick: onCancelar,
            color: 'bg-red-600 hover:bg-red-700'
          }
        ];
      
      case 'confirmado':
        return [
          {
            label: 'Preparar',
            variant: 'primary' as const,
            icon: <ArrowRight className="w-4 h-4" />,
            onClick: onAvançar,
            color: 'bg-blue-600 hover:bg-blue-700'
          },
          {
            label: 'Cancelar',
            variant: 'danger' as const,
            icon: <X className="w-4 h-4" />,
            onClick: onCancelar,
            color: 'bg-red-600 hover:bg-red-700'
          }
        ];
      
      case 'preparando':
        return [
          {
            label: 'Pronto',
            variant: 'primary' as const,
            icon: <CheckCircle className="w-4 h-4" />,
            onClick: onAvançar,
            color: 'bg-purple-600 hover:bg-purple-700'
          }
        ];
      
      case 'pronto':
        return [
          {
            label: 'Saiu p/ Entrega',
            variant: 'primary' as const,
            icon: <ArrowRight className="w-4 h-4" />,
            onClick: onAvançar,
            color: 'bg-green-600 hover:bg-green-700'
          }
        ];
      
      case 'saiu_entrega':
        return [
          {
            label: 'Entregue',
            variant: 'primary' as const,
            icon: <CheckCircle className="w-4 h-4" />,
            onClick: onFinalizar,
            color: 'bg-green-600 hover:bg-green-700'
          }
        ];
      
      default:
        return [];
    }
  };

  const acoes = getAcoesDisponiveis();

  if (acoes.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-gray-100">
      {acoes.map((acao, index) => (
        <Button
          key={index}
          variant={acao.variant}
          size="sm"
          onClick={acao.onClick}
          disabled={disabled || loading}
          loading={loading}
          icon={acao.icon}
          className={`${acao.color} text-white`}
        >
          {acao.label}
        </Button>
      ))}
    </div>
  );
} 