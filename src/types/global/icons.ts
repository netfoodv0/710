


// Tipos relacionados a ícones

export type FormaPedidaIconType = 
  | 'delivery'
  | 'pickup'
  | 'dine_in'
  | 'whatsapp'
  | 'telefone'
  | 'presencial'
  | 'online'
  | 'app';

export interface IconConfig {
  name: string;
  component: React.ComponentType<any>;
  size?: number;
  color?: string;
  className?: string;
}

export interface FormaPedidaIcon {
  tipo: FormaPedidaIconType;
  nome: string;
  icone: React.ComponentType<any>;
  cor: string;
  descricao?: string;
}

export const useIcons = () => {
  const formasPedidaIcons: FormaPedidaIcon[] = [
    {
      tipo: 'delivery',
      nome: 'Delivery',
      icone: () => null, // Será substituído pelo componente real
      cor: '#10B981',
      descricao: 'Entrega em domicílio'
    },
    {
      tipo: 'pickup',
      nome: 'Retirada',
      icone: () => null,
      cor: '#F59E0B',
      descricao: 'Retirada no local'
    },
    {
      tipo: 'dine_in',
      nome: 'Mesa',
      icone: () => null,
      cor: '#8B5CF6',
      descricao: 'Consumo no local'
    },
    {
      tipo: 'whatsapp',
      nome: 'WhatsApp',
      icone: () => null,
      cor: '#25D366',
      descricao: 'Pedido via WhatsApp'
    },
    {
      tipo: 'telefone',
      nome: 'Telefone',
      icone: () => null,
      cor: '#6B7280',
      descricao: 'Pedido via telefone'
    },
    {
      tipo: 'presencial',
      nome: 'Presencial',
      icone: () => null,
      cor: '#EF4444',
      descricao: 'Pedido presencial'
    },
    {
      tipo: 'online',
      nome: 'Online',
      icone: () => null,
      cor: '#3B82F6',
      descricao: 'Pedido online'
    },
    {
      tipo: 'app',
      nome: 'App',
      icone: () => null,
      cor: '#EC4899',
      descricao: 'Pedido via aplicativo'
    }
  ];

  return {
    formasPedidaIcons,
    getIconByType: (tipo: FormaPedidaIconType) => 
      formasPedidaIcons.find(icon => icon.tipo === tipo)
  };
};