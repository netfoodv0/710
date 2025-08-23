import { MenuItem } from '../types/sidebar';
import { 
  SettingsIcon, 
  ClockIcon, 
  ReportIcon, 
  CouponIcon, 
  HistoryIcon, 
  OrderIcon, 
  DashboardIcon, 
  MenuIcon, 
  SupportIcon, 
  MapIcon, 
  UsersIcon, 
  BagIcon, 
  EstoqueIcon,
  FidelidadeIcon
} from '../components/ui';

export const sidebarMenuItems: MenuItem[] = [
  {
    path: '/',
    label: 'Dashboard',
    icon: DashboardIcon
  },
  {
    path: '/pedidos',
    label: 'Pedidos',
    icon: OrderIcon
  },
  {
    path: '/historico',
    label: 'Histórico',
    icon: HistoryIcon
  },
  {
    path: '/cardapio',
    label: 'Cardápio',
    icon: MenuIcon
  },
  {
    path: '/atendimento',
    label: 'Atendimento',
    icon: SupportIcon
  },
  {
    path: '/configuracoes',
    label: 'Configurações',
    icon: SettingsIcon
  },
  {
    path: '/horarios',
    label: 'Horários',
    icon: ClockIcon
  },
  {
    path: '/relatorios',
    label: 'Relatórios',
    icon: ReportIcon,
    subItems: [
      {
        path: '/relatorios/geral',
        label: 'Geral',
        icon: ReportIcon
      },
      {
        path: '/relatorios/clientes',
        label: 'Clientes',
        icon: UsersIcon
      },
      {
        path: '/relatorios/produtos',
        label: 'Produtos',
        icon: BagIcon
      }
    ]
  },
  {
    path: '/cupons',
    label: 'Cupons',
    icon: CouponIcon
  },
  {
    path: '/fidelidade',
    label: 'Fidelidade',
    icon: FidelidadeIcon
  },
  {
    path: '/usuarios',
    label: 'Usuários',
    icon: UsersIcon,
    subItems: [
      {
        path: '/usuarios/operadores',
        label: 'Operadores',
        icon: UsersIcon
      },
      {
        path: '/usuarios/motoboys',
        label: 'Motoboys',
        icon: UsersIcon
      }
    ]
  },
  {
    path: '/mapa',
    label: 'Mapa',
    icon: MapIcon
  },
  {
    path: '/estoque',
    label: 'Estoque',
    icon: EstoqueIcon,
    subItems: [
      {
        path: '/estoque/produtos',
        label: 'Produtos',
        icon: EstoqueIcon
      },
      {
        path: '/estoque/insumos',
        label: 'Insumos',
        icon: EstoqueIcon
      },
      {
        path: '/estoque/acompanhamentos',
        label: 'Acompanhamentos',
        icon: EstoqueIcon
      }
    ]
  }
];
